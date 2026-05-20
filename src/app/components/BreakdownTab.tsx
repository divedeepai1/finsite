import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button } from './ui/button';

// Country data for Test4
const test4CountryData = [
  { country: 'United States', equity: 25, fixedIncome: 15 },
  { country: 'United Kingdom', equity: 18, fixedIncome: 30 },
  { country: 'Other', equity: 12, fixedIncome: 15 },
  { country: 'Japan', equity: 8, fixedIncome: 3 },
  { country: 'Unknown', equity: 12, fixedIncome: 0 },
  { country: 'France', equity: 5, fixedIncome: 7 },
  { country: 'Canada', equity: 4, fixedIncome: 2 },
  { country: 'Germany', equity: 3, fixedIncome: 2 },
  { country: 'China', equity: 5, fixedIncome: 2 },
  { country: 'South Korea', equity: 4, fixedIncome: 2 },
  { country: 'Singapore', equity: 3, fixedIncome: 0 },
  { country: 'Brazil', equity: 2, fixedIncome: 0 },
  { country: 'Australia', equity: 2, fixedIncome: 1 },
];

// Country data for Stan Life
const stanLifeCountryData = [
  { country: 'Unknown', equity: 0, fixedIncome: 75 },
  { country: 'United Kingdom', equity: 0, fixedIncome: 15 },
  { country: 'Australia', equity: 0, fixedIncome: 4 },
  { country: 'South Korea', equity: 0, fixedIncome: 2 },
  { country: 'Canada', equity: 0, fixedIncome: 1.5 },
  { country: 'France', equity: 0, fixedIncome: 1 },
  { country: 'Other', equity: 0, fixedIncome: 0.8 },
  { country: 'Sweden', equity: 0, fixedIncome: 0.5 },
  { country: 'Japan', equity: 0, fixedIncome: 0.4 },
  { country: 'China', equity: 0, fixedIncome: 0.3 },
];

// Regional data for Test1
const test1RegionalData = [
  { region: 'United States', equity: 32, fixedIncome: 50 },
  { region: 'United Kingdom', equity: 25, fixedIncome: 40 },
  { region: 'Eurozone', equity: 28, fixedIncome: 0 },
  { region: 'Japan', equity: 8, fixedIncome: 10 },
  { region: 'Asia Developed', equity: 5, fixedIncome: 10 },
  { region: 'Latin America', equity: 4, fixedIncome: 8 },
  { region: 'Asia Emerging', equity: 3, fixedIncome: 12 },
  { region: 'Canada', equity: 3, fixedIncome: 7 },
  { region: 'Europe Ex Euro', equity: 5, fixedIncome: 5 },
  { region: 'Australasia', equity: 3, fixedIncome: 2 },
  { region: 'Europe Emerging', equity: 2, fixedIncome: 0 },
  { region: 'Middle East', equity: 1, fixedIncome: 0.5 },
];

