import type { Asset } from '../entities/Asset';
import type { AssetRepository } from '../repositories/AssetRepository';
import type { GetPortfolioSummaryUseCase } from './GetPortfolioSummaryUseCase';

export class UpdateAssetUseCase {
  private assetRepository: AssetRepository;
  private getPortfolioSummaryUseCase: GetPortfolioSummaryUseCase;

  constructor(assetRepository: AssetRepository, getPortfolioSummaryUseCase: GetPortfolioSummaryUseCase) {
    this.assetRepository = assetRepository;
    this.getPortfolioSummaryUseCase = getPortfolioSummaryUseCase;
  }

  async execute(asset: Asset): Promise<void> {
    await this.assetRepository.updateAsset(asset);
    const summary = await this.getPortfolioSummaryUseCase.execute();
    await this.assetRepository.addPortfolioHistory(summary.totalValue);
  }
}
