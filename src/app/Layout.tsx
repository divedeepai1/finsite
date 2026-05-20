import { Search, Download, Bell, Briefcase, TrendingUp, Building2, Lightbulb, History, Settings, ChevronLeft, ChevronRight, Users, FolderOpen, Upload, FileText, MessageCircle, Layout as LayoutIcon, Radar as RadarIcon, Video } from 'lucide-react';
import { useNavigate, useLocation, Outlet } from 'react-router';
import { useState } from 'react';
import { Button } from './components/ui/button';
import finsiteLogo from 'figma:asset/9f17fb4db44a8cb9440c384728978eb574ea703b.png';
import finsiteFavicon from 'figma:asset/3ef1222d3e23b18a237150717e6ec94c0498040e.png';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path === '/radar') return 'AI Radar';
    if (path === '/meeting') return 'Meeting Preparation';
    if (path === '/markets') return 'Commentary';
    if (path === '/ask-ai') return 'Ask AI';
    if (path === '/insights') return 'AI Insights';
    if (path === '/documents') return 'Documents';
    if (path === '/document-summarizer') return 'Document Summarizer';
    if (path === '/document-upload') return 'Uploads';
    if (path === '/house-view') return 'House View Generator';
    if (path === '/investment-thesis') return 'Investment Thesis Builder';
    if (path === '/compare') return 'Competitor Analysis';
    if (path === '/historical-analysis') return 'Historical Analysis';
    if (path === '/ask-ai-chat-output') return 'AI Insights';
    if (path === '/compare-output') return 'AI Insights';
    if (path === '/historical-analysis-results') return 'AI Insights';
    if (path === '/canvas') return 'Document Canvas';
    if (path === '/settings') return 'Settings';
    if (path === '/user-management') return 'User Management';
    if (path === '/branding') return 'Branding';
    if (path === '/case-management') return 'Case Management';
    return 'Dashboard';
  };

  // Check if current path is a Commentary sub-page
  const isMarketsSection = () => {
    const marketsPages = ['/markets', '/house-view', '/documents'];
    return marketsPages.includes(location.pathname);
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex">
      {/* Left Sidebar Navigation */}
      <div 
        className={`${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } bg-[#111827] border-r border-[#1F2937] flex flex-col transition-all duration-300 fixed left-0 top-0 h-screen z-50`}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-[#1F2937]">
          <div className="flex items-center gap-3">
            {sidebarCollapsed ? (
              <img src={finsiteFavicon} alt="FinSite Logo" className="w-8 h-8 flex-shrink-0 object-contain" />
            ) : (
              <img src={finsiteLogo} alt="FinSite AI" className="h-8 object-contain" />
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4">
          <SidebarItem
            icon={TrendingUp}
            label="Dashboard"
            active={location.pathname === '/'}
            collapsed={sidebarCollapsed}
            onClick={() => navigate('/')}
          />
          <SidebarItem
            icon={Upload}
            label="Uploads"
            active={location.pathname === '/document-upload'}
            collapsed={sidebarCollapsed}
            onClick={() => navigate('/document-upload')}
          />
          <SidebarItem
            icon={Lightbulb}
            label="AI Insights"
            active={location.pathname === '/insights'}
            collapsed={sidebarCollapsed}
            onClick={() => navigate('/insights')}
          />
          <SidebarItem
            icon={RadarIcon}
            label="Radar"
            active={location.pathname === '/radar'}
            collapsed={sidebarCollapsed}
            onClick={() => navigate('/radar')}
          />
          <SidebarItem
            icon={Video}
            label="Meetings"
            active={location.pathname === '/meeting'}
            collapsed={sidebarCollapsed}
            onClick={() => navigate('/meeting')}
          />
          <SidebarItem
            icon={MessageCircle}
            label="Campaign Journeys"
            active={location.pathname === '/campaign-journeys'}
            collapsed={sidebarCollapsed}
            onClick={() => navigate('/campaign-journeys')}
          />
          <SidebarItem
            icon={FolderOpen}
            label="Case Management"
            active={location.pathname === '/case-management'}
            collapsed={sidebarCollapsed}
            onClick={() => navigate('/case-management')}
          />
          <SidebarItem
            icon={Users}
            label="User Management"
            active={location.pathname === '/user-management'}
            collapsed={sidebarCollapsed}
            onClick={() => navigate('/user-management')}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
            active={location.pathname === '/settings'}
            collapsed={sidebarCollapsed}
            onClick={() => navigate('/settings')}
          />
        </nav>

        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-20 bg-[#162033] hover:bg-[#1C2A40] border border-[#1F2937] rounded-full p-1 text-[#3B82F6] transition-all duration-200"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 ${sidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        {/* Top Bar */}
        <div className="border-b border-[#1F2937] bg-[#111827] sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Title or tabs portal for AI Insights */}
            {(location.pathname === '/insights' || location.pathname === '/ask-ai-chat-output' || location.pathname === '/compare-output' || location.pathname === '/historical-analysis-results') ? (
              <div id="insights-tabs-portal" className="flex-1"></div>
            ) : location.pathname === '/campaign-journeys' ? (
              <div className="flex-1"></div>
            ) : (
              <div className="flex-1"></div>
            )}
            
            <div className="flex items-center gap-4">
              <button className="text-[#9CA3AF] hover:text-[#3B82F6] transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="bg-[#3B82F6] rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm text-white">
                JD
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
}

// Sidebar Item Component
interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  collapsed: boolean;
  onClick: () => void;
}

function SidebarItem({ icon: Icon, label, active, collapsed, onClick }: SidebarItemProps) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`w-full flex ${collapsed ? 'flex-col items-center' : 'flex-row items-center justify-start'} gap-1 px-4 py-3 transition-all duration-200 ${
          active
            ? 'bg-[#3B82F6]/20 text-[#3B82F6] border-r-4 border-[#3B82F6]'
            : 'text-[#9CA3AF] hover:text-[#3B82F6] hover:bg-[#1C2A40]'
        }`}
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        <Icon className={`${collapsed ? 'w-5 h-5' : 'w-5 h-5'} flex-shrink-0 ${active ? 'text-[#60A5FA]' : ''}`} />
        {collapsed ? (
          <span className={`text-[9px] font-medium leading-tight text-center ${active ? 'text-[#60A5FA]' : ''}`} style={{ letterSpacing: '0.02em' }}>
            {label}
          </span>
        ) : (
          <span className="text-sm font-medium tracking-wide" style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</span>
        )}
      </button>
    </div>
  );
}