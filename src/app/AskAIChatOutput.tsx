import { ArrowLeft, Send, Paperclip, Mic, Image as ImageIcon, ChevronRight, ChevronLeft, Edit, Eye, Download, FileText, Share2, TrendingUp, Activity, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { createPortal } from 'react-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell } from 'recharts';

type CanvasBlock = {
  id: string;
  blockNumber: number;
  title: string;
  description: string;
};

// Mock data for Performance Attribution chart
const attributionData = [
  { sector: 'Technology', contribution: 2.8, color: '#3B82F6' },
  { sector: 'Healthcare', contribution: 1.5, color: '#22C55E' },
  { sector: 'Financials', contribution: 0.8, color: '#F59E0B' },
  { sector: 'Consumer', contribution: 0.5, color: '#8B5CF6' },
  { sector: 'Energy', contribution: -0.3, color: '#EF4444' },
];

export default function AskAIChatOutput() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [isCanvasOpen, setIsCanvasOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'ask-ai' | 'compare' | 'investment-thesis' | 'commentary' | 'historical-analysis' | 'documents'>('ask-ai');
  const [canvasBlocks, setCanvasBlocks] = useState<CanvasBlock[]>([
    { id: '1', blockNumber: 1, title: 'Market Context', description: 'The fourth quarter of 2024 presented a dynamic market environment...' },
    { id: '2', blockNumber: 2, title: 'Portfolio Performance', description: 'Your Growth Equity Portfolio delivered strong performance in Q4...' },
    { id: '3', blockNumber: 3, title: 'Investment Thesis', description: 'Our investment strategy remains focused on identifying high-quality...' },
    { id: '4', blockNumber: 4, title: 'Risk Perspective', description: 'While we remain optimistic about long-term prospects...' },
    { id: '5', blockNumber: 5, title: 'Closing Message', description: 'We appreciate your continued trust in our investment approach...' }
  ]);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  const suggestedQuestions = [
    "What are the top performing sectors this quarter?",
    "How does this compare to our benchmark?",
    "What are the key risks to monitor?",
    "Can you provide more details on the technology allocation?"
  ];

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'ask-ai' as const, label: 'ASK AI' },
    { id: 'commentary' as const, label: 'Commentary' },
    { id: 'compare' as const, label: 'compare' },
    { id: 'historical-analysis' as const, label: 'Historical analysis' },
    { id: 'fund' as const, label: 'Fund' },
    { id: 'canvas' as const, label: 'Canvas' },
  ];

  const handleTabChange = (tab: 'overview' | 'ask-ai' | 'compare' | 'investment-thesis' | 'commentary' | 'historical-analysis' | 'documents') => {
    setActiveTab(tab);
    navigate(`/insights?tab=${tab}`);
  };

  // Check for portal element availability
  useEffect(() => {
    const checkPortal = () => {
      const element = document.getElementById('insights-tabs-portal');
      if (element) {
        setPortalElement(element);
      }
    };
    
    checkPortal();
    const timer = setTimeout(checkPortal, 0);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen bg-[#0B1220]">
      {/* Render tabs into the Layout's top bar portal */}
      {portalElement && createPortal(
        <div className="flex items-center gap-2 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
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

      {/* Left: Chat Conversation Area */}
      <div className={`flex-1 transition-all duration-300 ${isCanvasOpen ? 'mr-0' : 'mr-0'} flex flex-col`}>
        {/* Header */}
        <div className="bg-[#111827] border-b border-[#1F2937] px-6 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/insights?tab=ask-ai')}
              className="text-[#9CA3AF] hover:text-white transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>
                Ask AI
              </h1>
              <p className="text-xs text-[#6B7280]">Get instant insights, analysis, and answers powered by AI</p>
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* User Question */}
          <div className="flex justify-end">
            <div className="bg-[#3B82F6] text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-2xl">
              <p className="text-sm">Can you provide a comprehensive analysis of our portfolio's performance in Q4 2024, including sector attribution and key insights?</p>
            </div>
          </div>

          {/* AI Response 1 - Technology Sector Strength */}
          <div className="flex justify-start">
            <div className="bg-[#111827] border border-[#1F2937] rounded-2xl rounded-tl-sm px-6 py-4 max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <span className="text-xs text-[#6B7280]">Just now</span>
              </div>
              
              <div className="text-sm text-white space-y-4">
                <div>
                  <h3 className="font-bold mb-2 text-[#3B82F6]">Technology Sector Strength</h3>
                  <p className="text-[#D1D5DB] leading-relaxed">
                    Your portfolio's technology holdings were the primary driver of outperformance in Q4 2024, contributing <span className="text-[#22C55E] font-semibold">+2.8%</span> to overall returns. This was driven by strong earnings from mega-cap technology companies and continued AI infrastructure investment trends.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold mb-2 text-[#22C55E]">Healthcare Innovation</h3>
                  <p className="text-[#D1D5DB] leading-relaxed">
                    Healthcare positions delivered solid gains of <span className="text-[#22C55E] font-semibold">+1.5%</span>, particularly in biotech and medical devices. The FDA approval pipeline remains robust, supporting continued momentum into 2025.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold mb-2 text-[#F59E0B]">Active Risk Management</h3>
                  <p className="text-[#D1D5DB] leading-relaxed">
                    Your tactical reduction in energy exposure helped avoid sector headwinds (<span className="text-[#EF4444] font-semibold">-0.3%</span> drag). This defensive positioning demonstrates effective risk management during volatile commodity markets.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Attribution Chart */}
          <div className="flex justify-start">
            <div className="bg-[#111827] border border-[#1F2937] rounded-2xl rounded-tl-sm px-6 py-4 max-w-3xl w-full">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-[#3B82F6]" />
                <h3 className="font-bold text-white text-sm" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>
                  Performance Attribution by Sector
                </h3>
              </div>
              
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={attributionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                  <XAxis type="number" stroke="#6B7280" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis dataKey="sector" type="category" stroke="#6B7280" tick={{ fill: '#9CA3AF', fontSize: 11 }} width={80} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value: number) => [`${value > 0 ? '+' : ''}${value}%`, 'Contribution']}
                  />
                  <Bar dataKey="contribution" radius={[0, 4, 4, 0]}>
                    {attributionData.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-4 pt-4 border-t border-[#1F2937]">
                <p className="text-xs text-[#9CA3AF]">
                  <span className="font-semibold text-white">Total Portfolio Contribution:</span> +5.3% | 
                  <span className="ml-2 text-[#22C55E]">Outperformance vs Benchmark: +1.8%</span>
                </p>
              </div>
            </div>
          </div>

          {/* AI Response 2 - Key Takeaways */}
          <div className="flex justify-start">
            <div className="bg-[#111827] border border-[#1F2937] rounded-2xl rounded-tl-sm px-6 py-4 max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <span className="text-xs text-[#6B7280]">Just now</span>
              </div>
              
              <div className="text-sm text-white space-y-3">
                <h3 className="font-bold mb-3">Key Takeaways & Recommendations</h3>
                
                <ul className="space-y-2 text-[#D1D5DB]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#3B82F6] mt-1">•</span>
                    <span>Continue overweight positioning in technology and healthcare sectors given strong fundamentals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#22C55E] mt-1">•</span>
                    <span>Monitor interest rate sensitivity as Fed policy evolves in 2025</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F59E0B] mt-1">•</span>
                    <span>Consider gradual rebalancing into cyclical sectors for diversification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B5CF6] mt-1">•</span>
                    <span>Maintain disciplined risk management given elevated market valuations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Suggested Questions */}
          <div className="space-y-3">
            <p className="text-xs text-[#6B7280] font-semibold">SUGGESTED QUESTIONS</p>
            <div className="grid grid-cols-2 gap-3">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  className="bg-[#111827] border border-[#1F2937] hover:border-[#3B82F6]/50 rounded-lg px-4 py-3 text-left text-sm text-[#D1D5DB] hover:text-white transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span>{question}</span>
                    <ChevronRight className="w-4 h-4 text-[#6B7280] group-hover:text-[#3B82F6] transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-[#111827] border-t border-[#1F2937] p-4">
          <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask a follow-up question..."
                className="flex-1 bg-transparent text-white placeholder-[#6B7280] focus:outline-none text-sm"
              />
              <button className="text-[#6B7280] hover:text-white transition-all">
                <Paperclip className="w-4 h-4" />
              </button>
              <button className="text-[#6B7280] hover:text-white transition-all">
                <Mic className="w-4 h-4" />
              </button>
              <button className="text-[#6B7280] hover:text-white transition-all">
                <ImageIcon className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
                Send
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Canvas Panel */}
      <div 
        className={`bg-[#111827] border-l border-[#1F2937] transition-all duration-300 flex flex-col relative ${
          isCanvasOpen ? 'w-80' : 'w-0'
        }`}
      >
        {/* Canvas Toggle Arrow - Always visible */}
        <button
          onClick={() => setIsCanvasOpen(!isCanvasOpen)}
          className="absolute -left-6 top-1/2 -translate-y-1/2 bg-[#162033] border border-[#1F2937] text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] p-2 rounded-md transition-all z-50 shadow-xl"
        >
          {isCanvasOpen ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* Canvas Content - Only visible when open */}
        {isCanvasOpen && (
          <>
            {/* Canvas Header */}
            <div className="p-4 border-b border-[#1F2937] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#3B82F6]" />
                <h3 className="font-bold text-white text-sm" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>
                  Canvas
                </h3>
              </div>
            </div>

            {/* Canvas Blocks */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {canvasBlocks.map((block) => (
                <div
                  key={block.id}
                  className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-4 hover:border-[#3B82F6]/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#6B7280]">#{block.blockNumber}</span>
                      <h4 className="text-sm font-bold text-white">{block.title}</h4>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-[#6B7280] hover:text-[#3B82F6] transition-colors p-1">
                        <Edit className="w-3 h-3" />
                      </button>
                      <button className="text-[#6B7280] hover:text-[#22C55E] transition-colors p-1">
                        <Eye className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-[#9CA3AF] line-clamp-2">{block.description}</p>
                </div>
              ))}

              {/* Add Block Button */}
              <button className="w-full bg-[#0B1220] border border-dashed border-[#374155] hover:border-[#3B82F6] rounded-lg p-4 text-[#6B7280] hover:text-[#3B82F6] transition-all flex items-center justify-center gap-2">
                <div className="w-5 h-5 rounded border border-current flex items-center justify-center">
                  <span className="text-xs">+</span>
                </div>
                <span className="text-xs font-semibold">Add Block</span>
              </button>
            </div>

            {/* Canvas Actions */}
            <div className="p-4 border-t border-[#1F2937] space-y-2">
              <button className="w-full bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg px-4 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all">
                <Download className="w-4 h-4" />
                Export Canvas
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-[#0B1220] hover:bg-[#1F2937] border border-[#1F2937] text-white rounded-lg px-3 py-2 text-xs font-semibold flex items-center justify-center gap-2 transition-all">
                  <Eye className="w-3.5 h-3.5" />
                  Preview
                </button>
                <button className="bg-[#0B1220] hover:bg-[#1F2937] border border-[#1F2937] text-white rounded-lg px-3 py-2 text-xs font-semibold flex items-center justify-center gap-2 transition-all">
                  <Share2 className="w-3.5 h-3.5" />
                  Share
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}