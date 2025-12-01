import type { Asset } from '../entities/Asset';

export interface PortfolioHistoryPoint {
  date: string;
  value: number;
}

export interface AssetRepository {
  getAssets(): Promise<Asset[]>;
  getPortfolioHistory(range?: string): Promise<PortfolioHistoryPoint[]>;
  addAsset(asset: Omit<Asset, 'id'>): Promise<void>;
  updateAsset(asset: Asset): Promise<void>;
  deleteAsset(id: string): Promise<void>;
  addPortfolioHistory(value: number): Promise<void>;
}
