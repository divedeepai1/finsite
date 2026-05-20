const fs = require('fs');
const fundPath = '../src/app/components/FundTabContent.tsx';
let fCode = fs.readFileSync(fundPath, 'utf8');

const portfolioExposureJSX = `
        {/* Portfolio Exposure Heatmap */}
        <div className="bg-[#111827] border border-gray-800 rounded-lg p-6 mb-8 mt-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-cyan-400 text-xs font-bold flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                PORTFOLIO EXPOSURE
              </h2>
              
              {/* Date Range Selector */}
              <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
                {['1D', '1W', '1M', 'YTD', '1Y'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setHeatmapDateRange(range)}
                    className={\`px-3 py-1 text-xs font-bold rounded transition-all \${
                      heatmapDateRange === range
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }\`}
                  >
                    {range}
                  </button>
                ))}
              </div>

              {/* Return or Risk Toggle */}
              <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setHeatmapMetric('return')}
                  className={\`px-3 py-1 text-xs font-bold rounded transition-all \${
                    heatmapMetric === 'return'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }\`}
                >
                  RETURN
                </button>
                <button
                  onClick={() => setHeatmapMetric('risk')}
                  className={\`px-3 py-1 text-xs font-bold rounded transition-all \${
                    heatmapMetric === 'risk'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }\`}
                >
                  RISK
                </button>
              </div>

              {/* Fund or Portfolio Dropdown */}
              <Select value={heatmapSource} onValueChange={setHeatmapSource}>
                <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-xs h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portfolio">Portfolio</SelectItem>
                  <SelectItem value="fund">Fund</SelectItem>
                </SelectContent>
              </Select>

              {/* Breakdown Dropdown */}
              <Select value={heatmapBreakdown} onValueChange={setHeatmapBreakdown}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-xs h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asset-allocation">Asset Allocation</SelectItem>
                  <SelectItem value="country">Country</SelectItem>
                  <SelectItem value="region">Region</SelectItem>
                  <SelectItem value="sector">Sector</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-gray-400">Up / Positive</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-gray-400">Down / Negative</span>
              </div>
            </div>
          </div>

          {/* Side-by-side Layout: Heatmap + Commentary */}
          <div className="grid grid-cols-[1.2fr_1fr] gap-6">
            {/* Left: Custom Treemap Visualization */}
            <div style={{ width: '100%', height: '400px' }}>
              <CustomPortfolioTreemap 
                onCellClick={setSelectedAsset}
              />
            </div>

            {/* Right: Latest Commentary */}
            <div className="bg-[#0B1220] border border-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
                <h3 className="text-cyan-400 text-xs font-bold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  LATEST COMMENTARY
                </h3>
                <span className="text-[9px] text-gray-500">LATEST UPDATES</span>
              </div>

              {/* Scrollable Commentary */}
              <div className="space-y-4 overflow-y-auto pr-2" style={{ height: '320px' }}>
                {!selectedAsset ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Sparkles className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">Click on any asset in the treemap</p>
                      <p className="text-xs text-gray-600 mt-1">to view latest commentary</p>
                    </div>
                  </div>
                ) : (
                  (() => {
                    const commentaryItems = [
                      {
                        key: 'Tech',
                        title: 'TECHNOLOGY',
                        summary: 'Strong momentum continues across semiconductor and cloud infrastructure sectors. AI-driven demand remains robust with enterprise adoption accelerating. Large-cap names showing resilience despite valuation concerns.'
                      },
                      {
                        key: 'Finance',
                        title: 'FINANCIALS',
                        summary: 'Banking sector faces pressure from margin compression amid rate uncertainty. Credit quality remains stable with provisioning levels adequate.'
                      },
                      {
                        key: 'Health',
                        title: 'HEALTHCARE',
                        summary: 'Pharmaceutical pipeline developments remain constructive with several late-stage catalysts approaching. Med-tech seeing stable demand trends across elective procedures.'
                      },
                      {
                        key: 'Gov Bonds',
                        title: 'GOVERNMENT BONDS',
                        summary: 'Duration positioning remains defensive amid policy uncertainty. Yield curve dynamics suggest caution on long-end exposure.'
                      },
                      {
                        key: 'Corp Bonds',
                        title: 'CORPORATE BONDS',
                        summary: 'Credit spreads holding near tight levels despite macro headwinds. High-grade issuance heavy but well-absorbed by institutional buyers.'
                      },
                      {
                        key: 'PE',
                        title: 'PRIVATE EQUITY',
                        summary: 'Exit environment improving with M&A activity picking up momentum. Valuations remain elevated but dry powder deployment accelerating.'
                      },
                      {
                        key: 'Real Estate',
                        title: 'REAL ESTATE',
                        summary: 'Commercial property fundamentals diverging by sector with logistics and data centers outperforming. Office exposure facing structural headwinds.'
                      }
                    ];

                    const selectedItem = commentaryItems.find(item => item.key === selectedAsset);
                    
                    if (!selectedItem) return null;

                    return (
                      <div className="bg-gray-800/50 -mx-2 px-2 py-2 rounded-lg transition-all duration-300">
                        <div className="mb-2">
                          <h4 className="text-xs font-bold text-blue-400 uppercase">{selectedItem.title}</h4>
                        </div>
                        <p className="text-[10px] text-gray-300 leading-relaxed">
                          {selectedItem.summary}
                        </p>
                      </div>
                    );
                  })()
                )}
              </div>
            </div>
          </div>
        </div>
`;

