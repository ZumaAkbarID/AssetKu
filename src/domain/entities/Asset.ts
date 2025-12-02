export type AssetCategory = 'Indo Stock' | 'US Stock' | 'Crypto' | 'Savings' | 'RDN' | 'Obligasi' | 'Reksadana Pasar Uang' | 'SBN Retail' | 'Obligasi FR';
export type Currency = 'USD' | 'IDR';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  category: AssetCategory;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  currency: Currency;
}

export const calculateAssetValue = (asset: Asset): number => {
  return asset.quantity * asset.currentPrice;
};

export const calculateAssetPnL = (asset: Asset): number => {
  return (asset.currentPrice - asset.avgPrice) * asset.quantity;
};

export const calculateAssetPnLPercent = (asset: Asset): number => {
  if (asset.avgPrice === 0) return 0;
  return ((asset.currentPrice - asset.avgPrice) / asset.avgPrice) * 100;
};
