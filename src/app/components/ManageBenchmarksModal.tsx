import { useState } from 'react';
import { X, Search, Filter, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';

interface Benchmark {
  id: number;
  type: string;
  name: string;
  selected: boolean;
}

interface ManageBenchmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedBenchmarks: Benchmark[]) => void;
  selectedBenchmarks?: Benchmark[];
}

export function ManageBenchmarksModal({ isOpen, onClose, onConfirm, selectedBenchmarks }: ManageBenchmarksModalProps) {
  const [benchmarks, setBenchmarks] = useState<Benchmark[]>([
    { id: 1, type: 'ARC', name: 'ARC Sterling Cautious PCI', selected: false },
    { id: 2, type: 'ARC', name: 'ARC Sterling Balanced Asset PCI', selected: false },
    { id: 3, type: 'ARC', name: 'ARC Sterling Steady Growth PCI', selected: false },
    { id: 4, type: 'ARC', name: 'ARC Sterling Equity Risk PCI', selected: false },
    { id: 5, type: 'Cash', name: 'Cash - Bank of England Base Rate', selected: false },
  ]);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const selectedBenchmarksCount = benchmarks.filter(b => b.selected);

  const handleToggleBenchmark = (id: number) => {
    setBenchmarks(benchmarks.map(b => 
      b.id === id ? { ...b, selected: !b.selected } : b
    ));
  };

  const handleResetFilters = () => {
    setBenchmarks(benchmarks.map(b => ({ ...b, selected: false })));
  };

  const handleConfirm = () => {
    onConfirm(selectedBenchmarksCount);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1f2e] border border-gray-700 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Manage Benchmarks</h2>
            <p className="text-sm text-gray-400 max-w-xl">
              Select up to 12 benchmarks from a variety of categories, including IA Sector, ABI Sector, Morningstar Categories, ARC, Cash, Inflation 
              and Property. Alternatively, you can add custom fixed benchmarks to suit your specific needs. Benchmarks help you evaluate 
              performance and make informed comparisons for your investment strategies.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Selected Section */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-white mb-3">Selected</h3>
            <div className="bg-[#0f1419] border border-gray-700 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-500 italic">
                {selectedBenchmarksCount.length === 0
                  ? 'No benchmarks have been selected. Choose from the list below or add a fixed benchmark.'
                  : `${selectedBenchmarksCount.length} benchmark${selectedBenchmarksCount.length !== 1 ? 's' : ''} selected`
                }
              </p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs px-4 py-2 font-semibold">
                ADD FIXED BENCHMARK
              </Button>
              <button 
                onClick={handleResetFilters}
                className="text-blue-400 text-xs hover:text-blue-300"
              >
                Reset Filters
              </button>
            </div>

            {/* Action Icons */}
            <div className="flex items-center justify-end gap-2 mb-4">
              <button className="p-2 hover:bg-gray-700/50 rounded" title="Search">
                <Search className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-700/50 rounded" title="Filter">
                <Filter className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-700/50 rounded" title="Table View">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" strokeWidth="2" />
                  <rect x="14" y="3" width="7" height="7" strokeWidth="2" />
                  <rect x="3" y="14" width="7" height="7" strokeWidth="2" />
                  <rect x="14" y="14" width="7" height="7" strokeWidth="2" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-700/50 rounded" title="List View">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Benchmarks Table */}
          <div className="bg-[#0f1419] border border-gray-700 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="text-left px-4 py-3 w-12"></th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">TYPE</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">NAME</th>
                  <th className="text-left px-4 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {benchmarks.map((benchmark) => (
                  <tr key={benchmark.id} className="hover:bg-[#1a1f2e] transition-colors">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={benchmark.selected}
                        onChange={() => handleToggleBenchmark(benchmark.id)}
                        className="w-4 h-4 rounded border-gray-600 bg-[#0B1120] text-[#3B82F6] focus:ring-[#3B82F6] focus:ring-offset-0"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{benchmark.type}</td>
                    <td className="px-4 py-3 text-sm text-white">{benchmark.name}</td>
                    <td className="px-4 py-3">
                      <button className="p-1 hover:bg-gray-700/50 rounded transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="bg-[#0f1419] border border-gray-700 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-[#3B82F6]"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">1-5 of 455</span>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-gray-700/50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-700/50 rounded transition-colors">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-700">
          <Button 
            onClick={onClose}
            variant="ghost" 
            className="text-gray-400 hover:text-white bg-transparent hover:bg-gray-700/50 px-6 py-2"
          >
            CANCEL
          </Button>
          <Button 
            onClick={handleConfirm}
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8 py-2 font-semibold"
          >
            CONFIRM
          </Button>
        </div>
      </div>
    </div>
  );
}