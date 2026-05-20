import { X, Send, Paperclip, Mic, MessageCircle, Sparkles, Clock, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface AskAISliderProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AskAISlider({ isOpen, onClose }: AskAISliderProps) {
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState<'market-analysis' | 'portfolio' | 'research' | 'risk'>('market-analysis');

  const quickTopics = [
    { id: 'market-analysis', label: 'Market Analysis' },
    { id: 'portfolio', label: 'Portfolio Strategy' },
    { id: 'research', label: 'Research' },
    { id: 'risk', label: 'Risk Assessment' },
  ];

  const suggestedQuestions = [
    'What are the current market trends?',
    'How should I rebalance my portfolio?',
    'What sectors are showing strength?',
    'What are the key risks right now?',
    'Analyze recent Fed policy changes',
    'Compare growth vs value stocks',
  ];

  const previousQuestions = [
    { question: 'What\'s driving the recent market volatility?', time: '2 min ago', answer: 'Market volatility has been driven by...' },
    { question: 'Should I be concerned about inflation trends?', time: '10 min ago', answer: 'Current inflation trends show...' },
    { question: 'How will Fed rate decisions impact equities?', time: '1 hour ago', answer: 'Federal Reserve rate decisions typically...' },
  ];

  const insightCards = [
    {
      title: 'Market Sentiment',
      value: 'Bullish',
      change: '+8%',
      trend: 'up',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Volatility Index',
      value: '16.2',
      change: '-12%',
      trend: 'down',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Top Performing Sector',
      value: 'Technology',
      change: '+15.3%',
      trend: 'up',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
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
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 rounded-lg p-2">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">AI Assistant</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Topics */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {quickTopics.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
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
            {/* AI Insights Cards */}
            <div>
              <h3 className="text-sm font-bold text-blue-400 uppercase mb-3">Current Market Insights</h3>
              <div className="grid grid-cols-3 gap-4">
                {insightCards.map((card, index) => (
                  <div key={index} className={`${card.bgColor} border border-gray-700 rounded-lg p-4`}>
                    <div className="text-xs text-gray-400 uppercase font-bold mb-2">{card.title}</div>
                    <div className={`text-2xl font-bold ${card.color} mb-1`}>{card.value}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <TrendingUp className={`w-3 h-3 ${card.trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
                      {card.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversation Area */}
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <h4 className="text-sm font-bold text-white">Ask Me Anything</h4>
              </div>

              {/* Previous Questions & Answers */}
              {previousQuestions.length > 0 && (
                <div className="space-y-4 mb-6">
                  {previousQuestions.map((item, index) => (
                    <div key={index} className="space-y-2">
                      {/* User Question */}
                      <div className="flex justify-end">
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-4 py-2 max-w-[80%]">
                          <p className="text-sm text-white">{item.question}</p>
                          <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                        </div>
                      </div>
                      {/* AI Answer */}
                      <div className="flex justify-start">
                        <div className="bg-[#0B1220] border border-gray-700 rounded-lg px-4 py-3 max-w-[80%]">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-bold text-blue-400">AI Response</span>
                          </div>
                          <p className="text-sm text-gray-300">{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Input Area */}
              <div className="relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question about markets, portfolio strategy, or investment research..."
                  className="w-full bg-[#0B1220] border border-gray-700 rounded-lg px-4 py-3 pr-32 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  rows={3}
                  maxLength={2000}
                />
                
                {/* Action Buttons */}
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Mic className="w-4 h-4" />
                  </button>
                </div>

                {/* Send Button */}
                <div className="absolute bottom-3 right-4 flex items-center gap-3">
                  <span className="text-xs text-gray-500">{inputValue.length}/2000</span>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 transition-all">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Key Market Updates */}
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
              <h4 className="text-sm font-bold text-blue-400 uppercase mb-4">Latest Market Updates</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-[#0B1220] border border-gray-700 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium mb-1">S&P 500 reaches new all-time high</p>
                    <p className="text-xs text-gray-400">Index closed at 5,892, up 1.2% driven by tech sector strength</p>
                    <span className="text-xs text-gray-500 mt-1 inline-block">5 min ago</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#0B1220] border border-gray-700 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium mb-1">Fed signals rate stability ahead</p>
                    <p className="text-xs text-gray-400">FOMC minutes indicate cautious approach to monetary policy</p>
                    <span className="text-xs text-gray-500 mt-1 inline-block">1 hour ago</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#0B1220] border border-gray-700 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium mb-1">Tech earnings exceed expectations</p>
                    <p className="text-xs text-gray-400">Major tech companies report strong Q1 results, AI investments paying off</p>
                    <span className="text-xs text-gray-500 mt-1 inline-block">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Suggested Questions */}
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-4 sticky top-24">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                Suggested Questions
              </h4>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(question)}
                    className="w-full text-left p-3 bg-[#0B1220] border border-gray-700 hover:border-blue-500/50 rounded-lg transition-all group"
                  >
                    <p className="text-xs text-gray-300 group-hover:text-white transition-colors">
                      {question}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-bold text-white mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg transition-all">
                  <p className="text-xs font-bold text-white mb-1">Market Summary</p>
                  <p className="text-xs text-blue-100">Get today's market overview</p>
                </button>
                <button className="w-full text-left p-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-lg transition-all">
                  <p className="text-xs font-bold text-white mb-1">Portfolio Analysis</p>
                  <p className="text-xs text-green-100">Review your allocations</p>
                </button>
                <button className="w-full text-left p-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-lg transition-all">
                  <p className="text-xs font-bold text-white mb-1">Research Reports</p>
                  <p className="text-xs text-purple-100">Access latest insights</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
