import type { AssetRepository, TransactionType } from '../repositories/AssetRepository';

export class UpdateTransactionUseCase {
  private assetRepository: AssetRepository;

  constructor(assetRepository: AssetRepository) {
    this.assetRepository = assetRepository;
  }

  async execute(id: string, type: TransactionType, amount: number, notes: string, assetId?: string): Promise<void> {
    return this.assetRepository.updateTransaction(id, type, amount, notes, assetId);
  }
}
