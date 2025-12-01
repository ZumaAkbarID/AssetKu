interface Props {
  title: string;
  value: string;
  subtitle: string;
  isPositive?: boolean;
}

export const SummaryCard = ({ title, value, subtitle, isPositive = true }: Props) => {
  return (
    <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl">
      <div className="text-gray-400 text-sm mb-2">{title}</div>
      <div className={`text-4xl font-bold mb-2 ${title.includes('PnL') ? (isPositive ? 'text-green-400' : 'text-red-400') : 'text-white'}`}>
        {value}
      </div>
      <div className={`flex items-center text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        <svg className={`w-4 h-4 mr-1 transform ${isPositive ? '' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <span>{subtitle}</span>
      </div>
    </div>
  );
};
