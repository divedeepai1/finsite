import { ArrowLeft, Send, Paperclip, Mic, Image as ImageIcon, ChevronRight, ChevronLeft, Edit, Eye, Download, FileText, Share2, Plus, X, Check, AlertCircle, RefreshCw, CheckCircle, AlertTriangle, XCircle, MinusCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { createPortal } from 'react-dom';

type CanvasBlock = {
  id: string;
  blockNumber: number;
  title: string;
  description: string;
};

type SectionVisibility = {
  description: boolean;
  summaryCards: boolean;
  keyTopics: boolean;
  keyDivergence: boolean;
  consensusViews: boolean;
};

export default function CompareOutput() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [isCanvasOpen, setIsCanvasOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'ask-ai' | 'compare' | 'investment-thesis' | 'commentary' | 'historical-analysis' | 'documents'>('compare');
  const [canvasBlocks, setCanvasBlocks] = useState<CanvasBlock[]>([
    { id: '1', blockNumber: 1, title: 'Market Context', description: 'Block 1 • 227 words' },
    { id: '2', blockNumber: 2, title: 'Portfolio Performance', description: 'Block 2 • 312 words' },
    { id: '3', blockNumber: 3, title: 'Compare', description: 'Block 3 • Currently editing' },
    { id: '4', blockNumber: 4, title: 'Investment Thesis', description: 'Block 4 • 289 words' },
    { id: '5', blockNumber: 5, title: 'Risk Perspective', description: 'Block 5 • 98 words' },
    { id: '6', blockNumber: 6, title: 'Closing Message', description: 'Block 6 • 156 words' },
  ]);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const [expandedBlockId, setExpandedBlockId] = useState<string | null>(null);
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>({
    description: true,
    summaryCards: true,
    keyTopics: true,
    keyDivergence: true,
    consensusViews: true,
  });

  const suggestedQuestions = [
    "How do BlackRock and Vanguard differ on tech sector outlook?",
    "What are the consensus views across all sources?",
    "Show me the divergence on inflation expectations",
    "Compare allocation recommendations for equities"
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

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      console.log('Sending message:', inputValue);
      setInputValue('');
    }
  };

  const handleAddToCanvas = () => {
    const newBlock: CanvasBlock = {
      id: String(canvasBlocks.length + 1),
      blockNumber: canvasBlocks.length + 1,
      title: 'New Comparison Block',
      description: 'Updated comparison analysis with selected sections...'
    };
    setCanvasBlocks([...canvasBlocks, newBlock]);
    setExpandedBlockId(null);
  };

  const handleRemoveBlock = (blockId: string) => {
    setCanvasBlocks(canvasBlocks.filter(block => block.id !== blockId));
  };

  const canvasContent = (
    <div className="flex flex-col h-full">
      {/* Canvas Header */}
      <div className="px-4 py-3 border-b border-[#1F2937] flex items-center justify-between bg-[#0B1220]">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#3B82F6]" />
          <h3 className="font-['Oswald'] text-sm font-semibold text-white uppercase tracking-wider">Canvas</h3>
          <span className="px-2 py-0.5 bg-[#3B82F6]/20 text-[#3B82F6] text-xs font-bold rounded">
            {canvasBlocks.length}
          </span>
        </div>
        <button
          onClick={() => setIsCanvasOpen(false)}
          className="text-[#6B7280] hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Canvas Blocks */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {canvasBlocks.map((block) => (
          <div key={block.id}>
            {/* Canvas Block */}
            <div 
              className={`bg-[#111827] border rounded-lg p-3 transition-all ${
                expandedBlockId === block.id ? 'border-[#3B82F6]' : 'border-[#1F2937] hover:border-[#374151]'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-2 flex-1">
                  <span className="px-2 py-0.5 bg-[#3B82F6]/20 text-[#3B82F6] text-xs font-bold rounded">
                    #{block.blockNumber}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-['Oswald'] text-xs font-semibold text-white uppercase tracking-wider mb-1">
                      {block.title}
                    </h4>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">
                      {block.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveBlock(block.id)}
                  className="text-[#6B7280] hover:text-[#EF4444] transition-colors flex-shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#1F2937]">
                <button 
                  onClick={() => setExpandedBlockId(expandedBlockId === block.id ? null : block.id)}
                  className="px-3 py-1.5 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 border border-[#3B82F6]/30 text-[#3B82F6] rounded text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Edit className="w-3 h-3" />
                  {expandedBlockId === block.id ? 'Collapse' : 'Edit Sections'}
                </button>
                <button className="px-3 py-1.5 bg-[#0B1220] hover:bg-[#1F2937] border border-[#1F2937] text-[#9CA3AF] hover:text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-all">
                  <Eye className="w-3 h-3" />
                  Preview
                </button>
              </div>
            </div>

            {/* Inline Expansion for Block #3 (Comparison) */}
            {block.blockNumber === 3 && expandedBlockId === block.id && (
              <div className="mt-3 bg-[#0B1220] border border-[#22C55E]/30 rounded-lg p-4 space-y-4">
                {/* Description */}
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Competitor analysis comparing portfolios with institutional commentary from Goldman Sachs, JPMorgan, and BlackRock. Analysis covers 15 key topics including sector allocation, macroeconomic views, and investment positioning.
                </p>

                {/* Summary Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#111827] border border-[#22C55E]/30 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                    </div>
                    <p className="text-2xl font-bold text-[#22C55E] mb-1">6</p>
                    <p className="text-xs text-[#9CA3AF] mb-1">Full Agreement</p>
                    <p className="text-xs text-[#22C55E] font-semibold">3/3 (100%)</p>
                  </div>

                  <div className="bg-[#111827] border border-[#F59E0B]/30 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
                    </div>
                    <p className="text-2xl font-bold text-[#F59E0B] mb-1">3</p>
                    <p className="text-xs text-[#9CA3AF] mb-1">Partial Agreement</p>
                    <p className="text-xs text-[#F59E0B] font-semibold">1-2/3</p>
                  </div>

                  <div className="bg-[#111827] border border-[#EF4444]/30 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <XCircle className="w-5 h-5 text-[#EF4444]" />
                    </div>
                    <p className="text-2xl font-bold text-[#EF4444] mb-1">4</p>
                    <p className="text-xs text-[#9CA3AF] mb-1">Full Disagreement</p>
                    <p className="text-xs text-[#EF4444] font-semibold">0/3 (0%)</p>
                  </div>
                </div>

                {/* Key Topics Summary */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <h4 className="font-['Oswald'] text-xs font-semibold text-white uppercase tracking-wider">
                      Key Topics Summary
                    </h4>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 border-b border-[#1F2937]">
                      <span className="text-xs text-white">Technology Allocation</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#3B82F6] font-semibold">32.4%</span>
                        <span className="px-2 py-0.5 bg-[#F59E0B]/20 text-[#F59E0B] text-xs font-bold rounded">Partial</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-[#1F2937]">
                      <span className="text-xs text-white">Inflation Outlook</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#22C55E] font-semibold">Above 3%</span>
                        <span className="px-2 py-0.5 bg-[#22C55E]/20 text-[#22C55E] text-xs font-bold rounded">Consensus</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-[#1F2937]">
                      <span className="text-xs text-white">Emerging Markets</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#22C55E] font-semibold">Bullish</span>
                        <span className="px-2 py-0.5 bg-[#EF4444]/20 text-[#EF4444] text-xs font-bold rounded">Divergence</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-[#1F2937]">
                      <span className="text-xs text-white">Healthcare Defensive</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#3B82F6] font-semibold">18.6%</span>
                        <span className="px-2 py-0.5 bg-[#F59E0B]/20 text-[#F59E0B] text-xs font-bold rounded">Partial</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <span className="text-xs text-white">USD Strength</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#22C55E] font-semibold">Strong</span>
                        <span className="px-2 py-0.5 bg-[#22C55E]/20 text-[#22C55E] text-xs font-bold rounded">3/3</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Divergence */}
                <div className="bg-[#111827] border border-[#EF4444]/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-3.5 h-3.5 text-[#EF4444]" />
                    <h4 className="font-['Oswald'] text-xs font-semibold text-white uppercase tracking-wider">
                      Key Divergence: Technology Sector
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#0B1220] border border-[#22C55E]/30 rounded-lg p-2">
                      <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-1">Your Portfolio</p>
                      <p className="text-xl font-bold text-white mb-0.5">32.4%</p>
                      <p className="text-xs text-[#9CA3AF]">Overweight position</p>
                    </div>

                    <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-2">
                      <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-1">Competitors Avg</p>
                      <p className="text-xl font-bold text-white mb-0.5">28.4%</p>
                      <p className="text-xs text-[#9CA3AF]">More cautious</p>
                    </div>
                  </div>
                </div>

                {/* Footer Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-[#1F2937]">
                  <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                    <span>📊 15 topics analyzed</span>
                    <span>👥 3 competitors</span>
                  </div>
                  <span className="px-2 py-1 bg-[#6B7280]/20 text-[#6B7280] text-xs font-bold rounded">
                    Draft
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add New Block Button */}
        <button className="w-full bg-gradient-to-r from-[#22C55E] to-[#3B82F6] hover:from-[#16A34A] hover:to-[#2563EB] text-white rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg">
          <Plus className="w-4 h-4" />
          Add to Canvas
        </button>
      </div>

      {/* Canvas Footer */}
      <div className="border-t border-[#1F2937] bg-[#0B1220] space-y-3 p-4">
        {/* Canvas Actions */}
        <div>
          <h4 className="font-['Oswald'] text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">
            Canvas Actions
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <button className="px-3 py-2 bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-[#9CA3AF] hover:text-white rounded-lg text-xs font-semibold flex items-center justify-between transition-all">
              <span className="flex items-center gap-2">
                <Download className="w-3.5 h-3.5" />
                Export Canvas
              </span>
              <ChevronRight className="w-3 h-3" />
            </button>

            <button className="px-3 py-2 bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-[#9CA3AF] hover:text-white rounded-lg text-xs font-semibold flex items-center justify-between transition-all">
              <span className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5" />
                Preview Document
              </span>
              <ChevronRight className="w-3 h-3" />
            </button>

            <button className="px-3 py-2 bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-[#9CA3AF] hover:text-white rounded-lg text-xs font-semibold flex items-center justify-between transition-all">
              <span className="flex items-center gap-2">
                <Share2 className="w-3.5 h-3.5" />
                Share Canvas
              </span>
              <ChevronRight className="w-3 h-3" />
            </button>

            <button className="px-3 py-2 bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-[#9CA3AF] hover:text-white rounded-lg text-xs font-semibold flex items-center justify-between transition-all">
              <span className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                Generate PDF
              </span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Document Statistics */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-3.5 h-3.5 text-[#3B82F6]" />
            <h4 className="font-['Oswald'] text-xs font-semibold text-white uppercase tracking-wider">
              Document Statistics
            </h4>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div>
              <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-1">Total Blocks</p>
              <p className="text-2xl font-bold text-white">6</p>
            </div>

            <div>
              <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-1">Total Words</p>
              <p className="text-2xl font-bold text-white">1,402</p>
            </div>

            <div>
              <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-1">Read Time</p>
              <p className="text-2xl font-bold text-white">~7 min</p>
            </div>

            <div>
              <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-1">Drafts</p>
              <p className="text-2xl font-bold text-[#F59E0B]">2 Drafts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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

      {/* Main Content Area - Full Height */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Analysis Content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          isCanvasOpen 
            ? (expandedBlockId ? 'w-1/2' : 'flex-1') 
            : 'w-full'
        }`}>
          {/* Analysis Output */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Summary Metrics */}
            <div className="grid grid-cols-4 gap-4">
              {/* Full Agreement */}
              <div className="bg-[#111827] border border-[#22C55E]/30 rounded-lg p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider font-semibold">Full Agreement</p>
                  <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                </div>
                <p className="text-4xl font-bold text-[#22C55E] mb-2">6</p>
                <p className="text-xs text-[#9CA3AF] mb-1">All sources aligned</p>
                <p className="text-xs text-[#22C55E] font-semibold">3/3 (100%)</p>
              </div>

              {/* Partial Agreement */}
              <div className="bg-[#111827] border border-[#F59E0B]/30 rounded-lg p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider font-semibold">Partial Agreement</p>
                  <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <p className="text-4xl font-bold text-[#F59E0B] mb-2">3</p>
                <p className="text-xs text-[#9CA3AF] mb-1">Mixed views (1-2 aligned)</p>
                <p className="text-xs text-[#F59E0B] font-semibold">1-2/3</p>
              </div>

              {/* Full Disagreement */}
              <div className="bg-[#111827] border border-[#EF4444]/30 rounded-lg p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider font-semibold">Full Disagreement</p>
                  <XCircle className="w-5 h-5 text-[#EF4444]" />
                </div>
                <p className="text-4xl font-bold text-[#EF4444] mb-2">4</p>
                <p className="text-xs text-[#9CA3AF] mb-1">Opposite views held</p>
                <p className="text-xs text-[#EF4444] font-semibold">0/3 (0%)</p>
              </div>

              {/* No Coverage */}
              <div className="bg-[#111827] border border-[#6B7280]/30 rounded-lg p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider font-semibold">No Coverage</p>
                  <MinusCircle className="w-5 h-5 text-[#6B7280]" />
                </div>
                <p className="text-4xl font-bold text-[#6B7280] mb-2">2</p>
                <p className="text-xs text-[#9CA3AF] mb-1">Gaps in analysis</p>
                <p className="text-xs text-[#6B7280] font-semibold">2 total</p>
              </div>
            </div>

            {/* Detailed Consensus Matrix */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-6">
              <div className="mb-4">
                <h2 className="font-['Oswald'] text-lg font-bold text-white uppercase tracking-wider mb-1">
                  Detailed Consensus Matrix
                </h2>
                <p className="text-xs text-[#6B7280]">Topic-by-topic comparison across all sources</p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[#1F2937]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div>
                  <span className="text-xs text-[#9CA3AF]">Agreement</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#6B7280]"></div>
                  <span className="text-xs text-[#9CA3AF]">Neutral</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#EF4444]"></div>
                  <span className="text-xs text-[#9CA3AF]">Disagreement</span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1F2937]">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Topic</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Your Portfolio</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Goldman</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">JPMorgan</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">BlackRock</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Consensus</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#1F2937] hover:bg-[#0B1220] transition-colors">
                      <td className="py-3 px-4 text-white font-medium">Technology Allocation</td>
                      <td className="py-3 px-4 text-right text-[#9CA3AF]">32.4%</td>
                      <td className="py-3 px-4 text-right text-[#9CA3AF]">28.4%</td>
                      <td className="py-3 px-4 text-right text-[#9CA3AF]">30.5%</td>
                      <td className="py-3 px-4 text-right text-[#9CA3AF]">31.0%</td>
                      <td className="py-3 px-4 text-center">
                        <div className="w-2 h-2 rounded-full bg-[#F59E0B] mx-auto"></div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#1F2937] hover:bg-[#0B1220] transition-colors">
                      <td className="py-3 px-4 text-white font-medium">Inflation Outlook</td>
                      <td className="py-3 px-4 text-right text-[#9CA3AF]">Above 3%</td>
                      <td className="py-3 px-4 text-right text-[#9CA3AF]">Above 3%</td>
                      <td className="py-3 px-4 text-right text-[#9CA3AF]">Above 3%</td>
                      <td className="py-3 px-4 text-right text-[#9CA3AF]">Above 3%</td>
                      <td className="py-3 px-4 text-center">
                        <div className="w-2 h-2 rounded-full bg-[#22C55E] mx-auto"></div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#1F2937] hover:bg-[#0B1220] transition-colors">
                      <td className="py-3 px-4 text-white font-medium">Emerging Markets</td>
                      <td className="py-3 px-4 text-right text-[#9CA3AF]">Bullish</td>
                      <td className="py-3 px-4 text-right text-[#9CA3AF]">Bullish</td>
                      <td className="py-3 px-4 text-right text-[#9CA3AF]">Bullish</td>
                      <td className="py-3 px-4 text-right text-[#9CA3AF]">Bullish</td>
                      <td className="py-3 px-4 text-center">
                        <div className="w-2 h-2 rounded-full bg-[#22C55E] mx-auto"></div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#1F2937] hover:bg-[#0B1220] transition-colors">
                      <td className="py-3 px-4 text-white font-medium">Healthcare Defensive</td>
                      <td className="py-3 px-4 text-right text-[#9CA3AF]">18.2%</td>
                      <td className="py-3 px-4 text-right text-[#9CA3AF]">17.5%</td>
                      <td className="py-3 px-4 text-right text-[#9CA3AF]">18.0%</td>
                      <td className="py-3 px-4 text-right text-[#9CA3AF]">18.5%</td>
                      <td className="py-3 px-4 text-center">
                        <div className="w-2 h-2 rounded-full bg-[#F59E0B] mx-auto"></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Divergences */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-6">
              <div className="mb-4">
                <h3 className="font-['Oswald'] text-lg font-bold text-white uppercase tracking-wider mb-1">
                  Key Divergences
                </h3>
                <p className="text-xs text-[#6B7280]">Areas where your views significantly differ from competitors</p>
              </div>

              <div className="space-y-4">
                {/* Divergence 1 */}
                <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-white text-sm">Technology Sector Allocation</h4>
                    <span className="px-2 py-1 bg-[#EF4444]/20 text-[#EF4444] text-xs font-bold rounded uppercase">
                      High Divergence
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-3">
                      <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-2">Your Portfolio</p>
                      <p className="text-2xl font-bold text-white mb-1">32.4%</p>
                      <p className="text-xs text-[#9CA3AF]">Overweight positioning in tech</p>
                    </div>
                    <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-3">
                      <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-2">Competitors Avg</p>
                      <p className="text-2xl font-bold text-white mb-1">24.8%</p>
                      <p className="text-xs text-[#9CA3AF]">More conservative allocation</p>
                    </div>
                  </div>
                </div>

                {/* Divergence 2 */}
                <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-white text-sm">China Market Exposure</h4>
                    <span className="px-2 py-1 bg-[#EF4444]/20 text-[#EF4444] text-xs font-bold rounded uppercase">
                      High Divergence
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-3">
                      <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-2">Your Portfolio</p>
                      <p className="text-2xl font-bold text-white mb-1">Bearish</p>
                      <p className="text-xs text-[#9CA3AF]">Reduced exposure to 3%</p>
                    </div>
                    <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-3">
                      <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-2">Competitors Avg</p>
                      <p className="text-2xl font-bold text-white mb-1">Bullish</p>
                      <p className="text-xs text-[#9CA3AF]">Maintained ~12% exposure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Consensus Views */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-6">
              <div className="mb-4">
                <h3 className="font-['Oswald'] text-lg font-bold text-white uppercase tracking-wider mb-1">
                  Consensus Views
                </h3>
                <p className="text-xs text-[#6B7280]">Topics where all sources are in full alignment</p>
              </div>

              <div className="space-y-3">
                {/* Consensus Item 1 */}
                <div className="bg-[#0B1220] border border-[#22C55E]/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white text-sm">Persistent Inflation Above 3%</h4>
                    <span className="px-2 py-0.5 bg-[#22C55E]/20 text-[#22C55E] text-xs font-bold rounded">
                      4/4 AGREE
                    </span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    All sources expect inflation to remain elevated above 3% through 2026, driven by sticky services inflation and wage pressures. Central banks likely to maintain higher-for-longer stance.
                  </p>
                </div>

                {/* Consensus Item 2 */}
                <div className="bg-[#0B1220] border border-[#22C55E]/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white text-sm">US Dollar Strength Persists</h4>
                    <span className="px-2 py-0.5 bg-[#22C55E]/20 text-[#22C55E] text-xs font-bold rounded">
                      4/4 AGREE
                    </span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    Consensus view that USD will remain strong relative to major currencies given US economic resilience and rate differentials. Positive for US-based investors.
                  </p>
                </div>

                {/* Consensus Item 3 */}
                <div className="bg-[#0B1220] border border-[#22C55E]/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white text-sm">Energy Transition Acceleration</h4>
                    <span className="px-2 py-0.5 bg-[#22C55E]/20 text-[#22C55E] text-xs font-bold rounded">
                      4/4 AGREE
                    </span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    Strong agreement on continued acceleration of renewable energy adoption and infrastructure buildout. Overweight positioning in clean energy recommended.
                  </p>
                </div>
              </div>
            </div>

            {/* Suggested Questions */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-6">
              <div className="mb-4">
                <h3 className="font-['Oswald'] text-sm font-bold text-[#6B7280] uppercase tracking-wider">
                  Suggested Questions
                </h3>
              </div>

              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(question)}
                    className="w-full text-left px-4 py-3 bg-[#0B1220] hover:bg-[#1F2937] border border-[#1F2937] hover:border-[#374151] text-[#9CA3AF] hover:text-white rounded-lg text-sm transition-all"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Input Area */}
          <div className="border-t border-[#1F2937] bg-[#111827] p-4">
            {/* Input */}
            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center gap-2 bg-[#0B1220] border border-[#1F2937] rounded-lg px-4 py-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask a follow-up question..."
                  className="flex-1 bg-transparent text-white text-sm placeholder-[#6B7280] focus:outline-none"
                />
                <div className="flex items-center gap-2">
                  <button className="text-[#6B7280] hover:text-white transition-colors">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="text-[#6B7280] hover:text-white transition-colors">
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <button className="text-[#6B7280] hover:text-white transition-colors">
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                className="px-4 py-3 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Canvas */}
        {isCanvasOpen ? (
          <div className={`border-l border-[#1F2937] bg-[#0B1220] transition-all duration-300 ${
            expandedBlockId ? 'w-1/2' : 'w-96'
          }`} id="canvas-portal">
            {canvasContent}
          </div>
        ) : (
          <button
            onClick={() => setIsCanvasOpen(true)}
            className="w-12 border-l border-[#1F2937] bg-[#111827] hover:bg-[#1F2937] flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#6B7280]" />
          </button>
        )}
      </div>
    </div>
  );
}