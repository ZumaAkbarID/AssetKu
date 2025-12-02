import { useState, useEffect } from 'react';
import type { CashTransactionType } from '../../domain/entities/CashTransaction';
import type { AccountSource } from '../../domain/entities/AccountSource';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (sourceId: string, type: CashTransactionType, amount: number, notes: string, performer: string) => void;
  accounts: AccountSource[];
  initialSourceId?: string;
}

export const AddCashTransactionModal = ({ isOpen, onClose, onSubmit, accounts, initialSourceId }: Props) => {
  const [sourceId, setSourceId] = useState(initialSourceId || '');
  const [type, setType] = useState<CashTransactionType>('Income');
  const [amount, setAmount] = useState(0);
  const [notes, setNotes] = useState('');
  const [performer, setPerformer] = useState('');

  useEffect(() => {
    if (initialSourceId) {
      setSourceId(initialSourceId);
    }
  }, [initialSourceId, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceId) return;
    onSubmit(sourceId, type, amount, notes, performer);
    setAmount(0);
    setNotes('');
    setPerformer('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Add Cash Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Account</label>
            <select
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
              value={sourceId}
              onChange={e => setSourceId(e.target.value)}
            >
              <option value="">Select Account</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>{acc.name} ({acc.type})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Type</label>
            <select
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
              value={type}
              onChange={e => setType(e.target.value as CashTransactionType)}
            >
              <option value="Income">Income</option>
              <option value="Outcome">Outcome</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Amount</label>
            <input
              type="number"
              required
              min="0"
              step="any"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Performer (Who?)</label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
              value={performer}
              onChange={e => setPerformer(e.target.value)}
              placeholder="e.g. Me, Wife, etc."
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Notes</label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
            />
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
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
