import { ArrowLeftRight, ChevronLeft, History as HistoryIcon, Download, Eye, Share2, Sparkles, Filter, FileText, CheckCircle, AlertTriangle, Layers, Target, AlertCircle, TrendingUp, X, ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';
import { Button } from './components/ui/button';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DocumentViewPanel } from './components/DocumentViewPanel';

export function ComparisonResults({ navigate, onBack, onOpenDocumentSlider }: { navigate: any, onBack: any, onOpenDocumentSlider?: (title: string, content: any, source: string) => void }) {
  const [activeView, setActiveView] = useState('matrix-view');
  const [activeTopicFilter, setActiveTopicFilter] = useState('all');
  const [showDocumentPanel, setShowDocumentPanel] = useState(false);

  // Sample document sections for the panel
  const documentSections = [
    {
      title: 'Competitive Positioning Analysis',
      content: 'Company A demonstrates superior market positioning with a 35% market share, compared to Company B\'s 28% and Company C\'s 22%. The competitive advantage stems from proprietary technology, established distribution networks, and strong brand recognition in key demographics.',
      category: 'Comparison',
    },
    {
      title: 'Financial Performance Comparison',
      content: 'Revenue growth rates show Company A leading at 24% YoY, followed by Company C at 18% and Company B at 12%. Profit margins reveal Company A at 22%, Company B at 19%, and Company C at 16%. EBITDA trends indicate sustained operational efficiency across all three entities.',
      category: 'Financial Metrics',
    },
    {
      title: 'Strategic Recommendations',
      content: 'Based on comparative analysis, Company A presents the strongest investment case with balanced growth and profitability. Company C offers high-growth potential with acceptable risk profile. Company B provides defensive characteristics suitable for conservative portfolios.',
      category: 'Investment Thesis',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      {/* Top Toolbar */}
      <div className="border-b border-gray-800 bg-[#0D1525] px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <div className="h-4 w-px bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveView('matrix-view')}
                className={`px-4 py-2 text-sm rounded transition-colors ${activeView === 'matrix-view' ? 'bg-gray-700 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
              >
                Matrix View
              </button>
              <button 
                onClick={() => setActiveView('consensus-view')}
                className={`px-4 py-2 text-sm rounded transition-colors ${activeView === 'consensus-view' ? 'bg-gray-700 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
              >
                Consensus View
              </button>
              <button 
                onClick={() => setActiveView('performance-view')}
                className={`px-4 py-2 text-sm rounded transition-colors ${activeView === 'performance-view' ? 'bg-gray-700 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
              >
                Performance View
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowDocumentPanel(true)}
              className="px-3 py-1.5 bg-[#162033] hover:bg-[#1F2937] border border-blue-500/30 rounded text-xs flex items-center gap-2 text-blue-400 font-bold"
            >
              <FileText className="w-3 h-3" />
              Document View
            </button>
            <button className="px-3 py-1.5 bg-[#111827] hover:bg-gray-800 border border-gray-700 rounded text-xs flex items-center gap-2">
              <Download className="w-3 h-3" />
              Export Report
            </button>
            <button className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs flex items-center gap-2 font-bold">
              <Eye className="w-3 h-3" />
              Draft Email
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar - Analysis Sources & Filters */}
        <div className="w-64 border-r border-gray-800 bg-[#0B1120] min-h-screen p-6">
          <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Analysis Sources</h3>
            <div className="space-y-2">
              <SourceItem icon="📊" name="Investment Outlook" date="Oct 15, 2024" />
              <SourceItem icon="📄" name="Goldman Sachs" date="Q4 Outlook" checked />
              <SourceItem icon="📘" name="J.P. Morgan" date="Market Strategy" checked />
              <SourceItem icon="📗" name="BlackRock" date="Commentary" checked />
              <SourceItem icon="📙" name="Morgan Stanley" date="Perspective" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Topic Filter</h3>
            <div className="flex flex-wrap gap-2">
              <FilterChip label="All Topics" active={activeTopicFilter === 'all'} onClick={() => setActiveTopicFilter('all')} />
              <FilterChip label="Tech Sector" active={activeTopicFilter === 'tech'} onClick={() => setActiveTopicFilter('tech')} />
              <FilterChip label="Emerging Markets" active={activeTopicFilter === 'emerging'} onClick={() => setActiveTopicFilter('emerging')} />
              <FilterChip label="Interest Rates" active={activeTopicFilter === 'rates'} onClick={() => setActiveTopicFilter('rates')} />
              <FilterChip label="AI Regulation" active={activeTopicFilter === 'ai'} onClick={() => setActiveTopicFilter('ai')} />
            </div>
          </div>

          <div className="p-4 bg-[#111827] border border-gray-800 rounded-lg">
            <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Analysis Summary</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Topics Analyzed:</span>
                <span className="text-white font-bold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Divergences Found:</span>
                <span className="text-red-400 font-bold">3 High Contrast</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Consensus Score:</span>
                <span className="text-green-400 font-bold">68% Alignment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - Results */}
        <div className="flex-1 bg-gray-950 overflow-y-auto">
          <div className="p-8">
            {/* Conditional rendering based on active view */}
            {activeView === 'matrix-view' && <ViewpointMatrixView />}
            {activeView === 'consensus-view' && <ConsensusView />}
            {activeView === 'performance-view' && <PerformanceView />}
          </div>
        </div>
      </div>

      {/* Document View Panel */}
      <DocumentViewPanel
        isOpen={showDocumentPanel}
        onClose={() => setShowDocumentPanel(false)}
        sections={documentSections}
        source="Compare"
        onDirectSave={onOpenDocumentSlider}
      />
    </div>
  );
}

// Viewpoint Matrix View Component
function ViewpointMatrixView() {
  return (
    <>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Viewpoint Matrix</h1>
        <p className="text-sm text-gray-400">Comprehensive analysis of viewpoints across all sources</p>
      </div>

      {/* Key Divergences Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h2 className="text-xl font-bold">Key Divergences</h2>
          <span className="px-2 py-0.5 bg-red-500 bg-opacity-20 text-red-400 rounded text-xs font-bold">3 High Contradiction Items</span>
        </div>
        <p className="text-sm text-gray-400 mb-6">Where your house view significantly conflicts with market consensus</p>

        {/* Tech Sector Divergence Card */}
        <div className="bg-[#0D1525] border border-red-500/30 rounded-xl p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold mb-1">Tech Sector</h3>
              <p className="text-sm text-gray-400">3 of 3 competitors disagree with house view</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-red-500 text-white rounded text-xs font-bold">OVERWEIGHT</span>
              <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded text-xs font-bold">Consensus: UNDERWEIGHT</span>
            </div>
          </div>

          {/* Viewpoint Comparison */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-red-400 mb-1">House View</p>
                  <p className="text-xs text-gray-400">"AI productivity boom justifies premium valuations across tech ecosystem..."</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-green-400 mb-1">J.P. Morgan (Cautious)</p>
                  <p className="text-xs text-gray-400">"Techs nearing fair value level; rotation out of magnificent 7 likely in 2024 as AI hype cools..."</p>
                </div>
              </div>
            </div>

            {/* Visual Spectrum */}
            <div className="flex flex-col justify-center">
              <div className="mb-3">
                <p className="text-xs text-gray-400 mb-2">Divergence Score:</p>
                <div className="flex items-center gap-2">
                  <span className="text-red-400 font-bold">Strong</span>
                  <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 to-orange-500" style={{width: '85%'}}></div>
                  </div>
                  <span className="text-gray-500 text-xs">85%</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Goldman: Cautious</span>
                <span className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded text-xs">BlackRock: Consensus</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">J.P. Morgan: Cautious</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Divergence Cards */}
        <div className="grid grid-cols-2 gap-4">
          <DivergenceCard 
            title="Emerging Markets" 
            ourView="Underweight"
            consensus="Neutral / Mixed"
            score={62}
            color="yellow"
          />
          <DivergenceCard 
            title="US Core Inflation" 
            ourView="4.4% Align"
            consensus="All Sources"
            score={42}
            color="blue"
          />
        </div>
      </div>

      {/* Consensus Views Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <h2 className="text-xl font-bold">Consensus Views</h2>
        </div>
        <p className="text-sm text-gray-400 mb-6">Areas of high agreement across all firms</p>

        <div className="grid grid-cols-3 gap-4">
          <ConsensusCard 
            title="US Core Inflation"
            consensus="All Align"
            description="Strong consensus view that US inflation will decline gradually. All reports forecast downward pressure on duration."
            alignment="100%"
            color="green"
          />
          <ConsensusCard 
            title="China Real Estate"
            consensus="Unanimous"
            description="Structural headwinds persist. All firms cite long-term sector weakness and demographic challenges as long-term obstacles."
            alignment="94%"
            color="green"
          />
          <ConsensusCard 
            title="AI Regulation Meeting"
            consensus="Mixed / Neutral"
            description="Most agree this development is 'wait for AI clarity' with Goldman Sachs suggesting cautious booking."
            alignment="67%"
            color="yellow"
          />
        </div>
      </div>

      {/* Coverage Gaps & Neutral Section */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-bold">Coverage Gaps & Neutral</h2>
        </div>
        <p className="text-sm text-gray-400 mb-6">Missing viewpoints or neutral stances</p>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#0D1525] border border-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <span className="text-green-400 font-bold text-2xl">15%</span>
              <Layers className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-sm font-bold mb-1">Overall Agreement</p>
            <p className="text-xs text-gray-400">Topics with high consensus</p>
          </div>
          <div className="bg-[#0D1525] border border-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <span className="text-blue-400 font-bold text-2xl">45%</span>
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-sm font-bold mb-1">Consensus</p>
            <p className="text-xs text-gray-400">Moderate alignment</p>
          </div>
          <div className="bg-[#0D1525] border border-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <span className="text-red-400 font-bold text-2xl">40%</span>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-sm font-bold mb-1">Divergent</p>
            <p className="text-xs text-gray-400">Significant disagreement</p>
          </div>
        </div>

        {/* Coverage Gap Cards */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-[#0D1525] border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold mb-1">Emerging Markets (Ex-China)</h4>
                <p className="text-xs text-gray-400 mb-2">Views: Mixed / Neutral</p>
                <p className="text-xs text-gray-400">Your view disagrees. Several reports avoid definitive stance, citing lack of visibility on growth catalysts.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-[10px]">Goldman: NEUTRAL</span>
              <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-[10px]">JPM: Mixed</span>
              <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-[10px]">BlackRock: Strong/Bear Links</span>
            </div>
          </div>

          <div className="bg-[#0D1525] border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold mb-1">Alpha Opportunity</h4>
                <p className="text-xs text-gray-400 mb-2">Asset class with above-average active opportunity where investor views diverge.</p>
                <p className="text-xs text-gray-400">J.P. Morgan suggests active managers can exploit valuation gaps.</p>
              </div>
            </div>
            <button className="text-xs text-blue-500 hover:text-blue-400 font-bold">Generate Deep Dive →</button>
          </div>
        </div>
      </div>
    </>
  );
}

// Consensus View Component
function ConsensusView() {
  const matrixData = [
    {
      row: 'Intrinsic',
      cells: [
        { type: 'conflict', content: 'A: [Empty]\n\nB: Scarcity of raw metals.' },
        { type: 'agreement', content: 'AGREEMENT:\n\nBoth acknowledge costs/multiples.' },
        { type: 'agreement', content: 'AGREEMENT:\n\nA: Mgmt Pivot.\n\nB: [Implied focus on PR].' },
        { type: 'conflict', content: 'CONFLICT:\n\nA: 30% Growth.\n\nB: ESG PR over Revenue.' }
      ]
    },
    {
      row: 'Comparative',
      cells: [
        { type: 'empty', content: '[Empty for both]' },
        { type: 'agreement', content: 'AGREEMENT:\n\nB: Multiples are high.' },
        { type: 'empty', content: '[Empty for both]' },
        { type: 'conflict', content: 'CONFLICT:\n\nB: Underperform S&P.' }
      ]
    },
    {
      row: 'Narrative',
      cells: [
        { type: 'empty', content: '[Empty for both]' },
        { type: 'empty', content: '[Empty for both]' },
        { type: 'agreement', content: 'AGREEMENT:\n\nA: FOMO rally.\n\nB: [Implied Hype].' },
        { type: 'agreement', content: 'AGREEMENT:\n\nBoth see "Green" as the story.' }
      ]
    },
    {
      row: 'Systemic',
      cells: [
        { type: 'empty', content: '[Empty for both]' },
        { type: 'agreement', content: 'AGREEMENT:\n\nA: New Treaty.\n\nB: Cost of Capital.' },
        { type: 'conflict', content: 'CONFLICT:\n\nB: Fed Rate Hikes.' },
        { type: 'empty', content: '[Empty for both]' }
      ]
    }
  ];

  return (
    <>\n      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Consensus View Matrix</h1>
        <p className="text-sm text-gray-400">Structured comparison across perspectives and categories</p>
      </div>

      {/* 4x4 Matrix Grid */}
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-5 bg-[#1a1f2e]">
          <div className="border-r border-b border-gray-700 p-4 flex items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-300">Perspective</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
          <div className="border-r border-b border-gray-700 p-4">
            <p className="text-sm font-bold text-white">Material</p>
            <p className="text-xs text-gray-400">(Quantities)</p>
          </div>
          <div className="border-r border-b border-gray-700 p-4">
            <p className="text-sm font-bold text-white">Formal</p>
            <p className="text-xs text-gray-400">(Ratios/Rules)</p>
          </div>
          <div className="border-r border-b border-gray-700 p-4">
            <p className="text-sm font-bold text-white">Efficient</p>
            <p className="text-xs text-gray-400">(Triggers)</p>
          </div>
          <div className="border-b border-gray-700 p-4">
            <p className="text-sm font-bold text-white">Final</p>
            <p className="text-xs text-gray-400">(Targets)</p>
          </div>
        </div>

        {/* Data Rows */}
        {matrixData.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5">
            <div className="border-r border-b border-gray-700 p-4 bg-[#1a1f2e] flex items-center">
              <span className="text-sm font-bold text-white">{row.row}</span>
            </div>
            {row.cells.map((cell, cellIndex) => (
              <MatrixCell key={cellIndex} type={cell.type} content={cell.content} isLast={cellIndex === row.cells.length - 1} />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500/20 border border-green-500/50 rounded"></div>
          <span className="text-xs text-gray-400">Agreement</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500/20 border border-red-500/50 rounded"></div>
          <span className="text-xs text-gray-400">Conflict</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-800 border border-gray-700 rounded"></div>
          <span className="text-xs text-gray-400">No Data / Empty</span>
        </div>
      </div>
    </>
  );
}

// Matrix Cell Component
function MatrixCell({ type, content, isLast }: { type: string; content: string; isLast: boolean }) {
  const cellStyles = {
    agreement: 'bg-green-500/10 border-green-500/30',
    conflict: 'bg-red-500/10 border-red-500/30',
    empty: 'bg-gray-900/50 border-gray-700'
  };

  const badgeStyles = {
    agreement: 'bg-green-500 text-white',
    conflict: 'bg-red-500 text-white',
    empty: 'bg-gray-700 text-gray-400'
  };

  return (
    <div className={`${isLast ? 'border-b' : 'border-r border-b'} border-gray-700 p-4 ${cellStyles[type as keyof typeof cellStyles]} min-h-[140px] flex flex-col`}>
      {type !== 'empty' && (
        <div className="mb-2">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${badgeStyles[type as keyof typeof badgeStyles]}`}>
            {type}
          </span>
        </div>
      )}
      <div className="text-xs text-gray-300 leading-relaxed whitespace-pre-line flex-1">
        {content}
      </div>
    </div>
  );
}

