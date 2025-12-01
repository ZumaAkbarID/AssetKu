import { calculateAssetPnL, calculateAssetValue } from '../entities/Asset';
import { convertToIDR } from '../utils/CurrencyConverter';
import type { PortfolioSummary } from '../entities/PortfolioSummary';
import type { AssetRepository } from '../repositories/AssetRepository';

export class GetPortfolioSummaryUseCase {
  private assetRepository: AssetRepository;

  constructor(assetRepository: AssetRepository) {
    this.assetRepository = assetRepository;
  }

  async execute(): Promise<PortfolioSummary> {
    const assets = await this.assetRepository.getAssets();

    let totalValue = 0;
    let totalPnL = 0;
    let totalCost = 0;

    assets.forEach(asset => {
      const value = calculateAssetValue(asset);
      const pnl = calculateAssetPnL(asset);
      const cost = asset.quantity * asset.avgPrice;

      totalValue += convertToIDR(value, asset.currency);
      totalPnL += convertToIDR(pnl, asset.currency);
      totalCost += convertToIDR(cost, asset.currency);
    });

    const totalPnLPercent = totalCost === 0 ? 0 : (totalPnL / totalCost) * 100;

    return {
      totalValue,
      totalPnL,
      totalPnLPercent,
    };
  }
}
