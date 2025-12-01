import { calculateAssetValue } from '../entities/Asset';
import { convertToIDR } from '../utils/CurrencyConverter';
import type { Allocation } from '../entities/Allocation';
import type { AssetRepository } from '../repositories/AssetRepository';

export class GetAssetAllocationUseCase {
  private assetRepository: AssetRepository;

  constructor(assetRepository: AssetRepository) {
    this.assetRepository = assetRepository;
  }

  async execute(): Promise<Allocation[]> {
    const assets = await this.assetRepository.getAssets();
    let totalValue = 0;
    const categoryValues: Record<string, number> = {};

    assets.forEach(asset => {
      const value = calculateAssetValue(asset);
      const valueUSD = convertToIDR(value, asset.currency);
      totalValue += valueUSD;

      if (!categoryValues[asset.category]) {
        categoryValues[asset.category] = 0;
      }
      categoryValues[asset.category] += valueUSD;
    });

    const allocation: Allocation[] = Object.keys(categoryValues).map(category => {
      const value = categoryValues[category];
      const percentage = totalValue === 0 ? 0 : (value / totalValue) * 100;

      let color = '#cbd5e1'; // default slate-300
      if (category === 'Indo Stock') color = '#2dd4bf'; // teal-400
      if (category === 'US Stock') color = '#fbbf24'; // amber-400
      if (category === 'Crypto') color = '#a855f7'; // purple-500

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
