import { ChevronDown, Zap, ListChecks, Building, Layers, FileCheck, ArrowRight, History as HistoryIcon, Settings, TrendingUp, Mic, Folder, FileText } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from './components/ui/button';
import { useState } from 'react';
import { HouseViewResults } from './HouseViewResults';
import { MarketTabs } from './components/MarketTabs';

export default function HouseView() {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [analysisMode, setAnalysisMode] = useState<'structured' | 'focused'>('structured');
  const [fullDocumentAccess, setFullDocumentAccess] = useState(true);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [focusedQuestion, setFocusedQuestion] = useState('');
  const [outputTone, setOutputTone] = useState('professional');
  const [outputLength, setOutputLength] = useState('standard');
  const [outputFormat, setOutputFormat] = useState('document');

  const toggleDocument = (docId: string) => {
    if (selectedDocuments.includes(docId)) {
      setSelectedDocuments(selectedDocuments.filter(id => id !== docId));
    } else if (selectedDocuments.length < 5) {
      setSelectedDocuments([...selectedDocuments, docId]);
    }
  };

  if (showResults) {
    return <HouseViewResults navigate={navigate} onBack={() => setShowResults(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      {/* Secondary Navigation - Tabs */}
      <MarketTabs currentTab="house-view" showHistory onHistoryClick={() => {}} />

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-72 border-r border-[#1F2937] bg-[#0B1220] min-h-screen p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-5 h-5 text-[#3B82F6]" />
              <h2 className="text-lg font-bold text-[#E5E7EB]">House View Generator</h2>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Generate insights based on your firm's investment perspective
            </p>
          </div>

          {/* Output Settings */}
          <div className="mb-6">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4 text-blue-500" />
              Output Settings
            </h3>
            <div className="space-y-3">
              {/* Tone */}
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Tone</label>
                <select 
                  value={outputTone}
                  onChange={(e) => setOutputTone(e.target.value)}
                  className="w-full bg-[#111827] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="professional">Professional</option>
                  <option value="executive">Executive Summary</option>
                  <option value="technical">Technical</option>
                  <option value="client-friendly">Client-Friendly</option>
                  <option value="formal">Formal</option>
                </select>
              </div>

              {/* Length */}
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Length</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setOutputLength('brief')}
                    className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                      outputLength === 'brief'
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-[#111827] border-gray-700 text-gray-400 hover:border-blue-500'
                    }`}
                  >
                    Brief
                  </button>
                  <button
                    onClick={() => setOutputLength('standard')}
                    className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                      outputLength === 'standard'
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-[#111827] border-gray-700 text-gray-400 hover:border-blue-500'
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setOutputLength('detailed')}
                    className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                      outputLength === 'detailed'
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-[#111827] border-gray-700 text-gray-400 hover:border-blue-500'
                    }`}
                  >
                    Detailed
                  </button>
                </div>
              </div>

              {/* Output Format */}
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Output Format</label>
                <select 
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="w-full bg-[#111827] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="document">Document</option>
                  <option value="client-email">Client Email</option>
                  <option value="powerpoint">PowerPoint Ready (Bullets)</option>
                  <option value="text-to-copy">Text to Copy</option>
                </select>
              </div>
            </div>
          </div>

          {/* Analysis Mode */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3 text-[#E5E7EB]">Analysis Mode</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setAnalysisMode('structured')}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  analysisMode === 'structured' 
                    ? 'bg-[#3B82F6] border-[#3B82F6] text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-[#162033] border-[#1F2937] text-[#9CA3AF] hover:border-[#374151]'
                }`}
              >
                <ListChecks className="w-5 h-5 mx-auto mb-2" />
                <div className="text-xs font-bold">Structured Topics</div>
              </button>
              
              <button 
                onClick={() => setAnalysisMode('focused')}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  analysisMode === 'focused' 
                    ? 'bg-[#3B82F6] border-[#3B82F6] text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-[#162033] border-[#1F2937] text-[#9CA3AF] hover:border-[#374151]'
                }`}
              >
                <Zap className="w-5 h-5 mx-auto mb-2" />
                <div className="text-xs font-bold">Fast & Focused</div>
              </button>
            </div>

            <div className="mt-3 p-3 bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded text-xs">
              <span className="text-yellow-500">⚠</span> <span className="font-bold text-white">Document Access:</span> <span className="text-gray-300">Structured topics analyze all company documents. Fast & Focused limited to 5 selected documents.</span>
            </div>
          </div>

          {/* Conditional Content based on Analysis Mode */}
          {analysisMode === 'structured' ? (
            <>
              {/* Select Fund */}
              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm font-bold mb-2">
                  <Building className="w-4 h-4 text-blue-500" />
                  Select Fund
                </label>
                <select className="w-full bg-[#111827] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
                  <option>All Funds</option>
                  <option>Global Growth Fund</option>
                  <option>Value Opportunities Fund</option>
                  <option>Balanced Portfolio Fund</option>
                  <option>Emerging Markets Fund</option>
                  <option>Technology Innovation Fund</option>
                  <option>Income & Dividend Fund</option>
                </select>
              </div>

              {/* Select Asset Class */}
              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm font-bold mb-2">
                  <Layers className="w-4 h-4 text-blue-500" />
                  Select Asset Class
                </label>
                <select className="w-full bg-[#111827] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
                  <option>All Asset Classes</option>
                  <option>Equities</option>
                  <option>Fixed Income</option>
                  <option>Alternatives</option>
                  <option>Real Estate</option>
                  <option>Commodities</option>
                  <option>Digital Assets</option>
                </select>
              </div>

              {/* Select Macro Theme */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-bold mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  Select Macro Theme
                </label>
                <select className="w-full bg-[#111827] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
                  <option>All Macro Themes</option>
                  <option>Inflation & Monetary Policy</option>
                  <option>Recession Risk</option>
                  <option>Geopolitical Tensions</option>
                  <option>AI & Technology Disruption</option>
                  <option>Energy Transition</option>
                  <option>China Economic Outlook</option>
                  <option>Emerging Markets Growth</option>
                  <option>Interest Rate Environment</option>
                </select>
              </div>

              {/* Full Document Access */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center gap-2 text-sm font-bold">
                    <FileCheck className="w-4 h-4 text-green-500" />
                    Full Document Access
                  </label>
                  <button 
                    onClick={() => setFullDocumentAccess(!fullDocumentAccess)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      fullDocumentAccess ? 'bg-green-500' : 'bg-gray-700'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      fullDocumentAccess ? 'translate-x-5' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <p className="text-xs text-gray-400">
                  This mode analyzes all company documents for comprehensive insights
                </p>
                <p className="text-xs text-green-500 mt-1">✓ 247 documents available</p>
              </div>
            </>
          ) : (
            <>
              {/* Your Focused Question */}
              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm font-bold mb-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  Your Focused Question
                </label>
                <div className="relative">
                  <textarea
                    value={focusedQuestion}
                    onChange={(e) => setFocusedQuestion(e.target.value)}
                    placeholder="Ask anything about your house view that's not covered in structured topics..."
                    className="w-full bg-[#111827] border border-gray-700 rounded-lg px-3 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 min-h-[100px] resize-none"
                  />
                  <button className="absolute bottom-3 right-3 text-gray-500 hover:text-blue-500">
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <button className="text-xs text-blue-500 hover:text-blue-400">
                    💡 Example questions
                  </button>
                  <span className="text-xs text-gray-500">0 / 1000</span>
                </div>
              </div>

              {/* Document Selection Required Warning */}
              <div className="mb-4 p-3 bg-yellow-900 bg-opacity-20 border border-yellow-600 rounded-lg">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-500 text-lg">⚠</span>
                  <div>
                    <h4 className="text-sm font-bold text-yellow-500 mb-1">Document Selection Required</h4>
                    <p className="text-xs text-gray-300 mb-2">
                      Custom prompts require manual document selection. Choose up to 5 documents for analysis.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-yellow-500 font-bold">{selectedDocuments.length} / 5 selected</span>
                      <span className="text-xs text-yellow-600 border border-yellow-600 px-2 py-1 rounded">Limited Access</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Select Documents */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center gap-2 text-sm font-bold">
                    <Folder className="w-4 h-4 text-blue-500" />
                    Select Documents (Max 5)
                  </label>
                  <button className="text-xs text-blue-500 hover:text-blue-400">
                    🔍 Search
                  </button>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {/* Document 1 */}
                  <div 
                    onClick={() => toggleDocument('doc1')}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedDocuments.includes('doc1')
                        ? 'bg-blue-900 bg-opacity-20 border-blue-500'
                        : 'bg-[#111827] border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes('doc1')}
                      onChange={() => {}}
                      className="w-4 h-4"
                    />
                    <div className="bg-purple-500 rounded p-1">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate">Asset Allocation Strategy</h4>
                      <p className="text-xs text-gray-400">32 pages • 2 weeks ago</p>
                    </div>
                  </div>

                  {/* Document 2 */}
                  <div 
                    onClick={() => toggleDocument('doc2')}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedDocuments.includes('doc2')
                        ? 'bg-blue-900 bg-opacity-20 border-blue-500'
                        : 'bg-[#111827] border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes('doc2')}
                      onChange={() => {}}
                      className="w-4 h-4"
                    />
                    <div className="bg-orange-500 rounded p-1">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate">Market Data & Analytics</h4>
                      <p className="text-xs text-gray-400">Excel • 4.8 MB</p>
                    </div>
                  </div>

                  {/* Document 3 */}
                  <div 
                    onClick={() => toggleDocument('doc3')}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedDocuments.includes('doc3')
                        ? 'bg-blue-900 bg-opacity-20 border-blue-500'
                        : 'bg-[#111827] border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes('doc3')}
                      onChange={() => {}}
                      className="w-4 h-4"
                    />
                    <div className="bg-pink-500 rounded p-1">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate">Risk Assessment Framework</h4>
                      <p className="text-xs text-gray-400">15 pages • PDF</p>
                    </div>
                  </div>

                  {/* Document 4 */}
                  <div 
                    onClick={() => toggleDocument('doc4')}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedDocuments.includes('doc4')
                        ? 'bg-blue-900 bg-opacity-20 border-blue-500'
                        : 'bg-[#111827] border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes('doc4')}
                      onChange={() => {}}
                      className="w-4 h-4"
                    />
                    <div className="bg-cyan-500 rounded p-1">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate">ESG Integration Report</h4>
                      <p className="text-xs text-gray-400">22 pages • 3 days ago</p>
                    </div>
                  </div>

                  {/* Document 5 */}
                  <div 
                    onClick={() => toggleDocument('doc5')}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedDocuments.includes('doc5')
                        ? 'bg-blue-900 bg-opacity-20 border-blue-500'
                        : 'bg-[#111827] border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes('doc5')}
                      onChange={() => {}}
                      className="w-4 h-4"
                    />
                    <div className="bg-teal-500 rounded p-1">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate">Sector Analysis Deep Dive</h4>
                      <p className="text-xs text-gray-400">28 pages • 1 week ago</p>
                    </div>
                  </div>

                  {/* Document 6 */}
                  <div 
                    onClick={() => toggleDocument('doc6')}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedDocuments.includes('doc6')
                        ? 'bg-blue-900 bg-opacity-20 border-blue-500'
                        : 'bg-[#111827] border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes('doc6')}
                      onChange={() => {}}
                      disabled={selectedDocuments.length >= 5 && !selectedDocuments.includes('doc6')}
                      className="w-4 h-4"
                    />
                    <div className="bg-orange-400 rounded p-1">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate">Global Macro Trends</h4>
                      <p className="text-xs text-gray-400">19 pages • PDF</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Generate Button */}
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3" onClick={() => setShowResults(true)}>
            <Building className="w-4 h-4 mr-2" />
            Generate House View
          </Button>
          <p className="text-xs text-gray-500 text-center mt-2">
            ⏱ Estimated: 10-15 seconds
          </p>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-12">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="bg-blue-500 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Building className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Generate Your House View</h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Select structured topics for comprehensive analysis across <span className="text-white font-bold">all documents</span>, or craft a custom question with selected sources.
              </p>
            </div>

            {/* Mode Cards */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-[#111827] border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-500 rounded-lg p-2">
                    <ListChecks className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg">Structured Topics</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Pre-defined themes with full document access
                </p>
                <div className="flex items-center gap-1 text-xs text-green-500">
                  <span>✓</span>
                  <span>All 247 documents</span>
                </div>
              </div>

              <div className="bg-[#111827] border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gray-700 rounded-lg p-2">
                    <Zap className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="font-bold text-lg">Custom Prompt</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Ask anything with selected documents
                </p>
                <div className="flex items-center gap-1 text-xs text-yellow-500">
                  <span>⚠</span>
                  <span>Max 5 documents</span>
                </div>
              </div>
            </div>

            {/* Popular Topics */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
              <h2 className="text-xl font-bold mb-6">Popular Topics</h2>

              <div className="space-y-3">
                <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 rounded-lg p-4 text-left transition-colors flex items-center justify-between group">
                  <span className="text-sm">Technology sector outlook with AI focus</span>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-blue-500" />
                </button>

                <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 rounded-lg p-4 text-left transition-colors flex items-center justify-between group">
                  <span className="text-sm">Inflation outlook across asset classes</span>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-blue-500" />
                </button>

                <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 rounded-lg p-4 text-left transition-colors flex items-center justify-between group">
                  <span className="text-sm">Emerging markets growth opportunities</span>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-blue-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}