const fundAnalysisJSX = `
        {/* Fund Analysis Section */}
        <div className="bg-[#111827] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-blue-500 text-xs font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              FUND ANALYSIS
            </h2>
            <Select defaultValue="global">
              <SelectTrigger className="w-60 bg-gray-800 border-gray-700 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Global Equity Fund</SelectItem>
                <SelectItem value="balanced">Balanced Growth Fund</SelectItem>
                <SelectItem value="income">Fixed Income Fund</SelectItem>
                <SelectItem value="emerging">Emerging Markets Fund</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-[#0B1220] rounded-lg p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1">PruFund Global Diversification</h3>
                <p className="text-xs text-blue-500">Asset allocations to October 2025</p>
              </div>
              <div className="text-blue-500 text-sm font-bold">PruFund Growth Fund</div>
            </div>

            <div className="grid grid-cols-[1fr_1.2fr] gap-12">
              <div className="flex flex-col items-center justify-center">
                <div style={{ width: '400px', height: '400px' }}>
                  {isMounted && (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'UK Equity', value: 11.20, color: '#FDB813' },
                            { name: 'Europe Ex UK Equity', value: 5.20, color: '#FF6B35' },
                            { name: 'North America Equity', value: 7.02, color: '#22C55E' },
                            { name: 'Emerging Equity', value: 1.94, color: '#3B82F6' },
                            { name: 'Asia Ex Japan', value: 6.86, color: '#A855F7' },
                            { name: 'China Equity', value: 1.80, color: '#EF4444' },
                            { name: 'Japan Equity', value: 2.95, color: '#06B6D4' },
                            { name: 'Middle East and Africa', value: 2.32, color: '#9CA3AF' },
                            { name: 'India Equity', value: 1.16, color: '#EC4899' },
                            { name: 'UK Real Estate', value: 8.01, color: '#D97706' },
                            { name: 'US Real Estate', value: 1.32, color: '#F87171' },
                            { name: 'Europe Ex UK Real Estate', value: 1.60, color: '#34D399' },
                            { name: 'Asia Real Estate', value: 1.67, color: '#60A5FA' },
                            { name: 'Private Equity', value: 5.20, color: '#C084FC' },
                            { name: 'Infrastructure', value: 2.90, color: '#2DD4BF' },
                            { name: 'Private High Yield', value: 3.44, color: '#F472B6' }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={100}
                          outerRadius={160}
                          paddingAngle={1}
                          dataKey="value"
                        >
                          {[
                            { name: 'UK Equity', value: 11.20, color: '#FDB813' },
                            { name: 'Europe Ex UK Equity', value: 5.20, color: '#FF6B35' },
                            { name: 'North America Equity', value: 7.02, color: '#22C55E' },
                            { name: 'Emerging Equity', value: 1.94, color: '#3B82F6' },
                            { name: 'Asia Ex Japan', value: 6.86, color: '#A855F7' },
                            { name: 'China Equity', value: 1.80, color: '#EF4444' },
                            { name: 'Japan Equity', value: 2.95, color: '#06B6D4' },
                            { name: 'Middle East and Africa', value: 2.32, color: '#9CA3AF' },
                            { name: 'India Equity', value: 1.16, color: '#EC4899' },
                            { name: 'UK Real Estate', value: 8.01, color: '#D97706' },
                            { name: 'US Real Estate', value: 1.32, color: '#F87171' },
                            { name: 'Europe Ex UK Real Estate', value: 1.60, color: '#34D399' },
                            { name: 'Asia Real Estate', value: 1.67, color: '#60A5FA' },
                            { name: 'Private Equity', value: 5.20, color: '#C084FC' },
                            { name: 'Infrastructure', value: 2.90, color: '#2DD4BF' },
                            { name: 'Private High Yield', value: 3.44, color: '#F472B6' }
                          ].map((entry) => (
                            <Cell key={\`allocation-\${entry.name}\`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            fontSize: '11px'
                          }}
                          formatter={(value) => [\`\${value}%\`, '']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700">
                    <h4 className="text-sm font-bold">Equity</h4>
                    <span className="text-sm font-bold">(40.61%)</span>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { num: 1, name: 'UK Equity', value: '11.20%', color: '#FDB813' },
                      { num: 2, name: 'Europe Ex UK Equity', value: '5.20%', color: '#FF6B35' },
                      { num: 3, name: 'North America Equity', value: '7.02%', color: '#22C55E' }
                    ].map((item) => (
                      <button key={item.num} className="w-full flex items-center justify-between text-xs hover:bg-gray-800/50 p-1 rounded transition-colors cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 w-4">{item.num}</span>
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                          <span className="text-gray-300">{item.name}</span>
                        </div>
                        <span className="text-gray-400 font-medium">{item.value}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="bg-[#0B1220] border border-gray-800 rounded-lg p-5">
                <h3 className="text-xs font-bold text-cyan-400 uppercase mb-4">REGIONAL ALLOCATION</h3>
                <div style={{ width: '100%', height: '280px' }}>
                  {isMounted && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={[
                          { name: 'North America', value: 55.8, color: '#06B6D4' },
                          { name: 'Europe', value: 18.3, color: '#3B82F6' },
                          { name: 'Asia Pacific', value: 15.6, color: '#22C55E' },
                          { name: 'Emerging Markets', value: 7.2, color: '#FDB813' },
                          { name: 'Other', value: 3.1, color: '#EC4899' }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          stroke="#9CA3AF" 
                          style={{ fontSize: '10px' }}
                          tick={false}
                        />
                        <YAxis 
                          stroke="#9CA3AF" 
                          style={{ fontSize: '10px' }}
                          domain={[0, 100]}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            fontSize: '11px'
                          }}
                          formatter={(value) => [\`\${value}%\`, 'Allocation']}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {[
                            { name: 'North America', value: 55.8, color: '#06B6D4' },
                            { name: 'Europe', value: 18.3, color: '#3B82F6' },
                            { name: 'Asia Pacific', value: 15.6, color: '#22C55E' },
                            { name: 'Emerging Markets', value: 7.2, color: '#FDB813' },
                            { name: 'Other', value: 3.1, color: '#EC4899' }
                          ].map((entry) => (
                            <Cell key={\`region-\${entry.name}\`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
`;