// Performance View Component
function PerformanceView() {
  const [hasCompetitorData, setHasCompetitorData] = useState(true);

  // Mock performance data
  const performanceData = {
    kpis: [
      { label: 'Total Return', user: 18.5, competitor: 14.2, unit: '%' },
      { label: 'Alpha', user: 2.8, competitor: 0.9, unit: '%' },
      { label: 'Volatility', user: 12.3, competitor: 14.8, unit: '%', lowerIsBetter: true },
      { label: 'Sharpe Ratio', user: 1.42, competitor: 1.08, unit: '' },
      { label: 'Max Drawdown', user: -8.2, competitor: -12.5, unit: '%', lowerIsBetter: true }
    ],
    detailedMetrics: [
      { metric: '1Y Return', user: 18.5, competitor: 14.2, unit: '%' },
      { metric: '3Y Return', user: 45.3, competitor: 38.7, unit: '%' },
      { metric: 'YTD Return', user: 8.9, competitor: 6.4, unit: '%' },
      { metric: 'Alpha', user: 2.8, competitor: 0.9, unit: '%' },
      { metric: 'Beta', user: 0.95, competitor: 1.08, unit: '', lowerIsBetter: false },
      { metric: 'Volatility', user: 12.3, competitor: 14.8, unit: '%', lowerIsBetter: true },
      { metric: 'Sharpe Ratio', user: 1.42, competitor: 1.08, unit: '' },
      { metric: 'Sortino Ratio', user: 1.89, competitor: 1.34, unit: '' },
      { metric: 'Max Drawdown', user: -8.2, competitor: -12.5, unit: '%', lowerIsBetter: true }
    ],
    chartData: [
      { date: 'Jan', user: 100, competitor: 100, benchmark: 100 },
      { date: 'Feb', user: 103, competitor: 101, benchmark: 102 },
      { date: 'Mar', user: 107, competitor: 104, benchmark: 105 },
      { date: 'Apr', user: 105, competitor: 102, benchmark: 103 },
      { date: 'May', user: 110, competitor: 106, benchmark: 107 },
      { date: 'Jun', user: 112, competitor: 108, benchmark: 109 },
      { date: 'Jul', user: 115, competitor: 110, benchmark: 111 },
      { date: 'Aug', user: 113, competitor: 109, benchmark: 110 },
      { date: 'Sep', user: 117, competitor: 112, benchmark: 113 },
      { date: 'Oct', user: 119, competitor: 113, benchmark: 114 },
      { date: 'Nov', user: 121, competitor: 114, benchmark: 115 },
      { date: 'Dec', user: 118.5, competitor: 114.2, benchmark: 116 }
    ]
  };

  if (!hasCompetitorData) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="bg-[#0D1525] border border-gray-700 rounded-lg p-12 max-w-md text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">No Competitor Data</h3>
          <p className="text-sm text-gray-400 mb-6">Upload competitor portfolio to unlock performance comparison.</p>
          <button 
            onClick={() => setHasCompetitorData(true)}
            className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded font-bold text-sm transition-colors"
          >
            Upload Portfolio Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Performance Comparison</h1>
        <p className="text-sm text-gray-400">User Portfolio vs Competitor Portfolio</p>
      </div>

      {/* Section 1: Performance Summary KPI Cards */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Performance Summary</h2>
        <div className="grid grid-cols-5 gap-4">
          {performanceData.kpis.map((kpi, index) => (
            <PerformanceKPICard key={index} {...kpi} />
          ))}
        </div>
      </div>

      {/* Section 2: Detailed Performance Comparison Table */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Detailed Metrics</h2>
        <div className="bg-[#0D1525] border border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a1f2e] border-b border-gray-700">
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Metric</th>
                <th className="text-right px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">User Portfolio</th>
                <th className="text-right px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Competitor</th>
                <th className="text-right px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Difference</th>
                <th className="text-center px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Winner</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.detailedMetrics.map((metric, index) => (
                <PerformanceTableRow key={index} {...metric} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3: Performance Chart */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Cumulative Performance</h2>
        <div className="bg-[#0D1525] border border-gray-700 rounded-lg p-6">
          <PerformanceChart data={performanceData.chartData} />
        </div>
      </div>

      {/* Toggle for demo */}
      <div className="flex justify-center">
        <button 
          onClick={() => setHasCompetitorData(false)}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 text-xs rounded transition-colors"
        >
          Toggle Empty State (Demo)
        </button>
      </div>
    </>
  );
}

// Helper Components
function SourceItem({ icon, name, date, checked = false }: { icon: string; name: string; date: string; checked?: boolean }) {
  return (
    <div className={`flex items-center gap-2 p-2 rounded ${checked ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-[#111827] border border-gray-800'}`}>
      <span className="text-sm">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold truncate">{name}</p>
        <p className="text-[10px] text-gray-500">{date}</p>
      </div>
      {checked && <CheckCircle className="w-3 h-3 text-blue-500 flex-shrink-0" />}
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`px-2.5 py-1 rounded text-[10px] font-bold transition-colors ${
        active ? 'bg-blue-500 text-white' : 'bg-[#111827] text-gray-400 hover:bg-gray-800'
      }`}
    >
      {label}
    </button>
  );
}

