import { Search, TrendingDown, TrendingUp, Target, DollarSign, BarChart3, Flame, Activity } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

export default function HistoricalAnalysis() {
  const [selectedTimeHorizon, setSelectedTimeHorizon] = useState<'1Y' | '5Y' | '10Y' | '20Y' | '50Y' | '100Y' | 'CUSTOM'>('5Y');
  const [lookbackYears, setLookbackYears] = useState(5);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0B1220] text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* SEARCH PARAMETERS Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">Search Parameters</h2>
            </div>
            <span className="text-xs text-gray-400">Define your historical search criteria</span>
          </div>

          {/* Search Input */}
          <div>
            <input
              type="text"
              placeholder="e.g., Periods of high inflation coupled with a rapid collapse in tech equities..."
              className="w-full bg-[#111827] border border-gray-700 rounded-lg px-5 py-4 text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
            />
          </div>
        </div>

        {/* TIME HORIZON Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white uppercase tracking-wide">Time Horizon</h2>
          </div>

          {/* Time Period Buttons */}
          <div className="flex gap-3 mb-6">
            {(['1Y', '5Y', '10Y', '20Y', '50Y', '100Y', 'CUSTOM'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedTimeHorizon(period)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  selectedTimeHorizon === period
                    ? 'bg-cyan-500 text-white'
                    : 'bg-[#111827] border border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Lookback Event Slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs text-gray-400">Lookback Event</label>
              <span className="text-sm font-bold text-cyan-400">{lookbackYears} Years</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="1"
                max="100"
                value={lookbackYears}
                onChange={(e) => setLookbackYears(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-cyan"
                style={{
                  background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(lookbackYears - 1) / 99 * 100}%, #374151 ${(lookbackYears - 1) / 99 * 100}%, #374151 100%)`
                }}
              />
              {/* Slider markers */}
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>1Y</span>
                <span>25Y</span>
                <span>50Y</span>
                <span>75Y</span>
                <span>100Y</span>
              </div>
            </div>
          </div>
        </div>

        {/* QUANTITATIVE FILTERS Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white uppercase tracking-wide">Quantitative Filters</h2>
          </div>
          <p className="text-xs text-gray-400 mb-6">Add precision constraints to your search</p>

          {/* Filter Cards Grid */}
          <div className="grid grid-cols-4 gap-4">
            {/* Volatility */}
            <div className="bg-[#111827] border border-gray-700 rounded-lg p-4 hover:border-red-500/50 transition-all cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-red-400" />
                </div>
                <h3 className="text-sm font-bold text-white">Volatility</h3>
              </div>
              <p className="text-xs text-gray-400">Market Impact</p>
            </div>

            {/* Drawdown */}
            <div className="bg-[#111827] border border-gray-700 rounded-lg p-4 hover:border-pink-500/50 transition-all cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-pink-500/20 border border-pink-500/30 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-pink-400" />
                </div>
                <h3 className="text-sm font-bold text-white">Drawdown</h3>
              </div>
              <p className="text-xs text-gray-400">Max Decline</p>
            </div>

            {/* Recovery */}
            <div className="bg-[#111827] border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-all cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <h3 className="text-sm font-bold text-white">Recovery</h3>
              </div>
              <p className="text-xs text-gray-400">Max Period</p>
            </div>

            {/* Macro Factor */}
            <div className="bg-[#111827] border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-all cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="text-sm font-bold text-white">Macro Factor</h3>
              </div>
              <p className="text-xs text-gray-400">Market Weight</p>
            </div>

            {/* Correlation */}
            <div className="bg-[#111827] border border-gray-700 rounded-lg p-4 hover:border-yellow-500/50 transition-all cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-yellow-400" />
                </div>
                <h3 className="text-sm font-bold text-white">Correlation</h3>
              </div>
              <p className="text-xs text-gray-400">Asset Impact</p>
            </div>

            {/* Sector */}
            <div className="bg-[#111827] border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-all cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-purple-400" />
                </div>
                <h3 className="text-sm font-bold text-white">Sector</h3>
              </div>
              <p className="text-xs text-gray-400">Market Impact</p>
            </div>

            {/* Inflation */}
            <div className="bg-[#111827] border border-gray-700 rounded-lg p-4 hover:border-orange-500/50 transition-all cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/30 rounded-lg flex items-center justify-center">
                  <Flame className="w-4 h-4 text-orange-400" />
                </div>
                <h3 className="text-sm font-bold text-white">Inflation</h3>
              </div>
              <p className="text-xs text-gray-400">Max Period</p>
            </div>

            {/* Liquidity */}
            <div className="bg-[#111827] border border-gray-700 rounded-lg p-4 hover:border-cyan-500/50 transition-all cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-cyan-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-cyan-400" />
                </div>
                <h3 className="text-sm font-bold text-white">Liquidity</h3>
              </div>
              <p className="text-xs text-gray-400">Market Weight</p>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-800 mb-12">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-gray-400">
              AI will analyze <span className="text-cyan-400 font-bold">Historical patterns</span> matching your criteria
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 bg-[#111827] border border-gray-700 text-white rounded-lg font-bold text-sm hover:border-gray-600 transition-all">
              Reset
            </button>
            <Link to="/historical-analysis-results" className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-bold text-sm transition-all flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search
            </Link>
          </div>
        </div>

        {/* SUMMARY TABLE - HISTORICAL MATCHES Section */}
        <div className="bg-[#111827] border border-gray-700 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-[#0D1525]">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wide">Summary Table - Historical Matches</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">8 Events Found</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">8 Layouts</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Historical Event / Era</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date Range</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Primary Catalyst</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Peak VIX</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Max Drawdown</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Time to Recovery</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Match %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {/* 1973 Oil Shock */}
                <tr className="hover:bg-[#0D1525] cursor-pointer transition-colors" onClick={() => setSelectedEvent('1973 Oil Shock')}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-bold text-white">1973 Oil Shock</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">Oct 1973 - Apr 1975</td>
                  <td className="px-6 py-4 text-sm text-gray-300">OPEC embargo + Bretton Woods collapse</td>
                  <td className="px-6 py-4 text-sm text-white font-medium">42.8</td>
                  <td className="px-6 py-4 text-sm font-bold text-red-400">-48.2%</td>
                  <td className="px-6 py-4 text-sm text-gray-300">7.4 years</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold">
                      94%
                    </span>
                  </td>
                </tr>

                {/* Dot-com Crash */}
                <tr className="hover:bg-[#0D1525] cursor-pointer transition-colors" onClick={() => setSelectedEvent('Dot-com Crash')}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-bold text-white">Dot-com Crash</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">Mar 2000 - Oct 2002</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Tech bubble burst + aggressive rate hikes</td>
                  <td className="px-6 py-4 text-sm text-white font-medium">45.7</td>
                  <td className="px-6 py-4 text-sm font-bold text-red-400">-76.4%</td>
                  <td className="px-6 py-4 text-sm text-gray-300">10.7 years</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold">
                      91%
                    </span>
                  </td>
                </tr>

                {/* 2008 Global Financial Crisis */}
                <tr className="hover:bg-[#0D1525] cursor-pointer transition-colors" onClick={() => setSelectedEvent('2008 Global Financial Crisis')}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-bold text-white">2008 Global Financial Crisis</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">Sep 2008 - Mar 2009</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Subprime mortgage collapse + banking crisis</td>
                  <td className="px-6 py-4 text-sm text-white font-medium">80.9</td>
                  <td className="px-6 py-4 text-sm font-bold text-red-400">-56.8%</td>
                  <td className="px-6 py-4 text-sm text-gray-300">4.1 years</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-bold">
                      87%
                    </span>
                  </td>
                </tr>

                {/* COVID-19 Crash */}
                <tr className="hover:bg-[#0D1525] cursor-pointer transition-colors" onClick={() => setSelectedEvent('COVID-19 Crash')}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-bold text-white">COVID-19 Crash</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">Feb 2020 - Mar 2020</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Global pandemic + economic shutdown</td>
                  <td className="px-6 py-4 text-sm text-white font-medium">82.7</td>
                  <td className="px-6 py-4 text-sm font-bold text-red-400">-33.9%</td>
                  <td className="px-6 py-4 text-sm text-gray-300">0.5 years</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold">
                      85%
                    </span>
                  </td>
                </tr>

                {/* 2022 Tech Selloff */}
                <tr className="hover:bg-[#0D1525] cursor-pointer transition-colors" onClick={() => setSelectedEvent('2022 Tech Selloff')}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm font-bold text-white">2022 Tech Selloff</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">Jan 2022 - Oct 2022</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Inflation surge + aggressive Fed tightening</td>
                  <td className="px-6 py-4 text-sm text-white font-medium">38.5</td>
                  <td className="px-6 py-4 text-sm font-bold text-red-400">-35.0%</td>
                  <td className="px-6 py-4 text-sm text-gray-300">1.8 years</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold">
                      82%
                    </span>
                  </td>
                </tr>

                {/* 1987 Black Monday */}
                <tr className="hover:bg-[#0D1525] cursor-pointer transition-colors" onClick={() => setSelectedEvent('1987 Black Monday')}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span className="text-sm font-bold text-white">1987 Black Monday</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">Oct 1987</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Portfolio insurance + program trading</td>
                  <td className="px-6 py-4 text-sm text-white font-medium">61.2</td>
                  <td className="px-6 py-4 text-sm font-bold text-red-400">-33.5%</td>
                  <td className="px-6 py-4 text-sm text-gray-300">1.9 years</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-500/20 border border-gray-500/30 text-gray-400 text-xs font-bold">
                      78%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-700 bg-[#0D1525]">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Click any row to view detailed causal analysis</span>
            </div>
            <span className="text-xs text-gray-500">Sorted by Match %, 1k</span>
          </div>
        </div>

        {/* HISTORICAL TIMELINE Section */}
        <div className="mt-8 bg-[#111827] border border-gray-700 rounded-lg overflow-hidden">
          {/* Timeline Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-[#0D1525]">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wide">Historical Timeline</h2>
            </div>
            <button className="text-xs text-gray-400 hover:text-white transition-colors">
              Collapse
            </button>
          </div>

          {/* Timeline Visualization */}
          <div className="p-8 bg-[#0A0E1A]">
            <div className="relative h-64">
              {/* Timeline axis */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-800"></div>
              
              {/* Year labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2" style={{ top: '100%', paddingTop: '8px' }}>
                <span>1970</span>
                <span>1980</span>
                <span>1990</span>
                <span>2000</span>
                <span>2010</span>
                <span>2020</span>
              </div>

              {/* Events */}
              <div className="absolute inset-0 flex items-end justify-around pb-6">
                {/* 1973 Oil Shock */}
                <div className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity" style={{ width: '12%' }} onClick={() => setSelectedEvent('1973 Oil Shock')}>
                  <div className="relative mb-2">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center border-2 border-red-400 shadow-lg shadow-red-500/50">
                      <TrendingDown className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-center mb-2">
                    <div className="text-xs font-bold text-white">1973</div>
                    <div className="text-xs text-gray-400">Oil Shock</div>
                  </div>
                  <div className="w-full bg-gradient-to-t from-red-900/80 to-red-600/40 rounded-t-lg" style={{ height: '120px' }}></div>
                </div>

                {/* 1987 Black Monday */}
                <div className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity" style={{ width: '12%' }} onClick={() => setSelectedEvent('1987 Black Monday')}>
                  <div className="relative mb-2">
                    <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center border-2 border-pink-400 shadow-lg shadow-pink-500/50">
                      <TrendingDown className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-center mb-2">
                    <div className="text-xs font-bold text-white">1987</div>
                    <div className="text-xs text-gray-400">Black Monday</div>
                  </div>
                  <div className="w-full bg-gradient-to-t from-pink-900/80 to-pink-600/40 rounded-t-lg" style={{ height: '85px' }}></div>
                </div>

                {/* 2000 Dot-com */}
                <div className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity" style={{ width: '12%' }} onClick={() => setSelectedEvent('Dot-com Crash')}>
                  <div className="relative mb-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-2 border-blue-400 shadow-lg shadow-blue-500/50">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-center mb-2">
                    <div className="text-xs font-bold text-white">2000</div>
                    <div className="text-xs text-gray-400">Dot-com</div>
                  </div>
                  <div className="w-full bg-gradient-to-t from-blue-900/80 to-blue-600/40 rounded-t-lg" style={{ height: '150px' }}></div>
                </div>

                {/* 2008 GFC */}
                <div className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity" style={{ width: '12%' }} onClick={() => setSelectedEvent('2008 Global Financial Crisis')}>
                  <div className="relative mb-2">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-yellow-400 shadow-lg shadow-yellow-500/50">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-center mb-2">
                    <div className="text-xs font-bold text-white">2008</div>
                    <div className="text-xs text-gray-400">GFC</div>
                  </div>
                  <div className="w-full bg-gradient-to-t from-yellow-900/80 to-yellow-600/40 rounded-t-lg" style={{ height: '135px' }}></div>
                </div>

                {/* 2020 COVID */}
                <div className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity" style={{ width: '12%' }} onClick={() => setSelectedEvent('COVID-19 Crash')}>
                  <div className="relative mb-2">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center border-2 border-purple-400 shadow-lg shadow-purple-500/50">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-center mb-2">
                    <div className="text-xs font-bold text-white">2020</div>
                    <div className="text-xs text-gray-400">COVID</div>
                  </div>
                  <div className="w-full bg-gradient-to-t from-purple-900/80 to-purple-600/40 rounded-t-lg" style={{ height: '100px' }}></div>
                </div>

                {/* 2022 Tech Selloff */}
                <div className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity" style={{ width: '12%' }} onClick={() => setSelectedEvent('2022 Tech Selloff')}>
                  <div className="relative mb-2">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center border-2 border-orange-400 shadow-lg shadow-orange-500/50">
                      <TrendingDown className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-center mb-2">
                    <div className="text-xs font-bold text-white">2022</div>
                    <div className="text-xs text-gray-400">Tech Selloff</div>
                  </div>
                  <div className="w-full bg-gradient-to-t from-orange-900/80 to-orange-600/40 rounded-t-lg" style={{ height: '95px' }}></div>
                </div>
              </div>
            </div>

            {/* Timeline Controls */}
            <div className="flex items-center gap-6 mt-8 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-cyan-500 rounded"></div>
                <span className="text-xs text-gray-400">Event Duration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
                <span className="text-xs text-gray-400">Event Marker</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs text-gray-400">Height represents severity (drawdown magnitude)</span>
              </div>
            </div>
          </div>
        </div>

        {/* CAUSAL MATRIX VIEW Section */}
        <div className="mt-8 bg-[#111827] border border-gray-700 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-[#0D1525]">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wide">Causal Matrix View</h2>
            </div>
            {selectedEvent && (
              <span className="text-xs text-gray-400">
                Select an event to view drivers
              </span>
            )}
            {!selectedEvent && (
              <span className="text-xs text-gray-400">
                Select an event to view drivers
              </span>
            )}
          </div>

          {/* Empty State or Content */}
          <div className="p-12 bg-[#0A0E1A] min-h-[300px] flex items-center justify-center">
            {!selectedEvent ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-gray-500 text-sm">Select an event from the timeline or table above</p>
              </div>
            ) : (
              <div className="text-center w-full">
                <div className="text-gray-400 text-sm">
                  Causal analysis for <span className="text-cyan-400 font-bold">{selectedEvent}</span> will be displayed here
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom CSS for slider */}
      <style>{`
        input[type="range"].slider-cyan::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          background: #06b6d4;
          cursor: pointer;
          border-radius: 50%;
          border: 3px solid #0B1220;
          box-shadow: 0 0 0 1px #06b6d4;
        }

        input[type="range"].slider-cyan::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: #06b6d4;
          cursor: pointer;
          border-radius: 50%;
          border: 3px solid #0B1220;
          box-shadow: 0 0 0 1px #06b6d4;
        }

        input[type="range"].slider-cyan:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.3);
        }

        input[type="range"].slider-cyan:focus::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.3);
        }
      `}</style>
    </div>
  );
}