const componentsToAdd = `

// Custom Portfolio Treemap Component
function CustomPortfolioTreemap({ onCellClick }: { onCellClick: (name: string) => void }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 800 400">
      {/* Equities Box - Left Side */}
      <g key="equities-group">
        {/* Equities Container */}
        <rect key="equities-container" x="10" y="10" width="370" height="380" fill="#1a2a25" stroke="#22543D" strokeWidth="2" rx="4" />
        <text key="equities-label" x="20" y="30" fill="#FFFFFF" fontSize="12" fontWeight="600">EQUITIES</text>
        
        {/* Tech - Large green box (top) */}
        <rect 
          key="tech-rect"
          x="20" y="40" width="160" height="270" 
          fill="#2D7A4A" stroke="#000" strokeWidth="2" rx="3"
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onCellClick('Tech')}
        />
        <text key="tech-label" x="28" y="58" fill="#FFF" fontSize="11" fontWeight="600">Tech</text>
        <text key="tech-value" x="28" y="74" fill="#FFF" fontSize="10">20</text>
        <text key="tech-perf" x="28" y="90" fill="#FFF" fontSize="10">22%</text>
        <text key="tech-contrib-fund" x="28" y="106" fill="#D1D5DB" fontSize="10">Fund: 18.5%</text>
        <text key="tech-contrib-portfolio" x="28" y="120" fill="#D1D5DB" fontSize="10">Port: 15.2%</text>
        
        {/* Finance - Burgundy box (top right) */}
        <rect 
          key="finance-rect"
          x="190" y="40" width="180" height="130" 
          fill="#5C3838" stroke="#000" strokeWidth="2" rx="3"
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onCellClick('Finance')}
        />
        <text key="finance-label" x="198" y="58" fill="#FFF" fontSize="11" fontWeight="600">Finance</text>
        <text key="finance-value" x="198" y="74" fill="#FFF" fontSize="10">15</text>
        <text key="finance-perf" x="198" y="90" fill="#FFF" fontSize="10">17%</text>
        <text key="finance-contrib-fund" x="198" y="106" fill="#D1D5DB" fontSize="10">Fund: 14.2%</text>
        <text key="finance-contrib-portfolio" x="198" y="120" fill="#D1D5DB" fontSize="10">Port: 11.8%</text>
        
        {/* Health - Dark green box (bottom) */}
        <rect 
          key="health-rect"
          x="20" y="320" width="350" height="60" 
          fill="#2D4D3F" stroke="#000" strokeWidth="2" rx="3"
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onCellClick('Health')}
        />
        <text key="health-label" x="28" y="338" fill="#FFF" fontSize="11" fontWeight="600">Health</text>
        <text key="health-value" x="100" y="338" fill="#FFF" fontSize="10">10</text>
        <text key="health-perf" x="140" y="338" fill="#FFF" fontSize="10">11%</text>
        <text key="health-contrib-fund" x="28" y="354" fill="#D1D5DB" fontSize="10">Fund: 9.5%</text>
        <text key="health-contrib-portfolio" x="28" y="370" fill="#D1D5DB" fontSize="10">Port: 7.8%</text>
      </g>
      
      {/* Fixed Income Box - Top Right */}
      <g key="fixed-income-group">
        {/* Fixed Income Container */}
        <rect key="fixed-income-container" x="390" y="10" width="400" height="210" fill="#2a1a1a" stroke="#7F1D1D" strokeWidth="2" rx="4" />
        <text key="fixed-income-label" x="400" y="30" fill="#FFFFFF" fontSize="12" fontWeight="600">FIXED INCOME</text>
        
        {/* Gov Bonds - Medium red box */}
        <rect 
          key="gov-bonds-rect"
          x="400" y="40" width="180" height="170" 
          fill="#6B3232" stroke="#000" strokeWidth="2" rx="3"
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onCellClick('Gov Bonds')}
        />
        <text key="gov-bonds-label" x="408" y="58" fill="#FFF" fontSize="11" fontWeight="600">Gov Bonds</text>
        <text key="gov-bonds-value" x="408" y="74" fill="#FFF" fontSize="10">18</text>
        <text key="gov-bonds-perf" x="408" y="90" fill="#FFF" fontSize="10">30%</text>
        <text key="gov-bonds-contrib-fund" x="408" y="106" fill="#D1D5DB" fontSize="10">Fund: 17.2%</text>
        <text key="gov-bonds-contrib-portfolio" x="408" y="120" fill="#D1D5DB" fontSize="10">Port: 14.5%</text>
        
        {/* Corp Bonds - Darker burgundy box */}
        <rect 
          key="corp-bonds-rect"
          x="590" y="40" width="190" height="170" 
          fill="#4A2828" stroke="#000" strokeWidth="2" rx="3"
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onCellClick('Corp Bonds')}
        />
        <text key="corp-bonds-label" x="598" y="58" fill="#FFF" fontSize="11" fontWeight="600">Corp Bonds</text>
        <text key="corp-bonds-value" x="598" y="74" fill="#FFF" fontSize="10">12</text>
        <text key="corp-bonds-perf" x="598" y="90" fill="#FFF" fontSize="10">20%</text>
        <text key="corp-bonds-contrib-fund" x="598" y="106" fill="#D1D5DB" fontSize="10">Fund: 11.4%</text>
        <text key="corp-bonds-contrib-portfolio" x="598" y="120" fill="#D1D5DB" fontSize="10">Port: 9.6%</text>
      </g>
      
      {/* Alts Box - Bottom Right */}
      <g key="alts-group">
        {/* Alts Container */}
        <rect key="alts-container" x="390" y="230" width="400" height="160" fill="#1a2a22" stroke="#166534" strokeWidth="2" rx="4" />
        <text key="alts-label" x="400" y="250" fill="#FFFFFF" fontSize="12" fontWeight="600">ALTS</text>
        
        {/* PE - Medium green box */}
        <rect 
          key="pe-rect"
          x="400" y="260" width="180" height="120" 
          fill="#2D5A42" stroke="#000" strokeWidth="2" rx="3"
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onCellClick('PE')}
        />
        <text key="pe-label" x="408" y="278" fill="#FFF" fontSize="11" fontWeight="600">PE</text>
        <text key="pe-value" x="408" y="294" fill="#FFF" fontSize="10">15</text>
        <text key="pe-perf" x="408" y="310" fill="#FFF" fontSize="10">30%</text>
        <text key="pe-contrib-fund" x="408" y="326" fill="#D1D5DB" fontSize="10">Fund: 14.3%</text>
        <text key="pe-contrib-portfolio" x="408" y="340" fill="#D1D5DB" fontSize="10">Port: 12.0%</text>
        
        {/* Real Estate - Dark gray box */}
        <rect 
          key="real-estate-rect"
          x="590" y="260" width="190" height="120" 
          fill="#2D3D3D" stroke="#000" strokeWidth="2" rx="3"
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onCellClick('Real Estate')}
        />
        <text key="real-estate-label" x="598" y="278" fill="#FFF" fontSize="11" fontWeight="600">Real Estate</text>
        <text key="real-estate-value" x="598" y="294" fill="#FFF" fontSize="10">10</text>
        <text key="real-estate-perf" x="598" y="310" fill="#FFF" fontSize="10">20%</text>
        <text key="real-estate-contrib-fund" x="598" y="326" fill="#D1D5DB" fontSize="10">Fund: 9.5%</text>
        <text key="real-estate-contrib-portfolio" x="598" y="340" fill="#D1D5DB" fontSize="10">Port: 8.0%</text>
      </g>
    </svg>
  );
}

`;

let fLines = fCode.split('\\n');

let sectionClosingIndex = fLines.length - 1;
while(sectionClosingIndex > 0 && !fLines[sectionClosingIndex].includes('</section>')) {
  sectionClosingIndex--;
}

fLines.splice(sectionClosingIndex + 1, 0, portfolioExposureJSX, fundAnalysisJSX);

fLines.push(componentsToAdd);

fs.writeFileSync(fundPath, fLines.join('\\n'));
