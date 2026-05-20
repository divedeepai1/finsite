import { GitCompare, Folder, Upload, HelpCircle, ArrowRight, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

interface CompareTabContentProps {
  inputValue: string;
  setInputValue: (value: string) => void;
}

export function CompareTabContent({ inputValue, setInputValue }: CompareTabContentProps) {
  const navigate = useNavigate();

  const handleStartComparison = () => {
    navigate('/compare-output');
  };

  return (
    <div className="flex h-[calc(100vh-180px)] bg-[#0B1220]">
      {/* Left Sidebar - Recent Comparisons */}
      <div className="w-[200px] bg-[#0F1621] border-r border-[#1E293B] p-5 flex-shrink-0">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#3B82F6]"></div>
            <h2 className="text-[11px] font-bold text-white uppercase tracking-wide" style={{ fontFamily: "'Oswald', sans-serif" }}>
              DOCUMENT COMPARISON
            </h2>
          </div>
          <p className="text-[10px] text-[#64748B] leading-relaxed">
            Analyze differences between document sets
          </p>
        </div>

        {/* Recent Comparisons Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></div>
            <h3 className="text-[10px] font-bold text-white uppercase tracking-wide" style={{ fontFamily: "'Oswald', sans-serif" }}>
              RECENT COMPARISONS
            </h3>
          </div>

          <div className="space-y-2">
            {/* Recent Comparison 1 */}
            <button className="w-full bg-[#0B1220] border border-[#1E293B] hover:border-[#3B82F6]/50 rounded-lg p-2.5 text-left transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold text-white group-hover:text-[#3B82F6] transition-colors mb-0.5">
                    Q3 vs Q4 Reports
                  </div>
                  <div className="text-[9px] text-[#64748B]">2 hours ago</div>
                </div>
                <ChevronRight className="w-3 h-3 text-[#475569] group-hover:text-[#3B82F6] transition-colors ml-2" />
              </div>
            </button>

            {/* Recent Comparison 2 */}
            <button className="w-full bg-[#0B1220] border border-[#1E293B] hover:border-[#3B82F6]/50 rounded-lg p-2.5 text-left transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold text-white group-hover:text-[#3B82F6] transition-colors mb-0.5">
                    Annual Statements
                  </div>
                  <div className="text-[9px] text-[#64748B]">Yesterday</div>
                </div>
                <ChevronRight className="w-3 h-3 text-[#475569] group-hover:text-[#3B82F6] transition-colors ml-2" />
              </div>
            </button>

            {/* Recent Comparison 3 */}
            <button className="w-full bg-[#0B1220] border border-[#1E293B] hover:border-[#3B82F6]/50 rounded-lg p-2.5 text-left transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold text-white group-hover:text-[#3B82F6] transition-colors mb-0.5">
                    Risk Assessments
                  </div>
                  <div className="text-[9px] text-[#64748B]">3 days ago</div>
                </div>
                <ChevronRight className="w-3 h-3 text-[#475569] group-hover:text-[#3B82F6] transition-colors ml-2" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center px-10 py-6">
        <div className="w-full max-w-4xl mt-20">
          {/* Hero Section */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center mb-5">
              <div className="bg-[#3B82F6] rounded-2xl w-16 h-16 flex items-center justify-center">
                <GitCompare className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
              COMPARE DOCUMENT SETS
            </h1>
            <p className="text-[#94A3B8] text-xs max-w-2xl mx-auto">
              Upload two sets of documents to identify differences, track changes, and generate comprehensive comparison reports
            </p>
          </div>

          {/* Upload Sections - Side by Side */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Upload Set A (Baseline) */}
            <div className="border-2 border-dashed border-[#1E293B] rounded-xl p-6 text-center hover:border-[#3B82F6]/50 transition-all cursor-pointer bg-[#0B1220]/50">
              <div className="flex flex-col items-center">
                <div className="relative mb-3">
                  <div className="w-14 h-14 bg-[#3B82F6] rounded-xl flex items-center justify-center">
                    <Folder className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#3B82F6] rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-[#0B1220]">
                    A
                  </div>
                </div>
                <h3 className="text-xs font-bold text-white mb-1.5">Upload Set A (Baseline)</h3>
                <p className="text-[10px] text-[#64748B] mb-3">Drop your baseline documents here or click to browse</p>
                
                <button className="px-4 py-1.5 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1.5 mb-2">
                  <Upload className="w-3 h-3" />
                  Browse Files
                </button>
                
                <p className="text-[9px] text-[#475569]">PDF, DOCX, TXT up to 50MB each</p>
              </div>
            </div>

            {/* Upload Set B (Compared) */}
            <div className="border-2 border-dashed border-[#1E293B] rounded-xl p-6 text-center hover:border-[#3B82F6]/50 transition-all cursor-pointer bg-[#0B1220]/50">
              <div className="flex flex-col items-center">
                <div className="relative mb-3">
                  <div className="w-14 h-14 bg-[#3B82F6] rounded-xl flex items-center justify-center">
                    <Folder className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#3B82F6] rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-[#0B1220]">
                    B
                  </div>
                </div>
                <h3 className="text-xs font-bold text-white mb-1.5">Upload Set B (Compared)</h3>
                <p className="text-[10px] text-[#64748B] mb-3">Drop your comparison documents here or click to browse</p>
                
                <button className="px-4 py-1.5 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1.5 mb-2">
                  <Upload className="w-3 h-3" />
                  Browse Files
                </button>
                
                <p className="text-[9px] text-[#475569]">PDF, DOCX, TXT up to 50MB each</p>
              </div>
            </div>
          </div>

          {/* Question Section */}
          <div className="bg-[#0F1621] border border-[#1E293B] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-[#3B82F6]" />
              <h3 className="text-xs font-bold text-white">What specific differences are you looking for?</h3>
            </div>

            <textarea
              placeholder="e.g., compare risk factors, identify changes in revenue projections, analyze shifts in strategic direction..."
              className="w-full bg-[#0B1220] border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-[#E2E8F0] placeholder-[#475569] focus:outline-none focus:border-[#3B82F6] min-h-[70px] resize-none mb-3"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#64748B] font-medium">Suggestions:</span>
                <button className="px-2.5 py-1 bg-[#0B1220] hover:bg-[#1E293B] border border-[#1E293B] text-white rounded-md text-[10px] font-medium transition-all">
                  Risk factors
                </button>
                <button className="px-2.5 py-1 bg-[#0B1220] hover:bg-[#1E293B] border border-[#1E293B] text-white rounded-md text-[10px] font-medium transition-all">
                  Financial metrics
                </button>
                <button className="px-2.5 py-1 bg-[#0B1220] hover:bg-[#1E293B] border border-[#1E293B] text-white rounded-md text-[10px] font-medium transition-all">
                  Strategic changes
                </button>
              </div>

              <button className="px-4 py-1.5 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-[#3B82F6]/20" onClick={handleStartComparison}>
                <ArrowRight className="w-3.5 h-3.5" />
                Start Comparison
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}