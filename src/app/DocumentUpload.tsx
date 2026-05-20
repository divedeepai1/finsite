import { Upload, FileText, X, Building2, Users, Landmark, Check, File, ChevronDown, Search, Trash2, PenSquare } from 'lucide-react';
import { useState, useRef, DragEvent } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Button } from './components/ui/button';
import { CreatePortfolioModal } from './components/CreatePortfolioModal';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PerformanceTab } from './components/PerformanceTab';
import { BreakdownTab } from './components/BreakdownTab';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

export default function DocumentUpload() {
  const [houseFiles, setHouseFiles] = useState<UploadedFile[]>([]);
  const [competitorFiles, setCompetitorFiles] = useState<UploadedFile[]>([]);
  const [institutionalFiles, setInstitutionalFiles] = useState<UploadedFile[]>([]);
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>('');
  const [isCreatePortfolioModalOpen, setIsCreatePortfolioModalOpen] = useState(false);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [portfolioActiveTab, setPortfolioActiveTab] = useState<'overview' | 'charges' | 'performance' | 'risk' | 'breakdown' | 'ratio'>('overview');
  const [performancePeriod, setPerformancePeriod] = useState<'1M' | '6M' | '1Y' | '3Y' | '5Y' | '10Y' | 'START'>('6M');
  const [startDate, setStartDate] = useState('10/08/2025');
  const [endDate, setEndDate] = useState('09/02/2026');
  
  const [houseDragActive, setHouseDragActive] = useState(false);
  const [competitorDragActive, setCompetitorDragActive] = useState(false);
  const [institutionalDragActive, setInstitutionalDragActive] = useState(false);

  const houseInputRef = useRef<HTMLInputElement>(null);
  const competitorInputRef = useRef<HTMLInputElement>(null);
  const institutionalInputRef = useRef<HTMLInputElement>(null);

  const competitors = [
    'Goldman Sachs',
    'Morgan Stanley',
    'JP Morgan',
    'BlackRock',
    'Vanguard',
    'Fidelity',
    'State Street',
    'BNY Mellon'
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFiles = (files: FileList | null, category: 'house' | 'competitor' | 'institutional') => {
    if (!files) return;

    // Check if competitor is selected for competitor category
    if (category === 'competitor' && !selectedCompetitor) {
      alert('Please select a competitor company first');
      return;
    }

    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date()
    }));

    if (category === 'house') {
      setHouseFiles([...houseFiles, ...newFiles]);
    } else if (category === 'competitor') {
      setCompetitorFiles([...competitorFiles, ...newFiles]);
    } else {
      setInstitutionalFiles([...institutionalFiles, ...newFiles]);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>, category: 'house' | 'competitor' | 'institutional') => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      if (category === 'house') setHouseDragActive(true);
      else if (category === 'competitor') setCompetitorDragActive(true);
      else setInstitutionalDragActive(true);
    } else if (e.type === 'dragleave') {
      if (category === 'house') setHouseDragActive(false);
      else if (category === 'competitor') setCompetitorDragActive(false);
      else setInstitutionalDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, category: 'house' | 'competitor' | 'institutional') => {
    e.preventDefault();
    e.stopPropagation();
    
    if (category === 'house') setHouseDragActive(false);
    else if (category === 'competitor') setCompetitorDragActive(false);
    else setInstitutionalDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files, category);
    }
  };

  const removeFile = (id: string, category: 'house' | 'competitor' | 'institutional') => {
    if (category === 'house') {
      setHouseFiles(houseFiles.filter(f => f.id !== id));
    } else if (category === 'competitor') {
      setCompetitorFiles(competitorFiles.filter(f => f.id !== id));
    } else {
      setInstitutionalFiles(institutionalFiles.filter(f => f.id !== id));
    }
  };

  const handleSavePortfolio = (portfolio: any) => {
    setPortfolios([...portfolios, portfolio]);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-6">
      <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Inter', sans-serif", textTransform: 'none', letterSpacing: 'normal' }}>Document Upload Center</h1>
              <p className="text-gray-400">Upload and organize documents by category for analysis and comparison</p>
            </div>

            {/* Upload Sections Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* House Documents Section */}
              <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 transition-all hover:border-blue-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-500/10 rounded-lg p-3">
                    <Building2 className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold" style={{ fontFamily: "'Inter', sans-serif", textTransform: 'none', letterSpacing: 'normal' }}>House Documents</h2>
                    <p className="text-xs text-gray-400">Your company's internal documents</p>
                  </div>
                </div>

                {/* Upload Box */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                    houseDragActive 
                      ? 'border-blue-500 bg-blue-500/10 scale-[1.02]' 
                      : 'border-gray-700 hover:border-blue-500/50'
                  }`}
                  onDragEnter={(e) => handleDrag(e, 'house')}
                  onDragLeave={(e) => handleDrag(e, 'house')}
                  onDragOver={(e) => handleDrag(e, 'house')}
                  onDrop={(e) => handleDrop(e, 'house')}
                  onClick={() => houseInputRef.current?.click()}
                >
                  <div className="mb-4">
                    <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-8 h-8 text-blue-500" />
                    </div>
                    <p className="text-sm font-bold mb-1">Drag & drop files here</p>
                    <p className="text-xs text-gray-400">or click to browse</p>
                  </div>
                  <Button 
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-6 py-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      houseInputRef.current?.click();
                    }}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Select Files
                  </Button>
                  <input
                    ref={houseInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files, 'house')}
                    accept=".pdf,.doc,.docx,.txt,.md"
                  />
                </div>

                <p className="text-xs text-gray-500 mt-3">Supported: PDF, DOC, DOCX, TXT, MD</p>

                {/* Uploaded Files List */}
                {houseFiles.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Uploaded Files ({houseFiles.length})
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {houseFiles.map((file) => (
                        <FileCard 
                          key={file.id} 
                          file={file} 
                          onRemove={() => removeFile(file.id, 'house')}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Competitor Documents Section */}
              <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 transition-all hover:border-purple-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-500/10 rounded-lg p-3">
                    <Users className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold" style={{ fontFamily: "'Inter', sans-serif", textTransform: 'none', letterSpacing: 'normal' }}>Competitor Documents</h2>
                    <p className="text-xs text-gray-400">Documents from other companies</p>
                  </div>
                </div>

                {/* Competitor Selector */}
                <div className="mb-4">
                  <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Select Competitor</label>
                  <Select value={selectedCompetitor} onValueChange={setSelectedCompetitor}>
                    <SelectTrigger className="w-full bg-[#0B1120] border-gray-700">
                      <SelectValue placeholder="Choose a company..." />
                    </SelectTrigger>
                    <SelectContent>
                      {competitors.map((company) => (
                        <SelectItem key={company} value={company}>
                          {company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Nature of Association */}
                <div className="mb-4">
                  <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Nature of Association</label>
                  <Select defaultValue="">
                    <SelectTrigger className="w-full bg-[#0B1120] border-gray-700">
                      <SelectValue placeholder="Select nature of association..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Existing Provider">Existing Provider</SelectItem>
                      <SelectItem value="Candidate">Candidate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Upload Box */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                    !selectedCompetitor 
                      ? 'border-gray-700 opacity-50 cursor-not-allowed' 
                      : competitorDragActive 
                        ? 'border-purple-500 bg-purple-500/10 scale-[1.02] cursor-pointer' 
                        : 'border-gray-700 hover:border-purple-500/50 cursor-pointer'
                  }`}
                  onDragEnter={(e) => selectedCompetitor && handleDrag(e, 'competitor')}
                  onDragLeave={(e) => selectedCompetitor && handleDrag(e, 'competitor')}
                  onDragOver={(e) => selectedCompetitor && handleDrag(e, 'competitor')}
                  onDrop={(e) => selectedCompetitor && handleDrop(e, 'competitor')}
                  onClick={() => selectedCompetitor && competitorInputRef.current?.click()}
                >
                  <div className="mb-4">
                    <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-8 h-8 text-purple-500" />
                    </div>
                    <p className="text-sm font-bold mb-1">Drag & drop files here</p>
                    <p className="text-xs text-gray-400">
                      {selectedCompetitor ? 'or click to browse' : 'Select competitor first'}
                    </p>
                  </div>
                  <Button 
                    className="bg-purple-500 hover:bg-purple-600 text-white text-xs px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selectedCompetitor}
                    onClick={(e) => {
                      e.stopPropagation();
                      competitorInputRef.current?.click();
                    }}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Select Files
                  </Button>
                  <input
                    ref={competitorInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files, 'competitor')}
                    accept=".pdf,.doc,.docx,.txt,.md"
                  />
                </div>

                <p className="text-xs text-gray-500 mt-3">Supported: PDF, DOC, DOCX, TXT, MD</p>

                {/* Uploaded Files List */}
                {competitorFiles.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Uploaded Files ({competitorFiles.length})
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {competitorFiles.map((file) => (
                        <FileCard 
                          key={file.id} 
                          file={file} 
                          onRemove={() => removeFile(file.id, 'competitor')}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Institutional Documents Section */}
              <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 transition-all hover:border-green-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500/10 rounded-lg p-3">
                    <Landmark className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold" style={{ fontFamily: "'Inter', sans-serif", textTransform: 'none', letterSpacing: 'normal' }}>Institutional Documents</h2>
                    <p className="text-xs text-gray-400">Official documents from institutions</p>
                  </div>
                </div>

                {/* Upload Box */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                    institutionalDragActive 
                      ? 'border-green-500 bg-green-500/10 scale-[1.02]' 
                      : 'border-gray-700 hover:border-green-500/50'
                  }`}
                  onDragEnter={(e) => handleDrag(e, 'institutional')}
                  onDragLeave={(e) => handleDrag(e, 'institutional')}
                  onDragOver={(e) => handleDrag(e, 'institutional')}
                  onDrop={(e) => handleDrop(e, 'institutional')}
                  onClick={() => institutionalInputRef.current?.click()}
                >
                  <div className="mb-4">
                    <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-8 h-8 text-green-500" />
                    </div>
                    <p className="text-sm font-bold mb-1">Drag & drop files here</p>
                    <p className="text-xs text-gray-400">or click to browse</p>
                  </div>
                  <Button 
                    className="bg-green-500 hover:bg-green-600 text-white text-xs px-6 py-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      institutionalInputRef.current?.click();
                    }}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Select Files
                  </Button>
                  <input
                    ref={institutionalInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files, 'institutional')}
                    accept=".pdf,.doc,.docx,.txt,.md"
                  />
                </div>

                <p className="text-xs text-gray-500 mt-3">Supported: PDF, DOC, DOCX, TXT, MD</p>

                {/* Uploaded Files List */}
                {institutionalFiles.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Uploaded Files ({institutionalFiles.length})
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {institutionalFiles.map((file) => (
                        <FileCard 
                          key={file.id} 
                          file={file} 
                          onRemove={() => removeFile(file.id, 'institutional')}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="mt-8 bg-[#111827] border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Upload Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/10 rounded-lg p-3">
                    <Building2 className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{houseFiles.length}</p>
                    <p className="text-xs text-gray-400">House Documents</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-500/10 rounded-lg p-3">
                    <Users className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{competitorFiles.length}</p>
                    <p className="text-xs text-gray-400">Competitor Documents</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-500/10 rounded-lg p-3">
                    <Landmark className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{institutionalFiles.length}</p>
                    <p className="text-xs text-gray-400">Institutional Documents</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center justify-end gap-4">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                Clear All
              </Button>
              <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-6"
                disabled={houseFiles.length === 0 && competitorFiles.length === 0 && institutionalFiles.length === 0}
              >
                Process Documents ({houseFiles.length + competitorFiles.length + institutionalFiles.length})
              </Button>
            </div>

            {/* Investment Selection Section */}
            <div className="mt-8 bg-[#1A2332] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Investment Selection</h2>
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
                    VIEW
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CIP Selection */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-300 mb-2 block">CIP Selection</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Select Funds or Portfolios"
                    className="w-full bg-[#0B1120] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
                  />
                </div>
              </div>

              {/* Portfolios Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-300">Portfolios</label>
                  <div className="flex items-center gap-2">
                    <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs px-4 py-2 font-semibold">
                      ADD MODEL PORTFOLIO
                    </Button>
                    <Button 
                      onClick={() => setIsCreatePortfolioModalOpen(true)}
                      className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs px-4 py-2 font-semibold"
                    >
                      CREATE CUSTOM PORTFOLIO
                    </Button>
                    <Button 
                      onClick={() => window.location.href = '/portfolio-filter'}
                      className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs px-4 py-2 font-semibold"
                    >
                      PORTFOLIO FILTER
                    </Button>
                  </div>
                </div>
                
                {/* Portfolio Tags */}
                {portfolios.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {portfolios.map((portfolio, index) => (
                      <div key={index} className="bg-green-600 text-white px-3 py-1.5 rounded flex items-center gap-2 text-sm">
                        <span>{portfolio.name}</span>
                        <PenSquare className="w-3 h-3" />
                        <button 
                          onClick={() => setPortfolios(portfolios.filter((_, i) => i !== index))}
                          className="hover:bg-green-700 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Funds Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-300">Funds</label>
                  <div className="flex items-center gap-2">
                    <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs px-4 py-2 font-semibold">
                      BULK IMPORT
                    </Button>
                    <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs px-4 py-2 font-semibold">
                      ADD FUND MANUALLY
                    </Button>
                    <Button 
                      onClick={() => window.location.href = '/fund-filter'}
                      className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs px-4 py-2 font-semibold"
                    >
                      FUND FILTER
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search Fund name, ISIN or Keyword(s)"
                    className="w-full bg-[#0B1120] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Portfolios Data Section - Shows below Investment Selection when portfolios exist */}
            {portfolios.length > 0 && (
              <div className="mt-8">
                {/* Tabs */}
                <div className="flex items-center gap-4 mb-6">
                  <button 
                    onClick={() => setPortfolioActiveTab('overview')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      portfolioActiveTab === 'overview' ? 'bg-[#3B82F6] text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Overview
                  </button>
                  <button 
                    onClick={() => setPortfolioActiveTab('charges')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      portfolioActiveTab === 'charges' ? 'bg-[#3B82F6] text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Charges
                  </button>
                  <button 
                    onClick={() => setPortfolioActiveTab('performance')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      portfolioActiveTab === 'performance' ? 'bg-[#3B82F6] text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Performance
                  </button>
                  <button 
                    onClick={() => setPortfolioActiveTab('risk')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      portfolioActiveTab === 'risk' ? 'bg-[#3B82F6] text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Risk
                  </button>
                  <button 
                    onClick={() => setPortfolioActiveTab('breakdown')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      portfolioActiveTab === 'breakdown' ? 'bg-[#3B82F6] text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Breakdown
                  </button>
                  <button 
                    onClick={() => setPortfolioActiveTab('ratio')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      portfolioActiveTab === 'ratio' ? 'bg-[#3B82F6] text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Ratio
                  </button>
                </div>

                {/* Performance Tab */}
                {portfolioActiveTab === 'performance' && <PerformanceTab />}

                {/* Breakdown Tab */}
                {portfolioActiveTab === 'breakdown' && <BreakdownTab />}

                {/* Overview Tab - Portfolios Table Section */}
                {portfolioActiveTab === 'overview' && (
                <div className="bg-[#0B1120]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white">Portfolios</h2>
                    <button className="text-blue-400 text-sm hover:text-blue-300">
                      Reset Filters
                    </button>
                  </div>

                  <div className="mb-4">
                    <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs px-4 py-2 font-semibold flex items-center gap-2">
                      <span className="text-lg">📤</span>
                      EXPORT ALL DATA
                    </Button>
                  </div>

                  <div className="bg-[#111827] border border-gray-800 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-[#0D1525] border-b border-gray-800">
                        <tr>
                          <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">
                            NAME
                            <button className="ml-1 text-gray-500 hover:text-gray-300">⇅</button>
                          </th>
                          <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">
                            CIP
                            <button className="ml-1 text-gray-500 hover:text-gray-300">⇅</button>
                          </th>
                          <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">
                            MORNINGSTAR SECTOR
                            <button className="ml-1 text-gray-500 hover:text-gray-300">⇅</button>
                          </th>
                          <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">
                            OCF %
                            <button className="ml-1 text-gray-500 hover:text-gray-300">⇅</button>
                          </th>
                          <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">
                            1Y PERF %
                            <button className="ml-1 text-gray-500 hover:text-gray-300">⇅</button>
                          </th>
                          <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">
                            RISK (Z+1) %
                            <button className="ml-1 text-gray-500 hover:text-gray-300">⇅</button>
                          </th>
                          <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">
                            PROVIDER
                            <button className="ml-1 text-gray-500 hover:text-gray-300">⇅</button>
                          </th>
                          <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">
                            INCEPTION
                            <button className="ml-1 text-gray-500 hover:text-gray-300">⇅</button>
                          </th>
                          <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">
                            CCY
                            <button className="ml-1 text-gray-500 hover:text-gray-300">⇅</button>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {portfolios.map((portfolio, index) => (
                          <tr key={index} className="hover:bg-[#0D1525] transition-colors">
                            <td className="px-4 py-3">
                              <div className="text-sm text-blue-400">{portfolio.name}</div>
                              <div className="text-xs text-gray-500">(View)</div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-400">-</td>
                            <td className="px-4 py-3 text-sm text-gray-400">-</td>
                            <td className="px-4 py-3 text-sm text-gray-300">{portfolio.ocf}</td>
                            <td className="px-4 py-3 text-sm text-green-400">{portfolio.performance1Y}</td>
                            <td className="px-4 py-3 text-sm text-gray-400">-</td>
                            <td className="px-4 py-3 text-sm">{portfolio.provider}</td>
                            <td className="px-4 py-3 text-sm text-gray-300">{portfolio.inception}</td>
                            <td className="px-4 py-3 text-sm text-gray-400">-</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Empty State Message */}
                    {portfolios.length === 1 && (
                      <div className="text-center py-12 text-gray-500 text-sm border-t border-gray-800">
                        No filter portfolios match the current filter criteria
                      </div>
                    )}
                  </div>

                  {/* Action Icons */}
                  <div className="flex items-center justify-end gap-3 mt-4">
                    <button className="p-2 hover:bg-gray-800 rounded" title="Search">
                      <Search className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-800 rounded" title="Filter">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h18M6 8h12M9 12h6M11 16h2" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-800 rounded" title="Table View">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="7" height="7" strokeWidth="2" />
                        <rect x="14" y="3" width="7" height="7" strokeWidth="2" />
                        <rect x="3" y="14" width="7" height="7" strokeWidth="2" />
                        <rect x="14" y="14" width="7" height="7" strokeWidth="2" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-800 rounded" title="Grid View">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="7" height="7" strokeWidth="2" />
                        <rect x="14" y="3" width="7" height="7" strokeWidth="2" />
                        <rect x="3" y="14" width="7" height="7" strokeWidth="2" />
                        <rect x="14" y="14" width="7" height="7" strokeWidth="2" />
                      </svg>
                    </button>
                  </div>
                </div>
                )}
              </div>
            )}
      </div>

      {/* Create Portfolio Modal */}
      {isCreatePortfolioModalOpen && (
        <CreatePortfolioModal isOpen={isCreatePortfolioModalOpen} onClose={() => setIsCreatePortfolioModalOpen(false)} onSave={handleSavePortfolio} />
      )}
    </div>
  );
}

// File Card Component
function FileCard({ file, onRemove }: { file: UploadedFile; onRemove: () => void }) {
  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('text')) return '📃';
    return '📁';
  };

  return (
    <div className="flex items-center justify-between bg-[#0B1120] border border-gray-800 rounded-lg p-3 hover:border-gray-700 transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-xl flex-shrink-0">{getFileIcon(file.type)}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{file.name}</p>
          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="flex-shrink-0 ml-2 p-1 hover:bg-red-500/10 rounded transition-colors"
      >
        <X className="w-4 h-4 text-red-500" />
      </button>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}