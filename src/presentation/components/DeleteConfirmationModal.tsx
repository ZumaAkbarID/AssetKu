interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: 'withdraw' | 'loss') => void;
}

export const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Delete Asset</h2>
        <p className="text-gray-400 mb-6">Why are you deleting this asset?</p>
        
        <div className="space-y-3">
          <button
            onClick={() => onConfirm('withdraw')}
            className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors flex items-center justify-between group"
          >
            <span>Withdraw / Sold for Profit</span>
            <span className="text-xs text-gray-500 group-hover:text-gray-300">No History Entry</span>
          </button>
          
          <button
            onClick={() => onConfirm('loss')}
            className="w-full px-4 py-3 bg-red-900/20 hover:bg-red-900/40 text-red-400 hover:text-red-300 rounded-xl font-medium transition-colors flex items-center justify-between group"
          >
            <span>Loss / Rug Pull</span>
            <span className="text-xs text-red-500/70 group-hover:text-red-400">Record PnL in History</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 px-4 py-2 text-gray-500 hover:text-white transition-colors text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
