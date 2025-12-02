import { useState, useEffect } from 'react';
import type { PortfolioHistoryItem, TransactionType } from '../../domain/repositories/AssetRepository';
import type { Asset } from '../../domain/entities/Asset';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (type: TransactionType, amount: number, notes: string, assetId?: string) => void;
  initialData?: PortfolioHistoryItem | null;
  assets: Asset[];
}

export const TransactionModal = ({ isOpen, onClose, onSubmit, initialData, assets }: Props) => {
  const [formData, setFormData] = useState({
    type: 'Income' as TransactionType,
    amount: 0,
    notes: '',
    assetId: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        type: initialData.type,
        amount: initialData.amount || 0,
        notes: initialData.notes || '',
        assetId: initialData.assetId || '',
      });
    } else {
      setFormData({
        type: 'Income',
        amount: 0,
        notes: '',
        assetId: '',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData.type, formData.amount, formData.notes, formData.assetId || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">{initialData ? 'Edit Transaction' : 'Add Transaction'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Type</label>
            <select
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value as TransactionType })}
            >
              <option value="Income">Income</option>
              <option value="Outcome">Outcome</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Amount</label>
            <input
              type="number"
              step="any"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
              value={formData.amount}
              onChange={e => setFormData({ ...formData, amount: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Notes</label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Related Asset (Optional)</label>
            <select
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
              value={formData.assetId}
              onChange={e => setFormData({ ...formData, assetId: e.target.value })}
            >
              <option value="">None</option>
              {assets.map(asset => (
                <option key={asset.id} value={asset.id}>
                  {asset.name} ({asset.symbol})
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-medium transition-colors"
            >
              {initialData ? 'Update Transaction' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
