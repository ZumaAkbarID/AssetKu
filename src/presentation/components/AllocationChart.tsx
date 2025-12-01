import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type { Allocation } from '../../domain/entities/Allocation';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  allocation: Allocation[];
}

export const AllocationChart = ({ allocation }: Props) => {
  const data = {
    labels: allocation.map(a => a.label),
    datasets: [
      {
        data: allocation.map(a => a.percentage),
        backgroundColor: allocation.map(a => a.color),
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#2dd4bf',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return context.label + ': ' + context.parsed.toFixed(1) + '%';
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};
