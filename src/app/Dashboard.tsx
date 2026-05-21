import {
  RefreshCw, Filter, TrendingUp, Briefcase, Building2, Lightbulb, ArrowUpRight, ArrowDownRight, Minus, Sparkles, ChevronDown, Calendar, Video, Users, MapPin, Clock, ChevronUp, ExternalLink, Radar, Zap,
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  LineChart, Line, CartesianGrid, Treemap, Legend, Area, AreaChart,
} from 'recharts';
import { NewsSection, CalendarSection } from './components/NewsSection';
import { AIInsights } from './components/AIInsights';
import { useNavigate } from 'react-router';
import fundAnalysisImage from 'figma:asset/1a74cf8963cd032dbe5edab41c85a1e0ef79c48a.png';

interface NewsItem {
  id: string;
  icon: string;
  text: string;
  fullText?: string;
  category: 'commodities' | 'global' | 'general';
  tags: string[];
  timeAgo: string;
  source: string;
  popularity: number;
  macroTheme?: string;
  assetClass?: string;
  country?: string;
  region?: string;
  sector?: string;
  isInvestmentMgmt?: boolean;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedClient, setSelectedClient] = useState('all');
  const [selectedFund, setSelectedFund] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('1D');
  const [newsFilter, setNewsFilter] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<'latest' | 'today' | 'week' | 'month'>('latest');
  const [sortBy, setSortBy] = useState<'time' | 'popular'>('time');

  const [expandedStories, setExpandedStories] = useState<Set<string>>(new Set());
  const [storyCategory, setStoryCategory] = useState('all');
  const [selectedMacroTheme, setSelectedMacroTheme] = useState('all');
  const [selectedAssetClass, setSelectedAssetClass] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');

  const [hasActiveCampaign, setHasActiveCampaign] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (localStorage.getItem('activeCampaign') === 'true') {
      setHasActiveCampaign(true);
    }
  }, []);

  const handleAssetClick = (assetType: 'equities' | 'bonds' | 'commodities' | 'alternatives' | 'real-estate' | 'cash') => {
    navigate(`/insights?tab=fund&assetClass=${assetType}`);
  };

  const toggleStoryExpansion = (storyId: string) => {
    setExpandedStories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(storyId)) {
        newSet.delete(storyId);
      } else {
        newSet.add(storyId);
      }
      return newSet;
    });
  };

  const truncateText = (text: string, sentences: number = 2): string => {
    const sentenceEndings = /[.!?]+\s/g;
    const matches = [...text.matchAll(sentenceEndings)];
    if (matches.length <= sentences) return text;
    const endIndex = matches[sentences - 1].index! + matches[sentences - 1][0].length;
    return text.substring(0, endIndex).trim();
  };

  // ── News Data ──────────────────────────────────────────────────────────────
  const newsItems: NewsItem[] = [
    {
      id: '1', icon: '📈',
      text: 'NVIDIA announces breakthrough in AI chip efficiency, stock surges 8% in pre-market trading',
      fullText: 'NVIDIA announces breakthrough in AI chip efficiency, stock surges 8% in pre-market trading. The semiconductor giant unveiled its latest generation of processors featuring a revolutionary architecture that delivers 40% better performance per watt. Industry analysts predict this could accelerate AI adoption across enterprise markets.',
      category: 'general', tags: ['tech', 'equities', 'ai'], timeAgo: '2 hours ago', source: 'Bloomberg', popularity: 98,
      macroTheme: 'Technology Innovation', assetClass: 'Equities', country: 'United States', region: 'North America', sector: 'Technology',
    },
    {
      id: '2', icon: '🛢️',
      text: 'Oil prices jump 6% as OPEC+ announces unexpected production cuts',
      fullText: 'Oil prices jump 6% as OPEC+ announces unexpected production cuts. Brent crude surged to $89 per barrel following the announcement of additional supply restrictions totaling 1.5 million barrels per day.',
      category: 'commodities', tags: ['oil', 'commodities', 'opec'], timeAgo: '1 hour ago', source: 'Reuters', popularity: 95,
      macroTheme: 'Energy Markets', assetClass: 'Commodities', country: 'Global', region: 'Global', sector: 'Energy',
    },
    {
      id: '3', icon: '🏦',
      text: 'Federal Reserve signals potential rate cuts in Q2 2026, markets rally',
      fullText: 'Federal Reserve signals potential rate cuts in Q2 2026, markets rally. In today\'s policy statement, the Fed acknowledged progress on inflation targets while noting softening in certain economic indicators. Chairman Powell suggested that if trends continue, the committee could begin easing monetary policy as early as the second quarter.',
      category: 'global', tags: ['fed', 'rates', 'policy'], timeAgo: '3 hours ago', source: 'Financial Times', popularity: 100,
      macroTheme: 'Monetary Policy', assetClass: 'Fixed Income', country: 'United States', region: 'North America', sector: 'Financials',
    },
    {
      id: '4', icon: '⚡',
      text: 'Tesla beats Q1 delivery estimates, stock up 12% after hours',
      fullText: 'Tesla beats Q1 delivery estimates, stock up 12% after hours. The electric vehicle manufacturer reported deliveries of 485,000 vehicles, well above analyst expectations of 445,000.',
      category: 'general', tags: ['tesla', 'ev', 'earnings'], timeAgo: '4 hours ago', source: 'CNBC', popularity: 92,
      macroTheme: 'Electric Vehicles', assetClass: 'Equities', country: 'United States', region: 'North America', sector: 'Consumer Discretionary',
    },
    {
      id: '5', icon: '🌾',
      text: 'Wheat prices surge 8% on supply concerns from Black Sea region',
      fullText: 'Wheat prices surge 8% on supply concerns from Black Sea region. Chicago wheat futures climbed to a three-month high amid reports of adverse weather affecting crop conditions in Ukraine and southern Russia.',
      category: 'commodities', tags: ['wheat', 'agriculture', 'supply'], timeAgo: '5 hours ago', source: 'Wall Street Journal', popularity: 78,
      macroTheme: 'Agriculture', assetClass: 'Commodities', country: 'Global', region: 'Global', sector: 'Agriculture',
    },
    {
      id: '6', icon: '💰',
      text: 'Gold reaches new all-time high above $2,500/oz on safe-haven demand',
      fullText: 'Gold reaches new all-time high above $2,500/oz on safe-haven demand. The precious metal broke through key resistance levels as investors sought protection against geopolitical uncertainties and currency volatility.',
      category: 'commodities', tags: ['gold', 'safe-haven', 'metals'], timeAgo: '6 hours ago', source: 'Bloomberg', popularity: 88,
      macroTheme: 'Safe Haven Assets', assetClass: 'Commodities', country: 'Global', region: 'Global', sector: 'Materials',
    },
    {
      id: '7', icon: '🏢',
      text: 'JPMorgan reports record quarterly profit, raises dividend 10%',
      fullText: 'JPMorgan reports record quarterly profit, raises dividend 10%. The banking giant posted earnings of $4.25 per share, beating estimates by 15 cents. Strong performance across investment banking and wealth management divisions more than offset challenges in retail banking.',
      category: 'general', tags: ['banks', 'earnings', 'financials'], timeAgo: '7 hours ago', source: 'Reuters', popularity: 85,
      macroTheme: 'Banking', assetClass: 'Equities', country: 'United States', region: 'North America', sector: 'Financials',
    },
    {
      id: '8', icon: '🌐',
      text: 'European Central Bank holds rates steady, signals data-dependent approach',
      fullText: 'European Central Bank holds rates steady, signals data-dependent approach. President Lagarde emphasized the need for continued vigilance on inflation despite recent moderation.',
      category: 'global', tags: ['ecb', 'europe', 'rates'], timeAgo: '8 hours ago', source: 'Financial Times', popularity: 82,
      macroTheme: 'Monetary Policy', assetClass: 'Fixed Income', country: 'Eurozone', region: 'Europe', sector: 'Financials',
    },
  ];

  // ── Commodities ────────────────────────────────────────────────────────────
  const commodities = [
    { name: 'Crude Oil', value: '$82.50', change: '+2.3%', color: 'text-green-500', chartData: [65, 68, 70, 75, 78, 82] },
    { name: 'Gold', value: '$2,045', change: '+0.8%', color: 'text-green-500', chartData: [1950, 1975, 2000, 2020, 2035, 2045] },
    { name: 'Copper', value: '$8,420', change: '-1.2%', color: 'text-red-500', chartData: [9000, 8800, 8650, 8500, 8450, 8420] },
    { name: 'Natural Gas', value: '$3.15', change: '+5.4%', color: 'text-green-500', chartData: [2.8, 2.9, 3.0, 3.1, 3.12, 3.15] },
  ];

  // ── Chart data ─────────────────────────────────────────────────────────────
  const equityData = [
    { name: 'UK Equity', value: 18.67, color: '#3B82F6' },
    { name: 'Global Equity', value: 10.03, color: '#06B6D4' },
    { name: 'Emerging Markets', value: 7.25, color: '#8B5CF6' },
    { name: 'US Equity', value: 4.86, color: '#10B981' },
  ];

  const realEstateData = [
    { name: 'Commercial', value: 7.2, color: '#F59E0B' },
    { name: 'Residential', value: 4.8, color: '#EF4444' },
  ];

  const alternativeData = [
    { name: 'Private Equity', value: 6.5, color: '#EC4899' },
    { name: 'Hedge Funds', value: 3.2, color: '#8B5CF6' },
    { name: 'Infrastructure', value: 1.8, color: '#06B6D4' },
  ];

  const sectorData = [
    { name: 'Technology', value: 28.5, color: '#3B82F6' },
    { name: 'Financials', value: 18.2, color: '#10B981' },
    { name: 'Healthcare', value: 15.8, color: '#8B5CF6' },
    { name: 'Consumer', value: 12.4, color: '#F59E0B' },
    { name: 'Energy', value: 8.9, color: '#EF4444' },
    { name: 'Industrials', value: 7.6, color: '#06B6D4' },
  ];

  const countryData = [
    { name: 'United States', value: 52.3, color: '#3B82F6' },
    { name: 'China', value: 15.8, color: '#EF4444' },
    { name: 'Japan', value: 12.5, color: '#10B981' },
    { name: 'United Kingdom', value: 8.7, color: '#F59E0B' },
    { name: 'Germany', value: 6.2, color: '#8B5CF6' },
    { name: 'Other', value: 4.5, color: '#6B7280' },
  ];

  const regionalData = [
    { name: 'North America', value: 55.6, color: '#3B82F6' },
    { name: 'Europe', value: 22.5, color: '#10B981' },
    { name: 'Asia Pacific', value: 18.3, color: '#8B5CF6' },
    { name: 'Emerging Markets', value: 3.6, color: '#F59E0B' },
  ];

  const performanceData = [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: 105 },
    { month: 'Mar', value: 103 },
    { month: 'Apr', value: 108 },
    { month: 'May', value: 112 },
    { month: 'Jun', value: 115 },
  ];

  // ── Upcoming Events ─────────────────────────────────────────────────────────
  const upcomingEvents = [
    {
      id: '1', company: 'M&G presentation', event: 'Quarterly Business Review',
      date: 'Feb 15', time: '10:00 EST', location: 'Virtual', notes: 'Prepare Q4 performance deck', color: '#3B82F6',
    },
    {
      id: '2', company: 'New client call', event: 'Portfolio Strategy Session',
      date: 'Feb 18', time: '14:30 EST', location: 'On-Site (London)', notes: 'Discuss ESG integration', color: '#10B981',
    },
    {
      id: '3', company: 'Client follow up', event: 'Annual Investment Committee',
      date: 'Feb 20', time: '09:00 EST', location: 'Virtual', notes: 'Review fee structure', color: '#8B5CF6',
    },
    {
      id: '4', company: 'Weekly update', event: 'Risk Management Workshop',
      date: 'Feb 25', time: '11:00 EST', location: 'Virtual', notes: 'VaR model updates', color: '#F59E0B',
    },
    {
      id: '5', company: 'Risk Committee', event: 'Technology Integration Meeting',
      date: 'Feb 28', time: '13:00 EST', location: 'On-Site (London)', notes: 'API connectivity review', color: '#EF4444',
    },
  ];

  // ── Active Campaigns ──────────────────────────────────────────────────────
  const activeCampaigns = [
    { id: '1', name: 'Q3 Wealth Management Outreach', segment: 'High Net Worth', status: 'Active', clients: 124, progress: 65 },
    { id: '2', name: 'Cold Prospect Nurture', segment: 'Cold Prospects', status: 'Active', clients: 450, progress: 32 },
  ];

  const campaignColors: Record<string, string> = {
    Active: 'bg-green-500/10 text-green-400 border-green-500/20',
    Draft: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Completed: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  };

  // ══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className="p-6 space-y-6">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Market Intelligence Dashboard</h1>
          <p className="text-sm text-gray-400">Real-time market data and portfolio analytics</p>
        </div>
        <Button
          className={`${hasActiveCampaign ? 'bg-[#22C55E] hover:bg-[#16A34A] shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-[#3B82F6] hover:bg-blue-600'} text-white flex items-center gap-2 font-medium`}
          onClick={() => navigate('/campaign-journeys')}
        >
          <Sparkles className="w-4 h-4" /> {hasActiveCampaign ? 'Current Campaign' : 'Activate Campaign'}
        </Button>
      </div>

      {/* ── News ──────────────────────────────────────────────────────────── */}
      <NewsSection />

      {/* ── AI Radar Summary ───────────────────────────────────────────────── */}
      <div className="bg-[#111827] border border-gray-800 rounded-lg overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-[#0F1621]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Radar className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-white text-sm font-bold uppercase tracking-widest" style={{ fontFamily: "'Oswald', sans-serif" }}>AI RADAR SUMMARY</h2>
              <p className="text-[10px] text-gray-500 font-medium">3 CRITICAL FIRINGS DETECTED IN THE LAST 24H</p>
            </div>
          </div>
          <Button variant="outline" className="border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-blue-400 text-xs font-bold" onClick={() => navigate('/radar')}>
            OPEN RADAR CENTER
          </Button>
        </div>
        <div className="p-6 grid grid-cols-3 gap-6">
          {[
            { title: 'Client At Risk', value: '2', sub: 'Global Wealth Partners (+1)', color: 'text-red-400' },
            { title: 'Competitor Vulnerability', value: '1', sub: 'Apollo Asset Mgmt', color: 'text-yellow-400' },
            { title: 'New Client Receptivity', value: '4', sub: 'Horizon Family Office', color: 'text-green-400' },
          ].map((item) => (
            <div key={item.title} className="bg-[#0B1220] border border-gray-800 p-4 rounded-xl group hover:border-blue-500/50 transition-colors cursor-pointer" onClick={() => navigate('/radar')}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.title}</span>
                <Zap className={`w-3.5 h-3.5 ${item.color}`} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-bold ${item.color}`}>{item.value}</span>
                <span className="text-[10px] text-gray-400 font-medium truncate">{item.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Active Campaigns ───────────────────────────────────────────────── */}
      <div className="bg-[#111827] border border-gray-800 rounded-lg overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-[#0F1621]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Sparkles className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-white text-sm font-bold uppercase tracking-widest" style={{ fontFamily: "'Oswald', sans-serif" }}>
                ACTIVE CAMPAIGNS
              </h2>
              <p className="text-[10px] text-gray-500 font-medium">
                {activeCampaigns.length} campaign{activeCampaigns.length !== 1 ? 's' : ''} currently running
              </p>
            </div>
          </div>
          <Button variant="outline" className="border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-blue-400 text-xs font-bold" onClick={() => navigate('/campaign-journeys')}>
            SEE ALL <ArrowUpRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
        <div className="p-4 flex flex-col gap-3">
          {activeCampaigns.map((campaign) => (
            <div key={campaign.id} className="bg-[#0B1220] border border-gray-800 rounded-xl p-4 hover:border-blue-500/40 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 pr-3">
                  <h3 className="text-sm font-bold text-white truncate">{campaign.name}</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {campaign.segment} &middot; {campaign.clients} clients
                  </p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${campaignColors[campaign.status] || campaignColors.Completed}`}>
                  {campaign.status}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${campaign.progress}%` }} />
                </div>
                <span className="text-[11px] text-gray-500 font-bold flex-shrink-0 w-8 text-right">{campaign.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Upcoming Events ────────────────────────────────────────────────── */}
      <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-cyan-400 text-xs font-bold flex items-center gap-2">
            <Calendar className="w-4 h-4" /> EVENTS
          </h2>
          <button className="text-cyan-400 text-xs font-bold hover:text-cyan-300 transition-colors flex items-center gap-1">
            VIEW CALENDAR <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
          </button>
        </div>

        <div className="grid grid-cols-[0.5fr_1.5fr_1fr_1fr_1.5fr_0.7fr] gap-4 px-4 py-3 bg-[#0B1220] border-b border-gray-800 text-[10px] font-bold text-gray-500 uppercase">
          <div />
          <div>Event</div>
          <div>Date/Time</div>
          <div>Location</div>
          <div>Notes</div>
          <div>Action</div>
        </div>

        <div className="space-y-0">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="grid grid-cols-[0.5fr_1.5fr_1fr_1fr_1.5fr_0.7fr] gap-4 px-4 py-4 border-b border-gray-800 hover:bg-[#0D1525] transition-colors cursor-pointer items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: event.color }} />
                <span className="text-sm font-bold text-white">{event.company}</span>
              </div>
              <div className="text-xs text-gray-300">{event.event}</div>
              <div className="text-xs text-gray-400">{event.date}, {event.time}</div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <MapPin className="w-3 h-3" /><span>{event.location}</span>
              </div>
              <div className="text-xs text-gray-400">{event.notes}</div>
              <div>
                <button className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded hover:bg-cyan-500/30 transition-colors">
                  DETAILS
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Helper components (used inside NewsSection / AIInsights via children) ──
function MetricCard({ label, value, description, trend }: { label: string; value: string; description: string; trend: 'up' | 'down' | 'neutral' }) {
  const trendColors = { up: 'text-green-500', down: 'text-red-500', neutral: 'text-gray-400' };
  const trendIcons = { up: <ArrowUpRight className="w-4 h-4" />, down: <ArrowDownRight className="w-4 h-4" />, neutral: <Minus className="w-4 h-4" /> };
  return (
    <div className="bg-[#0D1525] border border-gray-700 rounded-lg p-4 hover:border-blue-500/30 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs text-gray-400">{label}</span>
        <span className={trendColors[trend]}>{trendIcons[trend]}</span>
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <p className="text-[10px] text-gray-500">{description}</p>
    </div>
  );
}

function SectorNewsItem({ sector, change, color, text }: { sector: string; change: string; color: string; text: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-[#0D1525] rounded-lg hover:bg-[#1a1f2e] transition-colors cursor-pointer">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-blue-500">{sector}</span>
          <span className={`text-xs font-bold ${color}`}>{change}</span>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function CalendarItem({ company, event, date, type }: { company: string; event: string; date: string; type: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-[#0D1525] rounded-lg hover:bg-[#1a1f2e] transition-colors cursor-pointer border border-gray-800 hover:border-blue-500/30">
      <div className="flex-1">
        <h4 className="text-sm font-bold mb-1">{company}</h4>
        <p className="text-xs text-gray-400 mb-2">{event}</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" /><span>{date}</span>
          </div>
          <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">{type}</span>
        </div>
      </div>
    </div>
  );
}
