import type { AccountSource, AccountType } from '../entities/AccountSource';
import type { CashTransaction, CashTransactionType } from '../entities/CashTransaction';

export interface CashAccountRepository {
  getAccounts(): Promise<AccountSource[]>;
  addAccount(name: string, type: AccountType): Promise<void>;
  deleteAccount(id: string): Promise<void>;

  getTransactions(sourceId?: string): Promise<CashTransaction[]>;
  addTransaction(sourceId: string, type: CashTransactionType, amount: number, notes: string, performer: string): Promise<void>;
  updateTransaction(id: string, type: CashTransactionType, amount: number, notes: string, performer: string): Promise<void>;
  deleteTransaction(id: string): Promise<void>;
}
