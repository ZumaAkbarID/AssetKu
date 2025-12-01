import type { AssetRepository, PortfolioHistoryPoint } from '../repositories/AssetRepository';

export class FilterPortfolioHistoryUseCase {
  private assetRepository: AssetRepository;

  constructor(assetRepository: AssetRepository) {
    this.assetRepository = assetRepository;
  }

  async execute(range: string): Promise<PortfolioHistoryPoint[]> {
    return this.assetRepository.getPortfolioHistory(range);
  }
}
