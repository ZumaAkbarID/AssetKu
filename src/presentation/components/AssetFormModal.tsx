import { useState, useEffect } from 'react';
import type { Asset, AssetCategory, Currency } from '../../domain/entities/Asset';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (asset: Omit<Asset, 'id'> | Asset) => void;
  initialData?: Asset | null;
}

export const AssetFormModal = ({ isOpen, onClose, onSubmit, initialData }: Props) => {
  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    category: 'Indo Stock' as AssetCategory,
    quantity: 0,
    avgPrice: 0,
    currentPrice: 0,
    currency: 'IDR' as Currency,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        symbol: initialData.symbol,
        name: initialData.name,
        category: initialData.category,
        quantity: initialData.quantity,
        avgPrice: initialData.avgPrice,
        currentPrice: initialData.currentPrice,
        currency: initialData.currency,
      });
    } else {
      setFormData({
        symbol: '',
        name: '',
        category: 'Indo Stock',
        quantity: 0,
        avgPrice: 0,
        currentPrice: 0,
        currency: 'IDR',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      onSubmit({ ...formData, id: initialData.id });
    } else {
      onSubmit(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">{initialData ? 'Edit Asset' : 'Add New Asset'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Symbol</label>
            <input
              type="text"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
              value={formData.symbol}
              onChange={e => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Category</label>
              <select
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as AssetCategory })}
              >
                <option value="Indo Stock">Indo Stock</option>
                <option value="US Stock">US Stock</option>
                <option value="Crypto">Crypto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Currency</label>
              <select
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                value={formData.currency}
                onChange={e => setFormData({ ...formData, currency: e.target.value as Currency })}
              >
                <option value="IDR">IDR</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Quantity</label>
              <input
                type="number"
                step="any"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                value={formData.quantity}
                onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Avg Price</label>
              <input
                type="number"
                step="any"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                value={formData.avgPrice}
                onChange={e => setFormData({ ...formData, avgPrice: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Current Price</label>
              <input
                type="number"
                step="any"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                value={formData.currentPrice}
                onChange={e => setFormData({ ...formData, currentPrice: Number(e.target.value) })}
              />
            </div>
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
              {initialData ? 'Update Asset' : 'Add Asset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
