import { RefreshCw, ChevronRight, Upload, HelpCircle, ArrowRight, Folder, Send, Paperclip, Mic, Image, Info } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { ComparisonResults } from './ComparisonResults';

interface CompareProps {
  onDirectSave?: (title: string, content: any, source: string) => void;
}

export default function Compare({ onDirectSave }: CompareProps) {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [comparisonQuery, setComparisonQuery] = useState('');
  const [chatInput, setChatInput] = useState('');

  const handleStartComparison = () => {
    navigate('/compare-output');
  };

  // Recent comparisons data
  const recentComparisons = [
    { title: 'Q3 vs Q4 Reports', time: '2 hours ago' },
    { title: 'Annual Statements', time: 'Yesterday' },
    { title: 'Risk Assessments', time: '3 days ago' }
  ];

  if (showResults) {
    return <ComparisonResults navigate={navigate} onBack={() => setShowResults(false)} onOpenDocumentSlider={onDirectSave} />;
  }

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-gray-800 bg-[#0F1419] min-h-screen p-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
            DOCUMENT COMPARISON
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Analyze differences between document sets
          </p>
        </div>

        {/* Recent Comparisons */}
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
            Recent Comparisons
          </h3>
          <div className="space-y-2">
            {recentComparisons.map((comparison, index) => (
              <div
                key={index}
                className="p-3 bg-[#0B1220] border border-gray-800 rounded-lg hover:border-gray-700 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm text-white font-medium mb-1">{comparison.title}</h4>
                    <p className="text-xs text-gray-500">{comparison.time}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="bg-blue-500 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold mb-3 uppercase tracking-wide">COMPARE DOCUMENT SETS</h1>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm">
                Upload two sets of documents to identify differences, track changes, and generate comprehensive comparison reports
              </p>
            </div>

            {/* Upload Boxes */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Upload Set A (Baseline) */}
              <div className="bg-[#0F1419] border-2 border-dashed border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all cursor-pointer group">
                <div className="text-center">
                  {/* Folder Icon with A Badge */}
                  <div className="relative inline-block mb-3">
                    <div className="bg-blue-500 bg-opacity-10 rounded-xl w-14 h-14 flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                      <Folder className="w-7 h-7 text-blue-500" />
                    </div>
                    <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">A</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-white mb-2 text-sm">Upload Set A (Baseline)</h3>
                  <p className="text-xs text-gray-400 mb-4">
                    Drop your baseline documents here or click to browse
                  </p>
                  
                  <button className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5" />
                    Browse Files
                  </button>
                  
                  <p className="text-xs text-gray-500 mt-3">
                    PDF, DOCX, TXT up to 50MB each
                  </p>
                </div>
              </div>

              {/* Upload Set B (Compared) */}
              <div className="bg-[#0F1419] border-2 border-dashed border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all cursor-pointer group">
                <div className="text-center">
                  {/* Folder Icon with B Badge */}
                  <div className="relative inline-block mb-3">
                    <div className="bg-blue-500 bg-opacity-10 rounded-xl w-14 h-14 flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                      <Folder className="w-7 h-7 text-blue-500" />
                    </div>
                    <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">B</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-white mb-2 text-sm">Upload Set B (Compared)</h3>
                  <p className="text-xs text-gray-400 mb-4">
                    Drop your comparison documents here or click to browse
                  </p>
                  
                  <button className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5" />
                    Browse Files
                  </button>
                  
                  <p className="text-xs text-gray-500 mt-3">
                    PDF, DOCX, TXT up to 50MB each
                  </p>
                </div>
              </div>
            </div>

            {/* Question Prompt Section - Compact */}
            <div className="bg-[#0F1419] border border-gray-700 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500 bg-opacity-10 rounded-lg w-7 h-7 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-blue-500" />
                </div>
                <h3 className="font-bold text-white text-sm">What specific differences are you looking for?</h3>
              </div>

              <textarea
                value={comparisonQuery}
                onChange={(e) => setComparisonQuery(e.target.value)}
                placeholder="e.g., compare risk factors, identify changes in revenue projections, analyze shifts in strategic direction..."
                className="w-full bg-[#0B1220] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 min-h-[80px] resize-none mb-4"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-medium">Suggestions:</span>
                  <button 
                    onClick={() => setComparisonQuery('Compare risk factors between the two document sets')}
                    className="px-3 py-1.5 bg-[#162033] hover:bg-[#1C2A40] border border-gray-700 text-white rounded-lg text-xs font-medium transition-all"
                  >
                    Risk factors
                  </button>
                  <button 
                    onClick={() => setComparisonQuery('Identify changes in financial metrics and projections')}
                    className="px-3 py-1.5 bg-[#162033] hover:bg-[#1C2A40] border border-gray-700 text-white rounded-lg text-xs font-medium transition-all"
                  >
                    Financial metrics
                  </button>
                  <button 
                    onClick={() => setComparisonQuery('Analyze shifts in strategic direction and priorities')}
                    className="px-3 py-1.5 bg-[#162033] hover:bg-[#1C2A40] border border-gray-700 text-white rounded-lg text-xs font-medium transition-all"
                  >
                    Strategic changes
                  </button>
                </div>

                <button 
                  onClick={handleStartComparison}
                  className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  <ArrowRight className="w-4 h-4" />
                  Start Comparison
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Command Prompt - Fixed at Bottom */}
        <div className="border-t border-gray-800 bg-[#0B1220] p-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me anything about document comparison, analysis methods, or need help with your comparison..."
                className="w-full bg-transparent border-none text-white placeholder-[#6B7280] focus:outline-none resize-none h-16 text-sm"
              />
              
              <div className="flex items-center justify-between pt-3 border-t border-[#1F2937] mt-3">
                <div className="flex items-center gap-3">
                  <button className="text-[#6B7280] hover:text-white transition-all" title="Attach file">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="text-[#6B7280] hover:text-white transition-all" title="Voice input">
                    <Mic className="w-4 h-4" />
                  </button>
                  <button className="text-[#6B7280] hover:text-white transition-all" title="Upload image">
                    <Image className="w-4 h-4" />
                  </button>
                  <div className="ml-2 flex items-center gap-2 text-xs text-[#6B7280]">
                    <Info className="w-3 h-3" />
                    <span>Your conversations are encrypted and secure</span>
                  </div>
                </div>
                
                <button className="px-5 py-2 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
                  Send
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}