import { useState } from 'react';
import { X, Upload, Info, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

interface AddPortfolioHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  historyDates: string[];
  setHistoryDates: (dates: string[]) => void;
}

export function AddPortfolioHistoryModal({ isOpen, onClose, historyDates, setHistoryDates }: AddPortfolioHistoryModalProps) {
  const [uploadType, setUploadType] = useState<'manual' | 'bulk'>('manual');
  const [selectedDate, setSelectedDate] = useState('10/08/2025');
  const [currentMonth, setCurrentMonth] = useState(7); // August (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInMonth(currentMonth - 1, currentYear);
    
    const days = [];
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        month: currentMonth === 0 ? 11 : currentMonth - 1,
        year: currentMonth === 0 ? currentYear - 1 : currentYear
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        month: currentMonth,
        year: currentYear
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        month: currentMonth === 11 ? 0 : currentMonth + 1,
        year: currentMonth === 11 ? currentYear + 1 : currentYear
      });
    }
    
    return days;
  };

  const handleDayClick = (day: number, month: number, year: number) => {
    const formattedDate = `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
    setSelectedDate(formattedDate);
  };

  const handleSave = () => {
    setHistoryDates([...historyDates, selectedDate]);
    onClose();
  };

  if (!isOpen) return null;

  const calendarDays = generateCalendarDays();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-[#1A2332] border border-gray-800 rounded-lg w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-lg font-bold text-white">Add Portfolio History</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Upload Type Selection */}
          <div className="flex items-center gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={uploadType === 'manual'}
                onChange={() => setUploadType('manual')}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-0"
              />
              <span className="text-sm text-gray-300">Manual Entry</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={uploadType === 'bulk'}
                onChange={() => setUploadType('bulk')}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-0"
              />
              <span className="text-sm text-gray-300">Bulk Upload</span>
            </label>
          </div>

          {uploadType === 'manual' ? (
            <>
              {/* Date Label */}
              <div className="mb-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Start date or rebalance date</label>
              </div>

              {/* Date Input */}
              <input
                type="text"
                value={selectedDate}
                readOnly
                className="w-full bg-[#0B1120] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white mb-4 focus:outline-none focus:border-blue-500"
              />

              {/* Calendar */}
              <div className="bg-[#111827] border border-gray-800 rounded-lg p-4">
                {/* Month/Year Header */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => {
                      if (currentMonth === 0) {
                        setCurrentMonth(11);
                        setCurrentYear(currentYear - 1);
                      } else {
                        setCurrentMonth(currentMonth - 1);
                      }
                    }}
                    className="text-white hover:bg-gray-700/50 rounded p-1.5 text-lg"
                  >
                    ‹
                  </button>
                  <div className="text-white font-semibold text-sm">
                    {monthNames[currentMonth]} {currentYear}
                  </div>
                  <button
                    onClick={() => {
                      if (currentMonth === 11) {
                        setCurrentMonth(0);
                        setCurrentYear(currentYear + 1);
                      } else {
                        setCurrentMonth(currentMonth + 1);
                      }
                    }}
                    className="text-white hover:bg-gray-700/50 rounded p-1.5 text-lg"
                  >
                    ›
                  </button>
                </div>

                {/* Days of Week */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {daysOfWeek.map(day => (
                    <div key={day} className="text-center text-xs text-gray-500 font-semibold py-1">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((dayInfo, index) => {
                    const isSelected = selectedDate === `${String(dayInfo.day).padStart(2, '0')}/${String(dayInfo.month + 1).padStart(2, '0')}/${dayInfo.year}`;
                    return (
                      <button
                        key={index}
                        onClick={() => handleDayClick(dayInfo.day, dayInfo.month, dayInfo.year)}
                        className={`
                          aspect-square flex items-center justify-center text-sm rounded
                          ${!dayInfo.isCurrentMonth ? 'text-gray-600' : 'text-gray-300'}
                          ${isSelected ? 'bg-[#3B82F6] text-white font-bold' : 'hover:bg-gray-700/50'}
                          transition-colors
                        `}
                      >
                        {dayInfo.day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Bulk Upload Area */}
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 mb-4 flex flex-col items-center justify-center bg-[#0B1120]/30 hover:border-gray-600 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-gray-300 text-sm mb-1">Click to upload or drag and drop</p>
                <p className="text-gray-500 text-xs">.csv files only (max 10MB)</p>
              </div>

              {/* Info Message */}
              <div className="flex items-start gap-2 mb-3">
                <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-400">
                  Please ensure your file follows the correct format.{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 underline">Download template</a>
                </p>
              </div>

              {/* Warning Message */}
              <div className="flex items-start gap-2 mb-4">
                <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-orange-400">
                  Warning: This will overwrite any existing portfolio history.
                </p>
              </div>

              {/* CSV Format Guidelines */}
              <div className="bg-[#0B1120] border border-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-white text-xs">📄</span>
                  </div>
                  <h3 className="text-xs font-bold text-white uppercase">CSV Format Guidelines</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-xs">
                    <span className="text-blue-400">•</span>
                    <span className="text-gray-400">
                      <span className="text-gray-300 font-medium">Col. 1:</span> As at date (DD/MM/YYYY)
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-xs">
                    <span className="text-blue-400">•</span>
                    <span className="text-gray-400">
                      <span className="text-gray-300 font-medium">Col. 2:</span> Fund ISIN code
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-xs">
                    <span className="text-blue-400">•</span>
                    <span className="text-gray-400">
                      <span className="text-gray-300 font-medium">Col. 3:</span> Weight (%)
                    </span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800">
          {uploadType === 'manual' ? (
            <Button
              onClick={handleSave}
              className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm px-6 py-2.5 font-semibold"
            >
              SAVE
            </Button>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <Button
                onClick={onClose}
                className="flex-1 bg-transparent hover:bg-gray-700/50 text-gray-400 text-sm px-6 py-2.5 font-semibold border-0"
              >
                CANCEL
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm px-6 py-2.5 font-semibold"
              >
                CONTINUE
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}