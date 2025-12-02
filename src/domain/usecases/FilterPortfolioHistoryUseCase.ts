import type { AssetRepository, PortfolioHistoryItem } from '../repositories/AssetRepository';

export class FilterPortfolioHistoryUseCase {
  private assetRepository: AssetRepository;

  constructor(assetRepository: AssetRepository) {
    this.assetRepository = assetRepository;
  }

  async execute(range: string): Promise<PortfolioHistoryItem[]> {
    return this.assetRepository.getPortfolioHistory(range);
  }
}
