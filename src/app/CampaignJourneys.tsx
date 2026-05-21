import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Plus, Mail, Phone, Clock, MoreVertical, Play, CheckCircle2, Circle, ArrowRight, Check, X, Users, Sparkles, Edit2, Trash2, GripVertical, Calendar, MessageSquare, BarChart2, ChevronDown, Settings } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from './components/ui/button';
import { FileText } from 'lucide-react';
import { CampaignJourneyView } from './campaign/CampaignJourneyView';

// --- Types ---
type CampaignStatus = 'Draft' | 'Active' | 'Completed';
type ClientType = 'Cold Prospects' | 'Existing Clients' | 'High Net Worth' | 'At Risk';

interface Campaign {
  id: string;
  name: string;
  segment: ClientType;
  status: CampaignStatus;
  clients: number;
  progress: number;
  lastActive: string;
}

type ActionType = 'Email' | 'Call' | 'Follow-up' | 'Meeting';

interface CampaignAction {
  id: string;
  type: ActionType;
  title: string;
  template?: string;
  dayOffset: number;
  notes?: string;
}

// --- Mock Data ---
const MOCK_CAMPAIGNS: Campaign[] = [
  { id: '1', name: 'Q3 Wealth Management Outreach', segment: 'High Net Worth', status: 'Active', clients: 124, progress: 65, lastActive: '2 hours ago' },
  { id: '2', name: 'Cold Prospect Nurture', segment: 'Cold Prospects', status: 'Active', clients: 450, progress: 32, lastActive: '1 day ago' },
  { id: '3', name: 'Q2 Portfolio Review', segment: 'Existing Clients', status: 'Completed', clients: 890, progress: 100, lastActive: '2 weeks ago' },
  { id: '4', name: 'Risk Assessment Follow-up', segment: 'At Risk', status: 'Draft', clients: 45, progress: 0, lastActive: 'Just now' },
];

const INITIAL_ACTIONS: CampaignAction[] = [
  { id: 'a1', type: 'Email', title: 'Send Introduction Email', template: 'Welcome Series v2', dayOffset: 1 },
  { id: 'a2', type: 'Call', title: 'Initial Discovery Call', template: 'Discovery Script', dayOffset: 3, notes: 'Focus on recent market volatility' },
  { id: 'a3', type: 'Follow-up', title: 'Send Comparison Doc', template: 'Competitor Analysis', dayOffset: 7 },
];

const ITEM_TYPE = 'ACTION_CARD';

// --- Components ---

