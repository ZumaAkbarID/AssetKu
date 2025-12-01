import { useState } from 'react';
import { getLocalISOString } from '../../domain/utils/DateUtils';

interface Props {
  selectedDate?: string;
  onDateSelect?: (date: string) => void;
}

export const CalendarWidget = ({ selectedDate, onDateSelect }: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    if (onDateSelect) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = getLocalISOString(date);
      onDateSelect(dateString);
    }
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="text-gray-600"></div>);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    const dateString = getLocalISOString(currentDayDate);
    const isSelected = selectedDate === dateString;
    const isToday =
      i === new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getFullYear() === new Date().getFullYear();

    days.push(
      <div
        key={i}
        onClick={() => handleDateClick(i)}
        className={`py-2 text-sm cursor-pointer rounded-full transition-colors ${
          isSelected
            ? 'bg-teal-500 font-bold text-white shadow-lg transform scale-110'
            : isToday
            ? 'bg-gray-700 text-teal-400 font-semibold'
            : 'text-gray-300 hover:bg-gray-700'
        }`}
      >
        {i}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex space-x-2">
          <button onClick={prevMonth} className="text-gray-400 hover:text-white transition-colors">
            ‹
          </button>
          <button onClick={nextMonth} className="text-gray-400 hover:text-white transition-colors">
            ›
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-gray-500 font-medium">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {days}
      </div>
    </div>
  );
};
