import { X, TrendingUp, TrendingDown, Send, ArrowRight, Paperclip, Mic } from 'lucide-react';
import { useState } from 'react';

interface AssetClassSliderProps {
  isOpen: boolean;
  onClose: () => void;
  assetClass: 'equities' | 'bonds' | 'commodities' | 'alternatives' | 'real-estate' | 'cash';
}

export function AssetClassSlider({ isOpen, onClose, assetClass }: AssetClassSliderProps) {
  const [activeAssetTab, setActiveAssetTab] = useState<'equities' | 'bonds' | 'commodities' | 'alternatives' | 'real-estate' | 'cash'>(assetClass);
  const [activeSubTab, setActiveSubTab] = useState('developed-market');
  const [followUpQuestion, setFollowUpQuestion] = useState('');

  const assetTabs = [
    { id: 'equities', label: 'Equities' },
    { id: 'bonds', label: 'Bonds' },
    { id: 'commodities', label: 'Commodities' },
    { id: 'alternatives', label: 'Alternatives' },
    { id: 'real-estate', label: 'Real Estate' },
    { id: 'cash', label: 'Cash & Equivalents' },
  ];

  const equitySubTabs = [
    { id: 'developed-market', label: 'Developed Market' },
    { id: 'emerging-market', label: 'Emerging Market' },
    { id: 'small-cap', label: 'Small Cap' },
    { id: 'large-cap', label: 'Large Cap' },
    { id: 'growth', label: 'Growth' },
    { id: 'value', label: 'Value' },
  ];

  const performanceMetrics = [
    { label: 'YTD Return', value: '+12.4%', trend: 'up', color: 'text-green-400' },
    { label: 'Volatility', value: '18.2%', trend: 'down', color: 'text-blue-400' },
    { label: 'Sharpe Ratio', value: '1.45', trend: 'up', color: 'text-green-400' },
    { label: 'P/E Ratio', value: '22.3x', trend: 'neutral', color: 'text-gray-400' },
  ];

  const keyDrivers = [
    { label: 'Technology Sector Performance', value: 85, color: 'bg-blue-500' },
    { label: 'Interest Rate Environment', value: 65, color: 'bg-green-500' },
    { label: 'Corporate Earnings Growth', value: 72, color: 'bg-purple-500' },
    { label: 'Market Sentiment', value: 78, color: 'bg-orange-500' },
    { label: 'Valuation Levels', value: 58, color: 'bg-red-500' },
  ];

  const suggestedQuestions = [
    'Which sectors are driving the performance?',
    'How does this compare to emerging markets?',
    'What are the key risks to watch?',
    'Should I increase my allocation?',
  ];

  const previousQuestions = [
    { question: 'What are the top holdings?', time: '2 min ago' },
    { question: 'How has volatility changed?', time: '5 min ago' },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Slider */}
      <div className="fixed right-0 top-0 h-full w-[85vw] bg-[#0B1220] z-50 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#111827] border-b border-gray-800 p-6 z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Asset Class Analysis</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Asset Class Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {assetTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveAssetTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeAssetTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-[#0B1220] text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-[1fr_400px] gap-6 p-6">
          {/* Main Content Area */}
          <div className="space-y-6">
            {/* Sub Tabs for Equities */}
            {activeAssetTab === 'equities' && (
              <div className="bg-[#111827] border border-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {equitySubTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSubTab(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        activeSubTab === tab.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-[#0B1220] text-gray-400 hover:text-white border border-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Title */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {activeSubTab === 'developed-market' && 'Developed Market Equities Performance Analysis'}
              </h3>
              <p className="text-sm text-gray-400">
                Comprehensive analysis of developed market equity performance, trends, and outlook
              </p>
            </div>

            {/* Performance Metrics Grid */}
            <div className="grid grid-cols-4 gap-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="bg-[#111827] border border-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400 uppercase font-bold">{metric.label}</span>
                    {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
                    {metric.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400" />}
                  </div>
                  <div className={`text-2xl font-bold ${metric.color}`}>
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Executive Summary */}
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
              <h4 className="text-sm font-bold text-blue-400 uppercase mb-3">Executive Summary</h4>
              <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
                <p>
                  Developed market equities have demonstrated robust performance in 2026, posting a year-to-date return of 12.4%. 
                  This performance has been primarily driven by the technology sector, which continues to benefit from AI adoption 
                  and cloud infrastructure investment.
                </p>
                <p>
                  Market volatility has moderated to 18.2%, down from 22.1% in Q4 2025, suggesting improved investor confidence 
                  and market stability. The current Sharpe ratio of 1.45 indicates strong risk-adjusted returns relative to 
                  historical averages.
                </p>
                <p>
                  Valuations remain elevated with a P/E ratio of 22.3x, approximately 15% above the 10-year average. However, 
                  this premium appears justified by strong corporate earnings growth and the accommodative monetary policy stance 
                  expected in H2 2026.
                </p>
              </div>
            </div>

            {/* Key Performance Drivers */}
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
              <h4 className="text-sm font-bold text-blue-400 uppercase mb-4">Key Performance Drivers</h4>
              <div className="space-y-4">
                {keyDrivers.map((driver, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white font-medium">{driver.label}</span>
                      <span className="text-sm text-gray-400 font-bold">{driver.value}%</span>
                    </div>
                    <div className="w-full bg-[#0B1220] rounded-full h-2">
                      <div
                        className={`${driver.color} h-2 rounded-full transition-all`}
                        style={{ width: `${driver.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Breakdown */}
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
              <h4 className="text-sm font-bold text-blue-400 uppercase mb-4">Regional Breakdown</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#0B1220] border border-gray-700 rounded-lg p-4">
                  <div className="text-xs text-gray-400 uppercase font-bold mb-2">North America</div>
                  <div className="text-xl font-bold text-green-400 mb-1">+14.2%</div>
                  <div className="text-xs text-gray-500">YTD Return</div>
                </div>
                <div className="bg-[#0B1220] border border-gray-700 rounded-lg p-4">
                  <div className="text-xs text-gray-400 uppercase font-bold mb-2">Europe</div>
                  <div className="text-xl font-bold text-green-400 mb-1">+8.7%</div>
                  <div className="text-xs text-gray-500">YTD Return</div>
                </div>
                <div className="bg-[#0B1220] border border-gray-700 rounded-lg p-4">
                  <div className="text-xs text-gray-400 uppercase font-bold mb-2">Asia-Pacific</div>
                  <div className="text-xl font-bold text-green-400 mb-1">+11.3%</div>
                  <div className="text-xs text-gray-500">YTD Return</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Follow-up Questions */}
          <div className="space-y-4">
            {/* Follow-up Questions Header */}
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-bold text-white mb-3">Ask Follow-up Questions</h4>
              
              {/* Suggested Questions */}
              <div className="mb-4">
                <div className="text-xs text-gray-400 uppercase font-bold mb-2">Suggested Questions</div>
                <div className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setFollowUpQuestion(question)}
                      className="w-full text-left bg-[#0B1220] border border-gray-700 hover:border-blue-500/50 rounded-lg p-3 text-xs text-gray-300 hover:text-white transition-all group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span>{question}</span>
                        <ArrowRight className="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Previous Questions */}
              <div className="mb-4">
                <div className="text-xs text-gray-400 uppercase font-bold mb-2">Previous Questions</div>
                <div className="space-y-2">
                  {previousQuestions.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#0B1220] border border-gray-700 rounded-lg p-3"
                    >
                      <div className="text-xs text-white mb-1">{item.question}</div>
                      <div className="text-[10px] text-gray-500">{item.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input Field - Moved to bottom */}
              <div className="relative">
                <input
                  type="text"
                  value={followUpQuestion}
                  onChange={(e) => setFollowUpQuestion(e.target.value)}
                  placeholder="Type your question..."
                  className="w-full bg-[#0B1220] border border-gray-700 rounded-lg px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all pr-24"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Mic className="w-4 h-4" />
                  </button>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}