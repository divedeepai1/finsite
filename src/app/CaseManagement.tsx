import { Search, Filter, Download, ChevronDown, X, Settings, Menu, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, MoreVertical, FileText, Edit, Trash, Paperclip, AtSign, Lightbulb, Calendar as CalendarIcon, RefreshCw } from 'lucide-react';
import { Button } from './components/ui/button';
import { CaseNotesModal } from './components/CaseNotesModal';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type SortDirection = 'asc' | 'desc' | null;

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

type FilterType = {
  key: string;
  label: string;
  value: string;
};

type PersonalEvent = {
  id: string;
  title: string;
  date: Date;
  type: 'meeting' | 'call' | 'birthday' | 'other';
};

export default function CaseManagement() {
  const [selectedAdviser, setSelectedAdviser] = useState('All advisers');
  const [showArchivedCases, setShowArchivedCases] = useState(false);
  const [showNewCase, setShowNewCase] = useState(false);
  const [showCaseNotes, setShowCaseNotes] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);
  const [sortColumn, setSortColumn] = useState<string>('clientNames');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;

  // New Case Form States
  const [newCaseTab, setNewCaseTab] = useState<'NEW CLIENT' | 'EXISTING CLIENT'>('EXISTING CLIENT');
  const [clientSearch, setClientSearch] = useState('');
  const [caseName, setCaseName] = useState('');
  const [adviceType, setAdviceType] = useState('Investment');
  const [recommendationType, setRecommendationType] = useState('Full Advice');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [nino, setNino] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Mock data for cases
  const [cases] = useState<Case[]>([
    {
      id: '1',
      clientNames: ['Sarah Johnson'],
      caseName: 'Retirement Planning 2026',
      dateCreated: new Date(2026, 0, 15),
      aum: '£450,000',
      caseStatus: 'Active',
      caseId: 'CASE-001',
      clientType: 'Individual',
      lastInterested: new Date(2026, 1, 18),
      caseNotes: 'Reviewing pension options',
    },
    {
      id: '2',
      clientNames: ['Michael Chen', 'Lucy Chen'],
      caseName: 'Portfolio Diversification',
      dateCreated: new Date(2026, 0, 20),
      aum: '£780,000',
      caseStatus: 'Active',
      caseId: 'CASE-002',
      clientType: 'Joint',
      lastInterested: new Date(2026, 1, 19),
      caseNotes: 'Global equity focus',
    },
    {
      id: '3',
      clientNames: ['Emma Williams'],
      caseName: 'Pension Review 2026',
      dateCreated: new Date(2026, 1, 10),
      aum: '£320,000',
      caseStatus: 'Draft',
      caseId: 'CASE-003',
      clientType: 'Individual',
      lastInterested: new Date(2026, 1, 15),
      caseNotes: 'Awaiting client feedback',
    },
    {
      id: '4',
      clientNames: ['James Taylor'],
      caseName: 'First Time Buyer Mortgage',
      dateCreated: new Date(2025, 11, 5),
      aum: '£540,000',
      caseStatus: 'Completed',
      caseId: 'CASE-004',
      clientType: 'Individual',
      lastInterested: new Date(2026, 0, 30),
      caseNotes: 'Mortgage approved',
    },
    {
      id: '5',
      clientNames: ['Lisa Anderson'],
      caseName: 'Life Insurance Protection',
      dateCreated: new Date(2026, 1, 1),
      aum: '£210,000',
      caseStatus: 'Pending',
      caseId: 'CASE-005',
      clientType: 'Individual',
      lastInterested: new Date(2026, 1, 18),
      caseNotes: 'Underwriting in progress',
    },
    {
      id: '6',
      clientNames: ['David Brown', 'Sarah Brown'],
      caseName: 'Estate Planning',
      dateCreated: new Date(2026, 0, 8),
      aum: '£1,200,000',
      caseStatus: 'Active',
      caseId: 'CASE-006',
      clientType: 'Joint',
      lastInterested: new Date(2026, 1, 17),
      caseNotes: 'Trust arrangement setup',
    },
    {
      id: '7',
      clientNames: ['Robert Wilson'],
      caseName: 'Tax Planning Review',
      dateCreated: new Date(2026, 0, 25),
      aum: '£890,000',
      caseStatus: 'Active',
      caseId: 'CASE-007',
      clientType: 'Individual',
      lastInterested: new Date(2026, 1, 16),
      caseNotes: 'Year-end tax optimization',
    },
    {
      id: '8',
      clientNames: ['Amanda Green'],
      caseName: 'Investment Portfolio Setup',
      dateCreated: new Date(2026, 1, 5),
      aum: '£150,000',
      caseStatus: 'Draft',
      caseId: 'CASE-008',
      clientType: 'Individual',
      lastInterested: new Date(2026, 1, 14),
      caseNotes: 'Risk assessment pending',
    },
    {
      id: '9',
      clientNames: ['Thomas Lee'],
      caseName: 'Business Exit Strategy',
      dateCreated: new Date(2025, 11, 20),
      aum: '£2,500,000',
      caseStatus: 'Active',
      caseId: 'CASE-009',
      clientType: 'Corporate',
      lastInterested: new Date(2026, 1, 19),
      caseNotes: 'Succession planning',
    },
    {
      id: '10',
      clientNames: ['Jennifer White'],
      caseName: 'Pension Consolidation',
      dateCreated: new Date(2026, 1, 3),
      aum: '£420,000',
      caseStatus: 'Pending',
      caseId: 'CASE-010',
      clientType: 'Individual',
      lastInterested: new Date(2026, 1, 18),
      caseNotes: 'Consolidating 3 pensions',
    },
    {
      id: '11',
      clientNames: ['Mark Davis', 'Helen Davis'],
      caseName: 'Children Education Fund',
      dateCreated: new Date(2026, 0, 12),
      aum: '£180,000',
      caseStatus: 'Active',
      caseId: 'CASE-011',
      clientType: 'Joint',
      lastInterested: new Date(2026, 1, 17),
      caseNotes: 'Junior ISA setup',
    },
    {
      id: '12',
      clientNames: ['Patricia Moore'],
      caseName: 'Inheritance Planning',
      dateCreated: new Date(2026, 0, 28),
      aum: '£950,000',
      caseStatus: 'Active',
      caseId: 'CASE-012',
      clientType: 'Individual',
      lastInterested: new Date(2026, 1, 16),
      caseNotes: 'IHT mitigation strategies',
    },
    {
      id: '13',
      clientNames: ['Christopher Harris'],
      caseName: 'Early Retirement Planning',
      dateCreated: new Date(2026, 1, 8),
      aum: '£680,000',
      caseStatus: 'Draft',
      caseId: 'CASE-013',
      clientType: 'Individual',
      lastInterested: new Date(2026, 1, 15),
      caseNotes: 'Cashflow modeling required',
    },
    {
      id: '14',
      clientNames: ['Susan Clark'],
      caseName: 'Overseas Investment Review',
      dateCreated: new Date(2026, 0, 18),
      aum: '£1,100,000',
      caseStatus: 'Active',
      caseId: 'CASE-014',
      clientType: 'Individual',
      lastInterested: new Date(2026, 1, 19),
      caseNotes: 'Currency hedging strategy',
    },
  ]);

  const advisers = [
    'All advisers',
    'John Smith',
    'Emma Watson',
    'Michael Brown',
    'Sarah Johnson',
    'David Williams',
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-400';
      case 'Completed':
        return 'bg-blue-500/20 text-blue-400';
      case 'Draft':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Pending':
        return 'bg-orange-500/20 text-orange-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortColumn('');
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const removeFilter = (filterKey: string) => {
    setActiveFilters(activeFilters.filter((f) => f.key !== filterKey));
  };

  const resetTable = () => {
    setActiveFilters([]);
    setSortColumn('clientNames');
    setSortDirection('asc');
    setCurrentPage(1);
  };

  const resetNewCaseForm = () => {
    setClientSearch('');
    setCaseName('');
    setAdviceType('Investment');
    setRecommendationType('Full Advice');
    setFirstName('');
    setSurname('');
    setDateOfBirth(undefined);
    setNino('');
    setPhoneNumber('');
    setEmailAddress('');
  };

  const totalItems = 145; // Mock total
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />;
    }
    if (sortDirection === 'asc') {
      return <ArrowUp className="w-3.5 h-3.5 text-blue-400" />;
    }
    if (sortDirection === 'desc') {
      return <ArrowDown className="w-3.5 h-3.5 text-blue-400" />;
    }
    return <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />;
  };

  return (
    <div className="p-6 max-w-[1800px] mx-auto">
      {/* Top Controls Row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* Adviser Dropdown */}
          <div className="relative">
            <select
              value={selectedAdviser}
              onChange={(e) => setSelectedAdviser(e.target.value)}
              className="bg-white text-gray-900 border border-gray-300 rounded px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:border-blue-500 appearance-none cursor-pointer min-w-[180px]"
            >
              {advisers.map((adviser) => (
                <option key={adviser} value={adviser}>
                  {adviser}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
          </div>

          {/* View Archived Cases Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showArchivedCases}
              onChange={(e) => setShowArchivedCases(e.target.checked)}
              className="w-4 h-4 accent-blue-500 cursor-pointer"
            />
            <span className="text-sm text-gray-300">View Archived Cases</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          {/* Reset Table Link */}
          <button
            onClick={resetTable}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            Reset Table
          </button>

          {/* New Case Button */}
          <Button
            onClick={() => {
              resetNewCaseForm();
              setShowNewCase(true);
            }}
            className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold px-6 py-2 rounded"
          >
            NEW CASE
          </Button>
        </div>
      </div>

      {/* Table Controls Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Export Button */}
        <Button className="bg-[#1e293b] hover:bg-[#334155] text-white font-bold px-4 py-2 rounded flex items-center gap-2 text-xs">
          <Download className="w-3.5 h-3.5" />
          EXPORT ALL DATA
        </Button>

        {/* Action Icons */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-[#1e293b] rounded text-gray-400 hover:text-white transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="p-2 hover:bg-[#1e293b] rounded text-gray-400 hover:text-white transition-colors"
          >
            <Filter className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowColumnMenu(!showColumnMenu)}
            className="p-2 hover:bg-[#1e293b] rounded text-gray-400 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-[#1e293b] rounded text-gray-400 hover:text-white transition-colors">
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0f1623] rounded-lg border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 bg-[#0a0f1a]">
              <th className="text-left p-3 text-xs font-bold text-gray-400">
                <button
                  onClick={() => handleSort('clientNames')}
                  className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                >
                  Client Name(s)
                  {renderSortIcon('clientNames')}
                </button>
              </th>
              <th className="text-left p-3 text-xs font-bold text-gray-400">
                <button
                  onClick={() => handleSort('caseName')}
                  className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                >
                  Case Name
                  {renderSortIcon('caseName')}
                </button>
              </th>
              <th className="text-left p-3 text-xs font-bold text-gray-400">
                <button
                  onClick={() => handleSort('dateCreated')}
                  className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                >
                  Date Created
                  {renderSortIcon('dateCreated')}
                </button>
              </th>
              <th className="text-left p-3 text-xs font-bold text-gray-400">
                <button
                  onClick={() => handleSort('aum')}
                  className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                >
                  AUM
                  {renderSortIcon('aum')}
                </button>
              </th>
              <th className="text-left p-3 text-xs font-bold text-gray-400">
                <button
                  onClick={() => handleSort('caseStatus')}
                  className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                >
                  Case Status
                  {renderSortIcon('caseStatus')}
                </button>
              </th>
              <th className="text-left p-3 text-xs font-bold text-gray-400">
                <button
                  onClick={() => handleSort('caseId')}
                  className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                >
                  Case ID
                  {renderSortIcon('caseId')}
                </button>
              </th>
              <th className="text-left p-3 text-xs font-bold text-gray-400">
                <button
                  onClick={() => handleSort('clientType')}
                  className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                >
                  Client Type
                  {renderSortIcon('clientType')}
                </button>
              </th>
              <th className="text-left p-3 text-xs font-bold text-gray-400">
                <button
                  onClick={() => handleSort('lastInterested')}
                  className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                >
                  Last Interested
                  {renderSortIcon('lastInterested')}
                </button>
              </th>
              <th className="text-left p-3 text-xs font-bold text-gray-400">
                <button
                  onClick={() => handleSort('caseNotes')}
                  className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                >
                  Case notes
                  {renderSortIcon('caseNotes')}
                </button>
              </th>
              <th className="text-right p-3 text-xs font-bold text-gray-400 w-12"></th>
            </tr>
            {/* Active Filters Row */}
            {activeFilters.length > 0 && (
              <tr className="bg-[#0a0f1a] border-b border-gray-800">
                <td colSpan={10} className="p-3">
                  <div className="flex flex-wrap gap-2">
                    {activeFilters.map((filter) => (
                      <div
                        key={filter.key}
                        className="bg-[#1e293b] border border-gray-700 rounded px-2 py-1 text-xs text-blue-400 flex items-center gap-1"
                      >
                        {filter.label}
                        <button
                          onClick={() => removeFilter(filter.key)}
                          className="hover:text-blue-300 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            )}
          </thead>
          <tbody>
            {cases.slice(0, itemsPerPage).map((c) => (
              <tr key={c.id} className="border-b border-gray-800 hover:bg-[#0a0f1a] transition-colors">
                <td className="p-3 text-sm text-white">
                  {c.clientNames.join(', ')}
                </td>
                <td className="p-3 text-sm text-gray-300">{c.caseName}</td>
                <td className="p-3 text-sm text-gray-400">
                  {format(c.dateCreated, 'dd/MM/yyyy')}
                </td>
                <td className="p-3 text-sm text-gray-300 font-medium">{c.aum}</td>
                <td className="p-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(c.caseStatus)}`}>
                    {c.caseStatus}
                  </span>
                </td>
                <td className="p-3 text-sm text-blue-400 font-mono">{c.caseId}</td>
                <td className="p-3 text-sm text-gray-300">{c.clientType}</td>
                <td className="p-3 text-sm text-gray-400">
                  {format(c.lastInterested, 'dd/MM/yyyy')}
                </td>
                <td className="p-3 text-sm text-gray-400">
                  <button
                    onClick={() => {
                      setSelectedCase(c);
                      setShowCaseNotes(true);
                    }}
                    className="hover:text-blue-400 transition-colors cursor-pointer text-left w-full"
                  >
                    {c.caseNotes}
                  </button>
                </td>
                <td className="p-3 text-right">
                  <button className="p-1 hover:bg-[#1e293b] rounded text-gray-400 hover:text-white transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-blue-400">
          Showing 1-{itemsPerPage} of {totalItems} items
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-1 hover:bg-[#1e293b] rounded text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-[#1e293b] hover:text-white'
              }`}
            >
              {page}
            </button>
          ))}

          <span className="text-gray-500 px-2">...</span>

          <button
            onClick={() => setCurrentPage(totalPages)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              currentPage === totalPages
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:bg-[#1e293b] hover:text-white'
            }`}
          >
            {totalPages}
          </button>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-1 hover:bg-[#1e293b] rounded text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* New Case Modal */}
      {showNewCase && createPortal(
        <div className="fixed inset-0 bg-black/20 backdrop-blur-xl flex items-center justify-center z-50 p-4" onClick={() => setShowNewCase(false)}>
          <div className="bg-[#1a2332] rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-[#1a2332] z-10">
              <h2 className="text-xl font-bold text-white">New Case</h2>
              <button
                onClick={() => setShowNewCase(false)}
                className="text-gray-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setNewCaseTab('NEW CLIENT')}
                  className={`flex-1 py-2 px-4 text-sm font-bold rounded transition-colors ${
                    newCaseTab === 'NEW CLIENT'
                      ? 'bg-[#3B82F6] text-white'
                      : 'bg-[#0f1420] text-gray-400 hover:text-white'
                  }`}
                >
                  NEW CLIENT
                </button>
                <button
                  onClick={() => setNewCaseTab('EXISTING CLIENT')}
                  className={`flex-1 py-2 px-4 text-sm font-bold rounded transition-colors ${
                    newCaseTab === 'EXISTING CLIENT'
                      ? 'bg-[#3B82F6] text-white'
                      : 'bg-[#0f1420] text-gray-400 hover:text-white'
                  }`}
                >
                  EXISTING CLIENT
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {newCaseTab === 'EXISTING CLIENT' ? (
                  <>
                    {/* Select client */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Select client <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={clientSearch}
                          onChange={(e) => setClientSearch(e.target.value)}
                          placeholder="Start typing to search..."
                          className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 pr-10"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      </div>
                    </div>

                    {/* Case name */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Case name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={caseName}
                        onChange={(e) => setCaseName(e.target.value)}
                        placeholder="e.g. Retirement Planning 2026"
                        className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Advice type */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Advice type
                      </label>
                      <div className="relative">
                        <select
                          value={adviceType}
                          onChange={(e) => setAdviceType(e.target.value)}
                          className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                        >
                          <option>Investment</option>
                          <option>Pension</option>
                          <option>Protection</option>
                          <option>Mortgage</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Recommendation type */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Recommendation type
                      </label>
                      <div className="relative">
                        <select
                          value={recommendationType}
                          onChange={(e) => setRecommendationType(e.target.value)}
                          className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                        >
                          <option>Full Advice</option>
                          <option>Limited Advice</option>
                          <option>Guidance</option>
                          <option>Execution Only</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* First name */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        First name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Surname */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Surname <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Date of birth */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Date of birth <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={dateOfBirth ? format(dateOfBirth, 'dd/MM/yyyy') : ''}
                          placeholder="dd/mm/yyyy"
                          readOnly
                          onClick={() => setShowDatePicker(!showDatePicker)}
                          className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 cursor-pointer"
                        />
                        
                        {showDatePicker && (
                          <div className="absolute z-10 mt-1 bg-[#1e293b] border border-gray-700 rounded-lg shadow-xl">
                            <DayPicker
                              mode="single"
                              selected={dateOfBirth}
                              onSelect={(date) => {
                                setDateOfBirth(date);
                                setShowDatePicker(false);
                              }}
                              className="p-3"
                              styles={{
                                caption: { color: '#fff' },
                                head_cell: { color: '#9ca3af' },
                                cell: { color: '#fff' },
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Case name for new client */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Case name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={caseName}
                        onChange={(e) => setCaseName(e.target.value)}
                        placeholder="e.g. Retirement Planning 2026"
                        className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Competitor */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Competitor
                      </label>
                      <input
                        type="text"
                        placeholder="Enter competitor name"
                        className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Nature of Association */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Nature of Association
                      </label>
                      <div className="relative">
                        <select
                          className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                        >
                          <option value="">Select nature of association...</option>
                          <option value="Existing Provider">Existing Provider</option>
                          <option value="Candidate">Candidate</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Advice type */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Advice type
                      </label>
                      <div className="relative">
                        <select
                          value={adviceType}
                          onChange={(e) => setAdviceType(e.target.value)}
                          className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                        >
                          <option>Investment</option>
                          <option>Pension</option>
                          <option>Protection</option>
                          <option>Mortgage</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 pb-6 flex items-center justify-between gap-3 sticky bottom-0 bg-[#1a2332]">
              <Button
                onClick={() => setShowNewCase(false)}
                className="bg-[#374151] hover:bg-[#4B5563] text-white font-bold px-6 py-2 rounded"
              >
                {newCaseTab === 'NEW CLIENT' ? 'CANCEL' : 'BACK'}
              </Button>
              <Button
                onClick={() => {
                  setShowNewCase(false);
                  resetNewCaseForm();
                }}
                className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold px-8 py-2 rounded"
              >
                {newCaseTab === 'NEW CLIENT' ? 'CREATE CLIENT & CASE' : 'CREATE CASE'}
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Case Notes Modal */}
      {showCaseNotes && selectedCase && createPortal(
        <CaseNotesModal
          caseData={selectedCase}
          onClose={() => setShowCaseNotes(false)}
        />,
        document.body
      )}
    </div>
  );
}