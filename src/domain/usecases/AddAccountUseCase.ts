import type { AccountType } from '../entities/AccountSource';
import type { CashAccountRepository } from '../repositories/CashAccountRepository';

export class AddAccountUseCase {
  private repository: CashAccountRepository;

  constructor(repository: CashAccountRepository) {
    this.repository = repository;
  }

  async execute(name: string, type: AccountType): Promise<void> {
    return this.repository.addAccount(name, type);
  }
}
