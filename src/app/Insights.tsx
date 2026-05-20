import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { createPortal } from 'react-dom';
import { Target, AlertTriangle, Activity, TrendingUp, BarChart3, PieChart as PieChartIcon, ArrowLeft, ArrowUpRight, ArrowDownRight, LineChart, Building2, Wallet, Globe, Brain, MessageCircle, ArrowRight, FileSearch, GitCompare, Lightbulb, Send, Paperclip, Mic, Image, Check, Plus, Filter, ChevronDown, FileText, Handshake, TrendingDown, Upload, ChevronRight, Wand2, List, Edit3, Zap, Info, History as HistoryIcon, Mail, Users, FileStack, Presentation, Layers, Eye, Clock, RefreshCw, Sparkles, HelpCircle, Search, DollarSign, Flame, Play, Folder, Settings, X } from 'lucide-react';
import { LineChart as RechartsLine, BarChart, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, CartesianGrid, XAxis, YAxis, Tooltip, Line, Bar, ResponsiveContainer } from 'recharts';
import { InsightTabs } from './components/InsightTabs';
import { DocumentSlider } from './components/DocumentSlider';
import { AIInsightsDocuments } from './components/AIInsightsDocuments';
import { AIInsights } from './components/AIInsights';
import { AssetClassSlider } from './components/AssetClassSlider';
import { AskAISlider } from './components/AskAISlider';
import { CompareDocumentsSlider } from './components/CompareDocumentsSlider';
import { SummarizeDocumentsSlider } from './components/SummarizeDocumentsSlider';
import { InvestmentThesisSlider } from './components/InvestmentThesisSlider';
import { ComparisonAnalysisSlider } from './components/ComparisonAnalysisSlider';
import { CompareTabContent } from './components/CompareTabContent';
import { CanvasTabContent } from './components/CanvasTabContent';
import { GeneralChatWithCanvas } from './components/GeneralChatWithCanvas';
import { HouseViewOutput } from './components/HouseViewOutput';
import { FundTabContent } from './components/FundTabContent';
import { HistoricalAnalysisResultsInline } from './components/HistoricalAnalysisResultsInline';

interface SavedDocument {
  id: string;
  title: string;
  content: any;
  source: string;
  savedAt: Date;
  type: 'ask-ai' | 'compare' | 'summarize' | 'investment-thesis';
}

