import { useState } from 'react';
import { X, FileText, Clock, FileDown, Cloud, Target, TrendingUp, DollarSign, Lightbulb, BarChart3 } from 'lucide-react';

interface SummarizeDocumentsSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SummarizeDocumentsSlider({ isOpen, onClose }: SummarizeDocumentsSliderProps) {
  const [focusTopic, setFocusTopic] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  if (!isOpen) return null;

  const recentSummaries = [
    { id: 1, title: 'Q3 2024 Earnings Report', pages: 24, time: '2h ago', color: 'bg-green-500', icon: FileText },
    { id: 2, title: 'Market Analysis Report', pages: 18, time: '5h ago', color: 'bg-teal-500', icon: FileText },
    { id: 3, title: 'ESG Sustainability Report', pages: 32, time: '1d ago', color: 'bg-purple-500', icon: FileText },
    { id: 4, title: 'Risk Assessment Document', pages: 45, time: '2d ago', color: 'bg-pink-500', icon: FileText },
    { id: 5, title: 'Annual Financial Statement', pages: 68, time: '3d ago', color: 'bg-orange-500', icon: FileText },
  ];

  const quickTopics = [
    { id: 'risk', label: 'Risk Factors', icon: Target },
    { id: 'esg', label: 'ESG Performance', icon: TrendingUp },
    { id: 'financial', label: 'Financial Metrics', icon: DollarSign },
    { id: 'opportunities', label: 'Key Opportunities', icon: Lightbulb },
    { id: 'trends', label: 'Market Trends', icon: BarChart3 },
  ];

  const toggleTopic = (topicId: string) => {
    if (selectedTopics.includes(topicId)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topicId));
    } else {
      setSelectedTopics([...selectedTopics, topicId]);
    }
  };

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
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                <h2 className="text-sm font-bold text-white">Document Summaries</h2>
              </div>
              <p className="text-xs text-gray-400">Upload documents for AI-powered analysis and insights</p>
            </div>

            {/* Recent Summaries */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                  <h3 className="text-xs font-bold text-white">Recent Summaries</h3>
                </div>
                <button className="text-xs text-teal-400 hover:text-teal-300 transition-colors">View All</button>
              </div>

              <div className="space-y-2">
                {recentSummaries.map((summary) => {
                  const Icon = summary.icon;
                  return (
                    <button
                      key={summary.id}
                      className="w-full bg-[#111827] border border-gray-800 hover:border-teal-500/50 rounded-lg p-3 text-left transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`${summary.color} p-2 rounded-lg flex-shrink-0`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-white mb-1 truncate">{summary.title}</div>
                          <div className="flex items-center gap-3 text-[10px] text-gray-400">
                            <div className="flex items-center gap-1">
                              <FileDown className="w-3 h-3" />
                              <span>{summary.pages} pages</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{summary.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-gray-600 group-hover:text-gray-400 transition-colors">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </button>
                  );
                })}
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
              <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-500 rounded-2xl mb-4">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">AI Document Summarizer</h1>
              <p className="text-sm text-gray-400 max-w-2xl mx-auto">
                Upload your documents and get concise, accurate summaries with key insights and referenced citations
              </p>
            </div>

            {/* Upload Zone */}
            <div className="max-w-3xl mx-auto mb-6">
              <div className="border-2 border-dashed border-gray-700 hover:border-teal-500/50 rounded-lg p-12 text-center transition-all cursor-pointer bg-[#111827]/30 hover:bg-[#111827]/50">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500/10 rounded-xl mb-4">
                  <Cloud className="w-8 h-8 text-teal-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Drop your documents here</h3>
                <p className="text-sm text-gray-400 mb-4">or click to browse from your computer</p>
                
                {/* File Type Badges */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#111827] border border-gray-700 rounded-full text-xs text-gray-300 font-medium">PDF</span>
                  <span className="px-3 py-1 bg-[#111827] border border-gray-700 rounded-full text-xs text-gray-300 font-medium">DOCX</span>
                  <span className="px-3 py-1 bg-[#111827] border border-gray-700 rounded-full text-xs text-gray-300 font-medium">TXT</span>
                  <span className="px-3 py-1 bg-[#111827] border border-gray-700 rounded-full text-xs text-gray-300 font-medium">XLSX</span>
                  <span className="px-3 py-1 bg-[#111827] border border-gray-700 rounded-full text-xs text-gray-300 font-medium">PPTX</span>
                </div>
                
                <p className="text-xs text-gray-500">Maximum file size: 50MB</p>
              </div>
            </div>

            {/* Focus Topic Section */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Target className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white mb-1">Focus this summary on a specific topic?</h3>
                    <p className="text-xs text-gray-400">Help the AI understand what matters most to you</p>
                  </div>
                </div>

                {/* Text Input */}
                <input
                  type="text"
                  value={focusTopic}
                  onChange={(e) => setFocusTopic(e.target.value)}
                  placeholder="e.g., risk factors, ESG performance, financial metrics, market opportunities..."
                  className="w-full bg-[#0B1220] border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all mb-4"
                />

                {/* Quick Selection Badges */}
                <div className="flex flex-wrap gap-2">
                  {quickTopics.map((topic) => {
                    const Icon = topic.icon;
                    const isSelected = selectedTopics.includes(topic.id);
                    return (
                      <button
                        key={topic.id}
                        onClick={() => toggleTopic(topic.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-blue-500 text-white border border-blue-400'
                            : 'bg-[#0B1220] text-gray-300 border border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {topic.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}