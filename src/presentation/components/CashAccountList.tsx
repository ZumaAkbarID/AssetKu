import type { AccountSource } from '../../domain/entities/AccountSource';
import type { CashTransaction } from '../../domain/entities/CashTransaction';

interface Props {
  accounts: AccountSource[];
  transactions: CashTransaction[];
  onAddTransaction: (sourceId: string) => void;
}

export const CashAccountList = ({ accounts, transactions, onAddTransaction }: Props) => {
  const getBalance = (sourceId: string) => {
    return transactions
      .filter(t => t.sourceId === sourceId)
      .reduce((acc, t) => {
        return t.type === 'Income' ? acc + t.amount : acc - t.amount;
      }, 0);
  };

  return (
    <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl">
      <h2 className="text-xl font-semibold mb-4">Cash & RDN Accounts</h2>
      <div className="space-y-4">
        {accounts.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No accounts found</p>
        ) : (
          accounts.map(account => (
            <div key={account.id} className="bg-gray-800 rounded-xl p-4 flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-lg">{account.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${account.type === 'Savings' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                    {account.type}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">
                  Balance: <span className="text-white font-semibold">Rp {getBalance(account.id).toLocaleString('id-ID')}</span>
                </p>
              </div>
              <button
                onClick={() => onAddTransaction(account.id)}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-sm rounded-lg transition-colors"
              >
                + Trans
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
