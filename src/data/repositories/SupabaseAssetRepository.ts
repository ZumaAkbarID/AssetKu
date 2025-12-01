import { supabase } from '../sources/supabase';
import type { Asset } from '../../domain/entities/Asset';
import type { AssetRepository, PortfolioHistoryPoint } from '../../domain/repositories/AssetRepository';
import { getLocalISOString } from '../../domain/utils/DateUtils';

export class SupabaseAssetRepository implements AssetRepository {
  async getAssets(): Promise<Asset[]> {
    const { data, error } = await supabase
      .from('assets')
      .select('*');

    if (error) throw error;

    return data.map((item: any) => ({
      id: item.id,
      symbol: item.symbol,
      name: item.name,
      category: item.category,
      quantity: Number(item.quantity),
      avgPrice: Number(item.avg_price),
      currentPrice: Number(item.current_price),
      currency: item.currency,
    }));
  }

  async getPortfolioHistory(range: string = 'ALL'): Promise<PortfolioHistoryPoint[]> {
    const { data: maxDateData } = await supabase
      .from('portfolio_history')
      .select('date')
      .order('date', { ascending: false })
      .limit(1)
      .single();

    const refDate = maxDateData ? new Date(maxDateData.date) : new Date();
    let query = supabase.from('portfolio_history').select('*').order('created_at', { ascending: true });
    let startDate: Date | null = null;

    if (range === '1W') {
      const d = new Date(refDate);
      d.setDate(d.getDate() - 7);
      startDate = d;
    } else if (range === '1M') {
      const d = new Date(refDate);
      d.setMonth(d.getMonth() - 1);
      startDate = d;
    } else if (range === '3M') {
      const d = new Date(refDate);
      d.setMonth(d.getMonth() - 3);
      startDate = d;
    } else if (range === 'YTD') {
      startDate = new Date(refDate.getFullYear(), 0, 1);
    } else if (range === '1Y') {
      const d = new Date(refDate);
      d.setFullYear(d.getFullYear() - 1);
      startDate = d;
    } else if (range.includes(',')) {
      const [start, end] = range.split(',');
      query = query.gte('date', start).lte('date', end);
    } else if (range !== 'ALL') {
      query = query.eq('date', range);
    }

    if (startDate) {
      query = query.gte('date', startDate.toISOString());
    }

    const { data, error } = await query;

    if (error) throw error;

    return data.map((item: any) => {
      const dateObj = new Date(item.created_at || item.date);
      return {
        date: dateObj.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        value: Number(item.value),
      };
    });
  }

  async addAsset(asset: Omit<Asset, 'id'>): Promise<void> {
    const { error } = await supabase.from('assets').insert({
      symbol: asset.symbol,
      name: asset.name,
      category: asset.category,
      quantity: asset.quantity,
      avg_price: asset.avgPrice,
      current_price: asset.currentPrice,
      currency: asset.currency,
    });

    if (error) throw error;
  }

  async updateAsset(asset: Asset): Promise<void> {
    const { error } = await supabase.from('assets').update({
      symbol: asset.symbol,
      name: asset.name,
      category: asset.category,
      quantity: asset.quantity,
      avg_price: asset.avgPrice,
      current_price: asset.currentPrice,
      currency: asset.currency,
    }).eq('id', asset.id);

    if (error) throw error;
  }

  async deleteAsset(id: string): Promise<void> {
    const { error } = await supabase.from('assets').delete().eq('id', id);

    if (error) throw error;
  }

  async addPortfolioHistory(value: number): Promise<void> {
    const date = getLocalISOString();

    // Always insert a new record to capture intra-day changes
    const { error } = await supabase
      .from('portfolio_history')
      .insert({ date, value });

    if (error) throw error;
  }
}
