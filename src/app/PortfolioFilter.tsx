import { useState } from 'react';
import { Search, ChevronDown, ArrowLeft, Calendar } from 'lucide-react';
import { Button } from './components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';

export default function PortfolioFilter() {
  const [startDate1, setStartDate1] = useState('');
  const [startDate2, setStartDate2] = useState('');
  const [showCharges, setShowCharges] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  const [showRisk, setShowRisk] = useState(false);
  const [showInvestment, setShowInvestment] = useState(false);
  const [showRealta, setShowRealta] = useState(false);

  const portfolioData = [
    {
      name: '7IM Active Adventurous',
      type: 'Fund',
      cipSolution: 'CIP Allocation 80%+ Equity',
      morningstarSector: '',
      ocf: '0.39%',
      performance1Y: '10.16%',
      performance3Y: '17.14%',
      maxDrawdown: '-1.73%',
      alpha: '9.47%',
      volatility: ''
    },
    {
      name: '7IM Active Adventurous Plus',
      type: 'Fund',
      cipSolution: 'Global Large Cap Blend Equity',
      morningstarSector: '',
      ocf: '0.47%',
      performance1Y: '11.09%',
      performance3Y: '17.19%',
      maxDrawdown: '-1.85%',
      alpha: '7.48%',
      volatility: ''
    },
    {
      name: '7IM Active Balanced',
      type: 'Fund',
      cipSolution: 'CIP Allocation 40-60% Equity',
      morningstarSector: '',
      ocf: '0.41%',
      performance1Y: '8.60%',
      performance3Y: '17.73%',
      maxDrawdown: '-1.87%',
      alpha: '6.31%',
      volatility: ''
    },
    {
      name: '7IM Active Cautious',
      type: 'Fund',
      cipSolution: 'CIP Allocation 0-20% Equity',
      morningstarSector: '',
      ocf: '0.41%',
      performance1Y: '7.11%',
      performance3Y: '9.39%',
      maxDrawdown: '-1.88%',
      alpha: '3.28%',
      volatility: ''
    },
    {
      name: '7IM Active Moderately Adventurous',
      type: 'Fund',
      cipSolution: 'CIP Allocation 60-80% Equity',
      morningstarSector: '',
      ocf: '0.43%',
      performance1Y: '10.21%',
      performance3Y: '15.78%',
      maxDrawdown: '-1.23%',
      alpha: '7.84%',
      volatility: ''
    },
    {
      name: '7IM Active Moderately Cautious',
      type: 'Fund',
      cipSolution: 'CIP Allocation 20-40% Equity',
      morningstarSector: '',
      ocf: '0.42%',
      performance1Y: '8.28%',
      performance3Y: '17.18%',
      maxDrawdown: '8.15%',
      alpha: '4.79%',
      volatility: ''
    },
    {
      name: '7IM Blended Adventurous',
      type: 'Fund',
      cipSolution: 'CIP Allocation 80%+ Equity',
      morningstarSector: '',
      ocf: '0.86%',
      performance1Y: '11.88%',
      performance3Y: '46.13%',
      maxDrawdown: '9.18%',
      alpha: '9.19%',
      volatility: ''
    },
    {
      name: '7IM Blended Adventurous Plus',
      type: 'Fund',
      cipSolution: 'CIP Allocation 80%+ Equity',
      morningstarSector: '',
      ocf: '0.87%',
      performance1Y: '11.97%',
      performance3Y: '',
      maxDrawdown: '2.18%',
      alpha: '9.82%',
      volatility: ''
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex">
      {/* Left Sidebar - Filters */}
      <div className="w-64 bg-[#0D1525] border-r border-gray-800 flex-shrink-0">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold uppercase text-gray-300">Filters</h2>
            <div className="flex items-center gap-2">
              <button className="text-blue-400 text-xs hover:text-blue-300">Reset</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded">
                Save
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Portfolio Characteristics */}
            <div>
              <button 
                className="flex items-center justify-between w-full text-sm text-gray-300 hover:text-white mb-2"
              >
                <span>Portfolio characteristics</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="ml-3 border-l border-gray-700 pl-3 space-y-2">
                <label className="flex items-center gap-2 text-xs text-gray-400 hover:text-white cursor-pointer">
                  <input type="checkbox" className="w-3 h-3 rounded border-gray-600 bg-gray-800" />
                  <span>CP platform</span>
                </label>
              </div>
            </div>

            {/* Provider */}
            <div>
              <div className="mb-2">
                <label className="text-xs text-gray-400 uppercase block mb-1">Provider</label>
                <button className="w-full text-left text-xs text-gray-300 hover:text-white mb-1">
                  Select Provider
                </button>
              </div>
              <div className="mb-2">
                <label className="text-xs text-gray-400 uppercase block mb-1">Select OR Solution</label>
                <Select>
                  <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-xs h-8">
                    <SelectValue placeholder="Select OR Solution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solution1">Solution 1</SelectItem>
                    <SelectItem value="solution2">Solution 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Morningstar Sector */}
            <div>
              <label className="text-xs text-gray-400 uppercase block mb-1">Morningstar Sector</label>
              <button className="text-xs text-gray-300 hover:text-white">
                Select Morningstar Sector
              </button>
            </div>

            {/* Start Date */}
            <div>
              <label className="text-xs text-gray-400 uppercase block mb-2">Start Date</label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    value={startDate1}
                    onChange={(e) => setStartDate1(e.target.value)}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded">
                    GO
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    value={startDate2}
                    onChange={(e) => setStartDate2(e.target.value)}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded">
                    GO
                  </button>
                </div>
              </div>
            </div>

            {/* Collapsible Sections */}
            <div>
              <button 
                onClick={() => setShowCharges(!showCharges)}
                className="flex items-center justify-between w-full text-sm text-gray-300 hover:text-white"
              >
                <span>Charges</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showCharges ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div>
              <button 
                onClick={() => setShowPerformance(!showPerformance)}
                className="flex items-center justify-between w-full text-sm text-gray-300 hover:text-white"
              >
                <span>Performance</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showPerformance ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div>
              <button 
                onClick={() => setShowRisk(!showRisk)}
                className="flex items-center justify-between w-full text-sm text-gray-300 hover:text-white"
              >
                <span>Risk</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showRisk ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div>
              <button 
                onClick={() => setShowInvestment(!showInvestment)}
                className="flex items-center justify-between w-full text-sm text-gray-300 hover:text-white"
              >
                <span>Investment</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showInvestment ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div>
              <button 
                onClick={() => setShowRealta(!showRealta)}
                className="flex items-center justify-between w-full text-sm text-gray-300 hover:text-white"
              >
                <span>Realta</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showRealta ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <button 
              onClick={() => window.location.href = '/document-upload'}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
            <h1 className="text-2xl font-bold text-white">Portfolio Filter</h1>
          </div>
          <p className="text-sm text-gray-400 ml-14">
            Use this tool to search and filter our entire portfolio universe based on specific criteria. Apply filters across key data columns to create a tailored shortlist. You can sort each column and add or remove data columns as needed. Check{' '}
            <span className="text-blue-400">here</span> to save a new filter to use later, or add your results to{' '}
            <span className="text-blue-400">100 portfolios</span> to edit your shortlist directly into Investment Selection for deeper analysis.
          </p>
        </div>

        {/* Portfolio Shortlist Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm ml-14">
            <span className="text-gray-400">Portfolio shortlist:</span>
            <span className="text-blue-400 font-semibold">1,704 matches</span>
            <span className="text-gray-400">from MPS directory of</span>
            <span className="text-white font-semibold">1,704 portfolios</span>
          </div>
          <button className="text-blue-400 text-sm hover:text-blue-300">
            Reset Selection
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mb-4 ml-14">
          <Button className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-4 py-2 font-semibold">
            <span className="mr-2">📤</span>
            EXPORT SELECTED ROWS
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 font-semibold">
            + ADD TO MO SELECTION
          </Button>
        </div>

        {/* Table Controls */}
        <div className="flex items-center justify-between mb-4 ml-14">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search portfolios..."
              className="bg-[#111827] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 w-64"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-800 rounded" title="Search">
              <Search className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded" title="Columns">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" strokeWidth="2" />
                <rect x="14" y="14" width="7" height="7" strokeWidth="2" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-800 rounded" title="Filter">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h18M6 8h12M9 12h6M11 16h2" />
              </svg>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#111827] border border-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0D1525] border-b border-gray-800">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-gray-800" />
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">CIP Solution</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">Morningstar Sector</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">OCF</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">1Y Performance</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">3Y Performance</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">YY Max Drawdown</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">YY Alpha</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">Volatility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {portfolioData.map((portfolio, index) => (
                  <tr key={index} className="hover:bg-[#0D1525] transition-colors cursor-pointer">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-gray-800" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-blue-400 hover:text-blue-300">{portfolio.name}</div>
                      <div className="text-xs text-gray-500">{portfolio.type}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{portfolio.cipSolution}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{portfolio.morningstarSector || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{portfolio.ocf}</td>
                    <td className={`px-4 py-3 text-sm font-medium ${portfolio.performance1Y.includes('-') ? 'text-red-400' : 'text-green-400'}`}>
                      {portfolio.performance1Y}
                    </td>
                    <td className={`px-4 py-3 text-sm font-medium ${portfolio.performance3Y.includes('-') ? 'text-red-400' : 'text-green-400'}`}>
                      {portfolio.performance3Y || '-'}
                    </td>
                    <td className={`px-4 py-3 text-sm font-medium ${portfolio.maxDrawdown.includes('-') ? 'text-red-400' : 'text-green-400'}`}>
                      {portfolio.maxDrawdown}
                    </td>
                    <td className={`px-4 py-3 text-sm font-medium ${portfolio.alpha.includes('-') ? 'text-red-400' : 'text-green-400'}`}>
                      {portfolio.alpha}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{portfolio.volatility || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800 text-xs text-gray-500">
            Showing {portfolioData.length} of 1,704 portfolios
          </div>
        </div>
      </div>
    </div>
  );
}
