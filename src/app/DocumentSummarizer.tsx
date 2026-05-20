import { Upload, FileText, History, ChevronRight, Bold, Italic, Underline, List, ListOrdered, Link, ChevronDown, Search, Filter, BarChart3, Save, Sparkles, Lightbulb, TrendingUp, TrendingDown, DollarSign, Globe, Zap, Building2, Home, Bitcoin, Landmark, PieChart } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from './components/ui/button';
import { useState } from 'react';
import { DocumentViewPanel } from './components/DocumentViewPanel';

interface DocumentSummarizerProps {
  onDirectSave?: (title: string, content: any, source: string) => void;
}

export default function DocumentSummarizer({ onDirectSave }: DocumentSummarizerProps) {
  const navigate = useNavigate();
  const [showSummary, setShowSummary] = useState(false);

  if (showSummary) {
    return <SummaryView navigate={navigate} onBack={() => setShowSummary(false)} onDirectSave={onDirectSave} />;
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 border-r border-[#1F2937] bg-[#0B1220] min-h-screen p-6">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-[#3B82F6]" />
              <h2 className="text-lg font-bold text-[#E5E7EB]">Document Summarizer</h2>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Upload documents and select content to generate comprehensive summaries
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Upload className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-sm font-semibold text-[#E5E7EB]">Upload Document</h3>
            </div>
            
            <div className="border-2 border-dashed border-[#1F2937] rounded-lg p-6 text-center mb-4 hover:border-[#3B82F6] transition-colors cursor-pointer">
              <div className="bg-[#3B82F6] rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-[#E5E7EB] mb-2">Drag & drop your document here</p>
              <p className="text-xs text-[#6B7280] mb-3">or click to browse</p>
              <Button className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white text-xs px-4 py-2 shadow-lg shadow-blue-500/20 transition-all duration-200">
                <Upload className="w-3 h-3 mr-2" />
                Browse Files
              </Button>
            </div>
            <p className="text-xs text-[#6B7280]">Supported: PDF, DOCX, TXT, Markdown</p>
          </div>

          {/* Recent Documents */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#E5E7EB]">Recent Documents</h3>
              <button className="text-xs text-[#3B82F6] hover:text-[#60A5FA] font-semibold">View All</button>
            </div>
            
            <div className="space-y-2">
              <DocumentItem
                name="Goldman Sachs Q4 Outlook"
                time="12 hours ago"
                type="PDF"
              />
              <DocumentItem
                name="BlackRock Perspective 2024"
                time="2 days ago"
                type="DOCX"
              />
              <DocumentItem
                name="Investment Committee Notes"
                time="1 week ago"
                type="TXT"
              />
            </div>
          </div>

          {/* Content Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-bold">Content Selection</h3>
            </div>
            
            <button className="w-full bg-[#111827] hover:bg-gray-800 border border-gray-700 rounded-lg p-3 text-left flex items-center justify-between mb-4 transition-colors">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Entire Document</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>

            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold" onClick={() => setShowSummary(true)}>
              <FileText className="w-4 h-4 mr-2" />
              Generate Summary
            </Button>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <span className="text-red-400">⚠</span>
              Upload or select a document to continue
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="bg-blue-500 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Document Summarizer</h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Upload a document to get started. Select specific sections or summarize the entire document with AI-powered analysis.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              <FeatureCard
                icon="✏️"
                title="Selective Summarization"
                description="Choose specific sections to summarize"
                color="bg-[#111827]"
              />
              <FeatureCard
                icon="🤖"
                title="AI-Powered Analysis"
                description="Intelligent extraction of key insights"
                color="bg-[#111827]"
              />
              <FeatureCard
                icon="📄"
                title="Multiple Formats"
                description="Export in various formats"
                color="bg-[#111827]"
              />
            </div>

            {/* How It Works */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <Lightbulb className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-bold">How It Works</h2>
              </div>

              <div className="space-y-4">
                <Step
                  number="1"
                  title="Upload:"
                  description="Drag & drop or select your document (PDF, DOCX, TXT)"
                  color="bg-blue-500 text-white"
                />
                <Step
                  number="2"
                  title="Select:"
                  description="Choose entire document or specific sections to summarize"
                  color="bg-blue-500 text-white"
                />
                <Step
                  number="3"
                  title="Generate:"
                  description="AI creates a comprehensive summary with key insights"
                  color="bg-blue-500 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function DocumentItem({ name, time, type }: { name: string; time: string; type: string }) {
  return (
    <button className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded p-3 text-left transition-colors">
      <div className="flex items-start gap-2">
        <FileText className="w-4 h-4 text-cyan-400 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{name}</p>
          <p className="text-xs text-gray-500">{time} • {type}</p>
        </div>
      </div>
    </button>
  );
}

function FeatureCard({ icon, title, description, color }: { icon: string; title: string; description: string; color: string }) {
  return (
    <div className={`${color} border border-gray-800 rounded-xl p-6 text-center`}>
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-bold mb-2 text-sm">{title}</h3>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  );
}

function Step({ number, title, description, color }: { number: string; title: string; description: string; color: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className={`${color} rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold`}>
        {number}
      </div>
      <div>
        <p className="text-sm">
          <span className="font-bold">{title}</span> {description}
        </p>
      </div>
    </div>
  );
}

// Summary View Component
function SummaryView({ navigate, onBack, onDirectSave }: { navigate: any; onBack: any; onDirectSave?: (title: string, content: any, source: string) => void }) {
  const [showDocumentPanel, setShowDocumentPanel] = useState(false);

  const documentSections = [
    {
      title: 'Executive Summary',
      content: 'Portfolio outperformed benchmark by 350 basis points in Q3 2024, driven by exceptional stock selection (+2.4%) and strategic sector allocation (+1.5%). Disciplined investment approach and high-quality opportunity identification contributed to strong performance.',
      category: 'Summary',
    },
    {
      title: 'Performance Attribution Analysis',
      content: 'Stock Selection: +2.4%\nSector Allocation: +1.5%\nCurrency Impact: -0.3%\n\nThe portfolio benefited from overweight positions in technology and healthcare sectors, while defensive positioning in consumer staples moderated volatility during market corrections.',
      category: 'Analysis',
    },
    {
      title: 'Market Outlook & Strategy',
      content: 'Federal Reserve policy trajectory suggests a prolonged high-rate environment, favoring quality companies with strong balance sheets and consistent cash flow generation. We maintain cautiously optimistic stance with focus on secular AI growth trends and economic resilience indicators.',
      category: 'Outlook',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 border-r border-gray-800 bg-[#0B1120] min-h-screen p-6">
          <div className="mb-6">
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4" onClick={onBack}>
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>Back</span>
            </button>
            
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-bold">Document</h2>
            </div>
          </div>

          {/* Document Sections */}
          <div className="space-y-1 text-sm">
            <button className="w-full text-left py-2 px-3 rounded bg-blue-500 bg-opacity-10 text-blue-500 border-l-2 border-blue-500">
              Chief Investment Officer Commentary
            </button>
            <button className="w-full text-left py-2 px-3 text-gray-400 hover:text-white hover:bg-[#111827] rounded">
              Performance Attribution
            </button>
            <button className="w-full text-left py-2 px-3 text-gray-400 hover:text-white hover:bg-[#111827] rounded">
              Key Holdings Performance
            </button>
          </div>

          {/* Document Info */}
          <div className="mt-8 p-4 bg-[#111827] border border-gray-800 rounded-lg">
            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Document:</span>
                <span className="text-white">Q4 2024 Report</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pages:</span>
                <span className="text-white">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Created:</span>
                <span className="text-white">Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - Document Editor */}
        <div className="flex-1 flex flex-col bg-gray-950">
          {/* Document Editor Toolbar */}
          <div className="border-b border-gray-800 bg-[#0B1120] px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-[#111827] hover:bg-gray-800 border border-gray-700 rounded text-sm">
                  <FileText className="w-4 h-4" />
                  <span>Q4 Client Report Draft</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                <div className="flex items-center gap-1 border-l border-gray-700 pl-4">
                  <button className="p-2 hover:bg-gray-800 rounded" title="Bold">
                    <Bold className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-800 rounded" title="Italic">
                    <Italic className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-800 rounded" title="Underline">
                    <Underline className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1 border-l border-gray-700 pl-4">
                  <button className="p-2 hover:bg-gray-800 rounded" title="Bullet List">
                    <List className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-800 rounded" title="Numbered List">
                    <ListOrdered className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-800 rounded" title="Link">
                    <Link className="w-4 h-4" />
                  </button>
                </div>

                <button className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded text-sm flex items-center gap-2">
                  <span>Professional</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Assist</span>
                </button>
                <button 
                  className="px-3 py-1.5 bg-[#162033] hover:bg-[#1F2937] border border-blue-500/30 rounded text-xs flex items-center gap-2 text-blue-400 font-bold"
                  onClick={() => setShowDocumentPanel(true)}
                >
                  <FileText className="w-3 h-3" />
                  Document View
                </button>
                <button className="flex items-center gap-2 px-4 py-1.5 bg-gray-800 hover:bg-gray-700 rounded text-sm">
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>

          {/* Document Content */}
          <div className="flex-1 overflow-y-auto p-12">
            <div className="max-w-4xl mx-auto bg-[#111827] rounded-lg p-12 border border-gray-800">
              {/* Document Header */}
              <h1 className="text-3xl font-bold mb-8">Q4 2024 Portfolio Performance Update</h1>

              <p className="mb-6">Dear Valued Client,</p>

              <p className="mb-6 leading-relaxed">
                I'm pleased to share your portfolio's performance for Q3 2024. We outperformed the benchmark by 350 basis points, driven primarily by exceptional stock selection (+2.4%) and strategic sector allocation (+1.5%). The portfolio benefited from our disciplined investment approach and ability to identify high-quality opportunities in a challenging market environment.
              </p>

              {/* Performance Attribution Section */}
              <h2 className="text-xl font-bold mt-10 mb-6">Performance Attribution Breakdown</h2>

              <div className="space-y-4 mb-8">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Stock Selection</span>
                    <span className="text-sm text-blue-500 font-bold">+2.4%</span>
                  </div>
                  <div className="h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded" style={{width: '85%'}}></div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Sector Allocation</span>
                    <span className="text-sm text-blue-500 font-bold">+1.5%</span>
                  </div>
                  <div className="h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded" style={{width: '55%'}}></div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Currency Impact</span>
                    <span className="text-sm text-red-400 font-bold">-0.3%</span>
                  </div>
                  <div className="h-8 bg-gradient-to-r from-red-400 to-red-600 rounded" style={{width: '15%'}}></div>
                </div>
              </div>

              <p className="mb-6 leading-relaxed">
                Looking ahead, we maintain a cautiously optimistic stance. The Federal Reserve's policy trajectory suggests a prolonged high-rate environment, which we believe will favor quality companies with strong balance sheets and consistent cash flow generation.
              </p>

              {/* AI Generated Comparison Section */}
              <div className="mt-10 p-6 bg-blue-500 rounded-lg">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-white rounded p-1.5">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-2 text-white">AI-Generated Comparison</h3>
                    <p className="text-sm text-white leading-relaxed opacity-90">
                      While Competitor X's Q3 outlook emphasizes defensive positioning due to recession concerns, our insights suggest continued economic resilience. Employment remains strong, corporate earnings continue to beat expectations, and consumer spending demonstrates sustained strength, reinforcing our conviction in secular AI growth trends.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="px-3 py-1.5 bg-orange-500 text-white rounded font-medium">
                    📄 Competitor Outlook, p.15
                  </span>
                  <span className="px-3 py-1.5 bg-purple-600 text-white rounded font-medium">
                    📊 CIO Commentary, p.3
                  </span>
                </div>
              </div>

              {/* Timeline Section */}
              <div className="mt-16">
                <EventTimeline />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document View Panel */}
      <DocumentViewPanel 
        isOpen={showDocumentPanel}
        onClose={() => setShowDocumentPanel(false)}
        sections={documentSections}
        source="Document Summarizer"
        onDirectSave={onDirectSave}
      />
    </div>
  );
}

// Timeline Component
function EventTimeline() {
  const macroEvents = [
    { 
      date: 'Jan 2022', 
      label: 'Market Volatility Surge', 
      icon: TrendingDown, 
      color: 'bg-red-500',
      gradient: 'from-red-500 to-red-600',
      description: 'Global markets experienced heightened volatility amid geopolitical tensions',
      impact: 'High'
    },
    { 
      date: 'Mar 2022', 
      label: 'Fed Rate Hike Cycle', 
      icon: TrendingUp, 
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600',
      description: 'Federal Reserve initiated aggressive rate increases to combat inflation',
      impact: 'Critical'
    },
    { 
      date: 'May 2022', 
      label: 'Peak Inflation Period', 
      icon: DollarSign, 
      color: 'bg-amber-500',
      gradient: 'from-amber-500 to-amber-600',
      description: 'CPI reached 40-year highs affecting consumer spending patterns',
      impact: 'High'
    },
    { 
      date: 'Jul 2023', 
      label: 'Tech Sector Rally', 
      icon: Zap, 
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600',
      description: 'AI innovation drove significant gains in technology stocks',
      impact: 'Medium'
    },
    { 
      date: 'Sep 2023', 
      label: 'Strong Earnings Season', 
      icon: BarChart3, 
      color: 'bg-pink-500',
      gradient: 'from-pink-500 to-pink-600',
      description: 'Corporate earnings exceeded expectations across major sectors',
      impact: 'Medium'
    },
    { 
      date: 'Nov 2023', 
      label: 'Global Trade Tensions', 
      icon: Globe, 
      color: 'bg-cyan-500',
      gradient: 'from-cyan-500 to-cyan-600',
      description: 'Rising protectionism impacted international supply chains',
      impact: 'Medium'
    },
    { 
      date: 'Feb 2024', 
      label: 'Energy Market Shift', 
      icon: Zap, 
      color: 'bg-violet-500',
      gradient: 'from-violet-500 to-violet-600',
      description: 'Renewable energy investments accelerated global transition',
      impact: 'High'
    },
    { 
      date: 'Mar 2024', 
      label: 'AI Revolution Peak', 
      icon: Sparkles, 
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      description: 'Generative AI adoption reached mainstream enterprise markets',
      impact: 'Critical'
    },
  ];

  const assetEvents = [
    { 
      date: 'Jan 2023', 
      label: 'Global Equities', 
      icon: TrendingUp, 
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      description: 'Strong performance across developed markets',
      performance: '+12.4%'
    },
    { 
      date: 'Mar 2023', 
      label: 'Fixed Income', 
      icon: Landmark, 
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600',
      description: 'Yields stabilized creating buying opportunities',
      performance: '+5.2%'
    },
    { 
      date: 'May 2023', 
      label: 'Commodities Rally', 
      icon: DollarSign, 
      color: 'bg-yellow-500',
      gradient: 'from-yellow-500 to-yellow-600',
      description: 'Gold and energy sectors showed resilience',
      performance: '+8.7%'
    },
    { 
      date: 'Jul 2023', 
      label: 'Real Estate Recovery', 
      icon: Home, 
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600',
      description: 'REITs benefited from rate stabilization',
      performance: '+6.3%'
    },
    { 
      date: 'Sep 2023', 
      label: 'Digital Assets', 
      icon: Bitcoin, 
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600',
      description: 'Cryptocurrency market regained investor confidence',
      performance: '+22.1%'
    },
    { 
      date: 'Nov 2023', 
      label: 'Currency Markets', 
      icon: Globe, 
      color: 'bg-teal-500',
      gradient: 'from-teal-500 to-teal-600',
      description: 'Dollar strength moderated across G10 currencies',
      performance: '+3.5%'
    },
    { 
      date: 'Jan 2024', 
      label: 'Alternative Assets', 
      icon: PieChart, 
      color: 'bg-pink-500',
      gradient: 'from-pink-500 to-pink-600',
      description: 'Private credit and hedge funds attracted capital',
      performance: '+7.9%'
    },
    { 
      date: 'Mar 2024', 
      label: 'Private Equity', 
      icon: Building2, 
      color: 'bg-indigo-500',
      gradient: 'from-indigo-500 to-indigo-600',
      description: 'Exit activity improved with valuation recovery',
      performance: '+9.4%'
    },
  ];

  return (
    <div className="space-y-20">
      {/* Macro Timeline */}
      <div>
        <div className="mb-10 text-center">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-3">
            <h2 className="text-xl font-bold text-white">Macro Economic Timeline</h2>
          </div>
          <p className="text-sm text-gray-400">Key events shaping global financial markets</p>
        </div>
        <VerticalTimeline events={macroEvents} type="macro" />
      </div>

      {/* Asset Classes Timeline */}
      <div>
        <div className="mb-10 text-center">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-3">
            <h2 className="text-xl font-bold text-white">Asset Class Performance</h2>
          </div>
          <p className="text-sm text-gray-400">Investment category highlights and returns</p>
        </div>
        <VerticalTimeline events={assetEvents} type="asset" />
      </div>
    </div>
  );
}

function VerticalTimeline({ events, type }: { 
  events: Array<{ 
    date: string; 
    label: string; 
    icon: any; 
    color: string; 
    gradient: string;
    description: string; 
    impact?: string;
    performance?: string;
  }>, 
  type: 'macro' | 'asset' 
}) {
  return (
    <div className="relative">
      {/* Horizontal Timeline Line */}
      <div className="relative px-4">
        <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/40 to-blue-500/20"></div>
        
        {/* Timeline Events */}
        <div className="relative">
          <div className="flex gap-4 justify-between">
            {events.map((event, index) => {
              const Icon = event.icon;
              
              return (
                <div key={index} className="flex flex-col items-center flex-1 min-w-0">
                  {/* Event Card */}
                  <div className="group bg-[#0D1525] border border-gray-800 rounded-lg p-3 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 w-full mb-3">
                    {/* Date Badge */}
                    <div className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-2 bg-gradient-to-r ${event.gradient}`}>
                      <span className="text-white">{event.date}</span>
                    </div>
                    
                    {/* Event Title */}
                    <h3 className="text-xs font-bold mb-1.5 group-hover:text-blue-400 transition-colors line-clamp-2">{event.label}</h3>
                    
                    {/* Description */}
                    <p className="text-[10px] text-gray-400 mb-2 leading-relaxed line-clamp-2">{event.description}</p>
                    
                    {/* Impact/Performance Badge */}
                    {type === 'macro' && event.impact && (
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        event.impact === 'Critical' ? 'bg-red-500/20 text-red-400' : 
                        event.impact === 'High' ? 'bg-orange-500/20 text-orange-400' : 
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        <span className="w-1 h-1 rounded-full bg-current"></span>
                        {event.impact}
                      </div>
                    )}
                    
                    {type === 'asset' && event.performance && (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-green-500/20 text-green-400">
                        <TrendingUp className="w-2.5 h-2.5" />
                        {event.performance}
                      </div>
                    )}
                  </div>
                  
                  {/* Vertical connector line */}
                  <div className="h-4 w-px bg-gradient-to-b from-gray-700 to-transparent"></div>
                  
                  {/* Center Icon Circle */}
                  <div className={`bg-gradient-to-br ${event.gradient} rounded-full w-10 h-10 flex items-center justify-center shadow-lg ring-2 ring-[#0B1120] hover:scale-110 transition-transform duration-300 cursor-pointer relative z-10`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  
                  {/* Bottom connector line */}
                  <div className="h-3 w-px bg-gradient-to-t from-gray-700 to-transparent"></div>
                  
                  {/* Index number */}
                  <div className="mt-1.5 text-[10px] font-bold text-gray-500 bg-gray-800/50 rounded-full w-5 h-5 flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}