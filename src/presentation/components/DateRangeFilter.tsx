import { useState } from 'react';

interface Props {
  currentRange: string;
  onRangeChange: (range: string) => void;
}

export const DateRangeFilter = ({ currentRange, onRangeChange }: Props) => {
  const ranges = ['1W', '1M', '3M', 'YTD', '1Y', 'ALL'];
  const [showCustom, setShowCustom] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleCustomSubmit = () => {
    if (startDate && endDate) {
      onRangeChange(`${startDate},${endDate}`);
      setShowCustom(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        {ranges.map(range => (
          <button
            key={range}
            onClick={() => {
              setShowCustom(false);
              onRangeChange(range);
            }}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              currentRange === range && !currentRange.includes(',')
                ? 'bg-gray-700 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
            }`}
          >
            {range}
          </button>
        ))}
        <button
          onClick={() => setShowCustom(!showCustom)}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
            currentRange.includes(',') || showCustom
              ? 'bg-gray-700 text-white shadow-sm'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
          }`}
        >
          Custom
        </button>
      </div>
      
      {showCustom && (
        <div className="absolute top-12 right-0 bg-gray-900 border border-gray-700 p-4 rounded-xl shadow-xl z-50 flex flex-col space-y-3">
          <div className="flex space-x-2">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Start</label>
              <input
                type="date"
                className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-teal-500"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">End</label>
              <input
                type="date"
                className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-teal-500"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={handleCustomSubmit}
            className="w-full bg-teal-600 hover:bg-teal-500 text-white py-1 rounded text-sm font-medium transition-colors"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};
