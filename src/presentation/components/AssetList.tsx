import type { Asset } from '../../domain/entities/Asset';
import { calculateAssetPnL, calculateAssetPnLPercent, calculateAssetValue } from '../../domain/entities/Asset';
import { convertToIDR } from '../../domain/utils/CurrencyConverter';

interface Props {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onDelete: (id: string) => void;
}

const AssetRow = ({ asset, onEdit, onDelete }: { asset: Asset; onEdit: (asset: Asset) => void; onDelete: (id: string) => void }) => {
  const value = convertToIDR(calculateAssetValue(asset), asset.currency);
  const pnl = convertToIDR(calculateAssetPnL(asset), asset.currency);
  const pnlPercent = calculateAssetPnLPercent(asset);
  const isPositive = pnl >= 0;

  // Icon/Color logic
  const COLORS = [
    'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500', 'bg-lime-500',
    'bg-green-500', 'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500',
    'bg-blue-500', 'bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500',
    'bg-pink-500', 'bg-rose-500'
  ];

  const getRandomColor = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % COLORS.length;
    return COLORS[index];
  };

  let iconBg = getRandomColor(asset.id);
  let iconText = asset.symbol.substring(0, 2);
  
  // Keep special icons but use random background (or maybe keep brand colors if preferred? User asked for random)
  // Let's keep special ICONS but use the random background as requested.
  if (asset.category === 'US Stock') {
    if (asset.symbol === 'AAPL') { iconText = '🍎'; }
    if (asset.symbol === 'MSFT') { iconText = 'MS'; }
  } else if (asset.category === 'Crypto') {
    if (asset.symbol === 'BTC') { iconText = '₿'; }
    if (asset.symbol === 'ETH') { iconText = 'Ξ'; }
  }

  const formatCurrency = (val: number) => {
    return `Rp ${val.toLocaleString('id-ID')}`;
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors group">
      <div className="flex items-center space-x-4 flex-1">
        <div className={`w-10 h-10 ${iconBg} rounded-full flex items-center justify-center font-bold text-sm text-white`}>
          {iconText}
        </div>
        <div>
          <div className="font-semibold text-white">{asset.name}</div>
          <div className="text-sm text-gray-400">
            {asset.symbol} • {asset.quantity.toLocaleString()} {asset.category === 'Crypto' ? '' : (asset.category === 'Indo Stock' ? 'Lots' : 'Shares')}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="font-semibold text-white">
            {formatCurrency(value)}
          </div>
          <div className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{formatCurrency(pnl)} ({isPositive ? '+' : ''}{pnlPercent.toFixed(2)}%)
          </div>
        </div>
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(asset)} className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 hover:text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </button>
          <button onClick={() => onDelete(asset.id)} className="p-1.5 bg-gray-700 hover:bg-red-900/50 rounded-md text-gray-300 hover:text-red-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export const AssetList = ({ assets, onEdit, onDelete }: Props) => {
  const indoStocks = assets.filter(a => a.category === 'Indo Stock');
  const usStocks = assets.filter(a => a.category === 'US Stock');
  const crypto = assets.filter(a => a.category === 'Crypto');

  return (
    <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Your Assets</h2>
      </div>

      {indoStocks.length > 0 && (
        <div className="mb-8">
          <h3 className="text-teal-400 font-semibold mb-4 text-sm uppercase tracking-wide">Indonesian Stocks</h3>
          <div className="space-y-3">
            {indoStocks.map(asset => <AssetRow key={asset.id} asset={asset} onEdit={onEdit} onDelete={onDelete} />)}
          </div>
        </div>
      )}

      {usStocks.length > 0 && (
        <div className="mb-8">
          <h3 className="text-purple-400 font-semibold mb-4 text-sm uppercase tracking-wide">US Stocks</h3>
          <div className="space-y-3">
            {usStocks.map(asset => <AssetRow key={asset.id} asset={asset} onEdit={onEdit} onDelete={onDelete} />)}
          </div>
        </div>
      )}

      {crypto.length > 0 && (
        <div>
          <h3 className="text-orange-400 font-semibold mb-4 text-sm uppercase tracking-wide">Cryptocurrency</h3>
          <div className="space-y-3">
            {crypto.map(asset => <AssetRow key={asset.id} asset={asset} onEdit={onEdit} onDelete={onDelete} />)}
          </div>
        </div>
      )}
    </div>
  );
};
