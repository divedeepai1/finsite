import { Briefcase, TrendingUp, Building2, Lightbulb, History, Settings as SettingsIcon, Bell, Search, Download, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { Button } from './ui/button';

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-[#1F2937] bg-[#0B1120]">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-[#3B82F6]" />
              <span className="text-xl font-bold text-[#F9FAFB]">FINSITE <span className="text-[#3B82F6]">AI</span></span>
            </div>
            <div className="text-sm mt-1">
              <span className="text-[#3B82F6] font-bold">MARKET INTELLIGENCE</span>
            </div>
          </div>
          
          {/* Navigation Items */}
          <div className="flex items-center gap-6 ml-8">
            <button 
              onClick={() => navigate('/')} 
              className={`flex items-center gap-2 text-sm transition-colors ${
                isActive('/') ? 'text-[#3B82F6]' : 'text-[#F9FAFB] hover:text-[#3B82F6]'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 text-sm text-[#F9FAFB] hover:text-[#3B82F6] transition-colors"
            >
              <Briefcase className="w-4 h-4" />
              <span>Portfolio</span>
            </button>
            <button 
              onClick={() => navigate('/markets')} 
              className={`flex items-center gap-2 text-sm transition-colors ${
                isActive('/markets') ? 'text-[#3B82F6]' : 'text-[#F9FAFB] hover:text-[#3B82F6]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Markets</span>
            </button>
            <button 
              onClick={() => navigate('/insights')} 
              className={`flex items-center gap-2 text-sm transition-colors ${
                isActive('/insights') ? 'text-[#3B82F6]' : 'text-[#F9FAFB] hover:text-[#3B82F6]'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span>Insights</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-[#F9FAFB] hover:text-[#3B82F6] transition-colors">
              <History className="w-4 h-4" />
              <span>History</span>
            </button>
            <button 
              onClick={() => navigate('/settings')} 
              className={`flex items-center gap-2 text-sm transition-colors ${
                isActive('/settings') ? 'text-[#3B82F6]' : 'text-[#F9FAFB] hover:text-[#3B82F6]'
              }`}
            >
              <SettingsIcon className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <button 
              onClick={() => navigate('/user-management')} 
              className={`flex items-center gap-2 text-sm transition-colors ${
                isActive('/user-management') ? 'text-[#3B82F6]' : 'text-[#F9FAFB] hover:text-[#3B82F6]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>User Management</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="search function or security..."
              className="bg-[#111827] border border-[#374151] rounded px-10 py-2 text-sm text-[#F9FAFB] placeholder-[#6B7280] w-80 focus:outline-none focus:border-[#3B82F6]"
            />
          </div>
          <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold px-6">
            <Download className="w-4 h-4 mr-2" />
            EXPORT
          </Button>
        </div>
      </div>
    </nav>
  );
}