export default function Insights() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedInsight, setSelectedInsight] = useState<string | null>(searchParams.get('section'));
  const [activeTab, setActiveTab] = useState<'overview' | 'ask-ai' | 'commentary' | 'compare' | 'historical-analysis' | 'fund' | 'canvas'>('overview');
  const [inputValue, setInputValue] = useState('');
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [sliderContent, setSliderContent] = useState<any>(null);
  const [sliderTitle, setSliderTitle] = useState('');
  const [sliderSource, setSliderSource] = useState('');
  const [savedDocuments, setSavedDocuments] = useState<SavedDocument[]>([]);
  const [isAssetClassSliderOpen, setIsAssetClassSliderOpen] = useState(false);
  const [selectedAssetClass, setSelectedAssetClass] = useState<'equities' | 'bonds' | 'commodities' | 'alternatives' | 'real-estate' | 'cash'>('equities');
  const [isAskAISliderOpen, setIsAskAISliderOpen] = useState(false);
  const [isCompareDocsSliderOpen, setIsCompareDocsSliderOpen] = useState(false);
  const [isSummarizeDocsSliderOpen, setIsSummarizeDocsSliderOpen] = useState(false);
  const [isInvestmentThesisSliderOpen, setIsInvestmentThesisSliderOpen] = useState(false);
  const [showComparisonResults, setShowComparisonResults] = useState(false);
  const [isComparisonAnalysisSliderOpen, setIsComparisonAnalysisSliderOpen] = useState(false);
  const [askAISubTab, setAskAISubTab] = useState<'general-chat' | 'summarise' | 'qas'>('general-chat');
  const [showQAResponse, setShowQAResponse] = useState(false);
  const [qaQuestion, setQAQuestion] = useState('');
  const [hasGeneralChatStarted, setHasGeneralChatStarted] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  
  // Historical Analysis state
  const [hasRunHistoricalAnalysis, setHasRunHistoricalAnalysis] = useState(false);
  const [selectedTimeHorizon, setSelectedTimeHorizon] = useState<'1Y' | '5Y' | '10Y' | '20Y' | '50Y' | '100Y' | 'CUSTOM'>('5Y');
  const [lookbackYears, setLookbackYears] = useState(5);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  
  // Commentary tab state
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [customPromptQuery, setCustomPromptQuery] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [showDocumentPicker, setShowDocumentPicker] = useState(false);
  const [showHouseViewOutput, setShowHouseViewOutput] = useState(false);
  const [selectedFund, setSelectedFund] = useState('All Funds');
  const [selectedAssetClassForHV, setSelectedAssetClassForHV] = useState('All Asset Classes');
  const [selectedMacroTheme, setSelectedMacroTheme] = useState('All Macro Themes');
  const [selectedFootnote, setSelectedFootnote] = useState<number | null>(null);

  // Available documents for Custom Prompt
  const availableDocuments = [
    { id: '1', name: 'Q4 2024 Market Outlook', type: 'PDF', date: 'Dec 15, 2024', pages: 24 },
    { id: '2', name: 'CIO Commentary - Technology Sector', type: 'PDF', date: 'Dec 10, 2024', pages: 18 },
    { id: '3', name: 'Global Inflation Report', type: 'PDF', date: 'Dec 8, 2024', pages: 32 },
    { id: '4', name: 'Emerging Markets Analysis', type: 'PDF', date: 'Dec 5, 2024', pages: 28 },
    { id: '5', name: 'Investment Committee Notes', type: 'PDF', date: 'Dec 1, 2024', pages: 12 },
    { id: '6', name: 'ESG Investment Strategy', type: 'PDF', date: 'Nov 28, 2024', pages: 22 },
    { id: '7', name: 'Fixed Income Outlook 2025', type: 'PDF', date: 'Nov 25, 2024', pages: 30 },
    { id: '8', name: 'Equity Market Themes', type: 'PDF', date: 'Nov 20, 2024', pages: 26 },
    { id: '9', name: 'Alternative Assets Review', type: 'PDF', date: 'Nov 15, 2024', pages: 20 },
    { id: '10', name: 'Currency & FX Strategy', type: 'PDF', date: 'Nov 10, 2024', pages: 16 },
  ];

  const handleDocumentToggle = (docId: string) => {
    setSelectedDocuments(prev => {
      if (prev.includes(docId)) {
        return prev.filter(id => id !== docId);
      } else if (prev.length < 5) {
        return [...prev, docId];
      }
      return prev;
    });
  };

  useEffect(() => {
    const section = searchParams.get('section');
    setSelectedInsight(section);
    
    const tab = searchParams.get('tab');
    if (tab === 'ask-ai') {
      setActiveTab('ask-ai');
    } else if (tab === 'canvas') {
      setActiveTab('canvas');
    } else if (tab === 'fund') {
      setActiveTab('fund');
    }
  }, [searchParams]);

  // Check for portal element availability
  useEffect(() => {
    const checkPortal = () => {
      const element = document.getElementById('insights-tabs-portal');
      if (element) {
        setPortalElement(element);
      }
    };
    
    checkPortal();
    // Fallback check in case the element isn't ready immediately
    const timer = setTimeout(checkPortal, 0);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSaveComparisonDocument = (document: SavedDocument) => {
    setSavedDocuments(prev => [document, ...prev]);
  };

  const commonTopics = [
    { icon: LineChart, title: 'Market Analysis', subtitle: 'Trends & forecasts' },
    { icon: Building2, title: 'Fed Policy', subtitle: 'Rates & decisions' },
    { icon: Wallet, title: 'Portfolio Strategy', subtitle: 'Asset allocation' },
    { icon: Globe, title: 'Global Markets', subtitle: 'International view' },
  ];

  const exampleQuestions = [
    { icon: LineChart, text: 'Analyze current market trends' },
    { icon: Building2, text: 'Explain Fed policy impact' },
    { icon: Wallet, text: 'Suggest portfolio allocation' },
    { icon: Globe, text: 'Compare global markets' },
  ];

  const insights = [
    {
      id: 'house-alignment',
      category: 'House Alignment',
      title: 'Market Sentiment Analysis',
      icon: <Target className="w-5 h-5" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      time: '12h ago',
      summary: 'Market sentiment moderately bullish (72%). Tech sector showing strongest positive momentum driven by AI adoption trends.',
      sentiment: 72,
      trend: 'up',
    },
    {
      id: 'competitor-analysis',
      category: 'Risk Analysis',
      title: 'Portfolio Correlation Alert',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      time: '8h ago',
      summary: 'Elevated correlation detected between equity and bond portfolios (0.68 vs 0.42 avg). Diversification benefit reducing.',
      sentiment: 68,
      trend: 'down',
    },
    {
      id: 'trends',
      category: 'Market Trends',
      title: 'Portfolio Rebalancing Recommendation',
      icon: <Activity className="w-5 h-5" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      time: '1h ago',
      summary: 'AI model suggests reducing European equities exposure by 3%. Increase Asian emerging markets allocation.',
      sentiment: 85,
      trend: 'up',
    },
    {
      id: 'sector-rotation',
      category: 'Sector Analysis',
      title: 'Technology Sector Momentum',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      time: '3h ago',
      summary: 'Tech sector outperformance expected to continue. AI and semiconductor stocks showing strong institutional buying.',
      sentiment: 78,
      trend: 'up',
    },
    {
      id: 'macro-outlook',
      category: 'Macro Analysis',
      title: 'Fed Policy Impact Assessment',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      time: '5h ago',
      summary: 'Rate cut expectations building for Q2 2026. Bond yields likely to compress, supporting equity valuations.',
      sentiment: 65,
      trend: 'neutral',
    },
    {
      id: 'emerging-markets',
      category: 'Regional Analysis',
      title: 'Emerging Markets Recovery',
      icon: <PieChartIcon className="w-5 h-5" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      time: '6h ago',
      summary: 'Asian emerging markets showing resilience. China stimulus measures boosting regional confidence.',
      sentiment: 71,
      trend: 'up',
    },
  ];

  // Performance data for charts
  const sentimentHistoryData = [
    { date: 'Jan', bullish: 58, bearish: 42 },
    { date: 'Feb', bullish: 62, bearish: 38 },
    { date: 'Mar', bullish: 65, bearish: 35 },
    { date: 'Apr', bullish: 68, bearish: 32 },
    { date: 'May', bullish: 70, bearish: 30 },
    { date: 'Jun', bullish: 72, bearish: 28 },
  ];

  const sectorMomentumData = [
    { sector: 'Technology', momentum: 85, allocation: 28.5 },
    { sector: 'Healthcare', momentum: 72, allocation: 15.8 },
    { sector: 'Financials', momentum: 58, allocation: 18.2 },
    { sector: 'Energy', momentum: 45, allocation: 10.1 },
    { sector: 'Consumer', momentum: 68, allocation: 12.3 },
  ];

  const correlationData = [
    { month: 'Jan', correlation: 0.42 },
    { month: 'Feb', correlation: 0.45 },
    { month: 'Mar', correlation: 0.51 },
    { month: 'Apr', correlation: 0.58 },
    { month: 'May', correlation: 0.63 },
    { month: 'Jun', correlation: 0.68 },
  ];

  const radarData = [
    { metric: 'Value', score: 75 },
    { metric: 'Growth', score: 85 },
    { metric: 'Momentum', score: 78 },
    { metric: 'Quality', score: 82 },
    { metric: 'Volatility', score: 45 },
  ];

  const handleInsightClick = (id: string) => {
    setSelectedInsight(id);
    navigate(`/insights?section=${id}`);
  };

  const handleBackClick = () => {
    setSelectedInsight(null);
    navigate('/insights');
  };

  const handleOpenSlider = (title: string, content: any, source: string) => {
    setSliderTitle(title);
    setSliderContent(content);
    setSliderSource(source);
    setIsSliderOpen(true);
  };

  const handleSaveDocument = (title: string, content: any) => {
    const newDoc: SavedDocument = {
      id: Date.now().toString(),
      title,
      content,
      source: sliderSource,
      savedAt: new Date(),
      type: activeTab,
    };
    setSavedDocuments([...savedDocuments, newDoc]);
  };

  const handleDirectSave = (title: string, content: any, source: string) => {
    const newDoc: SavedDocument = {
      id: Date.now().toString(),
      title,
      content,
      source,
      savedAt: new Date(),
      type: activeTab as 'ask-ai' | 'compare' | 'summarize' | 'investment-thesis',
    };
    setSavedDocuments([...savedDocuments, newDoc]);
  };

  const handleDeleteDocument = (id: string) => {
    setSavedDocuments(savedDocuments.filter(doc => doc.id !== id));
  };

  // Detailed view for specific insight
  if (selectedInsight) {
    const insight = insights.find(i => i.id === selectedInsight);
    if (!insight) {
      return null;
    }

    return (
      <div className="p-6">
        {/* Back Button */}
        <button 
          onClick={handleBackClick}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-bold">Back to All Insights</span>
        </button>

        {/* Header */}
        <div className={`bg-gradient-to-br from-[#111827] to-[#0D1525] border ${insight.borderColor} rounded-lg p-6 mb-6`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`${insight.bgColor} ${insight.color} p-3 rounded-lg`}>
                {insight.icon}
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase font-bold mb-1">{insight.category}</div>
                <h1 className="text-2xl font-bold">{insight.title}</h1>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-2">{insight.time}</div>
              <div className={`text-2xl font-bold ${insight.sentiment > 65 ? 'text-green-400' : insight.sentiment > 50 ? 'text-blue-400' : 'text-red-400'}`}>
                {insight.sentiment}%
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-base">{insight.summary}</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Key Findings */}
          <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
            <h2 className="text-blue-500 text-sm font-bold uppercase mb-4">Key Findings</h2>
            <div className="space-y-4">
              {insight.id === 'house-alignment' && (
                <>
                  <KeyFinding 
                    title="Tech Sector Leading"
                    description="Technology sector showing +8.2% momentum, driven by AI infrastructure spending and cloud adoption."
                    trend="up"
                    value="+8.2%"
                  />
                  <KeyFinding 
                    title="Institutional Buying"
                    description="Net institutional inflows of $12.3B over past 2 weeks, indicating strong conviction."
                    trend="up"
                    value="$12.3B"
                  />
                  <KeyFinding 
                    title="Volatility Declining"
                    description="VIX index down 18% from monthly peak, suggesting market stabilization."
                    trend="up"
                    value="-18%"
                  />
                </>
              )}
              {insight.id === 'competitor-analysis' && (
                <>
                  <KeyFinding 
                    title="Correlation Spike"
                    description="Equity-bond correlation jumped from 0.42 to 0.68, highest level since Q4 2025."
                    trend="down"
                    value="0.68"
                  />
                  <KeyFinding 
                    title="Diversification Loss"
                    description="Portfolio risk increased by 15% due to reduced diversification benefits."
                    trend="down"
                    value="+15%"
                  />
                  <KeyFinding 
                    title="Hedge Effectiveness"
                    description="Traditional bond hedges 32% less effective in current environment."
                    trend="down"
                    value="-32%"
                  />
                </>
              )}
              {insight.id === 'trends' && (
                <>
                  <KeyFinding 
                    title="European Overweight"
                    description="European equity allocation 3% above strategic target, facing headwinds from slow growth."
                    trend="neutral"
                    value="+3%"
                  />
                  <KeyFinding 
                    title="Asia EM Opportunity"
                    description="Asian emerging markets undervalued by 12% on P/E basis vs historical average."
                    trend="up"
                    value="-12%"
                  />
                  <KeyFinding 
                    title="Rebalancing Impact"
                    description="Suggested rebalancing could improve risk-adjusted returns by 0.4% annually."
                    trend="up"
                    value="+0.4%"
                  />
                </>
              )}
              {insight.id === 'sector-rotation' && (
                <>
                  <KeyFinding 
                    title="AI Infrastructure"
                    description="AI chip makers up 45% YTD, continuing to lead tech sector performance."
                    trend="up"
                    value="+45%"
                  />
                  <KeyFinding 
                    title="Cloud Growth"
                    description="Cloud infrastructure spending accelerating, up 28% year-over-year."
                    trend="up"
                    value="+28%"
                  />
                  <KeyFinding 
                    title="Valuation Premium"
                    description="Tech sector trading at 15% premium to market, justified by earnings growth."
                    trend="neutral"
                    value="+15%"
                  />
                </>
              )}
              {insight.id === 'macro-outlook' && (
                <>
                  <KeyFinding 
                    title="Rate Cut Probability"
                    description="Market pricing 75% chance of Fed rate cut in Q2 2026, up from 45% last month."
                    trend="up"
                    value="75%"
                  />
                  <KeyFinding 
                    title="Yield Compression"
                    description="10-year Treasury yield expected to fall 30-50bps following first cut."
                    trend="up"
                    value="-40bps"
                  />
                  <KeyFinding 
                    title="Equity Valuation"
                    description="Lower rates could support 8-10% P/E multiple expansion across broad market."
                    trend="up"
                    value="+9%"
                  />
                </>
              )}
              {insight.id === 'emerging-markets' && (
                <>
                  <KeyFinding 
                    title="China Stimulus"
                    description="New fiscal measures totaling 2 trillion yuan supporting growth expectations."
                    trend="up"
                    value="¥2T"
                  />
                  <KeyFinding 
                    title="Regional Rally"
                    description="Hang Seng +3.2%, KOSPI +2.8%, showing broad-based emerging market strength."
                    trend="up"
                    value="+3.0%"
                  />
                  <KeyFinding 
                    title="Capital Flows"
                    description="Foreign portfolio investment returning to Asia, $5.2B inflows this week."
                    trend="up"
                    value="$5.2B"
                  />
                </>
              )}
            </div>
          </div>

          {/* Visualizations */}
          <div className="space-y-6">
            {/* Chart 1 */}
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
              <h3 className="text-sm font-bold uppercase text-gray-400 mb-4">
                {insight.id === 'house-alignment' && 'Sentiment History'}
                {insight.id === 'competitor-analysis' && 'Correlation Trend'}
                {insight.id === 'trends' && 'Sector Momentum'}
                {insight.id === 'sector-rotation' && 'Tech Sector Performance'}
                {insight.id === 'macro-outlook' && 'Rate Cut Probability'}
                {insight.id === 'emerging-markets' && 'Regional Performance'}
              </h3>
              <div className="w-full h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  {insight.id === 'competitor-analysis' ? (
                    <RechartsLine data={correlationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '11px' }} />
                      <YAxis stroke="#9CA3AF" style={{ fontSize: '11px' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Line type="monotone" dataKey="correlation" stroke="#EF4444" strokeWidth={2} />
                    </RechartsLine>
                  ) : insight.id === 'trends' ? (
                    <BarChart data={sectorMomentumData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="sector" stroke="#9CA3AF" style={{ fontSize: '10px' }} />
                      <YAxis stroke="#9CA3AF" style={{ fontSize: '11px' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Bar dataKey="momentum" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  ) : (
                    <RechartsLine data={sentimentHistoryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: '11px' }} />
                      <YAxis stroke="#9CA3AF" style={{ fontSize: '11px' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Line type="monotone" dataKey="bullish" stroke="#22C55E" strokeWidth={2} />
                      <Line type="monotone" dataKey="bearish" stroke="#EF4444" strokeWidth={2} />
                    </RechartsLine>
                  )}
                </ResponsiveContainer>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
              <h3 className="text-sm font-bold uppercase text-gray-400 mb-4">Factor Analysis</h3>
              <div className="w-full h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="metric" stroke="#9CA3AF" style={{ fontSize: '11px' }} />
                    <PolarRadiusAxis stroke="#9CA3AF" style={{ fontSize: '10px' }} />
                    <Radar name="Score" dataKey="score" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
          <h2 className="text-blue-500 text-sm font-bold uppercase mb-4">AI Recommendations</h2>
          <div className="grid grid-cols-3 gap-4">
            <RecommendationCard 
              action="Rebalance"
              description="Reduce European equity exposure by 3%, increase Asia EM by 2%"
              priority="high"
            />
            <RecommendationCard 
              action="Monitor"
              description="Track correlation metrics daily, review diversification strategy weekly"
              priority="medium"
            />
            <RecommendationCard 
              action="Hedge"
              description="Consider alternative hedging strategies given reduced bond effectiveness"
              priority="medium"
            />
          </div>
        </div>
      </div>
    );
  }

  // All insights view
  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      {/* Render tabs in top bar (main title row) using portal */}
      {portalElement && createPortal(
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: 'overview', label: 'AI Insights' },
            { id: 'ask-ai', label: 'Ask AI' },
            { id: 'commentary', label: 'Commentary' },
            { id: 'compare', label: 'Compare' },
            { id: 'historical-analysis', label: 'Historical Analysis' },
            { id: 'fund', label: 'Fund' },
            { id: 'canvas', label: 'Canvas' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-sm transition-all duration-200 rounded-lg font-semibold whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#3B82F6] hover:bg-[#60A5FA] text-white shadow-lg shadow-blue-500/20'
                  : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>,
        portalElement
      )}

      {/* Tab Content */}
      {activeTab === 'overview' ? (
        // OVERVIEW Tab Content - Completely Redesigned
        <div className="p-6 bg-[#0B1220]">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-5">
              <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>
                FINSITE-AI WORKSPACE
              </h1>
              <p className="text-[#9CA3AF] text-xs">
                Your intelligent financial analysis hub
              </p>
            </div>

            {/* Quick Links - Top Position */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>QUICK ACCESS</h3>
                <button className="text-[10px] text-[#3B82F6] hover:text-[#60A5FA]">View All</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button 
                  onClick={() => setActiveTab('canvas')}
                  className="bg-[#162033] border border-[#1F2937] hover:border-[#6366F1] rounded-lg p-3 text-left transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-[#6366F1] group-hover:text-[#818CF8]" />
                    <div className="text-xs font-bold text-white">Email</div>
                  </div>
                  <div className="text-[10px] text-[#6B7280]">Communication</div>
                </button>
                <button 
                  onClick={() => setActiveTab('canvas')}
                  className="bg-[#162033] border border-[#1F2937] hover:border-[#EC4899] rounded-lg p-3 text-left transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FileStack className="w-4 h-4 text-[#EC4899] group-hover:text-[#F472B6]" />
                    <div className="text-xs font-bold text-white">Internal Memos</div>
                  </div>
                  <div className="text-[10px] text-[#6B7280]">Documentation</div>
                </button>
                <button 
                  onClick={() => setActiveTab('canvas')}
                  className="bg-[#162033] border border-[#1F2937] hover:border-[#14B8A6] rounded-lg p-3 text-left transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Presentation className="w-4 h-4 text-[#14B8A6] group-hover:text-[#2DD4BF]" />
                    <div className="text-xs font-bold text-white">Talking Points</div>
                  </div>
                  <div className="text-[10px] text-[#6B7280]">Presentations</div>
                </button>
                <button 
                  onClick={() => setActiveTab('canvas')}
                  className="bg-[#162033] border border-[#1F2937] hover:border-[#F59E0B] rounded-lg p-3 text-left transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="w-4 h-4 text-[#F59E0B] group-hover:text-[#FBBF24]" />
                    <div className="text-xs font-bold text-white">Slides</div>
                  </div>
                  <div className="text-[10px] text-[#6B7280]">Decks</div>
                </button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-5">
              {/* Left Column - AI Insights (Risk Insights Panel) */}
              <div>
                <AIInsights />
              </div>

              {/* Right Column - AI Tools */}
              <div>
                <h3 className="text-xs font-bold text-white mb-3" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>AI TOOLS</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  
                  {/* Ask AI */}
                  <div 
                    onClick={() => setActiveTab('ask-ai')}
                    className="bg-[#111827] border border-[#1F2937] rounded-lg p-5 hover:border-[#3B82F6]/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-[#3B82F6]/10 rounded-lg p-2.5 group-hover:bg-[#3B82F6]/20 transition-all">
                        <MessageCircle className="w-6 h-6 text-[#3B82F6]" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Ask AI</h3>
                    </div>
                    <p className="text-sm text-[#9CA3AF] mb-3 leading-relaxed">Ask questions about markets, strategies, or get expert insights directly from our financial models.</p>
                    <ul className="space-y-1.5 mb-4">
                      <li className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full bg-[#3B82F6]"></div>
                        <span>Market analysis & trends</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full bg-[#3B82F6]"></div>
                        <span>Investment strategies</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full bg-[#3B82F6]"></div>
                        <span>Economic indicators</span>
                      </li>
                    </ul>
                    <button className="w-full bg-[#162033] hover:bg-[#1C2A40] text-[#3B82F6] text-xs font-semibold py-2.5 rounded-lg transition-all">
                      CLICK TO START
                    </button>
                  </div>

                  {/* Historical Analysis */}
                  <div 
                    onClick={() => setActiveTab('historical-analysis')}
                    className="bg-[#111827] border border-[#1F2937] rounded-lg p-5 hover:border-[#22C55E]/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-[#22C55E]/10 rounded-lg p-2.5 group-hover:bg-[#22C55E]/20 transition-all">
                        <HistoryIcon className="w-6 h-6 text-[#22C55E]" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Historical Analysis</h3>
                    </div>
                    <p className="text-sm text-[#9CA3AF] mb-3 leading-relaxed">Analyze historical data, trends, and patterns to understand market behavior and performance over time.</p>
                    <ul className="space-y-1.5 mb-4">
                      <li className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full bg-[#22C55E]"></div>
                        <span>Trend identification</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full bg-[#22C55E]"></div>
                        <span>Performance metrics</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full bg-[#22C55E]"></div>
                        <span>Time-series analysis</span>
                      </li>
                    </ul>
                    <button className="w-full bg-[#162033] hover:bg-[#1C2A40] text-[#22C55E] text-xs font-semibold py-2.5 rounded-lg transition-all">
                      CLICK TO START
                    </button>
                  </div>

                  {/* Compare Documents */}
                  <div 
                    onClick={() => setActiveTab('compare')}
                    className="bg-[#111827] border border-[#1F2937] rounded-lg p-5 hover:border-[#A855F7]/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-[#A855F7]/10 rounded-lg p-2.5 group-hover:bg-[#A855F7]/20 transition-all">
                        <GitCompare className="w-6 h-6 text-[#A855F7]" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Compare Documents</h3>
                    </div>
                    <p className="text-sm text-[#9CA3AF] mb-3 leading-relaxed">Side-by-side analysis of multiple documents and reports to identify discrepancies and trends.</p>
                    <ul className="space-y-1.5 mb-4">
                      <li className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full bg-[#A855F7]"></div>
                        <span>Difference highlighting</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full bg-[#A855F7]"></div>
                        <span>Pattern identification</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full bg-[#A855F7]"></div>
                        <span>Comparative metrics</span>
                      </li>
                    </ul>
                    <button className="w-full bg-[#162033] hover:bg-[#1C2A40] text-[#A855F7] text-xs font-semibold py-2.5 rounded-lg transition-all">
                      CLICK TO START
                    </button>
                  </div>

                  {/* Commentary */}
                  <div 
                    onClick={() => setActiveTab('commentary')}
                    className="bg-[#111827] border border-[#1F2937] rounded-lg p-5 hover:border-[#3B82F6]/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-[#3B82F6]/10 rounded-lg p-2.5 group-hover:bg-[#3B82F6]/20 transition-all">
                        <FileText className="w-6 h-6 text-[#3B82F6]" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Commentary</h3>
                    </div>
                    <p className="text-sm text-[#9CA3AF] mb-3 leading-relaxed">Generate expert market commentary and insights based on current events, data, and analysis.</p>
                    <ul className="space-y-1.5 mb-4">
                      <li className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full bg-[#3B82F6]"></div>
                        <span>Market perspectives</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full bg-[#3B82F6]"></div>
                        <span>Event analysis</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full bg-[#3B82F6]"></div>
                        <span>Expert opinions</span>
                      </li>
                    </ul>
                    <button className="w-full bg-[#162033] hover:bg-[#1C2A40] text-[#3B82F6] text-xs font-semibold py-2.5 rounded-lg transition-all">
                      CLICK TO START
                    </button>
                  </div>

                  {/* Fund Analysis */}
                  <div 
                    onClick={() => setActiveTab('fund')}
                    className="bg-[#111827] border border-[#1F2937] rounded-lg p-5 hover:border-[#F97316]/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-[#F97316]/10 rounded-lg p-2.5 group-hover:bg-[#F97316]/20 transition-all">
                        <BarChart3 className="w-6 h-6 text-[#F97316]" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Fund Analysis</h3>
                    </div>
                    <p className="text-sm text-[#9CA3AF] mb-3 leading-relaxed">Deep dive into fund performance, holdings, and risk metrics to make informed investment decisions.</p>
                    <ul className="space-y-1.5 mb-4">
                      <li className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full bg-[#F97316]"></div>
                        <span>Performance tracking</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full bg-[#F97316]"></div>
                        <span>Holdings breakdown</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full bg-[#F97316]"></div>
                        <span>Risk assessment</span>
                      </li>
                    </ul>
                    <button className="w-full bg-[#162033] hover:bg-[#1C2A40] text-[#F97316] text-xs font-semibold py-2.5 rounded-lg transition-all">
                      CLICK TO START
                    </button>
                  </div>

                  {/* Canvas */}
                  <div 
                    onClick={() => setActiveTab('canvas')}
                    className="bg-[#111827] border border-[#1F2937] rounded-lg p-5 hover:border-[#22C55E]/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-[#22C55E]/10 rounded-lg p-2.5 group-hover:bg-[#22C55E]/20 transition-all">
                        <Edit3 className="w-6 h-6 text-[#22C55E]" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Canvas</h3>
                    </div>
                    <p className="text-sm text-[#9CA3AF] mb-3 leading-relaxed">Create and design custom outputs, reports, and visualizations with an intuitive drag-and-drop interface.</p>
                    <ul className="space-y-1.5 mb-4">
                      <li className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full bg-[#22C55E]"></div>
                        <span>Custom reports</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full bg-[#22C55E]"></div>
                        <span>Visual presentations</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full bg-[#22C55E]"></div>
                        <span>Export options</span>
                      </li>
                    </ul>
                    <button className="w-full bg-[#162033] hover:bg-[#1C2A40] text-[#22C55E] text-xs font-semibold py-2.5 rounded-lg transition-all">
                      CLICK TO START
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'ask-ai' ? (
        // ASK AI Tab Content - Ask Me Anything Design
        hasGeneralChatStarted && askAISubTab === 'general-chat' ? (
          <GeneralChatWithCanvas />
        ) : (
        <div className="p-8 bg-[#0B1220] flex items-center justify-center min-h-[calc(100vh-180px)]">
          <div className="max-w-3xl w-full">
                {/* Hero Section */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center mb-5">
                    <div className="bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] rounded-2xl w-16 h-16 flex items-center justify-center">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-2 uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    Ask Me Anything
                  </h1>
                  <p className="text-[#94A3B8] text-xs max-w-2xl mx-auto">
                    Get instant answers to your financial questions, analyze documents, or build comprehensive investment theses with AI-powered insights.
                  </p>
                </div>

                {/* Quick Topic Pills */}
                {/* Tab Buttons */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <button 
                    onClick={() => {
                      setAskAISubTab('general-chat');
                      setHasGeneralChatStarted(false);
                    }}
                    className={`px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2.5 transition-all ${
                      askAISubTab === 'general-chat' 
                        ? 'bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30' 
                        : 'bg-[#1e293b] text-[#9CA3AF] hover:text-white hover:bg-[#273548]'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Expert Chat
                  </button>
                  <button 
                    onClick={() => setAskAISubTab('summarise')}
                    className={`px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2.5 transition-all ${
                      askAISubTab === 'summarise' 
                        ? 'bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30' 
                        : 'bg-[#1e293b] text-[#9CA3AF] hover:text-white hover:bg-[#273548]'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    Summarise
                  </button>
                  <button 
                    onClick={() => setAskAISubTab('qas')}
                    className={`px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2.5 transition-all ${
                      askAISubTab === 'qas' 
                        ? 'bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30' 
                        : 'bg-[#1e293b] text-[#9CA3AF] hover:text-white hover:bg-[#273548]'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                    Q&As
                  </button>
                </div>

                {/* Conditional Content based on Sub-tab */}
                {askAISubTab === 'general-chat' ? (
              <>
                {/* Main Input Card */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-6 mb-6">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything about markets, investments, or financial analysis..."
                    className="w-full bg-transparent border-none text-white placeholder-[#6B7280] focus:outline-none resize-none h-24 text-sm"
                  />
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[#1F2937] mt-4">
                    <div className="flex items-center gap-3">
                      <button className="text-[#6B7280] hover:text-white transition-all">
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <button className="text-[#6B7280] hover:text-white transition-all">
                        <Mic className="w-4 h-4" />
                      </button>
                      <button className="text-[#6B7280] hover:text-white transition-all">
                        <Image className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => {
                        if (inputValue.trim()) {
                          navigate('/ask-ai-chat-output');
                        }
                      }}
                      className="px-5 py-2 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all"
                    >
                      Send
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-center justify-center gap-2 text-xs text-[#6B7280] mb-8">
                  <Info className="w-3.5 h-3.5" />
                  <span>Your conversations are encrypted and secure. All responses may contain errors.</span>
                </div>

                {/* Recent Queries Section */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>RECENT QUERIES</h3>
                    <button className="text-xs text-[#3B82F6] hover:text-[#60A5FA]">View All</button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 hover:border-[#3B82F6]/50 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#3B82F6]/10 rounded-lg p-2">
                          <HistoryIcon className="w-4 h-4 text-[#3B82F6]" />
                        </div>
                      </div>
                      <h4 className="text-sm text-white mb-2">What are the key drivers behind recent market volatility?</h4>
                      <div className="text-xs text-[#6B7280]">2 hours ago</div>
                    </div>

                    <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 hover:border-[#A855F7]/50 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#A855F7]/10 rounded-lg p-2">
                          <HistoryIcon className="w-4 h-4 text-[#A855F7]" />
                        </div>
                      </div>
                      <h4 className="text-sm text-white mb-2">Compare Tesla and Rivian Q3 earnings performance</h4>
                      <div className="text-xs text-[#6B7280]">5 hours ago</div>
                    </div>

                    <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 hover:border-[#22C55E]/50 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#22C55E]/10 rounded-lg p-2">
                          <HistoryIcon className="w-4 h-4 text-[#22C55E]" />
                        </div>
                      </div>
                      <h4 className="text-sm text-white mb-2">Summarize BlackRock's 2024 annual report</h4>
                      <div className="text-xs text-[#6B7280]">Yesterday</div>
                    </div>

                    <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 hover:border-[#F97316]/50 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#F97316]/10 rounded-lg p-2">
                          <HistoryIcon className="w-4 h-4 text-[#F97316]" />
                        </div>
                      </div>
                      <h4 className="text-sm text-white mb-2">Build thesis for renewable energy investments</h4>
                      <div className="text-xs text-[#6B7280]">2 days ago</div>
                    </div>
                  </div>
                </div>
              </>
            ) : askAISubTab === 'summarise' ? (
              <>
                {/* Main Input Card for Summarise */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-6 mb-6">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Paste text or describe documents to summarize..."
                    className="w-full bg-transparent border-none text-white placeholder-[#6B7280] focus:outline-none resize-none h-24 text-sm"
                  />
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[#1F2937] mt-4">
                    <div className="flex items-center gap-3">
                      <button className="text-[#6B7280] hover:text-white transition-all">
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <button className="text-[#6B7280] hover:text-white transition-all">
                        <Mic className="w-4 h-4" />
                      </button>
                      <button className="text-[#6B7280] hover:text-white transition-all">
                        <Image className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button className="px-5 py-2 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
                      Send
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-center justify-center gap-2 text-xs text-[#6B7280] mb-8">
                  <Info className="w-3.5 h-3.5" />
                  <span>Your conversations are encrypted and secure. All responses may contain errors.</span>
                </div>

                {/* Summarise Options */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-5 mb-6">
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    {/* Tonality Dropdown */}
                    <div>
                      <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider">Tonality</label>
                      <select className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3B82F6]">
                        <option>Professional</option>
                        <option>Casual</option>
                        <option>Technical</option>
                        <option>Executive</option>
                      </select>
                    </div>

                    {/* Length Dropdown */}
                    <div>
                      <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider">Length</label>
                      <select className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3B82F6]">
                        <option>Brief</option>
                        <option>Standard</option>
                        <option>Detail</option>
                      </select>
                    </div>

                    {/* Exec Summary Checkbox */}
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="exec-summary"
                        defaultChecked
                        className="w-4 h-4 bg-[#0B1220] border border-[#1F2937] rounded text-[#3B82F6] focus:ring-0 focus:ring-offset-0"
                      />
                      <label htmlFor="exec-summary" className="ml-2 text-sm text-white">Exec Summary</label>
                    </div>

                    {/* Key Metrics Checkbox */}
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="key-metrics"
                        defaultChecked
                        className="w-4 h-4 bg-[#0B1220] border border-[#1F2937] rounded text-[#3B82F6] focus:ring-0 focus:ring-offset-0"
                      />
                      <label htmlFor="key-metrics" className="ml-2 text-sm text-white">Key Metrics</label>
                    </div>
                  </div>
                </div>

                {/* Recent Summaries Section */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>RECENT SUMMARIES</h3>
                    <button className="text-xs text-[#3B82F6] hover:text-[#60A5FA]">View All</button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 hover:border-[#3B82F6]/50 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#3B82F6]/10 rounded-lg p-2.5">
                          <FileText className="w-4 h-4 text-[#3B82F6]" />
                        </div>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1.5">BlackRock Annual Report Analysis</h4>
                      <p className="text-xs text-[#6B7280] mb-3">Detailed breakdown of ESG commitments and financial outlook.</p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded text-xs text-[#3B82F6]">Financial</span>
                        <span className="px-2 py-1 bg-[#162033] border border-[#1F2937] rounded text-xs text-[#6B7280]">2 Docs</span>
                      </div>
                    </div>

                    <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 hover:border-[#22C55E]/50 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#22C55E]/10 rounded-lg p-2.5">
                          <FileText className="w-4 h-4 text-[#22C55E]" />
                        </div>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1.5">Tesla vs Rivian Q3 Earnings</h4>
                      <p className="text-xs text-[#6B7280] mb-3">Comparative summary of production numbers and margins.</p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded text-xs text-[#22C55E]">3 hours ago</span>
                        <span className="px-2 py-1 bg-[#162033] border border-[#1F2937] rounded text-xs text-[#6B7280]">Comparison</span>
                      </div>
                    </div>

                    <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 hover:border-[#8B5CF6]/50 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#8B5CF6]/10 rounded-lg p-2.5">
                          <FileText className="w-4 h-4 text-[#8B5CF6]" />
                        </div>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1.5">Renewable Energy Thesis</h4>
                      <p className="text-xs text-[#6B7280] mb-3">Investment thesis draft for energy sector expansion.</p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded text-xs text-[#8B5CF6]">7 days ago</span>
                        <span className="px-2 py-1 bg-[#162033] border border-[#1F2937] rounded text-xs text-[#6B7280]">Thesis</span>
                      </div>
                    </div>

                    <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 hover:border-[#F59E0B]/50 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#F59E0B]/10 rounded-lg p-2.5">
                          <FileText className="w-4 h-4 text-[#F59E0B]" />
                        </div>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1.5">Fed Minutes Key Takeaways</h4>
                      <p className="text-xs text-[#6B7280] mb-3">Bullet point summary of the latest FOMC meeting minutes.</p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded text-xs text-[#F59E0B]">Last week</span>
                        <span className="px-2 py-1 bg-[#162033] border border-[#1F2937] rounded text-xs text-[#6B7280]">Exec Summary</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {showQAResponse ? (
                  // Q&A RESPONSE VIEW
                  <div className="min-h-screen bg-[#0B1220]">
                    {/* Header with Back Button */}
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-800">
                      <button 
                        onClick={() => {
                          setShowQAResponse(false);
                          setInputValue('');
                        }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <h1 className="text-xl font-bold text-white uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        Q & A RESPONSE
                      </h1>
                    </div>

                    {/* User Question Card */}
                    <div className="bg-[#111827] border border-gray-700 rounded-xl p-6 mb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[#3B82F6] rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-sm font-bold text-white">YOUR QUESTION</span>
                            <span className="text-xs text-gray-500">2 minutes ago</span>
                          </div>
                          <p className="text-white text-base mb-4">{qaQuestion}</p>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-[#162033] border border-[#1F2937] rounded-lg text-xs text-[#3B82F6] font-semibold">
                              Reassure Client
                            </span>
                            <span className="px-3 py-1 bg-[#162033] border border-[#1F2937] rounded-lg text-xs text-gray-400">
                              Professional Tone
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-[1fr_380px] gap-6">
                      {/* Left Column - AI Response */}
                      <div className="space-y-6">
                        {/* AI Response Card */}
                        <div className="bg-[#111827] border border-gray-700 rounded-xl p-6">
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] rounded-full flex items-center justify-center">
                                <Brain className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-sm font-bold text-white">AI RESPONSE</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-[#1F2937] rounded-lg transition-colors">
                                <FileText className="w-4 h-4 text-gray-400" />
                              </button>
                              <button className="p-2 hover:bg-[#1F2937] rounded-lg transition-colors">
                                <MessageCircle className="w-4 h-4 text-gray-400" />
                              </button>
                              <button className="p-2 hover:bg-[#1F2937] rounded-lg transition-colors">
                                <RefreshCw className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>
                          </div>

                          {/* Response Content */}
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-2xl font-bold text-white mb-4">Communicating During Market Volatility</h2>
                              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                When addressing client concerns about market volatility, it's essential to provide context, reassurance, and a clear action plan. Here's a structured approach:
                              </p>
                            </div>

                            {/* Section 1 */}
                            <div className="space-y-3">
                              <h3 className="text-[#3B82F6] text-sm font-bold flex items-center gap-2">
                                <span className="text-white bg-[#3B82F6] rounded px-2 py-0.5">1</span>
                                Acknowledge Their Concerns
                              </h3>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                Begin by validating their feelings. Market volatility is unsettling, and acknowledging this shows empathy and understanding.
                              </p>
                              <div className="bg-[#0B1220] border-l-2 border-[#3B82F6] p-4 rounded-r">
                                <p className="text-gray-400 text-sm italic">
                                  "I understand that recent market movements may be concerning. These fluctuations are a natural part of investing, and it's completely normal to feel uncertain during these periods."
                                </p>
                              </div>
                            </div>

                            {/* Section 2 */}
                            <div className="space-y-3">
                              <h3 className="text-[#3B82F6] text-sm font-bold flex items-center gap-2">
                                <span className="text-white bg-[#3B82F6] rounded px-2 py-0.5">2</span>
                                Provide Historical Context
                              </h3>
                              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                                Remind them that markets have weathered similar periods before and historically recovered. Use data to support your message.
                              </p>
                              <ul className="space-y-2 ml-4">
                                <li className="text-gray-300 text-sm flex items-start gap-2">
                                  <Check className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
                                  <span>The S&P 500 has experienced over 50 corrections of 10% or more since 1950, yet has delivered an average annual return of approximately 10%</span>
                                </li>
                                <li className="text-gray-300 text-sm flex items-start gap-2">
                                  <Check className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
                                  <span>Long-term investors who stayed invested through volatility have historically been rewarded</span>
                                </li>
                              </ul>
                            </div>

                            {/* Section 3 */}
                            <div className="space-y-3">
                              <h3 className="text-[#3B82F6] text-sm font-bold flex items-center gap-2">
                                <span className="text-white bg-[#3B82F6] rounded px-2 py-0.5">3</span>
                                Review Portfolio Strategy
                              </h3>
                              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                                Reaffirm that their portfolio was built with diversification and their long-term goals in mind. Explain how different asset classes are performing and why the strategy remains sound.
                              </p>
                              <div className="bg-[#0B1220] rounded-lg p-4 space-y-2">
                                <h4 className="text-white text-sm font-semibold mb-3">Key Points to Address:</h4>
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#3B82F6] rounded-full"></div>
                                    <span className="text-gray-300 text-xs">Review current asset allocation vs. target allocation</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#3B82F6] rounded-full"></div>
                                    <span className="text-gray-300 text-xs">Explain how diversification is working to mitigate risk</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#3B82F6] rounded-full"></div>
                                    <span className="text-gray-300 text-xs">Highlight defensive positions that are holding up well</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#3B82F6] rounded-full"></div>
                                    <span className="text-gray-300 text-xs">Discuss any tactical adjustments that may be appropriate</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Section 4 */}
                            <div className="space-y-3">
                              <h3 className="text-[#3B82F6] text-sm font-bold flex items-center gap-2">
                                <span className="text-white bg-[#3B82F6] rounded px-2 py-0.5">4</span>
                                Emphasize the Long-Term Perspective
                              </h3>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                Redirect focus to their long-term financial goals. Short-term volatility should not derail a well-planned investment strategy designed for years or decades.
                              </p>
                              <div className="grid grid-cols-2 gap-4 mt-3">
                                <div className="bg-gradient-to-br from-[#3B82F6]/10 to-transparent border border-[#3B82F6]/30 rounded-lg p-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Target className="w-4 h-4 text-[#3B82F6]" />
                                    <span className="text-xs font-bold text-[#3B82F6]">Goal Alignment</span>
                                  </div>
                                  <p className="text-xs text-gray-400">
                                    Remind clients that their portfolio was designed to meet specific goals with appropriate time horizons. A retirement portfolio for someone 20 years away should weather this storm.
                                  </p>
                                </div>
                                <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-lg p-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                                    <span className="text-xs font-bold text-cyan-400">Time Horizon</span>
                                  </div>
                                  <p className="text-xs text-gray-400">
                                    Reinforce that market success is measured in years, not days or weeks. Historical data shows that longer holding periods dramatically increase the probability of positive returns.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Section 5 */}
                            <div className="space-y-3">
                              <h3 className="text-[#3B82F6] text-sm font-bold flex items-center gap-2">
                                <span className="text-white bg-[#3B82F6] rounded px-2 py-0.5">5</span>
                                Offer Actionable Next Steps
                              </h3>
                              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                                Provide concrete actions that give clients a sense of control without making reactive decisions.
                              </p>
                              <div className="space-y-3">
                                <div className="flex items-start gap-3 bg-[#0B1220] p-4 rounded-lg">
                                  <div className="w-8 h-8 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-4 h-4 text-[#3B82F6]" />
                                  </div>
                                  <div>
                                    <h4 className="text-white text-sm font-semibold mb-1">Schedule Regular Check-ins</h4>
                                    <p className="text-gray-400 text-xs">
                                      Establish a cadence for portfolio reviews (monthly or quarterly) to keep clients informed and reassured without obsessing over daily movements.
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3 bg-[#0B1220] p-4 rounded-lg">
                                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Activity className="w-4 h-4 text-purple-400" />
                                  </div>
                                  <div>
                                    <h4 className="text-white text-sm font-semibold mb-1">Consider Rebalancing Opportunities</h4>
                                    <p className="text-gray-400 text-xs">
                                      If appropriate, discuss how market declines can present opportunities to buy quality assets at discounted prices or rebalance back to target allocations.
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3 bg-[#0B1220] p-4 rounded-lg">
                                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-4 h-4 text-cyan-400" />
                                  </div>
                                  <div>
                                    <h4 className="text-white text-sm font-semibold mb-1">Review Financial Plan</h4>
                                    <p className="text-gray-400 text-xs">
                                      Revisit the comprehensive financial plan to demonstrate that short-term volatility doesn't change the fundamentals of their long-term strategy.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Section 6 */}
                            <div className="space-y-3">
                              <h3 className="text-[#3B82F6] text-sm font-bold flex items-center gap-2">
                                <span className="text-white bg-[#3B82F6] rounded px-2 py-0.5">6</span>
                                Maintain Open Communication
                              </h3>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                Encourage clients to reach out with questions and concerns rather than making decisions in isolation.
                              </p>
                              <div className="bg-[#0B1220] border-l-2 border-[#3B82F6] p-4 rounded-r">
                                <p className="text-gray-400 text-sm italic">
                                  "I'm always available to discuss your concerns. Please don't hesitate to reach out if you have questions or want to review your portfolio. Making informed decisions together is always better than acting on emotion alone."
                                </p>
                              </div>
                            </div>

                            {/* Key Takeaway */}
                            <div className="bg-gradient-to-br from-[#3B82F6]/10 to-transparent border-l-4 border-[#3B82F6] rounded-lg p-5 mt-6">
                              <div className="flex items-start gap-3">
                                <Lightbulb className="w-5 h-5 text-[#3B82F6] mt-1 flex-shrink-0" />
                                <div>
                                  <h4 className="text-white text-sm font-bold mb-2">Key Takeaway</h4>
                                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                                    Proactive, transparent communication during volatile periods builds trust and confidence. Schedule regular check-ins to keep clients informed and reassured.
                                  </p>
                                  <div className="bg-[#0B1220] rounded-lg p-3 space-y-2">
                                    <h5 className="text-white text-xs font-semibold mb-2">Communication Checklist:</h5>
                                    <div className="space-y-1.5">
                                      <div className="flex items-center gap-2">
                                        <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                                        <span className="text-xs text-gray-300">Be proactive - reach out before clients panic</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                                        <span className="text-xs text-gray-300">Use data and historical context to support your message</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                                        <span className="text-xs text-gray-300">Personalize communication based on individual risk tolerance</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                                        <span className="text-xs text-gray-300">Avoid making predictions or guarantees about market direction</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                                        <span className="text-xs text-gray-300">Document all conversations for compliance and reference</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Related Topics */}
                        <div className="bg-[#111827] border border-gray-700 rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">RELATED TOPICS</h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button className="px-4 py-2 bg-[#0B1220] border border-gray-700 hover:border-[#3B82F6] rounded-lg text-sm text-gray-300 hover:text-white transition-all flex items-center gap-2">
                              <TrendingUp className="w-3.5 h-3.5" />
                              Market Correction Strategies
                            </button>
                            <button className="px-4 py-2 bg-[#0B1220] border border-gray-700 hover:border-[#3B82F6] rounded-lg text-sm text-gray-300 hover:text-white transition-all flex items-center gap-2">
                              <DollarSign className="w-3.5 h-3.5" />
                              Portfolio Rebalancing
                            </button>
                            <button className="px-4 py-2 bg-[#0B1220] border border-gray-700 hover:border-[#3B82F6] rounded-lg text-sm text-gray-300 hover:text-white transition-all flex items-center gap-2">
                              <MessageCircle className="w-3.5 h-3.5" />
                              Client Communication Best Practices
                            </button>
                            <button className="px-4 py-2 bg-[#0B1220] border border-gray-700 hover:border-[#3B82F6] rounded-lg text-sm text-gray-300 hover:text-white transition-all flex items-center gap-2">
                              <HistoryIcon className="w-3.5 h-3.5" />
                              Historical Market Performance
                            </button>
                            <button className="px-4 py-2 bg-[#0B1220] border border-gray-700 hover:border-[#3B82F6] rounded-lg text-sm text-gray-300 hover:text-white transition-all flex items-center gap-2">
                              <Brain className="w-3.5 h-3.5" />
                              Behavioral Finance Insights
                            </button>
                          </div>
                        </div>

                        {/* Wider Context */}
                        <div className="bg-[#111827] border border-gray-700 rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-4">
                            <Globe className="w-4 h-4 text-cyan-400" />
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">WIDER CONTEXT</h3>
                          </div>
                          <div className="space-y-4">
                            <div className="bg-[#0B1220] rounded-lg p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <BarChart3 className="w-5 h-5 text-[#3B82F6]" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-white text-sm font-semibold mb-2">Current Market Environment</h4>
                                  <p className="text-gray-400 text-xs leading-relaxed mb-3">
                                    Recent market volatility has been driven by several factors including Federal Reserve interest rate decisions, inflation concerns, geopolitical tensions, and sector-specific challenges in technology and financial services. Understanding these drivers helps contextualize portfolio movements for clients.
                                  </p>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <div className="text-xs text-gray-500 mb-1">VIX Index</div>
                                      <div className="text-lg font-bold text-white">18.4</div>
                                      <div className="text-xs text-[#22C55E]">+2.3%</div>
                                    </div>
                                    <div>
                                      <div className="text-xs text-gray-500 mb-1">Market Sentiment</div>
                                      <div className="text-lg font-bold text-white">Cautious</div>
                                      <div className="text-xs text-gray-400">Mixed signals</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-[#0B1220] rounded-lg p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <AlertTriangle className="w-5 h-5 text-purple-400" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-white text-sm font-semibold mb-2">Regulatory Landscape</h4>
                                  <p className="text-gray-400 text-xs leading-relaxed">
                                    Recent regulatory changes and proposed policies around financial services, ESG disclosure requirements, and cryptocurrency oversight have created additional uncertainty. Being informed about these developments helps advisors anticipate client questions and position portfolios appropriately.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="bg-[#0B1220] rounded-lg p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-white text-sm font-semibold mb-2">Industry Trends</h4>
                                  <p className="text-gray-400 text-xs leading-relaxed mb-3">
                                    The wealth management industry is seeing increased adoption of technology-driven solutions, growing demand for ESG investments, and a shift toward fee-based advisory models. Understanding these trends helps position your practice competitively.
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 bg-[#162033] border border-gray-700 rounded text-xs text-gray-400">Digital Transformation</span>
                                    <span className="px-2 py-1 bg-[#162033] border border-gray-700 rounded text-xs text-gray-400">ESG Integration</span>
                                    <span className="px-2 py-1 bg-[#162033] border border-gray-700 rounded text-xs text-gray-400">Fee Compression</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Action Buttons */}
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => {
                              setShowQAResponse(false);
                              setInputValue('');
                            }}
                            className="px-5 py-3 bg-[#111827] border border-gray-700 hover:border-[#3B82F6] text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Ask Another Question
                          </button>
                          <button className="px-5 py-3 bg-[#111827] border border-gray-700 hover:border-[#3B82F6] text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
                            <FileStack className="w-4 h-4" />
                            Save to Library
                          </button>
                          <button className="px-5 py-3 bg-[#111827] border border-gray-700 hover:border-[#3B82F6] text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Share
                          </button>
                          <button className="px-5 py-3 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
                            <Wand2 className="w-4 h-4" />
                            Refine Answer
                          </button>
                        </div>
                      </div>

                      {/* Right Sidebar - Guidance Notes */}
                      <div className="bg-[#111827] border border-gray-700 rounded-xl p-5 h-fit sticky top-6">
                        <div className="flex items-center gap-2 mb-5">
                          <Lightbulb className="w-5 h-5 text-[#F59E0B]" />
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider">GUIDANCE NOTES</h3>
                        </div>

                        <div className="space-y-5">
                          {/* Tone & Delivery */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-2 h-2 bg-[#3B82F6] rounded-full"></div>
                              <h4 className="text-sm font-bold text-white">Tone & Delivery</h4>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">
                              Maintain a calm, confident tone. Avoid technical jargon that might confuse clients. Use analogies they can relate to when explaining complex market dynamics.
                            </p>
                          </div>

                          {/* Timing */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                              <h4 className="text-sm font-bold text-white">Timing</h4>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">
                              Don't wait for clients to reach out. Proactive communication during volatile periods demonstrates care and professionalism. Schedule calls within 24-48 hours of significant market moves.
                            </p>
                          </div>

                          {/* Personalization */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                              <h4 className="text-sm font-bold text-white">Personalization</h4>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">
                              Tailor your message to each client's risk tolerance, time horizon, and financial goals. A retiree needs different reassurance than a young professional.
                            </p>
                          </div>

                          {/* Documentation */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
                              <h4 className="text-sm font-bold text-white">Documentation</h4>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">
                              Document all client communications regarding market volatility. This protects both you and the client, and helps track their concerns and your responses over time.
                            </p>
                          </div>

                          {/* What to Avoid */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                              <h4 className="text-sm font-bold text-white">What to Avoid</h4>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <span className="text-[#EF4444] mt-0.5">×</span>
                                <span className="text-xs text-gray-400">Making market predictions or guarantees</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-[#EF4444] mt-0.5">×</span>
                                <span className="text-xs text-gray-400">Dismissing client concerns as irrational</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-[#EF4444] mt-0.5">×</span>
                                <span className="text-xs text-gray-400">Recommending drastic portfolio changes</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-[#EF4444] mt-0.5">×</span>
                                <span className="text-xs text-gray-400">Using fear-based language</span>
                              </div>
                            </div>
                          </div>

                          {/* Next Steps */}
                          <div>
                            <h4 className="text-sm font-bold text-white mb-3">Next Steps</h4>
                            <div className="space-y-2">
                              <label className="flex items-start gap-2 cursor-pointer group">
                                <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-gray-600 text-[#3B82F6] focus:ring-0" />
                                <span className="text-xs text-gray-300 group-hover:text-white transition-colors">Schedule follow-up meeting</span>
                              </label>
                              <label className="flex items-start gap-2 cursor-pointer group">
                                <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-gray-600 text-[#3B82F6] focus:ring-0" />
                                <span className="text-xs text-gray-300 group-hover:text-white transition-colors">Send portfolio review report</span>
                              </label>
                              <label className="flex items-start gap-2 cursor-pointer group">
                                <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-gray-600 text-[#3B82F6] focus:ring-0" />
                                <span className="text-xs text-gray-300 group-hover:text-white transition-colors">Document conversation in CRM</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 pt-5 border-t border-gray-700 space-y-3">
                          <button className="w-full px-4 py-3 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Client
                          </button>
                          <button className="w-full px-4 py-3 bg-[#0B1220] border border-gray-700 hover:border-gray-600 text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2">
                            <Upload className="w-4 h-4" />
                            Export
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Main Input Card for Q&As */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-6 mb-6">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask your question here..."
                    className="w-full bg-transparent border-none text-white placeholder-[#6B7280] focus:outline-none resize-none h-24 text-sm"
                  />
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[#1F2937] mt-4">
                    <div className="flex items-center gap-3">
                      <button className="text-[#6B7280] hover:text-white transition-all">
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <button className="text-[#6B7280] hover:text-white transition-all">
                        <Mic className="w-4 h-4" />
                      </button>
                      <button className="text-[#6B7280] hover:text-white transition-all">
                        <Image className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => {
                        if (inputValue.trim()) {
                          setQAQuestion(inputValue);
                          setShowQAResponse(true);
                        }
                      }}
                      className="px-5 py-2 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all"
                    >
                      Send
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-center justify-center gap-2 text-xs text-[#6B7280] mb-8">
                  <Info className="w-3.5 h-3.5" />
                  <span>Your conversations are encrypted and secure. All responses may contain errors.</span>
                </div>

                    {/* Q&As Configuration Options */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-5 mb-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Objective Dropdown */}
                    <div>
                      <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider">Objective</label>
                      <select className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3B82F6]">
                        <option>Reassurance client</option>
                        <option>Relative positioning</option>
                        <option>Up selling</option>
                        <option>New client</option>
                      </select>
                    </div>

                    {/* Tonality Dropdown */}
                    <div>
                      <label className="block text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider">Tonality</label>
                      <select className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3B82F6]">
                        <option>Professional</option>
                        <option>Casual</option>
                        <option>Technical</option>
                        <option>Executive</option>
                      </select>
                    </div>
                  </div>

                  {/* Checkboxes Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="show-related-topics"
                        className="w-4 h-4 bg-[#0B1220] border border-[#1F2937] rounded text-[#3B82F6] focus:ring-0 focus:ring-offset-0"
                      />
                      <label htmlFor="show-related-topics" className="ml-2 text-sm text-white">Show Related Topics</label>
                    </div>

                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="show-wider-context"
                        className="w-4 h-4 bg-[#0B1220] border border-[#1F2937] rounded text-[#3B82F6] focus:ring-0 focus:ring-offset-0"
                      />
                      <label htmlFor="show-wider-context" className="ml-2 text-sm text-white">Show Wider Context</label>
                    </div>

                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="show-guidance-advice"
                        className="w-4 h-4 bg-[#0B1220] border border-[#1F2937] rounded text-[#3B82F6] focus:ring-0 focus:ring-offset-0"
                      />
                      <label htmlFor="show-guidance-advice" className="ml-2 text-sm text-white">Show Guidance Advice</label>
                    </div>
                  </div>
                </div>

                {/* Recent Q & A Sessions Section */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>RECENT Q & A SESSIONS</h3>
                    <button className="text-xs text-[#3B82F6] hover:text-[#60A5FA]">View All</button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 hover:border-[#3B82F6]/50 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#475569] rounded-lg p-2.5">
                          <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1.5">Client Portfolio Rebalancing Strategy</h4>
                      <p className="text-xs text-[#6B7280] mb-3">Reassurance-focused response on market volatility impact.</p>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-[#162033] border border-[#1F2937] rounded text-xs text-[#9CA3AF]">Yesterday</span>
                        <span className="px-2.5 py-1 bg-[#162033] border border-[#1F2937] rounded text-xs text-[#9CA3AF]">Reassure Client</span>
                      </div>
                    </div>

                    <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 hover:border-[#3B82F6]/50 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#475569] rounded-lg p-2.5">
                          <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1.5">ESG Fund Positioning vs Peers</h4>
                      <p className="text-xs text-[#6B7280] mb-3">Competitive analysis with related market trends.</p>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-[#162033] border border-[#1F2937] rounded text-xs text-[#9CA3AF]">3 hours ago</span>
                        <span className="px-2.5 py-1 bg-[#162033] border border-[#1F2937] rounded text-xs text-[#9CA3AF]">Positioning</span>
                      </div>
                    </div>

                    <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 hover:border-[#3B82F6]/50 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#475569] rounded-lg p-2.5">
                          <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1.5">Alternative Investment Opportunities</h4>
                      <p className="text-xs text-[#6B7280] mb-3">Up-selling pitch with guidance and wider context.</p>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-[#162033] border border-[#1F2937] rounded text-xs text-[#9CA3AF]">2 days ago</span>
                        <span className="px-2.5 py-1 bg-[#162033] border border-[#1F2937] rounded text-xs text-[#9CA3AF]">Up Selling</span>
                      </div>
                    </div>

                    <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 hover:border-[#3B82F6]/50 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#475569] rounded-lg p-2.5">
                          <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1.5">Onboarding New Client Portfolio</h4>
                      <p className="text-xs text-[#6B7280] mb-3">Initial consultation with comprehensive guidance.</p>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-[#162033] border border-[#1F2937] rounded text-xs text-[#9CA3AF]">Last week</span>
                        <span className="px-2.5 py-1 bg-[#162033] border border-[#1F2937] rounded text-xs text-[#9CA3AF]">New Client</span>
                      </div>
                    </div>
                  </div>
                </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        )
      ) : activeTab === 'compare' ? (
        <CompareTabContent inputValue={inputValue} setInputValue={setInputValue} />
      ) : activeTab === 'fund' ? (
        // FUND Tab Content
        <FundTabContent assetClass={searchParams.get('assetClass')} />
      ) : activeTab === 'commentary' ? (
        // COMMENTARY Tab Content (House View Generator)
        <div className="p-8 bg-[#0B1220] min-h-screen">
          <div className="flex gap-6 h-[calc(100vh-120px)]">
            {/* Left Sidebar */}
            <div className="w-[280px] bg-[#111827] border border-gray-700 rounded-xl p-5 flex-shrink-0 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#1F2937] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border [&::-webkit-scrollbar-thumb]:border-transparent hover:[&::-webkit-scrollbar-thumb]:bg-[#374151]">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-lg mx-auto mb-3">
                  <Building2 className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <h2 className="text-sm font-bold text-white text-center uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  House View Generator
                </h2>
                <p className="text-xs text-gray-400 text-center mt-1.5">
                  Generate insights based on your firm's investment perspective
                </p>
              </div>

              {/* Analysis Mode */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Analysis Mode</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-[#3B82F6] text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Structured Topics</span>
                  </button>
                  <button className="bg-[#1F2937] hover:bg-[#374151] text-gray-300 px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Custom Prompt</span>
                  </button>
                </div>
              </div>

              {/* Document Access Note */}
              <div className="mb-6 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <span className="text-[#F59E0B] text-xs">⚠</span>
                  <p className="text-[10px] text-[#F59E0B] leading-relaxed">
                    <span className="font-bold">Document Access:</span> Structured topics analyze all company documents. Custom Prompt limited to 5 selected documents.
                  </p>
                </div>
              </div>

              {/* Select Fund */}
              <div className="mb-4">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  <FileText className="w-3.5 h-3.5" />
                  Select Fund
                </label>
                <select 
                  value={selectedFund}
                  onChange={(e) => setSelectedFund(e.target.value)}
                  className="w-full bg-[#0B1220] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3B82F6]"
                >
                  <option>All Funds</option>
                  <option>Global Growth Fund</option>
                  <option>Income Strategy Fund</option>
                  <option>Balanced Portfolio Fund</option>
                </select>
              </div>

              {/* Select Asset Class */}
              <div className="mb-4">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  <Layers className="w-3.5 h-3.5" />
                  Select Asset Class
                </label>
                <select 
                  value={selectedAssetClassForHV}
                  onChange={(e) => setSelectedAssetClassForHV(e.target.value)}
                  className="w-full bg-[#0B1220] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3B82F6]"
                >
                  <option>All Asset Classes</option>
                  <option>US Equities</option>
                  <option>International Equities</option>
                  <option>Fixed Income</option>
                  <option>Commodities</option>
                  <option>Alternatives</option>
                  <option>Real Estate</option>
                </select>
              </div>

              {/* Select Macro Theme */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Select Macro Theme
                </label>
                <select 
                  value={selectedMacroTheme}
                  onChange={(e) => setSelectedMacroTheme(e.target.value)}
                  className="w-full bg-[#0B1220] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3B82F6]"
                >
                  <option>All Macro Themes</option>
                  <option>Inflation & Interest Rates</option>
                  <option>Economic Growth</option>
                  <option>Geopolitical Risk</option>
                  <option>Technology Disruption</option>
                </select>
              </div>

              {/* Full Document Access */}
              <div className="mb-6 bg-[#0B1120] border border-gray-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#22C55E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-[#22C55E]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Full Document Access</h4>
                    <p className="text-xs text-gray-400 mb-2">This mode analyzes all company documents for comprehensive insights</p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#22C55E] text-xs">●</span>
                      <span className="text-[#22C55E] text-xs font-semibold">247 documents available</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Output Settings */}
              <div className="mb-6">
                <h3 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  <Settings className="w-3.5 h-3.5" />
                  Output Settings
                </h3>
              </div>

              {/* Generate Button */}
              <button 
                onClick={() => setShowHouseViewOutput(true)}
                className="w-full bg-[#3B82F6] hover:bg-[#60A5FA] text-white py-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                Generate House View
              </button>
              <p className="text-[10px] text-gray-500 text-center mt-2">
                <Sparkles className="w-3 h-3 inline mr-1" />
                Estimated: 10-15 seconds
              </p>
            </div>

            {/* Right Content Area */}
            {!showHouseViewOutput ? (
              // INPUT VIEW
              <div className="flex-1 flex flex-col items-center pt-12">
                {/* Icon */}
                <div className="w-16 h-16 bg-[#3B82F6] rounded-2xl flex items-center justify-center mb-5 flex-shrink-0">
                  <Building2 className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-white uppercase tracking-wider mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  GENERATE YOUR HOUSE VIEW
                </h1>
                <p className="text-[#94A3B8] text-xs mb-8 max-w-2xl mx-auto">
                  Select structured topics for comprehensive analysis across all documents, or craft a custom question with selected sources.
                </p>

                {/* Two Options Cards */}
                <div className="grid grid-cols-2 gap-4 mb-8 max-w-3xl">
                {/* Structured Topics Card */}
                <button className="bg-[#162033] border border-gray-700 hover:border-[#3B82F6] rounded-xl p-5 transition-all group">
                  <div className="w-12 h-12 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#3B82F6]/20 transition-all">
                    <FileText className="w-6 h-6 text-[#3B82F6]" />
                  </div>
                  <h3 className="text-white font-bold text-xs mb-1 uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    Structured Topics
                  </h3>
                  <p className="text-gray-400 text-xs mb-3">Pre-defined themes with full document access</p>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <span className="text-[#22C55E]">✓</span>
                    <span className="text-[#22C55E] font-medium">All 247 documents</span>
                  </div>
                </button>

                {/* Custom Prompt Card */}
                <button 
                  onClick={() => setShowCustomPrompt(!showCustomPrompt)}
                  className="bg-[#162033] border border-gray-700 hover:border-[#F59E0B] rounded-xl p-5 transition-all group"
                >
                  <div className="w-12 h-12 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#F59E0B]/20 transition-all">
                    <Sparkles className="w-6 h-6 text-[#F59E0B]" />
                  </div>
                  <h3 className="text-white font-bold text-xs mb-1 uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    Custom Prompt
                  </h3>
                  <p className="text-gray-400 text-xs mb-3">Ask anything with selected documents</p>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <span className="text-[#F59E0B]">⚠</span>
                    <span className="text-[#F59E0B] font-medium">Max 5 documents</span>
                  </div>
                </button>

              </div>

              {/* Custom Prompt Input Section */}
              {showCustomPrompt && (
                <div className="bg-[#162033] border border-gray-700 rounded-xl p-5 mb-8 max-w-3xl w-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#F59E0B] bg-opacity-10 rounded-lg w-7 h-7 flex items-center justify-center">
                      <HelpCircle className="w-4 h-4 text-[#F59E0B]" />
                    </div>
                    <h3 className="font-bold text-white text-sm">What would you like to know from the documents?</h3>
                  </div>

                  <textarea
                    value={customPromptQuery}
                    onChange={(e) => setCustomPromptQuery(e.target.value)}
                    placeholder="e.g., analyze technology sector outlook with AI focus, compare inflation trends across asset classes..."
                    className="w-full bg-[#0B1220] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#F59E0B] min-h-[80px] resize-none mb-4"
                  />

                  {/* Document Selection Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#F59E0B]" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Select Documents</span>
                        <span className="text-xs text-gray-400">({selectedDocuments.length}/5 selected)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setShowDocumentPicker(!showDocumentPicker)}
                          className="px-3 py-1.5 bg-[#0B1220] hover:bg-[#1C2A40] border border-gray-700 text-white rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          {showDocumentPicker ? 'Hide Documents' : 'Browse Documents'}
                        </button>
                        <button 
                          className="px-3 py-1.5 bg-[#3B82F6] hover:bg-[#60A5FA] border border-[#3B82F6] text-white rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          Upload Document
                        </button>
                      </div>
                    </div>

                    {/* Selected Documents Pills */}
                    {selectedDocuments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {selectedDocuments.map(docId => {
                          const doc = availableDocuments.find(d => d.id === docId);
                          return doc ? (
                            <div key={docId} className="flex items-center gap-2 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg px-3 py-1.5">
                              <span className="text-xs text-white font-medium">{doc.name}</span>
                              <button 
                                onClick={() => handleDocumentToggle(docId)}
                                className="text-[#F59E0B] hover:text-[#F59E0B]/80"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : null;
                        })}
                      </div>
                    )}

                    {/* Document Picker */}
                    {showDocumentPicker && (
                      <div className="bg-[#0B1220] border border-gray-700 rounded-lg p-3 max-h-[300px] overflow-y-auto">
                        <div className="space-y-2">
                          {availableDocuments.map(doc => {
                            const isSelected = selectedDocuments.includes(doc.id);
                            const isDisabled = !isSelected && selectedDocuments.length >= 5;
                            return (
                              <button
                                key={doc.id}
                                onClick={() => !isDisabled && handleDocumentToggle(doc.id)}
                                disabled={isDisabled}
                                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                                  isSelected 
                                    ? 'bg-[#F59E0B]/10 border-[#F59E0B] hover:bg-[#F59E0B]/20' 
                                    : isDisabled
                                    ? 'bg-[#0B1220] border-gray-800 opacity-50 cursor-not-allowed'
                                    : 'bg-[#0B1220] border-gray-700 hover:border-gray-600 hover:bg-[#111827]'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded flex items-center justify-center ${
                                    isSelected ? 'bg-[#F59E0B] text-white' : 'bg-[#1F2937] text-gray-400'
                                  }`}>
                                    <FileText className="w-4 h-4" />
                                  </div>
                                  <div className="text-left">
                                    <p className={`text-xs font-semibold ${isSelected ? 'text-[#F59E0B]' : 'text-white'}`}>
                                      {doc.name}
                                    </p>
                                    <p className="text-[10px] text-gray-500">
                                      {doc.type} • {doc.pages} pages • {doc.date}
                                    </p>
                                  </div>
                                </div>
                                {isSelected && (
                                  <div className="w-5 h-5 bg-[#F59E0B] rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {selectedDocuments.length === 0 && (
                      <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg p-3 flex items-start gap-2">
                        <span className="text-[#EF4444] text-xs">⚠</span>
                        <p className="text-[10px] text-[#EF4444]">
                          Please select at least 1 document (max 5) to generate insights.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-medium">Suggestions:</span>
                      <button 
                        onClick={() => setCustomPromptQuery('Analyze technology sector outlook with AI focus')}
                        className="px-3 py-1.5 bg-[#0B1220] hover:bg-[#1C2A40] border border-gray-700 text-white rounded-lg text-xs font-medium transition-all"
                      >
                        Tech & AI
                      </button>
                      <button 
                        onClick={() => setCustomPromptQuery('Compare inflation trends across asset classes')}
                        className="px-3 py-1.5 bg-[#0B1220] hover:bg-[#1C2A40] border border-gray-700 text-white rounded-lg text-xs font-medium transition-all"
                      >
                        Inflation trends
                      </button>
                      <button 
                        onClick={() => setCustomPromptQuery('Identify emerging market growth opportunities')}
                        className="px-3 py-1.5 bg-[#0B1220] hover:bg-[#1C2A40] border border-gray-700 text-white rounded-lg text-xs font-medium transition-all"
                      >
                        Emerging markets
                      </button>
                    </div>

                    <button 
                      disabled={selectedDocuments.length === 0 || !customPromptQuery.trim()}
                      className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                        selectedDocuments.length === 0 || !customPromptQuery.trim()
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white shadow-lg shadow-[#F59E0B]/20'
                      }`}
                    >
                      <ArrowRight className="w-4 h-4" />
                      Generate View
                    </button>
                  </div>
                </div>
              )}

              {/* Popular Topics Section */}
              <div className="bg-[#162033] border border-gray-700 rounded-xl p-5 max-w-3xl w-full">
                <div className="flex items-start gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-[#3B82F6] mt-0.5 flex-shrink-0" />
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    Popular Topics
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B82F6] text-lg leading-none mt-0.5">•</span>
                    <div>
                      <span className="text-white font-semibold text-sm">Technology sector outlook</span>
                      <span className="text-gray-400 text-sm"> - AI-focused growth opportunities and risks</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B82F6] text-lg leading-none mt-0.5">•</span>
                    <div>
                      <span className="text-white font-semibold text-sm">Inflation outlook</span>
                      <span className="text-gray-400 text-sm"> - Impact across global asset classes</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B82F6] text-lg leading-none mt-0.5">•</span>
                    <div>
                      <span className="text-white font-semibold text-sm">Emerging markets</span>
                      <span className="text-gray-400 text-sm"> - Growth opportunities in developing economies</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            // OUTPUT VIEW
            <HouseViewOutput 
              selectedFund={selectedFund}
              selectedAssetClass={selectedAssetClassForHV}
              selectedMacroTheme={selectedMacroTheme}
              onBack={() => setShowHouseViewOutput(false)}
              selectedFootnote={selectedFootnote}
              onFootnoteClick={(footnote) => setSelectedFootnote(selectedFootnote === footnote ? null : footnote)}
            />
          )}
          </div>
        </div>
      ) : activeTab === 'historical-analysis' ? (
        // HISTORICAL SCENARIO COMPOSER Tab Content
        <div className="p-8 bg-[#0B1220] min-h-screen">
          {hasRunHistoricalAnalysis ? (
            <div className="flex-1 -mx-8 -mt-8">
              <HistoricalAnalysisResultsInline onReset={() => setHasRunHistoricalAnalysis(false)} />
            </div>
          ) : (
          <div className="flex gap-6 h-[calc(100vh-120px)]">
            {/* Left Sidebar */}
            <div className="w-[280px] bg-[#111827] border border-gray-700 rounded-xl p-5 flex-shrink-0 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#1F2937] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border [&::-webkit-scrollbar-thumb]:border-transparent hover:[&::-webkit-scrollbar-thumb]:bg-[#374151]">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-lg mx-auto mb-3">
                  <Layers className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <h2 className="text-sm font-bold text-white text-center uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  SCENARIO COMPOSER
                </h2>
                <p className="text-xs text-gray-400 text-center mt-1.5">
                  Structured historical analysis parameters
                </p>
              </div>

              {/* QUICK START Section */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">QUICK START</h3>
                <div className="space-y-2">
                  <button className="w-full bg-[#162033] hover:bg-[#1C2A40] border border-gray-700 hover:border-[#EF4444] text-white rounded-lg p-3 text-left transition-all group">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingDown className="w-4 h-4 text-[#EF4444]" />
                      <span className="text-xs font-bold">TOP 10 CRASHES</span>
                    </div>
                    <p className="text-[10px] opacity-80">Market crash events</p>
                  </button>

                  <button className="w-full bg-[#162033] hover:bg-[#1C2A40] border border-gray-700 hover:border-[#22C55E] text-white rounded-lg p-3 text-left transition-all group">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-[#22C55E]" />
                      <span className="text-xs font-bold">RECOVERIES</span>
                    </div>
                    <p className="text-[10px] opacity-80">Fastest recoveries</p>
                  </button>

                  <button className="w-full bg-[#162033] hover:bg-[#1C2A40] border border-gray-700 hover:border-[#F97316] text-white rounded-lg p-3 text-left transition-all group">
                    <div className="flex items-center gap-2 mb-1">
                      <Flame className="w-4 h-4 text-[#F97316]" />
                      <span className="text-xs font-bold">STAGFLATION</span>
                    </div>
                    <p className="text-[10px] opacity-80">Rare inflationary ERA</p>
                  </button>

                  <button className="w-full bg-[#162033] hover:bg-[#1C2A40] border border-gray-700 hover:border-[#8B5CF6] text-white rounded-lg p-3 text-left transition-all group">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                      <span className="text-xs font-bold">TECH BUBBLES</span>
                    </div>
                    <p className="text-[10px] opacity-80">Speculative spikes</p>
                  </button>
                </div>
              </div>

              {/* MACRO ENVIRONMENT Section */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">MACRO ENVIRONMENT</h3>
                <div className="mb-3">
                  <label className="block text-xs text-gray-400 mb-2">SELECT ENVIRONMENT...</label>
                  <select className="w-full bg-[#0B1220] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3B82F6]">
                    <option value="">Select...</option>
                    <option>High Inflation</option>
                    <option>Recession</option>
                    <option>Bull Market</option>
                    <option>Bear Market</option>
                    <option>Crisis Period</option>
                  </select>
                </div>
              </div>

              {/* THRESHOLD TRIGGER Section */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">THRESHOLD TRIGGER</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">SELECT ASSET</label>
                    <select className="w-full bg-[#0B1220] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3B82F6]">
                      <option>S&P 500</option>
                      <option>NASDAQ</option>
                      <option>GOLD</option>
                      <option>10Y TREASURY</option>
                      <option>BITCOIN</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-400 mb-2">DECLINED BY</label>
                      <select className="w-full bg-[#0B1220] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3B82F6]">
                        <option>%</option>
                        <option>Points</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-2">&nbsp;</label>
                      <input 
                        type="number" 
                        defaultValue="38"
                        className="w-full bg-[#0B1220] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* RECOVERY FILTER Section */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">RECOVERY FILTER</h3>
                <div className="bg-[#0B1220] rounded-lg p-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-400">0.1Y</span>
                    <span className="text-lg font-bold text-[#3B82F6]">0.7X</span>
                    <span className="text-xs text-gray-400">1.1Y</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="1.1" 
                    step="0.1"
                    defaultValue="0.7"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <button className="px-3 py-1.5 bg-[#111827] border border-gray-700 hover:border-gray-600 text-white rounded text-xs transition-all">
                      +6-12M
                    </button>
                    <button className="px-3 py-1.5 bg-[#111827] border border-gray-700 hover:border-gray-600 text-white rounded text-xs transition-all">
                      -NEVER
                    </button>
                  </div>
                  <label className="flex items-center gap-2 mt-3 cursor-pointer">
                    <input 
                      type="checkbox"
                      className="w-4 h-4 bg-[#0B1220] border border-gray-600 rounded text-[#3B82F6] focus:ring-0"
                    />
                    <span className="text-xs text-white">DRAWDOWN ONLY</span>
                  </label>
                </div>
              </div>

              {/* RUN ANALYSIS Button */}
              <button 
                onClick={() => setHasRunHistoricalAnalysis(true)}
                className="w-full bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-bold py-3 rounded-lg text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                RUN ANALYSIS
              </button>
              <p className="text-[10px] text-gray-500 text-center mt-2">
                5 SEC + 1 YEAR MARKET DATA
              </p>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center pt-6">
              {/* Icon */}
              <div className="w-16 h-16 bg-[#3B82F6] rounded-2xl flex items-center justify-center mb-5">
                <Layers className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h1 className="text-2xl font-bold text-white uppercase tracking-wider mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
                HISTORICAL SCENARIO COMPOSER
              </h1>
              <p className="text-[#94A3B8] text-xs mb-8 max-w-2xl mx-auto">
                Structured parameter-based analysis of market events, recoveries, and cross-asset behavior
              </p>

              {/* Three Analysis Type Cards */}
              <div className="grid grid-cols-3 gap-4 mb-8 max-w-3xl">
                {/* CRASH ANALYSIS */}
                <button className="bg-[#162033] border border-gray-700 hover:border-[#EF4444] rounded-xl p-5 transition-all group">
                  <div className="w-12 h-12 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#EF4444]/20 transition-all">
                    <TrendingDown className="w-6 h-6 text-[#EF4444]" />
                  </div>
                  <h3 className="text-white font-bold text-xs mb-1 uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    CRASH ANALYSIS
                  </h3>
                  <p className="text-gray-400 text-xs">Compare downturns</p>
                </button>

                {/* RECOVERY CURVES */}
                <button className="bg-[#162033] border border-gray-700 hover:border-[#22C55E] rounded-xl p-5 transition-all group">
                  <div className="w-12 h-12 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#22C55E]/20 transition-all">
                    <RefreshCw className="w-6 h-6 text-[#22C55E]" />
                  </div>
                  <h3 className="text-white font-bold text-xs mb-1 uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    RECOVERY CURVES
                  </h3>
                  <p className="text-gray-400 text-xs">Analyze rebounds</p>
                </button>

                {/* CORRELATION */}
                <button className="bg-[#162033] border border-gray-700 hover:border-[#3B82F6] rounded-xl p-5 transition-all group">
                  <div className="w-12 h-12 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#3B82F6]/20 transition-all">
                    <GitCompare className="w-6 h-6 text-[#3B82F6]" />
                  </div>
                  <h3 className="text-white font-bold text-xs mb-1 uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    CORRELATION
                  </h3>
                  <p className="text-gray-400 text-xs">Cross-asset behavior</p>
                </button>

              </div>

              {/* QUICK SCENARIOS Info Box */}
              <div className="bg-[#162033] border border-gray-700 rounded-xl p-5 max-w-3xl w-full">
                <div className="flex items-start gap-3 mb-4">
                  <Zap className="w-5 h-5 text-[#3B82F6] mt-0.5 flex-shrink-0" />
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    QUICK SCENARIOS
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B82F6] text-lg leading-none mt-0.5">•</span>
                    <div>
                      <span className="text-white font-semibold text-sm">CRASHES 1929</span>
                      <span className="text-gray-400 text-sm"> - S&P declined </span>
                      <span className="text-[#EF4444] font-bold text-sm">-89%</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B82F6] text-lg leading-none mt-0.5">•</span>
                    <div>
                      <span className="text-white font-semibold text-sm">DOT-E BUBBLE</span>
                      <span className="text-gray-400 text-sm"> - Tech-heavy during early bear markets</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B82F6] text-lg leading-none mt-0.5">•</span>
                    <div>
                      <span className="text-white font-semibold text-sm">STAGFLATION</span>
                      <span className="text-gray-400 text-sm"> - Slow behavior in high inflationary growth</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          )}
        </div>
      ) : activeTab === 'canvas' ? (
        // CANVAS Tab Content
        <CanvasTabContent />
      ) : null}

      {/* Document Slider */}
      <DocumentSlider
        isOpen={isSliderOpen}
        onClose={() => setIsSliderOpen(false)}
        onSave={handleSaveDocument}
        title={sliderTitle}
        content={sliderContent}
        tabName={sliderSource}
      />

      {/* Asset Class Slider */}
      <AssetClassSlider
        isOpen={isAssetClassSliderOpen}
        onClose={() => setIsAssetClassSliderOpen(false)}
        assetClass={selectedAssetClass}
      />

      {/* Compare Documents Slider */}
      <CompareDocumentsSlider
        isOpen={isCompareDocsSliderOpen}
        onClose={() => setIsCompareDocsSliderOpen(false)}
      />

      {/* Summarize Documents Slider */}
      <SummarizeDocumentsSlider
        isOpen={isSummarizeDocsSliderOpen}
        onClose={() => setIsSummarizeDocsSliderOpen(false)}
      />

      {/* Ask AI Slider - Hidden for now */}
      {/* <AskAISlider
        isOpen={isAskAISliderOpen}
        onClose={() => setIsAskAISliderOpen(false)}
      /> */}

      {/* Investment Thesis Slider */}
      <InvestmentThesisSlider
        isOpen={isInvestmentThesisSliderOpen}
        onClose={() => setIsInvestmentThesisSliderOpen(false)}
      />

      {/* Comparison Analysis Slider */}
      <ComparisonAnalysisSlider
        isOpen={isComparisonAnalysisSliderOpen}
        onClose={() => setIsComparisonAnalysisSliderOpen(false)}
        onSave={handleSaveComparisonDocument}
      />
    </div>
  );
}

// Helper Components
function KeyFinding({ title, description, trend, value }: {
  title: string;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  value: string;
}) {
  const trendIcons = {
    up: <ArrowUpRight className="w-4 h-4 text-green-400" />,
    down: <ArrowDownRight className="w-4 h-4 text-red-400" />,
    neutral: <Activity className="w-4 h-4 text-gray-400" />,
  };

  const valueColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400',
  };

  return (
    <div className="bg-[#0D1525] border border-gray-800 rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-bold">{title}</h4>
        {trendIcons[trend]}
      </div>
      <p className="text-xs text-gray-400 mb-2">{description}</p>
      <div className={`text-lg font-bold ${valueColors[trend]}`}>{value}</div>
    </div>
  );
}

function RecommendationCard({ action, description, priority }: {
  action: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}) {
  const priorityColors = {
    high: 'bg-red-500/10 text-red-400 border-red-500/30',
    medium: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    low: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  };

  return (
    <div className={`border rounded-lg p-4 ${priorityColors[priority]}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-bold uppercase">{action}</h4>
        <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-black/20">
          {priority}
        </span>
      </div>
      <p className="text-xs opacity-90">{description}</p>
    </div>
  );
}