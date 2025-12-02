import { useState } from 'react';
import { usePortfolio } from '../hooks/usePortfolio';
import { AllocationChart } from '../components/AllocationChart';
import { AssetList } from '../components/AssetList';
import { PortfolioChart } from '../components/PortfolioChart';
import { SummaryCard } from '../components/SummaryCard';
import { AssetFormModal } from '../components/AssetFormModal';
import { DateRangeFilter } from '../components/DateRangeFilter';
import { CalendarWidget } from '../components/CalendarWidget';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { PWAInstallButton } from '../components/PWAInstallButton';
import { TransactionModal } from '../components/TransactionModal';
import { CashAccountList } from '../components/CashAccountList';
import { AddAccountModal } from '../components/AddAccountModal';
import { AddCashTransactionModal } from '../components/AddCashTransactionModal';
import { useCashAccounts } from '../hooks/useCashAccounts';
import { getLocalTimeGreeting } from '../../domain/utils/DateUtils';
import type { Asset } from '../../domain/entities/Asset';
import type { PortfolioHistoryItem, TransactionType } from '../../domain/repositories/AssetRepository';

export const Dashboard = () => {
  const { assets, summary, allocation, history, loading, addAsset, updateAsset, deleteAsset, filterHistory, addTransaction, updateTransaction } = usePortfolio();
  const { accounts, transactions: cashTransactions, addAccount, addTransaction: addCashTransaction } = useCashAccounts();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [isAddCashTransactionModalOpen, setIsAddCashTransactionModalOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [editingTransaction] = useState<PortfolioHistoryItem | null>(null);
  const [deletingAssetId, setDeletingAssetId] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('ALL');

  const handleAddAsset = () => {
    setEditingAsset(null);
    setIsModalOpen(true);
  };

  const handleEditAsset = (asset: Asset) => {
    setEditingAsset(asset);
    setIsModalOpen(true);
  };



  const handleAddCashTransactionClick = (sourceId: string) => {
    setSelectedAccountId(sourceId);
    setIsAddCashTransactionModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeletingAssetId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (reason: 'withdraw' | 'loss') => {
    if (deletingAssetId) {
      await deleteAsset(deletingAssetId, reason);
      setIsDeleteModalOpen(false);
      setDeletingAssetId(null);
    }
  };

  const handleSaveAsset = async (asset: Asset | Omit<Asset, 'id'>) => {
    if ('id' in asset) {
      await updateAsset(asset as Asset);
    } else {
      await addAsset(asset);
    }
  };

  const handleSaveTransaction = async (type: TransactionType, amount: number, notes: string, assetId?: string) => {
    if (editingTransaction) {
      await updateTransaction(editingTransaction.id, type, amount, notes, assetId);
    } else {
      await addTransaction(type, amount, notes, assetId);
    }
  };

  const handleRangeChange = (range: string) => {
    setDateRange(range);
    filterHistory(range);
  };

  // Calculate Cash History
  // This is a simplified calculation. Ideally, we should have a daily snapshot of cash balance.
  // For now, we'll map the portfolio history dates to the cumulative cash balance at that date.
  const cashHistory = history
    .filter(h => h.type === 'Snapshot')
    .map(h => {
      // const date = new Date(h.date); // Note: h.date is formatted string, might need parsing if format changes
      // But for now, let's just use the current total balance for all points to show a flat line if no history logic
      // OR better: calculate running balance based on transactions up to that date.
      
      // Since h.date is "MMM D, HH:mm", parsing it back might be tricky without year.
      // Let's try a simpler approach: Just show the current total cash balance as a flat line for reference,
      // or try to reconstruct history if possible.
      
      // Reconstructing history:
      // 1. Get all transactions.
      // 2. Filter transactions before 'date'.
      // 3. Sum them up.
      
      // Issue: h.date doesn't have year. We might need the raw date from history if available, but it's not.
      // Let's assume the current year for simplicity or just use the total balance for now as a baseline.
      
      // BETTER APPROACH:
      // Create a map of date -> balance.
      // Since we don't have historical snapshots for cash, we can only show the *current* balance 
      // or try to project it back if we assume transactions are the only source of truth.
      
      // Let's implement a simple running balance calculation based on the visible history dates.
      // We will assume the history points are sorted.
      
      // Actually, to be accurate, we need to know the balance at each point in time.
      // Let's just calculate the total current balance and show it as a reference line for now, 
      // as reconstructing exact daily history without stored snapshots is complex and error-prone with just formatted dates.
      
      const totalCash = cashTransactions.reduce((acc, t) => t.type === 'Income' ? acc + t.amount : acc - t.amount, 0);
      return { date: h.date, value: totalCash };
    });

  if (loading) {
    return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full relative">
      {/* Wave Decorations */}
      <svg className="fixed pointer-events-none opacity-15 top-[-20%] right-[-10%] w-[800px] h-[800px] z-0" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M400 0C620.914 0 800 179.086 800 400C800 620.914 620.914 800 400 800C179.086 800 0 620.914 0 400C0 179.086 179.086 0 400 0Z" fill="url(#gradient1)" />
        <defs>
          <radialGradient id="gradient1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(400 400) rotate(90) scale(400)">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <svg className="fixed pointer-events-none opacity-15 bottom-[-20%] left-[-10%] w-[600px] h-[600px] z-0" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M300 0C465.685 0 600 134.315 600 300C600 465.685 465.685 600 300 600C134.315 600 0 465.685 0 300C0 134.315 134.315 0 300 0Z" fill="url(#gradient2)" />
        <defs>
          <radialGradient id="gradient2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(300 300) rotate(90) scale(300)">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      <div className="relative z-10 w-full min-h-full p-8">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-5xl font-bold mb-2">
              {getLocalTimeGreeting()}
            </h1>
            <p className="text-gray-400 text-lg">Your Asset Overview</p>
          </div>
          <div className="flex items-center">
            <PWAInstallButton />
            <button
              onClick={handleAddAsset}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-semibold shadow-lg transition-all transform hover:scale-105 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add Asset
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900 rounded-3xl md:p-6 p-2 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-y-4 justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Portfolio Value</h2>
                <DateRangeFilter currentRange={dateRange} onRangeChange={handleRangeChange} />
              </div>
              <div className="h-72">
                <PortfolioChart 
                  history={history.filter(h => h.type === 'Snapshot')} 
                  cashHistory={cashHistory}
                />
              </div>
            </div>
            <AssetList assets={assets} onEdit={handleEditAsset} onDelete={handleDeleteClick} />
            
            <div className="flex justify-end">
               <button
                onClick={() => setIsAddAccountModalOpen(true)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
              >
                + Add Account
              </button>
            </div>
            <CashAccountList 
              accounts={accounts} 
              transactions={cashTransactions} 
              onAddTransaction={handleAddCashTransactionClick} 
            />
            
            {/* Transaction History */}
            <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl">
              <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
              <div className="space-y-4">
                {cashTransactions.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">No transactions found</p>
                ) : (
                  cashTransactions.map(item => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-4 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${item.type === 'Income' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {item.type}
                          </span>
                          <span className="text-gray-400 text-sm">{item.date}</span>
                        </div>
                        {item.notes && <p className="text-gray-300 mt-1">{item.notes}</p>}
                        {item.performer && (
                          <p className="text-gray-500 text-xs mt-1">
                            By: {item.performer}
                          </p>
                        )}
                        <p className="text-gray-500 text-xs mt-1">
                          Account: {accounts.find(a => a.id === item.sourceId)?.name || 'Unknown'}
                        </p>
                      </div>
                      <div className={`font-bold ${item.type === 'Income' ? 'text-green-400' : 'text-red-400'}`}>
                        {item.type === 'Income' ? '+' : '-'} Rp {item.amount.toLocaleString('id-ID')}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Calendar Widget */}
            <CalendarWidget selectedDate={dateRange} onDateSelect={handleRangeChange} />

            {/* Allocation Chart */}
            <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl">
              <h3 className="font-semibold mb-4">Asset Allocation</h3>
              <div className="h-48 flex items-center justify-center">
                <AllocationChart allocation={allocation} />
              </div>
              <div className="mt-4 space-y-2 text-sm">
                {allocation.map(a => (
                  <div key={a.label} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: a.color }}></div>
                      <span>{a.label}</span>
                    </div>
                    <span className="font-semibold">{a.percentage.toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Cards */}
            <SummaryCard
              title="Total Net Worth"
              value={summary ? `Rp ${summary.totalValue.toLocaleString('id-ID')}` : 'Rp 0'}
              subtitle={summary && summary.totalValue > 0 ? `${summary.totalPnLPercent >= 0 ? '+' : ''}${summary.totalPnLPercent.toFixed(2)}% All Time` : 'Start investing'}
              isPositive={summary ? summary.totalPnLPercent >= 0 : true}
            />
            <SummaryCard
              title="Total Unrealized PnL"
              value={summary ? `${summary.totalPnL >= 0 ? '+' : ''}Rp ${summary.totalPnL.toLocaleString('id-ID')}` : 'Rp 0'}
              subtitle={summary && summary.totalValue > 0 ? `${summary.totalPnLPercent >= 0 ? '+' : ''}${summary.totalPnLPercent.toFixed(2)}% total gain` : '0% total gain'}
              isPositive={summary ? summary.totalPnLPercent >= 0 : true}
            />
          </div>
        </div>
      </div>

      <AssetFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveAsset}
        initialData={editingAsset}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        onSubmit={handleSaveTransaction}
        initialData={editingTransaction}
        assets={assets}
      />

      <AddAccountModal
        isOpen={isAddAccountModalOpen}
        onClose={() => setIsAddAccountModalOpen(false)}
        onSubmit={addAccount}
      />

      <AddCashTransactionModal
        isOpen={isAddCashTransactionModalOpen}
        onClose={() => setIsAddCashTransactionModalOpen(false)}
        onSubmit={addCashTransaction}
        accounts={accounts}
        initialSourceId={selectedAccountId}
      />
    </div>
  );
};
