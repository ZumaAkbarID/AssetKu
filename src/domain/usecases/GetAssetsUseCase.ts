import type { Asset } from '../entities/Asset';
import type { AssetRepository } from '../repositories/AssetRepository';

export class GetAssetsUseCase {
  private assetRepository: AssetRepository;

  constructor(assetRepository: AssetRepository) {
    this.assetRepository = assetRepository;
  }

  async execute(): Promise<Asset[]> {
    return this.assetRepository.getAssets();
  }
}
