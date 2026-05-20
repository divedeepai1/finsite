import { MessageCircle, Zap, Upload as UploadIcon, Lightbulb, TrendingUp, LineChart, Wallet, Globe, Cpu, AlertTriangle, Eye, Clock, Paperclip, Link2, Mic, Send, ArrowRight } from 'lucide-react';
import { Building2 } from 'lucide-react';
import { useState } from 'react';
import { AskAISlider } from './components/AskAISlider';

export default function AskAI() {
  const [inputValue, setInputValue] = useState('');
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const commonTopics = [
    { icon: LineChart, title: 'Market Analysis', subtitle: 'Trends & forecasts', color: 'from-blue-600 to-purple-600' },
    { icon: Building2, title: 'Fed Policy', subtitle: 'Rates & decisions', color: 'from-teal-600 to-green-600' },
    { icon: Wallet, title: 'Portfolio Strategy', subtitle: 'Asset allocation', color: 'from-purple-600 to-purple-700' },
    { icon: Globe, title: 'Global Markets', subtitle: 'International view', color: 'from-orange-600 to-orange-700' },
    { icon: Cpu, title: 'Tech Sector', subtitle: 'AI & innovation', color: 'from-teal-600 to-teal-700' },
    { icon: AlertTriangle, title: 'Risk Analysis', subtitle: 'Scenarios & hedges', color: 'from-red-600 to-pink-600' },
  ];

  const popularQuestions = [
    { question: "What's driving the recent market volatility?", views: '2.4k', time: '2h ago' },
    { question: "Should I be concerned about inflation trends?", views: '1.8k', time: '5h ago' },
    { question: "How will Fed rate decisions impact equities?", views: '3.1k', time: '1d ago' },
  ];

  const exampleQuestions = [
    { icon: LineChart, text: 'Analyze current market trends' },
    { icon: Building2, text: 'Explain Fed policy impact' },
    { icon: Wallet, text: 'Suggest portfolio allocation' },
    { icon: Globe, text: 'Compare global markets' },
  ];

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-72 border-r border-[#1F2937] bg-[#0B1220] min-h-screen p-6">
          {/* AI Q&A Assistant Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-5 h-5 text-[#3B82F6]" />
              <h2 className="text-lg font-bold text-[#E5E7EB]">AI Q&A Assistant</h2>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Ask questions about markets, documents, or get expert insights
            </p>
          </div>

          {/* Common Topics */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-[#E5E7EB]">
                <span className="text-[#3B82F6]">●</span>
                Common Topics
              </h3>
              <button className="text-xs text-[#3B82F6] hover:text-[#60A5FA] font-semibold transition-colors">
                View All
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {commonTopics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <button
                    key={index}
                    className="p-3 rounded-xl bg-[#162033] border border-[#1F2937] hover:border-[#3B82F6]/30 transition-all duration-200 text-left hover:shadow-[inset_0_0_0_1px_rgba(59,130,246,0.1),0_0_24px_rgba(59,130,246,0.15)]"
                  >
                    <Icon className="w-5 h-5 mb-2 text-[#3B82F6]" />
                    <div className="text-xs font-semibold text-[#E5E7EB] mb-0.5">{topic.title}</div>
                    <div className="text-xs text-[#9CA3AF]">{topic.subtitle}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Popular Questions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-[#E5E7EB]">
                <span className="text-[#3B82F6]">●</span>
                Popular Questions
              </h3>
              <button className="text-xs text-[#3B82F6] hover:text-[#60A5FA] font-semibold transition-colors">
                Refresh
              </button>
            </div>

            <div className="space-y-2">
              {popularQuestions.map((item, index) => (
                <button
                  key={index}
                  className="w-full p-3 bg-[#162033] border border-[#1F2937] rounded-lg hover:border-[#374151] transition-all duration-200 text-left group"
                >
                  <div className="flex items-start gap-2">
                    <MessageCircle className="w-4 h-4 text-[#6B7280] mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#E5E7EB] group-hover:text-[#3B82F6] transition-colors">
                        {item.question}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-[#6B7280]">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {item.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-12">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="bg-[#3B82F6] rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-4 text-[#E5E7EB]">Q & A</h1>
                <p className="text-[#9CA3AF] max-w-2xl mx-auto">
                  Get instant insights on markets, analyze documents, or explore investment strategies with AI-powered assistance.
                </p>
              </div>

              {/* Main Ask AI Action Card */}
              <button 
                onClick={() => setIsSliderOpen(true)}
                className="w-full bg-[#111827] border border-gray-800 rounded-lg p-6 text-left hover:border-blue-500/50 transition-all group mb-8"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-500 rounded-lg p-3">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">Ask AI</h3>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">Ask questions about markets, strategies, or get expert insights powered by advanced AI</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                    Market analysis & trends
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                    Investment strategies
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                    Economic indicators
                  </div>
                </div>
                
                <div className="inline-block px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded text-[10px] text-blue-400 font-bold uppercase tracking-wide">
                  CLICK TO START
                </div>
              </button>

              {/* Example Questions */}
              <div className="bg-[#162033] border border-[#1F2937] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-[#3B82F6] rounded p-1.5">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-[#E5E7EB]">Try these questions</h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {exampleQuestions.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={index}
                        className="flex items-center gap-3 p-3 bg-[#111827] hover:bg-[#1C2A40] border border-[#1F2937] hover:border-[#374151] rounded-lg transition-all duration-200 text-left"
                      >
                        <Icon className="w-4 h-4 text-[#3B82F6] flex-shrink-0" />
                        <span className="text-xs text-[#E5E7EB]">{item.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Input Area */}
          <div className="border-t border-[#1F2937] bg-[#0B1220] p-6">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question or upload a document to analyze..."
                  className="w-full bg-[#111827] border border-[#1F2937] rounded-xl px-4 py-3 pr-32 text-sm text-[#E5E7EB] placeholder-[#6B7280] resize-none focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all duration-200"
                  rows={3}
                  maxLength={2000}
                />
                
                {/* Action Buttons */}
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <button className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors">
                    <Link2 className="w-5 h-5" />
                  </button>
                  <button className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors">
                    <Mic className="w-5 h-5" />
                  </button>
                </div>

                {/* Character Counter and Send */}
                <div className="absolute bottom-3 right-4 flex items-center gap-3">
                  <span className="text-xs text-[#6B7280]">{inputValue.length}/2000</span>
                  <button className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg p-2 transition-all duration-200 shadow-lg shadow-blue-500/20">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-[#6B7280] text-center mt-3 flex items-center justify-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                AI responses are generated based on available data and should be verified for critical decisions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ask AI Slider */}
      <AskAISlider isOpen={isSliderOpen} onClose={() => setIsSliderOpen(false)} />
    </div>
  );
}