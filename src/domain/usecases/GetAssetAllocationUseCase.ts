import { calculateAssetValue } from '../entities/Asset';
import { convertToIDR } from '../utils/CurrencyConverter';
import type { Allocation } from '../entities/Allocation';
import type { AssetRepository } from '../repositories/AssetRepository';
import type { CashAccountRepository } from '../repositories/CashAccountRepository';

export class GetAssetAllocationUseCase {
  private assetRepository: AssetRepository;
  private cashAccountRepository: CashAccountRepository;

  constructor(assetRepository: AssetRepository, cashAccountRepository: CashAccountRepository) {
    this.assetRepository = assetRepository;
    this.cashAccountRepository = cashAccountRepository;
  }

  async execute(): Promise<Allocation[]> {
    const [assets, accounts, transactions] = await Promise.all([
      this.assetRepository.getAssets(),
      this.cashAccountRepository.getAccounts(),
      this.cashAccountRepository.getTransactions()
    ]);

    let totalValue = 0;
    const categoryValues: Record<string, number> = {};

    // Process Assets
    assets.forEach(asset => {
      const value = calculateAssetValue(asset);
      const valueUSD = convertToIDR(value, asset.currency);
      totalValue += valueUSD;

      if (!categoryValues[asset.category]) {
        categoryValues[asset.category] = 0;
      }
      categoryValues[asset.category] += valueUSD;
    });

    // Process Cash Accounts
    accounts.forEach(account => {
      const accountBalance = transactions
        .filter(t => t.sourceId === account.id)
        .reduce((acc, t) => t.type === 'Income' ? acc + t.amount : acc - t.amount, 0);

      if (accountBalance > 0) {
        totalValue += accountBalance;

        // Group by Account Type (Savings, RDN)
        if (!categoryValues[account.type]) {
          categoryValues[account.type] = 0;
        }
        categoryValues[account.type] += accountBalance;
      }
    });

    const allocation: Allocation[] = Object.keys(categoryValues).map(category => {
      const value = categoryValues[category];
      const percentage = totalValue === 0 ? 0 : (value / totalValue) * 100;

      let color = '#cbd5e1'; // default slate-300
      if (category === 'Indo Stock') color = '#2dd4bf'; // teal-400
      if (category === 'US Stock') color = '#fbbf24'; // amber-400
      if (category === 'Crypto') color = '#a855f7'; // purple-500
      if (category === 'Savings') color = '#3b82f6'; // blue-500
      if (category === 'RDN') color = '#ec4899'; // pink-500

      return {
        label: category,
        value,
        percentage,
        color,
      };
    });

    return allocation.sort((a, b) => b.value - a.value);
  }
}
