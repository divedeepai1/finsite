import { ChevronLeft, ChevronRight, Edit3, Bold, Italic, Underline, List, ListOrdered, Link, Download, Save, FileText, AlertTriangle, CheckCircle, X, Eye, Lightbulb, Sparkles, TrendingUp, DollarSign, Target, Users, BarChart3 } from 'lucide-react';
import { Button } from './components/ui/button';
import { useState } from 'react';
import { DocumentViewPanel } from './components/DocumentViewPanel';

export function InvestmentThesisResults({ navigate, onBack, onOpenDocumentSlider }: { navigate: any; onBack: any; onOpenDocumentSlider?: (title: string, content: any, source: string) => void }) {
  const [activeView, setActiveView] = useState('full-thesis');
  const [showDocumentPanel, setShowDocumentPanel] = useState(false);

  // Sample document sections for the panel
  const documentSections = [
    {
      title: 'Investment Thesis Overview',
      content: 'The company presents a compelling long-term investment opportunity based on strong secular growth drivers in cloud computing and AI infrastructure. Market leadership position, expanding margins, and robust free cash flow generation support a positive outlook with 12-18 month price target of $185-200 per share.',
      category: 'Investment Thesis',
    },
    {
      title: 'Competitive Advantages',
      content: 'Key competitive moats include: 1) Proprietary technology stack with 5+ years development lead, 2) Network effects from platform ecosystem with 50M+ active users, 3) High switching costs due to enterprise integrations, 4) Brand equity valued at $15B+ in independent assessments.',
      category: 'Competitive Analysis',
    },
    {
      title: 'Financial Projections',
      content: 'Revenue expected to grow 25-30% annually over next 3 years, reaching $12B by FY2027. Operating margins projected to expand from 18% to 25% through operating leverage. Free cash flow conversion rate of 85%+ enables significant capital returns to shareholders.',
      category: 'Financial Analysis',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      {/* Top Toolbar */}
      <div className="border-b border-[#1F2937] bg-[#0D1525] px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <div className="h-4 w-px bg-[#1F2937]"></div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveView('full-thesis')}
                className={`px-4 py-2 text-sm rounded transition-colors ${activeView === 'full-thesis' ? 'bg-[#1F2937] text-white font-bold' : 'text-[#9CA3AF] hover:text-white'}`}
              >
                Full Thesis
              </button>
              <button 
                onClick={() => setActiveView('validation')}
                className={`px-4 py-2 text-sm rounded transition-colors ${activeView === 'validation' ? 'bg-[#1F2937] text-white font-bold' : 'text-[#9CA3AF] hover:text-white'}`}
              >
                Validation
              </button>
              <button 
                onClick={() => setActiveView('risks')}
                className={`px-4 py-2 text-sm rounded transition-colors ${activeView === 'risks' ? 'bg-[#1F2937] text-white font-bold' : 'text-[#9CA3AF] hover:text-white'}`}
              >
                Risks
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowDocumentPanel(true)}
              className="px-3 py-1.5 bg-[#162033] hover:bg-[#1F2937] border border-blue-500/30 rounded text-xs flex items-center gap-2 text-blue-400 font-bold"
            >
              <FileText className="w-3 h-3" />
              Document View
            </button>
            <button className="px-3 py-1.5 bg-[#162033] hover:bg-[#1F2937] border border-[#1F2937] rounded text-xs flex items-center gap-2">
              <Download className="w-3 h-3" />
              Export Report
            </button>
            <button className="px-3 py-1.5 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded text-xs flex items-center gap-2 font-bold shadow-lg shadow-blue-500/20">
              <Eye className="w-3 h-3" />
              Present to Team
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar - Investment Details */}
        <div className="w-64 border-r border-[#1F2937] bg-[#0B1220] min-h-screen p-6">
          <div className="mb-6">
            <h3 className="text-xs font-bold text-[#6B7280] mb-3 uppercase tracking-wider">Investment Details</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Security:</span>
                <span className="text-white font-medium">NVDA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Fund:</span>
                <span className="text-white font-medium">Growth Fund</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Analyst:</span>
                <span className="text-white font-medium">Sarah Chen</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Date:</span>
                <span className="text-white font-medium">Feb 26, 2026</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-bold text-[#6B7280] mb-3 uppercase tracking-wider">Thesis Score</h3>
            <div className="bg-gradient-to-br from-[#22C55E]/20 to-[#22C55E]/5 border border-[#22C55E]/30 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-[#22C55E] mb-1">8.5</div>
              <div className="text-xs text-[#9CA3AF]">Strong Conviction</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-bold text-[#6B7280] mb-3 uppercase tracking-wider">Evidence Sources</h3>
            <div className="space-y-2">
              <SourceDoc icon="📊" name="Q4 Earnings Report" count="12 refs" />
              <SourceDoc icon="📄" name="Management Guidance" count="8 refs" />
              <SourceDoc icon="📘" name="Industry Research" count="15 refs" />
              <SourceDoc icon="📗" name="Competitor Analysis" count="6 refs" />
            </div>
          </div>

          <div className="p-4 bg-[#162033] border border-[#1F2937] rounded-lg">
            <h3 className="text-xs font-bold text-[#6B7280] mb-3 uppercase tracking-wider">Quick Stats</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[#9CA3AF]">Target Price:</span>
                <span className="text-[#22C55E] font-bold">$950</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9CA3AF]">Upside:</span>
                <span className="text-[#22C55E] font-bold">+34%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9CA3AF]">Time Horizon:</span>
                <span className="text-white font-bold">12-18 mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - Results */}
        <div className="flex-1 bg-[#0F1419] overflow-y-auto">
          <div className="p-8">
            {activeView === 'full-thesis' && <FullThesis />}
            {activeView === 'validation' && <ValidationView />}
            {activeView === 'risks' && <RisksView />}
          </div>
        </div>
      </div>

      {/* Document View Panel */}
      <DocumentViewPanel 
        isOpen={showDocumentPanel} 
        onClose={() => setShowDocumentPanel(false)} 
        sections={documentSections}
        source="Investment Thesis"
        onDirectSave={onOpenDocumentSlider}
      />
    </div>
  );
}

