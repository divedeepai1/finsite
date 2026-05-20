import { Building, ChevronLeft, History as HistoryIcon, Download, Eye, Share2, Sparkles, TrendingUp, Target, AlertTriangle, CheckCircle, Lightbulb, ArrowRight, FileText, BarChart3 } from 'lucide-react';
import { Button } from './components/ui/button';
import { useState } from 'react';
import { DocumentViewPanel } from './components/DocumentViewPanel';
import { MarketTabs } from './components/MarketTabs';

export function HouseViewResults({ navigate, onBack }: { navigate: any, onBack: any }) {
  const [activeView, setActiveView] = useState('full-view');
  const [showDocumentPanel, setShowDocumentPanel] = useState(false);

  // Sample document sections for the panel
  const documentSections = [
    {
      title: 'Market Outlook',
      content: 'The global equity markets are positioned for moderate growth in the coming quarters, supported by accommodative monetary policy and improving corporate earnings. Technology sector continues to lead with strong fundamentals, while emerging markets show signs of recovery following recent volatility.',
      category: 'House View',
    },
    {
      title: 'Investment Strategy',
      content: 'We recommend a balanced approach with 60% equities, 30% fixed income, and 10% alternatives. Within equities, favor quality growth stocks in technology and healthcare sectors. In fixed income, maintain duration neutral with focus on investment-grade corporate bonds.',
      category: 'Asset Allocation',
    },
    {
      title: 'Risk Assessment',
      content: 'Key risks to monitor include persistent inflation pressures, geopolitical tensions in Eastern Europe and Middle East, and potential central bank policy errors. Portfolio positioning includes hedges through options strategies and selective exposure to defensive sectors.',
      category: 'Risk Analysis',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      {/* Secondary Navigation - Tabs */}
      <MarketTabs currentTab="house-view" showHistory onHistoryClick={() => {}} />

      {/* Top Toolbar */}
      <div className="border-b border-[#1F2937] bg-[#0D1525] px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <div className="h-4 w-px bg-[#1F2937]"></div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveView('full-view')}
                className={`px-4 py-2 text-sm rounded transition-colors ${activeView === 'full-view' ? 'bg-[#1F2937] text-white font-bold' : 'text-[#9CA3AF] hover:text-white'}`}
              >
                Full View
              </button>
              <button 
                onClick={() => setActiveView('executive-summary')}
                className={`px-4 py-2 text-sm rounded transition-colors ${activeView === 'executive-summary' ? 'bg-[#1F2937] text-white font-bold' : 'text-[#9CA3AF] hover:text-white'}`}
              >
                Executive Summary
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
            <button className="px-3 py-1.5 bg-[#162033] hover:bg-[#1F2937] border border-[#1F2937] rounded text-xs flex items-center gap-2">
              <Download className="w-3 h-3" />
              Export PDF
            </button>
            <button className="px-3 py-1.5 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded text-xs flex items-center gap-2 font-bold shadow-lg shadow-blue-500/20">
              <Eye className="w-3 h-3" />
              Draft Email
            </button>
          </div>
        </div>
      </div>

      {/* Document View Panel */}
      <DocumentViewPanel
        isOpen={showDocumentPanel}
        onClose={() => setShowDocumentPanel(false)}
        sections={documentSections}
        source="House View"
      />

      <div className="flex">
        {/* Left Sidebar - Document Info & Metadata */}
        <div className="w-64 border-r border-[#1F2937] bg-[#0B1220] min-h-screen p-6">
          <div className="mb-6">
            <h3 className="text-xs font-bold text-[#6B7280] mb-3 uppercase tracking-wider">Analysis Info</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Generated:</span>
                <span className="text-white font-medium">Just now</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Mode:</span>
                <span className="text-white font-medium">Structured</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Documents:</span>
                <span className="text-white font-medium">15 sources</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Tone:</span>
                <span className="text-white font-medium">Professional</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-bold text-[#6B7280] mb-3 uppercase tracking-wider">Source Documents</h3>
            <div className="space-y-2">
              <SourceDoc icon="📊" name="CIO Commentary Q4" />
              <SourceDoc icon="📄" name="Investment Committee Notes" />
              <SourceDoc icon="📘" name="Market Outlook 2024" />
              <SourceDoc icon="📗" name="Portfolio Strategy" />
            </div>
          </div>

          <div className="p-4 bg-[#162033] border border-[#1F2937] rounded-lg">
            <h3 className="text-xs font-bold text-[#6B7280] mb-3 uppercase tracking-wider">Coverage Summary</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[#9CA3AF]">Asset Classes:</span>
                <span className="text-white font-bold">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9CA3AF]">Sectors:</span>
                <span className="text-white font-bold">11</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9CA3AF]">Themes:</span>
                <span className="text-[#22C55E] font-bold">6 Key Ideas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - Results */}
        <div className="flex-1 bg-[#0F1419] overflow-y-auto">
          <div className="p-8">
            {activeView === 'full-view' ? <FullView /> : <ExecutiveSummary />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Full View Component
function FullView() {
  return (
    <>
      {/* Page Title */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#3B82F6] rounded-lg w-12 h-12 flex items-center justify-center">
            <Building className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Q4 2024 House View</h1>
            <p className="text-sm text-[#9CA3AF]">Comprehensive Investment Perspective</p>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-[#3B82F6]/20 to-[#3B82F6]/5 border border-[#3B82F6]/30 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-[#3B82F6] rounded p-2">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Executive Summary</h2>
              <p className="text-sm text-[#E5E7EB] leading-relaxed">
                We maintain a cautiously optimistic stance on risk assets for Q4 2024, anchored by resilient economic fundamentals and easing monetary policy. Technology remains our highest-conviction overweight, driven by AI infrastructure buildout and productivity gains. We see selective opportunities in emerging markets while maintaining defensive positioning in fixed income through quality credit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Market Outlook */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
          Market Outlook
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <OutlookCard 
            title="Economic Growth"
            sentiment="positive"
            rating="Constructive"
            description="GDP growth expected to moderate to 2.1% but remain above trend. Labor market cooling without cracking."
          />
          <OutlookCard 
            title="Inflation"
            sentiment="neutral"
            rating="Stable"
            description="Core PCE trending toward 2.5% target. Last-mile disinflation remains challenging but achievable."
          />
          <OutlookCard 
            title="Monetary Policy"
            sentiment="positive"
            rating="Supportive"
            description="Fed expected to cut 50bps in Q4. Easing cycle underway supports equity valuations."
          />
        </div>
      </div>

      {/* Asset Class Views */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#3B82F6]" />
          Asset Class Views
        </h2>
        <div className="bg-[#0D1525] border border-[#1F2937] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#111827] border-b border-[#1F2937]">
                <th className="text-left px-6 py-3 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Asset Class</th>
                <th className="text-center px-6 py-3 text-xs font-bold text-[#6B7280] uppercase tracking-wider">View</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Rationale</th>
                <th className="text-center px-6 py-3 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Conviction</th>
              </tr>
            </thead>
            <tbody>
              <AssetClassRow 
                name="US Large Cap Equities"
                view="overweight"
                rationale="Strong earnings momentum, AI tailwinds, reasonable valuations"
                conviction="high"
              />
              <AssetClassRow 
                name="US Technology"
                view="overweight"
                rationale="AI infrastructure spending cycle just beginning, margin expansion"
                conviction="high"
              />
              <AssetClassRow 
                name="Emerging Markets"
                view="neutral"
                rationale="Selective opportunities offset by China headwinds"
                conviction="medium"
              />
              <AssetClassRow 
                name="Investment Grade Credit"
                view="overweight"
                rationale="Attractive spreads, benign default environment"
                conviction="medium"
              />
              <AssetClassRow 
                name="High Yield Bonds"
                view="neutral"
                rationale="Tight spreads limit upside, prefer quality over yield"
                conviction="low"
              />
              <AssetClassRow 
                name="Commodities"
                view="underweight"
                rationale="Weak China demand, ample supply conditions"
                conviction="medium"
              />
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Themes */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#3B82F6]" />
          Key Investment Themes
        </h2>
        <div className="space-y-4">
          <ThemeCard 
            number="1"
            title="AI Infrastructure Supercycle"
            description="The buildout of AI infrastructure represents a multi-year investment opportunity. Data center capacity, semiconductor demand, and cloud infrastructure spending are accelerating. We estimate $200B+ in annual capex through 2026."
            tags={["Technology", "Semiconductors", "Cloud"]}
          />
          <ThemeCard 
            number="2"
            title="Quality Over Cyclicality"
            description="As growth moderates, we favor companies with strong balance sheets, consistent cash flow, and pricing power. Quality factors outperform in late-cycle environments."
            tags={["Large Cap", "Healthcare", "Financials"]}
          />
          <ThemeCard 
            number="3"
            title="Fixed Income Normalization"
            description="With Fed cutting cycle underway, we're extending duration selectively. Investment grade credit offers attractive risk-adjusted returns with spreads above historical averages."
            tags={["Fixed Income", "Credit", "Duration"]}
          />
        </div>
      </div>

      {/* Risks */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
          Key Risks to Monitor
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <RiskCard 
            title="Geopolitical Tensions"
            level="medium"
            description="Escalation in Middle East or Taiwan Strait could trigger risk-off sentiment and disrupt supply chains."
          />
          <RiskCard 
            title="Sticky Inflation"
            level="medium"
            description="Services inflation remains elevated. Failure to reach 2% target could delay Fed cuts and pressure valuations."
          />
          <RiskCard 
            title="China Slowdown"
            level="high"
            description="Structural headwinds in property sector and weak consumer confidence pose global growth risks."
          />
          <RiskCard 
            title="AI Bubble Concerns"
            level="low"
            description="While valuations are elevated, we believe AI productivity gains justify premium multiples for leaders."
          />
        </div>
      </div>

      {/* Action Items */}
      <div>
        <div className="bg-[#162033] border border-[#1F2937] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#22C55E] rounded-lg w-10 h-10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold">Portfolio Actions</h2>
          </div>
          <div className="space-y-3">
            <ActionItem 
              action="Add to US Large Cap Technology exposure by 2-3%"
              priority="high"
            />
            <ActionItem 
              action="Trim Emerging Markets ex-China by 1%"
              priority="medium"
            />
            <ActionItem 
              action="Extend duration in Investment Grade Credit"
              priority="medium"
            />
            <ActionItem 
              action="Monitor Fed communications for policy clarity"
              priority="low"
            />
          </div>
        </div>
      </div>
    </>
  );
}

// Executive Summary Component
function ExecutiveSummary() {
  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Executive Summary</h1>
          <p className="text-sm text-[#9CA3AF]">Q4 2024 House View - Key Takeaways</p>
        </div>

        <div className="space-y-6">
          {/* Top 3 Views */}
          <div className="bg-[#0D1525] border border-[#1F2937] rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Top 3 Investment Views</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-[#22C55E] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-white">1</span>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Overweight US Technology</h3>
                  <p className="text-sm text-[#9CA3AF]">AI infrastructure spending cycle supports sustained earnings growth and margin expansion</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#22C55E] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-white">2</span>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Quality Factor Preference</h3>
                  <p className="text-sm text-[#9CA3AF]">Focus on strong balance sheets and consistent cash flow generation in late-cycle environment</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#22C55E] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-white">3</span>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Extend Duration Selectively</h3>
                  <p className="text-sm text-[#9CA3AF]">Fed cutting cycle creates opportunity in investment grade credit with attractive spreads</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#0D1525] border border-[#1F2937] rounded-lg p-4">
              <div className="text-2xl font-bold text-[#22C55E] mb-1">2.1%</div>
              <div className="text-xs text-[#6B7280]">Expected GDP Growth</div>
            </div>
            <div className="bg-[#0D1525] border border-[#1F2937] rounded-lg p-4">
              <div className="text-2xl font-bold text-[#3B82F6] mb-1">50bps</div>
              <div className="text-xs text-[#6B7280]">Fed Cuts Expected</div>
            </div>
            <div className="bg-[#0D1525] border border-[#1F2937] rounded-lg p-4">
              <div className="text-2xl font-bold text-[#EAB308] mb-1">2.5%</div>
              <div className="text-xs text-[#6B7280]">Core PCE Target</div>
            </div>
            <div className="bg-[#0D1525] border border-[#1F2937] rounded-lg p-4">
              <div className="text-2xl font-bold text-[#8B5CF6] mb-1">68%</div>
              <div className="text-xs text-[#6B7280]">Conviction Score</div>
            </div>
          </div>

          {/* One-Page Summary */}
          <div className="bg-[#0D1525] border border-[#1F2937] rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Portfolio Positioning Summary</h2>
            <div className="space-y-4 text-sm leading-relaxed text-[#E5E7EB]">
              <p>
                <strong className="text-white">Market Outlook:</strong> We maintain a constructive view on risk assets entering Q4 2024. The Fed's anticipated easing cycle, resilient economic growth, and moderating inflation create a supportive backdrop for equities. However, elevated valuations and geopolitical risks warrant selective positioning.
              </p>
              <p>
                <strong className="text-white">Key Overweights:</strong> Technology remains our highest conviction call, driven by the AI infrastructure buildout and productivity gains. We also favor investment grade credit as spreads remain attractive relative to default risk in a benign credit environment.
              </p>
              <p>
                <strong className="text-white">Risk Management:</strong> We're monitoring China's economic trajectory, Middle East tensions, and the final mile of disinflation. Our quality-focused approach and defensive hedges position us well for potential volatility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Helper Components
function SourceDoc({ icon, name }: { icon: string; name: string }) {
  return (
    <div className="flex items-center gap-2 text-xs p-2 bg-[#162033] rounded border border-[#1F2937]">
      <span>{icon}</span>
      <span className="text-[#E5E7EB] truncate">{name}</span>
    </div>
  );
}

function OutlookCard({ title, sentiment, rating, description }: { 
  title: string; 
  sentiment: 'positive' | 'neutral' | 'negative';
  rating: string;
  description: string;
}) {
  const colors = {
    positive: 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30',
    neutral: 'text-[#EAB308] bg-[#EAB308]/10 border-[#EAB308]/30',
    negative: 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/30'
  };

  return (
    <div className={`bg-[#0D1525] border rounded-xl p-4 ${colors[sentiment]}`}>
      <h3 className="font-bold mb-2">{title}</h3>
      <div className={`inline-block px-2 py-1 rounded text-xs font-bold mb-3 ${colors[sentiment]}`}>
        {rating}
      </div>
      <p className="text-xs text-[#9CA3AF] leading-relaxed">{description}</p>
    </div>
  );
}

function AssetClassRow({ name, view, rationale, conviction }: {
  name: string;
  view: 'overweight' | 'neutral' | 'underweight';
  rationale: string;
  conviction: 'high' | 'medium' | 'low';
}) {
  const viewColors = {
    overweight: 'bg-[#22C55E] text-white',
    neutral: 'bg-[#6B7280] text-white',
    underweight: 'bg-[#EF4444] text-white'
  };

  const convictionColors = {
    high: 'text-[#22C55E]',
    medium: 'text-[#EAB308]',
    low: 'text-[#6B7280]'
  };

  return (
    <tr className="border-b border-[#1F2937] hover:bg-[#111827] transition-colors">
      <td className="px-6 py-4 text-sm font-medium">{name}</td>
      <td className="px-6 py-4 text-center">
        <span className={`inline-block px-3 py-1 rounded text-xs font-bold uppercase ${viewColors[view]}`}>
          {view}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-[#9CA3AF]">{rationale}</td>
      <td className="px-6 py-4 text-center">
        <span className={`text-xs font-bold uppercase ${convictionColors[conviction]}`}>
          {conviction}
        </span>
      </td>
    </tr>
  );
}

function ThemeCard({ number, title, description, tags }: {
  number: string;
  title: string;
  description: string;
  tags: string[];
}) {
  return (
    <div className="bg-[#0D1525] border border-[#1F2937] rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="bg-[#3B82F6] rounded-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-bold text-white">{number}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-sm text-[#9CA3AF] leading-relaxed mb-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span key={i} className="px-2 py-1 bg-[#162033] border border-[#1F2937] rounded text-xs text-[#9CA3AF]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RiskCard({ title, level, description }: {
  title: string;
  level: 'high' | 'medium' | 'low';
  description: string;
}) {
  const colors = {
    high: 'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444]',
    medium: 'bg-[#EAB308]/10 border-[#EAB308]/30 text-[#EAB308]',
    low: 'bg-[#3B82F6]/10 border-[#3B82F6]/30 text-[#3B82F6]'
  };

  return (
    <div className={`bg-[#0D1525] border rounded-xl p-4 ${colors[level]}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold">{title}</h3>
        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${colors[level]}`}>
          {level}
        </span>
      </div>
      <p className="text-xs text-[#9CA3AF] leading-relaxed">{description}</p>
    </div>
  );
}

function ActionItem({ action, priority }: { action: string; priority: 'high' | 'medium' | 'low' }) {
  const colors = {
    high: 'bg-[#EF4444]',
    medium: 'bg-[#EAB308]',
    low: 'bg-[#3B82F6]'
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-[#0D1525] border border-[#1F2937] rounded-lg">
      <div className={`w-2 h-2 rounded-full ${colors[priority]}`}></div>
      <p className="text-sm flex-1">{action}</p>
      <span className="text-xs text-[#6B7280] uppercase">{priority}</span>
    </div>
  );
}