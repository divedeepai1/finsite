import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { Button } from './ui/button';
import { ManageBenchmarksModal } from './ManageBenchmarksModal';

// Sample performance data
const performanceData = [
  { date: 'Sep 2025', value: 3.2 },
  { date: 'Oct 2025', value: 3.5 },
  { date: 'Nov 2025', value: 4.1 },
  { date: 'Dec 2025', value: 5.2 },
  { date: 'Jan 2026', value: 6.3 },
  { date: 'Feb 2026', value: 6.8 },
];

// Custom Tooltip
const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
        <p className="text-xs text-gray-500 mb-1">10/11/2025</p>
        <p className="text-sm font-bold text-gray-900">Portfolio</p>
        <p className="text-xs text-gray-600 mb-2">2+ Test4</p>
        <p className="text-lg font-bold text-green-600">{payload[0].value}%</p>
        <p className="text-xs text-blue-600 mt-1">Portfolio History: 10/11/2025</p>
      </div>
    );
  }
  return null;
};

export function PerformanceTab() {
  const [performancePeriod, setPerformancePeriod] = useState<'1M' | '6M' | '1Y' | '3Y' | '5Y' | '10Y' | 'START'>('6M');
  const [startDate, setStartDate] = useState('10/08/2025');
  const [endDate, setEndDate] = useState('09/02/2026');
  const [isBenchmarksModalOpen, setIsBenchmarksModalOpen] = useState(false);
  const [selectedBenchmarks, setSelectedBenchmarks] = useState<any[]>([]);

  const handleBenchmarksConfirm = (benchmarks: any[]) => {
    setSelectedBenchmarks(benchmarks);
  };

  return (
    <div className="bg-[#0B1120]">
      {/* Performance Controls */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {/* Performance Period Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Performance period</span>
            <div className="flex items-center gap-2">
              {(['1M', '6M', '1Y', '3Y', '5Y', '10Y', 'START'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setPerformancePeriod(period)}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    performancePeriod === period
                      ? 'bg-[#3B82F6] text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {period === 'START' ? 'START OF DATA' : period}
                </button>
              ))}
            </div>
          </div>

          {/* Manage Benchmarks Button */}
          <Button
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs px-4 py-2 font-semibold"
            onClick={() => setIsBenchmarksModalOpen(true)}
          >
            MANAGE BENCHMARKS
          </Button>
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-4 mt-4">
          <input
            type="text"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-[#111827] border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#3B82F6] w-32"
            placeholder="DD/MM/YYYY"
          />
          <span className="text-gray-500">-</span>
          <input
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-[#111827] border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#3B82F6] w-32"
            placeholder="DD/MM/YYYY"
          />
          <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs px-4 py-2 font-semibold">
            GO
          </Button>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-[#111827] border border-gray-800 rounded-lg p-6 h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tick={{ fill: '#9ca3af' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tick={{ fill: '#9ca3af' }}
              tickFormatter={(value) => `${value}%`}
              domain={[2, 8]}
              ticks={[2, 3, 4, 5, 6, 7, 8]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Info */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <span>● Custom Operational - Last Sync: HH:SS</span>
        <span>MIS Copilot • 01 May 2025</span>
      </div>

      {/* Manage Benchmarks Modal */}
      <ManageBenchmarksModal
        isOpen={isBenchmarksModalOpen}
        onClose={() => setIsBenchmarksModalOpen(false)}
        onConfirm={handleBenchmarksConfirm}
        selectedBenchmarks={selectedBenchmarks}
      />
    </div>
  );
}