// Asset Class data for PruFund Global Diversification
const assetClassData = [
  {
    category: 'Equity',
    total: 60.69,
    items: [
      { name: 'UK Equity', value: 11.39, color: '#3B82F6' },
      { name: 'Europe Ex UK Equity', value: 7.82, color: '#60A5FA' },
      { name: 'North America Equity', value: 14.69, color: '#93C5FD' },
      { name: 'Emerging Equity', value: 6.39, color: '#BFDBFE' },
      { name: 'Asia Ex Japan', value: 4.36, color: '#DBEAFE' },
      { name: 'Japan Equity', value: 4.06, color: '#EFF6FF' },
      { name: 'Global Cash and Africa Equity', value: 1.13, color: '#C7D2FE' },
      { name: 'Asia Equity', value: 4.13, color: '#A5B4FC' },
      { name: 'Australasia', value: 1.39, color: '#818CF8' },
      { name: 'Global Cash and Equity', value: 0.66, color: '#6366F1' },
    ],
  },
  {
    category: 'Real Estate',
    total: 12.60,
    items: [
      { name: 'UK Real Estate', value: 6.03, color: '#F59E0B' },
      { name: 'US Real Estate', value: 3.67, color: '#FBBF24' },
      { name: 'Pan European Real Estate', value: 1.44, color: '#FCD34D' },
      { name: 'Asia Real Estate', value: 1.46, color: '#FDE68A' },
    ],
  },
  {
    category: 'Alternative Assets',
    total: 10.38,
    items: [
      { name: 'Private Equity', value: 3.59, color: '#A855F7' },
      { name: 'Infrastructure', value: 2.92, color: '#C084FC' },
      { name: 'Private High Yield', value: 1.14, color: '#D8B4FE' },
      { name: 'Commodities', value: 2.73, color: '#E9D5FF' },
    ],
  },
  {
    category: 'Credit',
    total: 16.33,
    items: [
      { name: 'Pan European Investment Corporate Bonds', value: 2.18, color: '#10B981' },
      { name: 'Pan European Inflation Corporate Bonds', value: 4.14, color: '#34D399' },
      { name: 'Global Corporate Bonds', value: 1.81, color: '#6EE7B7' },
      { name: 'Pan European Financial & Covered Corporate Bonds', value: 2.01, color: '#A7F3D0' },
      { name: 'Pan European Short/Med & Private Corporate Bonds', value: 1.14, color: '#D1FAE5' },
      { name: 'UK Secured/Unrated Bonds', value: 1.13, color: '#ECFDF5' },
      { name: 'US Investment Corporate Bonds', value: 0.29, color: '#C6F6D5' },
      { name: 'US Inflation Corporate Bonds', value: 1.14, color: '#9AE6B4' },
      { name: 'US Government & Sovereign Bonds', value: 1.14, color: '#68D391' },
      { name: 'Global Emerging Markets Bonds', value: 1.14, color: '#48BB78' },
      { name: 'Sterling Gilts', value: 0.31, color: '#38A169' },
      { name: 'Bridge Loans', value: 0.43, color: '#2F855A' },
      { name: 'US Africa', value: 0.47, color: '#276749' },
    ],
  },
  {
    category: 'Cash & Securitisation',
    total: 1.71,
    items: [
      { name: 'Cash & Securitisation', value: 1.71, color: '#6B7280' },
    ],
  },
];

// Colors for asset class donut
const assetClassColors = ['#3B82F6', '#F59E0B', '#A855F7', '#10B981', '#6B7280'];

const stackedData = [
  { name: 'Stan Life Corporate Sterling 2 Pen', segments: [
    { name: 'Other', value: 30, color: '#DC2626' },
    { name: 'Basic Materials', value: 8, color: '#EC4899' },
    { name: 'Communication Services', value: 5, color: '#A855F7' },
    { name: 'Consumer Cyclical', value: 8, color: '#3B82F6' },
    { name: 'Consumer Defensive', value: 10, color: '#06B6D4' },
    { name: 'Energy', value: 5, color: '#10B981' },
    { name: 'Financial Services', value: 8, color: '#84CC16' },
    { name: 'Healthcare', value: 8, color: '#22C55E' },
    { name: 'Industrials', value: 5, color: '#EAB308' },
    { name: 'Real Estate', value: 5, color: '#F59E0B' },
    { name: 'Technology', value: 5, color: '#EF4444' },
    { name: 'Utilities', value: 3, color: '#FBBF24' },
  ]},
  { name: 'Test4', segments: [
    { name: 'Other', value: 37.39, color: '#DC2626' },
    { name: 'Basic Materials', value: 10, color: '#EC4899' },
    { name: 'Communication Services', value: 5, color: '#A855F7' },
    { name: 'Consumer Cyclical', value: 5, color: '#3B82F6' },
    { name: 'Financial Services', value: 18.41, color: '#84CC16' },
    { name: 'Real Estate', value: 5, color: '#F59E0B' },
    { name: 'Energy', value: 5, color: '#10B981' },
    { name: 'Technology', value: 7, color: '#EF4444' },
    { name: 'Utilities', value: 7.2, color: '#FBBF24' },
  ]},
];

