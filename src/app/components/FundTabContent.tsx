import React, { useState, useRef, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, ChevronDown, Camera, Mail, Presentation, Info,
  Copy, RefreshCw, Sparkles, Filter, X, Briefcase, Calendar, MapPin
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, Area, PieChart, Pie, Cell, Treemap
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface FundTabContentProps {
  assetClass?: string | null;
}

export function FundTabContent({ assetClass }: FundTabContentProps) {
  // Navigation
  const [activeSection, setActiveSection] = useState('vital-signs');
  const sections = ['Vital signs', 'Performance', 'Risk profile', 'Composition', 'Scenarios', 'Sales narrative'];
  
  // Chart periods
  const [perfPeriod, setPerfPeriod] = useState('YTD');
  
  // Transferred State from Dashboard
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [heatmapDateRange, setHeatmapDateRange] = useState('YTD');
  const [heatmapMetric, setHeatmapMetric] = useState<'return' | 'risk'>('return');
  const [heatmapSource, setHeatmapSource] = useState('portfolio');
  const [heatmapBreakdown, setHeatmapBreakdown] = useState('asset-allocation');
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  // Portfolio Exposure Treemap Data
  const portfolioSections = [
    { 
      name: 'Portfolio',
      children: [
        {
          name: 'Equities',
          children: [
            { name: 'Tech', value: 20, performance: 22 },
            { name: 'Finance', value: 15, performance: 17 },
            { name: 'Health', value: 10, performance: 11 }
          ]
        },
        {
          name: 'Fixed Income',
          children: [
            { name: 'Gov Bonds', value: 18, performance: 30 },
            { name: 'Corp Bonds', value: 12, performance: 20 }
          ]
        },
        {
          name: 'Alts',
          children: [
            { name: 'PE', value: 15, performance: 30 },
            { name: 'Real Estate', value: 10, performance: 20 }
          ]
        }
      ]
    }
  ];

  // Portfolio Exposure Detail Commentary Data
  const exposureCommentary: Record<string, { change: string; updates: { text: string; sentiment?: 'positive' | 'negative' | 'neutral' }[] }> = {
    'Tech': {
      change: '+2.4%',
      updates: [
        { text: 'NVIDIA surges 8% on AI chip demand, beating quarterly estimates', sentiment: 'positive' },
        { text: 'Cloud computing revenue accelerates across major providers', sentiment: 'positive' },
        { text: 'Semiconductor equipment orders reach record highs in Asia', sentiment: 'positive' }
      ]
    },
    'Finance': {
      change: '-1.1%',
      updates: [
        { text: 'Regional banks face pressure amid rising deposit costs', sentiment: 'negative' },
        { text: 'Investment banking fees decline 15% quarter-over-quarter', sentiment: 'negative' },
        { text: 'Credit quality metrics show early signs of deterioration', sentiment: 'negative' }
      ]
    },
    'Gov Bonds': {
      change: '-0.8%',
      updates: [
        { text: 'Treasury yields rise on stronger-than-expected jobs data', sentiment: 'negative' },
        { text: 'Fed signals potential delay in rate cuts to Q3 2026', sentiment: 'negative' }
      ]
    },
    'Corp Bonds': {
      change: '-0.5%',
      updates: [
        { text: 'Corporate bond spreads widen 15bps on credit concerns', sentiment: 'negative' },
        { text: 'High-yield issuance slows amid market volatility', sentiment: 'negative' }
      ]
    },
    'Health': {
      change: '+0.6%',
      updates: [
        { text: 'FDA approves breakthrough obesity treatment, shares rally', sentiment: 'positive' },
        { text: 'Biotech M&A activity accelerates with major deals announced', sentiment: 'positive' }
      ]
    },
    'PE': {
      change: '+1.8%',
      updates: [
        { text: 'Private equity exits accelerate with IPO market reopening', sentiment: 'positive' },
        { text: 'Mega-fund fundraising reaches $45B in Q1', sentiment: 'positive' }
      ]
    },
    'Real Estate': {
      change: '+0.4%',
      updates: [
        { text: 'Industrial REITs outperform on e-commerce demand', sentiment: 'positive' },
        { text: 'Office vacancy rates stabilize in major metros', sentiment: 'neutral' }
      ]
    }
  };

  const handleAssetClick = (assetType: string) => {
    // Just a placeholder since this was routing previously, but now we're inside the fund page
    console.log("Clicked asset:", assetType);
  };
  
  // Blend State
  const [blendValue, setBlendValue] = useState(60);
  
  // Stress Test State
  const [regime, setRegime] = useState('COVID (Feb-Aug 20)');
  const [withdrawalRate, setWithdrawalRate] = useState(4.0);
  
  // Sales Lens
  const [activeLens, setActiveLens] = useState('Defensive Positioning');
  
  // Mock Data
  const performanceData = [
    { date: 'Jan 20', fund: 100, benchmark: 100, rival: 100, excess: 0 },
    { date: 'Jul 20', fund: 105, benchmark: 102, rival: 98, excess: 3 },
    { date: 'Jan 21', fund: 115, benchmark: 110, rival: 105, excess: 5 },
    { date: 'Jul 21', fund: 122, benchmark: 118, rival: 112, excess: 4 },
    { date: 'Jan 22', fund: 128, benchmark: 125, rival: 118, excess: 3 },
    { date: 'Jul 22', fund: 115, benchmark: 108, rival: 102, excess: 7 },
    { date: 'Jan 23', fund: 125, benchmark: 115, rival: 109, excess: 10 },
    { date: 'Jul 23', fund: 135, benchmark: 128, rival: 120, excess: 7 },
    { date: 'Jan 24', fund: 145, benchmark: 138, rival: 128, excess: 7 }
  ];

  const drawdownData = [
    { date: 'Jan 22', fund: 0, benchmark: 0, rival: 0 },
    { date: 'Mar 22', fund: -5, benchmark: -8, rival: -10 },
    { date: 'Jun 22', fund: -12, benchmark: -18, rival: -22 },
    { date: 'Sep 22', fund: -15, benchmark: -25, rival: -28 },
    { date: 'Dec 22', fund: -10, benchmark: -15, rival: -20 },
    { date: 'Mar 23', fund: -2, benchmark: -8, rival: -12 },
    { date: 'Jun 23', fund: 0, benchmark: -2, rival: -5 }
  ];
  
  const blendData = [
    { date: 'Jan 20', fund: 100, blend: 100, rival: 100 },
    { date: 'Jul 20', fund: 105, blend: 103, rival: 98 },
    { date: 'Jan 21', fund: 115, blend: 109, rival: 105 },
    { date: 'Jul 21', fund: 122, blend: 116, rival: 112 },
    { date: 'Jan 22', fund: 128, blend: 121, rival: 118 },
    { date: 'Jul 22', fund: 115, blend: 109, rival: 102 },
    { date: 'Jan 23', fund: 125, blend: 118, rival: 109 },
    { date: 'Jul 23', fund: 135, blend: 126, rival: 120 },
    { date: 'Jan 24', fund: 145, blend: 134, rival: 128 }
  ];

  const withdrawalData = [
    { date: 'Feb 20', fund: 100000, blend: 100000, rival: 100000 },
    { date: 'Mar 20', fund: 92000, blend: 88000, rival: 84000 },
    { date: 'Apr 20', fund: 85000, blend: 79000, rival: 72000 },
    { date: 'May 20', fund: 91000, blend: 84000, rival: 76000 },
    { date: 'Jun 20', fund: 98000, blend: 90000, rival: 81000 },
    { date: 'Jul 20', fund: 104000, blend: 95000, rival: 85000 },
    { date: 'Aug 20', fund: 108000, blend: 99000, rival: 89000 }
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0B1220] min-h-screen text-white font-sans overflow-y-auto pb-24">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-[#1F2937] sticky top-0 bg-[#0B1220]/95 backdrop-blur z-50">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Fund Analysis</div>
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>Global Diversification Fund</h1>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Compare against</span>
                <div className="bg-[#1E293B] text-gray-300 text-xs px-2 py-1 rounded flex items-center gap-1 border border-[#334155]">
                  MSCI World
                </div>
                <div className="bg-[#1E293B] text-gray-300 text-xs px-2 py-1 rounded flex items-center gap-1 border border-[#334155]">
                  Rival X Global
                  <X className="w-3 h-3 text-gray-500 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Jump Nav */}
        <div className="flex items-center gap-6">
          {sections.map(section => {
            const id = section.toLowerCase().replace(/ /g, '-');
            return (
              <button
                key={section}
                onClick={() => scrollToSection(id)}
                className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${
                  activeSection === id ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                {section}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-12">
        
        {/* VITAL SIGNS */}
        <section id="vital-signs" className="scroll-mt-32">
          <div className="grid grid-cols-6 gap-3">
            {[
              { label: 'RETURN', val: '12.4%', c1: '+2.3% vs MSCI', c2: '+0.3% vs Rival X', c1Color: 'text-emerald-400', c2Color: 'text-emerald-400' },
              { label: 'SHARPE', val: '1.42', c1: '+0.15 vs MSCI', c2: '+0.04 vs Rival X', c1Color: 'text-emerald-400', c2Color: 'text-emerald-400' },
              { label: 'VOLATILITY', val: '14.8%', c1: '+1.4% vs MSCI', c2: '+2.1% vs Rival X', c1Color: 'text-rose-400', c2Color: 'text-rose-400' },
              { label: 'MAX DRAWDOWN', val: '-18.3%', c1: '+2.3% vs MSCI', c2: '+10.2% vs Rival X', c1Color: 'text-emerald-400', c2Color: 'text-emerald-400' },
              { label: 'ALPHA (3Y)', val: '2.8%', c1: 't-stat 2.1', c2: 'significant', c1Color: 'text-emerald-400', c2Color: 'text-emerald-400' },
              { label: 'ACTIVE SHARE', val: '68%', c1: 'High conviction', c2: 'vs MSCI', c1Color: 'text-gray-400', c2Color: 'text-gray-400' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#111827] border border-[#1F2937] p-4 rounded-lg flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-gray-400 font-bold mb-1 tracking-wider">{stat.label}</div>
                  <div className="text-2xl font-bold text-white mb-3">{stat.val}</div>
                </div>
                <div className="text-[10px] space-y-1">
                  <div className={stat.c1Color}>{stat.c1}</div>
                  <div className={stat.c2Color}>{stat.c2}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PERFORMANCE */}
        <section id="performance" className="scroll-mt-32">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">Performance</div>
            <div className="h-[1px] flex-1 bg-[#1F2937]"></div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="col-span-2 bg-[#111827] border border-[#1F2937] rounded-lg p-5">
              <div className="flex justify-between items-center mb-6">
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Cumulative Return</div>
                <div className="flex items-center gap-1 bg-[#1E293B] p-1 rounded">
                  {['1M', '3M', 'YTD', '1Y', '3Y', '5Y'].map(p => (
                    <button key={p} onClick={() => setPerfPeriod(p)} className={`text-[10px] px-2 py-1 rounded font-bold ${perfPeriod === p ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}>{p}</button>
                  ))}
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                    <XAxis dataKey="date" stroke="#6B7280" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6B7280" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="excess" fill="#10B981" fillOpacity={0.1} stroke="none" />
                    <Line type="monotone" dataKey="fund" stroke="#3B82F6" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="benchmark" stroke="#6B7280" strokeWidth={2} dot={false} strokeDasharray="4 4" />
                    <Line type="monotone" dataKey="rival" stroke="#A855F7" strokeWidth={2} dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-4 mt-2 justify-center text-[10px] text-gray-400 font-bold">
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div>Fund 12.4%</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-gray-500 rounded-full"></div>MSCI 10.1%</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-purple-500 rounded-full"></div>Rival X 9.2%</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500/20 rounded-full border border-emerald-500"></div>Shaded: rolling 3Y excess</div>
              </div>
            </div>
            
            <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-5">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-6">Drawdown Comparison</div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={drawdownData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                    <XAxis dataKey="date" stroke="#6B7280" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6B7280" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="fund" stroke="#3B82F6" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="benchmark" stroke="#6B7280" strokeWidth={2} dot={false} strokeDasharray="4 4" />
                    <Line type="monotone" dataKey="rival" stroke="#A855F7" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-5">
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-4">Excess Return by Regime</div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                {[
                  { label: 'VIX < 15', val: '+1.2%', w: '30%', color: 'bg-emerald-500' },
                  { label: 'VIX 15-25', val: '+2.1%', w: '50%', color: 'bg-emerald-500' },
                  { label: 'VIX > 25', val: '+3.5%', w: '70%', color: 'bg-emerald-500' }
                ].map(r => (
                  <div key={r.label} className="flex items-center gap-4">
                    <div className="w-16 text-xs text-gray-400">{r.label}</div>
                    <div className="flex-1 h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                      <div className={`h-full ${r.color}`} style={{ width: r.w }}></div>
                    </div>
                    <div className="w-10 text-right text-xs font-bold text-emerald-400">{r.val}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Rate hike cycle', val: '+2.3%', w: '40%', color: 'bg-emerald-500' },
                  { label: 'Rate cut cycle', val: '-1.2%', w: '20%', color: 'bg-rose-500' },
                  { label: 'Rate off months', val: '+0.4%', w: '15%', color: 'bg-emerald-500' }
                ].map(r => (
                  <div key={r.label} className="flex items-center gap-4">
                    <div className="w-24 text-xs text-gray-400">{r.label}</div>
                    <div className="flex-1 h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                      <div className={`h-full ${r.color}`} style={{ width: r.w }}></div>
                    </div>
                    <div className={`w-10 text-right text-xs font-bold ${r.val.startsWith('-') ? 'text-rose-400' : 'text-emerald-400'}`}>{r.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RISK PROFILE */}
        <section id="risk-profile" className="scroll-mt-32">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">Risk Profile</div>
            <div className="h-[1px] flex-1 bg-[#1F2937]"></div>
          </div>
          
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-5">
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-6">Up & Downside Capture : Risk-Adjusted</div>
            
            <div className="grid grid-cols-6 gap-4 mb-6">
              {[
                { label: 'UPSIDE CAPTURE', val: '104%', color: 'text-emerald-400' },
                { label: 'DOWNSIDE CAPTURE', val: '78%', color: 'text-emerald-400' },
                { label: 'SORTINO', val: '2.18', color: 'text-white' },
                { label: 'CVaR (95%)', val: '-4.2%', color: 'text-white' },
                { label: 'DOWN MONTHS WON', val: '72%', color: 'text-white' },
                { label: 'RECOVERY (MO)', val: '6.2', color: 'text-white' }
              ].map(stat => (
                <div key={stat.label} className="border-l border-[#374151] pl-4">
                  <div className="text-[10px] text-gray-400 font-bold mb-1">{stat.label}</div>
                  <div className={`text-xl font-bold ${stat.color}`}>{stat.val}</div>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded p-4 text-sm text-blue-100">
              Fund captures 104% of upside and only 78% of downside vs MSCI — the asymmetry that drives the +2.3% YTD outperformance with lower drawdown. Sortino of 2.18 confirms the return is earned through downside avoidance, not volatility tolerance.
            </div>
          </div>
        </section>

        {/* COMPOSITION */}
        <section id="composition" className="scroll-mt-32">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">Composition & Attribution</div>
            <div className="h-[1px] flex-1 bg-[#1F2937]"></div>
          </div>
          
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-5 mb-4">
            <div className="flex justify-between items-center mb-6">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Attribution by Asset Class</div>
              <div className="flex items-center gap-2">
                <div className="flex bg-[#1E293B] rounded p-1">
                  <button className="text-[10px] px-3 py-1 rounded font-bold text-gray-400 hover:text-white">Total</button>
                  <button className="text-[10px] px-3 py-1 rounded font-bold bg-blue-500 text-white">Brinson Split</button>
                </div>
                <button className="text-[10px] px-3 py-1 rounded font-bold border border-[#374151] bg-[#1E293B] text-white">vs Rival X</button>
              </div>
            </div>
            
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[10px] text-gray-400 uppercase border-b border-[#1F2937]">
                  <th className="pb-3 font-bold">Asset Class</th>
                  <th className="pb-3 font-bold">Fund Wt</th>
                  <th className="pb-3 font-bold">Bench Wt</th>
                  <th className="pb-3 font-bold">Allocation</th>
                  <th className="pb-3 font-bold">Selection</th>
                  <th className="pb-3 font-bold">Total</th>
                  <th className="pb-3 font-bold">Explanation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2937]">
                {[
                  { name: 'Equity', fw: '41.2%', bw: '60.0%', al: '-40bp', se: '+360bp', to: '+320bp', alC: 'text-rose-400', seC: 'text-emerald-400', toC: 'text-emerald-400', ex: 'Underweight cost a touch; semis & AI selection more than offset.' },
                  { name: 'Credit', fw: '28.5%', bw: '25.0%', al: '+22bp', se: '+88bp', to: '+110bp', alC: 'text-emerald-400', seC: 'text-emerald-400', toC: 'text-emerald-400', ex: 'IG overweight + light HY spreads carried both sleeves.' },
                  { name: 'Alternatives', fw: '15.7%', bw: '5.0%', al: '+85bp', se: '-20bp', to: '+65bp', alC: 'text-emerald-400', seC: 'text-rose-400', toC: 'text-emerald-400', ex: 'Private credit & commodities overweight paid; PE selection dragged.' },
                  { name: 'Real Estate', fw: '12.8%', bw: '8.0%', al: '-30bp', se: '+40bp', to: '+10bp', alC: 'text-rose-400', seC: 'text-emerald-400', toC: 'text-emerald-400', ex: 'Overweight hurt as rates repriced; logistics & data centres saved it.' }
                ].map(row => (
                  <tr key={row.name}>
                    <td className="py-3 font-semibold">{row.name}</td>
                    <td className="py-3 text-gray-300">{row.fw}</td>
                    <td className="py-3 text-gray-300">{row.bw}</td>
                    <td className={`py-3 font-medium ${row.alC}`}>{row.al}</td>
                    <td className={`py-3 font-medium ${row.seC}`}>{row.se}</td>
                    <td className={`py-3 font-bold ${row.toC}`}>{row.to}</td>
                    <td className="py-3 text-gray-400 text-xs">{row.ex}</td>
                  </tr>
                ))}
                <tr className="bg-[#1E293B]/50">
                  <td className="py-3 font-bold text-white">Total active</td>
                  <td className="py-3"></td>
                  <td className="py-3"></td>
                  <td className="py-3 font-bold text-emerald-400">+30bp</td>
                  <td className="py-3 font-bold text-emerald-400">+470bp</td>
                  <td className="py-3 font-bold text-emerald-400">+500bp</td>
                  <td className="py-3 text-gray-300 text-xs font-medium">Outperformance is overwhelmingly stock picking, not asset-allocation timing.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-5">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Top Holdings vs Benchmark</div>
                <div className="flex bg-[#1E293B] rounded p-1">
                  {['Equity', 'Credit', 'Alts', 'Real Estate'].map(t => (
                    <button key={t} className={`text-[10px] px-3 py-1 rounded font-bold ${t === 'Equity' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="text-gray-400">Top 10: <span className="text-white font-bold">42.8%</span></div>
                <div className="text-gray-400">Active share: <span className="text-white font-bold">68%</span></div>
              </div>
            </div>
            
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[10px] text-gray-400 uppercase border-b border-[#1F2937]">
                  <th className="pb-3 font-bold">Security</th>
                  <th className="pb-3 font-bold">Fund Wt</th>
                  <th className="pb-3 font-bold">Bench Wt</th>
                  <th className="pb-3 font-bold">Active</th>
                  <th className="pb-3 font-bold">YTD Return</th>
                  <th className="pb-3 font-bold">Contrib</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2937]">
                {[
                  { n: 'NVIDIA NVDA', fw: '8.4%', bw: '3.1%', ac: '+5.3%', yr: '+188.5%', co: '+412bp', coC: 'text-emerald-400' },
                  { n: 'Microsoft MSFT', fw: '7.6%', bw: '5.8%', ac: '+1.8%', yr: '+31.2%', co: '+128bp', coC: 'text-emerald-400' },
                  { n: 'Apple AAPL', fw: '6.3%', bw: '6.4%', ac: '-0.1%', yr: '+24.5%', co: '+96bp', coC: 'text-emerald-400' },
                  { n: 'Vertiv VRT', fw: '4.7%', bw: '2.2%', ac: '+2.5%', yr: '+118.2%', co: '+165bp', coC: 'text-emerald-400' },
                  { n: 'Tesla TSLA', fw: '4.2%', bw: '1.8%', ac: '+2.4%', yr: '-6.2%', co: '-34bp', coC: 'text-rose-400' },
                ].map(row => (
                  <tr key={row.n}>
                    <td className="py-3 font-semibold">{row.n}</td>
                    <td className="py-3 text-gray-300">{row.fw}</td>
                    <td className="py-3 text-gray-300">{row.bw}</td>
                    <td className="py-3 text-gray-300">{row.ac}</td>
                    <td className={`py-3 font-medium ${row.yr.startsWith('-') ? 'text-rose-400' : 'text-emerald-400'}`}>{row.yr}</td>
                    <td className={`py-3 font-bold ${row.coC}`}>{row.co}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SCENARIOS */}
        <section id="scenarios" className="scroll-mt-32">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">Scenarios ... Blend & Stress Test</div>
            <div className="h-[1px] flex-1 bg-[#1F2937]"></div>
          </div>
          
          {/* Blend Tool */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-5 mb-4">
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-6">Blended Portfolio Comparison</div>
            
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm">
                <span className="text-gray-400">YOUR FUND</span>
                <div className="font-bold">Global Diversification</div>
                <div className="text-emerald-400 font-bold text-xl">{blendValue}%</div>
              </div>
              <div className="flex-1 px-12">
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={blendValue} 
                  onChange={(e) => setBlendValue(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#1F2937] rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="text-center text-[10px] text-gray-500 mt-2">Drag to adjust • monthly rebalancing</div>
              </div>
              <div className="text-sm text-right">
                <span className="text-gray-400">COMPETITOR</span>
                <div className="font-bold">Rival X Global</div>
                <div className="text-purple-400 font-bold text-xl">{100 - blendValue}%</div>
              </div>
            </div>
            
            <div className="h-48 mb-6">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={blendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                    <XAxis dataKey="date" stroke="#6B7280" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6B7280" tick={{fontSize: 10}} tickLine={false} axisLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="fund" stroke="#10B981" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="rival" stroke="#A855F7" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="blend" stroke="#3B82F6" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
            </div>
            
            <div className="flex items-center gap-4 justify-center text-[10px] text-gray-400 font-bold mb-6">
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div>Your fund: 100%</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-purple-500 rounded-full"></div>Competitor: 100%</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div>Blended {blendValue}/{100-blendValue}</div>
            </div>

            <table className="w-full text-center text-sm mb-6 border-collapse">
              <thead>
                <tr className="text-[10px] text-gray-400 uppercase">
                  <th className="pb-2 font-bold text-left border-b border-[#1F2937]"></th>
                  <th className="pb-2 font-bold border-b border-[#1F2937]">Return</th>
                  <th className="pb-2 font-bold border-b border-[#1F2937]">Vol</th>
                  <th className="pb-2 font-bold border-b border-[#1F2937]">Sharpe</th>
                  <th className="pb-2 font-bold border-b border-[#1F2937]">Max DD</th>
                  <th className="pb-2 font-bold border-b border-[#1F2937]">Up / Down</th>
                  <th className="pb-2 font-bold border-b border-[#1F2937]">Corr</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2937]">
                <tr>
                  <td className="py-3 font-semibold text-emerald-400 text-left">Your Fund</td>
                  <td className="py-3 font-bold text-white">12.4%</td>
                  <td className="py-3 font-bold text-white">14.8%</td>
                  <td className="py-3 font-bold text-white">1.42</td>
                  <td className="py-3 font-bold text-white">-18.3%</td>
                  <td className="py-3 font-bold text-white">104 / 78</td>
                  <td className="py-3 font-bold text-gray-500">—</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-purple-400 text-left">Competitor</td>
                  <td className="py-3 font-bold text-white">8.3%</td>
                  <td className="py-3 font-bold text-white">16.9%</td>
                  <td className="py-3 font-bold text-white">1.08</td>
                  <td className="py-3 font-bold text-white">-25.1%</td>
                  <td className="py-3 font-bold text-white">96 / 102</td>
                  <td className="py-3 font-bold text-white">0.82</td>
                </tr>
                <tr className="bg-[#1E293B]/30">
                  <td className="py-3 font-bold text-blue-400 text-left">60/40 Blend</td>
                  <td className="py-3 font-bold text-white">10.8%</td>
                  <td className="py-3 font-bold text-white">14.6%</td>
                  <td className="py-3 font-bold text-white">1.31</td>
                  <td className="py-3 font-bold text-white">-20.5%</td>
                  <td className="py-3 font-bold text-white">101 / 88</td>
                  <td className="py-3 font-bold text-gray-500">—</td>
                </tr>
              </tbody>
            </table>
            
            <div className="bg-[#1E293B]/50 p-4 rounded text-sm text-gray-300">
              A 60/40 blend delivers 92% of your fund's return with lower vol than either fund alone. The 0.82 correlation suggests meaningful diversification — useful for clients who want to retain a competitor allocation but improve risk-adjusted return.
            </div>
          </div>
          
          {/* Stress Test */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-5">
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-6">Withdrawal Stress Test by Regime</div>
            
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-[10px] text-gray-400 font-bold mb-2">REGIME</div>
                <div className="bg-[#1E293B] border border-[#374151] rounded px-3 py-2 text-sm text-white flex items-center gap-2 cursor-pointer w-64 justify-between">
                  <span>{regime}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div className="flex gap-8">
                <div>
                  <div className="text-[10px] text-gray-400 font-bold mb-2">WITHDRAWAL RATE</div>
                  <div className="flex items-center gap-4">
                    <input type="range" min="1" max="10" step="0.5" value={withdrawalRate} onChange={e=>setWithdrawalRate(Number(e.target.value))} className="w-32 h-1.5 bg-[#1F2937] rounded-lg appearance-none cursor-pointer accent-blue-500"/>
                    <span className="text-xl font-bold">{withdrawalRate.toFixed(1)}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-bold mb-2">LUMP SUM</div>
                  <div className="text-xl font-bold">£100,000</div>
                </div>
              </div>
            </div>
            
            <div className="h-64 mb-6 relative">
              {/* £95k danger line */}
              <div className="absolute top-[30%] left-0 right-0 border-t border-rose-500/30 border-dashed z-0"></div>
              
              <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={withdrawalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                    <XAxis dataKey="date" stroke="#6B7280" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6B7280" tick={{fontSize: 10}} tickLine={false} axisLine={false} domain={['dataMin - 10000', 'dataMax + 10000']} />
                    <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="fund" stroke="#10B981" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="rival" stroke="#A855F7" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="blend" stroke="#3B82F6" strokeWidth={2} dot={false} />
                  </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex items-center gap-4 justify-center text-[10px] text-gray-400 font-bold mb-6">
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div>Your fund</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-purple-500 rounded-full"></div>Competitor</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div>60/40 Blend</div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-[#1E293B]/30 border border-[#1F2937] p-3 rounded">
                <div className="text-[10px] text-gray-400 font-bold mb-2">END VALUE</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm"><span className="text-emerald-400">Fund</span><span className="font-bold">£108,000</span></div>
                  <div className="flex justify-between text-sm"><span className="text-blue-400">Blend</span><span className="font-bold">£99,000</span></div>
                  <div className="flex justify-between text-sm"><span className="text-purple-400">Rival</span><span className="font-bold">£89,000</span></div>
                </div>
              </div>
              <div className="bg-[#1E293B]/30 border border-[#1F2937] p-3 rounded">
                <div className="text-[10px] text-gray-400 font-bold mb-2">WORST-POINT VALUE</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm"><span className="text-emerald-400">Fund</span><span className="font-bold">£85,000</span></div>
                  <div className="flex justify-between text-sm"><span className="text-blue-400">Blend</span><span className="font-bold">£79,000</span></div>
                  <div className="flex justify-between text-sm"><span className="text-purple-400">Rival</span><span className="font-bold">£72,000</span></div>
                </div>
              </div>
              <div className="bg-[#1E293B]/30 border border-[#1F2937] p-3 rounded">
                <div className="text-[10px] text-gray-400 font-bold mb-2">MONTHS TO RECOVER</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm"><span className="text-emerald-400">Fund</span><span className="font-bold">5.1</span></div>
                  <div className="flex justify-between text-sm"><span className="text-blue-400">Blend</span><span className="font-bold">6.8</span></div>
                  <div className="flex justify-between text-sm"><span className="text-purple-400">Rival</span><span className="font-bold">9.4</span></div>
                </div>
              </div>
              <div className="bg-[#1E293B]/30 border border-[#1F2937] p-3 rounded">
                <div className="text-[10px] text-gray-400 font-bold mb-2">WITHDRAWALS TAKEN</div>
                <div className="text-xl font-bold mb-1">£2,333 over 6 months</div>
                <div className="text-[10px] text-gray-500">at 4.0% annualized</div>
              </div>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded p-4 text-sm text-blue-100">
              A retiree drawing 4% through the COVID regime would have ended with £19,000 more in your fund than in Rival X ... and recovered to break-even four months sooner.
            </div>
          </div>
        </section>

        {/* SALES NARRATIVE */}
        <section id="sales-narrative" className="scroll-mt-32">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">Sales Narrative</div>
            <div className="h-[1px] flex-1 bg-[#1F2937]"></div>
          </div>
          
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-5">
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-6">Choose a sales lens ... The same data, framed for a specific conversation</div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { title: 'Defensive Positioning', subtitle: 'Lower drawdown narrative', desc: 'Frames capture asymmetry and recovery time for risk-averse clients.' },
                { title: 'Decumulation', subtitle: 'Sequencing-risk story', desc: 'Uses the withdrawal stress test to argue for the fund in retirement.' },
                { title: 'Head-to-head', subtitle: 'vs Rival X comparison', desc: 'Direct competitor framing using attribution and blend analysis.' },
                { title: 'Conviction', subtitle: 'Stock selection skill', desc: 'Highlights Brinson — outperformance is selection, not timing.' },
                { title: 'Diversification', subtitle: 'Complement to existing allocation', desc: 'Uses blend stats to argue for partial allocation alongside competitor.' },
                { title: 'Thematic', subtitle: 'Inflation hedge framing', desc: 'Frames real-asset and commodity sleeves as inflation protection.' }
              ].map(lens => (
                <div 
                  key={lens.title}
                  onClick={() => setActiveLens(lens.title)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    activeLens === lens.title 
                      ? 'border-blue-500 bg-blue-500/5' 
                      : 'border-[#1F2937] hover:border-[#374151] bg-[#1E293B]/30'
                  }`}
                >
                  <div className={`text-[10px] font-bold uppercase mb-1 ${activeLens === lens.title ? 'text-blue-400' : 'text-gray-400'}`}>{lens.title}</div>
                  <div className="text-sm font-bold text-white mb-2">{lens.subtitle}</div>
                  <div className="text-xs text-gray-400 leading-snug">{lens.desc}</div>
                </div>
              ))}
            </div>
            
            <div className="border border-[#1F2937] rounded-lg overflow-hidden bg-[#0B1220]">
              <div className="bg-[#1E293B]/50 px-4 py-3 border-b border-[#1F2937] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Generated Qualitative Analysis</div>
                  <div className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                    Lens: {activeLens} <ChevronDown className="w-3 h-3" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors">
                    <Mail className="w-3.5 h-3.5" /> Email
                  </button>
                  <div className="h-4 w-[1px] bg-[#374151] mx-1"></div>
                  <button className="text-gray-400 hover:text-white p-1" title="Presentation"><Presentation className="w-4 h-4" /></button>
                  <button className="text-gray-400 hover:text-white p-1" title="Copy text"><Copy className="w-4 h-4" /></button>
                  <button className="text-gray-400 hover:text-white p-1" title="Regenerate"><RefreshCw className="w-4 h-4" /></button>
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-[10px] text-blue-400 font-bold uppercase mb-3 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Headline Pitch</div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Global Diversification has been built to protect capital first and capture growth second — and the data shows it. It <span className="text-white font-semibold bg-white/10 px-1 rounded">captures 104% upside</span> towards clients keep upside and lose meaningfully less in downturns, recovering 2.2 months faster than MSCI and 4 months faster than Rival X from the last major drawdown.
                  </p>
                </div>
                <div>
                  <div className="text-[10px] text-blue-400 font-bold uppercase mb-3 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Supporting Evidence</div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    The defensive sleeve has done the work in stress: <span className="text-white font-semibold bg-white/10 px-1 rounded">+3.5% excess return when VIX &gt;25</span>, the worst part of any regime tested. A retiree drawing 4% through COVID ended with <span className="text-white font-semibold bg-white/10 px-1 rounded">£19,000 more</span> in the fund than in Rival X — sequence-of-returns risk reduced in the period that matters most.
                  </p>
                </div>
                <div>
                  <div className="text-[10px] text-blue-400 font-bold uppercase mb-3 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Likely Objections</div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    In rate-cut environments the conservative positioning costs -30bp. Frame this as deliberate — the fund is not built to maximize beta in benign regimes, it is built so clients don't sell at the bottom. The <span className="text-white font-semibold bg-white/10 px-1 rounded">68% active share</span> is the conviction backing this trade-off.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Exposure Heatmap */}
        <div className="bg-[#111827] border border-gray-800 rounded-lg p-6 mb-8 mt-12 mx-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-cyan-400 text-xs font-bold flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                PORTFOLIO EXPOSURE
              </h2>
              
              {/* Date Range Selector */}
              <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
                {['1D', '1W', '1M', 'YTD', '1Y'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setHeatmapDateRange(range)}
                    className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                      heatmapDateRange === range
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>

              {/* Return or Risk Toggle */}
              <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setHeatmapMetric('return')}
                  className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                    heatmapMetric === 'return'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  RETURN
                </button>
                <button
                  onClick={() => setHeatmapMetric('risk')}
                  className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                    heatmapMetric === 'risk'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  RISK
                </button>
              </div>

              {/* Fund or Portfolio Dropdown */}
              <Select value={heatmapSource} onValueChange={setHeatmapSource}>
                <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-xs h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portfolio">Portfolio</SelectItem>
                  <SelectItem value="fund">Fund</SelectItem>
                </SelectContent>
              </Select>

              {/* Breakdown Dropdown */}
              <Select value={heatmapBreakdown} onValueChange={setHeatmapBreakdown}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-xs h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asset-allocation">Asset Allocation</SelectItem>
                  <SelectItem value="country">Country</SelectItem>
                  <SelectItem value="region">Region</SelectItem>
                  <SelectItem value="sector">Sector</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-gray-400">Up / Positive</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-gray-400">Down / Negative</span>
              </div>
            </div>
          </div>

          {/* Side-by-side Layout: Heatmap + Commentary */}
          <div className="grid grid-cols-[1.2fr_1fr] gap-6">
            {/* Left: Custom Treemap Visualization */}
            <div style={{ width: '100%', height: '400px' }}>
              <CustomPortfolioTreemap 
                onCellClick={setSelectedAsset}
              />
            </div>

            {/* Right: Latest Commentary */}
            <div className="bg-[#0B1220] border border-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
                <h3 className="text-cyan-400 text-xs font-bold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  LATEST COMMENTARY
                </h3>
                <span className="text-[9px] text-gray-500">LATEST UPDATES</span>
              </div>

              {/* Scrollable Commentary */}
              <div className="space-y-4 overflow-y-auto pr-2" style={{ height: '320px' }}>
                {!selectedAsset ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Sparkles className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">Click on any asset in the treemap</p>
                      <p className="text-xs text-gray-600 mt-1">to view latest commentary</p>
                    </div>
                  </div>
                ) : (
                  (() => {
                    const commentaryItems = [
                      {
                        key: 'Tech',
                        title: 'TECHNOLOGY',
                        summary: 'Strong momentum continues across semiconductor and cloud infrastructure sectors. AI-driven demand remains robust with enterprise adoption accelerating. Large-cap names showing resilience despite valuation concerns.'
                      },
                      {
                        key: 'Finance',
                        title: 'FINANCIALS',
                        summary: 'Banking sector faces pressure from margin compression amid rate uncertainty. Credit quality remains stable with provisioning levels adequate.'
                      },
                      {
                        key: 'Health',
                        title: 'HEALTHCARE',
                        summary: 'Pharmaceutical pipeline developments remain constructive with several late-stage catalysts approaching. Med-tech seeing stable demand trends across elective procedures.'
                      },
                      {
                        key: 'Gov Bonds',
                        title: 'GOVERNMENT BONDS',
                        summary: 'Duration positioning remains defensive amid policy uncertainty. Yield curve dynamics suggest caution on long-end exposure.'
                      },
                      {
                        key: 'Corp Bonds',
                        title: 'CORPORATE BONDS',
                        summary: 'Credit spreads holding near tight levels despite macro headwinds. High-grade issuance heavy but well-absorbed by institutional buyers.'
                      },
                      {
                        key: 'PE',
                        title: 'PRIVATE EQUITY',
                        summary: 'Exit environment improving with M&A activity picking up momentum. Valuations remain elevated but dry powder deployment accelerating.'
                      },
                      {
                        key: 'Real Estate',
                        title: 'REAL ESTATE',
                        summary: 'Commercial property fundamentals diverging by sector with logistics and data centers outperforming. Office exposure facing structural headwinds.'
                      }
                    ];

                    const selectedItem = commentaryItems.find(item => item.key === selectedAsset);
                    
                    if (!selectedItem) return null;

                    return (
                      <div className="bg-gray-800/50 -mx-2 px-2 py-2 rounded-lg transition-all duration-300">
                        <div className="mb-2">
                          <h4 className="text-xs font-bold text-blue-400 uppercase">{selectedItem.title}</h4>
                        </div>
                        <p className="text-[10px] text-gray-300 leading-relaxed">
                          {selectedItem.summary}
                        </p>
                      </div>
                    );
                  })()
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Fund Analysis Section */}
        <div className="bg-[#111827] border border-gray-800 rounded-lg p-6 mb-8 mx-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-blue-500 text-xs font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              FUND ANALYSIS
            </h2>
            <Select defaultValue="global">
              <SelectTrigger className="w-60 bg-gray-800 border-gray-700 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Global Equity Fund</SelectItem>
                <SelectItem value="balanced">Balanced Growth Fund</SelectItem>
                <SelectItem value="income">Fixed Income Fund</SelectItem>
                <SelectItem value="emerging">Emerging Markets Fund</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-[#0B1220] rounded-lg p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1">PruFund Global Diversification</h3>
                <p className="text-xs text-blue-500">Asset allocations to October 2025</p>
              </div>
              <div className="text-blue-500 text-sm font-bold">PruFund Growth Fund</div>
            </div>

            <div className="grid grid-cols-[1fr_1.2fr] gap-12">
              <div className="flex flex-col items-center justify-center">
                <div style={{ width: '400px', height: '400px' }}>
                  {isMounted && (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'UK Equity', value: 11.20, color: '#FDB813' },
                            { name: 'Europe Ex UK Equity', value: 5.20, color: '#FF6B35' },
                            { name: 'North America Equity', value: 7.02, color: '#22C55E' },
                            { name: 'Emerging Equity', value: 1.94, color: '#3B82F6' },
                            { name: 'Asia Ex Japan', value: 6.86, color: '#A855F7' },
                            { name: 'China Equity', value: 1.80, color: '#EF4444' },
                            { name: 'Japan Equity', value: 2.95, color: '#06B6D4' },
                            { name: 'Middle East and Africa', value: 2.32, color: '#9CA3AF' },
                            { name: 'India Equity', value: 1.16, color: '#EC4899' },
                            { name: 'UK Real Estate', value: 8.01, color: '#D97706' },
                            { name: 'US Real Estate', value: 1.32, color: '#F87171' },
                            { name: 'Europe Ex UK Real Estate', value: 1.60, color: '#34D399' },
                            { name: 'Asia Real Estate', value: 1.67, color: '#60A5FA' },
                            { name: 'Private Equity', value: 5.20, color: '#C084FC' },
                            { name: 'Infrastructure', value: 2.90, color: '#2DD4BF' },
                            { name: 'Private High Yield', value: 3.44, color: '#F472B6' }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={100}
                          outerRadius={160}
                          paddingAngle={1}
                          dataKey="value"
                        >
                          {[
                            { name: 'UK Equity', value: 11.20, color: '#FDB813' },
                            { name: 'Europe Ex UK Equity', value: 5.20, color: '#FF6B35' },
                            { name: 'North America Equity', value: 7.02, color: '#22C55E' },
                            { name: 'Emerging Equity', value: 1.94, color: '#3B82F6' },
                            { name: 'Asia Ex Japan', value: 6.86, color: '#A855F7' },
                            { name: 'China Equity', value: 1.80, color: '#EF4444' },
                            { name: 'Japan Equity', value: 2.95, color: '#06B6D4' },
                            { name: 'Middle East and Africa', value: 2.32, color: '#9CA3AF' },
                            { name: 'India Equity', value: 1.16, color: '#EC4899' },
                            { name: 'UK Real Estate', value: 8.01, color: '#D97706' },
                            { name: 'US Real Estate', value: 1.32, color: '#F87171' },
                            { name: 'Europe Ex UK Real Estate', value: 1.60, color: '#34D399' },
                            { name: 'Asia Real Estate', value: 1.67, color: '#60A5FA' },
                            { name: 'Private Equity', value: 5.20, color: '#C084FC' },
                            { name: 'Infrastructure', value: 2.90, color: '#2DD4BF' },
                            { name: 'Private High Yield', value: 3.44, color: '#F472B6' }
                          ].map((entry) => (
                            <Cell key={`allocation-${entry.name}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            fontSize: '11px'
                          }}
                          formatter={(value: number) => [`${value}%`, '']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700">
                    <h4 className="text-sm font-bold">Equity</h4>
                    <span className="text-sm font-bold">(40.61%)</span>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { num: 1, name: 'UK Equity', value: '11.20%', color: '#FDB813' },
                      { num: 2, name: 'Europe Ex UK Equity', value: '5.20%', color: '#FF6B35' },
                      { num: 3, name: 'North America Equity', value: '7.02%', color: '#22C55E' },
                      { num: 4, name: 'Emerging Equity', value: '1.94%', color: '#3B82F6' },
                      { num: 5, name: 'Asia Ex Japan', value: '6.86%', color: '#A855F7' },
                      { num: 6, name: 'China Equity', value: '1.80%', color: '#EF4444' },
                      { num: 7, name: 'Japan Equity', value: '2.95%', color: '#06B6D4' },
                      { num: 8, name: 'Middle East and Africa Equity', value: '2.32%', color: '#9CA3AF' },
                      { num: 9, name: 'India Equity', value: '1.16%', color: '#EC4899' }
                    ].map((item) => (
                      <button key={item.num} className="w-full flex items-center justify-between text-xs hover:bg-gray-800/50 p-1 rounded transition-colors cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 w-4">{item.num}</span>
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                          <span className="text-gray-300">{item.name}</span>
                        </div>
                        <span className="text-gray-400 font-medium">{item.value}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="bg-[#0B1220] border border-gray-800 rounded-lg p-5">
                <h3 className="text-xs font-bold text-cyan-400 uppercase mb-4">REGIONAL ALLOCATION</h3>
                <div style={{ width: '100%', height: '280px' }}>
                  {isMounted && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={[
                          { name: 'North America', value: 55.8, color: '#06B6D4' },
                          { name: 'Europe', value: 18.3, color: '#3B82F6' },
                          { name: 'Asia Pacific', value: 15.6, color: '#22C55E' },
                          { name: 'Emerging Markets', value: 7.2, color: '#FDB813' },
                          { name: 'Other', value: 3.1, color: '#EC4899' }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          stroke="#9CA3AF" 
                          style={{ fontSize: '10px' }}
                          tick={false}
                        />
                        <YAxis 
                          stroke="#9CA3AF" 
                          style={{ fontSize: '10px' }}
                          domain={[0, 100]}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            fontSize: '11px'
                          }}
                          formatter={(value: number) => [`${value}%`, 'Allocation']}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {[
                            { name: 'North America', value: 55.8, color: '#06B6D4' },
                            { name: 'Europe', value: 18.3, color: '#3B82F6' },
                            { name: 'Asia Pacific', value: 15.6, color: '#22C55E' },
                            { name: 'Emerging Markets', value: 7.2, color: '#FDB813' },
                            { name: 'Other', value: 3.1, color: '#EC4899' }
                          ].map((entry) => (
                            <Cell key={`region-${entry.name}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export function CustomPortfolioTreemap({ onCellClick }: { onCellClick: (cell: string) => void }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
      {/* Equities Box - Left Side */}
      <g key="equities-group">
        {/* Equities Container */}
        <rect key="equities-container" x="10" y="10" width="370" height="380" fill="#1a2a25" stroke="#22543D" strokeWidth="2" rx="4" />
        <text key="equities-label" x="20" y="30" fill="#FFFFFF" fontSize="12" fontWeight="600">EQUITIES</text>
        
        {/* Tech - Large green box (top) */}
        <rect 
          key="tech-rect"
          x="20" y="40" width="160" height="270" 
          fill="#2D7A4A" stroke="#000" strokeWidth="2" rx="3"
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onCellClick('Tech')}
        />
        <text key="tech-label" x="28" y="58" fill="#FFF" fontSize="11" fontWeight="600">Tech</text>
        <text key="tech-value" x="28" y="74" fill="#FFF" fontSize="10">20</text>
        <text key="tech-perf" x="28" y="90" fill="#FFF" fontSize="10">22%</text>
        <text key="tech-contrib-fund" x="28" y="106" fill="#D1D5DB" fontSize="10">Fund: 18.5%</text>
        <text key="tech-contrib-portfolio" x="28" y="120" fill="#D1D5DB" fontSize="10">Port: 15.2%</text>
        
        {/* Finance - Burgundy box (top right) */}
        <rect 
          key="finance-rect"
          x="190" y="40" width="180" height="130" 
          fill="#5C3838" stroke="#000" strokeWidth="2" rx="3"
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onCellClick('Finance')}
        />
        <text key="finance-label" x="198" y="58" fill="#FFF" fontSize="11" fontWeight="600">Finance</text>
        <text key="finance-value" x="198" y="74" fill="#FFF" fontSize="10">15</text>
        <text key="finance-perf" x="198" y="90" fill="#FFF" fontSize="10">17%</text>
        <text key="finance-contrib-fund" x="198" y="106" fill="#D1D5DB" fontSize="10">Fund: 14.2%</text>
        <text key="finance-contrib-portfolio" x="198" y="120" fill="#D1D5DB" fontSize="10">Port: 11.8%</text>
        
        {/* Health - Dark green box (bottom) */}
        <rect 
          key="health-rect"
          x="20" y="320" width="350" height="60" 
          fill="#2D4D3F" stroke="#000" strokeWidth="2" rx="3"
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onCellClick('Health')}
        />
        <text key="health-label" x="28" y="338" fill="#FFF" fontSize="11" fontWeight="600">Health</text>
        <text key="health-value" x="100" y="338" fill="#FFF" fontSize="10">10</text>
        <text key="health-perf" x="140" y="338" fill="#FFF" fontSize="10">11%</text>
        <text key="health-contrib-fund" x="28" y="354" fill="#D1D5DB" fontSize="10">Fund: 9.5%</text>
        <text key="health-contrib-portfolio" x="28" y="370" fill="#D1D5DB" fontSize="10">Port: 7.8%</text>
      </g>
      
      {/* Fixed Income Box - Top Right */}
      <g key="fixed-income-group">
        {/* Fixed Income Container */}
        <rect key="fixed-income-container" x="390" y="10" width="400" height="210" fill="#2a1a1a" stroke="#7F1D1D" strokeWidth="2" rx="4" />
        <text key="fixed-income-label" x="400" y="30" fill="#FFFFFF" fontSize="12" fontWeight="600">FIXED INCOME</text>
        
        {/* Gov Bonds - Medium red box */}
        <rect 
          key="gov-bonds-rect"
          x="400" y="40" width="180" height="170" 
          fill="#6B3232" stroke="#000" strokeWidth="2" rx="3"
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onCellClick('Gov Bonds')}
        />
        <text key="gov-bonds-label" x="408" y="58" fill="#FFF" fontSize="11" fontWeight="600">Gov Bonds</text>
        <text key="gov-bonds-value" x="408" y="74" fill="#FFF" fontSize="10">18</text>
        <text key="gov-bonds-perf" x="408" y="90" fill="#FFF" fontSize="10">30%</text>
        <text key="gov-bonds-contrib-fund" x="408" y="106" fill="#D1D5DB" fontSize="10">Fund: 17.2%</text>
        <text key="gov-bonds-contrib-portfolio" x="408" y="120" fill="#D1D5DB" fontSize="10">Port: 14.5%</text>
        
        {/* Corp Bonds - Darker burgundy box */}
        <rect 
          key="corp-bonds-rect"
          x="590" y="40" width="190" height="170" 
          fill="#4A2828" stroke="#000" strokeWidth="2" rx="3"
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onCellClick('Corp Bonds')}
        />
        <text key="corp-bonds-label" x="598" y="58" fill="#FFF" fontSize="11" fontWeight="600">Corp Bonds</text>
        <text key="corp-bonds-value" x="598" y="74" fill="#FFF" fontSize="10">12</text>
        <text key="corp-bonds-perf" x="598" y="90" fill="#FFF" fontSize="10">20%</text>
        <text key="corp-bonds-contrib-fund" x="598" y="106" fill="#D1D5DB" fontSize="10">Fund: 11.4%</text>
        <text key="corp-bonds-contrib-portfolio" x="598" y="120" fill="#D1D5DB" fontSize="10">Port: 9.6%</text>
      </g>
      
      {/* Alts Box - Bottom Right */}
      <g key="alts-group">
        {/* Alts Container */}
        <rect key="alts-container" x="390" y="230" width="400" height="160" fill="#1a2a22" stroke="#166534" strokeWidth="2" rx="4" />
        <text key="alts-label" x="400" y="250" fill="#FFFFFF" fontSize="12" fontWeight="600">ALTS</text>
        
        {/* PE - Medium green box */}
        <rect 
          key="pe-rect"
          x="400" y="260" width="180" height="120" 
          fill="#2D5A42" stroke="#000" strokeWidth="2" rx="3"
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onCellClick('PE')}
        />
        <text key="pe-label" x="408" y="278" fill="#FFF" fontSize="11" fontWeight="600">PE</text>
        <text key="pe-value" x="408" y="294" fill="#FFF" fontSize="10">15</text>
        <text key="pe-perf" x="408" y="310" fill="#FFF" fontSize="10">30%</text>
        <text key="pe-contrib-fund" x="408" y="326" fill="#D1D5DB" fontSize="10">Fund: 14.3%</text>
        <text key="pe-contrib-portfolio" x="408" y="340" fill="#D1D5DB" fontSize="10">Port: 12.0%</text>
        
        {/* Real Estate - Dark gray box */}
        <rect 
          key="real-estate-rect"
          x="590" y="260" width="190" height="120" 
          fill="#2D3D3D" stroke="#000" strokeWidth="2" rx="3"
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onCellClick('Real Estate')}
        />
        <text key="real-estate-label" x="598" y="278" fill="#FFF" fontSize="11" fontWeight="600">Real Estate</text>
        <text key="real-estate-value" x="598" y="294" fill="#FFF" fontSize="10">10</text>
        <text key="real-estate-perf" x="598" y="310" fill="#FFF" fontSize="10">20%</text>
        <text key="real-estate-contrib-fund" x="598" y="326" fill="#D1D5DB" fontSize="10">Fund: 9.5%</text>
        <text key="real-estate-contrib-portfolio" x="598" y="340" fill="#D1D5DB" fontSize="10">Port: 8.0%</text>
      </g>
    </svg>
  );
}
