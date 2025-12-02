import { calculateAssetPnL, calculateAssetValue } from '../entities/Asset';
import { convertToIDR } from '../utils/CurrencyConverter';
import type { PortfolioSummary } from '../entities/PortfolioSummary';
import type { AssetRepository } from '../repositories/AssetRepository';
import type { CashAccountRepository } from '../repositories/CashAccountRepository';

export class GetPortfolioSummaryUseCase {
  private assetRepository: AssetRepository;
  private cashAccountRepository: CashAccountRepository;

  constructor(assetRepository: AssetRepository, cashAccountRepository: CashAccountRepository) {
    this.assetRepository = assetRepository;
    this.cashAccountRepository = cashAccountRepository;
  }

  async execute(): Promise<PortfolioSummary> {
    const [assets, transactions] = await Promise.all([
      this.assetRepository.getAssets(),
      this.cashAccountRepository.getTransactions()
    ]);

    let totalValue = 0;
    let totalPnL = 0;
    let totalCost = 0;

    // Calculate Assets Value
    assets.forEach(asset => {
      const value = calculateAssetValue(asset);
      const pnl = calculateAssetPnL(asset);
      const cost = asset.quantity * asset.avgPrice;

      totalValue += convertToIDR(value, asset.currency);
      totalPnL += convertToIDR(pnl, asset.currency);
      totalCost += convertToIDR(cost, asset.currency);
    });

    // Calculate Cash Balance
    const cashBalance = transactions.reduce((acc, t) => {
      return t.type === 'Income' ? acc + t.amount : acc - t.amount;
    }, 0);

    totalValue += cashBalance;
    // Note: Cash doesn't contribute to PnL in this simple model, or we could consider interest as PnL.
    // For now, we just add it to Total Value.

    const totalPnLPercent = totalCost === 0 ? 0 : (totalPnL / totalCost) * 100;

    return {
      totalValue,
      totalPnL,
      totalPnLPercent,
    };
  }
}