const test4Data = [
  { category: 'Cyclical', items: [
    { name: 'Basic Materials', value: 3.43, color: '#EC4899' },
    { name: 'Consumer Cyclical', value: 2.61, color: '#3B82F6' },
    { name: 'Financial Services', value: 18.41, color: '#84CC16' },
    { name: 'Real Estate', value: 1.37, color: '#F59E0B' },
  ], total: 21.82 },
  { category: 'Sensitive', items: [
    { name: 'Communication Services', value: 4.18, color: '#A855F7' },
    { name: 'Energy', value: 3.62, color: '#10B981' },
    { name: 'Industrials', value: 7.68, color: '#EAB308' },
    { name: 'Technology', value: 10.45, color: '#EF4444' },
  ], total: 25.93 },
  { category: 'Defensive', items: [
    { name: 'Consumer Defensive', value: 5.45, color: '#06B6D4' },
    { name: 'Healthcare', value: 7.68, color: '#22C55E' },
    { name: 'Utilities', value: 1.73, color: '#FBBF24' },
  ], total: 14.86 },
  { category: 'Others', items: [
    { name: 'Other', value: 37.39, color: '#DC2626' },
  ], total: 37.39 },
];

const stanLifeData = [
  { category: 'Cyclical', items: [
    { name: 'Basic Materials', value: 0.00, color: '#EC4899' },
    { name: 'Consumer Cyclical', value: 0.00, color: '#3B82F6' },
    { name: 'Financial Services', value: 0.00, color: '#84CC16' },
    { name: 'Real Estate', value: 0.00, color: '#F59E0B' },
  ], total: 0.00 },
  { category: 'Sensitive', items: [
    { name: 'Communication Services', value: 0.00, color: '#A855F7' },
    { name: 'Energy', value: 0.00, color: '#10B981' },
    { name: 'Industrials', value: 0.00, color: '#EAB308' },
    { name: 'Technology', value: 0.00, color: '#FBBF24' },
  ], total: 0.00 },
  { category: 'Defensive', items: [
    { name: 'Consumer Defensive', value: 0.00, color: '#06B6D4' },
    { name: 'Healthcare', value: 0.00, color: '#22C55E' },
    { name: 'Utilities', value: 0.00, color: '#FBBF24' },
  ], total: 0.00 },
  { category: 'Others', items: [
    { name: 'Other', value: 100.00, color: '#DC2626' },
  ], total: 100.00 },
];

// Convert data for donut charts
const test4DonutData = test4Data.map(category => ({
  name: category.category,
  value: category.total,
  color: category.items[0]?.color || '#DC2626'
}));

const stanLifeDonutData = stanLifeData.map(category => ({
  name: category.category,
  value: category.total,
  color: category.items[0]?.color || '#DC2626'
}));

// Asset class donut data
const assetClassDonutData = assetClassData.map((category, index) => ({
  name: category.category,
  value: category.total,
  color: assetClassColors[index],
}));

