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
import { getLocalTimeGreeting } from '../../domain/utils/DateUtils';
import type { Asset } from '../../domain/entities/Asset';

export const Dashboard = () => {
  const { assets, summary, allocation, history, loading, addAsset, updateAsset, deleteAsset, filterHistory } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
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

  const handleRangeChange = (range: string) => {
    setDateRange(range);
    filterHistory(range);
  };

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
            <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-y-4 justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Portfolio Value</h2>
                <DateRangeFilter currentRange={dateRange} onRangeChange={handleRangeChange} />
              </div>
              <div className="h-72">
                <PortfolioChart history={history} />
              </div>
            </div>
            <AssetList assets={assets} onEdit={handleEditAsset} onDelete={handleDeleteClick} />
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
    </div>
  );
};
