import type { Asset } from '../entities/Asset';
import type { AssetRepository } from '../repositories/AssetRepository';
import type { GetPortfolioSummaryUseCase } from './GetPortfolioSummaryUseCase';

export class AddAssetUseCase {
  private assetRepository: AssetRepository;
  private getPortfolioSummaryUseCase: GetPortfolioSummaryUseCase;

  constructor(assetRepository: AssetRepository, getPortfolioSummaryUseCase: GetPortfolioSummaryUseCase) {
    this.assetRepository = assetRepository;
    this.getPortfolioSummaryUseCase = getPortfolioSummaryUseCase;
  }

  async execute(asset: Omit<Asset, 'id'>): Promise<void> {
    await this.assetRepository.addAsset(asset);
    const summary = await this.getPortfolioSummaryUseCase.execute();
    await this.assetRepository.addPortfolioHistory(summary.totalValue);
  }
}
