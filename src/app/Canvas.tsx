import { ArrowLeft, Download, Eye, Share2, FileText, CheckCircle2, AlertCircle, XCircle, AlertTriangle, Edit2, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

type CanvasSection = {
  description?: string;
  summaryCards?: Array<{ title: string; count: number }>;
  keyTopics?: Array<{ topic: string; value: string; status: string }>;
  keyDivergence?: {
    title: string;
    yourPortfolio: string;
    competitorsAvg: string;
    analyzed: string;
  };
  consensusViews?: string[];
};

type CanvasData = {
  blockId: string;
  blockTitle: string;
  sections: CanvasSection;
  sectionVisibility: {
    description: boolean;
    summaryCards: boolean;
    keyTopics: boolean;
    keyDivergence: boolean;
    consensusViews: boolean;
  };
  layoutType?: 'simple-text' | 'text-with-image' | 'two-column' | 'card-grid' | 'quote-block' | 'statistics';
  imageUrl?: string;
  timestamp: number;
};

export default function Canvas() {
  const navigate = useNavigate();
  const [canvasBlocks, setCanvasBlocks] = useState<CanvasData[]>([]);

  useEffect(() => {
    // Load all canvas blocks from sessionStorage
    const storedBlocks = sessionStorage.getItem('canvasBlocks');
    if (storedBlocks) {
      setCanvasBlocks(JSON.parse(storedBlocks));
    }
  }, []);

  const handleDeleteBlock = (timestamp: number) => {
    const updatedBlocks = canvasBlocks.filter(block => block.timestamp !== timestamp);
    setCanvasBlocks(updatedBlocks);
    sessionStorage.setItem('canvasBlocks', JSON.stringify(updatedBlocks));
  };

  if (canvasBlocks.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0B1220]">
        <div className="text-center">
          <FileText className="w-16 h-16 text-[#6B7280] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
            No Canvas Data
          </h2>
          <p className="text-sm text-[#9CA3AF] mb-4">
            Please add content from the Comparison page first.
          </p>
          <button
            onClick={() => navigate('/insights')}
            className="px-4 py-2 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg text-sm font-semibold transition-all"
          >
            Go to AI Insights
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#0B1220]">
      {/* Header */}
      <div className="bg-[#111827] border-b border-[#1F2937] px-6 py-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/compare-output')}
              className="text-[#9CA3AF] hover:text-white transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>
                Document Canvas
              </h1>
              <p className="text-sm text-[#9CA3AF]">Prepare and finalize your comparison analysis document</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-[#0B1220] hover:bg-[#1F2937] border border-[#1F2937] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button className="px-4 py-2 bg-[#0B1220] hover:bg-[#1F2937] border border-[#1F2937] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="px-4 py-2 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-[#6B7280]">
          <span>Block #3: Comparison</span>
          <span>•</span>
          <span>{canvasBlocks.length} blocks included</span>
          <span>•</span>
          <span>Last updated: Just now</span>
        </div>
      </div>

      {/* Canvas Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Document Title */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>
              COMPETITOR ANALYSIS
            </h2>
            <p className="text-sm text-[#9CA3AF]">Comparison Report • Block #3</p>
          </div>

          {/* Description Section */}
          {canvasBlocks.map((block) => {
            const { sections, sectionVisibility } = block;
            return (
              <div key={block.timestamp}>
                {sectionVisibility.description && sections.description && (
                  <div className="bg-[#111827] border border-[#1F2937] rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-[#1F2937] flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>
                        OVERVIEW
                      </h3>
                      <div className="flex items-center gap-2">
                        <button className="text-[#6B7280] hover:text-[#3B82F6] transition-colors p-1">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-[#6B7280] hover:text-[#EF4444] transition-colors p-1" onClick={() => handleDeleteBlock(block.timestamp)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="px-6 py-5">
                      <p className="text-sm text-[#D1D5DB] leading-relaxed">{sections.description}</p>
                    </div>
                  </div>
                )}

                {/* Summary Cards Section */}
                {sectionVisibility.summaryCards && sections.summaryCards && (
                  <div className="bg-[#111827] border border-[#1F2937] rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-[#1F2937] flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>
                        SUMMARY STATISTICS
                      </h3>
                      <div className="flex items-center gap-2">
                        <button className="text-[#6B7280] hover:text-[#3B82F6] transition-colors p-1">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-[#6B7280] hover:text-[#EF4444] transition-colors p-1" onClick={() => handleDeleteBlock(block.timestamp)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-3 gap-4">
                        {sections.summaryCards.map((card, index) => {
                          const colors = [
                            { bg: 'bg-[#22C55E]/10', border: 'border-[#22C55E]/30', text: 'text-[#22C55E]', icon: CheckCircle2 },
                            { bg: 'bg-[#F59E0B]/10', border: 'border-[#F59E0B]/30', text: 'text-[#F59E0B]', icon: AlertCircle },
                            { bg: 'bg-[#EF4444]/10', border: 'border-[#EF4444]/30', text: 'text-[#EF4444]', icon: XCircle }
                          ];
                          const color = colors[index] || colors[0];
                          const Icon = color.icon;

                          return (
                            <div key={index} className={`${color.bg} border ${color.border} rounded-lg p-4`}>
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <p className="text-xs text-[#9CA3AF] font-semibold mb-1">{card.title.toUpperCase()}</p>
                                  <p className={`text-3xl font-bold ${color.text}`}>{card.count}</p>
                                </div>
                                <div className={`${color.bg} p-2 rounded-lg`}>
                                  <Icon className={`w-5 h-5 ${color.text}`} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Topics Section */}
                {sectionVisibility.keyTopics && sections.keyTopics && sections.keyTopics.length > 0 && (
                  <div className="bg-[#111827] border border-[#1F2937] rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-[#1F2937] flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>
                        KEY TOPICS OVERVIEW
                      </h3>
                      <div className="flex items-center gap-2">
                        <button className="text-[#6B7280] hover:text-[#3B82F6] transition-colors p-1">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-[#6B7280] hover:text-[#EF4444] transition-colors p-1" onClick={() => handleDeleteBlock(block.timestamp)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        {sections.keyTopics.map((topic, index) => {
                          const statusColors = {
                            'Consensus': 'bg-[#22C55E]/20 text-[#22C55E]',
                            'Partial': 'bg-[#F59E0B]/20 text-[#F59E0B]',
                            'Divergence': 'bg-[#EF4444]/20 text-[#EF4444]',
                            '3/3': 'bg-[#22C55E]/20 text-[#22C55E]'
                          };
                          const statusColor = statusColors[topic.status as keyof typeof statusColors] || 'bg-[#6B7280]/20 text-[#6B7280]';

                          return (
                            <div key={index} className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-4 flex items-center justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-white mb-1">{topic.topic}</p>
                                <p className="text-xs text-[#9CA3AF]">Your View: {topic.value}</p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor}`}>
                                {topic.status}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Divergence Section */}
                {sectionVisibility.keyDivergence && sections.keyDivergence && (
                  <div className="bg-[#111827] border border-[#1F2937] rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-[#1F2937] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-[#EF4444]/20 p-1.5 rounded">
                          <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                        </div>
                        <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>
                          KEY DIVERGENCE
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-[#6B7280] hover:text-[#3B82F6] transition-colors p-1">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-[#6B7280] hover:text-[#EF4444] transition-colors p-1" onClick={() => handleDeleteBlock(block.timestamp)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="bg-[#EF4444]/5 border border-[#EF4444]/30 rounded-lg p-5">
                        <h4 className="text-base font-bold text-white mb-4">{sections.keyDivergence.title}</h4>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-4">
                            <p className="text-xs text-[#9CA3AF] uppercase font-semibold mb-2">Your Portfolio</p>
                            <p className="text-lg font-bold text-white">{sections.keyDivergence.yourPortfolio}</p>
                          </div>
                          <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-4">
                            <p className="text-xs text-[#9CA3AF] uppercase font-semibold mb-2">Competitors Avg</p>
                            <p className="text-lg font-bold text-white">{sections.keyDivergence.competitorsAvg}</p>
                          </div>
                        </div>
                        <p className="text-xs text-[#6B7280]">{sections.keyDivergence.analyzed}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Consensus Views Section */}
                {sectionVisibility.consensusViews && sections.consensusViews && sections.consensusViews.length > 0 && (
                  <div className="bg-[#111827] border border-[#1F2937] rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-[#1F2937] flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}>
                        CONSENSUS VIEWS
                      </h3>
                      <div className="flex items-center gap-2">
                        <button className="text-[#6B7280] hover:text-[#3B82F6] transition-colors p-1">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-[#6B7280] hover:text-[#EF4444] transition-colors p-1" onClick={() => handleDeleteBlock(block.timestamp)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        {sections.consensusViews.map((view, index) => (
                          <div key={index} className="bg-[#22C55E]/5 border border-[#22C55E]/30 rounded-lg p-4 flex items-start gap-3">
                            <div className="bg-[#22C55E]/20 p-2 rounded-lg flex-shrink-0">
                              <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-white">{view}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}