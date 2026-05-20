import { useState } from 'react';
import { X, FileText, Download, Copy, Check, GitCompare, Handshake, TrendingDown, Target, AlertTriangle, Lightbulb, ArrowLeft } from 'lucide-react';

interface ComparisonAnalysisSliderProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (document: any) => void;
}

export function ComparisonAnalysisSlider({ isOpen, onClose, onSave }: ComparisonAnalysisSliderProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveDocument = () => {
    const savedDoc = {
      id: `compare-${Date.now()}`,
      title: 'Q4 2024 Market Outlook - Comparison Analysis',
      content: 'Full comparison analysis content...',
      source: 'Competitor Analysis',
      savedAt: new Date(),
      type: 'compare' as const
    };
    
    onSave(savedDoc);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleCopySection = (section: string, content: string, sectionTitle: string) => {
    try {
      // Create a temporary textarea element
      const textarea = document.createElement('textarea');
      textarea.value = content;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      
      // Save to Documents tab
      const savedDoc = {
        id: `compare-section-${Date.now()}`,
        title: `${sectionTitle} - Q4 2024 Market Outlook`,
        content: content,
        source: 'Competitor Analysis',
        savedAt: new Date(),
        type: 'compare' as const
      };
      onSave(savedDoc);
      
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Slider */}
      <div className="fixed right-0 top-0 h-full w-[900px] bg-[#0B1220] z-50 shadow-2xl border-l border-gray-800 flex flex-col">
        {/* Header */}
        <div className="bg-[#0D1525] border-b border-gray-800 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-white">Document View</h2>
              <p className="text-xs text-gray-400">Comparison Analysis Results</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveDocument}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all text-sm font-bold"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Save to Documents
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            {/* Document Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <GitCompare className="w-6 h-6 text-blue-400" />
                <h1 className="text-2xl font-bold text-white">Comparison Analysis Results</h1>
              </div>
              <p className="text-sm text-gray-400">Q4 2024 Market Outlook - Generated on {new Date().toLocaleDateString()}</p>
            </div>

            {/* Executive Summary */}
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-lg font-bold text-white">Executive Summary</h2>
                </div>
                <button
                  onClick={() => handleCopySection('executive', `EXECUTIVE SUMMARY\n\nAnalysis of Q4 2024 Market Outlook reveals significant alignment across Goldman Sachs, JPMorgan, and BlackRock on core themes including cautious equity positioning, credit selectivity, and central bank policy expectations. However, notable divergences emerge in views on emerging markets, technology sector valuations, and duration positioning.\n\nOverall Consensus: 78%\nFirms Analyzed: 3/3\nKey Topics: 12`, 'Executive Summary')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#0B1220] border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all text-sm"
                >
                  {copiedSection === 'executive' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-xs">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-xs">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Analysis of Q4 2024 Market Outlook reveals significant alignment across Goldman Sachs, JPMorgan, and BlackRock 
                on core themes including cautious equity positioning, credit selectivity, and central bank policy expectations. 
                However, notable divergences emerge in views on emerging markets, technology sector valuations, and duration positioning.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#0B1220] border border-gray-700 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400 mb-1">78%</div>
                  <div className="text-xs text-gray-400">Overall Consensus</div>
                </div>
                <div className="bg-[#0B1220] border border-gray-700 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-400 mb-1">3/3</div>
                  <div className="text-xs text-gray-400">Firms Analyzed</div>
                </div>
                <div className="bg-[#0B1220] border border-gray-700 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">12</div>
                  <div className="text-xs text-gray-400">Key Topics</div>
                </div>
              </div>
            </div>

            {/* Consensus Views */}
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-green-400" />
                  <h2 className="text-lg font-bold text-white">Consensus Views</h2>
                  <span className="text-xs text-gray-400 ml-2">High Agreement (85%+)</span>
                </div>
                <button
                  onClick={() => handleCopySection('consensus', `CONSENSUS VIEWS - High Agreement (85%+)\n\n1. Federal Reserve Policy Trajectory (92% Agree)\nAll three firms expect the Fed to maintain restrictive policy through Q4 2024, with potential for one 25bp cut if inflation continues to moderate. Consensus on terminal rate around 5.00-5.25%.\nAll firms aligned: Goldman Sachs, JPMorgan, BlackRock\n\n2. Credit Market Selectivity (88% Agree)\nStrong agreement on maintaining selective approach to credit. Favor high-grade corporates and short-duration strategies. Caution on speculative grade given tight spreads and economic uncertainty.\nAll firms aligned: Goldman Sachs, JPMorgan, BlackRock\n\n3. Energy Sector Positioning (85% Agree)\nNeutral to slightly overweight energy. Consensus on oil prices stabilizing in $75-85/bbl range. Prefer integrated majors with strong cash flow generation and shareholder returns.\nAll firms aligned: Goldman Sachs, JPMorgan, BlackRock`, 'Consensus Views')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#0B1220] border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all text-sm"
                >
                  {copiedSection === 'consensus' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-xs">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-xs">Copy</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Consensus Item 1 */}
                <div className="bg-[#0B1220] border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white mb-2">Federal Reserve Policy Trajectory</h3>
                      <p className="text-xs text-gray-300 leading-relaxed mb-3">
                        All three firms expect the Fed to maintain restrictive policy through Q4 2024, with potential for one 
                        25bp cut if inflation continues to moderate. Consensus on terminal rate around 5.00-5.25%.
                      </p>
                    </div>
                    <div className="ml-4">
                      <div className="bg-green-500/20 border border-green-500/40 rounded px-2 py-1">
                        <div className="text-xs font-bold text-green-400">92% Agree</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-[8px] font-bold text-white">GS</div>
                      <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-[8px] font-bold text-white">JP</div>
                      <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-[8px] font-bold text-white">BR</div>
                    </div>
                    <span className="text-xs text-gray-500">All firms aligned</span>
                  </div>
                </div>

                {/* Consensus Item 2 */}
                <div className="bg-[#0B1220] border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white mb-2">Credit Market Selectivity</h3>
                      <p className="text-xs text-gray-300 leading-relaxed mb-3">
                        Strong agreement on maintaining selective approach to credit. Favor high-grade corporates and 
                        short-duration strategies. Caution on speculative grade given tight spreads and economic uncertainty.
                      </p>
                    </div>
                    <div className="ml-4">
                      <div className="bg-green-500/20 border border-green-500/40 rounded px-2 py-1">
                        <div className="text-xs font-bold text-green-400">88% Agree</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-[8px] font-bold text-white">GS</div>
                      <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-[8px] font-bold text-white">JP</div>
                      <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-[8px] font-bold text-white">BR</div>
                    </div>
                    <span className="text-xs text-gray-500">All firms aligned</span>
                  </div>
                </div>

                {/* Consensus Item 3 */}
                <div className="bg-[#0B1220] border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white mb-2">Energy Sector Positioning</h3>
                      <p className="text-xs text-gray-300 leading-relaxed mb-3">
                        Neutral to slightly overweight energy. Consensus on oil prices stabilizing in $75-85/bbl range. 
                        Prefer integrated majors with strong cash flow generation and shareholder returns.
                      </p>
                    </div>
                    <div className="ml-4">
                      <div className="bg-green-500/20 border border-green-500/40 rounded px-2 py-1">
                        <div className="text-xs font-bold text-green-400">85% Agree</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-[8px] font-bold text-white">GS</div>
                      <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-[8px] font-bold text-white">JP</div>
                      <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-[8px] font-bold text-white">BR</div>
                    </div>
                    <span className="text-xs text-gray-500">All firms aligned</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Divergences */}
            <div className="bg-[#111827] border border-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  <h2 className="text-lg font-bold text-white">Key Divergences</h2>
                  <span className="text-xs text-gray-400 ml-2">Potential Alpha Opportunities</span>
                </div>
                <button
                  onClick={() => handleCopySection('divergences', `KEY DIVERGENCES - Potential Alpha Opportunities\n\n1. Technology Sector Valuation (45% Divergence)\nGoldman Sachs: Maintains overweight, sees AI-driven earnings growth supporting current multiples. Target S&P Tech at 15% premium.\nJPMorgan: More cautious, recommends neutral weight. Concerned about stretched valuations relative to historical norms. Suggests trimming mega-cap exposure.\nBlackRock: Neutral stance. Acknowledges strong fundamentals but advocates for selective approach favoring cash-generative names over growth-at-any-price.\n\n2. Emerging Markets Exposure (52% Divergence)\nGoldman Sachs: Underweight EM, citing dollar strength and geopolitical risks. Prefers developed markets for risk-adjusted returns.\nJPMorgan: Neutral with selective overweights in India and Mexico. Sees opportunities in countries with strong domestic demand and reform momentum.\nBlackRock: Tactical overweight. Views current valuations as attractive entry points. Emphasizes diversification benefits and long-term demographic trends.\n\n3. Duration Positioning in Fixed Income (38% Divergence)\nGoldman Sachs: Short duration bias. Expects yields to remain elevated and sees better risk-reward in 2-5 year maturities.\nJPMorgan: Neutral duration. Balanced view acknowledges both upside and downside risks to rates. Advocates barbell strategy.\nBlackRock: Extending duration gradually. Sees long-end offering value as inflation pressures ease. Recommends 10-year and beyond for total return.`, 'Key Divergences')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#0B1220] border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all text-sm"
                >
                  {copiedSection === 'divergences' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-xs">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-xs">Copy</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Divergence Item 1 */}
                <div className="bg-[#0B1220] border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white mb-2">Technology Sector Valuation</h3>
                      <p className="text-xs text-gray-300 leading-relaxed mb-3">
                        <span className="font-bold text-blue-400">Goldman Sachs:</span> Maintains overweight, sees AI-driven earnings growth 
                        supporting current multiples. Target S&P Tech at 15% premium.
                      </p>
                      <p className="text-xs text-gray-300 leading-relaxed mb-3">
                        <span className="font-bold text-blue-400">JPMorgan:</span> More cautious, recommends neutral weight. Concerned about 
                        stretched valuations relative to historical norms. Suggests trimming mega-cap exposure.
                      </p>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        <span className="font-bold text-blue-400">BlackRock:</span> Neutral stance. Acknowledges strong fundamentals but 
                        advocates for selective approach favoring cash-generative names over growth-at-any-price.
                      </p>
                    </div>
                    <div className="ml-4">
                      <div className="bg-red-500/20 border border-red-500/40 rounded px-2 py-1">
                        <div className="text-xs font-bold text-red-400">45% Divergence</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divergence Item 2 */}
                <div className="bg-[#0B1220] border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white mb-2">Emerging Markets Exposure</h3>
                      <p className="text-xs text-gray-300 leading-relaxed mb-3">
                        <span className="font-bold text-blue-400">Goldman Sachs:</span> Underweight EM, citing dollar strength and 
                        geopolitical risks. Prefers developed markets for risk-adjusted returns.
                      </p>
                      <p className="text-xs text-gray-300 leading-relaxed mb-3">
                        <span className="font-bold text-blue-400">JPMorgan:</span> Neutral with selective overweights in India and Mexico. 
                        Sees opportunities in countries with strong domestic demand and reform momentum.
                      </p>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        <span className="font-bold text-blue-400">BlackRock:</span> Tactical overweight. Views current valuations as 
                        attractive entry points. Emphasizes diversification benefits and long-term demographic trends.
                      </p>
                    </div>
                    <div className="ml-4">
                      <div className="bg-red-500/20 border border-red-500/40 rounded px-2 py-1">
                        <div className="text-xs font-bold text-red-400">52% Divergence</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divergence Item 3 */}
                <div className="bg-[#0B1220] border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white mb-2">Duration Positioning in Fixed Income</h3>
                      <p className="text-xs text-gray-300 leading-relaxed mb-3">
                        <span className="font-bold text-blue-400">Goldman Sachs:</span> Short duration bias. Expects yields to remain elevated 
                        and sees better risk-reward in 2-5 year maturities.
                      </p>
                      <p className="text-xs text-gray-300 leading-relaxed mb-3">
                        <span className="font-bold text-blue-400">JPMorgan:</span> Neutral duration. Balanced view acknowledges both upside 
                        and downside risks to rates. Advocates barbell strategy.
                      </p>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        <span className="font-bold text-blue-400">BlackRock:</span> Extending duration gradually. Sees long-end offering value 
                        as inflation pressures ease. Recommends 10-year and beyond for total return.
                      </p>
                    </div>
                    <div className="ml-4">
                      <div className="bg-red-500/20 border border-red-500/40 rounded px-2 py-1">
                        <div className="text-xs font-bold text-red-400">38% Divergence</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <h2 className="text-lg font-bold text-white">Recommended Actions</h2>
                </div>
                <button
                  onClick={() => handleCopySection('actions', `RECOMMENDED ACTIONS\n\n1. Align with Consensus on Fed Policy\nPosition portfolios for prolonged higher rates environment with selective exposure to rate-sensitive sectors\n\n2. Review Technology Exposure\nGiven divergent views, conduct deeper analysis on tech holdings and consider rebalancing based on fundamental valuations\n\n3. Explore EM Opportunities\nDivergence suggests potential alpha in selective EM exposure - research India and Mexico as potential additions\n\n4. Clarify Duration Strategy\nMixed views on duration warrant scenario analysis - consider barbell approach to balance competing perspectives`, 'Recommended Actions')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#0B1220] border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all text-sm"
                >
                  {copiedSection === 'actions' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-xs">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-xs">Copy</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white mb-1">Align with Consensus on Fed Policy</div>
                    <div className="text-xs text-gray-300">Position portfolios for prolonged higher rates environment with selective exposure to rate-sensitive sectors</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white mb-1">Review Technology Exposure</div>
                    <div className="text-xs text-gray-300">Given divergent views, conduct deeper analysis on tech holdings and consider rebalancing based on fundamental valuations</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white mb-1">Explore EM Opportunities</div>
                    <div className="text-xs text-gray-300">Divergence suggests potential alpha in selective EM exposure - research India and Mexico as potential additions</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white mb-1">Clarify Duration Strategy</div>
                    <div className="text-xs text-gray-300">Mixed views on duration warrant scenario analysis - consider barbell approach to balance competing perspectives</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
