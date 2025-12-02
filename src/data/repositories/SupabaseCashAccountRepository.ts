import { supabase } from '../sources/supabase';
import type { CashAccountRepository } from '../../domain/repositories/CashAccountRepository';
import type { AccountSource, AccountType } from '../../domain/entities/AccountSource';
import type { CashTransaction, CashTransactionType } from '../../domain/entities/CashTransaction';

export class SupabaseCashAccountRepository implements CashAccountRepository {
  async getAccounts(): Promise<AccountSource[]> {
    const { data, error } = await supabase
      .from('account_sources')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      currency: item.currency,
    }));
  }

  async addAccount(name: string, type: AccountType): Promise<void> {
    const { error } = await supabase.from('account_sources').insert({
      name,
      type,
      currency: 'IDR', // Default to IDR for now
    });

    if (error) throw error;
  }

  async deleteAccount(id: string): Promise<void> {
    const { error } = await supabase.from('account_sources').delete().eq('id', id);

    if (error) throw error;
  }

  async getTransactions(sourceId?: string): Promise<CashTransaction[]> {
    let query = supabase
      .from('cash_transactions')
      .select('*')
      .order('date', { ascending: false });

    if (sourceId) {
      query = query.eq('source_id', sourceId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data.map((item: any) => ({
      id: item.id,
      sourceId: item.source_id,
      date: new Date(item.date).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }),
      type: item.type,
      amount: Number(item.amount),
      notes: item.notes,
      performer: item.performer,
    }));
  }

  async addTransaction(sourceId: string, type: CashTransactionType, amount: number, notes: string, performer: string): Promise<void> {
    const { error } = await supabase.from('cash_transactions').insert({
      source_id: sourceId,
      type,
      amount,
      notes,
      performer,
      date: new Date().toISOString(),
    });

    if (error) throw error;
  }

  async updateTransaction(id: string, type: CashTransactionType, amount: number, notes: string, performer: string): Promise<void> {
    const { error } = await supabase.from('cash_transactions').update({
      type,
      amount,
      notes,
      performer,
    }).eq('id', id);

    if (error) throw error;
  }

  async deleteTransaction(id: string): Promise<void> {
    const { error } = await supabase.from('cash_transactions').delete().eq('id', id);

    if (error) throw error;
  }
}
