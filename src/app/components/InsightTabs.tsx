import { useNavigate } from 'react-router';

interface InsightTabsProps {
  activeTab: 'overview' | 'ask-ai' | 'compare' | 'investment-thesis' | 'commentary' | 'historical-analysis' | 'documents';
  onTabChange: (tab: 'overview' | 'ask-ai' | 'compare' | 'investment-thesis' | 'commentary' | 'historical-analysis' | 'documents') => void;
}

export function InsightTabs({ activeTab, onTabChange }: InsightTabsProps) {
  // 7-tab navigation structure for AI Insights (Summarize is now a sub-tab within Ask AI)
  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'ask-ai' as const, label: 'Ask AI' },
    { id: 'compare' as const, label: 'Compare' },
    { id: 'investment-thesis' as const, label: 'Investment Thesis' },
    { id: 'commentary' as const, label: 'Commentary' },
    { id: 'historical-analysis' as const, label: 'Historical Analysis' },
    { id: 'documents' as const, label: 'Documents' },
  ];

  return (
    <div className="sticky top-[73px] z-30 border-b border-[#1F2937] bg-[#111827] px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 text-sm transition-all duration-200 rounded-lg font-semibold whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#3B82F6] hover:bg-[#60A5FA] text-white shadow-lg shadow-blue-500/20'
                  : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>History</span>
        </button>
      </div>
    </div>
  );
}