// Full Thesis Component
function FullThesis() {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#3B82F6] rounded-lg w-12 h-12 flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">NVIDIA (NVDA) Investment Thesis</h1>
            <p className="text-sm text-[#9CA3AF]">AI Infrastructure Leader - Long Position</p>
          </div>
        </div>
      </div>

      {/* Investment Summary */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-[#3B82F6]/20 to-[#3B82F6]/5 border border-[#3B82F6]/30 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-[#3B82F6] rounded p-2">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Investment Summary</h2>
              <p className="text-sm text-[#E5E7EB] leading-relaxed">
                NVIDIA represents our highest-conviction AI infrastructure play. The company dominates data center GPU market with 95%+ share and is uniquely positioned to capture the $200B+ annual AI infrastructure spending cycle. Management's strategic pivot to full-stack AI solutions (hardware + software) creates sustainable competitive moats. We see 30-35% revenue CAGR through 2026 with expanding margins as software revenue scales.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-[#0D1525]/50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-[#22C55E]">$950</div>
              <div className="text-xs text-[#6B7280]">Price Target</div>
            </div>
            <div className="bg-[#0D1525]/50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-[#3B82F6]">+34%</div>
              <div className="text-xs text-[#6B7280]">Upside</div>
            </div>
            <div className="bg-[#0D1525]/50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-[#8B5CF6]">8.5/10</div>
              <div className="text-xs text-[#6B7280]">Conviction</div>
            </div>
            <div className="bg-[#0D1525]/50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-[#EAB308]">12-18mo</div>
              <div className="text-xs text-[#6B7280]">Time Horizon</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Catalysts */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
          Key Investment Catalysts
        </h2>
        <div className="space-y-4">
          <CatalystCard 
            number="1"
            title="AI Infrastructure Supercycle"
            description="Hyperscalers (AWS, Azure, GCP) planning $150B+ in AI capex for 2024-2025. NVIDIA capturing 80%+ of incremental spend through H100/H200 GPU deployments and emerging Blackwell platform."
            impact="Very High"
            timeline="Ongoing"
            evidence={["Meta: $40B AI capex (Q4 earnings)", "Microsoft: $50B Azure AI buildout", "AWS: Expanding capacity 3x"]}
          />
          <CatalystCard 
            number="2"
            title="Software Monetization Inflection"
            description="CUDA ecosystem lock-in + new AI Enterprise software suite creating $5B+ high-margin revenue stream by 2026. Software gross margins >90% vs 70% for hardware."
            impact="High"
            timeline="12-24 months"
            evidence={["AI Enterprise ARR +300% YoY", "CUDA developer base: 4M+", "Enterprise adoption accelerating"]}
          />
          <CatalystCard 
            number="3"
            title="Margin Expansion from Mix Shift"
            description="Blackwell platform pricing 30% premium to Hopper generation. Enterprise software scaling drives 400bps gross margin expansion over 24 months."
            impact="High"
            timeline="6-12 months"
            evidence={["Blackwell orders backlogged 12+ months", "Software mix: 8% → 15% by 2026", "Gross margins: 75% → 79%"]}
          />
        </div>
      </div>

      {/* Valuation Framework */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-[#3B82F6]" />
          Valuation Framework
        </h2>
        <div className="bg-[#0D1525] border border-[#1F2937] rounded-xl p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-3">Base Case ($950)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">2026E Revenue:</span>
                  <span className="text-white font-medium">$180B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">Revenue CAGR:</span>
                  <span className="text-white font-medium">32%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">Operating Margin:</span>
                  <span className="text-white font-medium">55%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">P/E Multiple:</span>
                  <span className="text-white font-medium">35x (25E)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">Methodology:</span>
                  <span className="text-white font-medium">DCF + Comps</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-3">Scenario Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded">
                  <span className="text-[#9CA3AF]">Bull Case:</span>
                  <span className="text-[#22C55E] font-bold">$1,200 (+69%)</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded">
                  <span className="text-[#9CA3AF]">Base Case:</span>
                  <span className="text-[#3B82F6] font-bold">$950 (+34%)</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded">
                  <span className="text-[#9CA3AF]">Bear Case:</span>
                  <span className="text-[#EF4444] font-bold">$550 (-22%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Positioning */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#3B82F6]" />
          Competitive Positioning
        </h2>
        <div className="bg-[#0D1525] border border-[#1F2937] rounded-xl p-6">
          <div className="space-y-4">
            <CompetitiveItem 
              strength="Market Leadership"
              score={95}
              description="95%+ data center GPU market share. CUDA ecosystem creates 12-18 month switching cost moat."
            />
            <CompetitiveItem 
              strength="Technology Edge"
              score={90}
              description="2+ generation lead in AI chip performance. Blackwell architecture 4x training efficiency vs AMD MI300."
            />
            <CompetitiveItem 
              strength="Ecosystem Lock-in"
              score={85}
              description="4M+ CUDA developers. Enterprise customers deeply integrated with NVIDIA AI stack."
            />
            <CompetitiveItem 
              strength="Supply Chain Control"
              score={75}
              description="TSMC CoWoS capacity secured through 2025. Competitors face 12+ month bottlenecks."
            />
          </div>
        </div>
      </div>

      {/* Management Assessment */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-[#3B82F6]" />
          Management & Execution
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#0D1525] border border-[#1F2937] rounded-xl p-4">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#22C55E]" />
              Strengths
            </h3>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              <li className="flex items-start gap-2">
                <span className="text-[#22C55E] mt-1">•</span>
                <span>CEO Jensen Huang - visionary tech leader with 30+ year track record</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#22C55E] mt-1">•</span>
                <span>Consistent execution on product roadmaps (Blackwell on schedule)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#22C55E] mt-1">•</span>
                <span>Strategic M&A discipline (Mellanox integration successful)</span>
              </li>
            </ul>
          </div>
          <div className="bg-[#0D1525] border border-[#1F2937] rounded-xl p-4">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#EAB308]" />
              Watch Points
            </h3>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              <li className="flex items-start gap-2">
                <span className="text-[#EAB308] mt-1">•</span>
                <span>Customer concentration risk (top 4 customers = 45% of revenue)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EAB308] mt-1">•</span>
                <span>Capital allocation - aggressive R&D spending may pressure FCF</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EAB308] mt-1">•</span>
                <span>Succession planning - key person risk with Jensen Huang</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

// Validation View Component
function ValidationView() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Thesis Validation</h1>
        <p className="text-sm text-[#9CA3AF]">Evidence-based validation against company documents</p>
      </div>

      {/* Validation Score */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-[#22C55E]/20 to-[#22C55E]/5 border border-[#22C55E]/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overall Validation Score</h2>
              <p className="text-sm text-[#9CA3AF]">Based on 41 document references across 12 sources</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#22C55E]">8.5</div>
              <div className="text-sm text-[#9CA3AF] mt-1">Strong Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Validation by Category</h2>
        <div className="space-y-4">
          <ValidationCategory 
            category="Revenue Growth Assumptions"
            score={9.2}
            supported={8}
            challenged={1}
            neutral={2}
            details="Management guidance confirms 30%+ growth. All analyst reports align with our projections."
          />
          <ValidationCategory 
            category="Market Share Dominance"
            score={9.5}
            supported={12}
            challenged={0}
            neutral={1}
            details="Industry reports confirm 95%+ GPU market share. No credible near-term threats identified."
          />
          <ValidationCategory 
            category="Margin Expansion Thesis"
            score={8.0}
            supported={6}
            challenged={2}
            neutral={3}
            details="Software mix shift validated by management. Some concern about supply chain costs."
          />
          <ValidationCategory 
            category="Competitive Moat Strength"
            score={8.8}
            supported={9}
            challenged={1}
            neutral={2}
            details="CUDA ecosystem lock-in confirmed. AMD/Intel making progress but 2+ years behind."
          />
          <ValidationCategory 
            category="Valuation Reasonableness"
            score={7.5}
            supported={5}
            challenged={3}
            neutral={4}
            details="35x P/E reasonable for 30% grower. Some debate on multiple sustainability."
          />
        </div>
      </div>

      {/* Supporting Evidence */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Key Supporting Evidence</h2>
        <div className="space-y-3">
          <EvidenceItem 
            source="Q4 2024 Earnings Call"
            quote="We expect data center revenue to grow 40-45% in fiscal 2025, driven by unprecedented AI infrastructure demand."
            validation="Supports"
            relevance="High"
          />
          <EvidenceItem 
            source="Hyperscaler Capex Analysis"
            quote="AWS, Azure, and GCP collectively planning $150B+ in AI infrastructure spend over next 18 months."
            validation="Supports"
            relevance="High"
          />
          <EvidenceItem 
            source="JPMorgan Equity Research"
            quote="NVIDIA's CUDA moat remains impenetrable. Customers estimate 12-18 month switching cost."
            validation="Supports"
            relevance="Medium"
          />
          <EvidenceItem 
            source="Competitor Analysis - AMD"
            quote="AMD MI300 gaining traction in inference workloads. Could capture 10-15% share by 2026."
            validation="Challenges"
            relevance="Medium"
          />
        </div>
      </div>

      {/* Assumptions vs Reality */}
      <div>
        <h2 className="text-xl font-bold mb-4">Key Assumptions Check</h2>
        <div className="bg-[#0D1525] border border-[#1F2937] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#111827] border-b border-[#1F2937]">
                <th className="text-left px-6 py-3 text-xs font-bold text-[#6B7280] uppercase">Assumption</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-[#6B7280] uppercase">Our Thesis</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-[#6B7280] uppercase">Document Evidence</th>
                <th className="text-center px-6 py-3 text-xs font-bold text-[#6B7280] uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              <AssumptionRow 
                assumption="2025 Revenue"
                thesis="$135B"
                evidence="$130-140B (Mgmt Guide)"
                status="validated"
              />
              <AssumptionRow 
                assumption="Gross Margin"
                thesis="79%"
                evidence="75-77% (Analyst Est.)"
                status="optimistic"
              />
              <AssumptionRow 
                assumption="Market Share"
                thesis="90%+"
                evidence="95%+ (Industry)"
                status="conservative"
              />
              <AssumptionRow 
                assumption="AI Capex Growth"
                thesis="+50% YoY"
                evidence="+40-60% (Various)"
                status="validated"
              />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// Risks View Component
function RisksView() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Risk Analysis</h1>
        <p className="text-sm text-[#9CA3AF]">Comprehensive risk assessment and mitigation strategies</p>
      </div>

      {/* Risk Summary */}
      <div className="mb-8">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#0D1525] border border-[#EF4444]/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#EF4444] mb-1">3</div>
            <div className="text-xs text-[#6B7280]">High Priority Risks</div>
          </div>
          <div className="bg-[#0D1525] border border-[#EAB308]/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#EAB308] mb-1">5</div>
            <div className="text-xs text-[#6B7280]">Medium Risks</div>
          </div>
          <div className="bg-[#0D1525] border border-[#3B82F6]/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#3B82F6] mb-1">4</div>
            <div className="text-xs text-[#6B7280]">Low Risks</div>
          </div>
          <div className="bg-[#0D1525] border border-[#22C55E]/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#22C55E] mb-1">7.2</div>
            <div className="text-xs text-[#6B7280]">Risk-Adjusted Score</div>
          </div>
        </div>
      </div>

      {/* High Priority Risks */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
          High Priority Risks
        </h2>
        <div className="space-y-4">
          <RiskCard 
            title="Competition from Hyperscaler Custom Chips"
            severity="high"
            probability="65%"
            impact="Major (-30% to price target)"
            description="AWS Trainium, Google TPU, Microsoft Maia gaining traction for inference workloads. Could erode 10-20% of NVIDIA's TAM by 2026."
            mitigation="Monitor inference market share quarterly. NVIDIA's full-stack approach and CUDA moat provide defense. Consider trimming position if custom chip adoption accelerates beyond inference."
            indicators={["AWS Trainium adoption metrics", "Google TPU deployment rate", "Microsoft Maia customer wins"]}
          />
          <RiskCard 
            title="AI Spending Slowdown / Bubble Concerns"
            severity="high"
            probability="40%"
            impact="Severe (-50% to price target)"
            description="If AI fails to deliver ROI, hyperscalers could pause infrastructure buildout. Current spending levels assume sustained enterprise AI adoption."
            mitigation="Track AI application revenue generation at hyperscalers. Monitor enterprise AI adoption metrics. Diversification across portfolio reduces single-stock risk."
            indicators={["Azure AI revenue growth", "Enterprise GPT adoption rates", "Cloud GPU utilization metrics"]}
          />
          <RiskCard 
            title="Gross Margin Compression"
            severity="high"
            probability="55%"
            impact="Moderate (-15% to price target)"
            description="Increased competition or supply chain costs could pressure 75%+ gross margins. AMD pricing pressure or TSMC cost increases are key risks."
            mitigation="Software revenue mix shift provides margin buffer. Monitor TSMC wafer pricing and competitor product launches. Margin guidance on earnings calls is critical."
            indicators={["Blackwell gross margins", "AMD competitive pricing", "TSMC CoWoS pricing"]}
          />
        </div>
      </div>

      {/* Medium Priority Risks */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#EAB308]" />
          Medium Priority Risks
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <MediumRiskCard 
            title="Regulatory / Export Controls"
            probability="50%"
            impact="Moderate"
            description="Expanding China export restrictions could impact 15-20% of revenue."
          />
          <MediumRiskCard 
            title="Supply Chain Constraints"
            probability="45%"
            impact="Moderate"
            description="TSMC CoWoS packaging bottlenecks could limit Blackwell shipments in 2024."
          />
          <MediumRiskCard 
            title="Customer Concentration"
            probability="35%"
            impact="Moderate"
            description="Top 4 customers = 45% of revenue. Single customer pullback creates volatility."
          />
          <MediumRiskCard 
            title="Valuation Multiple Compression"
            probability="60%"
            impact="Moderate"
            description="35x P/E relies on sustained 30%+ growth. Multiple could compress to 25-28x."
          />
        </div>
      </div>

      {/* Monitoring Framework */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#3B82F6]" />
          Risk Monitoring Framework
        </h2>
        <div className="bg-[#0D1525] border border-[#1F2937] rounded-xl p-6">
          <div className="space-y-4">
            <MonitoringItem 
              metric="Data Center Revenue Growth"
              frequency="Quarterly"
              threshold="<25% YoY growth = Red Flag"
              action="Reassess growth assumptions, consider reducing position"
            />
            <MonitoringItem 
              metric="Gross Margin Trend"
              frequency="Quarterly"
              threshold="<73% = Warning Sign"
              action="Investigate mix shift, competitive pressure, supply chain costs"
            />
            <MonitoringItem 
              metric="Hyperscaler Capex Guidance"
              frequency="Quarterly"
              threshold="Aggregate guidance cut >15%"
              action="Major thesis risk - reassess AI spending cycle assumptions"
            />
            <MonitoringItem 
              metric="AMD/Intel Market Share Gains"
              frequency="Semi-Annual"
              threshold=">5% share loss in data center"
              action="Evaluate competitive moat strength, adjust conviction score"
            />
          </div>
        </div>
      </div>
    </>
  );
}

// Helper Components
function SourceDoc({ icon, name, count }: { icon: string; name: string; count: string }) {
  return (
    <div className="flex items-center justify-between text-xs p-2 bg-[#162033] rounded border border-[#1F2937]">
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span className="text-[#E5E7EB] truncate">{name}</span>
      </div>
      <span className="text-[#6B7280]">{count}</span>
    </div>
  );
}

function CatalystCard({ number, title, description, impact, timeline, evidence }: {
  number: string;
  title: string;
  description: string;
  impact: string;
  timeline: string;
  evidence: string[];
}) {
  return (
    <div className="bg-[#0D1525] border border-[#1F2937] rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="bg-[#3B82F6] rounded-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-bold text-white">{number}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold">{title}</h3>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-[#22C55E]/20 text-[#22C55E] rounded text-xs font-bold">{impact} Impact</span>
              <span className="px-2 py-1 bg-[#3B82F6]/20 text-[#3B82F6] rounded text-xs font-bold">{timeline}</span>
            </div>
          </div>
          <p className="text-sm text-[#9CA3AF] leading-relaxed mb-3">{description}</p>
          <div className="bg-[#162033] border border-[#1F2937] rounded-lg p-3">
            <div className="text-xs font-bold text-[#6B7280] mb-2">SUPPORTING EVIDENCE:</div>
            <div className="space-y-1">
              {evidence.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#9CA3AF]">
                  <span className="text-[#3B82F6] mt-0.5">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompetitiveItem({ strength, score, description }: {
  strength: string;
  score: number;
  description: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold">{strength}</span>
        <span className="text-sm font-bold text-[#22C55E]">{score}/100</span>
      </div>
      <div className="h-2 bg-[#162033] rounded-full overflow-hidden mb-2">
        <div 
          className="h-full bg-gradient-to-r from-[#22C55E] to-[#3B82F6]" 
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <p className="text-xs text-[#9CA3AF]">{description}</p>
    </div>
  );
}

function ValidationCategory({ category, score, supported, challenged, neutral, details }: {
  category: string;
  score: number;
  supported: number;
  challenged: number;
  neutral: number;
  details: string;
}) {
  const color = score >= 8.5 ? '[#22C55E]' : score >= 7 ? '[#3B82F6]' : '[#EAB308]';
  
  return (
    <div className="bg-[#0D1525] border border-[#1F2937] rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold">{category}</h3>
        <div className={`text-2xl font-bold text-${color}`}>{score}</div>
      </div>
      <div className="flex gap-4 mb-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#22C55E] rounded"></div>
          <span className="text-[#9CA3AF]">{supported} Supporting</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#EF4444] rounded"></div>
          <span className="text-[#9CA3AF]">{challenged} Challenging</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#6B7280] rounded"></div>
          <span className="text-[#9CA3AF]">{neutral} Neutral</span>
        </div>
      </div>
      <p className="text-xs text-[#9CA3AF]">{details}</p>
    </div>
  );
}

function EvidenceItem({ source, quote, validation, relevance }: {
  source: string;
  quote: string;
  validation: 'Supports' | 'Challenges' | 'Neutral';
  relevance: 'High' | 'Medium' | 'Low';
}) {
  const validationColors = {
    'Supports': 'bg-[#22C55E]/20 text-[#22C55E]',
    'Challenges': 'bg-[#EF4444]/20 text-[#EF4444]',
    'Neutral': 'bg-[#6B7280]/20 text-[#6B7280]'
  };

  const relevanceColors = {
    'High': 'bg-[#3B82F6]/20 text-[#3B82F6]',
    'Medium': 'bg-[#8B5CF6]/20 text-[#8B5CF6]',
    'Low': 'bg-[#6B7280]/20 text-[#6B7280]'
  };

  return (
    <div className="bg-[#0D1525] border border-[#1F2937] rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#3B82F6]" />
          <span className="text-sm font-bold">{source}</span>
        </div>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded text-xs font-bold ${validationColors[validation]}`}>
            {validation}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-bold ${relevanceColors[relevance]}`}>
            {relevance}
          </span>
        </div>
      </div>
      <p className="text-xs text-[#9CA3AF] italic leading-relaxed">"{quote}"</p>
    </div>
  );
}

function AssumptionRow({ assumption, thesis, evidence, status }: {
  assumption: string;
  thesis: string;
  evidence: string;
  status: 'validated' | 'optimistic' | 'conservative' | 'challenged';
}) {
  const statusConfig = {
    validated: { icon: <CheckCircle className="w-4 h-4" />, color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/20' },
    optimistic: { icon: <TrendingUp className="w-4 h-4" />, color: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/20' },
    conservative: { icon: <Target className="w-4 h-4" />, color: 'text-[#8B5CF6]', bg: 'bg-[#8B5CF6]/20' },
    challenged: { icon: <X className="w-4 h-4" />, color: 'text-[#EF4444]', bg: 'bg-[#EF4444]/20' }
  };

  const config = statusConfig[status];

  return (
    <tr className="border-b border-[#1F2937] hover:bg-[#111827] transition-colors">
      <td className="px-6 py-4 text-sm font-medium">{assumption}</td>
      <td className="px-6 py-4 text-sm text-[#E5E7EB]">{thesis}</td>
      <td className="px-6 py-4 text-sm text-[#9CA3AF]">{evidence}</td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <span className={`${config.color}`}>{config.icon}</span>
          <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${config.color} ${config.bg}`}>
            {status}
          </span>
        </div>
      </td>
    </tr>
  );
}

function RiskCard({ title, severity, probability, impact, description, mitigation, indicators }: {
  title: string;
  severity: 'high' | 'medium' | 'low';
  probability: string;
  impact: string;
  description: string;
  mitigation: string;
  indicators: string[];
}) {
  const severityColors = {
    high: 'border-[#EF4444]/30 bg-[#EF4444]/5',
    medium: 'border-[#EAB308]/30 bg-[#EAB308]/5',
    low: 'border-[#3B82F6]/30 bg-[#3B82F6]/5'
  };

  const badgeColors = {
    high: 'bg-[#EF4444] text-white',
    medium: 'bg-[#EAB308] text-white',
    low: 'bg-[#3B82F6] text-white'
  };

  return (
    <div className={`bg-[#0D1525] border rounded-xl p-6 ${severityColors[severity]}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <div className="flex gap-3 text-xs">
            <span className={`px-3 py-1 rounded font-bold uppercase ${badgeColors[severity]}`}>
              {severity} Risk
            </span>
            <span className="px-3 py-1 bg-[#162033] border border-[#1F2937] rounded font-medium text-[#9CA3AF]">
              Probability: {probability}
            </span>
            <span className="px-3 py-1 bg-[#162033] border border-[#1F2937] rounded font-medium text-[#9CA3AF]">
              {impact}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-xs font-bold text-[#6B7280] mb-2 uppercase">Description</h4>
        <p className="text-sm text-[#9CA3AF] leading-relaxed">{description}</p>
      </div>

      <div className="mb-4">
        <h4 className="text-xs font-bold text-[#6B7280] mb-2 uppercase">Mitigation Strategy</h4>
        <p className="text-sm text-[#9CA3AF] leading-relaxed">{mitigation}</p>
      </div>

      <div>
        <h4 className="text-xs font-bold text-[#6B7280] mb-2 uppercase">Key Indicators to Monitor</h4>
        <div className="space-y-1">
          {indicators.map((indicator, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-[#9CA3AF]">
              <span className="text-[#3B82F6] mt-0.5">•</span>
              <span>{indicator}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MediumRiskCard({ title, probability, impact, description }: {
  title: string;
  probability: string;
  impact: string;
  description: string;
}) {
  return (
    <div className="bg-[#0D1525] border border-[#EAB308]/30 rounded-xl p-4">
      <h3 className="font-bold mb-2">{title}</h3>
      <div className="flex gap-2 mb-3">
        <span className="px-2 py-1 bg-[#EAB308]/20 text-[#EAB308] rounded text-xs font-bold">
          {probability}
        </span>
        <span className="px-2 py-1 bg-[#162033] border border-[#1F2937] rounded text-xs text-[#9CA3AF]">
          {impact}
        </span>
      </div>
      <p className="text-xs text-[#9CA3AF] leading-relaxed">{description}</p>
    </div>
  );
}

function MonitoringItem({ metric, frequency, threshold, action }: {
  metric: string;
  frequency: string;
  threshold: string;
  action: string;
}) {
  return (
    <div className="flex gap-4 p-4 bg-[#162033] border border-[#1F2937] rounded-lg">
      <div className="flex-shrink-0">
        <BarChart3 className="w-5 h-5 text-[#3B82F6]" />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-bold">{metric}</h4>
          <span className="px-2 py-1 bg-[#3B82F6]/20 text-[#3B82F6] rounded text-xs font-bold">
            {frequency}
          </span>
        </div>
        <div className="mb-2">
          <span className="text-xs font-bold text-[#6B7280]">THRESHOLD: </span>
          <span className="text-xs text-[#9CA3AF]">{threshold}</span>
        </div>
        <div>
          <span className="text-xs font-bold text-[#6B7280]">ACTION: </span>
          <span className="text-xs text-[#9CA3AF]">{action}</span>
        </div>
      </div>
    </div>
  );
}