function DivergenceCard({ title, ourView, consensus, score, color }: { title: string; ourView: string; consensus: string; score: number; color: string }) {
  const colorClasses = {
    yellow: 'border-yellow-500/30 bg-yellow-500/5',
    blue: 'border-blue-500/30 bg-blue-500/5',
    red: 'border-red-500/30 bg-red-500/5',
  };

  return (
    <div className={`${colorClasses[color as keyof typeof colorClasses]} border rounded-lg p-4`}>
      <h4 className="font-bold mb-2">{title}</h4>
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-[10px] font-bold">{ourView}</span>
        <span className="text-gray-500 text-xs">vs</span>
        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-[10px] font-bold">{consensus}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-600`} style={{width: `${score}%`}}></div>
        </div>
        <span className="text-xs text-gray-500">{score}%</span>
      </div>
    </div>
  );
}

function ConsensusCard({ title, consensus, description, alignment, color }: { title: string; consensus: string; description: string; alignment: string; color: string }) {
  const colorClasses = {
    green: 'border-green-500/30 bg-green-500/5',
    yellow: 'border-yellow-500/30 bg-yellow-500/5',
  };

  return (
    <div className={`${colorClasses[color as keyof typeof colorClasses]} border rounded-lg p-4`}>
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-bold">{title}</h4>
        <span className={`px-2 py-0.5 ${color === 'green' ? 'bg-green-500' : 'bg-yellow-500'} text-white rounded text-[10px] font-bold`}>
          {consensus}
        </span>
      </div>
      <p className="text-xs text-gray-400 mb-3 leading-relaxed">{description}</p>
      <div className="flex items-center gap-2">
        <CheckCircle className={`w-4 h-4 ${color === 'green' ? 'text-green-500' : 'text-yellow-500'}`} />
        <span className="text-xs font-bold">{alignment} Alignment</span>
      </div>
    </div>
  );
}

