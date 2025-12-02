import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getAccountsUseCase,
  addAccountUseCase,
  getCashTransactionsUseCase,
  addCashTransactionUseCase,
} from '../../di/container';
import type { AccountSource, AccountType } from '../../domain/entities/AccountSource';
import type { CashTransaction, CashTransactionType } from '../../domain/entities/CashTransaction';

export const useCashAccounts = () => {
  const [accounts, setAccounts] = useState<AccountSource[]>([]);
  const [transactions, setTransactions] = useState<CashTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  const initialized = useRef(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [accountsData, transactionsData] = await Promise.all([
        getAccountsUseCase.execute(),
        getCashTransactionsUseCase.execute(),
      ]);

      setAccounts(accountsData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Failed to fetch cash account data', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    fetchData();
  }, [fetchData]);

  const addAccount = async (name: string, type: AccountType) => {
    await addAccountUseCase.execute(name, type);
    await fetchData();
  };

  const addTransaction = async (sourceId: string, type: CashTransactionType, amount: number, notes: string, performer: string) => {
    await addCashTransactionUseCase.execute(sourceId, type, amount, notes, performer);
    await fetchData();
  };

  return {
    accounts,
    transactions,
    loading,
    addAccount,
    addTransaction,
    fetchData,
  };
};
