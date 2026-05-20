import { ChevronDown, Zap, ListChecks, Building, Layers, FileCheck, FileText, CheckCircle, Edit3, AlertCircle, History as HistoryIcon, TrendingUp, Lightbulb, Settings } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from './components/ui/button';
import { useState } from 'react';
import { InvestmentThesisResults } from './InvestmentThesisResults';

interface InvestmentThesisProps {
  onDirectSave?: (title: string, content: any, source: string) => void;
}

export default function InvestmentThesis({ onDirectSave }: InvestmentThesisProps) {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [inputMode, setInputMode] = useState<'structured' | 'focused'>('structured');
  const [allCompanyDocs, setAllCompanyDocs] = useState(true);

  if (showResults) {
    return <InvestmentThesisResults navigate={navigate} onBack={() => setShowResults(false)} onOpenDocumentSlider={onDirectSave} />;
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-72 border-r border-[#1F2937] bg-[#0B1220] min-h-screen p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-[#3B82F6]" />
              <h2 className="text-lg font-bold text-[#E5E7EB]">Investment Thesis Builder</h2>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Create and validate your investment thesis against company documents
            </p>
          </div>

          {/* Input Mode */}
          <div className="mb-6">
            <h3 className="text-sm font-bold mb-3">Input Mode</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setInputMode('structured')}
                className={`p-3 rounded-lg border transition-colors ${
                  inputMode === 'structured' 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'bg-[#111827] border-gray-700 text-gray-400 hover:border-blue-500'
                }`}
              >
                <ListChecks className="w-5 h-5 mx-auto mb-2" />
                <div className="text-xs font-bold">Structured</div>
              </button>
              
              <button 
                onClick={() => setInputMode('focused')}
                className={`p-3 rounded-lg border transition-colors ${
                  inputMode === 'focused' 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'bg-[#111827] border-gray-700 text-gray-400 hover:border-blue-500'
                }`}
              >
                <Zap className="w-5 h-5 mx-auto mb-2" />
                <div className="text-xs font-bold">Fast & Focused</div>
              </button>
            </div>

            <div className="mt-3 p-3 bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded text-xs">
              <span className="text-yellow-500">⚠</span> <span className="font-bold text-white">Document Access:</span> <span className="text-gray-300">Structured mode analyzes all company documents. Custom prompts limited to 5 selected documents.</span>
            </div>
          </div>

          {/* Select Fund */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-bold mb-2">
              <Building className="w-4 h-4 text-blue-500" />
              Select Fund
            </label>
            <select className="w-full bg-[#111827] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
              <option>Choose a fund...</option>
              <option>Growth Fund</option>
              <option>Value Fund</option>
              <option>Balanced Fund</option>
            </select>
          </div>

          {/* Select Asset Class */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-bold mb-2">
              <Layers className="w-4 h-4 text-blue-500" />
              Select Asset Class
            </label>
            <select className="w-full bg-[#111827] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
              <option>Choose asset class...</option>
              <option>Equities</option>
              <option>Fixed Income</option>
              <option>Alternatives</option>
            </select>
          </div>

          {/* Select Macro Theme */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-bold mb-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              Select Macro Theme
            </label>
            <select className="w-full bg-[#111827] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
              <option>Choose macro theme...</option>
              <option>Economic Growth</option>
              <option>Inflation Trends</option>
              <option>Monetary Policy</option>
            </select>
          </div>

          {/* All Company Documents */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-2 text-sm font-bold">
                <FileText className="w-4 h-4 text-green-500" />
                All Company Documents
              </label>
              <button 
                onClick={() => setAllCompanyDocs(!allCompanyDocs)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  allCompanyDocs ? 'bg-green-500' : 'bg-gray-700'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  allCompanyDocs ? 'translate-x-5' : 'translate-x-1'
                }`} />
              </button>
            </div>
            <p className="text-xs text-gray-400">
              Full access to analyze against house view and validate thesis
            </p>
            <p className="text-xs text-green-500 mt-1">✓ 247 documents • Auto-validation enabled</p>
          </div>

          {/* Output Settings */}
          <div className="mb-6">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4 text-blue-500" />
              Output Settings
            </h3>
            {/* Placeholder for settings */}
          </div>

          {/* Generate Button */}
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3" onClick={() => setShowResults(true)}>
            <Lightbulb className="w-4 h-4 mr-2" />
            Generate Investment Thesis
          </Button>
          <p className="text-xs text-gray-500 text-center mt-2">
            ⏱ Auto-validation against house view enabled
          </p>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-12">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="bg-blue-500 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Build Your Investment Thesis</h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Generate a comprehensive investment thesis validated against your company's house view and key documents.
              </p>
            </div>

            {/* Mode Cards */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <button className="bg-gray-900 border-2 border-blue-500 rounded-xl p-6 text-left hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-500 rounded-lg p-2">
                    <ListChecks className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg">Structured Topics</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Pre-defined themes with full validation
                </p>
                <div className="flex items-center gap-1 text-xs text-green-500">
                  <span>✓</span>
                  <span>Auto house view check</span>
                </div>
              </button>

              <button className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-left hover:border-blue-500 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gray-800 rounded-lg p-2">
                    <Edit3 className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="font-bold text-lg">Custom Prompt</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Ask specific thesis questions
                </p>
                <div className="flex items-center gap-1 text-xs text-yellow-500">
                  <span>⚠</span>
                  <span>Max 5 documents</span>
                </div>
              </button>
            </div>

            {/* Key Features */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-500 rounded p-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold">Key Features</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Disagreement Detection:</h3>
                    <p className="text-sm text-gray-400">Automatically flags conflicts with house view</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Edit3 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Inline Editing:</h3>
                    <p className="text-sm text-gray-400">Edit and insert content from any uploaded document</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Evidence Requests:</h3>
                    <p className="text-sm text-gray-400">Ask for additional proof for any claim</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}