export function BreakdownTab() {
  const [activeSubTab, setActiveSubTab] = useState<'asset-class' | 'sector' | 'country' | 'regional'>('sector');

  return (
    <div className="bg-[#0B1120]">
      {/* Sub-tabs */}
      <div className="flex items-center gap-2 mb-8">
        <button
          onClick={() => setActiveSubTab('asset-class')}
          className={`px-4 py-2 rounded text-xs font-medium transition-colors ${
            activeSubTab === 'asset-class'
              ? 'bg-[#3B82F6] text-white'
              : 'bg-[#1a1f2e] text-gray-400 hover:text-white'
          }`}
        >
          Asset Class
        </button>
        <button
          onClick={() => setActiveSubTab('sector')}
          className={`px-4 py-2 rounded text-xs font-medium transition-colors ${
            activeSubTab === 'sector'
              ? 'bg-[#3B82F6] text-white'
              : 'bg-[#1a1f2e] text-gray-400 hover:text-white'
          }`}
        >
          Sector
        </button>
        <button
          onClick={() => setActiveSubTab('country')}
          className={`px-4 py-2 rounded text-xs font-medium transition-colors ${
            activeSubTab === 'country'
              ? 'bg-[#3B82F6] text-white'
              : 'bg-[#1a1f2e] text-gray-400 hover:text-white'
          }`}
        >
          Country
        </button>
        <button
          onClick={() => setActiveSubTab('regional')}
          className={`px-4 py-2 rounded text-xs font-medium transition-colors ${
            activeSubTab === 'regional'
              ? 'bg-[#3B82F6] text-white'
              : 'bg-[#1a1f2e] text-gray-400 hover:text-white'
          }`}
        >
          Regional
        </button>
      </div>

      {/* Asset Class View */}
      {activeSubTab === 'asset-class' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">PruFund Global Diversification</h3>
              <p className="text-sm text-gray-400">Asset allocations to October 2025</p>
            </div>
            <Button className="bg-transparent border border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white text-xs px-4 py-2">
              RESET MY FILTERS
            </Button>
          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-lg p-8">
            <div className="flex items-start gap-12">
              {/* Large Donut Chart */}
              <div className="w-96 h-96 flex-shrink-0" style={{ minHeight: '384px', minWidth: '384px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetClassData.flatMap(category => category.items)}
                      cx="50%"
                      cy="50%"
                      innerRadius={120}
                      outerRadius={160}
                      paddingAngle={1}
                      dataKey="value"
                    >
                      {assetClassData.flatMap(category => category.items).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Asset Class Breakdown */}
              <div className="flex-1 space-y-6 text-sm">
                {assetClassData.map((category, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: assetClassColors[index] }} />
                        <span className="text-white font-bold">{category.category}</span>
                      </div>
                      <span className="text-white font-bold">({category.total.toFixed(2)}%)</span>
                    </div>
                    <div className="space-y-1.5 pl-5">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-xs">{itemIndex + 1}</span>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-gray-300 text-xs">{item.name}</span>
                          </div>
                          <span className="text-gray-300 text-xs">{item.value.toFixed(2)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            This chart gives an indication of the current breakdown of PruFund Protected as at 2 October 2025. Asset allocation has been extracted from PPF as at 1 October 2025, a composition scheme for the underlying funds and the firm's best knowledge of the market data available to work. For full details of the composition of PruFund Protected, please refer to the Simplified Prospectus available at www.mandg.com or your financial adviser. The exact allocations may have changed. Individual CC element may differ.
          </div>
        </div>
      )}

      {/* Sector View */}
      {activeSubTab === 'sector' && (
        <>
          {/* Stacked Asset Allocations */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-white mb-6">Stacked Asset Allocations</h3>
            
            <div className="space-y-4">
              {stackedData.map((item, index) => (
                <div key={index}>
                  <div className="text-xs text-gray-400 mb-2">{item.name}</div>
                  <div className="flex h-8 rounded overflow-hidden">
                    {item.segments.map((segment, segIndex) => (
                      <div
                        key={segIndex}
                        style={{
                          width: `${segment.value}%`,
                          backgroundColor: segment.color,
                        }}
                        className="hover:opacity-80 transition-opacity"
                        title={`${segment.name}: ${segment.value}%`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 mt-6 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#DC2626]" />
                <span className="text-gray-400">Other</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#EC4899]" />
                <span className="text-gray-400">Basic Materials</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#A855F7]" />
                <span className="text-gray-400">Communication Services</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#3B82F6]" />
                <span className="text-gray-400">Consumer Cyclical</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#06B6D4]" />
                <span className="text-gray-400">Consumer Defensive</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#10B981]" />
                <span className="text-gray-400">Energy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#84CC16]" />
                <span className="text-gray-400">Financial Services</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#22C55E]" />
                <span className="text-gray-400">Healthcare</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#EAB308]" />
                <span className="text-gray-400">Industrials</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#F59E0B]" />
                <span className="text-gray-400">Real Estate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#EF4444]" />
                <span className="text-gray-400">Technology</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#FBBF24]" />
                <span className="text-gray-400">Utilities</span>
              </div>
            </div>
          </div>

          {/* Portfolio Breakdown Cards */}
          <div className="grid grid-cols-2 gap-6">
            {/* Test4 */}
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-6">Test4</h3>
              
              <div className="flex items-start gap-6">
                {/* Donut Chart */}
                <div className="w-48 h-48 flex-shrink-0" style={{ minHeight: '192px', minWidth: '192px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={test4DonutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {test4DonutData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Breakdown List */}
                <div className="flex-1 space-y-4 text-sm">
                  {test4Data.map((category, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">{category.category}</span>
                        <span className="text-white font-semibold">{category.total.toFixed(2)}%</span>
                      </div>
                      <div className="space-y-1 pl-4">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-gray-400">{item.name}</span>
                            </div>
                            <span className="text-gray-400">{item.value.toFixed(2)}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stan Life Corporate Sterling 2 Pen */}
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-6">Stan Life Corporate Sterling 2 Pen</h3>
              
              <div className="flex items-start gap-6">
                {/* Donut Chart */}
                <div className="w-48 h-48 flex-shrink-0" style={{ minHeight: '192px', minWidth: '192px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stanLifeDonutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {stanLifeDonutData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Breakdown List */}
                <div className="flex-1 space-y-4 text-sm">
                  {stanLifeData.map((category, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">{category.category}</span>
                        <span className="text-white font-semibold">{category.total.toFixed(2)}%</span>
                      </div>
                      <div className="space-y-1 pl-4">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-gray-400">{item.name}</span>
                            </div>
                            <span className="text-gray-400">{item.value.toFixed(2)}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Country View */}
      {activeSubTab === 'country' && (
        <div className="grid grid-cols-2 gap-6">
          {/* Test4 */}
          <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-8">Test4</h3>
            
            <ResponsiveContainer width="100%" height={500}>
              <BarChart 
                data={test4CountryData} 
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" domain={[0, 50]} stroke="#9CA3AF" />
                <YAxis type="category" dataKey="country" stroke="#9CA3AF" width={90} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="equity" fill="#F97316" radius={[0, 4, 4, 0]} />
                <Bar dataKey="fixedIncome" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F97316]" />
                <span className="text-sm text-gray-300">Equity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
                <span className="text-sm text-gray-300">Fixed Income</span>
              </div>
            </div>
          </div>

          {/* Stan Life Corporate Sterling 2 Pen */}
          <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-8">Stan Life Corporate Sterling 2 Pen</h3>
            
            <ResponsiveContainer width="100%" height={500}>
              <BarChart 
                data={stanLifeCountryData} 
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" domain={[0, 80]} stroke="#9CA3AF" />
                <YAxis type="category" dataKey="country" stroke="#9CA3AF" width={90} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="equity" fill="#F97316" radius={[0, 4, 4, 0]} />
                <Bar dataKey="fixedIncome" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F97316]" />
                <span className="text-sm text-gray-300">Equity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
                <span className="text-sm text-gray-300">Fixed Income</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regional View */}
      {activeSubTab === 'regional' && (
        <div className="bg-[#111827] border border-gray-800 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-8">Test1</h3>
          
          <ResponsiveContainer width="100%" height={500}>
            <BarChart 
              data={test1RegionalData} 
              layout="vertical"
              margin={{ top: 5, right: 30, left: 140, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" domain={[0, 60]} stroke="#9CA3AF" />
              <YAxis type="category" dataKey="region" stroke="#9CA3AF" width={130} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="equity" fill="#F97316" radius={[0, 4, 4, 0]} />
              <Bar dataKey="fixedIncome" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#F97316]" />
              <span className="text-sm text-gray-300">Equity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
              <span className="text-sm text-gray-300">Fixed Income</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
        <span>● System Operational</span>
        <span>08/02/2025</span>
      </div>
    </div>
  );
}