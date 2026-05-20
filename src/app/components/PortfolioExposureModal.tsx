import { X } from 'lucide-react';

interface ExposureUpdate {
  text: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

interface PortfolioExposureModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetName: string | null;
  commentary: {
    change: string;
    updates: ExposureUpdate[];
  } | undefined;
}

export function PortfolioExposureModal({ isOpen, onClose, assetName, commentary }: PortfolioExposureModalProps) {
  if (!isOpen || !assetName || !commentary) return null;

  // Determine header color based on change
  const isPositive = commentary.change.startsWith('+');
  const headerBgColor = isPositive ? 'bg-cyan-500/10' : 'bg-red-500/10';
  const headerTextColor = isPositive ? 'text-cyan-400' : 'text-red-400';
  const changeBgColor = isPositive ? 'bg-cyan-500/20' : 'bg-red-500/20';

  // Map sentiment to color
  const getSentimentColor = (sentiment?: 'positive' | 'negative' | 'neutral') => {
    if (sentiment === 'positive') return 'text-green-400';
    if (sentiment === 'negative') return 'text-red-400';
    return 'text-gray-400';
  };

  const getSentimentBullet = (sentiment?: 'positive' | 'negative' | 'neutral') => {
    if (sentiment === 'positive') return '•';
    if (sentiment === 'negative') return '•';
    return '•';
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <div className="bg-[#0B1220] border border-gray-700 rounded-lg shadow-2xl">
          {/* Header */}
          <div className={`${headerBgColor} border-b border-gray-700 p-6`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                  LATEST COMMENTARY
                </div>
                <h2 className="text-xl font-bold text-white">{assetName}</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className={`${changeBgColor} ${headerTextColor} px-3 py-1 rounded text-sm font-bold`}>
                  {commentary.change}
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="text-gray-400 text-xs uppercase tracking-wider">
              LATEST UPDATES
            </div>
          </div>

          {/* Updates List */}
          <div className="p-6">
            <div className="space-y-4">
              {commentary.updates.map((update, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className={`${getSentimentColor(update.sentiment)} text-xl leading-none mt-0.5`}>
                    {getSentimentBullet(update.sentiment)}
                  </span>
                  <p className="text-sm text-gray-300 leading-relaxed flex-1">
                    {update.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
