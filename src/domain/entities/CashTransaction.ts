export type CashTransactionType = 'Income' | 'Outcome';

export interface CashTransaction {
  id: string;
  sourceId: string;
  date: string;
  type: CashTransactionType;
  amount: number;
  notes?: string;
  performer?: string;
}
