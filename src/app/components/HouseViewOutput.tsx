import { ArrowLeft, Building2, FileText, Layers, TrendingUp, Mail, FileStack, Info } from 'lucide-react';

interface HouseViewOutputProps {
  selectedFund: string;
  selectedAssetClass: string;
  selectedMacroTheme: string;
  onBack: () => void;
  selectedFootnote: number | null;
  onFootnoteClick: (footnote: number) => void;
}

export function HouseViewOutput({ 
  selectedFund, 
  selectedAssetClass, 
  selectedMacroTheme, 
  onBack,
  selectedFootnote,
  onFootnoteClick
}: HouseViewOutputProps) {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-8">
      {/* Header with Back Button */}
      <div className="mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">Back to Input</span>
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-[#3B82F6] rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
              HOUSE VIEW SUMMARY
            </h1>
            <p className="text-xs text-gray-400">Generated on {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>

        {/* Parameters Display */}
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedFund !== 'All Funds' && (
            <div className="bg-[#162033] border border-gray-700 rounded-lg px-3 py-1.5 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span className="text-xs text-gray-300">{selectedFund}</span>
            </div>
          )}
          {selectedAssetClass !== 'All Asset Classes' && (
            <div className="bg-[#162033] border border-gray-700 rounded-lg px-3 py-1.5 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-xs text-gray-300">{selectedAssetClass}</span>
            </div>
          )}
          {selectedMacroTheme !== 'All Macro Themes' && (
            <div className="bg-[#162033] border border-gray-700 rounded-lg px-3 py-1.5 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="text-xs text-gray-300">{selectedMacroTheme}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area with Summary and Sources */}
      <div className="flex gap-6 flex-1">
        {/* Summary Section */}
        <div className="flex-1">
          <div className="bg-[#111827] border border-gray-700 rounded-xl p-6">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Investment View Summary
            </h2>
            
            <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
              {/* Paragraph 1 */}
              <p>
                The US equity market continues to demonstrate resilience amid evolving macroeconomic conditions. 
                Recent data suggests that corporate earnings have exceeded expectations, particularly in the technology and healthcare sectors
                <button 
                  onClick={() => onFootnoteClick(1)}
                  className="inline-flex items-baseline text-[#3B82F6] hover:text-[#60A5FA] ml-1 transition-colors"
                >
                  <sup className="text-xs font-bold">[1]</sup>
                </button>. 
                The Federal Reserve's measured approach to monetary policy has provided stability, though inflation concerns persist. 
                Market volatility remains elevated relative to historical averages, requiring careful portfolio positioning
                <button 
                  onClick={() => onFootnoteClick(2)}
                  className="inline-flex items-baseline text-[#3B82F6] hover:text-[#60A5FA] ml-1 transition-colors"
                >
                  <sup className="text-xs font-bold">[2]</sup>
                </button>.
              </p>

              {/* Paragraph 2 */}
              <p>
                Our fundamental analysis indicates attractive valuations across multiple market segments. 
                The forward P/E ratio for the S&P 500 stands at 18.2x, slightly below the 10-year average, suggesting room for expansion
                <button 
                  onClick={() => onFootnoteClick(3)}
                  className="inline-flex items-baseline text-[#3B82F6] hover:text-[#60A5FA] ml-1 transition-colors"
                >
                  <sup className="text-xs font-bold">[3]</sup>
                </button>. 
                Quality factors continue to outperform, with companies demonstrating strong balance sheets and consistent cash flow generation showing superior risk-adjusted returns. 
                We maintain a constructive view on large-cap growth equities, balanced with selective value opportunities in cyclical sectors
                <button 
                  onClick={() => onFootnoteClick(4)}
                  className="inline-flex items-baseline text-[#3B82F6] hover:text-[#60A5FA] ml-1 transition-colors"
                >
                  <sup className="text-xs font-bold">[4]</sup>
                </button>.
              </p>

              {/* Paragraph 3 */}
              <p>
                From a portfolio construction perspective, we recommend maintaining strategic overweight positions in US equities relative to international developed markets. 
                The combination of superior earnings growth, innovation capacity, and structural advantages in technology and services sectors supports this positioning. 
                However, tactical allocations should account for near-term headwinds including potential regulatory changes and geopolitical uncertainties
                <button 
                  onClick={() => onFootnoteClick(5)}
                  className="inline-flex items-baseline text-[#3B82F6] hover:text-[#60A5FA] ml-1 transition-colors"
                >
                  <sup className="text-xs font-bold">[5]</sup>
                </button>. 
                Diversification across market capitalizations and style factors remains prudent, with particular attention to emerging opportunities in sustainable investing themes
                <button 
                  onClick={() => onFootnoteClick(6)}
                  className="inline-flex items-baseline text-[#3B82F6] hover:text-[#60A5FA] ml-1 transition-colors"
                >
                  <sup className="text-xs font-bold">[6]</sup>
                </button>.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t border-gray-700 flex gap-3">
              <button className="flex-1 bg-[#3B82F6] hover:bg-[#60A5FA] text-white py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                Export as PDF
              </button>
              <button className="flex-1 bg-[#162033] hover:bg-[#1C2A40] border border-gray-700 text-white py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Share Summary
              </button>
            </div>
          </div>
        </div>

        {/* Source Documents Panel */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-[#111827] border border-gray-700 rounded-xl p-5 sticky top-0">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileStack className="w-4 h-4" />
              Source Documents
            </h3>

            <div className="space-y-3">
              {/* Document 1 */}
              <button
                onClick={() => onFootnoteClick(1)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedFootnote === 1 
                    ? 'bg-[#3B82F6]/10 border-[#3B82F6]' 
                    : 'bg-[#0B1220] border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-[#3B82F6] font-bold text-xs">[1]</span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">Q4 2024 Market Outlook</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Page 12 • Dec 15, 2024</p>
                  </div>
                </div>
                {selectedFootnote === 1 && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-[10px] text-gray-400 italic leading-relaxed">
                      "Technology sector earnings have exceeded analyst expectations by an average of 8.3%, with healthcare companies posting a 6.7% beat rate. This outperformance reflects strong fundamental momentum and positive operating leverage."
                    </p>
                  </div>
                )}
              </button>

              {/* Document 2 */}
              <button
                onClick={() => onFootnoteClick(2)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedFootnote === 2 
                    ? 'bg-[#3B82F6]/10 border-[#3B82F6]' 
                    : 'bg-[#0B1220] border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-[#3B82F6] font-bold text-xs">[2]</span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">CIO Commentary - Risk Analysis</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Page 8 • Dec 10, 2024</p>
                  </div>
                </div>
                {selectedFootnote === 2 && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-[10px] text-gray-400 italic leading-relaxed">
                      "The VIX index has averaged 18.5 over the past quarter, approximately 25% above the long-term median of 14.8. This elevated volatility environment necessitates more active portfolio management and tactical positioning."
                    </p>
                  </div>
                )}
              </button>

              {/* Document 3 */}
              <button
                onClick={() => onFootnoteClick(3)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedFootnote === 3 
                    ? 'bg-[#3B82F6]/10 border-[#3B82F6]' 
                    : 'bg-[#0B1220] border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-[#3B82F6] font-bold text-xs">[3]</span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">Equity Market Valuation Report</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Page 5 • Nov 28, 2024</p>
                  </div>
                </div>
                {selectedFootnote === 3 && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-[10px] text-gray-400 italic leading-relaxed">
                      "Our analysis shows the S&P 500 forward P/E multiple at 18.2x, compared to the 10-year average of 18.8x. Historical data suggests that when valuations trade below the decade average, forward 12-month returns have averaged 12.4%."
                    </p>
                  </div>
                )}
              </button>

              {/* Document 4 */}
              <button
                onClick={() => onFootnoteClick(4)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedFootnote === 4 
                    ? 'bg-[#3B82F6]/10 border-[#3B82F6]' 
                    : 'bg-[#0B1220] border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-[#3B82F6] font-bold text-xs">[4]</span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">Factor Analysis Q4 Review</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Page 14 • Nov 20, 2024</p>
                  </div>
                </div>
                {selectedFootnote === 4 && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-[10px] text-gray-400 italic leading-relaxed">
                      "Quality factor metrics including ROE, debt-to-equity, and earnings stability have shown persistent outperformance with a Sharpe ratio of 0.89 versus 0.62 for the broad market over the trailing 36 months."
                    </p>
                  </div>
                )}
              </button>

              {/* Document 5 */}
              <button
                onClick={() => onFootnoteClick(5)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedFootnote === 5 
                    ? 'bg-[#3B82F6]/10 border-[#3B82F6]' 
                    : 'bg-[#0B1220] border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-[#3B82F6] font-bold text-xs">[5]</span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">Geopolitical Risk Assessment</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Page 22 • Dec 1, 2024</p>
                  </div>
                </div>
                {selectedFootnote === 5 && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-[10px] text-gray-400 italic leading-relaxed">
                      "Near-term headwinds include potential regulatory changes in the technology sector and ongoing trade policy uncertainties. These factors contribute to an elevated uncertainty index, currently at the 72nd percentile historically."
                    </p>
                  </div>
                )}
              </button>

              {/* Document 6 */}
              <button
                onClick={() => onFootnoteClick(6)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedFootnote === 6 
                    ? 'bg-[#3B82F6]/10 border-[#3B82F6]' 
                    : 'bg-[#0B1220] border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-[#3B82F6] font-bold text-xs">[6]</span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">ESG Investment Strategy</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Page 18 • Nov 28, 2024</p>
                  </div>
                </div>
                {selectedFootnote === 6 && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-[10px] text-gray-400 italic leading-relaxed">
                      "Sustainable investing themes, particularly renewable energy and clean technology, have attracted $147B in inflows year-to-date, representing 23% of total equity fund flows and indicating strong structural demand."
                    </p>
                  </div>
                )}
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-[10px] text-gray-500 flex items-center gap-2">
                <Info className="w-3.5 h-3.5" />
                Click any footnote to view source citation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
