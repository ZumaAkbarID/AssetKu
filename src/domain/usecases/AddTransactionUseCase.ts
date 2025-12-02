import type { AssetRepository, TransactionType } from '../repositories/AssetRepository';

export class AddTransactionUseCase {
  private assetRepository: AssetRepository;

  constructor(assetRepository: AssetRepository) {
    this.assetRepository = assetRepository;
  }

  async execute(type: TransactionType, amount: number, notes: string, assetId?: string): Promise<void> {
    return this.assetRepository.addTransaction(type, amount, notes, assetId);
  }
}
