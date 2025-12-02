import { useState } from 'react';
import type { AccountType } from '../../domain/entities/AccountSource';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, type: AccountType) => void;
}

export const AddAccountModal = ({ isOpen, onClose, onSubmit }: Props) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<AccountType>('Savings');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, type);
    setName('');
    setType('Savings');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Add Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Account Name</label>
            <input
              type="text"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. BCA, Bibit RDN"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Type</label>
            <select
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
              value={type}
              onChange={e => setType(e.target.value as AccountType)}
            >
              <option value="Savings">Savings</option>
              <option value="RDN">RDN</option>
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
              Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
