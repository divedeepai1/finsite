import { useState } from 'react';
import { X, FolderOpen, GitCompare, Upload, ArrowRight, HelpCircle } from 'lucide-react';

interface CompareDocumentsSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CompareDocumentsSlider({ isOpen, onClose }: CompareDocumentsSliderProps) {
  const [analysisGoal, setAnalysisGoal] = useState('');

  if (!isOpen) return null;

  const recentComparisons = [
    { id: 1, title: 'Q3 vs Q4 Reports', time: '2 hours ago' },
    { id: 2, title: 'Annual Statements', time: 'Yesterday' },
    { id: 3, title: 'Risk Assessments', time: '3 days ago' },
  ];

  const suggestionChips = ['Risk factors', 'Financial metrics', 'Strategic changes'];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Slider */}
      <div className="fixed right-0 top-0 h-full w-[85vw] bg-[#0B1220] z-50 shadow-2xl overflow-y-auto">
        <div className="flex h-full">
          {/* Left Sidebar */}
          <div className="w-[280px] bg-[#0D1525] border-r border-gray-800 p-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <h2 className="text-sm font-bold text-white">Document Comparison</h2>
              </div>
              <p className="text-xs text-gray-400">Analyze differences between document sets</p>
            </div>

            {/* Recent Comparisons */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <h3 className="text-xs font-bold text-white">Recent Comparisons</h3>
              </div>

              <div className="space-y-2">
                {recentComparisons.map((comparison) => (
                  <button
                    key={comparison.id}
                    className="w-full bg-[#111827] border border-gray-800 hover:border-blue-500/50 rounded-lg p-3 text-left transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-white mb-1">{comparison.title}</div>
                        <div className="text-[10px] text-gray-400">{comparison.time}</div>
                      </div>
                      <div className="text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
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
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-2xl mb-4">
                <GitCompare className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Compare Document Sets</h1>
              <p className="text-sm text-gray-400 max-w-2xl mx-auto">
                Upload two sets of documents to identify differences, track changes, and generate comprehensive comparison reports
              </p>
            </div>

            {/* Upload Zones */}
            <div className="grid grid-cols-2 gap-6 mb-6 max-w-5xl mx-auto">
              {/* Set A - Baseline */}
              <div>
                <div className="border-2 border-dashed border-gray-700 hover:border-blue-500/50 rounded-lg p-8 text-center transition-all cursor-pointer bg-[#111827]/30 hover:bg-[#111827]/50">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-xl mb-4 relative">
                    <FolderOpen className="w-8 h-8 text-white" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-white">A</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">Upload Set A (Baseline)</h3>
                  <p className="text-xs text-gray-400 mb-4">Drop your baseline documents here or click to browse</p>
                  
                  <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 mx-auto">
                    <Upload className="w-4 h-4" />
                    Browse Files
                  </button>
                  
                  <p className="text-xs text-gray-500 mt-4">PDF, DOCX, TXT up to 50MB each</p>
                </div>
              </div>

              {/* Set B - Compared */}
              <div>
                <div className="border-2 border-dashed border-gray-700 hover:border-blue-500/50 rounded-lg p-8 text-center transition-all cursor-pointer bg-[#111827]/30 hover:bg-[#111827]/50">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-xl mb-4 relative">
                    <FolderOpen className="w-8 h-8 text-white" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-white">B</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">Upload Set B (Compared)</h3>
                  <p className="text-xs text-gray-400 mb-4">Drop your comparison documents here or click to browse</p>
                  
                  <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 mx-auto">
                    <Upload className="w-4 h-4" />
                    Browse Files
                  </button>
                  
                  <p className="text-xs text-gray-500 mt-4">PDF, DOCX, TXT up to 50MB each</p>
                </div>
              </div>
            </div>

            {/* Analysis Goal Section */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                  <h3 className="text-sm font-bold text-white">What specific differences are you looking for?</h3>
                </div>

                <textarea
                  value={analysisGoal}
                  onChange={(e) => setAnalysisGoal(e.target.value)}
                  placeholder="e.g., compare risk factors, identify changes in revenue projections, analyze shifts in strategic direction..."
                  className="w-full bg-[#0B1220] border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all mb-4"
                  rows={3}
                />

                {/* Suggestion Chips */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs text-gray-400">Suggestions:</span>
                  <div className="flex gap-2">
                    {suggestionChips.map((chip, index) => (
                      <button
                        key={index}
                        onClick={() => setAnalysisGoal(chip)}
                        className="px-3 py-1.5 bg-[#0B1220] border border-gray-700 hover:border-blue-500/50 rounded-lg text-xs text-gray-300 hover:text-white transition-all"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Start Button */}
                <div className="flex justify-end">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg transition-all flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    Start Comparison
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