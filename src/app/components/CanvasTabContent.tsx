import { Mail, FileText, Presentation, FileStack, ChevronDown, Wand2, RotateCcw, Save, Share2, CheckCircle2, AlertCircle, XCircle, AlertTriangle, Edit2, Trash2, Activity, Globe, History as HistoryIcon, Plus, Eye, LayoutGrid, AlignLeft, Image as ImageIcon, Columns, Quote, BarChart3, Calendar, LineChart, PieChart, TrendingUp, Link2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { readCanvasCampaignLink, markCanvasReadyToSend } from '../../campaign/canvasBridge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart as ReLineChart, Line, PieChart as RePieChart, Pie, Cell, AreaChart, Area } from 'recharts';

type Template = {
  id: string;
  name: string;
  type: 'email' | 'note' | 'pitch-deck' | 'report';
  description: string;
  blocks: string[];
};

type CanvasSection = {
  description?: string;
  summaryCards?: Array<{ title: string; count: number }>;
  keyTopics?: Array<{ topic: string; value: string; status: string }>;
  keyDivergence?: {
    title: string;
    yourPortfolio: string;
    competitorsAvg: string;
    analyzed: string;
  };
  consensusViews?: string[];
};

type CanvasData = {
  blockId: string;
  blockTitle: string;
  sections: CanvasSection;
  sectionVisibility: {
    description: boolean;
    summaryCards: boolean;
    keyTopics: boolean;
    keyDivergence: boolean;
    consensusViews: boolean;
  };
  layoutType: 'simple-text' | 'text-with-image' | 'two-column' | 'card-grid' | 'quote-block' | 'statistics' | 'fund-analysis';
  imageUrl?: string;
  timestamp: number;
  blockType?: 'Opener' | 'Market Event' | 'Historical' | 'Quantitative';
  selectedOption?: string;
  selectedChart?: string;
};

type WeekData = {
  label: string;
  dateRange: string;
  description: string;
  keyTopics: Array<{ topic: string; value: string; status: string }>;
  summaryCards: Array<{ title: string; count: number }>;
  keyDivergence: { title: string; yourPortfolio: string; competitorsAvg: string; analyzed: string };
  consensusViews: string[];
};

const weeklyData: Record<string, WeekData> = {
  'week-1': {
    label: 'Week 1',
    dateRange: 'Mar 31 – Apr 6',
    description: 'Week 1 saw strong institutional buying in technology and healthcare sectors. Portfolio performance outpaced benchmark by 1.2%. Engagement with top-tier clients remained robust, driven by Q1 earnings season anticipation and Fed commentary reaffirming rate stability.',
    keyTopics: [
      { topic: 'Technology Allocation', value: '32.4%', status: 'Partial' },
      { topic: 'Inflation Outlook', value: 'Above 3%', status: 'Consensus' },
      { topic: 'Emerging Markets', value: 'Bullish', status: 'Consensus' },
      { topic: 'Healthcare Defensive', value: '18.6%', status: 'Partial' },
    ],
    summaryCards: [
      { title: 'Full Agreement', count: 6 },
      { title: 'Partial Agreement', count: 3 },
      { title: 'Full Disagreement', count: 2 },
    ],
    keyDivergence: {
      title: 'Technology Sector Allocation',
      yourPortfolio: '32.4%',
      competitorsAvg: '28.1%',
      analyzed: 'Overweight vs consensus — supported by AI capex cycle thesis',
    },
    consensusViews: [
      'Fed on hold through Q2 2025; rate cuts deferred to late 2025 at earliest given persistent services inflation.',
      'US Dollar to remain firm; EM currency weakness creates selective opportunity in EM debt.',
      'Tech sector earnings resilience expected to continue, led by AI infrastructure and cloud spending.',
    ],
  },
  'week-2': {
    label: 'Week 2',
    dateRange: 'Apr 7 – Apr 13',
    description: 'Week 2 marked a mid-quarter reset, with macro uncertainty weighing on risk assets. Fixed income allocations were trimmed as the yield curve steepened. Client outreach focused on reassurance around portfolio positioning relative to CPI data released Thursday.',
    keyTopics: [
      { topic: 'Fixed Income Duration', value: 'Underweight', status: 'Divergence' },
      { topic: 'CPI Impact', value: '+3.4% YoY', status: 'Consensus' },
      { topic: 'Equity Volatility', value: 'Elevated', status: 'Partial' },
      { topic: 'Cash Allocation', value: '6.2%', status: 'Partial' },
    ],
    summaryCards: [
      { title: 'Full Agreement', count: 4 },
      { title: 'Partial Agreement', count: 5 },
      { title: 'Full Disagreement', count: 4 },
    ],
    keyDivergence: {
      title: 'Fixed Income Duration Positioning',
      yourPortfolio: '5.1 yrs',
      competitorsAvg: '6.8 yrs',
      analyzed: 'Shorter duration stance limits rate risk — differentiated from peer average',
    },
    consensusViews: [
      'CPI print at 3.4% confirms stickiness; markets repriced rate cut expectations to December 2025.',
      'Equities vulnerable to volatility spikes — increasing hedging via options suggested for large allocations.',
      'Cash overweights justified short-term as opportunity cost remains low relative to equity risk premium.',
    ],
  },
  'week-3': {
    label: 'Week 3',
    dateRange: 'Apr 14 – Apr 20',
    description: 'Week 3 delivered strong recovery momentum. Earnings beats from mega-cap tech propelled equity indices to new highs. Fund outperformance widened vs. benchmark. Strong client demand for growth-oriented allocations prompted rebalancing conversations and portfolio adjustment proposals.',
    keyTopics: [
      { topic: 'Mega-Cap Tech Earnings', value: 'Beat by 12%', status: 'Consensus' },
      { topic: 'Growth vs Value', value: 'Growth +4.2%', status: 'Consensus' },
      { topic: 'Sector Rotation', value: 'Into Tech', status: 'Partial' },
      { topic: 'Global Ex-US', value: 'Underweight', status: 'Divergence' },
    ],
    summaryCards: [
      { title: 'Full Agreement', count: 8 },
      { title: 'Partial Agreement', count: 3 },
      { title: 'Full Disagreement', count: 1 },
    ],
    keyDivergence: {
      title: 'International Equity Exposure',
      yourPortfolio: '12.8%',
      competitorsAvg: '19.4%',
      analyzed: 'Underweight international — US earnings strength justifies home-market bias',
    },
    consensusViews: [
      'Mega-cap tech earnings season solidly beats estimates; AI-driven capex cycle intact for 2025–2026.',
      'Rotation from value to growth accelerating; defensives lagging as risk appetite returns strongly.',
      'International underweight vs peers is a notable position — revisit if USD weakens significantly.',
    ],
  },
  'week-4': {
    label: 'Week 4',
    dateRange: 'Apr 21 – Apr 27',
    description: 'Week 4 closed the month on a consolidation note. Profit-taking in high-momentum tech names trimmed gains. Portfolio remained ahead of benchmark month-to-date. Key focus was on month-end client reporting and positioning for May macro catalysts including FOMC and employment data.',
    keyTopics: [
      { topic: 'Profit Taking in Tech', value: '-2.1% sector', status: 'Partial' },
      { topic: 'FOMC Positioning', value: 'Neutral', status: 'Consensus' },
      { topic: 'Month-End Rebalancing', value: 'Active', status: 'Consensus' },
      { topic: 'Fixed Income Re-entry', value: 'Selective', status: 'Partial' },
    ],
    summaryCards: [
      { title: 'Full Agreement', count: 7 },
      { title: 'Partial Agreement', count: 4 },
      { title: 'Full Disagreement', count: 2 },
    ],
    keyDivergence: {
      title: 'Cash & Near-Cash Holdings',
      yourPortfolio: '4.8%',
      competitorsAvg: '7.2%',
      analyzed: 'Lower cash vs peers — higher conviction deployment into selective equities',
    },
    consensusViews: [
      'Profit-taking in tech names is healthy consolidation; structural uptrend remains intact for Q2.',
      'FOMC meeting in May is the next catalyst — positioning neutral ahead of potential hawkish surprise.',
      'Fixed income selective re-entry viable in shorter-duration investment-grade credit at current yields.',
    ],
  },
};

const templates: Template[] = [
  {
    id: 'email-market-update',
    name: 'Market Update Email',
    type: 'email',
    description: 'Weekly market insights and portfolio performance',
    blocks: ['Header', 'Market Summary', 'Key Metrics', 'Portfolio Highlights', 'Call to Action']
  },
  {
    id: 'email-investment-recommendation',
    name: 'Investment Recommendation',
    type: 'email',
    description: 'Detailed investment thesis and recommendations',
    blocks: ['Header', 'Executive Summary', 'Investment Thesis', 'Risk Analysis', 'Recommendation']
  },
  {
    id: 'note-meeting-summary',
    name: 'Meeting Summary Note',
    type: 'note',
    description: 'Client meeting notes and action items',
    blocks: ['Title', 'Meeting Details', 'Key Discussion Points', 'Decisions Made', 'Next Steps']
  },
  {
    id: 'note-research-brief',
    name: 'Research Brief',
    type: 'note',
    description: 'Quick research insights and findings',
    blocks: ['Title', 'Overview', 'Key Findings', 'Data Points', 'Conclusion']
  },
  {
    id: 'pitch-deck-fund-overview',
    name: 'Fund Overview Deck',
    type: 'pitch-deck',
    description: 'Complete fund presentation for investors',
    blocks: ['Cover Slide', 'Investment Strategy', 'Performance Metrics', 'Portfolio Composition', 'Team & Contact']
  },
  {
    id: 'pitch-deck-investment-case',
    name: 'Investment Case Deck',
    type: 'pitch-deck',
    description: 'Specific investment opportunity presentation',
    blocks: ['Title Slide', 'Opportunity Overview', 'Market Analysis', 'Financial Projections', 'Investment Terms']
  },
  {
    id: 'report-quarterly-performance',
    name: 'Quarterly Performance Report',
    type: 'report',
    description: 'Comprehensive quarterly fund report',
    blocks: ['Executive Summary', 'Market Review', 'Performance Analysis', 'Portfolio Updates', 'Outlook & Strategy']
  },
  {
    id: 'report-sector-analysis',
    name: 'Sector Analysis Report',
    type: 'report',
    description: 'Deep dive into specific market sector',
    blocks: ['Introduction', 'Sector Overview', 'Company Analysis', 'Valuation Metrics', 'Investment Implications']
  }
];

export function CanvasTabContent() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [outputType, setOutputType] = useState<'email' | 'note' | 'pitch-deck' | 'report'>('email');
  const [canvasBlocks, setCanvasBlocks] = useState<CanvasData[]>([]);
  const [emailSubtype, setEmailSubtype] = useState<string>('New Client Campaign');
  const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<'simple-text' | 'text-with-image' | 'two-column' | 'card-grid' | 'quote-block' | 'statistics'>('simple-text');

  // New states for Saved Blocks and Custom Templates
  const [savedBlocks, setSavedBlocks] = useState<CanvasData[]>([]);
  const [campaignLink, setCampaignLink] = useState<ReturnType<typeof readCanvasCampaignLink>>(null);
  const [customTemplates, setCustomTemplates] = useState<Template[]>([]);

  // Week / date filter state
  const [selectedWeek, setSelectedWeek] = useState<string>('week-1');
  const [useCustomRange, setUseCustomRange] = useState(false);
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');

  const filteredTemplates = templates.filter(t => t.type === outputType);

  const layoutOptions = [
    { type: 'simple-text' as const, name: 'Simple Text', icon: AlignLeft },
    { type: 'text-with-image' as const, name: 'Text + Image', icon: ImageIcon },
    { type: 'two-column' as const, name: 'Two Column', icon: Columns },
    { type: 'card-grid' as const, name: 'Card Grid', icon: LayoutGrid },
    { type: 'quote-block' as const, name: 'Quote Block', icon: Quote },
    { type: 'statistics' as const, name: 'Statistics', icon: BarChart3 },
    { type: 'fund-analysis' as const, name: 'Fund Analysis', icon: Activity },
  ];

  const emailSubtypes = [
    'New Client Campaign',
    'Reassurance Campaign',
    'New client follow up',
    'Reassuring email',
    'Existing client',
    'Internal',
    'Explainer',
    'Investment change'
  ];

  useEffect(() => {
    const storedBlocks = sessionStorage.getItem('canvasBlocks');
    if (storedBlocks) {
      setCanvasBlocks(JSON.parse(storedBlocks));
    }
    setCampaignLink(readCanvasCampaignLink());

    const savedBlocksData = localStorage.getItem('savedCanvasBlocks');
    if (savedBlocksData) {
      setSavedBlocks(JSON.parse(savedBlocksData));
    }
    const savedTemplatesData = localStorage.getItem('customEmailTemplates');
    if (savedTemplatesData) {
      setCustomTemplates(JSON.parse(savedTemplatesData));
    }
  }, []);

  const handleDeleteBlock = (timestamp: number) => {
    const updatedBlocks = canvasBlocks.filter(block => block.timestamp !== timestamp);
    setCanvasBlocks(updatedBlocks);
    sessionStorage.setItem('canvasBlocks', JSON.stringify(updatedBlocks));
  };

  const handleSaveBlock = (block: CanvasData) => {
    const newSaved = [...savedBlocks, { ...block, timestamp: Date.now() }];
    setSavedBlocks(newSaved);
    localStorage.setItem('savedCanvasBlocks', JSON.stringify(newSaved));
    alert('Block saved to library!');
  };

  const handleSaveTemplate = () => {
    if (canvasBlocks.length === 0) {
      alert('Cannot save an empty template. Add some blocks first.');
      return;
    }
    const templateName = window.prompt('Enter a name for this template:');
    if (!templateName) return;

    const newTemplate: Template = {
      id: `custom-template-${Date.now()}`,
      name: templateName,
      type: outputType,
      description: 'Custom saved template',
      blocks: canvasBlocks.map(b => b.blockTitle)
    };

    const newTemplates = [...customTemplates, newTemplate];
    setCustomTemplates(newTemplates);
    localStorage.setItem('customEmailTemplates', JSON.stringify(newTemplates));
    alert(`Template "${templateName}" saved successfully!`);
  };

  const handleAddBlock = () => {
    const currentWeekData = weeklyData[selectedWeek];
    const comparisonData: CanvasSection = {
      description: currentWeekData.description,
      summaryCards: currentWeekData.summaryCards,
      keyTopics: currentWeekData.keyTopics,
      keyDivergence: currentWeekData.keyDivergence,
      consensusViews: currentWeekData.consensusViews,
    };
    const newBlock: CanvasData = {
      blockId: `comparison-${Date.now()}`,
      blockTitle: 'Comparison Analysis',
      sections: comparisonData,
      sectionVisibility: {
        description: true,
        summaryCards: true,
        keyTopics: true,
        keyDivergence: true,
        consensusViews: true,
      },
      layoutType: selectedLayout,
      timestamp: Date.now(),
      dataSource: 'Fund Analysis'
    };
    const updatedBlocks = [...canvasBlocks, newBlock];
    setCanvasBlocks(updatedBlocks);
    sessionStorage.setItem('canvasBlocks', JSON.stringify(updatedBlocks));
  };

  const handleAddSavedBlock = (savedBlock: CanvasData) => {
    const newBlock = { ...savedBlock, timestamp: Date.now() };
    const updatedBlocks = [...canvasBlocks, newBlock];
    setCanvasBlocks(updatedBlocks);
    sessionStorage.setItem('canvasBlocks', JSON.stringify(updatedBlocks));
  };

  // Apply week filter to existing blocks
  const applyWeekFilter = (weekKey: string) => {
    if (canvasBlocks.length === 0) return;
    const week = weeklyData[weekKey];
    const updated = canvasBlocks.map(block => ({
      ...block,
      sections: {
        description: week.description,
        summaryCards: week.summaryCards,
        keyTopics: week.keyTopics,
        keyDivergence: week.keyDivergence,
        consensusViews: week.consensusViews,
      }
    }));
    setCanvasBlocks(updated);
    sessionStorage.setItem('canvasBlocks', JSON.stringify(updated));
  };

  const handleWeekSelect = (weekKey: string) => {
    setSelectedWeek(weekKey);
    setUseCustomRange(false);
    applyWeekFilter(weekKey);
  };

  const handleCustomRange = () => {
    setUseCustomRange(true);
  };

  const handleGenerateCanvas = () => {
    const currentWeekData = weeklyData[selectedWeek];

    if (outputType === 'email') {
      let templateBlocks: Array<{ title: string; layout: 'simple-text' | 'text-with-image' | 'two-column' | 'card-grid' | 'quote-block' | 'statistics' | 'fund-analysis'; imageUrl?: string; blockType: 'Opener' | 'Market Event' | 'Historical' | 'Quantitative' }> = [];

      templateBlocks = [
        { title: 'Campaign Opener', layout: 'simple-text', blockType: 'Opener' },
        { title: 'Market Event', layout: 'two-column', blockType: 'Market Event' },
        { title: 'Historical Context', layout: 'statistics', blockType: 'Historical' },
        { title: 'Quantitative Data', layout: 'fund-analysis', blockType: 'Quantitative' }
      ];

      const comparisonData: CanvasSection = {
        description: currentWeekData.description,
        summaryCards: currentWeekData.summaryCards,
        keyTopics: currentWeekData.keyTopics,
        keyDivergence: currentWeekData.keyDivergence,
        consensusViews: currentWeekData.consensusViews,
      };

      const newBlocks: CanvasData[] = templateBlocks.map((block, index) => ({
        blockId: `template-${emailSubtype}-${index}-${Date.now()}`,
        blockTitle: block.title,
        sections: comparisonData,
        sectionVisibility: {
          description: true,
          summaryCards: true,
          keyTopics: true,
          keyDivergence: true,
          consensusViews: true,
        },
        layoutType: block.layout,
        imageUrl: block.imageUrl,
        timestamp: Date.now() + index,
        blockType: block.blockType,
        selectedOption: 'Option 1',
        selectedChart: 'Chart 1'
      }));

      setCanvasBlocks(newBlocks);
      sessionStorage.setItem('canvasBlocks', JSON.stringify(newBlocks));
      setIsGenerated(true);
    } else if (selectedTemplate) {
      setIsGenerated(true);
    }
  };

  const handleReset = () => {
    setIsGenerated(false);
    setSelectedTemplate(null);
  };

  // ─── Week / Date Filter Bar (shown inside canvas header after generate) ──────
  const renderWeekFilterBar = () => {
    const activeWeek = weeklyData[selectedWeek];
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {/* Week buttons */}
        {Object.entries(weeklyData).map(([key, week]) => (
          <button
            key={key}
            onClick={() => handleWeekSelect(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              !useCustomRange && selectedWeek === key
                ? 'bg-[#3B82F6]/20 border-[#3B82F6]/60 text-[#60A5FA]'
                : 'bg-[#162033] border-[#1E293B] text-[#6B7280] hover:text-white hover:border-[#334155]'
            }`}
          >
            <span>{week.label}</span>
            <span className={`text-[10px] font-normal ${!useCustomRange && selectedWeek === key ? 'text-[#93C5FD]' : 'text-[#4B5563]'}`}>
              {week.dateRange}
            </span>
          </button>
        ))}

        {/* Divider */}
        <div className="w-px h-5 bg-[#1E293B] mx-1" />

        {/* Custom Range */}
        <button
          onClick={handleCustomRange}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
            useCustomRange
              ? 'bg-[#3B82F6]/20 border-[#3B82F6]/60 text-[#60A5FA]'
              : 'bg-[#162033] border-[#1E293B] text-[#6B7280] hover:text-white hover:border-[#334155]'
          }`}
        >
          <Calendar className="w-3 h-3" />
          Custom Range
        </button>

        {/* Custom date inputs — only shown when Custom Range is active */}
        {useCustomRange && (
          <div className="flex items-center gap-2 ml-1">
            <input
              type="date"
              value={customFrom}
              onChange={e => setCustomFrom(e.target.value)}
              className="bg-[#162033] border border-[#1E293B] text-white text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#3B82F6] [color-scheme:dark]"
            />
            <span className="text-[#4B5563] text-xs">→</span>
            <input
              type="date"
              value={customTo}
              onChange={e => setCustomTo(e.target.value)}
              className="bg-[#162033] border border-[#1E293B] text-white text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#3B82F6] [color-scheme:dark]"
            />
          </div>
        )}

        {/* Active label */}
        {!useCustomRange && (
          <span className="text-[10px] text-[#4B5563] ml-1">
            Showing: <span className="text-[#9CA3AF] font-medium">{activeWeek.label} · {activeWeek.dateRange}</span>
          </span>
        )}
        {useCustomRange && customFrom && customTo && (
          <span className="text-[10px] text-[#4B5563] ml-1">
            Showing: <span className="text-[#9CA3AF] font-medium">{customFrom} → {customTo}</span>
          </span>
        )}
      </div>
    );
  };

  // ─── Canvas Header (shared) ──────────────────────────────────────────────────
  const renderCanvasHeader = (showFilter: boolean) => (
    <div className="bg-[#0F1621] border-b border-[#1E293B] px-6 py-3">
      {/* Top row: title + action buttons */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-lg font-bold text-white uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
            Document Canvas
          </h1>
          <p className="text-xs text-[#94A3B8]">Drag to reorder blocks • Click to edit content</p>
        </div>
        <div className="flex items-center gap-3">
          {campaignLink && (
            <button
              className="bg-[#22C55E]/20 hover:bg-[#22C55E]/30 text-[#86EFAC] text-xs font-semibold px-3 py-2 rounded-lg border border-[#22C55E]/40 flex items-center gap-2"
              title="Mark email ready and sync to campaign"
              onClick={() => {
                if (markCanvasReadyToSend()) {
                  alert('Marked ready to send. Return to Campaign Journeys to see updated action state.');
                }
              }}
            >
              <Link2 className="w-3.5 h-3.5" />
              Ready to send
            </button>
          )}
          <button className="bg-[#162033] hover:bg-[#1E293B] text-white p-2 rounded-lg transition-all" title="Reset" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
          </button>
          <button className="bg-[#162033] hover:bg-[#1E293B] text-white p-2 rounded-lg transition-all" title="Save as Template" onClick={handleSaveTemplate}>
            <Save className="w-4 h-4" />
          </button>
          <button className="bg-[#162033] hover:bg-[#1E293B] text-white p-2 rounded-lg transition-all" title="Share Preview">
            <Share2 className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-[#1E293B]" />
          <button
            className="bg-[#162033] hover:bg-[#1E293B] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all flex items-center gap-2"
            onClick={handleAddBlock}
          >
            <Plus className="w-3.5 h-3.5" /> Add Block
          </button>
          <button className="bg-[#162033] hover:bg-[#1E293B] text-white p-2 rounded-lg transition-all" title="Preview">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Week / date filter row — only shown when canvas has content */}
      {showFilter && (
        <div className="pt-2 border-t border-[#1E293B]">
          {renderWeekFilterBar()}
        </div>
      )}
    </div>
  );

  // ─── Block content renderers ─────────────────────────────────────────────────
  const renderBlockContent = (block: CanvasData, blockIndex: number) => {
    const { sections, sectionVisibility, layoutType, selectedOption, selectedChart, blockType } = block;

    const handleOptionChange = (val: string) => {
      const newBlocks = [...canvasBlocks];
      newBlocks[blockIndex].selectedOption = val;
      setCanvasBlocks(newBlocks);
      sessionStorage.setItem('canvasBlocks', JSON.stringify(newBlocks));
    };

    const handleChartChange = (val: string) => {
      const newBlocks = [...canvasBlocks];
      newBlocks[blockIndex].selectedChart = val;
      setCanvasBlocks(newBlocks);
      sessionStorage.setItem('canvasBlocks', JSON.stringify(newBlocks));
    };

    const dropdownSection = (
      <div className="flex gap-4 mb-4 bg-[#0B1220] p-3 rounded-lg border border-[#1F2937]">
        <div className="flex-1">
          <label className="text-[10px] font-semibold text-[#6B7280] uppercase block mb-1">Content Option</label>
          <div className="relative">
            <select 
              value={selectedOption || 'Option 1'} 
              onChange={(e) => handleOptionChange(e.target.value)}
              className="w-full bg-[#162033] text-white text-xs border border-[#1E2937] rounded px-2 py-1.5 appearance-none focus:outline-none focus:border-[#3B82F6]"
            >
              <option value="Option 1">Option 1: Conservative Approach</option>
              <option value="Option 2">Option 2: Aggressive Growth</option>
              <option value="Option 3">Option 3: Risk Managed</option>
              <option value="Option 4">Option 4: Yield Focused</option>
            </select>
            <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-[#4B5563] pointer-events-none" />
          </div>
        </div>
        {(layoutType === 'fund-analysis' || blockType === 'Quantitative') && (
          <div className="flex-1">
            <label className="text-[10px] font-semibold text-[#6B7280] uppercase block mb-1">AI Visualization</label>
            <div className="relative">
              <select 
                value={selectedChart || 'Chart 1'} 
                onChange={(e) => handleChartChange(e.target.value)}
                className="w-full bg-[#162033] text-white text-xs border border-[#1E2937] rounded px-2 py-1.5 appearance-none focus:outline-none focus:border-[#3B82F6]"
              >
                <option value="Chart 1">Chart 1: Asset Allocation</option>
                <option value="Chart 2">Chart 2: Historical Performance</option>
                <option value="Chart 3">Chart 3: Risk/Return Scatter</option>
                <option value="Chart 4">Chart 4: Sector Exposure</option>
              </select>
              <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-[#4B5563] pointer-events-none" />
            </div>
          </div>
        )}
      </div>
    );

    // Mock data for charts
    const pieData = [
      { name: 'Equities', value: 40, color: '#3B82F6' },
      { name: 'Fixed Income', value: 30, color: '#10B981' },
      { name: 'Alternatives', value: 20, color: '#F59E0B' },
      { name: 'Cash', value: 10, color: '#6366F1' },
    ];

    const lineData = [
      { name: 'Jan', value: 100 },
      { name: 'Feb', value: 120 },
      { name: 'Mar', value: 115 },
      { name: 'Apr', value: 130 },
      { name: 'May', value: 145 },
      { name: 'Jun', value: 140 },
    ];

    const barData = [
      { name: 'Tech', value: 85 },
      { name: 'Health', value: 65 },
      { name: 'Finance', value: 45 },
      { name: 'Energy', value: 30 },
    ];

    if (layoutType === 'fund-analysis' || blockType === 'Quantitative') {
      const chartDescriptions: Record<string, string> = {
        'Chart 1': "Current asset allocation shows a diversified mix aimed at optimizing risk-adjusted returns. The overweight position in Equities is balanced by a strong Fixed Income core, providing stability in volatile market conditions.",
        'Chart 2': "Historical performance analysis indicates consistent growth over the analyzed period, with the portfolio demonstrating strong recovery characteristics following market dips and maintaining a steady upward trajectory.",
        'Chart 3': "Risk analysis confirms the portfolio's positioning within the target efficiency frontier, offering competitive Sharpe ratios and manageable standard deviation relative to benchmark performance.",
        'Chart 4': "Sector exposure mapping highlights significant conviction in Tech and Health sectors, leveraging secular growth trends while maintaining tactical hedges in Energy and Finance."
      };

      return (
        <div className="space-y-4">
          {dropdownSection}
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1F2937] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>
                {selectedChart === 'Chart 1' ? 'ASSET ALLOCATION' : 
                 selectedChart === 'Chart 2' ? 'HISTORICAL PERFORMANCE' :
                 selectedChart === 'Chart 3' ? 'RISK ANALYSIS' : 'SECTOR EXPOSURE'}
              </h3>
              <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
            </div>
            <div className="p-6">
              <div className="mb-6 p-4 bg-[#0B1220]/50 border-l-2 border-[#3B82F6] rounded-r-lg">
                <p className="text-sm text-[#94A3B8] leading-relaxed italic">
                  {chartDescriptions[selectedChart || 'Chart 1']}
                </p>
              </div>
              <div className="aspect-video bg-[#0B1220] border border-[#1F2937] rounded-lg p-4">
                <ResponsiveContainer width="100%" height="100%">
                  {selectedChart === 'Chart 1' ? (
                    <RePieChart>
                      <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                    </RePieChart>
                  ) : selectedChart === 'Chart 2' ? (
                    <AreaChart data={lineData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                      <XAxis dataKey="name" stroke="#6B7280" fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis stroke="#6B7280" fontSize={10} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#3B82F6" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                    </AreaChart>
                  ) : (
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                      <XAxis dataKey="name" stroke="#6B7280" fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis stroke="#6B7280" fontSize={10} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-[#0B1220] p-4 rounded-lg border border-[#1F2937]">
                  <p className="text-[10px] text-[#6B7280] uppercase font-bold">Standard Deviation</p>
                  <p className="text-xl font-bold text-white">{selectedOption === 'Option 1' ? '8.2%' : '14.5%'}</p>
                </div>
                <div className="bg-[#0B1220] p-4 rounded-lg border border-[#1F2937]">
                  <p className="text-[10px] text-[#6B7280] uppercase font-bold">Sharpe Ratio</p>
                  <p className="text-xl font-bold text-white">{selectedOption === 'Option 1' ? '1.92' : '1.45'}</p>
                </div>
                <div className="bg-[#0B1220] p-4 rounded-lg border border-[#1F2937]">
                  <p className="text-[10px] text-[#6B7280] uppercase font-bold">Max Drawdown</p>
                  <p className="text-xl font-bold text-[#EF4444]">{selectedOption === 'Option 1' ? '-4.2%' : '-12.8%'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (layoutType === 'simple-text') {
      return (
        <div className="space-y-4">
          {dropdownSection}
          {sectionVisibility.description && sections.description && (
            <div className="bg-[#111827] border border-[#1F2937] rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-[#1F2937] flex items-center justify-between">
                <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>OVERVIEW</h3>
                <button className="text-[#6B7280] hover:text-[#3B82F6] transition-colors p-1"><Edit2 className="w-4 h-4" /></button>
              </div>
              <div className="px-6 py-5">
                <p className="text-sm text-[#D1D5DB] leading-relaxed italic">Selected Content: {selectedOption}</p>
                <p className="text-sm text-[#94A3B8] leading-relaxed mt-2 italic">{sections.description}</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (layoutType === 'text-with-image') {
      return (
        <div className="bg-[#111827] border border-[#1F2937] rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1F2937]">
            <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>TEXT + IMAGE</h3>
          </div>
          <div className="grid grid-cols-2 gap-6 p-6">
            <div>
              <p className="text-sm text-[#D1D5DB] leading-relaxed italic mb-4">{sections.description || 'Content text goes here...'}</p>
              <p className="text-xs text-[#9CA3AF]">Additional supporting text and details can be added in this section.</p>
            </div>
            <div className="bg-[#0B1220] border border-[#334155] rounded-lg flex items-center justify-center h-48 overflow-hidden">
              {block.imageUrl ? (
                <ImageWithFallback src={block.imageUrl} alt="Block image" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 text-[#6B7280] mx-auto mb-2" />
                  <p className="text-xs text-[#6B7280]">Image Placeholder</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (layoutType === 'two-column' || blockType === 'Market Event') {
      return (
        <div className="space-y-4">
          {dropdownSection}
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1F2937] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>MARKET EVENT ANALYSIS</h3>
              <Globe className="w-4 h-4 text-[#22C55E]" />
            </div>
            <div className="grid grid-cols-2 gap-6 p-6">
              <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-[#3B82F6]/20 rounded text-[#3B82F6]"><Activity className="w-3.5 h-3.5" /></div>
                  <h4 className="text-xs font-bold text-white uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>Primary Catalyst</h4>
                </div>
                <p className="text-sm text-[#D1D5DB] leading-relaxed italic mb-3">
                  {selectedOption === 'Option 1' 
                    ? "The Federal Reserve's recent commentary suggests a shift toward a more cautious monetary stance, impacting short-term yield expectations."
                    : "Global supply chain disruptions in the semiconductor sector are driving localized inflation in hardware and cloud infrastructure costs."}
                </p>
                <div className="bg-[#111827] p-3 rounded border border-[#1F2937]">
                  <p className="text-[10px] text-[#6B7280] font-bold uppercase">Impact Score</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                      <div className="h-full bg-[#3B82F6]" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-white">7.5/10</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-[#22C55E]/20 rounded text-[#22C55E]"><LineChart className="w-3.5 h-3.5" /></div>
                  <h4 className="text-xs font-bold text-white uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>Portfolio Resilience</h4>
                </div>
                <p className="text-sm text-[#D1D5DB] leading-relaxed">
                  {selectedOption === 'Option 1'
                    ? "Portfolio positioning remains defensive with a high allocation to investment-grade credit, minimizing exposure to duration risk."
                    : "Growth-oriented sectors show high beta but are supported by strong earnings quality and robust balance sheets across core holdings."}
                </p>
                <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-[#6B7280]">
                  <span>ALPHA GEN: <span className="text-[#22C55E]">+1.2%</span></span>
                  <span>BETA ADJ: <span className="text-white">0.92</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (layoutType === 'statistics' || blockType === 'Historical') {
      return (
        <div className="space-y-4">
          {dropdownSection}
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1F2937] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>HISTORICAL CONTEXT</h3>
              <HistoryIcon className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Avg 5Y Return', val: '12.4%', sub: '+2.1% vs Peers' },
                  { label: 'Drawdown Period', val: '42 Days', sub: 'Shortest in Class' },
                  { label: 'Recovery Speed', val: 'Fast', sub: '82nd Percentile' },
                ].map((stat, i) => (
                  <div key={i} className="bg-[#0B1220] border border-[#1F2937] p-4 rounded-lg">
                    <p className="text-[10px] text-[#6B7280] font-bold uppercase mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.val}</p>
                    <p className="text-[10px] text-[#3B82F6] font-medium mt-1">{stat.sub}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-5">
                <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-wider">Comparative Regression Analysis</h4>
                <div className="aspect-[4/1] w-full flex items-end gap-1 px-2">
                  {[40, 60, 45, 70, 55, 85, 65, 95, 75, 100, 80, 110].map((h, i) => (
                    <div key={i} className="flex-1 bg-[#F59E0B]/20 border-t-2 border-[#F59E0B] rounded-t-sm" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                <p className="text-[10px] text-[#6B7280] mt-4 text-center">Historical performance under similar macro conditions ({selectedOption})</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Statistics layout (default fallback)
    return (
      <div className="space-y-4">
        {sectionVisibility.description && sections.description && (
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1F2937]">
              <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>OVERVIEW</h3>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-[#D1D5DB] leading-relaxed italic">{sections.description}</p>
            </div>
          </div>
        )}

        {sectionVisibility.keyTopics && sections.keyTopics && sections.keyTopics.length > 0 && (
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1F2937]">
              <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>KEY TOPICS OVERVIEW</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {sections.keyTopics.map((topic, index) => {
                  const statusColors: Record<string, string> = {
                    'Consensus': 'bg-[#22C55E]/20 text-[#22C55E]',
                    'Partial': 'bg-[#F59E0B]/20 text-[#F59E0B]',
                    'Divergence': 'bg-[#EF4444]/20 text-[#EF4444]',
                    '3/3': 'bg-[#22C55E]/20 text-[#22C55E]'
                  };
                  const statusColor = statusColors[topic.status] || 'bg-[#6B7280]/20 text-[#6B7280]';
                  return (
                    <div key={index} className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white mb-1">{topic.topic}</p>
                        <p className="text-xs text-[#9CA3AF]">Your View: {topic.value}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor}`}>{topic.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {sectionVisibility.keyDivergence && sections.keyDivergence && (
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1F2937] flex items-center gap-2">
              <div className="bg-[#EF4444]/20 p-1.5 rounded">
                <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
              </div>
              <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>KEY DIVERGENCE</h3>
            </div>
            <div className="p-6">
              <div className="bg-[#EF4444]/5 border border-[#EF4444]/30 rounded-lg p-5">
                <h4 className="text-base font-bold text-white mb-4">{sections.keyDivergence.title}</h4>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-4">
                    <p className="text-xs text-[#9CA3AF] uppercase font-semibold mb-2">Your Portfolio</p>
                    <p className="text-lg font-bold text-white">{sections.keyDivergence.yourPortfolio}</p>
                  </div>
                  <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-4">
                    <p className="text-xs text-[#9CA3AF] uppercase font-semibold mb-2">Competitors Avg</p>
                    <p className="text-lg font-bold text-white">{sections.keyDivergence.competitorsAvg}</p>
                  </div>
                </div>
                <p className="text-xs text-[#6B7280]">{sections.keyDivergence.analyzed}</p>
              </div>
            </div>
          </div>
        )}

        {sectionVisibility.consensusViews && sections.consensusViews && sections.consensusViews.length > 0 && (
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1F2937]">
              <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>CONSENSUS VIEWS</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {sections.consensusViews.map((view, index) => (
                  <div key={index} className="bg-[#22C55E]/5 border border-[#22C55E]/30 rounded-lg p-4 flex items-start gap-3">
                    <div className="bg-[#22C55E]/20 p-2 rounded-lg flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{view}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ─── Left Sidebar ────────────────────────────────────────────────────────────
  const renderLeftSidebar = (hasBlocks: boolean) => (
    <div className="w-64 bg-[#0F1621] border-r border-[#1E293B] p-4 sticky top-0 h-screen overflow-y-auto flex-shrink-0">
      <h3 className="text-sm font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
        OUTPUT SETUP
      </h3>

      <div className="mb-5">
        <label className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2 block">Output Type</label>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {(['email', 'note'] as const).map((type) => (
            <button key={type}
              className={`text-white text-[11px] font-semibold py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${outputType === type ? 'bg-[#3B82F6] hover:bg-[#60A5FA]' : 'bg-[#1E293B] hover:bg-[#334155]'}`}
              onClick={() => { setOutputType(type); setSelectedTemplate(null); setIsGenerated(false); }}
            >
              {type === 'email' ? <Mail className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
              {type === 'email' ? 'Email' : 'Note'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(['pitch-deck', 'report'] as const).map((type) => (
            <button key={type}
              className={`text-white text-[11px] font-semibold py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${outputType === type ? 'bg-[#3B82F6] hover:bg-[#60A5FA]' : 'bg-[#1E293B] hover:bg-[#334155]'}`}
              onClick={() => { setOutputType(type); setSelectedTemplate(null); setIsGenerated(false); }}
            >
              {type === 'pitch-deck' ? <Presentation className="w-3.5 h-3.5" /> : <FileStack className="w-3.5 h-3.5" />}
              {type === 'pitch-deck' ? 'Pitch Deck' : 'Report'}
            </button>
          ))}
        </div>

        {outputType === 'email' && (
          <div className="mt-3">
            <label className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2 block">Email Type</label>
            <div className="relative">
              <select value={emailSubtype} onChange={(e) => setEmailSubtype(e.target.value)}
                className="w-full bg-[#162033] hover:bg-[#1E293B] text-white text-[11px] font-medium py-2.5 px-3 pr-8 rounded-lg transition-all appearance-none cursor-pointer border border-[#1E293B] focus:outline-none focus:border-[#3B82F6]">
                {emailSubtypes.map((s) => <option key={s} value={s} className="bg-[#162033]">{s}</option>)}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      <div className="mb-5">
        <label className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2 block">Template</label>
        <div className="relative">
          <select 
            value={selectedTemplate?.id || ''} 
            onChange={(e) => {
              const allT = [...filteredTemplates, ...customTemplates];
              setSelectedTemplate(allT.find(t => t.id === e.target.value) || null);
            }}
            className="w-full bg-[#162033] hover:bg-[#1E293B] text-white text-[11px] font-medium py-2.5 px-3 pr-8 rounded-lg transition-all appearance-none cursor-pointer border border-[#1E293B] focus:outline-none focus:border-[#3B82F6]"
          >
            <option value="" disabled>Select Template</option>
            <optgroup label="Standard Templates">
              {filteredTemplates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </optgroup>
            {customTemplates.filter(t => t.type === outputType).length > 0 && (
              <optgroup label="Custom Templates">
                {customTemplates.filter(t => t.type === outputType).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </optgroup>
            )}
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
        </div>
      </div>

      <button className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#22C55E]/20"
        onClick={handleGenerateCanvas}>
        <Wand2 className="w-4 h-4" /> Generate Canvas
      </button>

      <div className="mt-5 pt-5 border-t border-[#1E293B]">
        <p className="text-xs text-[#6B7280] text-center mb-4">
          {hasBlocks ? `${canvasBlocks.length} block(s) added to canvas` : 'No blocks added yet. Add content from Compare page.'}
        </p>

        {savedBlocks.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wide">Saved Blocks Library</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {savedBlocks.map((sb, idx) => (
                <div key={idx} className="bg-[#111827] border border-[#1F2937] p-3 rounded-lg hover:border-[#3B82F6] cursor-pointer transition-colors group" onClick={() => handleAddSavedBlock(sb)}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-medium text-white truncate pr-2">{sb.blockTitle}</span>
                    <Plus className="w-3.5 h-3.5 text-[#6B7280] group-hover:text-[#3B82F6]" />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-[#6B7280]">
                    <span>{sb.layoutType}</span>
                    <span>{sb.blockType || 'General'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ─── Generated state ──────────────────────────────────────────────────────────
  if (canvasBlocks.length > 0) {
    return (
      <div className="flex min-h-screen bg-[#0B1220]">
        {renderLeftSidebar(true)}
        <div className="flex-1 flex flex-col min-w-0">
          {renderCanvasHeader(true)}
          <div className="flex-1 bg-[#0B1220] p-8 overflow-y-auto">
            <div className="space-y-8">
              {canvasBlocks.map((block, blockIndex) => {
                const isSelected = selectedBlockId === block.timestamp;
                return (
                  <div key={block.timestamp}
                    className={`bg-[#0F1621] border-2 rounded-xl p-6 shadow-xl cursor-pointer transition-all ${isSelected ? 'border-[#3B82F6] shadow-[#3B82F6]/20' : 'border-[#1E293B] hover:border-[#334155]'}`}
                    onClick={() => setSelectedBlockId(block.timestamp)}
                  >
                    <div className="mb-6 pb-4 border-b border-[#1E293B] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#3B82F6]/20 px-3 py-1.5 rounded-lg">
                          <span className="text-xs font-bold text-[#3B82F6]" style={{ fontFamily: "'Oswald', sans-serif" }}>BLOCK {blockIndex + 1}</span>
                        </div>
                        <h2 className="text-sm font-bold text-white uppercase tracking-wide" style={{ fontFamily: "'Oswald', sans-serif" }}>
                          {block.blockTitle}
                        </h2>
                        <span className="bg-[#1E293B] border border-[#334155] text-[#94A3B8] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          {useCustomRange && customFrom && customTo
                            ? `${customFrom} → ${customTo}`
                            : weeklyData[selectedWeek].label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          className="text-[#6B7280] hover:text-[#3B82F6] transition-colors p-2 rounded-lg hover:bg-[#3B82F6]/10"
                          onClick={(e) => { e.stopPropagation(); handleSaveBlock(block); }}
                          title="Save block"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          className="text-[#6B7280] hover:text-[#EF4444] transition-colors p-2 rounded-lg hover:bg-[#EF4444]/10"
                          onClick={(e) => { e.stopPropagation(); handleDeleteBlock(block.timestamp); }}
                          title="Delete block"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {renderBlockContent(block, blockIndex)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Empty state ──────────────────────────────────────────────────────────────
  return (
    <div className="flex h-[calc(100vh-180px)] bg-[#0B1220]">
      {renderLeftSidebar(false)}
      <div className="flex-1 flex flex-col min-w-0">
        {renderCanvasHeader(false)}
        <div className="flex-1 bg-[#0B1220] flex items-center justify-center">
          <div className="text-center max-w-md">
            <FileText className="w-16 h-16 text-[#6B7280] mx-auto mb-5" />
            <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
              No Content Yet
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Select a template and click <strong>Generate Canvas</strong> to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
