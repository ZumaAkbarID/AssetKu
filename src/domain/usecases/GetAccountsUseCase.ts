import type { AccountSource } from '../entities/AccountSource';
import type { CashAccountRepository } from '../repositories/CashAccountRepository';

export class GetAccountsUseCase {
  private repository: CashAccountRepository;

  constructor(repository: CashAccountRepository) {
    this.repository = repository;
  }

  async execute(): Promise<AccountSource[]> {
    return this.repository.getAccounts();
  }
}
