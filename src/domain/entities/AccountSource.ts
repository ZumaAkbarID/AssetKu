export type AccountType = 'Savings' | 'RDN';
export type Currency = 'USD' | 'IDR';

export interface AccountSource {
  id: string;
  name: string;
  type: AccountType;
  currency: Currency;
}
