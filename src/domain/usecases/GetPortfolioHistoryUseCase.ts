import type { AssetRepository, PortfolioHistoryPoint } from '../repositories/AssetRepository';

export class GetPortfolioHistoryUseCase {
  private assetRepository: AssetRepository;

  constructor(assetRepository: AssetRepository) {
    this.assetRepository = assetRepository;
  }

  async execute(): Promise<PortfolioHistoryPoint[]> {
    return this.assetRepository.getPortfolioHistory();
  }
}
