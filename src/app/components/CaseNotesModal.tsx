import { X, FileText, Edit, Trash, Paperclip, AtSign, Lightbulb, Calendar as CalendarIcon, RefreshCw, ChevronLeft, ChevronRight, Copy, Check, Send, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { format, getDaysInMonth, startOfMonth, getDay } from 'date-fns';

type Case = {
  id: string;
  clientNames: string[];
  caseName: string;
  dateCreated: Date;
  aum: string;
  caseStatus: 'Active' | 'Pending' | 'Completed' | 'Draft';
  caseId: string;
  clientType: string;
  lastInterested: Date;
  caseNotes: string;
};

type PersonalEvent = {
  id: string;
  title: string;
  date: Date;
  type: 'meeting' | 'call' | 'birthday' | 'other';
};

type CaseNotesModalProps = {
  caseData: Case;
  onClose: () => void;
};

export function CaseNotesModal({ caseData, onClose }: CaseNotesModalProps) {
  const [newNote, setNewNote] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 11)); // December 2024
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2024, 11, 15));
  const [showSeguePanel, setShowSeguePanel] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const personalEvents: PersonalEvent[] = [
    {
      id: '1',
      title: 'Follow-up call scheduled',
      date: new Date(2024, 11, 8),
      type: 'call',
    },
    {
      id: '2',
      title: 'Initial consultation meeting',
      date: new Date(2024, 11, 15),
      type: 'meeting',
    },
    {
      id: '3',
      title: "Client's Birthday - Sarah Anderson",
      date: new Date(2024, 11, 25),
      type: 'birthday',
    },
  ];

  const generatedSegueContent = {
    summary: "Based on recent client interactions and upcoming events, this segue focuses on retirement planning aligned with Sarah's approaching birthday milestone and current market conditions. The conversation naturally transitions from personal milestones to financial planning opportunities.",
    recommendations: [
      "Review retirement timeline in context of recent market volatility and interest rate changes",
      "Explore tax-efficient ISA contribution strategies before year-end deadline",
      "Assess current asset allocation against revised retirement goals",
      "Consider rebalancing portfolio to optimize for long-term growth and income needs"
    ],
    keyRisks: [
      "Market timing risk with current volatility requiring careful navigation",
      "Tax efficiency opportunities may be missed if not addressed before fiscal year-end",
      "Portfolio concentration risk in certain sectors needs monitoring"
    ],
    nextSteps: [
      "Schedule follow-up meeting for January 5th to present detailed recommendations",
      "Prepare comprehensive retirement projection analysis",
      "Draft ISA contribution proposal with tax-savings illustrations",
      "Review and update risk tolerance questionnaire"
    ]
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'text-blue-400';
      case 'call':
        return 'text-green-400';
      case 'birthday':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = startOfMonth(currentMonth);
    const startingDayOfWeek = getDay(firstDayOfMonth);
    
    const days = [];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Empty cells before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = selectedDate && 
        currentDate.getDate() === selectedDate.getDate() &&
        currentDate.getMonth() === selectedDate.getMonth() &&
        currentDate.getFullYear() === selectedDate.getFullYear();
      
      const hasEvent = personalEvents.some(event => 
        event.date.getDate() === day &&
        event.date.getMonth() === currentMonth.getMonth() &&
        event.date.getFullYear() === currentMonth.getFullYear()
      );

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(currentDate)}
          className={`p-2 text-sm rounded transition-colors relative ${
            isSelected
              ? 'bg-blue-600 text-white font-bold'
              : 'text-gray-300 hover:bg-[#1e293b]'
          }`}
        >
          {day}
          {hasEvent && (
            <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
              isSelected ? 'bg-white' : 'bg-blue-400'
            }`}></div>
          )}
        </button>
      );
    }

    return (
      <div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs text-gray-500 font-medium p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleCopySection = (section: string, content: string) => {
    try {
      navigator.clipboard.writeText(content);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (error) {
      console.error('Clipboard API not available:', error);
      // Fallback: create a temporary textarea
      const textarea = document.createElement('textarea');
      textarea.value = content;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopiedSection(section);
        setTimeout(() => setCopiedSection(null), 2000);
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      document.body.removeChild(textarea);
    }
  };

  const handleCopyAll = () => {
    const allText = `
SUMMARY
${generatedSegueContent.summary}

RECOMMENDATIONS
${generatedSegueContent.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}

KEY RISKS
${generatedSegueContent.keyRisks.map((r, i) => `${i + 1}. ${r}`).join('\n')}

NEXT STEPS
${generatedSegueContent.nextSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}
    `.trim();
    
    try {
      navigator.clipboard.writeText(allText);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (error) {
      console.error('Clipboard API not available:', error);
      // Fallback: create a temporary textarea
      const textarea = document.createElement('textarea');
      textarea.value = allText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-[#1a2332] rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Content */}
        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${showSeguePanel ? 'mr-0' : 'mr-0'}`}>
          {/* Modal Header with CTA */}
          <div className="sticky top-0 bg-[#1a2332] z-10 border-b border-gray-700">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Case Details</h2>
                  <p className="text-sm text-gray-400">
                    Case ID: {caseData.caseId} - {caseData.clientNames.join(' & ')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Prominent Generate Segue CTA */}
                <div className="flex flex-col items-end">
                  <Button 
                    onClick={() => setShowSeguePanel(!showSeguePanel)}
                    className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg shadow-blue-500/20"
                  >
                    <Sparkles className="w-5 h-5" />
                    {showSeguePanel ? 'Hide Segue Output' : 'Generate Segue'}
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    Generate structured client-ready summary for document use
                  </p>
                </div>
                
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Last Interaction Notes */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-400 uppercase">Last Interaction Notes</h3>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded font-bold">
                  {caseData.caseStatus} Case
                </span>
              </div>
              
              <div className="bg-[#0f1623] border border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                      {caseData.clientNames[0].split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {caseData.clientNames.join(' & ')}
                      </div>
                      <div className="text-xs text-gray-500">
                        December 15, 2024 at 2:35 PM
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  Initial consultation completed in retirement planning and wealth transfer strategies. 
                  They have approximately £850,000 in investable assets across various accounts. 
                  Next meeting scheduled for January 5th to discuss detailed recommendations.
                </p>

                <div className="flex items-center gap-4 text-xs">
                  <button className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
                    <FileText className="w-3.5 h-3.5" />
                    Reply
                  </button>
                  <button className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
                    <Edit className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors">
                    <Trash className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Personal Events and Dates */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white uppercase">Personal Events and Dates</h3>
              </div>

              {/* Calendar */}
              <div className="bg-[#0f1623] border border-gray-700 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-white">
                    {format(currentMonth, 'MMMM yyyy')}
                  </h4>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={goToPreviousMonth}
                      className="p-1 hover:bg-[#1e293b] rounded text-gray-400 hover:text-white transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={goToNextMonth}
                      className="p-1 hover:bg-[#1e293b] rounded text-gray-400 hover:text-white transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {renderCalendar()}
              </div>

              {/* Events List */}
              <div className="space-y-2 mb-4">
                {personalEvents.map(event => (
                  <div key={event.id} className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${getEventTypeColor(event.type).replace('text-', 'bg-')}`}></div>
                    <div>
                      <div className={`text-sm font-medium ${getEventTypeColor(event.type)}`}>
                        {event.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {format(event.date, 'MMMM d, yyyy')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Note Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                  AH
                </div>
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a new note..."
                  className="flex-1 bg-[#0f1623] border border-gray-700 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
                    <Paperclip className="w-4 h-4" />
                    Attach File
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
                    <AtSign className="w-4 h-4" />
                    Mention
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={onClose}
                    className="bg-[#374151] hover:bg-[#4B5563] text-white font-bold px-6 py-2 rounded text-sm"
                  >
                    Cancel
                  </Button>
                  <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold px-6 py-2 rounded text-sm">
                    Add Note
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generated Output Slide-in Panel */}
        <div 
          className={`bg-[#0f1623] border-l border-gray-700 transition-all duration-300 ease-in-out overflow-hidden ${
            showSeguePanel ? 'w-[500px]' : 'w-0'
          }`}
        >
          <div className="h-full flex flex-col p-6">
            {/* Panel Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-500/20 p-2 rounded">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Generated Segue</h3>
                </div>
                <button
                  onClick={() => setShowSeguePanel(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-400">Client-ready structured summary</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mb-6">
              <Button 
                onClick={handleCopyAll}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded flex items-center justify-center gap-2"
              >
                {copiedAll ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy All
                  </>
                )}
              </Button>
              <Button 
                className="flex-1 bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white font-bold py-2.5 rounded flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send to Document Builder
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {/* Summary Section */}
              <div className="bg-[#1a2332] border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wide">Summary</h4>
                  <button
                    onClick={() => handleCopySection('summary', generatedSegueContent.summary)}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {copiedSection === 'summary' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {generatedSegueContent.summary}
                </p>
              </div>

              {/* Recommendations Section */}
              <div className="bg-[#1a2332] border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-green-400 uppercase tracking-wide">Recommendations</h4>
                  <button
                    onClick={() => handleCopySection('recommendations', generatedSegueContent.recommendations.join('\n'))}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {copiedSection === 'recommendations' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <ul className="space-y-2">
                  {generatedSegueContent.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-400 font-bold text-xs mt-1">•</span>
                      <span className="text-sm text-gray-300 leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Risks Section */}
              <div className="bg-[#1a2332] border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wide">Key Risks</h4>
                  <button
                    onClick={() => handleCopySection('risks', generatedSegueContent.keyRisks.join('\n'))}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {copiedSection === 'risks' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <ul className="space-y-2">
                  {generatedSegueContent.keyRisks.map((risk, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold text-xs mt-1">•</span>
                      <span className="text-sm text-gray-300 leading-relaxed">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Steps Section */}
              <div className="bg-[#1a2332] border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wide">Next Steps</h4>
                  <button
                    onClick={() => handleCopySection('nextSteps', generatedSegueContent.nextSteps.join('\n'))}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {copiedSection === 'nextSteps' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <ul className="space-y-2">
                  {generatedSegueContent.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold text-xs mt-1">{index + 1}.</span>
                      <span className="text-sm text-gray-300 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}