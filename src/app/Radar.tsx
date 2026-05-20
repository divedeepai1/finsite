import {
  Radar,
  History,
  Settings2,
  Play,
  Edit,
  ClipboardList,
  XCircle,
  CheckCircle2,
  BarChart3,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
  Quote,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from './components/ui/button';

interface Firing {
  id: string;
  client: string;
  confidence: number;
  reason: string;
  timestamp: string;
  status: 'active' | 'dismissed' | 'campaign-launched';
  signals: { name: string; weight: number; indicator: 'up' | 'down' | 'neutral' }[];
  evidence: string[];
  quotes?: string[];
  holdingsMatch?: string;
  playbook: string;
  crossRadar?: boolean;
}

interface Outcome {
  id: string;
  radar: string;
  label: 'Win' | 'Miss' | 'In Progress';
  target: string;
  summary: string;
}

interface WatchlistItem {
  id: string;
  name: string;
  confidence: number;
  proximity: number;
  urgency: 'low' | 'medium' | 'high';
  meta: string[];
}

type RadarKey =
  | 'Client At Risk'
  | 'Client Growth Opportunity'
  | 'Competitor Vulnerability'
  | 'New Client Receptivity';

const RADAR_CONFIG: Record<
  RadarKey,
  {
    iconColor: string;
    borderColor: string;
    badgeBorder: string;
    buttonBg: string;
    buttonHover: string;
    playbookBorder: string;
    playbookBg: string;
    playbookText: string;
    actionLabel: string;
    threshold: string;
    comingSoon?: boolean;
  }
> = {
  'Client At Risk': {
    iconColor: 'text-red-400',
    borderColor: 'border-red-500',
    badgeBorder: 'border-red-500/40',
    buttonBg: 'bg-red-600',
    buttonHover: 'hover:bg-red-500',
    playbookBorder: 'border-red-900/30',
    playbookBg: 'bg-red-900/10',
    playbookText: 'text-red-400',
    actionLabel: 'Open Retention Play',
    threshold: '> 70%',
  },
  'Client Growth Opportunity': {
    iconColor: 'text-blue-400',
    borderColor: 'border-blue-500',
    badgeBorder: 'border-blue-500/40',
    buttonBg: 'bg-blue-600',
    buttonHover: 'hover:bg-blue-500',
    playbookBorder: 'border-blue-900/30',
    playbookBg: 'bg-blue-900/10',
    playbookText: 'text-blue-400',
    actionLabel: 'Open Expansion Play',
    threshold: '> 72%',
    comingSoon: true,
  },
  'Competitor Vulnerability': {
    iconColor: 'text-purple-400',
    borderColor: 'border-purple-500',
    badgeBorder: 'border-purple-500/40',
    buttonBg: 'bg-purple-600',
    buttonHover: 'hover:bg-purple-500',
    playbookBorder: 'border-purple-900/30',
    playbookBg: 'bg-purple-900/10',
    playbookText: 'text-purple-400',
    actionLabel: 'Open Displacement Campaign',
    threshold: '> 75%',
  },
  'New Client Receptivity': {
    iconColor: 'text-green-400',
    borderColor: 'border-green-500',
    badgeBorder: 'border-green-500/40',
    buttonBg: 'bg-green-600',
    buttonHover: 'hover:bg-green-500',
    playbookBorder: 'border-green-900/30',
    playbookBg: 'bg-green-900/10',
    playbookText: 'text-green-400',
    actionLabel: 'Open Outreach',
    threshold: '> 75%',
  },
};

/** 2×2 grid: top-left → top-right → bottom-left → bottom-right */
const GRID_RADARS: RadarKey[] = [
  'Client At Risk',
  'Competitor Vulnerability',
  'Client Growth Opportunity',
  'New Client Receptivity',
];

const MOCK_ACTIVE_FIRINGS: Record<RadarKey, Firing[]> = {
  'Client At Risk': [
    {
      id: 'r1',
      client: 'Global Wealth Partners',
      confidence: 88,
      reason:
        'Sudden decrease in platform login frequency coincided with large cash transfers to external accounts.',
      timestamp: '2h ago',
      status: 'active',
      signals: [
        { name: 'Engagement Rate', weight: 45, indicator: 'down' },
        { name: 'External Outflow', weight: 35, indicator: 'up' },
        { name: 'Market Sentiment', weight: 20, indicator: 'neutral' },
      ],
      evidence: [
        'Login frequency dropped 65% in the last 14 days.',
        'Total outflow of $12.4M detected on Friday.',
        'Relationship manager not contacted in 3 months.',
      ],
      quotes: [
        '"We are looking into diversifying our custodian relationships this quarter." — CIO during last QBR.',
      ],
      holdingsMatch:
        'Highly correlated with competitors offering 50bps higher yield on sweep accounts.',
      playbook: 'Immediate Outreach: Strategic Review & Yield Match Program.',
    },
    {
      id: 'r2',
      client: 'Sterling Retirement Fund',
      confidence: 72,
      reason: 'Underperformance vs. new tactical benchmark in the Fixed Income sleeve.',
      timestamp: '5h ago',
      status: 'active',
      signals: [
        { name: 'Relative Performance', weight: 60, indicator: 'down' },
        { name: 'Benchmark Drift', weight: 40, indicator: 'up' },
      ],
      evidence: [
        'Lagging peer group by 120bps over rolling 3-month window.',
        'Duration positioning is 1.5yrs longer than target.',
      ],
      playbook: 'Technical Review: Portfolio Rebalancing & Attribution Report.',
    },
  ],
  'Client Growth Opportunity': [],
  'Competitor Vulnerability': [
    {
      id: 'v1',
      client: 'Apollo Asset Management',
      confidence: 92,
      reason: 'Competitor platform outage (4h) yesterday affected their core trading desk.',
      timestamp: '1h ago',
      status: 'active',
      crossRadar: true,
      signals: [
        { name: 'Operational Failure', weight: 70, indicator: 'up' },
        { name: 'Sentiment Signal', weight: 30, indicator: 'down' },
      ],
      evidence: [
        'Systemic outage reported across Bloomberg & Reuters.',
        'High negative sentiment on LinkedIn from internal traders.',
      ],
      playbook: 'Aggressive Switcher Campaign: Resilience & 99.9% Uptime Guarantee.',
    },
  ],
  'New Client Receptivity': [
    {
      id: 'nc1',
      client: 'Horizon Family Office',
      confidence: 84,
      reason: 'Recent hiring of new CTO from a firm using our platform.',
      timestamp: '3h ago',
      status: 'active',
      signals: [
        { name: 'Leadership Change', weight: 50, indicator: 'up' },
        { name: 'Tech Affinity', weight: 50, indicator: 'up' },
      ],
      evidence: [
        'LinkedIn alert: Mark Sullivan (former PowerUser) joined as CTO.',
        'Firm recently published whitepaper on AI adoption in FO.',
      ],
      playbook: 'Warm Introduction: CTO Relationship Leverage & "Welcome" Demo.',
    },
  ],
};

const MOCK_WATCHLIST: Record<RadarKey, WatchlistItem[]> = {
  'Client At Risk': [
    {
      id: 'w-at-1',
      name: 'Meridian Capital',
      confidence: 48,
      proximity: 62,
      urgency: 'medium',
      meta: ['Fee review', 'Q2 outflows'],
    },
    {
      id: 'w-at-2',
      name: 'Coastal Pension',
      confidence: 41,
      proximity: 55,
      urgency: 'low',
      meta: ['Benchmark change'],
    },
  ],
  'Client Growth Opportunity': [],
  'Competitor Vulnerability': [
    {
      id: 'w-cv-1',
      name: 'Standard Chartered',
      confidence: 45,
      proximity: 65,
      urgency: 'low',
      meta: ['Tech Stack Review', 'Q3 renewal'],
    },
    {
      id: 'w-cv-2',
      name: 'Vanguard Intl',
      confidence: 52,
      proximity: 78,
      urgency: 'medium',
      meta: ['Fee Sensitive', 'Competitor DM'],
    },
  ],
  'New Client Receptivity': [
    {
      id: 'w-nc-1',
      name: 'Nippon Life',
      confidence: 38,
      proximity: 55,
      urgency: 'low',
      meta: ['APAC Expansion', 'New License'],
    },
    {
      id: 'w-nc-2',
      name: 'Alpine FO',
      confidence: 44,
      proximity: 70,
      urgency: 'medium',
      meta: ['New CIO', 'RFP window'],
    },
  ],
};

const MOCK_OUTCOMES: Outcome[] = [
  {
    id: 'o1',
    radar: 'Client At Risk',
    label: 'Win',
    target: 'M&G Investments',
    summary:
      'Prevented $50M churn by auto-launching retention campaign. Switched to high-yield tier.',
  },
  {
    id: 'o2',
    radar: 'Competitor Vulnerability',
    label: 'In Progress',
    target: 'BlackRock EMEA',
    summary: 'Currently in POC with 12 traders after system-failure radar firing.',
  },
  {
    id: 'o3',
    radar: 'New Client Receptivity',
    label: 'Miss',
    target: 'Pictet WM',
    summary:
      'Relationship lead already contracted with peer; radar was 2 weeks late on hiring signal.',
  },
  {
    id: 'o4',
    radar: 'Client Growth Opportunity',
    label: 'Win',
    target: 'Hartwell Pension Fund',
    summary: 'Upsell of alternatives sleeve after cross-sell signal; +$18M AUM retained and expanded.',
  },
  {
    id: 'o5',
    radar: 'Competitor Vulnerability',
    label: 'Win',
    target: 'Apollo Asset Management',
    summary: 'Displacement campaign launched within 4h of outage firing; signed 3-desk pilot.',
  },
  {
    id: 'o6',
    radar: 'Client At Risk',
    label: 'Miss',
    target: 'Sterling Retirement Fund',
    summary: 'Retention play launched late; partial redemption ($8M) before engagement completed.',
  },
  {
    id: 'o7',
    radar: 'New Client Receptivity',
    label: 'Win',
    target: 'Horizon Family Office',
    summary: 'Outreach triggered by CTO hire signal; discovery call booked within 48h.',
  },
];

function RadarCell({
  radarKey,
  firings,
  watchlist,
  expandedFiring,
  setExpandedFiring,
}: {
  radarKey: RadarKey;
  firings: Firing[];
  watchlist: WatchlistItem[];
  expandedFiring: string | null;
  setExpandedFiring: (id: string | null) => void;
}) {
  const config = RADAR_CONFIG[radarKey];
  const isComingSoon = config.comingSoon;

  return (
    <div className="flex flex-col space-y-4 relative">
      {isComingSoon && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-[#0B1220]/80 backdrop-blur-[1px] pointer-events-none">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-900 border border-gray-700 px-4 py-2 rounded-full">
            Coming Soon
          </span>
        </div>
      )}

      <div
        className={`bg-[#0F1621] border rounded-t-xl p-4 flex flex-col space-y-3 ${
          isComingSoon ? 'border-gray-800 opacity-50' : config.borderColor
        }`}
      >
        <div className="flex items-center justify-between">
          <h2
            className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <Radar className={`w-4 h-4 ${config.iconColor}`} />
            {radarKey}
          </h2>
          {!isComingSoon && (
            <button
              type="button"
              className={`text-[10px] font-bold transition-colors uppercase ${config.iconColor} hover:opacity-80`}
            >
              Calibrate
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#162033] p-2 rounded-lg border border-gray-800/50">
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Threshold</p>
            <p className="text-xs font-bold text-gray-300">Confidence {config.threshold}</p>
          </div>
          <div className="bg-[#162033] p-2 rounded-lg border border-gray-800/50">
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Max / Week</p>
            <p className="text-xs font-bold text-gray-300">Limit: 15</p>
          </div>
        </div>
      </div>

      <div className={`space-y-4 min-h-[400px] ${isComingSoon ? 'opacity-40 pointer-events-none' : ''}`}>
        {firings.map((firing) => (
          <FiringCard
            key={firing.id}
            firing={firing}
            radarKey={radarKey}
            config={config}
            expanded={expandedFiring === firing.id}
            onToggle={() => setExpandedFiring(expandedFiring === firing.id ? null : firing.id)}
          />
        ))}

        {!isComingSoon && (
          <WatchlistSection items={watchlist} />
        )}
      </div>
    </div>
  );
}

function FiringCard({
  firing,
  radarKey,
  config,
  expanded,
  onToggle,
}: {
  firing: Firing;
  radarKey: RadarKey;
  config: (typeof RADAR_CONFIG)[RadarKey];
  expanded: boolean;
  onToggle: () => void;
}) {
  const expandedRing =
    radarKey === 'Client At Risk'
      ? 'border-red-500 ring-1 ring-red-500'
      : radarKey === 'Client Growth Opportunity'
        ? 'border-blue-500 ring-1 ring-blue-500'
        : radarKey === 'Competitor Vulnerability'
          ? 'border-purple-500 ring-1 ring-purple-500'
          : 'border-green-500 ring-1 ring-green-500';

  return (
    <div
      role="button"
      tabIndex={0}
      className={`bg-[#111827] border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
        expanded ? expandedRing : 'border-gray-800 hover:border-gray-700'
      }`}
      onClick={onToggle}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
    >
      <div className="p-4 flex flex-col space-y-3">
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="text-xs font-bold text-white">{firing.client}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{firing.timestamp}</p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {firing.crossRadar && radarKey === 'Competitor Vulnerability' && (
              <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-600/25 text-purple-300 border border-purple-500/40">
                Cross-radar
              </span>
            )}
            <div className={`bg-gray-900 border px-2 py-1 rounded-full ${config.badgeBorder}`}>
              <span
                className={`text-[10px] font-bold ${firing.confidence > 80 ? 'text-green-400' : 'text-yellow-400'}`}
              >
                {firing.confidence}% Confidence
              </span>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-gray-400 leading-relaxed italic line-clamp-2">"{firing.reason}"</p>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-800/50 bg-[#0B1220]/50 space-y-5 animate-in slide-in-from-top-2 duration-300">
          <div className="space-y-2">
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Signal Contribution</p>
            <div className="grid grid-cols-1 gap-2">
              {firing.signals.map((signal) => (
                <div key={signal.name} className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-2">
                    {signal.indicator === 'up' ? (
                      <ArrowUpRight className="w-3 h-3 text-red-400" />
                    ) : signal.indicator === 'down' ? (
                      <ArrowDownRight className="w-3 h-3 text-green-400" />
                    ) : (
                      <Activity className="w-3 h-3 text-gray-500" />
                    )}
                    <span className="text-gray-300">{signal.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${config.buttonBg}`}
                        style={{ width: `${signal.weight}%` }}
                      />
                    </div>
                    <span className="text-gray-500 font-bold w-6 text-right">{signal.weight}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Evidence Chain</p>
            <ul className="space-y-1.5">
              {firing.evidence.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[10px] text-gray-400">
                  <span className={`mt-1 ${config.iconColor}`}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {(firing.quotes || firing.holdingsMatch) && (
            <div className="space-y-3 bg-[#111827] p-3 rounded-lg border border-gray-800/50">
              {firing.quotes?.map((quote, idx) => (
                <div key={idx} className="flex gap-2">
                  <Quote className={`w-3 h-3 flex-shrink-0 ${config.iconColor}`} />
                  <p className="text-[10px] text-gray-400 italic leading-snug">{quote}</p>
                </div>
              ))}
              {firing.holdingsMatch && (
                <div className="flex items-start gap-2 pt-2 border-t border-gray-800/50">
                  <BarChart3 className="w-3 h-3 text-cyan-400 mt-0.5" />
                  <p className="text-[10px] text-cyan-400 font-medium leading-tight">{firing.holdingsMatch}</p>
                </div>
              )}
            </div>
          )}

          <div className="space-y-3">
            <div className={`${config.playbookBg} border ${config.playbookBorder} p-3 rounded-lg`}>
              <p className={`text-[9px] font-bold uppercase tracking-widest mb-1 ${config.playbookText}`}>
                Recommended Playbook
              </p>
              <p className="text-[11px] text-white font-medium">{firing.playbook}</p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button
                className={`flex-1 ${config.buttonBg} ${config.buttonHover} text-white text-[10px] h-8 font-bold`}
                onClick={(e) => e.stopPropagation()}
              >
                <Play className="w-3 h-3 mr-1.5" />
                {config.actionLabel}
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0 border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-gray-400"
                onClick={(e) => e.stopPropagation()}
              >
                <Edit className="w-3 h-3" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0 border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-gray-400"
                onClick={(e) => e.stopPropagation()}
              >
                <ClipboardList className="w-3 h-3" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0 border-gray-800 bg-gray-900/50 hover:bg-red-900/20 hover:text-red-400 text-gray-400"
                onClick={(e) => e.stopPropagation()}
              >
                <XCircle className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WatchlistSection({ items }: { items: WatchlistItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-2 border-b border-gray-800/50 pb-2">
        <Clock className="w-3.5 h-3.5 text-gray-500" />
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          Watching / Below Threshold
        </h3>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#111827]/40 border border-gray-800/40 p-3 rounded-lg flex flex-col space-y-2 opacity-60 hover:opacity-100 transition-opacity"
          >
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-gray-300">{item.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-gray-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.urgency === 'medium' ? 'bg-yellow-600' : 'bg-gray-600'}`}
                    style={{ width: `${item.proximity}%` }}
                  />
                </div>
                <span className="text-[9px] text-gray-500 font-bold">{item.confidence}%</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {item.meta.map((m) => (
                <span
                  key={m}
                  className="text-[8px] bg-gray-900 text-gray-500 px-1.5 py-0.5 rounded border border-gray-800 uppercase font-bold tracking-tighter"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RadarPage() {
  const [expandedFiring, setExpandedFiring] = useState<string | null>(null);

  const stats = [
    { label: 'Active Firings', value: '12', color: 'text-red-400' },
    { label: 'Watching', value: '45', color: 'text-yellow-400' },
    { label: 'Acted On (90d)', value: '8', color: 'text-blue-400' },
    { label: 'Retained YTD', value: '$320M', color: 'text-green-400' },
    { label: 'Won YTD', value: '$450M', color: 'text-green-400' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0B1220] p-8 space-y-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-3xl font-bold text-white uppercase tracking-wider"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              AI RADAR OPERATIONAL DASHBOARD
            </h1>
            <p className="text-gray-400 mt-1 max-w-2xl">
              Real-time monitoring and investigation of client behaviors, competitor vulnerabilities, and market
              receptivity signals.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-gray-300">
              <History className="w-4 h-4 mr-2" /> Firing History
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold">
              <Settings2 className="w-4 h-4 mr-2" /> Global Calibration
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[#111827] border border-gray-800 p-5 rounded-xl shadow-lg">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color} leading-none`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2×2 Radar grid with axis labels */}
      <div className="relative">
        <div className="grid grid-cols-[auto_1fr_1fr] grid-rows-[auto_1fr_1fr] gap-4">
          {/* Top-left corner empty */}
          <div className="col-start-1 row-start-1" />

          {/* Column headers */}
          <div className="col-start-2 row-start-1 flex items-end justify-center pb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Existing Clients</span>
          </div>
          <div className="col-start-3 row-start-1 flex items-end justify-center pb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Prospects &amp; Others
            </span>
          </div>

          {/* Row label: Defensive */}
          <div className="col-start-1 row-start-2 flex items-center justify-end pr-4">
            <span
              className="text-[10px] font-bold uppercase tracking-widest text-gray-500 [writing-mode:vertical-lr] rotate-180"
            >
              Defensive
            </span>
          </div>

          {/* Row label: Offensive */}
          <div className="col-start-1 row-start-3 flex items-center justify-end pr-4">
            <span
              className="text-[10px] font-bold uppercase tracking-widest text-gray-500 [writing-mode:vertical-lr] rotate-180"
            >
              Offensive
            </span>
          </div>

          {GRID_RADARS.map((radarKey, index) => {
            const col = (index % 2) + 2;
            const row = Math.floor(index / 2) + 2;
            return (
              <div
                key={radarKey}
                className="min-w-0"
                style={{ gridColumn: col, gridRow: row }}
              >
                <RadarCell
                  radarKey={radarKey}
                  firings={MOCK_ACTIVE_FIRINGS[radarKey]}
                  watchlist={MOCK_WATCHLIST[radarKey]}
                  expandedFiring={expandedFiring}
                  setExpandedFiring={setExpandedFiring}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col space-y-4 pt-8 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <h2
              className="text-xl font-bold text-white uppercase tracking-wider"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              RECENT RADAR OUTCOMES
            </h2>
          </div>
          <span className="text-xs text-gray-500">Last 90 Days</span>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {MOCK_OUTCOMES.map((outcome) => {
            const radarColor =
              outcome.radar === 'Client At Risk'
                ? 'text-red-400'
                : outcome.radar === 'Client Growth Opportunity'
                  ? 'text-blue-400'
                  : outcome.radar === 'Competitor Vulnerability'
                    ? 'text-purple-400'
                    : 'text-green-400';
            return (
              <div
                key={outcome.id}
                className="bg-[#0D1420] border border-gray-800 p-5 rounded-xl flex flex-col space-y-3 relative overflow-hidden group"
              >
                <div
                  className={`absolute top-0 right-0 px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-bl-lg ${
                    outcome.label === 'Win'
                      ? 'bg-green-600/20 text-green-400'
                      : outcome.label === 'Miss'
                        ? 'bg-red-600/20 text-red-400'
                        : 'bg-blue-600/20 text-blue-400'
                  }`}
                >
                  {outcome.label}
                </div>

                <div>
                  <p className={`text-[9px] font-bold uppercase tracking-tighter mb-1 ${radarColor}`}>
                    {outcome.radar}
                  </p>
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    {outcome.target}
                  </h3>
                </div>

                <p className="text-[11px] text-gray-400 leading-relaxed">{outcome.summary}</p>

                <div className="pt-2">
                  <button
                    type="button"
                    className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                  >
                    Full Audit Trail <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
