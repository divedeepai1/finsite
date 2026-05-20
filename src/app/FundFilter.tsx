import { useState } from 'react';
import { Search, ChevronDown, X, Filter, ArrowLeft } from 'lucide-react';
import { Button } from './components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';

export default function FundFilter() {
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [minSize, setMinSize] = useState<string>('');
  const [maxSize, setMaxSize] = useState<string>('');
  const [minYield, setMinYield] = useState<string>('');
  const [maxYield, setMaxYield] = useState<string>('');

  const fundData = [
    {
      name: 'UBS Family Market',
      isin: 'GB00BJ27HK19',
      shares: 'Accumulation',
      maturationDate: 'Material Balanced Income',
      sector: 'Material Balanced Income',
      size: '0.37%',
      performanceAssessment: '0.35%',
      fundManager: 'UBS',
      yield: '3.1%',
      ytd: '5.29%',
      oneYear: '10.12%',
      threeYear: '0.00%'
    },
    {
      name: 'Threadneedle UK Equity Alpha (Income) Z Acc',
      isin: 'GB00B7KKN348',
      shares: 'Material Balanced Income',
      maturationDate: 'Material Balanced Income',
      sector: 'IA UK All Companies',
      size: '0.02%',
      performanceAssessment: '0.43%',
      fundManager: 'Columbia Threadneedle',
      yield: '0.00%',
      oneYear: '10.11%',
      threeYear: '3.69%'
    },
    {
      name: 'Threadneedle UK Equity Alpha (Income) Z Acc',
      isin: 'GB00B7KKN348',
      shares: 'Material Balanced Income',
      maturationDate: 'Material Balanced Income',
      sector: 'IA UK All Companies',
      size: '0.02%',
      performanceAssessment: '0.43%',
      fundManager: 'Columbia Threadneedle',
      yield: '0.00%',
      oneYear: '10.11%',
      threeYear: '1.99%'
    },
    {
      name: 'Threadneedle UK Equity Alpha (Income) Z Acc',
      isin: 'GB00B7KKN348',
      shares: 'Material Balanced Income',
      maturationDate: 'Material Balanced Income',
      sector: 'IA UK All Companies',
      size: '0.02%',
      performanceAssessment: '0.27%',
      fundManager: 'Columbia Threadneedle',
      yield: '0.00%',
      oneYear: '10.37%',
      threeYear: '1.71%'
    },
    {
      name: 'Threadneedle UK Equity Alpha (Income) Z Acc',
      isin: 'GB00B7KKN348',
      shares: 'Material Balanced Income',
      maturationDate: 'Material Balanced Income',
      sector: 'IA Global',
      size: '0.02%',
      performanceAssessment: '10.27%',
      fundManager: 'Columbia Threadneedle',
      yield: '0.00%',
      oneYear: '10.37%',
      threeYear: '1.71%'
    },
    {
      name: 'iShares Core UK Gilts UCITS ETF GBP (Dist)',
      isin: 'IE00B1FZS244',
      shares: 'IA Gilts',
      maturationDate: 'Material Balanced Income',
      sector: 'IA Gilts',
      size: '0.07%',
      performanceAssessment: '0.01%',
      fundManager: 'iShares (BlackRock)',
      yield: '4.04%',
      oneYear: '-0.45%',
      threeYear: '-2.12%'
    },
    {
      name: 'L&G UK Index A Inc',
      isin: 'GB00BG0QPC01',
      shares: 'IA UK All Companies',
      maturationDate: 'Material Balanced Income',
      sector: 'IA UK All Companies',
      size: '0.16%',
      performanceAssessment: '0.06%',
      fundManager: 'Legal & General (LGIM)',
      yield: '3.57%',
      oneYear: '-10.45%',
      threeYear: '0.41%'
    },
    {
      name: 'iShares UK Equity Index (UK) D Inc',
      isin: 'GB00B7HFZY36',
      shares: 'IA UK All Companies',
      maturationDate: 'Material Balanced Income',
      sector: 'IA UK All Companies',
      size: '0.06%',
      performanceAssessment: '0.06%',
      fundManager: 'iShares (BlackRock)',
      yield: '3.57%',
      oneYear: '-10.45%',
      threeYear: '0.41%'
    },
    {
      name: 'HSBC FTSE 100 Index C Inc',
      isin: 'GB00B80QFR96',
      shares: 'IA UK All Companies',
      maturationDate: 'Material Balanced Income',
      sector: 'IA UK All Companies',
      size: '0.18%',
      performanceAssessment: '0.16%',
      fundManager: 'HSBC',
      yield: '3.59%',
      oneYear: '-10.62%',
      threeYear: '0.58%'
    }
  ];

  return (
    <div className="p-6 min-h-screen bg-[#0B1220]">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <button 
              onClick={() => window.location.href = '/document-upload'}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
            <h1 className="text-2xl font-bold text-white">Fund Filter</h1>
          </div>
          <p className="text-sm text-gray-400 ml-14">
            Use this form to search and filter our entire fund universe based on specific criteria. You
            can use multiple filters, or even enhance your criteria with the fund characteristics filter or the
            star filter to search for top funds in your area of interest (if any fund matches your selected criteria).
          </p>
        </div>

        {/* Fund Count Info */}
        <div className="flex items-center gap-2 text-sm ml-14">
          <span className="text-gray-400">Fund Offering:</span>
          <span className="font-bold text-white">2,124</span>
          <span className="text-gray-400">matches from directory of</span>
          <span className="font-bold text-white">18,142</span>
          <span className="text-gray-400">funds</span>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left Sidebar - Filters */}
        <div className="w-80 flex-shrink-0 space-y-6">
          {/* Northern Trust */}
          <div className="bg-[#111827] border border-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-bold text-blue-500 mb-3 uppercase">Northern Trust</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-gray-800" />
                <span>SHARE CLASSES</span>
              </label>
            </div>
          </div>

          {/* Fund Allocations */}
          <div className="bg-[#111827] border border-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-bold text-blue-500 mb-3 uppercase">Fund Allocations</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">SELECT CIP Solution</label>
                <Select>
                  <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-xs">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solution1">Solution 1</SelectItem>
                    <SelectItem value="solution2">Solution 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* IA Sector */}
          <div className="bg-[#111827] border border-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-bold text-blue-500 mb-3 uppercase">IA Sector</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-gray-800" />
                <span>Select IA Sector</span>
              </label>
            </div>
          </div>

          {/* Investment Type */}
          <div className="bg-[#111827] border border-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-bold text-blue-500 mb-3 uppercase">Investment Type</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-gray-800" />
                <span>Select Asset Type</span>
              </label>
            </div>
          </div>

          {/* Performance Section */}
          <div className="bg-[#111827] border border-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-bold text-blue-500 mb-3 uppercase">Performance</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">ANNUAL FEE (%)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="number" 
                    placeholder="Min"
                    value={minSize}
                    onChange={(e) => setMinSize(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                  <input 
                    type="number" 
                    placeholder="Max"
                    value={maxSize}
                    onChange={(e) => setMaxSize(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Management Company Sticker */}
          <div className="bg-[#111827] border border-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-bold text-blue-500 mb-3 uppercase">Management Company Sticker</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-gray-800" />
                <span>Include Sustainability/ESG</span>
              </label>
            </div>
          </div>

          {/* Manager Tenure */}
          <div className="bg-[#111827] border border-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-bold text-blue-500 mb-3 uppercase">Manager Tenure (years)</h3>
            <div className="grid grid-cols-2 gap-2">
              <input 
                type="number" 
                placeholder="Min"
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <input 
                type="number" 
                placeholder="Max"
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Yield Range */}
          <div className="bg-[#111827] border border-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-bold text-blue-500 mb-3 uppercase">Yield Range (%)</h3>
            <div className="grid grid-cols-2 gap-2">
              <input 
                type="number" 
                placeholder="Min"
                value={minYield}
                onChange={(e) => setMinYield(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <input 
                type="number" 
                placeholder="Max"
                value={maxYield}
                onChange={(e) => setMaxYield(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Main Content - Fund Table */}
        <div className="flex-1">
          <div className="bg-[#111827] border border-gray-800 rounded-lg overflow-hidden">
            {/* Search and Actions */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search fund name, ISIN..."
                  className="w-full bg-[#0B1120] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button variant="outline" size="sm" className="text-xs">
                  <Filter className="w-3 h-3 mr-2" />
                  Reset Filters
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0D1525] border-b border-gray-800">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">Shares</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">Maturation Date</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">Sector</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">Size</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">Performance Assessment</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">Fund Manager</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">Yield</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">YTD</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">1Y</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">3Y</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {fundData.map((fund, index) => (
                    <tr key={index} className="hover:bg-[#0D1525] transition-colors cursor-pointer">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-gray-800" />
                          <div>
                            <div className="text-sm font-medium text-blue-400 hover:text-blue-300">{fund.name}</div>
                            <div className="text-xs text-gray-500">{fund.isin}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">{fund.maturationDate}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{fund.sector}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{fund.size}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{fund.performanceAssessment}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{fund.fundManager}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{fund.yield}</td>
                      <td className={`px-4 py-3 text-sm font-medium ${fund.ytd && fund.ytd.includes('-') ? 'text-red-400' : 'text-green-400'}`}>
                        {fund.ytd || '-'}
                      </td>
                      <td className={`px-4 py-3 text-sm font-medium ${fund.oneYear.includes('-') ? 'text-red-400' : 'text-green-400'}`}>
                        {fund.oneYear}
                      </td>
                      <td className={`px-4 py-3 text-sm font-medium ${fund.threeYear.includes('-') ? 'text-red-400' : 'text-green-400'}`}>
                        {fund.threeYear}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800 text-xs text-gray-500">
              Showing {fundData.length} of 2,124 funds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}