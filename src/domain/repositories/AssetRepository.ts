import type { Asset } from '../entities/Asset';

export type TransactionType = 'Snapshot' | 'Income' | 'Outcome';

export interface PortfolioHistoryItem {
  id: string;
  date: string;
  value: number;
  type: TransactionType;
  amount?: number;
  notes?: string;
  assetId?: string;
}

export interface AssetRepository {
  getAssets(): Promise<Asset[]>;
  getPortfolioHistory(range?: string): Promise<PortfolioHistoryItem[]>;
  addAsset(asset: Omit<Asset, 'id'>): Promise<void>;
  updateAsset(asset: Asset): Promise<void>;
  deleteAsset(id: string): Promise<void>;
  addPortfolioHistory(value: number): Promise<void>;
  addTransaction(type: TransactionType, amount: number, notes: string, assetId?: string): Promise<void>;
  updateTransaction(id: string, type: TransactionType, amount: number, notes: string, assetId?: string): Promise<void>;
}
