import { 
  MoreVertical, Sparkles, TrendingUp, Building2, Calendar as CalendarIcon, 
  Globe, DollarSign, Map, BarChart3, Users, Send, RefreshCw, MapPin, 
  ShoppingBag, Utensils, Plane, ArrowUpRight, ArrowDownRight, Activity, 
  Filter, Clock, CheckCircle2, Copy, FileText, Mail, Presentation, 
  ThumbsUp, ThumbsDown, AlertCircle, ChevronRight, Info, Search
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

interface NewsStory {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  category: string;
}

interface Lens {
  id: string;
  name: string;
  score: number;
  justification: string;
  whyMatters: string;
}

interface RefinementOption {
  id: string;
  label: string;
  description: string;
}

const NEWS_CATEGORIES = [
  { id: 'macro', label: 'Macro', count: 12 },
  { id: 'thematic', label: 'Thematic', count: 8 },
  { id: 'asset-class', label: 'Asset Class', count: 15 },
  { id: 'security', label: 'Security', count: 24 },
  { id: 'geopolitical', label: 'Geopolitical', count: 6 },
  { id: 'im-news', label: 'IM News', count: 4 },
];

const MOCK_NEWS: Record<string, NewsStory[]> = {
  macro: [
    { id: 'm1', title: 'US CPI rises 0.4% in March, exceeding forecasts', source: 'Bloomberg', timeAgo: '2h', category: 'macro' },
    { id: 'm2', title: 'Fed officials signal "no rush" to cut interest rates', source: 'Reuters', timeAgo: '4h', category: 'macro' },
    { id: 'm3', title: 'China GDP growth beats estimates at 5.3% in Q1', source: 'FT', timeAgo: '6h', category: 'macro' },
    { id: 'm4', title: 'ECB maintains rates but opens door to June cut', source: 'CNBC', timeAgo: '8h', category: 'macro' },
    { id: 'm5', title: 'UK inflation falls to 3.2%, lowest since 2021', source: 'BBC News', timeAgo: '10h', category: 'macro' },
  ],
  thematic: [
    { id: 't1', title: 'AI infrastructure spending set to triple by 2027', source: 'TechCrunch', timeAgo: '1h', category: 'thematic' },
    { id: 't2', title: 'Nuclear energy gains traction as green transition tool', source: 'WSJ', timeAgo: '3h', category: 'thematic' },
    { id: 't3', title: 'Longevity tech attracting record VC investment', source: 'Forbes', timeAgo: '5h', category: 'thematic' },
    { id: 't4', title: 'Circular economy startups disrupt fast fashion', source: 'Vogue Business', timeAgo: '7h', category: 'thematic' },
    { id: 't5', title: 'ESG data quality remains primary hurdle for managers', source: 'RI', timeAgo: '9h', category: 'thematic' },
  ],
  'asset-class': [
    { id: 'a1', title: 'Gold hits new record high on safe-haven demand', source: 'Bloomberg', timeAgo: '2h', category: 'asset-class' },
    { id: 'a2', title: 'Treasury yields surge to 2024 highs after CPI data', source: 'Reuters', timeAgo: '4h', category: 'asset-class' },
    { id: 'a3', title: 'Brent crude stabilizes near $90 on OPEC+ signals', source: 'CNBC', timeAgo: '6h', category: 'asset-class' },
    { id: 'a4', title: 'EM currencies under pressure from dollar strength', source: 'FT', timeAgo: '8h', category: 'asset-class' },
    { id: 'a5', title: 'REITs show resilience despite higher-for-longer rates', source: 'WSJ', timeAgo: '10h', category: 'asset-class' },
  ],
  security: [
    { id: 's1', title: 'NVIDIA reveals Blackwell B200 AI chip architecture', source: 'The Verge', timeAgo: '1h', category: 'security' },
    { id: 's2', title: 'Apple Vision Pro demand exceeding early production', source: 'Bloomberg', timeAgo: '3h', category: 'security' },
    { id: 's3', title: 'Tesla price cuts in China weigh on EV margins', source: 'Reuters', timeAgo: '5h', category: 'security' },
    { id: 's4', title: 'Microsoft cloud revenue growth accelerates to 31%', source: 'ZDNet', timeAgo: '7h', category: 'security' },
    { id: 's5', title: 'Meta announces first-ever dividend as profits soar', source: 'CNBC', timeAgo: '9h', category: 'security' },
  ],
  geopolitical: [
    { id: 'g1', title: 'Red Sea shipping disruptions drive freight costs higher', source: 'Lloyds List', timeAgo: '2h', category: 'geopolitical' },
    { id: 'g2', title: 'US expands semiconductor export curbs on China', source: 'Nikkei', timeAgo: '4h', category: 'geopolitical' },
    { id: 'g3', title: 'Ukraine energy grid faces renewed infrastructure attacks', source: 'Reuters', timeAgo: '6h', category: 'geopolitical' },
    { id: 'g4', title: 'EU election polls show shift toward populist parties', source: 'Politico', timeAgo: '8h', category: 'geopolitical' },
    { id: 'g5', title: 'OPEC+ unity tested by African output disagreements', source: 'Argus', timeAgo: '10h', category: 'geopolitical' },
  ],
  'im-news': [
    { id: 'i1', title: 'Active ETFs capture 25% of all equity fund inflows', source: 'Ignites', timeAgo: '3h', category: 'im-news' },
    { id: 'i2', title: 'Fee compression accelerates in UK wealth segment', source: 'Citywire', timeAgo: '5h', category: 'im-news' },
    { id: 'i3', title: 'Private credit expansion prompts regulatory scrutiny', source: 'Bloomberg', timeAgo: '7h', category: 'im-news' },
    { id: 'i4', title: 'BlackRock tokenizes first money market fund on BUIDL', source: 'CoinDesk', timeAgo: '9h', category: 'im-news' },
    { id: 'i5', title: 'Outsourced CIO market expected to hit $4T by 2028', source: 'P&I', timeAgo: '11h', category: 'im-news' },
  ],
};

const MOCK_LENSES: Lens[] = [
  { id: 'l1', name: 'Client Reassurance', score: 94, justification: 'Headline directly references volatility you sell against.', whyMatters: 'VIX spikes and CPI surprises match your priority document "Q2 vol-targeting talking points", section 3.' },
  { id: 'l2', name: 'Performance Narrative', score: 88, justification: 'Matches your overweight position in AI infrastructure.', whyMatters: 'Semiconductor cycles and capex trends match "2024 Tech Conviction" research paper.' },
  { id: 'l3', name: 'Tactical Opportunity', score: 72, justification: 'Relates to your house view on fixed income duration.', whyMatters: 'Yield curve steepening matches "Duration Strategy Update" internal memo.' },
];

const REFINEMENT_OPTIONS: RefinementOption[] = [
  { id: 'r1', label: 'Executive Summary', description: 'Produces a concise 3-sentence summary for quick reading.' },
  { id: 'r2', label: 'Detailed Analysis', description: 'Produces deep narrative, evidence, and talking points.' },
  { id: 'r3', label: 'Client FAQ', description: 'Produces 5 common questions and specific objection handlers.' },
];

export function NewsSection() {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState<NewsStory | null>(null);
  const [selectedLens, setSelectedLens] = useState<Lens | null>(null);
  const [selectedOption, setSelectedOption] = useState<RefinementOption | null>(null);
  const [showProvLayer, setShowProvLayer] = useState<string | null>(null);
  
  const step3Ref = useRef<HTMLDivElement>(null);

  const handleHeadlineSelect = (story: NewsStory) => {
    setSelectedStory(story);
    setSelectedLens(null);
    setSelectedOption(null);
  };

  const handleLensSelect = (lens: Lens) => {
    setSelectedLens(lens);
  };

  const handleOptionSelect = (option: RefinementOption) => {
    setSelectedOption(option);
    // Auto-scroll to Step 3
    setTimeout(() => {
      step3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#0B1220] border border-gray-800 rounded-lg overflow-hidden flex flex-col shadow-2xl">
        {/* Header Strip */}
        <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4 bg-[#0F1621]">
          <div className="flex items-center gap-4">
            <h2 className="text-white text-xs font-bold flex items-center gap-2 tracking-widest uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Market News
            </h2>
            <div className="flex items-center gap-2 text-[10px] text-gray-500">
              <Clock className="w-3 h-3" />
              <span>Last Refreshed: 2m ago</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-gray-500 hover:text-white transition-colors border border-gray-800 rounded bg-[#162033]">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-white transition-colors border border-gray-800 rounded bg-[#162033]">
              <Filter className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Upper Content: Grid + Interaction Pane */}
        <div className="grid grid-cols-[1fr_380px] min-h-[600px] h-[750px]">
          {/* Left: News Grid (2 columns of 3 cards) */}
          <div className="p-6 grid grid-cols-2 gap-6 border-r border-gray-800 bg-[#0B1220]/50 overflow-y-auto">
            {NEWS_CATEGORIES.map((cat) => (
              <div key={cat.id} className="bg-[#0D1420] border border-gray-800 rounded-lg p-4 shadow-sm flex flex-col h-[280px] hover:border-gray-700 transition-colors group">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800/50">
                  <h3 className="text-[#3B82F6] text-[11px] font-bold uppercase tracking-wider group-hover:text-blue-400 transition-colors" style={{ fontFamily: "'Oswald', sans-serif" }}>
                    {cat.label}
                  </h3>
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-900 px-1.5 py-0.5 rounded border border-gray-800">
                    {cat.count}
                  </span>
                </div>
                <ul className="space-y-2 flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-800">
                  {MOCK_NEWS[cat.id]?.map((story) => (
                    <li 
                      key={story.id}
                      onClick={() => handleHeadlineSelect(story)}
                      className={`text-[12px] leading-snug cursor-pointer transition-all p-2 rounded-md border ${
                        selectedStory?.id === story.id 
                          ? 'bg-blue-600/10 border-blue-500/50 text-white font-medium' 
                          : 'text-gray-400 border-transparent hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${selectedStory?.id === story.id ? 'bg-blue-400' : 'bg-gray-700'}`} />
                        <div>
                          <span>{story.title}</span>
                          <div className="mt-1 flex items-center gap-2 text-[9px] text-gray-600 font-medium">
                            <span className="uppercase">{story.source}</span>
                            <span>•</span>
                            <span>{story.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right: Interaction Pane (Steps 1 & 2) */}
          <div className="flex flex-col bg-[#0F1621] overflow-y-auto border-l border-gray-800">
            {!selectedStory ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center opacity-40">
                <Search className="w-12 h-12 text-gray-700 mb-4" />
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest" style={{ fontFamily: "'Oswald', sans-serif" }}>Select Headline</h3>
                <p className="text-xs text-gray-600 mt-2">Pick a news story to generate AI lenses and interpretation options.</p>
              </div>
            ) : (
              <div className="p-6 space-y-8">
                {/* Step 1: Select Lens */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">1</div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>Choose Your Lens</h3>
                  </div>
                  <div className="space-y-3">
                    {MOCK_LENSES.map((lens) => (
                      <div 
                        key={lens.id}
                        onClick={() => handleLensSelect(lens)}
                        className={`relative p-3 rounded-lg border cursor-pointer transition-all group ${
                          selectedLens?.id === lens.id 
                            ? 'bg-blue-600/10 border-blue-500' 
                            : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-[11px] font-bold ${selectedLens?.id === lens.id ? 'text-blue-400' : 'text-gray-300'}`}>
                            {lens.name}
                          </span>
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-green-500">{lens.score}% Match</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-gray-500 leading-snug">{lens.justification}</p>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowProvLayer(showProvLayer === lens.id ? null : lens.id);
                          }}
                          className="mt-2 text-[9px] font-bold text-gray-600 hover:text-blue-400 flex items-center gap-1 uppercase tracking-tighter"
                        >
                          <Info className="w-2.5 h-2.5" />
                          Why this lens?
                        </button>

                        {showProvLayer === lens.id && (
                          <div className="mt-2 p-2 bg-black/40 rounded text-[9px] text-gray-400 leading-relaxed border-l-2 border-blue-500 italic animate-in slide-in-from-top-2 duration-300">
                            {lens.whyMatters}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 2: Refine Lens */}
                <div className={`transition-all duration-500 ${selectedLens ? 'opacity-100 translate-y-0' : 'opacity-30 pointer-events-none translate-y-4'}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">2</div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>Refine Output</h3>
                  </div>
                  <div className="bg-blue-900/5 p-4 rounded-xl space-y-3 border border-blue-900/20">
                    {REFINEMENT_OPTIONS.map((opt) => (
                      <div 
                        key={opt.id}
                        onClick={() => handleOptionSelect(opt)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center gap-3 group ${
                          selectedOption?.id === opt.id 
                            ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/20' 
                            : 'bg-gray-900/80 border-gray-800 hover:border-blue-500/30'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 transition-colors ${selectedOption?.id === opt.id ? 'bg-blue-500' : 'bg-gray-800 group-hover:bg-gray-700'}`}>
                          {opt.id === 'r1' && <FileText className="w-4 h-4" />}
                          {opt.id === 'r2' && <Activity className="w-4 h-4" />}
                          {opt.id === 'r3' && <Users className="w-4 h-4" />}
                        </div>
                        <div className="min-w-0">
                          <p className={`text-[11px] font-bold ${selectedOption?.id === opt.id ? 'text-white' : 'text-gray-300'}`}>{opt.label}</p>
                          <p className={`text-[9px] truncate ${selectedOption?.id === opt.id ? 'text-blue-100' : 'text-gray-500'}`}>{opt.description}</p>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 ml-auto transition-transform ${selectedOption?.id === opt.id ? 'translate-x-1' : 'text-gray-700'}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Result Band (Full Width) */}
        <div ref={step3Ref} className={`border-t border-gray-800 bg-[#0B1220] transition-all duration-700 ${selectedOption ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-10'}`}>
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800/50 bg-[#0D1420]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">3</div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                AI Interpretation: {selectedLens?.name || 'Selected Lens'}
              </h3>
            </div>
            {selectedOption && (
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg transition-all shadow-lg shadow-blue-600/10">
                  <Mail className="w-3 h-3" /> Draft Email
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-[10px] font-bold rounded-lg transition-all border border-gray-700">
                  <Presentation className="w-3 h-3" /> Add to Deck
                </button>
                <button className="p-1.5 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-all border border-gray-700" title="Copy Content">
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <div className="w-px h-6 bg-gray-800 mx-1" />
                <div className="flex items-center gap-1 px-1">
                  <button className="p-1 text-gray-500 hover:text-green-500 transition-colors"><ThumbsUp className="w-3.5 h-3.5" /></button>
                  <button className="p-1 text-gray-500 hover:text-red-500 transition-colors"><ThumbsDown className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            )}
          </div>

          <div className="p-8">
            {!selectedOption ? (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-30">
                <Sparkles className="w-10 h-10 text-gray-700 mb-3" />
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest" style={{ fontFamily: "'Oswald', sans-serif" }}>Complete Steps 1 & 2 to view insights</p>
              </div>
            ) : (
              <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Column 1: Narrative (Widest) */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400 mb-2 border-b border-cyan-900/30 pb-2">
                    <FileText className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Strategic Narrative</span>
                  </div>
                  <div className="space-y-4 text-[13px] text-gray-300 leading-relaxed font-light">
                    <p>
                      The current CPI surprise of 0.4% MoM represents a significant tactical headwind for long-duration positions, as it effectively removes the possibility of a June rate cut. This "higher-for-longer" environment validates our house view of maintaining a 5-7 year duration target rather than extending.
                    </p>
                    <p>
                      For your clients, the narrative should shift from "waiting for cuts" to "optimizing yield carry." The resilience of the consumer (as seen in the core services component) suggests that even with higher rates, economic growth is supporting corporate credit fundamentals. We recommend using this volatility to lock in higher nominal yields in investment-grade tranches.
                    </p>
                  </div>
                </div>

                {/* Column 2: Evidence (Metric tiles + Source) */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-blue-400 mb-2 border-b border-blue-900/30 pb-2">
                    <Activity className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Quantitative Evidence</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-900/50 border border-gray-800 p-3 rounded-lg">
                      <p className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-tighter">VIX Index</p>
                      <p className="text-lg font-bold text-red-400">+12.4%</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-3 rounded-lg">
                      <p className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-tighter">10Y Yield</p>
                      <p className="text-lg font-bold text-white">4.58%</p>
                    </div>
                  </div>
                  <div className="bg-[#0D1420] border border-blue-900/30 p-4 rounded-lg border-l-2 border-l-blue-500 shadow-inner">
                    <div className="flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Source: Institutional Strategy Q2</span>
                    </div>
                    <p className="text-[11px] text-gray-400 italic leading-relaxed">
                      "Persistent services inflation remains the primary risk to our easing thesis. We anticipate yields to range-trade between 4.4% and 4.7% until Q3 labor data reveals cooling..."
                    </p>
                  </div>
                </div>

                {/* Column 3: Talking Points */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-green-400 mb-2 border-b border-green-900/30 pb-2">
                    <Users className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Client Talking Points</span>
                  </div>
                  <ol className="space-y-4">
                    {[
                      "Focus on real yields being at 15-year highs despite headline noise.",
                      "Position the delay in cuts as a sign of underlying economic strength.",
                      "Emphasize the 'Carry' advantage of the current portfolio stance."
                    ].map((point, idx) => (
                      <li key={idx} className="flex gap-3 text-xs text-gray-300 leading-snug">
                        <span className="w-5 h-5 rounded-full bg-gray-800 text-gray-500 text-[10px] flex items-center justify-center font-bold flex-shrink-0 border border-gray-700">{idx + 1}</span>
                        <span className="pt-0.5">{point}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6 bg-red-900/10 border border-red-900/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider">Watch For (Objection Handler)</span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-snug italic">
                      If client asks about "recession risk from overtightening," point to the 5.3% GDP growth in trading partners and robust US payroll data.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CalendarSection() {
  const [events] = useState([
    { id: 'c1', date: 'Mar 15', time: '2:00 PM', title: 'FOMC Meeting Minutes Release', type: 'Economic Data', typeColor: 'bg-[#3B82F6] text-white' },
    { id: 'c2', date: 'Mar 16', time: '8:30 AM', title: 'CPI Inflation Report', type: 'Economic Data', typeColor: 'bg-[#EF4444] text-white' },
    { id: 'c3', date: 'Mar 17', time: '10:00 AM', title: 'Client Portfolio Review Meeting', type: 'Meeting', typeColor: 'bg-[#22C55E] text-white' },
    { id: 'c4', date: 'Mar 18', time: '9:00 AM', title: 'Tech Sector Earnings Calls', type: 'Earnings', typeColor: 'bg-[#F59E0B] text-white' },
  ]);

  return (
    <div className="bg-[#0B1220] border border-gray-800 rounded-lg overflow-hidden flex flex-col h-[500px] shadow-2xl">
      <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4 bg-[#0F1621]">
        <h2 className="text-cyan-400 text-xs font-bold flex items-center gap-2 uppercase tracking-widest" style={{ fontFamily: "'Oswald', sans-serif" }}>
          <CalendarIcon className="w-4 h-4" />
          Calendar / Schedule
        </h2>
      </div>

      <div className="overflow-y-auto p-6 space-y-4 flex-1 bg-[#0B1220]/50">
        {events.map((event) => (
          <div key={event.id} className="bg-[#111827] border border-gray-800 rounded-lg p-4 hover:bg-[#162033] transition-all cursor-pointer group border-l-4 border-l-transparent hover:border-l-blue-500 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-[#162033] border border-gray-800 rounded px-3 py-2 text-center min-w-[65px] group-hover:bg-blue-900/20 group-hover:border-blue-800/50 transition-colors">
                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">{event.date.split(' ')[0]}</div>
                <div className="text-lg font-bold text-white leading-none mt-1">{event.date.split(' ')[1]}</div>
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{event.title}</h3>
                <div className="text-[10px] text-gray-500 mb-2 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {event.time}
                </div>
                <span className={`${event.typeColor} px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-tighter shadow-sm`}>
                  {event.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-800 bg-[#0F1621]">
        <button className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-[10px] font-bold text-gray-400 uppercase tracking-widest transition-all rounded border border-gray-800">
          View Full Schedule
        </button>
      </div>
    </div>
  );
}
