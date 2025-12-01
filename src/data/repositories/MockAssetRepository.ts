import type { Asset } from '../../domain/entities/Asset';
import type { AssetRepository, PortfolioHistoryPoint } from '../../domain/repositories/AssetRepository';

export class MockAssetRepository implements AssetRepository {
  async getAssets(): Promise<Asset[]> {
    return [
      {
        id: '1',
        symbol: 'BBCA',
        name: 'Bank Central Asia',
        category: 'Indo Stock',
        quantity: 15000, // 150 Lots
        avgPrice: 8333.33,
        currentPrice: 10000,
        currency: 'IDR',
      },
      {
        id: '2',
        symbol: 'TLKM',
        name: 'Telkom Indonesia',
        category: 'Indo Stock',
        quantity: 20000, // 200 Lots
        avgPrice: 3600,
        currentPrice: 4000,
        currency: 'IDR',
      },
      {
        id: '3',
        symbol: 'GOTO',
        name: 'GoTo Gojek',
        category: 'Indo Stock',
        quantity: 50000, // 500 Lots
        avgPrice: 120,
        currentPrice: 100,
        currency: 'IDR',
      },
      {
        id: '4',
        symbol: 'AAPL',
        name: 'Apple Inc.',
        category: 'US Stock',
        quantity: 50,
        avgPrice: 154,
        currentPrice: 190,
        currency: 'USD',
      },
      {
        id: '5',
        symbol: 'MSFT',
        name: 'Microsoft Corp.',
        category: 'US Stock',
        quantity: 30,
        avgPrice: 340,
        currentPrice: 410,
        currency: 'USD',
      },
      {
        id: '6',
        symbol: 'BTC',
        name: 'Bitcoin',
        category: 'Crypto',
        quantity: 1.5,
        avgPrice: 36666.67,
        currentPrice: 45000,
        currency: 'USD',
      },
      {
        id: '7',
        symbol: 'ETH',
        name: 'Ethereum',
        category: 'Crypto',
        quantity: 8,
        avgPrice: 1900,
        currentPrice: 2300,
        currency: 'USD',
      },
    ];
  }

  async getPortfolioHistory(range: string = 'ALL'): Promise<PortfolioHistoryPoint[]> {
    // Mock filtering logic
    const allHistory = [
      { date: 'Jan', value: 280000 },
      { date: 'Feb', value: 295000 },
      { date: 'Mar', value: 310000 },
      { date: 'Apr', value: 305000 },
      { date: 'May', value: 330000 },
      { date: 'Jun', value: 345000 },
      { date: 'Jul', value: 355000 },
      { date: 'Aug', value: 360000 },
      { date: 'Sep', value: 365000 },
      { date: 'Oct', value: 370000 },
      { date: 'Nov', value: 380000 },
      { date: 'Dec', value: 387700 },
    ];

    if (range === 'YTD') {
      return allHistory; // Simplified for mock
    }
    return allHistory;
  }

  async addAsset(asset: Omit<Asset, 'id'>): Promise<void> {
    console.log('Mock add asset:', asset);
  }

  async updateAsset(asset: Asset): Promise<void> {
    console.log('Mock update asset:', asset);
  }

  async deleteAsset(id: string): Promise<void> {
    console.log('Mock delete asset:', id);
  }

  async addPortfolioHistory(value: number): Promise<void> {
    console.log('Mock add portfolio history:', value);
  }
}
