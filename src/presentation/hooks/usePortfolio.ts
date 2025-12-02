import { useCallback, useEffect, useRef, useState } from 'react';
import {
  addAssetUseCase,
  deleteAssetUseCase,
  filterPortfolioHistoryUseCase,
  getAssetAllocationUseCase,
  getAssetsUseCase,
  getPortfolioHistoryUseCase,
  getPortfolioSummaryUseCase,
  updateAssetUseCase,
  addTransactionUseCase,
  updateTransactionUseCase,
} from '../../di/container';
import { fetchExchangeRate } from '../../domain/utils/CurrencyConverter';
import type { Asset } from '../../domain/entities/Asset';
import type { PortfolioSummary } from '../../domain/entities/PortfolioSummary';
import type { Allocation } from '../../domain/entities/Allocation';
import type { PortfolioHistoryItem, TransactionType } from '../../domain/repositories/AssetRepository';

export const usePortfolio = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [summary, setSummary] = useState<PortfolioSummary | null>(null);
  const [allocation, setAllocation] = useState<Allocation[]>([]);
  const [history, setHistory] = useState<PortfolioHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const initialized = useRef(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [assetsData, summaryData, allocationData, historyData] = await Promise.all([
        getAssetsUseCase.execute(),
        getPortfolioSummaryUseCase.execute(),
        getAssetAllocationUseCase.execute(),
        getPortfolioHistoryUseCase.execute(),
      ]);

      setAssets(assetsData);
      setSummary(summaryData);
      setAllocation(allocationData);
      setHistory(historyData);
    } catch (error) {
      console.error('Failed to fetch portfolio data', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const init = async () => {
      await fetchExchangeRate();
      await fetchData();
    };
    init();
  }, [fetchData]);

  const addAsset = async (asset: Omit<Asset, 'id'>) => {
    await addAssetUseCase.execute(asset);
    await fetchData();
  };

  const updateAsset = async (asset: Asset) => {
    await updateAssetUseCase.execute(asset);
    await fetchData();
  };

  const deleteAsset = async (id: string, reason: 'withdraw' | 'loss') => {
    await deleteAssetUseCase.execute(id, reason);
    await fetchData();
  };

  const filterHistory = async (range: string) => {
    const historyData = await filterPortfolioHistoryUseCase.execute(range);
    setHistory(historyData);
  };

  const addTransaction = async (type: TransactionType, amount: number, notes: string, assetId?: string) => {
    await addTransactionUseCase.execute(type, amount, notes, assetId);
    await fetchData();
  };

  const updateTransaction = async (id: string, type: TransactionType, amount: number, notes: string, assetId?: string) => {
    await updateTransactionUseCase.execute(id, type, amount, notes, assetId);
    await fetchData();
  };

  return {
    assets,
    summary,
    allocation,
    history,
    loading,
    addAsset,
    updateAsset,
    deleteAsset,
    filterHistory,
    addTransaction,
    updateTransaction,
    fetchData
  };
};
