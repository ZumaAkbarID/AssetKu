import type { CashTransaction } from '../entities/CashTransaction';
import type { CashAccountRepository } from '../repositories/CashAccountRepository';

export class GetCashTransactionsUseCase {
  private repository: CashAccountRepository;

  constructor(repository: CashAccountRepository) {
    this.repository = repository;
  }

  async execute(sourceId?: string): Promise<CashTransaction[]> {
    return this.repository.getTransactions(sourceId);
  }
}
