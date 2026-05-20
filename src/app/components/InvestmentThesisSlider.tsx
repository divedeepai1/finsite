import { X, Lightbulb, FileText, TrendingUp, Target, AlertCircle, MessageCircle, Send, TrendingDown, BarChart3, Zap, Factory, Battery } from 'lucide-react';
import { useState } from 'react';

interface InvestmentThesisSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InvestmentThesisSlider({ isOpen, onClose }: InvestmentThesisSliderProps) {
  const [targetAsset, setTargetAsset] = useState('');
  const [coreArgument, setCoreArgument] = useState('');
  const [supportingEvidence, setSupportingEvidence] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [activeTab, setActiveTab] = useState<'executive' | 'articulation'>('executive');
  const [chatMessage, setChatMessage] = useState('');

  if (!isOpen) return null;

  const handleGenerateThesis = () => {
    setShowOutput(true);
  };

  const handleBackToForm = () => {
    setShowOutput(false);
  };

  // Output View
  if (showOutput) {
    return (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
        
        {/* Slider */}
        <div className="fixed right-0 top-0 h-full w-[85vw] bg-[#0B1220] z-50 shadow-2xl overflow-y-auto flex">
          {/* Main Content */}
          <div className="flex-1 p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="bg-blue-500 rounded-lg p-2">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-white">Investment Thesis Output</h1>
                </div>
                <p className="text-sm text-gray-400 ml-11">Tesla Inc. (TSLA) · Generated Analysis</p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleBackToForm}
                  className="px-4 py-2 bg-[#111827] border border-gray-700 hover:border-gray-600 text-white text-sm font-medium rounded-lg transition-all"
                >
                  ← Back to Form
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab('executive')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'executive'
                    ? 'bg-blue-500 text-white'
                    : 'bg-[#111827] text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                <Lightbulb className="w-4 h-4" />
                Executive Summary
              </button>
              <button
                onClick={() => setActiveTab('articulation')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'articulation'
                    ? 'bg-blue-500 text-white'
                    : 'bg-[#111827] text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Articulation Matrix
              </button>
            </div>

            {/* Investment Recommendation */}
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <h2 className="text-lg font-bold text-white">Investment Recommendation</h2>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white font-bold text-sm px-4 py-2 rounded-lg">
                    BUY
                  </div>
                  <p className="text-sm text-gray-300 flex-1">
                    Tesla presents a compelling long-term investment opportunity driven by accelerating EV adoption, energy storage expansion, and autonomous driving technology advancement. The company's vertical integration and manufacturing scale provide sustainable competitive advantages in the rapidly growing electric vehicle market.
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Target Price (12M)</p>
                  <p className="text-2xl font-bold text-green-500">$385</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Upside Potential</p>
                  <p className="text-2xl font-bold text-green-500">+42%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Risk Rating</p>
                  <p className="text-2xl font-bold text-yellow-500">Medium-High</p>
                </div>
              </div>
            </div>

            {/* Key Investment Drivers */}
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-bold text-white">Key Investment Drivers</h2>
              </div>

              <div className="space-y-4">
                {/* Driver 1 */}
                <div className="bg-[#0B1220] border border-gray-800 rounded-lg p-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500 text-white font-bold text-sm w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white mb-2">Global EV Market Expansion</h3>
                      <p className="text-sm text-gray-400 mb-3">
                        Electric vehicle sales projected to grow at 25% CAGR through 2030, with Tesla maintaining its 20% global market share. Regulatory tailwinds from emission standards in EU, China, and California accelerating adoption timeline.
                      </p>
                      <div className="flex items-center gap-2 text-xs text-blue-400">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Source: IEA Global EV Outlook 2024</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Driver 2 */}
                <div className="bg-[#0B1220] border border-gray-800 rounded-lg p-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500 text-white font-bold text-sm w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white mb-2">Manufacturing Scale & Cost Leadership</h3>
                      <p className="text-sm text-gray-400 mb-3">
                        Gigafactory expansion in Texas and Berlin increasing to 2M+ annual production capacity by 2025. Structural battery pack innovation reducing production costs by 30% while improving range and performance.
                      </p>
                      <div className="flex items-center gap-2 text-xs text-blue-400">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Source: Tesla Q4 2023 Earnings Call</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Driver 3 */}
                <div className="bg-[#0B1220] border border-gray-800 rounded-lg p-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500 text-white font-bold text-sm w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white mb-2">Energy Storage & Services Revenue</h3>
                      <p className="text-sm text-gray-400 mb-3">
                        Powerwall deployments hitting 1 million units globally with backlog. Energy storage and services revenue growing 60% annually, providing high margin diversification beyond automotive sales.
                      </p>
                      <div className="flex items-center gap-2 text-xs text-blue-400">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Source: Bloomberg Energy Storage Forecast</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="w-[400px] bg-[#0D1525] border-l border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                  <h3 className="text-sm font-bold text-white">Chat about this Analysis</h3>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-400">Ask follow-up questions about this investment thesis</p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {/* AI Message */}
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-[#111827] border border-gray-800 rounded-lg p-3">
                    <p className="text-sm text-gray-300">
                      Hello! I'm here to help you explore this investment thesis in depth. You can ask me questions like:
                    </p>
                    <ul className="mt-3 space-y-2 text-xs text-gray-400">
                      <li>• "What are the biggest risks to this investment?"</li>
                      <li>• "How does Tesla compare to BYD?"</li>
                      <li>• "Explain the Liability Framework in detail"</li>
                    </ul>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">AI Assistant • Just now</p>
                </div>
              </div>

              {/* Example Question */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-xs font-semibold text-blue-400 mb-2">Ask a follow-up question about this thesis:</p>
                <div className="space-y-2">
                  <button className="w-full text-left text-xs text-gray-300 bg-[#0B1220] hover:bg-[#111827] border border-gray-800 hover:border-blue-500/50 rounded-lg p-2.5 transition-all">
                    "What's the biggest risk to Tesla's autonomous driving timeline?"
                  </button>
                  <button className="w-full text-left text-xs text-gray-300 bg-[#0B1220] hover:bg-[#111827] border border-gray-800 hover:border-blue-500/50 rounded-lg p-2.5 transition-all">
                    "How does regulatory approval uncertainty affect this thesis?"
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-[#0B1220] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-2.5 rounded-lg transition-all">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                Questions are scoped to this specific analysis
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Form View (original)
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Slider */}
      <div className="fixed right-0 top-0 h-full w-[85vw] bg-[#0B1220] z-50 shadow-2xl overflow-y-auto">
        <div className="p-8">
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-2xl mb-4">
              <Lightbulb className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Build Investment Thesis</h1>
            <p className="text-sm text-gray-400">
              Structure your investment ideas with guided form fields. No more confusion about how to articulate your thesis.
            </p>
          </div>

          {/* Main Form Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-8">
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-500 rounded-lg p-2.5">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Investment Details</h2>
                  <p className="text-sm text-gray-400">Complete the guided fields below to eliminate ambiguity and create a well-reasoned investment thesis.</p>
                </div>
              </div>

              {/* Target Asset / Company Field */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-blue-400" />
                  <label className="text-sm font-bold text-white">
                    Target Asset / Company <span className="text-red-400">*</span>
                  </label>
                </div>
                
                <input
                  type="text"
                  value={targetAsset}
                  onChange={(e) => setTargetAsset(e.target.value)}
                  placeholder="e.g., Tesla Inc. (TSLA), Bitcoin, Gold ETF"
                  className="w-full bg-[#0B1220] border border-blue-500/30 rounded-lg px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
                
                <div className="flex items-center gap-1.5 mt-2">
                  <AlertCircle className="w-3.5 h-3.5 text-gray-400" />
                  <p className="text-xs text-gray-400">Specify the exact asset, stock ticker, or instrument</p>
                </div>
              </div>

              {/* Core Argument / Catalyst Field */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <label className="text-sm font-bold text-white">
                    Core Argument / Catalyst <span className="text-red-400">*</span>
                  </label>
                </div>
                
                <textarea
                  value={coreArgument}
                  onChange={(e) => setCoreArgument(e.target.value)}
                  placeholder="Describe your main investment thesis and key catalysts that will drive returns..."
                  className="w-full bg-[#0B1220] border border-blue-500/30 rounded-lg px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                  rows={6}
                />
                
                <div className="mt-4 bg-[#0B1220]/80 border border-gray-800 rounded-lg p-5">
                  <div className="flex items-center gap-1.5 mb-3">
                    <AlertCircle className="w-4 h-4 text-blue-400" />
                    <p className="text-xs font-semibold text-blue-400">What's your primary investment rationale? What specific events or factors will drive value?</p>
                  </div>
                  
                  <div className="text-xs text-gray-400 space-y-1.5">
                    <p className="text-gray-300 font-semibold mb-2">Examples:</p>
                    <p>• New product launch expected to capture 25% market share</p>
                    <p>• Undervalued by 40% vs. industry peers with superior margins</p>
                    <p>• Regulatory approval will unlock $2B revenue opportunity</p>
                    <p>• Technical breakout with strong institutional accumulation</p>
                  </div>
                </div>
              </div>

              {/* Supporting Evidence Field */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <label className="text-sm font-bold text-white">
                    Supporting Evidence <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                  </label>
                </div>
                
                <textarea
                  value={supportingEvidence}
                  onChange={(e) => setSupportingEvidence(e.target.value)}
                  placeholder="Include data points, financial metrics, market research, or other evidence that supports your thesis..."
                  className="w-full bg-[#0B1220] border border-blue-500/30 rounded-lg px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                  rows={5}
                />
                
                <div className="flex items-center gap-1.5 mt-2">
                  <AlertCircle className="w-3.5 h-3.5 text-gray-400" />
                  <p className="text-xs text-gray-400">Add quantitative data, market trends, or research findings that validate your argument</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                <button className="text-sm text-gray-400 hover:text-white transition-colors font-medium">
                  Save as Draft
                </button>
                
                <div className="flex gap-3">
                  <button 
                    onClick={onClose}
                    className="px-6 py-2.5 bg-[#0B1220] border border-gray-700 hover:border-gray-600 text-white text-sm font-bold rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleGenerateThesis}
                    className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded-lg transition-all flex items-center gap-2"
                  >
                    <Lightbulb className="w-4 h-4" />
                    Generate Thesis
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