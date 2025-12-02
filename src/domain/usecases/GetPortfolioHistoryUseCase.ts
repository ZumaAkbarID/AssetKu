import type { AssetRepository, PortfolioHistoryItem } from '../repositories/AssetRepository';

export class GetPortfolioHistoryUseCase {
  private assetRepository: AssetRepository;

  constructor(assetRepository: AssetRepository) {
    this.assetRepository = assetRepository;
  }

  async execute(): Promise<PortfolioHistoryItem[]> {
    return this.assetRepository.getPortfolioHistory();
  }
}
