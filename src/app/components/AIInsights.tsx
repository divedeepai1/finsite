import { Sparkles, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';

export function AIInsights() {
  const navigate = useNavigate();

  const handleInsightClick = () => {
    navigate('/insights');
  };

  return (
    <div className="bg-[#0B1220] border border-gray-800 rounded-lg p-4 flex flex-col" style={{ height: '800px' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-cyan-400 text-xs font-bold">AI INSIGHTS</span>
        </div>
        <span className="text-[9px] bg-blue-500 text-white px-2 py-0.5 rounded font-bold">BETA</span>
      </div>

      {/* Scrollable Content */}
      <div className="space-y-3 overflow-y-auto flex-1 pr-2">
        {/* CLIENT */}
        <div 
          onClick={handleInsightClick}
          className="bg-[#0D1525] border border-gray-700 rounded-lg p-3 cursor-pointer hover:bg-[#111827] hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white text-[10px] font-bold uppercase tracking-wide">CLIENT</h3>
          </div>
          <div className="max-h-[120px] overflow-y-auto pr-1 space-y-2">
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Goldman Sachs portfolio showing strong performance with 8.5% YTD returns. Risk metrics within tolerance.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Client recently increased allocation to technology sector by 5%. Current position aligns with moderate-aggressive risk profile.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Portfolio rebalancing recommended in Q2 to maintain target asset allocation. Cash position at 3.2%, slightly below 5% target.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Tax-loss harvesting opportunities identified in fixed income positions. Potential $45K tax savings available.
            </p>
          </div>
        </div>

        {/* VIEWS */}
        <div 
          onClick={handleInsightClick}
          className="bg-[#0D1525] border border-gray-700 rounded-lg p-3 cursor-pointer hover:bg-[#111827] hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-cyan-400 text-[10px] font-bold uppercase tracking-wide">VIEWS</h3>
            <div className="flex items-center gap-1 text-gray-500">
              <span className="text-[9px]">25s ago</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
          <div className="max-h-[120px] overflow-y-auto pr-1 space-y-2">
            <p className="text-gray-300 text-[11px] leading-relaxed">
              House view remains bullish on tech sector. Recommend maintaining overweight position in AI momentum.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Strategic tilt towards semiconductor manufacturers expected to benefit from AI infrastructure buildout. NVIDIA, AMD, and TSMC remain top picks.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Defensive rotation into healthcare and utilities not recommended at current valuations. Prefer staying invested in growth themes.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Fixed income duration strategy favors 5-7 year maturities. Avoid long-duration bonds until rate clarity improves.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Emerging markets offer attractive valuations but currency risks remain elevated. Limit exposure to 8-10% of portfolio.
            </p>
          </div>
        </div>

        {/* IMPACT */}
        <div 
          onClick={handleInsightClick}
          className="bg-[#0D1525] border border-gray-700 rounded-lg p-3 cursor-pointer hover:bg-[#111827] hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-red-400 text-[10px] font-bold uppercase tracking-wide">IMPACT</h3>
            <div className="flex items-center gap-1 text-gray-500">
              <span className="text-[9px]">35s ago</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
          <div className="max-h-[120px] overflow-y-auto pr-1 space-y-2">
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Fed rate decision expected to impact bond duration strategy. Portfolio correlation rising to 0.68.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Rate cut expectations now priced in for Q2 2026. If delayed, expect 200-300bps correction in growth stocks.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Currency volatility could impact international equity returns by +/-150bps. Consider hedging 50% of foreign exposure.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Oil price spike to $95/barrel would increase portfolio energy exposure from 8% to 11% passively. Rebalancing may be required.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Geopolitical tensions in Middle East creating safe-haven flows to gold. Portfolio gold allocation up 2.3% month-over-month.
            </p>
          </div>
        </div>

        {/* STOCK STORIES */}
        <div 
          onClick={handleInsightClick}
          className="bg-[#0D1525] border border-gray-700 rounded-lg p-3 cursor-pointer hover:bg-[#111827] hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-yellow-400 text-[10px] font-bold uppercase tracking-wide">STOCK STORIES</h3>
          </div>
          <div className="max-h-[120px] overflow-y-auto pr-1 space-y-2">
            <p className="text-gray-300 text-[11px] leading-relaxed">
              NVDA earnings beat expectations with Q1 revenue of $26B (+262% YoY). AI chip demand accelerating, raising price target to $950.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              AAPL supply chain concerns emerging from Taiwan component shortages. Production delays could impact iPhone 17 launch timeline.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              MSFT cloud growth accelerating with Azure revenue +31% YoY. Enterprise AI adoption driving margin expansion to 42%.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              TSLA deliveries surprise to upside at 485K vehicles (+18% QoQ). China demand recovery and Model Y refresh driving growth.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              GOOGL ad revenue stabilizing after 3 quarters of decline. YouTube Shorts monetization improving, AI search integration progressing.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              META Reality Labs losses narrowing to $3.8B/quarter. Quest 3 sales exceeding expectations, metaverse strategy gaining traction.
            </p>
          </div>
        </div>

        {/* MACRO */}
        <div 
          onClick={handleInsightClick}
          className="bg-[#0D1525] border border-gray-700 rounded-lg p-3 cursor-pointer hover:bg-[#111827] hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-cyan-400 text-[10px] font-bold uppercase tracking-wide">MACRO</h3>
            <div className="flex items-center gap-1 text-gray-500">
              <span className="text-[9px]">9h ago</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
          <div className="max-h-[120px] overflow-y-auto pr-1 space-y-2">
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Global GDP growth revised up to 3.2% from 2.9%. Inflation moderating faster than expected across major economies.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              US core PCE inflation fell to 2.4% YoY, approaching Fed's 2% target. Labor market cooling with unemployment at 4.1%.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              China fiscal stimulus package worth $1.4T announced, targeting infrastructure and green energy. Expected GDP boost of 0.8%.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              ECB signaling potential rate cuts in H2 2026. Euro area inflation down to 2.3%, manufacturing PMI recovering to 48.5.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Commodity supercycle thesis gaining support. Copper, lithium, and rare earth prices surging on EV and renewable demand.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Global debt-to-GDP ratio reaching 340%, raising sustainability concerns. IMF warning of fiscal consolidation needs.
            </p>
          </div>
        </div>

        {/* ASSET CLASS */}
        <div 
          onClick={handleInsightClick}
          className="bg-[#0D1525] border border-gray-700 rounded-lg p-3 cursor-pointer hover:bg-[#111827] hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-green-400 text-[10px] font-bold uppercase tracking-wide">ASSET CLASS</h3>
            <div className="flex items-center gap-1 text-gray-500">
              <span className="text-[9px]">9h ago</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
          <div className="max-h-[120px] overflow-y-auto pr-1 space-y-2">
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Equities outperforming with +12.5% YTD. Technology and communication services leading with +18% and +15% respectively.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Fixed income stabilizing as rate cut expectations build. Investment grade corporate bonds yielding 5.2%, attractive vs. equities.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Commodities showing momentum with gold +14%, oil +8%, copper +22%. Energy transition metals outperforming base metals.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Real estate recovering with REIT index +6.8% YTD. Industrial and data center REITs leading, retail lagging at -2%.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Alternatives delivering 8.5% returns. Private equity valuations compressed but PE multiples remain elevated at 14x.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Cryptocurrency volatility declining. Bitcoin correlating less with risk assets, institutional adoption accelerating.
            </p>
          </div>
        </div>

        {/* COUNTRY */}
        <div 
          onClick={handleInsightClick}
          className="bg-[#0D1525] border border-gray-700 rounded-lg p-3 cursor-pointer hover:bg-[#111827] hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-blue-400 text-[10px] font-bold uppercase tracking-wide">COUNTRY</h3>
          </div>
          <div className="max-h-[120px] overflow-y-auto pr-1 space-y-2">
            <p className="text-gray-300 text-[11px] leading-relaxed">
              US markets leading globally with S&P 500 +11.2% YTD. Magnificent Seven contributing 65% of index returns.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              China stimulus measures showing early positive impact. Shanghai Composite +8.5% since announcement, property sector stabilizing.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              UK recovering with FTSE 100 +6.3% YTD. Energy and financial stocks driving performance, pound strengthening to 1.32 vs. dollar.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Japan equity market breaking 35-year highs. Nikkei 225 at 42,000, corporate governance reforms driving valuations.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              India maintaining strong growth trajectory at 7.2% GDP. Sensex +9.8% YTD, infrastructure spending supporting rally.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Brazil navigating political uncertainty. Bovespa flat YTD, real depreciating 5% vs. dollar on fiscal concerns.
            </p>
          </div>
        </div>

        {/* REGIONAL */}
        <div 
          onClick={handleInsightClick}
          className="bg-[#0D1525] border border-gray-700 rounded-lg p-3 cursor-pointer hover:bg-[#111827] hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-purple-400 text-[10px] font-bold uppercase tracking-wide">REGIONAL</h3>
            <div className="flex items-center gap-1 text-gray-500">
              <span className="text-[9px]">9h ago</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
          <div className="max-h-[120px] overflow-y-auto pr-1 space-y-2">
            <p className="text-gray-300 text-[11px] leading-relaxed">
              North America continues strength with US and Canada both posting solid gains. Tech sector dominance supporting regional outperformance.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Asia Pacific showing resilience despite China headwinds. Japan, India, and Taiwan carrying regional performance.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Europe improving gradually with manufacturing recovery. Germany and France showing green shoots, ECB dovish tilt supportive.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Latin America mixed performance. Mexico benefiting from nearshoring trends, Argentina stabilizing under new economic policies.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Middle East oil producers navigating production cuts. UAE and Saudi diversification efforts showing progress, non-oil GDP +4.5%.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Africa frontier markets attracting attention. Nigeria, Kenya, and South Africa reforms improving investment climate.
            </p>
          </div>
        </div>

        {/* SECTOR */}
        <div 
          onClick={handleInsightClick}
          className="bg-[#0D1525] border border-gray-700 rounded-lg p-3 cursor-pointer hover:bg-[#111827] hover:border-gray-600 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-green-400 text-[10px] font-bold uppercase tracking-wide">SECTOR</h3>
          </div>
          <div className="max-h-[120px] overflow-y-auto pr-1 space-y-2">
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Technology leading with AI momentum. Semiconductors +28% YTD, software +19%, hardware +14%. Valuation concerns emerging.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Healthcare stable with defensive characteristics. Biotech M&A accelerating, obesity drug makers seeing explosive growth.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Financials facing headwinds from rate uncertainty. Regional banks under pressure, investment banks benefiting from M&A rebound.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Consumer discretionary bifurcated. Luxury goods strong +12%, mass retailers struggling -3%. Income inequality driving divergence.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Energy sector volatile on geopolitical tensions. Oil services +15%, renewables +11%, traditional producers +8%.
            </p>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              Industrials benefiting from infrastructure spending. Aerospace +17%, construction +9%, transportation +7%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}