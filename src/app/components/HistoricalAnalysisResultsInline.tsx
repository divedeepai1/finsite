import React, { useState } from 'react';
import { 
  ArrowLeft, Info, MoreHorizontal, ChevronDown, SlidersHorizontal, Circle
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList, ReferenceLine
} from 'recharts';
import { motion } from 'motion/react';

interface Props {
  onReset: () => void;
}

export const HistoricalAnalysisResultsInline: React.FC<Props> = ({ onReset }) => {
  const [activeTab, setActiveTab] = useState('Opportunity cost');

  // --- MOCK DATA ---

  const oppCostData = [
    { name: 'Stay invested', value: 768, fill: '#10B981' },
    { name: 'Miss 10 best', value: 341, fill: '#34D399' },
    { name: 'Miss 20', value: 198, fill: '#FBBF24' },
    { name: 'Miss 30', value: 125, fill: '#F59E0B' },
    { name: 'Miss 40', value: 82, fill: '#EA580C' },
    { name: 'Miss 50', value: 56, fill: '#EF4444' },
  ];

  const recoveryData = [
    { crisis: 'Black Monday', period: 'Oct 1987', drawdown: '-33.5%', recovery: '23 mo', y1: '+21.4%', y3: '+101.9%' },
    { crisis: 'Asian crisis', period: 'Jul 1997 – Oct 98', drawdown: '-19.3%', recovery: '4 mo', y1: '+37.9%', y3: '+105.7%' },
    { crisis: 'Dotcom bust', period: 'Mar 2000 – Oct 02', drawdown: '-49.1%', recovery: '56 mo', y1: '+33.7%', y3: '+90.4%' },
    { crisis: 'Global financial crisis', period: 'Oct 2007 – Mar 09', drawdown: '-56.8%', recovery: '49 mo', y1: '+72.3%', y3: '+177.6%' },
    { crisis: 'Eurozone debt', period: 'Apr – Oct 2011', drawdown: '-19.4%', recovery: '5 mo', y1: '+29.6%', y3: '+82.1%' },
    { crisis: 'COVID crash', period: 'Feb – Mar 2020', drawdown: '-33.9%', recovery: '5 mo', y1: '+74.8%', y3: '+109.5%' },
    { crisis: '2022 stocks & bonds', period: 'Jan – Oct 2022', drawdown: '-25.4%', recovery: '15 mo', y1: '+21.6%', y3: '+48.2%' },
    { crisis: 'Median outcome', period: '', drawdown: '-33.5%', recovery: '15 mo', y1: '+33.7%', y3: '+101.9%', isMedian: true },
  ];

  const regretData = [
    { date: 'Feb 20', held: 100, reentered: 100, cash: 100 },
    { date: 'Mar 20', held: 60, reentered: 60, cash: 60 },
    { date: 'Sep 20', held: 90, reentered: 60, cash: 61 },
    { date: 'Mar 21', held: 120, reentered: 90, cash: 62 },
    { date: 'Mar 22', held: 150, reentered: 110, cash: 64 },
    { date: 'May 22', held: 164, reentered: 122, cash: 66 },
  ];

  const holdingOdds = [
    { period: '1 day', prob: 53.8, desc: 'Coin flip — high noise, no edge' },
    { period: '1 month', prob: 62.9, desc: 'Marginally better than chance' },
    { period: '1 year', prob: 74.6, desc: 'Strong edge but real loss risk' },
    { period: '3 years', prob: 85.7, desc: 'Loss windows narrow sharply' },
    { period: '5 years', prob: 94.2, desc: 'Losses only in pre-recovery periods' },
    { period: '10 years', prob: 99.4, desc: 'Effectively certain' },
    { period: '20 years', prob: 100.0, desc: 'No 20Y window ever lost money' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#111827] border border-[#374151] p-3 rounded-lg shadow-xl">
          <p className="text-white font-bold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-gray-300">{entry.name}:</span>
              <span className="text-white font-semibold">£{entry.value}k</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#0B1220] min-h-screen text-white font-sans pb-20"
    >
      {/* Top Navigation & Header */}
      <div className="sticky top-0 z-10 bg-[#0B1220]/95 backdrop-blur-md pt-6 pb-4 border-b border-[#1F2937] px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <button 
                onClick={onReset} 
                className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider mb-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Historical Analysis
              </button>
              <h1 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
                Time in the market vs timing the market
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400 font-medium">Reference asset</span>
              <div className="flex items-center bg-[#111827] border border-[#1F2937] p-1 rounded-lg">
                <button className="px-4 py-1.5 text-xs font-semibold bg-[#1E3A8A] text-white rounded-md shadow-sm">S&P 500 TR</button>
                <button className="px-4 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">60/40 portfolio</button>
                <button className="px-4 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">MSCI World</button>
                <button className="px-4 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">Your fund</button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar">
            {['Opportunity cost', 'Recovery patterns', 'Regret simulator', 'Holding period odds', 'Today vs the past', 'Sales narrative'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-semibold whitespace-nowrap pb-2 border-b-2 transition-colors ${
                  activeTab === tab ? 'border-white text-white' : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 mt-8 space-y-12">
        
        {/* SECTION 1: OPPORTUNITY COST */}
        <section id="opportunity-cost">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">OPPORTUNITY COST — WHAT YOU'D HAVE MISSED</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
            {/* Chart Area */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">COST OF MISSING THE BEST DAYS</h3>
                  <div className="flex items-center bg-[#1E293B] rounded p-0.5 ml-4">
                    <button className="px-2 py-0.5 text-[10px] font-medium text-gray-400 hover:text-white">10Y</button>
                    <button className="px-2 py-0.5 text-[10px] font-medium text-gray-400 hover:text-white">20Y</button>
                    <button className="px-2 py-0.5 text-[10px] font-medium bg-[#3B82F6] text-white rounded-sm shadow-sm">30Y</button>
                    <button className="px-2 py-0.5 text-[10px] font-medium text-gray-400 hover:text-white">Inception</button>
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </div>

              <div className="h-[350px] mt-4">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <BarChart data={oppCostData} margin={{ top: 30, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#9CA3AF" 
                      tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }} 
                      tickLine={false} 
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis 
                      stroke="#6B7280" 
                      tick={{ fill: '#6B7280', fontSize: 12 }} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(val) => `£${val}k`}
                      dx={-10}
                    />
                    <Tooltip cursor={{ fill: '#1E293B', opacity: 0.4 }} content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={80}>
                      {oppCostData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                      <LabelList 
                        dataKey="value" 
                        position="top" 
                        formatter={(val: any) => `£${val}k`} 
                        fill="#fff" 
                        fontSize={16} 
                        fontWeight="bold" 
                        offset={12}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-xs text-gray-400 mt-4">£100k invested in S&P 500 TR, 1996–2026</p>
            </div>

            {/* Side Panel */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">THE CLUSTERING PROBLEM</h3>
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">BEST DAYS YEAR WORST</div>
                  <div className="text-2xl font-bold text-white mb-1">14 of 20</div>
                  <div className="text-[10px] text-gray-400">within 2 weeks of a top 20 worst day</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">BEST DAYS IN BEAR MARKETS</div>
                  <div className="text-2xl font-bold text-white mb-1">42%</div>
                  <div className="text-[10px] text-gray-400">of the 50 best days occurred in declared bear markets</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">COST OF 1MO ON SIDELINES</div>
                  <div className="text-2xl font-bold text-white mb-1">-1.4%</div>
                  <div className="text-[10px] text-gray-400">avg drag of being in cash one month at random</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">DALBAR GAP</div>
                  <div className="text-2xl font-bold text-white mb-1">-2.1%/yr</div>
                  <div className="text-[10px] text-gray-400">avg investor vs fund returns, 20Y</div>
                </div>
              </div>

              <div className="mt-auto bg-[#1E293B]/50 border-l-2 border-blue-500 p-4 rounded-r-lg">
                <p className="text-xs text-gray-300 leading-relaxed">
                  The instinct to wait until volatility passes is structurally backwards — the best days cluster <span className="text-white font-bold">inside</span> the worst periods, not after them. Selling to avoid the storm forfeits the rebound that defines long run returns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: RECOVERY PATTERNS */}
        <section id="recovery-patterns">
          <div className="flex items-center gap-4 mb-4 mt-8">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">RECOVERY PATTERNS — EVERY CRISIS YOU'VE FELT BEFORE</h2>
          </div>
          
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-[#1F2937]">
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">MAJOR DRAWDOWNS AND WHAT HAPPENED NEXT</h3>
                <div className="flex items-center bg-[#1E293B] rounded p-0.5 ml-4">
                  <button className="px-3 py-1 text-[10px] font-medium bg-[#3B82F6] text-white rounded-sm shadow-sm">Equities</button>
                  <button className="px-3 py-1 text-[10px] font-medium text-gray-400 hover:text-white">60/40</button>
                  <button className="px-3 py-1 text-[10px] font-medium text-gray-400 hover:text-white">Multi-asset</button>
                </div>
              </div>
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#0B1220]/50 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">CRISIS</th>
                    <th className="px-6 py-4">PERIOD</th>
                    <th className="px-6 py-4 text-right">DRAWDOWN</th>
                    <th className="px-6 py-4 text-right">RECOVERY</th>
                    <th className="px-6 py-4 text-right">+1Y AFTER LOW</th>
                    <th className="px-6 py-4 text-right">+3Y IF HELD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F2937]">
                  {recoveryData.map((row, idx) => (
                    <tr key={idx} className={row.isMedian ? 'bg-[#1E293B]/40 font-semibold' : 'hover:bg-[#1E293B]/20 transition-colors'}>
                      <td className={`px-6 py-4 ${row.isMedian ? 'text-white' : 'text-gray-300'}`}>{row.crisis}</td>
                      <td className="px-6 py-4 text-gray-500 text-xs">{row.period}</td>
                      <td className="px-6 py-4 text-right text-red-400">{row.drawdown}</td>
                      <td className="px-6 py-4 text-right text-gray-300">{row.recovery}</td>
                      <td className="px-6 py-4 text-right text-emerald-400">{row.y1}</td>
                      <td className="px-6 py-4 text-right text-emerald-400">{row.y3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-5 bg-[#1E293B]/30 border-t border-[#1F2937]">
              <div className="border-l-2 border-blue-500 pl-4 py-1">
                <p className="text-xs text-gray-300 leading-relaxed">
                  Across the seven most severe drawdowns of the last forty years, the median holder was made whole within 15 months and held an investment worth double its starting value five years later. Every single crisis paid the patient investor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: REGRET SIMULATOR */}
        <section id="regret-simulator">
          <div className="flex items-center gap-4 mb-4 mt-8">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">REGRET SIMULATOR — THE COST OF SELLING AT THE TROUGH</h2>
          </div>
          
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">IF YOU'D SOLD AT THE BOTTOM AND RE-ENTERED LATER</h3>
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-6 mb-10 bg-[#0B1220]/50 p-4 rounded-lg border border-[#1F2937]">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">CRISIS</span>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 text-xs font-medium bg-[#111827] border border-[#374151] text-gray-400 rounded hover:text-white transition-colors">GFC</button>
                  <button className="px-4 py-1.5 text-xs font-medium bg-[#3B82F6] border border-[#3B82F6] text-white rounded shadow-sm">COVID</button>
                  <button className="px-4 py-1.5 text-xs font-medium bg-[#111827] border border-[#374151] text-gray-400 rounded hover:text-white transition-colors">Dotcom</button>
                  <button className="px-4 py-1.5 text-xs font-medium bg-[#111827] border border-[#374151] text-gray-400 rounded hover:text-white transition-colors">2022</button>
                </div>
              </div>

              <div className="flex items-center gap-6 flex-1 max-w-md">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">MONTHS IN CASH AFTER SELL</span>
                    <span className="text-xs font-bold text-white">6mo</span>
                  </div>
                  <input type="range" min="1" max="24" defaultValue="6" className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">INITIAL VALUE</span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">£</span>
                  <input type="text" defaultValue="100,000" className="bg-[#111827] border border-[#374151] text-white text-sm rounded-lg pl-7 pr-3 py-1.5 w-32 focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="relative h-[400px] mb-8">
              {/* Annotations */}
              <div className="absolute top-[20%] left-[22%] text-[#EF4444] text-sm font-semibold">Sold at trough</div>
              <div className="absolute top-[20%] left-[38%] text-[#F59E0B] text-sm font-semibold">Re-entered +6mo</div>
              
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <LineChart data={regretData} margin={{ top: 20, right: 40, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9CA3AF" 
                    tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#6B7280" 
                    tick={{ fill: '#6B7280', fontSize: 12 }} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(val) => `£${val}k`}
                    domain={[40, 180]}
                    dx={-10}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine x="Mar 20" stroke="#EF4444" strokeDasharray="3 3" />
                  <ReferenceLine x="Sep 20" stroke="#F59E0B" strokeDasharray="3 3" />
                  
                  <Line type="monotone" dataKey="held" name="Held through" stroke="#10B981" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="reentered" name="Sold & re-entered after 6mo" stroke="#F59E0B" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                  <Line type="stepAfter" dataKey="cash" name="Sold & stayed in cash" stroke="#EF4444" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>

              <div className="absolute top-10 right-4 text-right space-y-4">
                <div className="text-2xl font-bold text-[#10B981]">£164k</div>
                <div className="text-2xl font-bold text-[#F59E0B] mt-8">£122k</div>
                <div className="text-2xl font-bold text-[#EF4444] mt-24">£66k</div>
              </div>
            </div>

            {/* Legend / Status */}
            <div className="flex items-center justify-center gap-12 mb-10 pb-8 border-b border-[#1F2937]">
              <div className="flex items-center gap-2">
                <Circle className="w-3 h-3 fill-[#10B981] text-[#10B981]" />
                <span className="text-white font-semibold text-sm">Held through</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-1 bg-[#F59E0B] rounded-full"></div>
                <span className="text-white font-semibold text-sm">Sold & re-entered after 6mo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 border-b-2 border-dotted border-[#EF4444]"></div>
                <span className="text-white font-semibold text-sm">Sold & stayed in cash</span>
              </div>
            </div>

            {/* Scenarios Boxes */}
            <div className="mb-6">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">END VALUE VS HOLDING THROUGH, BY RE-ENTRY TIMING</h4>
              <div className="grid grid-cols-7 gap-2">
                {[
                  { label: '+1MO', val: '-£14k', active: false },
                  { label: '+3MO', val: '-£28k', active: false },
                  { label: '+6MO', val: '-£42k', active: true },
                  { label: '+12MO', val: '-£68k', active: false },
                  { label: '+24MO', val: '-£81k', active: false },
                  { label: '+36MO', val: '-£89k', active: false },
                  { label: 'NEVER', val: '-£98k', active: false },
                ].map((item, idx) => (
                  <div key={idx} className={`rounded-lg p-3 text-center border ${item.active ? 'border-blue-500 bg-[#1E3A8A]/20' : 'border-[#374151] bg-[#0B1220]/50'}`}>
                    <div className="text-[10px] text-gray-400 font-bold mb-1">{item.label}</div>
                    <div className={`text-sm font-bold ${item.active ? 'text-[#F59E0B]' : 'text-red-400'}`}>{item.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1E293B]/30 border-l-2 border-blue-500 p-4 rounded-r-lg mt-6">
              <p className="text-xs text-gray-300 leading-relaxed">
                Even a six month round trip — sell at the bottom, return half a year later — cost <span className="text-white font-bold">£42,000</span> on a £100k portfolio versus simply holding. Every plausible re-entry timing was worse than not selling, because the rebound began faster and ran further than anyone expected.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: HOLDING PERIOD ODDS */}
        <section id="holding-period-odds">
          <div className="flex items-center gap-4 mb-4 mt-8">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">HOLDING PERIOD ODDS — PATIENCE AS PROBABILITY</h2>
          </div>
          
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">PROBABILITY OF POSITIVE RETURN BY HOLDING PERIOD</h3>
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </div>

            <div className="space-y-4 mb-10 max-w-4xl mx-auto">
              {holdingOdds.map((item, idx) => (
                <div key={idx} className="flex items-center gap-8 group">
                  <div className="w-20 text-xs font-semibold text-gray-300">{item.period}</div>
                  <div className="flex-1 flex items-center">
                    <div className="w-full bg-[#1F2937] h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all" 
                        style={{ 
                          width: `${item.prob}%`,
                          backgroundColor: item.prob === 100 ? '#10B981' : item.prob > 80 ? '#34D399' : item.prob > 60 ? '#FBBF24' : '#F59E0B'
                        }} 
                      />
                    </div>
                  </div>
                  <div className="w-12 text-right text-xs font-bold" style={{
                    color: item.prob === 100 ? '#10B981' : item.prob > 80 ? '#34D399' : item.prob > 60 ? '#FBBF24' : '#F59E0B'
                  }}>
                    {item.prob}%
                  </div>
                  <div className="w-64 text-[10px] text-gray-500 group-hover:text-gray-300 transition-colors">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#1E293B]/30 border-l-2 border-blue-500 p-4 rounded-r-lg">
              <p className="text-xs text-gray-300 leading-relaxed">
                Every rolling 20-year window since 1926 has produced a positive total return. The "risk" of equities is not the probability of loss — it is the probability of being unable to wait long enough.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: TODAY VS THE PAST */}
        <section id="today-vs-past">
          <div className="flex items-center gap-4 mb-4 mt-8">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">TODAY VS THE PAST — PATTERN MATCHING THE CURRENT MOMENT</h2>
          </div>
          
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">
            <div className="p-6 border-b border-[#1F2937]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">CLOSEST HISTORICAL ANALOGIES TO TODAY'S SETUP</h3>
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </div>
              
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">CURRENT READINGS ON THE DIMENSIONS THAT DEFINE A REGIME</h4>
              
              <div className="grid grid-cols-5 gap-4">
                <div className="bg-[#0B1220]/50 border border-[#1F2937] rounded-lg p-4">
                  <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">VALUATION (CAPE)</div>
                  <div className="text-xl font-bold text-white mb-1">33.2</div>
                  <div className="text-[10px] text-[#EF4444]">94th p-tile</div>
                </div>
                <div className="bg-[#0B1220]/50 border border-[#1F2937] rounded-lg p-4">
                  <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">REAL RATES (10Y)</div>
                  <div className="text-xl font-bold text-white mb-1">2.1%</div>
                  <div className="text-[10px] text-[#F59E0B]">82nd p-tile</div>
                </div>
                <div className="bg-[#0B1220]/50 border border-[#1F2937] rounded-lg p-4">
                  <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">INFLATION</div>
                  <div className="text-xl font-bold text-white mb-1">3.4%</div>
                  <div className="text-[10px] text-[#F59E0B]">81st p-tile</div>
                </div>
                <div className="bg-[#0B1220]/50 border border-[#1F2937] rounded-lg p-4">
                  <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">MARKET BREADTH</div>
                  <div className="text-xl font-bold text-white mb-1">38%</div>
                  <div className="text-[10px] text-[#EF4444]">12th p-tile - narrow</div>
                </div>
                <div className="bg-[#0B1220]/50 border border-[#1F2937] rounded-lg p-4">
                  <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">CREDIT SPREADS</div>
                  <div className="text-xl font-bold text-white mb-1">98bp</div>
                  <div className="text-[10px] text-[#10B981]">22nd p-tile - tight</div>
                </div>
              </div>
            </div>

            <div className="p-6 border-b border-[#1F2937]">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">HISTORICAL PERIODS WITH THE HIGHEST SIMILARITY SCORE</h4>
              
              <div className="grid grid-cols-3 gap-6">
                {/* Period 1 */}
                <div className="bg-[#1E293B]/30 border border-[#374151] rounded-lg p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="text-sm font-bold text-white">1998 — late-cycle melt up</h5>
                    <span className="bg-[#1E3A8A] text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded">0.82</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">Narrow leadership, high CAPE, tight spreads</p>
                  <div className="flex gap-6">
                    <div>
                      <div className="text-[10px] text-gray-500 mb-1">+1Y after</div>
                      <div className="text-sm font-bold text-[#10B981]">+22%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 mb-1">+3Y</div>
                      <div className="text-sm font-bold text-[#10B981]">+58%</div>
                    </div>
                  </div>
                </div>

                {/* Period 2 */}
                <div className="bg-[#1E293B]/30 border border-[#374151] rounded-lg p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="text-sm font-bold text-white">1965 — Nifty Fifty era</h5>
                    <span className="bg-[#1E3A8A]/50 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded">0.74</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">Mega-cap concentration, sticky inflation</p>
                  <div className="flex gap-6">
                    <div>
                      <div className="text-[10px] text-gray-500 mb-1">+1Y</div>
                      <div className="text-sm font-bold text-[#EF4444]">-2%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 mb-1">+3Y</div>
                      <div className="text-sm font-bold text-[#10B981]">+18%</div>
                    </div>
                  </div>
                </div>

                {/* Period 3 */}
                <div className="bg-[#1E293B]/30 border border-[#374151] rounded-lg p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="text-sm font-bold text-white">2016 — post-correction</h5>
                    <span className="bg-[#1E3A8A]/30 text-blue-500 text-[10px] font-bold px-2 py-0.5 rounded">0.61</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">Recovering breadth, easy financial conditions</p>
                  <div className="flex gap-6">
                    <div>
                      <div className="text-[10px] text-gray-500 mb-1">+1Y</div>
                      <div className="text-sm font-bold text-[#10B981]">+18%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 mb-1">+3Y</div>
                      <div className="text-sm font-bold text-[#10B981]">+42%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#0B1220]/30">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">WHAT'S GENUINELY WITHOUT PRECEDENT</h4>
              <p className="text-xs text-gray-300 mb-3">Three dimensions of today's setup have no clean historical analog and warrant honest framing rather than confident comparison:</p>
              <ul className="list-disc pl-5 space-y-2 text-xs text-gray-400 marker:text-gray-600">
                <li><strong className="text-gray-200">AI driven capex cycle</strong> — current spend levels exceed the 1999 telecom build out in absolute terms, revenue durability unproven</li>
                <li><strong className="text-gray-200">Fiscal monetary divergence</strong> — wide deficits coinciding with restrictive policy is a post-WWII first</li>
                <li><strong className="text-gray-200">Index concentration in 7 names</strong> — the top weight has no parallel in the modern S&P era</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: SALES NARRATIVE */}
        <section id="sales-narrative">
          <div className="flex items-center gap-4 mb-4 mt-8">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">SALES NARRATIVE</h2>
          </div>
          
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden mb-12">
            <div className="p-6 border-b border-[#1F2937]">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">CHOOSE A SALES LENS — DIFFERENT WORRIED CLIENTS HEAR DIFFERENT STORIES</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#1E3A8A]/20 border border-blue-500 rounded-lg p-4 cursor-pointer">
                  <div className="text-[10px] text-blue-400 font-bold uppercase mb-1">NERVOUS HOLDER</div>
                  <div className="text-sm font-bold text-white mb-2">"Should I sell now?"</div>
                  <div className="text-[10px] text-gray-400">Leads with regret simulator and best day clustering</div>
                </div>
                <div className="bg-[#0B1220]/50 border border-[#374151] rounded-lg p-4 cursor-pointer hover:border-gray-500 transition-colors">
                  <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">SIDELINED CASH</div>
                  <div className="text-sm font-bold text-gray-300 mb-2">"I'll wait for things to settle"</div>
                  <div className="text-[10px] text-gray-500">Leads with cash drag, recovery speed, holding period odds</div>
                </div>
                <div className="bg-[#0B1220]/50 border border-[#374151] rounded-lg p-4 cursor-pointer hover:border-gray-500 transition-colors">
                  <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">THIS TIME IS DIFFERENT</div>
                  <div className="text-sm font-bold text-gray-300 mb-2">"AI bubble / fiscal crisis / rates"</div>
                  <div className="text-[10px] text-gray-500">Leads with analogies + honest unique-factors framing</div>
                </div>
                <div className="bg-[#0B1220]/50 border border-[#374151] rounded-lg p-4 cursor-pointer hover:border-gray-500 transition-colors">
                  <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">RETIREE</div>
                  <div className="text-sm font-bold text-gray-300 mb-2">"I can't afford another GFC"</div>
                  <div className="text-[10px] text-gray-500">Pairs recovery table with 60/40 path and withdrawal stress test</div>
                </div>
                <div className="bg-[#0B1220]/50 border border-[#374151] rounded-lg p-4 cursor-pointer hover:border-gray-500 transition-colors">
                  <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">FIRST-TIME INVESTOR</div>
                  <div className="text-sm font-bold text-gray-300 mb-2">"Now seems like a bad time"</div>
                  <div className="text-[10px] text-gray-500">Frames around holding period odds — there's no good entry day</div>
                </div>
                <div className="bg-[#0B1220]/50 border border-[#374151] rounded-lg p-4 cursor-pointer hover:border-gray-500 transition-colors">
                  <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">DIY INVESTOR</div>
                  <div className="text-sm font-bold text-gray-300 mb-2">"I can time it better myself"</div>
                  <div className="text-[10px] text-gray-500">Leads with Dalbar gap and best day clustering</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#0B1220]/30">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">GENERATED QUALITATIVE ANALYSIS</h3>
                  <span className="bg-[#1E3A8A]/50 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/30">Lens: Nervous holder</span>
                </div>
                <div className="flex gap-2">
                  <button className="bg-[#3B82F6] text-white text-[10px] font-bold px-4 py-1.5 rounded hover:bg-blue-600 transition-colors">Email</button>
                  <button className="bg-[#1F2937] text-white text-[10px] font-bold px-4 py-1.5 rounded hover:bg-gray-700 transition-colors border border-gray-600">Deck</button>
                  <button className="bg-[#1F2937] text-white text-[10px] font-bold px-4 py-1.5 rounded hover:bg-gray-700 transition-colors border border-gray-600">Copy</button>
                  <button className="bg-[#1F2937] text-white text-[10px] font-bold px-4 py-1.5 rounded hover:bg-gray-700 transition-colors border border-gray-600">Regenerate</button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div>
                  <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-2">THE DECISION YOU'RE CONSIDERING</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    You're asking whether to step out of the market until things feel calmer. The data on the seven worst drawdowns of the past forty years is unambiguous: in every single case, holding produced a positive return within a year of the trough and roughly double the starting value within five years.
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-2">WHY THE TIMING INSTINCT MISFIRES</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    The best and worst days are temporally clustered — <span className="text-white font-semibold">14 of the 20 best days</span> in three decades happened within two weeks of a worst day. The instinct to wait until volatility passes systematically forfeits the rebound that defines long-run returns.
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-2">THE HONEST COUNTER-CASE</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Three things about today have no clean precedent — AI capex scale, fiscal-monetary divergence, and index concentration. None of these argue for cash, all of them argue for <span className="text-white font-semibold">diversification and avoiding leverage to single themes</span>. The patient response is still to hold, but to hold a more balanced portfolio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  );
};