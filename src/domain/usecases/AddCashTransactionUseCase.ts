import type { CashTransactionType } from '../entities/CashTransaction';
import type { CashAccountRepository } from '../repositories/CashAccountRepository';

export class AddCashTransactionUseCase {
  private repository: CashAccountRepository;

  constructor(repository: CashAccountRepository) {
    this.repository = repository;
  }

  async execute(sourceId: string, type: CashTransactionType, amount: number, notes: string, performer: string): Promise<void> {
    return this.repository.addTransaction(sourceId, type, amount, notes, performer);
  }
}
