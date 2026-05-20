import { Send, Paperclip, Mic, Image as ImageIcon, Info, History as HistoryIcon, ChevronRight, ChevronLeft, Edit, Eye, Plus, Download, FileText, Share2 } from 'lucide-react';
import { useState } from 'react';

type CanvasBlock = {
  id: string;
  blockNumber: number;
  title: string;
  description: string;
};

export function GeneralChatWithCanvas() {
  const [inputValue, setInputValue] = useState('');
  const [isCanvasOpen, setIsCanvasOpen] = useState(true);
  const [canvasBlocks, setCanvasBlocks] = useState<CanvasBlock[]>([]);
  const [hasResponse, setHasResponse] = useState(false);

  const handleSend = () => {
    if (inputValue.trim()) {
      // Simulate AI response and generate canvas blocks
      setHasResponse(true);
      
      // Example: Auto-generate blocks based on query
      const mockBlocks: CanvasBlock[] = [
        { id: '1', blockNumber: 1, title: 'Market Context', description: 'The boom quarter of 2024 presented a dynamic market environment...' },
        { id: '2', blockNumber: 2, title: 'Portfolio Performance', description: 'Your Growth Equity Portfolio delivered strong performance in Q4...' },
        { id: '3', blockNumber: 3, title: 'Investment Thesis', description: 'Our investment strategy remains focused on identifying high-quality...' },
        { id: '4', blockNumber: 4, title: 'Risk Perspective', description: 'While we remain optimistic about long-term prospects...' },
        { id: '5', blockNumber: 5, title: 'Closing Message', description: 'We appreciate your continued trust in our investment approach...' }
      ];
      
      setCanvasBlocks(mockBlocks);
      setInputValue('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-180px)] bg-[#0B1220] relative">
      {/* Left: Chat Area */}
      <div className={`flex-1 transition-all duration-300 ${isCanvasOpen ? 'mr-80' : 'mr-0'}`}>
        <div className="h-full flex flex-col">
          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-8">
            {!hasResponse ? (
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
                        <ImageIcon className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={handleSend}
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
            ) : (
              /* Chat Conversation with AI Responses */
              <div className="space-y-6">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-[#3B82F6] rounded-2xl rounded-tr-sm px-5 py-3 max-w-2xl">
                    <p className="text-sm text-white">What's driving the recent performance in my Growth Equity Portfolio?</p>
                    <p className="text-xs text-blue-200 mt-2">You • 2 minutes ago</p>
                  </div>
                </div>

                {/* AI Message */}
                <div className="flex justify-start">
                  <div className="bg-[#111827] border border-[#1F2937] rounded-2xl rounded-tl-sm px-5 py-4 max-w-4xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-[#3B82F6] rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">AI</span>
                      </div>
                      <span className="text-xs text-[#94A3B8]">AI Assistant • Just now</span>
                    </div>

                    <p className="text-sm text-white mb-4 leading-relaxed italic text-[#94A3B8]">
                      Analyzing current market conditions and portfolio risks...
                    </p>

                    <p className="text-sm text-white mb-4 leading-relaxed">
                      Based on my analysis of your Growth Equity Portfolio, the recent strong performance is primarily driven by three key factors:
                    </p>

                    {/* Key Factors Cards */}
                    <div className="space-y-3 mb-4">
                      <div className="bg-[#0B1220] border-l-4 border-[#22C55E] rounded-lg p-4">
                        <h4 className="text-sm font-bold text-white mb-2">Technology Sector Strength (+3.2% contribution)</h4>
                        <p className="text-xs text-[#94A3B8]">Your overweight position in cloud infrastructure and AI-related stocks has benefited from strong enterprise adoption and positive earnings surprises.</p>
                      </div>

                      <div className="bg-[#0B1220] border-l-4 border-[#3B82F6] rounded-lg p-4">
                        <h4 className="text-sm font-bold text-white mb-2">Healthcare Innovation (+1.8% contribution)</h4>
                        <p className="text-xs text-[#94A3B8]">Biotech holdings saw significant gains following FDA approvals and positive clinical trial results in oncology therapeutics.</p>
                      </div>

                      <div className="bg-[#0B1220] border-l-4 border-[#A855F7] rounded-lg p-4">
                        <h4 className="text-sm font-bold text-white mb-2">Active Risk Management (+0.9% contribution)</h4>
                        <p className="text-xs text-[#94A3B8]">Defensive positioning and tactical rebalancing helped reduce drawdowns during volatile periods.</p>
                      </div>
                    </div>

                    <p className="text-sm text-white leading-relaxed">
                      Overall, your portfolio has outperformed the benchmark by 1.6% this quarter, with a Sharpe ratio of 1.42 indicating strong risk-adjusted returns.
                    </p>
                  </div>
                </div>

                {/* Suggested Questions */}
                <div className="mt-8">
                  <h4 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wide mb-3">Suggested Questions</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: '📊', label: 'Market Analysis', text: 'Analyze current S&P 500 trends' },
                      { icon: '🎯', label: 'Sector Insights', text: 'Compare tech vs healthcare sectors' },
                      { icon: '⚠️', label: 'Risk Assessment', text: 'Run portfolio stress test' },
                      { icon: '🔍', label: 'Stock Research', text: 'Deep dive on NVDA fundamentals' },
                      { icon: '💼', label: 'Portfolio Compare', text: 'Benchmark vs peer portfolios' },
                      { icon: '📈', label: 'News Impact', text: 'Latest Fed implications' },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        className="bg-[#111827] border border-[#1F2937] hover:border-[#3B82F6] rounded-lg p-3 text-left transition-all group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base">{item.icon}</span>
                          <span className="text-xs font-bold text-[#3B82F6]">{item.label}</span>
                        </div>
                        <p className="text-xs text-[#94A3B8] group-hover:text-white transition-all">{item.text}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input at bottom */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4 sticky bottom-0">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Ask anything about markets, portfolios, or investments..."
                      className="flex-1 bg-transparent border-none text-white placeholder-[#6B7280] focus:outline-none text-sm"
                    />
                    <div className="flex items-center gap-2">
                      <button className="text-[#6B7280] hover:text-white transition-all p-2">
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <button className="px-4 py-2 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
                        <Send className="w-4 h-4" />
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right: Canvas Panel */}
      <div className={`fixed right-0 top-0 h-full bg-[#0F1621] border-l border-[#1E293B] transition-all duration-300 ${isCanvasOpen ? 'w-80' : 'w-0'} overflow-hidden`}>
        <div className="h-full flex flex-col">
          {/* Canvas Header */}
          <div className="bg-[#111827] border-b border-[#1E293B] px-4 py-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>Canvas</h3>
            <button className="text-[#94A3B8] hover:text-white p-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>

          {/* Canvas Blocks */}
          <div className="flex-1 overflow-y-auto p-4">
            {canvasBlocks.length > 0 ? (
              <div className="space-y-3">
                {canvasBlocks.map((block) => (
                  <div key={block.id} className="bg-[#0B1220] border border-[#1E293B] rounded-lg p-3 hover:border-[#3B82F6]/50 transition-all group">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#162033] rounded flex items-center justify-center">
                          <span className="text-[10px] font-bold text-[#3B82F6]">{block.blockNumber}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>{block.title}</h4>
                      </div>
                      <span className="text-[9px] text-[#64748B] bg-[#162033] px-1.5 py-0.5 rounded">Block {block.blockNumber}</span>
                    </div>
                    <p className="text-[10px] text-[#94A3B8] mb-3 line-clamp-2">{block.description}</p>
                    <div className="flex items-center gap-2">
                      <button className="flex-1 bg-[#162033] hover:bg-[#1E293B] text-white text-[10px] font-semibold py-1.5 rounded transition-all flex items-center justify-center gap-1">
                        <Edit className="w-3 h-3" />
                        Edit
                      </button>
                      <button className="flex-1 bg-[#162033] hover:bg-[#1E293B] text-white text-[10px] font-semibold py-1.5 rounded transition-all flex items-center justify-center gap-1">
                        <Eye className="w-3 h-3" />
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-12 h-12 bg-[#162033] rounded-full flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-[#64748B]" />
                </div>
                <p className="text-xs text-[#94A3B8] mb-1">No blocks yet</p>
                <p className="text-[10px] text-[#64748B]">Ask AI a question to generate canvas blocks</p>
              </div>
            )}
          </div>

          {/* Canvas Actions */}
          {canvasBlocks.length > 0 && (
            <div className="border-t border-[#1E293B] p-4">
              <button className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold py-2.5 rounded-lg mb-3 flex items-center justify-center gap-2 transition-all">
                <Plus className="w-3.5 h-3.5" />
                Add Block
              </button>
              
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wide">Canvas Actions</h4>
                <button className="w-full bg-[#162033] hover:bg-[#1E293B] text-white text-[10px] font-semibold py-2 rounded-lg flex items-center justify-between transition-all group">
                  <div className="flex items-center gap-2">
                    <Download className="w-3 h-3" />
                    Export Canvas
                  </div>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button className="w-full bg-[#162033] hover:bg-[#1E293B] text-white text-[10px] font-semibold py-2 rounded-lg flex items-center justify-between transition-all group">
                  <div className="flex items-center gap-2">
                    <Eye className="w-3 h-3" />
                    Preview Document
                  </div>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button className="w-full bg-[#162033] hover:bg-[#1E293B] text-white text-[10px] font-semibold py-2 rounded-lg flex items-center justify-between transition-all group">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-3 h-3" />
                    Share Canvas
                  </div>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button for Canvas */}
      <button
        onClick={() => setIsCanvasOpen(!isCanvasOpen)}
        className={`fixed top-1/2 -translate-y-1/2 bg-[#3B82F6] hover:bg-[#60A5FA] text-white p-2 rounded-l-lg shadow-lg transition-all z-50 ${
          isCanvasOpen ? 'right-80' : 'right-0'
        }`}
        title={isCanvasOpen ? 'Close Canvas' : 'Open Canvas'}
      >
        {isCanvasOpen ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
