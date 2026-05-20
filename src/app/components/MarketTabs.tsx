import { useNavigate, useLocation } from 'react-router';

interface MarketTabsProps {
  currentTab: 'house-view' | 'documents';
  showHistory?: boolean;
  onHistoryClick?: () => void;
}

export function MarketTabs({ currentTab, showHistory = false, onHistoryClick }: MarketTabsProps) {
  const navigate = useNavigate();

  const tabs = [
    { id: 'house-view', label: 'House View', path: '/house-view' },
    { id: 'documents', label: 'Documents', path: '/documents' },
  ];

  return (
    <div className="border-b border-[#1F2937] bg-[#111827] px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`px-4 py-2 text-sm transition-all duration-200 rounded-lg font-semibold ${
                currentTab === tab.id
                  ? 'bg-[#3B82F6] hover:bg-[#60A5FA] text-white shadow-lg shadow-blue-500/20'
                  : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {showHistory && onHistoryClick && (
          <button
            onClick={onHistoryClick}
            className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>History</span>
          </button>
        )}
      </div>
    </div>
  );
}