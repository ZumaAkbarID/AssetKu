import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { PortfolioHistoryItem } from '../../domain/repositories/AssetRepository';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  history: PortfolioHistoryItem[];
  cashHistory?: { date: string; value: number }[];
}

export const PortfolioChart = ({ history, cashHistory = [] }: Props) => {
  const data = {
    labels: history.map(h => h.date),
    datasets: [
      {
        label: 'Portfolio Value',
        data: history.map(h => h.value),
        borderColor: '#2dd4bf',
        backgroundColor: 'rgba(45, 212, 191, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 3,
      },
      {
        label: 'Cash Balance',
        data: cashHistory.map(h => h.value),
        borderColor: '#a855f7', // Purple
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#fff',
        bodyColor: '#2dd4bf',
        borderColor: '#2dd4bf',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            if (context.parsed && context.parsed.y !== null) {
              return 'Rp ' + context.parsed.y.toLocaleString('id-ID');
            }
            return '';
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: 'rgba(75, 85, 99, 0.2)',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
        ticks: {
          color: '#9ca3af',
          callback: function (value: any) {
            if (value >= 1000000) return 'Rp ' + (value / 1000000).toFixed(1) + 'jt';
            if (value >= 1000) return 'Rp ' + (value / 1000).toFixed(0) + 'k';
            return 'Rp ' + value;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return <Line data={data} options={options} />;
};