// Performance KPI Card Component
function PerformanceKPICard({ label, user, competitor, unit, lowerIsBetter = false }: { 
  label: string; 
  user: number; 
  competitor: number; 
  unit: string; 
  lowerIsBetter?: boolean 
}) {
  const diff = user - competitor;
  const isWinning = lowerIsBetter ? diff < 0 : diff > 0;
  const isNegative = diff < 0;

  return (
    <div className="bg-[#0D1525] border border-gray-700 rounded-lg p-4">
      <p className="text-xs text-gray-400 mb-3">{label}</p>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl font-bold">{user}{unit}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">vs {competitor}{unit}</span>
        <div className={`flex items-center gap-1 ${isWinning ? 'text-green-400' : 'text-red-400'}`}>
          {isWinning ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          <span className="font-bold">{isNegative ? '' : '+'}{diff.toFixed(1)}{unit}</span>
        </div>
      </div>
    </div>
  );
}

// Performance Table Row Component
function PerformanceTableRow({ metric, user, competitor, unit, lowerIsBetter = false }: { 
  metric: string; 
  user: number; 
  competitor: number; 
  unit: string; 
  lowerIsBetter?: boolean 
}) {
  const diff = user - competitor;
  const isWinning = lowerIsBetter ? diff < 0 : diff > 0;
  const isNegative = diff < 0;

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-900/30 transition-colors">
      <td className="px-6 py-4 text-sm font-bold">{metric}</td>
      <td className="px-6 py-4 text-sm text-right">{user}{unit}</td>
      <td className="px-6 py-4 text-sm text-right text-gray-400">{competitor}{unit}</td>
      <td className={`px-6 py-4 text-sm text-right font-bold ${isWinning ? 'text-green-400' : 'text-red-400'}`}>
        {isNegative ? '' : '+'}{diff.toFixed(2)}{unit}
      </td>
      <td className="px-6 py-4 text-center">
        {isWinning ? (
          <CheckCircle className="w-4 h-4 text-green-500 inline-block" />
        ) : (
          <X className="w-4 h-4 text-red-500 inline-block" />
        )}
      </td>
    </tr>
  );
}

// Performance Chart Component
function PerformanceChart({ data }: { data: any[] }) {
  return (
    <div style={{ width: '100%', height: '350px' }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: '1px solid #374151',
              borderRadius: '6px',
              fontSize: '12px'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
          />
          <Line 
            type="monotone" 
            dataKey="user" 
            stroke="#3B82F6" 
            strokeWidth={2}
            name="User Portfolio"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="competitor" 
            stroke="#EF4444" 
            strokeWidth={2}
            name="Competitor"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="benchmark" 
            stroke="#6B7280" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Benchmark"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}