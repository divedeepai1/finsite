import { 
  ArrowLeft, User, Sparkles, Copy, ThumbsUp, ThumbsDown, Lightbulb, 
  Target, Clock, Calendar, TrendingUp, FileText, MessageCircle, 
  Layers, TrendingDown, Activity, Brain, Globe, BarChart, Shield,
  BookmarkPlus, Share2, RefreshCw, AlertTriangle, X, Mail, Download
} from 'lucide-react';

interface QAResponseProps {
  question: string;
  onBack: () => void;
}

export function QAResponse({ question, onBack }: QAResponseProps) {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-semibold">Q & A RESPONSE</span>
      </button>

      <div className="flex gap-6">
        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          {/* User Question */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">YOUR QUESTION</h4>
                  <span className="text-xs text-gray-500">2 minutes ago</span>
                </div>
                <p className="text-white text-base mb-3">
                  {question || "How should I communicate recent market volatility to my clients who are concerned about their portfolio performance?"}
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded">Reassure Client</span>
                  <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded">Professional Tone</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Response */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI RESPONSE</h4>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-[#1F2937] rounded-lg transition-colors">
                  <Copy className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-[#1F2937] rounded-lg transition-colors">
                  <ThumbsUp className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-[#1F2937] rounded-lg transition-colors">
                  <ThumbsDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">Communicating During Market Volatility</h2>
            
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              When addressing client concerns about market volatility, it's essential to provide context, reassurance, and a clear action plan. Here's a structured approach:
            </p>

            {/* Section 1 */}
            <div className="mb-6">
              <h3 className="text-blue-400 font-bold text-base mb-3">1. Acknowledge Their Concerns</h3>
              <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                Begin by validating their feelings. Market volatility is unsettling, and acknowledging this shows empathy and understanding.
              </p>
              <div className="bg-[#0B1220] border-l-4 border-blue-500 p-4 rounded">
                <p className="text-gray-400 text-sm italic">
                  "I understand that recent market movements may be concerning. These fluctuations are a natural part of investing, and it's completely normal to feel uncertain during these periods."
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-6">
              <h3 className="text-blue-400 font-bold text-base mb-3">2. Provide Historical Context</h3>
              <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                Remind them that markets have weathered similar periods before and historically recovered. Use data to support your message.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>The S&P 500 has experienced over 50 corrections of 10% or more since 1950, yet has delivered an average annual return of approximately 10%</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>Long-term investors who stayed invested through volatility have historically been rewarded</span>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="mb-6">
              <h3 className="text-blue-400 font-bold text-base mb-3">3. Review Portfolio Strategy</h3>
              <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                Reaffirm that their portfolio was built with diversification and their long-term goals in mind. Explain how different asset classes are performing and why the strategy remains sound.
              </p>
              <div className="bg-[#0B1220] rounded-lg p-4">
                <p className="text-white font-semibold text-sm mb-2">Key Points to Address:</p>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    Review current asset allocation vs. target allocation
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    Explain how diversification is working to mitigate risk
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    Highlight defensive positions that are holding up well
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    Discuss any tactical adjustments that may be appropriate
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-6">
              <h3 className="text-blue-400 font-bold text-base mb-3">4. Emphasize the Long-Term Perspective</h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Redirect focus to their long-term financial goals. Short-term volatility should not derail a well-planned investment strategy designed for years or decades.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-purple-400" />
                    <h4 className="text-purple-400 font-bold text-sm">Goal Alignment</h4>
                  </div>
                  <p className="text-xs text-gray-300">
                    Remind clients that their portfolio was designed to meet specific goals with appropriate time horizons. A retirement portfolio for someone 20 years away should weather this storm.
                  </p>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-cyan-400 font-bold text-sm">Time Horizon</h4>
                  </div>
                  <p className="text-xs text-gray-300">
                    Reinforce that market success is measured in years, not days or weeks. Historical data shows that longer holding periods dramatically increase the probability of positive returns.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-6">
              <h3 className="text-blue-400 font-bold text-base mb-3">5. Offer Actionable Next Steps</h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Provide concrete actions that give clients a sense of control without making reactive decisions.
              </p>
              <div className="space-y-3">
                <div className="bg-[#0B1220] rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">Schedule Regular Check-ins</h4>
                      <p className="text-xs text-gray-400">
                        Establish a cadence for portfolio reviews (monthly or quarterly) to keep clients informed and reassured without obsessing over daily movements.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#0B1220] rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">Consider Rebalancing Opportunities</h4>
                      <p className="text-xs text-gray-400">
                        If appropriate, discuss how market declines can present opportunities to buy quality assets at discounted prices or rebalance back to target allocations.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#0B1220] rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">Review Financial Plan</h4>
                      <p className="text-xs text-gray-400">
                        Revisit the comprehensive financial plan to demonstrate that short-term volatility doesn't change the fundamentals of their long-term strategy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-6">
              <h3 className="text-blue-400 font-bold text-base mb-3">6. Maintain Open Communication</h3>
              <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                Encourage clients to reach out with questions and concerns rather than making decisions in isolation.
              </p>
              <div className="bg-[#0B1220] border-l-4 border-cyan-500 p-4 rounded">
                <p className="text-gray-400 text-sm italic">
                  "I'm always available to discuss your concerns. Please don't hesitate to reach out if you have questions or want to review your portfolio. Making informed decisions together is always better than acting on emotion alone."
                </p>
              </div>
            </div>

            {/* Key Takeaway */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-5 mb-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-blue-400 font-bold text-sm mb-2">Key Takeaway</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Proactive, transparent communication during volatile periods builds trust and confidence. Schedule regular check-ins to keep clients informed and reassured.
                  </p>
                  <div className="bg-[#0B1220] rounded p-3">
                    <p className="text-white font-semibold text-xs mb-2">Communication Checklist:</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <span className="text-green-400">✓</span> Be proactive - reach out before clients panic
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <span className="text-green-400">✓</span> Use data and historical context to support your message
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <span className="text-green-400">✓</span> Personalize communication based on individual risk tolerance
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <span className="text-green-400">✓</span> Avoid making predictions or guarantees about market direction
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <span className="text-green-400">✓</span> Document all conversations for compliance and reference
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Topics */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4 text-purple-400" />
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">RELATED TOPICS</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-[#0B1220] border border-gray-700 hover:border-blue-500 rounded-lg text-sm text-gray-300 hover:text-white transition-all flex items-center gap-2">
                  <TrendingDown className="w-3.5 h-3.5" />
                  Market Correction Strategies
                </button>
                <button className="px-4 py-2 bg-[#0B1220] border border-gray-700 hover:border-blue-500 rounded-lg text-sm text-gray-300 hover:text-white transition-all flex items-center gap-2">
                  <Target className="w-3.5 h-3.5" />
                  Portfolio Rebalancing
                </button>
                <button className="px-4 py-2 bg-[#0B1220] border border-gray-700 hover:border-blue-500 rounded-lg text-sm text-gray-300 hover:text-white transition-all flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Client Communication Best Practices
                </button>
                <button className="px-4 py-2 bg-[#0B1220] border border-gray-700 hover:border-blue-500 rounded-lg text-sm text-gray-300 hover:text-white transition-all flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5" />
                  Historical Market Performance
                </button>
                <button className="px-4 py-2 bg-[#0B1220] border border-gray-700 hover:border-blue-500 rounded-lg text-sm text-gray-300 hover:text-white transition-all flex items-center gap-2">
                  <Brain className="w-3.5 h-3.5" />
                  Behavioral Finance Insights
                </button>
              </div>
            </div>

            {/* Wider Context */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-cyan-400" />
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">WIDER CONTEXT</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-[#0B1220] rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BarChart className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">Current Market Environment</h4>
                      <p className="text-xs text-gray-400 mb-3">
                        Recent market volatility has been driven by several factors including Federal Reserve interest rate decisions, inflation concerns, geopolitical tensions, and sector-specific challenges in technology and financial services. Understanding these drivers helps contextualize portfolio movements for clients.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">VIX Index</p>
                          <p className="text-lg font-bold text-white">18.4</p>
                          <p className="text-xs text-green-400">+2.3%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Market Sentiment</p>
                          <p className="text-lg font-bold text-white">Cautious</p>
                          <p className="text-xs text-gray-400">Mixed signals</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0B1220] rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">Regulatory Landscape</h4>
                      <p className="text-xs text-gray-400">
                        Recent regulatory changes and proposed policies around financial services, ESG disclosure requirements, and cryptocurrency oversight add additional complexity. Advisors should anticipate client questions and position portfolios appropriately.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0B1220] rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">Industry Trends</h4>
                      <p className="text-xs text-gray-400 mb-2">
                        The wealth management industry is seeing increased adoption of technology-driven solutions, growing demand for ESG investments, and a shift toward fee-based advisory models. Understanding these trends helps position your practice competitively.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded">Digital Transformation</span>
                        <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded">ESG Integration</span>
                        <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded">Fee Compression</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="px-5 py-3 bg-[#111827] hover:bg-[#1F2937] border border-gray-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Ask Another Question
            </button>
            <button className="px-5 py-3 bg-[#111827] hover:bg-[#1F2937] border border-gray-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
              <BookmarkPlus className="w-4 h-4" />
              Save to Library
            </button>
            <button className="px-5 py-3 bg-[#111827] hover:bg-[#1F2937] border border-gray-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="px-5 py-3 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
              <RefreshCw className="w-4 h-4" />
              Refine Answer
            </button>
          </div>
        </div>

        {/* Right Sidebar - Guidance Notes */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-5 sticky top-6">
            <div className="flex items-center gap-2 mb-5">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <h3 className="text-white font-bold text-sm uppercase tracking-wider">GUIDANCE NOTES</h3>
            </div>

            <div className="space-y-5 mb-6">
              {/* Tone & Delivery */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                    <MessageCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h4 className="text-blue-400 font-bold text-xs">Tone & Delivery</h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Maintain a calm, confident tone. Avoid technical jargon that might confuse clients. Use analogies they can relate to when explaining complex market dynamics.
                </p>
              </div>

              {/* Timing */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h4 className="text-purple-400 font-bold text-xs">Timing</h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Don't wait for clients to reach out. Proactive communication during volatile periods demonstrates care and professionalism. Schedule calls within 24-48 hours of significant market moves.
                </p>
              </div>

              {/* Personalization */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h4 className="text-cyan-400 font-bold text-xs">Personalization</h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Tailor your message to each client's risk tolerance, time horizon, and financial goals. A retiree needs different reassurance than a young professional.
                </p>
              </div>

              {/* Documentation */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h4 className="text-green-400 font-bold text-xs">Documentation</h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Document all client communications regarding market volatility. This protects both you and the client, and helps track their concerns and your responses over time.
                </p>
              </div>
            </div>

            {/* What to Avoid */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <h4 className="text-white font-bold text-xs uppercase tracking-wider">What to Avoid</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <X className="w-3 h-3 text-red-400 flex-shrink-0" />
                  <span>Making market predictions or guarantees</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <X className="w-3 h-3 text-red-400 flex-shrink-0" />
                  <span>Dismissing client concerns as irrational</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <X className="w-3 h-3 text-red-400 flex-shrink-0" />
                  <span>Recommending drastic portfolio changes</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <X className="w-3 h-3 text-red-400 flex-shrink-0" />
                  <span>Using fear-based language</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-6">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Next Steps</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded bg-[#0B1220] border-gray-600 text-blue-500" />
                  <span className="text-xs text-gray-300">Schedule follow-up meeting</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded bg-[#0B1220] border-gray-600 text-blue-500" />
                  <span className="text-xs text-gray-300">Send portfolio review report</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded bg-[#0B1220] border-gray-600 text-blue-500" />
                  <span className="text-xs text-gray-300">Document conversation in CRM</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button className="w-full px-4 py-3 bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all">
                <Mail className="w-4 h-4" />
                Email Client
              </button>
              <button className="w-full px-4 py-3 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