// Draggable Action Card
const ActionCard = ({ 
  action, 
  index, 
  moveAction, 
  isSelected, 
  onClick 
}: { 
  action: CampaignAction; 
  index: number; 
  moveAction: (dragIndex: number, hoverIndex: number) => void;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ handlerId }, drop] = useDrop({
    accept: ITEM_TYPE,
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    hover(item: any, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;
      
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      
      moveAction(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ITEM_TYPE,
    item: () => {
      return { id: action.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const getIcon = () => {
    switch(action.type) {
      case 'Email': return <Mail className="w-5 h-5 text-[#3B82F6]" />;
      case 'Call': return <Phone className="w-5 h-5 text-[#22C55E]" />;
      case 'Meeting': return <Users className="w-5 h-5 text-[#A855F7]" />;
      default: return <Clock className="w-5 h-5 text-[#F59E0B]" />;
    }
  };

  return (
    <div className="flex gap-4">
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-[#111827] border border-[#1F2937] flex items-center justify-center text-xs text-[#9CA3AF] font-medium z-10">
          D{action.dayOffset}
        </div>
        <div className="w-px h-full bg-[#1F2937] -mt-2 -mb-2 z-0" />
      </div>

      {/* Card */}
      <div 
        ref={ref}
        data-handler-id={handlerId}
        onClick={onClick}
        className={`flex-1 mb-6 rounded-xl border transition-all duration-200 cursor-pointer ${
          isDragging ? 'opacity-50' : 'opacity-100'
        } ${
          isSelected 
            ? 'bg-[#1C2A40] border-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
            : 'bg-[#111827] border-[#1F2937] hover:border-[#374151] hover:bg-[#162033]'
        }`}
      >
        <div className="p-4 flex items-start gap-4">
          <div className="mt-1 cursor-grab active:cursor-grabbing text-[#6B7280] hover:text-[#9CA3AF]">
            <GripVertical className="w-5 h-5" />
          </div>
          
          <div className="p-2 bg-[#0B1220] rounded-lg border border-[#1F2937]">
            {getIcon()}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">{action.type}</span>
                <h3 className="text-white font-medium text-lg mt-1">{action.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-[#6B7280] hover:text-white transition-colors p-1"><Edit2 className="w-4 h-4" /></button>
                <button className="text-[#6B7280] hover:text-[#EF4444] transition-colors p-1"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            
            {action.template && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1F2937]/50 border border-[#374151] text-xs text-[#D1D5DB]">
                <FileText className="w-3.5 h-3.5" />
                {action.template}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CampaignJourneys() {
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'builder' | 'tracking' | 'active' | 'journey'>('list');
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  
  // Builder State
  const [actions, setActions] = useState<CampaignAction[]>(INITIAL_ACTIONS);
  const [selectedAction, setSelectedAction] = useState<CampaignAction | null>(null);
  const [selectedCampaignType, setSelectedCampaignType] = useState<string>('New Client Campaign');
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [targetType, setTargetType] = useState<'segments' | 'individuals'>('segments');
  const [customTemplates, setCustomTemplates] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const savedTemplatesData = localStorage.getItem('customEmailTemplates');
    if (savedTemplatesData) {
      setCustomTemplates(JSON.parse(savedTemplatesData));
    }
  }, []);
  
  // Tracking State
  const [showOutcomeModal, setShowOutcomeModal] = useState(false);
  const [outcomeAI, setOutcomeAI] = useState(false);

  // List View Handlers
  const handleCreate = () => {
    setView('builder');
    setActions(INITIAL_ACTIONS);
    setSelectedAction(null);
  };

  const handleOpenCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    if (campaign.id === '1') {
      setView('journey');
    } else {
      setView('tracking');
    }
  };

  const handleOpenJourney = () => {
    setSelectedCampaign(MOCK_CAMPAIGNS[0]);
    setView('journey');
  };

  const handleActivateCampaign = () => {
    localStorage.setItem('activeCampaign', 'true');
    setView('active');
  };

  const navigateToCanvas = () => {
    navigate('/insights?tab=canvas');
  };

  // Builder Handlers
  const moveAction = useCallback((dragIndex: number, hoverIndex: number) => {
    setActions((prevActions: CampaignAction[]) => {
      const newActions = [...prevActions];
      const draggedItem = newActions[dragIndex];
      newActions.splice(dragIndex, 1);
      newActions.splice(hoverIndex, 0, draggedItem);
      // Recalculate days just as a simple mock behavior
      return newActions.map((a, i) => ({ ...a, dayOffset: i === 0 ? 1 : prevActions[i].dayOffset }));
    });
  }, []);

  const handleAddAction = (index: number) => {
    const newAction: CampaignAction = {
      id: `a${Date.now()}`,
      type: 'Email',
      title: 'New Action Step',
      dayOffset: actions.length > 0 ? actions[index].dayOffset + 2 : 1
    };
    const newActions = [...actions];
    newActions.splice(index + 1, 0, newAction);
    setActions(newActions);
    setSelectedAction(newAction);
  };

  // Views
  const renderActiveView = () => (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-73px)] overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-oswald text-white mb-2 tracking-wide uppercase">Activated Campaigns</h2>
          <p className="text-[#9CA3AF]">Real-time view of your running outreach workflows.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setView('list')} className="border-[#1F2937] text-[#9CA3AF] hover:text-white">
            View All Campaigns
          </Button>
          <Button variant="outline" onClick={handleOpenJourney} className="border-[#A855F7]/40 text-[#D8B4FE] hover:bg-[#A855F7]/10">
            Hartwell Journey (Demo)
          </Button>
          <Button onClick={handleCreate} className="bg-[#3B82F6] hover:bg-[#2563EB] text-white flex items-center gap-2 shadow-lg shadow-blue-500/20">
            <Plus className="w-4 h-4" /> New Campaign
          </Button>
        </div>
      </div>

      <div className="space-y-10">
        {[
          {
            name: 'Campaign New Client Data',
            steps: [
              { day: 0, date: '06/05/26', type: 'Call', label: 'Cold Call', color: 'bg-[#22C55E]' },
              { day: 4, date: '10/05/26', type: 'Email', label: 'New Client Data Email Template', color: 'bg-[#3B82F6]', clickable: true },
              { day: 7, date: '13/05/26', type: 'Follow-up', label: 'Market Event Response', color: 'bg-[#A855F7]' },
            ]
          },
          {
            name: 'Campaign Existing Client Check-in',
            steps: [
              { day: 0, date: '11/05/26', type: 'Note', label: 'Internal Review', color: 'bg-[#6B7280]' },
              { day: 7, date: '18/05/26', type: 'Email', label: 'Market Update on Market Event', color: 'bg-[#3B82F6]', clickable: true },
              { day: 14, date: '25/05/26', type: 'Meeting', label: 'Quarterly Review Call', color: 'bg-[#22C55E]' },
            ]
          },
          {
            name: 'High Net Worth Reassurance',
            steps: [
              { day: 0, date: '05/05/26', type: 'Email', label: 'Portfolio Stability Note', color: 'bg-[#3B82F6]', clickable: true },
              { day: 2, date: '07/05/26', type: 'Call', label: 'Personal Advisor Reachout', color: 'bg-[#22C55E]' },
              { day: 10, date: '15/05/26', type: 'Email', label: 'Custom Investment Proposal', color: 'bg-[#3B82F6]', clickable: true },
            ]
          }
        ].map((campaign, idx) => (
          <div key={idx} className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-6 py-4 bg-[#0B1220] border-b border-[#1F2937] flex justify-between items-center">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>{campaign.name}</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
                <span className="text-[10px] font-bold text-[#22C55E] uppercase tracking-widest">Active</span>
              </div>
            </div>
            <div className="p-8 overflow-x-auto">
              <div className="flex items-start gap-8 min-w-max relative pb-6">
                {/* Horizontal line */}
                <div className="absolute top-[39px] left-0 right-0 h-0.5 bg-gradient-to-r from-[#1F2937] via-[#3B82F6]/30 to-[#1F2937] z-0"></div>
                
                {campaign.steps.map((step, sIdx) => (
                  <div key={sIdx} className="relative z-10 group">
                    <div className="flex flex-col items-center">
                      <div className="text-[10px] font-bold text-[#6B7280] mb-2 uppercase">Day {step.day} • {step.date}</div>
                      <div 
                        onClick={() => step.clickable && navigateToCanvas()}
                        className={`w-20 h-20 rounded-2xl ${step.color} border-4 border-[#0B1220] flex items-center justify-center shadow-xl transition-all duration-300 ${step.clickable ? 'cursor-pointer hover:scale-110 hover:shadow-blue-500/40 ring-2 ring-transparent hover:ring-blue-400' : 'opacity-80'}`}
                      >
                        {step.type === 'Email' && <Mail className="w-8 h-8 text-white" />}
                        {step.type === 'Call' && <Phone className="w-8 h-8 text-white" />}
                        {step.type === 'Meeting' && <Users className="w-8 h-8 text-white" />}
                        {step.type === 'Follow-up' && <Clock className="w-8 h-8 text-white" />}
                        {step.type === 'Note' && <FileText className="w-8 h-8 text-white" />}
                      </div>
                      <div className="mt-4 text-center max-w-[120px]">
                        <p className={`text-xs font-bold leading-tight ${step.clickable ? 'text-blue-400' : 'text-white'}`}>{step.label}</p>
                        {step.clickable && <span className="text-[10px] text-[#3B82F6] font-medium flex items-center justify-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"><Sparkles className="w-2 h-2" /> View Canvas</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderListView = () => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }}
      className="p-6 max-w-7xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-oswald text-white mb-2 tracking-wide">Campaign Journeys</h2>
          <p className="text-[#9CA3AF]">Automate and track your client outreach workflows.</p>
        </div>
        <Button variant="outline" onClick={handleOpenJourney} className="border-[#A855F7]/40 text-[#D8B4FE] hover:bg-[#A855F7]/10 mr-2">
          Hartwell Journey
        </Button>
        <Button onClick={handleCreate} className="bg-[#3B82F6] hover:bg-[#2563EB] text-white flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Campaign
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex gap-4 mb-6 bg-[#111827] p-4 rounded-xl border border-[#1F2937]">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input 
            type="text" 
            placeholder="Search campaigns..." 
            className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-[#0B1220] border border-[#1F2937] rounded-lg text-sm text-[#D1D5DB] cursor-pointer hover:border-[#374151]">
          <Filter className="w-4 h-4" /> Status: All
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-[#0B1220] border border-[#1F2937] rounded-lg text-sm text-[#D1D5DB] cursor-pointer hover:border-[#374151]">
          <Users className="w-4 h-4" /> Segment: All
        </div>
      </div>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map(campaign => (
          <div 
            key={campaign.id} 
            onClick={() => handleOpenCampaign(campaign)}
            className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 hover:border-[#3B82F6]/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div 
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                  campaign.status === 'Active' ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20' : 
                  campaign.status === 'Draft' ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20' : 
                  'bg-[#6B7280]/10 text-[#9CA3AF] border-[#6B7280]/20'
                }`}
              >
                {campaign.status}
              </div>
              <button className="text-[#6B7280] opacity-0 group-hover:opacity-100 transition-opacity hover:text-white">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            
            <h3 className="text-lg font-medium text-white mb-1">{campaign.name}</h3>
            <p className="text-sm text-[#9CA3AF] mb-6 flex items-center gap-2">
              <Users className="w-3.5 h-3.5" /> {campaign.segment} • {campaign.clients} clients
            </p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#9CA3AF]">Progress</span>
                <span className="text-white font-medium">{campaign.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-[#1F2937] rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${campaign.progress === 100 ? 'bg-[#22C55E]' : 'bg-[#3B82F6]'}`}
                  style={{ width: `${campaign.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderBuilderView = () => (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-[calc(100vh-73px)] overflow-hidden bg-[#0B1A2B]">
        {/* Main Canvas */}
        <div className="flex-1 flex flex-col h-full">
          <div className="p-4 border-b border-[#1F2937] bg-[#111827] flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={() => setView('list')} className="text-[#9CA3AF] hover:text-white transition-colors">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <div>
                <h2 className="text-lg font-medium text-white">Create New Campaign</h2>
                <p className="text-xs text-[#6B7280]">Draft Mode</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-[#374151] text-[#D1D5DB] hover:text-white hover:bg-[#1F2937]">Save Draft</Button>
              <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white flex items-center gap-2" onClick={handleActivateCampaign}>
                <CheckCircle2 className="w-4 h-4" /> Finalize Journey
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 relative">
            <div className="max-w-2xl mx-auto">
              
              <div className="mb-10 p-5 bg-[#111827] rounded-xl border border-[#1F2937]">
                <div className="grid grid-cols-2 gap-6 mb-5">
                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Campaign Name</label>
                    <div className="relative">
                      <select 
                        value={selectedCampaignType}
                        onChange={(e) => {
                          setSelectedCampaignType(e.target.value);
                          setHasGenerated(false);
                        }}
                        className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg pl-3 pr-8 py-2 text-white focus:outline-none focus:border-[#3B82F6] appearance-none"
                      >
                        <option value="New Client Campaign">New Client Campaign</option>
                        <option value="Reassurance Campaign">Reassurance Campaign</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Target Audience Type</label>
                    <div className="flex gap-2 mb-2">
                      <button 
                        onClick={() => setTargetType('segments')}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${targetType === 'segments' ? 'bg-[#3B82F6] text-white' : 'bg-[#0B1220] text-gray-400 border border-[#1F2937] hover:text-white'}`}
                      >
                        Segments
                      </button>
                      <button 
                        onClick={() => setTargetType('individuals')}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${targetType === 'individuals' ? 'bg-[#3B82F6] text-white' : 'bg-[#0B1220] text-gray-400 border border-[#1F2937] hover:text-white'}`}
                      >
                        Individuals
                      </button>
                    </div>
                    {targetType === 'segments' ? (
                      <div className="relative">
                        <select className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg pl-3 pr-8 py-2 text-white focus:outline-none focus:border-[#3B82F6] appearance-none">
                          <option>Cold Prospects</option>
                          <option>High Net Worth</option>
                          <option>Existing Clients</option>
                          <option>Target Group People</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
                      </div>
                    ) : (
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Search individual clients..."
                          className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg pl-3 pr-8 py-2 text-white focus:outline-none focus:border-[#3B82F6]" 
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
                      </div>
                    )}
                  </div>
                </div>
                {targetType === 'segments' && (
                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Bulk Target Options</label>
                    <div className="relative">
                      <select className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg pl-3 pr-8 py-2 text-white focus:outline-none focus:border-[#3B82F6] appearance-none">
                        <option>Select bulk target...</option>
                        <option>Apply to Top 100 Clients</option>
                        <option>Apply to All Matching Segment</option>
                        <option>Apply to Active Accounts Only</option>
                        <option>Exclude Recently Contacted (30 Days)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
                    </div>
                  </div>
                )}
                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={() => setHasGenerated(true)}
                    className="bg-[#3B82F6] hover:bg-blue-600 text-white flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate Campaign Flow
                  </Button>
                </div>
              </div>

              {hasGenerated ? (
                <div className="relative">
                  {actions.map((action, i) => (
                    <React.Fragment key={action.id}>
                      <ActionCard 
                        action={action} 
                        index={i} 
                        moveAction={moveAction}
                        isSelected={selectedAction?.id === action.id}
                        onClick={() => setSelectedAction(action)}
                      />
                      
                      {/* Add Action Button between steps */}
                      <div className="flex justify-center -mt-4 mb-4 relative z-20">
                        <button 
                          onClick={() => handleAddAction(i)}
                          className="w-7 h-7 bg-[#1F2937] hover:bg-[#3B82F6] hover:text-white text-[#9CA3AF] rounded-full flex items-center justify-center border-2 border-[#0B1A2B] transition-colors shadow-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </React.Fragment>
                  ))}
                  
                  {/* Final End Node */}
                  <div className="flex flex-col items-center opacity-50">
                    <div className="w-px h-6 bg-[#1F2937] -mt-4" />
                    <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#6B7280] flex items-center justify-center bg-[#0B1A2B]">
                      <Check className="w-4 h-4 text-[#6B7280]" />
                    </div>
                    <span className="text-xs text-[#6B7280] mt-2">End of Journey</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 px-4 opacity-50">
                  <Sparkles className="w-12 h-12 text-[#9CA3AF] mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Ready to Build</h3>
                  <p className="text-sm text-[#9CA3AF] max-w-sm">
                    Select your campaign parameters above and click generate to automatically build the campaign flow.
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Right Context Panel */}
        <AnimatePresence>
          {selectedAction && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 380, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-l border-[#1F2937] bg-[#111827] flex flex-col"
            >
              <div className="p-4 border-b border-[#1F2937] flex justify-between items-center bg-[#0B1220]">
                <h3 className="font-medium text-white flex items-center gap-2">
                  <Settings className="w-4 h-4 text-[#9CA3AF]" /> Action Settings
                </h3>
                <button onClick={() => setSelectedAction(null)} className="text-[#6B7280] hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                <div>
                  <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Action Type</label>
                  <div className="flex gap-2">
                    {['Email', 'Call', 'Follow-up'].map(type => (
                      <button 
                        key={type}
                        className={`flex-1 py-2 text-xs font-medium rounded-lg border ${selectedAction.type === type ? 'bg-[#3B82F6]/10 border-[#3B82F6] text-[#3B82F6]' : 'bg-[#0B1220] border-[#1F2937] text-[#9CA3AF] hover:bg-[#1F2937]'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Action Title</label>
                  <input 
                    type="text" 
                    value={selectedAction.title}
                    onChange={() => {}} 
                    className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#3B82F6]" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Wait Time</label>
                    <div className="flex items-center">
                      <input type="number" value={selectedAction.dayOffset} readOnly className="w-16 bg-[#0B1220] border border-[#1F2937] rounded-l-lg px-3 py-2 text-white text-center" />
                      <div className="bg-[#1F2937] border-y border-r border-[#1F2937] rounded-r-lg px-3 py-2 text-xs text-[#9CA3AF]">Days</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Send Time</label>
                    <select className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-3 py-2 text-white text-sm">
                      <option>09:00 AM</option>
                      <option>12:00 PM</option>
                      <option>03:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1F2937]">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-medium text-[#9CA3AF]">Message Template</label>
                    <button className="text-xs text-[#3B82F6] hover:text-[#60A5FA]">Create New</button>
                  </div>
                  
                  <div className="bg-[#0B1220] border border-[#1F2937] rounded-xl p-3">
                    <select 
                      className="w-full bg-transparent border-none text-white text-sm focus:outline-none mb-3 font-medium"
                      value={selectedAction.template || 'Q3 Market Update Intro'}
                      onChange={(e) => {
                        const updated = [...actions];
                        const actionIndex = updated.findIndex(a => a.id === selectedAction.id);
                        if (actionIndex > -1) {
                          updated[actionIndex].template = e.target.value;
                          setActions(updated);
                          setSelectedAction(updated[actionIndex]);
                        }
                      }}
                    >
                      <optgroup label="Standard Templates">
                        <option>Q3 Market Update Intro</option>
                        <option>Welcome Series v2</option>
                        <option>Discovery Script</option>
                      </optgroup>
                      {customTemplates.length > 0 && (
                        <optgroup label="Custom Saved Templates">
                          {customTemplates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </optgroup>
                      )}
                    </select>
                    
                    <div className="bg-[#111827] rounded-lg p-3 border border-[#1F2937]/50 mt-2">
                      <p className="text-xs text-[#9CA3AF] font-mono leading-relaxed">
                        Hi {'{client.firstName}'},<br/><br/>
                        Given the recent market shifts, I wanted to share our latest perspectives and see if you have time for a brief review...
                      </p>
                    </div>
                    <Button variant="outline" className="w-full mt-3 h-8 text-xs border-[#374151] text-[#D1D5DB]">
                      Edit Content
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DndProvider>
  );

  const renderTrackingView = () => (
    <div className="p-6 max-w-6xl mx-auto h-[calc(100vh-73px)] overflow-y-auto">
      <button onClick={() => setView('list')} className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition-colors mb-6 text-sm">
        <ArrowRight className="w-4 h-4 rotate-180" /> Back to Campaigns
      </button>

      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-oswald text-white tracking-wide">{selectedCampaign?.name}</h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">Active</span>
          </div>
          <p className="text-[#9CA3AF]">Targeting {selectedCampaign?.segment} • Started Oct 12, 2026</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-[#374151] text-[#D1D5DB]"><Calendar className="w-4 h-4 mr-2" /> Schedule Report</Button>
          <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white" onClick={() => setShowOutcomeModal(true)}>
            <MessageSquare className="w-4 h-4 mr-2" /> Log Manual Action
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Stats */}
        <div className="bg-[#111827] rounded-xl border border-[#1F2937] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#9CA3AF] text-sm font-medium">Total Clients</h3>
            <Users className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">{selectedCampaign?.clients}</div>
          <div className="text-xs text-[#22C55E] flex items-center gap-1">+12 added this week</div>
        </div>
        
        <div className="bg-[#111827] rounded-xl border border-[#1F2937] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#9CA3AF] text-sm font-medium">Engagement Rate</h3>
            <BarChart2 className="w-4 h-4 text-[#A855F7]" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">42.8%</div>
          <div className="text-xs text-[#22C55E] flex items-center gap-1">Above industry avg</div>
        </div>

        <div className="bg-[#111827] rounded-xl border border-[#1F2937] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#9CA3AF] text-sm font-medium">Completion Progress</h3>
            <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{selectedCampaign?.progress}%</div>
          <div className="h-1.5 w-full bg-[#1F2937] rounded-full overflow-hidden">
            <div className="h-full bg-[#22C55E] rounded-full w-[65%]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign Timeline */}
        <div className="col-span-2 bg-[#111827] rounded-xl border border-[#1F2937] p-6">
          <h3 className="text-lg font-medium text-white mb-6">Journey Timeline</h3>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center mt-1">
                <div className="w-6 h-6 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="w-px h-full bg-[#22C55E]/30 my-2" />
              </div>
              <div className="pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-[#22C55E]">COMPLETED</span>
                  <span className="text-xs text-[#6B7280]">• Day 1</span>
                </div>
                <h4 className="text-white font-medium">Send Introduction Email</h4>
                <p className="text-sm text-[#9CA3AF] mt-1">Sent to 124 clients. 56 opened, 12 clicked.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center mt-1">
                <div className="w-6 h-6 rounded-full bg-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center relative shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                  <Circle className="w-3.5 h-3.5 fill-current" />
                </div>
                <div className="w-px h-full bg-[#1F2937] my-2" />
              </div>
              <div className="pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-[#3B82F6]">IN PROGRESS</span>
                  <span className="text-xs text-[#6B7280]">• Day 4</span>
                </div>
                <h4 className="text-white font-medium">Initial Discovery Call</h4>
                <p className="text-sm text-[#9CA3AF] mt-1">45 calls completed. 79 pending.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center mt-1">
                <div className="w-6 h-6 rounded-full border-2 border-[#374151] flex items-center justify-center" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-[#6B7280]">UPCOMING</span>
                  <span className="text-xs text-[#6B7280]">• Day 10</span>
                </div>
                <h4 className="text-[#D1D5DB] font-medium">Send Comparison Doc</h4>
                <p className="text-sm text-[#6B7280] mt-1">Waiting on previous step completion.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-[#111827] rounded-xl border border-[#1F2937] p-6">
          <h3 className="text-lg font-medium text-white mb-6">Recent Activity</h3>
          
          <div className="space-y-4">
            {[
              { client: 'Sarah Jenkins', action: 'Opened Email', time: '10 mins ago', type: 'positive' },
              { client: 'Michael Chang', action: 'Call Completed', time: '1 hour ago', type: 'neutral' },
              { client: 'Robert Smith', action: 'Bounced Email', time: '2 hours ago', type: 'negative' },
              { client: 'Emma Thompson', action: 'Booked Meeting', time: 'Yesterday', type: 'positive' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#0B1220] border border-[#1F2937]">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  activity.type === 'positive' ? 'bg-[#22C55E]' :
                  activity.type === 'negative' ? 'bg-[#EF4444]' : 'bg-[#3B82F6]'
                }`} />
                <div>
                  <div className="text-sm text-white font-medium">{activity.client}</div>
                  <div className="text-xs text-[#9CA3AF]">{activity.action} • {activity.time}</div>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-4 border-[#1F2937] text-[#9CA3AF] hover:text-white">View All Activity</Button>
        </div>
      </div>

      {/* Outcome Modal Overlay */}
      <AnimatePresence>
        {showOutcomeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#000000]/60 backdrop-blur-sm"
              onClick={() => setShowOutcomeModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#111827] border border-[#1F2937] rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-5 border-b border-[#1F2937] flex justify-between items-center bg-[#0B1220]">
                <h3 className="text-lg font-medium text-white">Log Outcome</h3>
                <button onClick={() => setShowOutcomeModal(false)} className="text-[#6B7280] hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#D1D5DB] mb-2">Outcome Result</label>
                  <select className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#3B82F6] appearance-none">
                    <option>Interested - Send More Info</option>
                    <option>No Response</option>
                    <option>Not Interested</option>
                    <option>Meeting Booked</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#D1D5DB] mb-2">Add Notes (Optional)</label>
                  <textarea 
                    rows={3} 
                    className="w-full bg-[#0B1220] border border-[#1F2937] rounded-lg px-3 py-2 text-white placeholder-[#6B7280] focus:outline-none focus:border-[#3B82F6]"
                    placeholder="E.g., Client requested more info on ESG funds..."
                  />
                </div>

                <Button 
                  className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2.5"
                  onClick={() => setOutcomeAI(true)}
                >
                  Submit & Analyze
                </Button>

                <AnimatePresence>
                  {outcomeAI && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-2 border-t border-[#1F2937]">
                        <div className="bg-[#1C1A3A]/40 border border-[#A855F7]/30 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-[#A855F7] mb-2">
                            <Sparkles className="w-4 h-4" />
                            <h4 className="text-sm font-semibold">Suggested Next Action</h4>
                          </div>
                          <p className="text-sm text-[#D1D5DB] mb-3">Based on the client's interest, we recommend scheduling a follow-up call in 3 days with the ESG Factsheet prepared.</p>
                          <Button className="w-full bg-[#A855F7]/20 hover:bg-[#A855F7]/30 text-[#D8B4FE] border border-[#A855F7]/40">
                            Apply to Client Journey
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="bg-[#0B1A2B] min-h-[calc(100vh-73px)]">
      <AnimatePresence mode="wait">
        {view === 'list' && (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {renderListView()}
          </motion.div>
        )}
        {view === 'builder' && (
          <motion.div key="builder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            {renderBuilderView()}
          </motion.div>
        )}
        {view === 'tracking' && (
          <motion.div key="tracking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {renderTrackingView()}
          </motion.div>
        )}
        {view === 'active' && (
          <motion.div key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {renderActiveView()}
          </motion.div>
        )}
        {view === 'journey' && (
          <motion.div key="journey" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CampaignJourneyView onBack={() => setView('list')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}