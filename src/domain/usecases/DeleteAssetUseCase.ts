import type { AssetRepository } from '../repositories/AssetRepository';
import type { GetPortfolioSummaryUseCase } from './GetPortfolioSummaryUseCase';

export class DeleteAssetUseCase {
  private assetRepository: AssetRepository;
  private getPortfolioSummaryUseCase: GetPortfolioSummaryUseCase;

  constructor(assetRepository: AssetRepository, getPortfolioSummaryUseCase: GetPortfolioSummaryUseCase) {
    this.assetRepository = assetRepository;
    this.getPortfolioSummaryUseCase = getPortfolioSummaryUseCase;
  }

  async execute(id: string, reason: 'withdraw' | 'loss'): Promise<void> {
    await this.assetRepository.deleteAsset(id);

    if (reason === 'loss') {
      const summary = await this.getPortfolioSummaryUseCase.execute();
      await this.assetRepository.addPortfolioHistory(summary.totalValue);
    }
  }
}
