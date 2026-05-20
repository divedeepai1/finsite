import { useState } from 'react';
import { X, Search, PenSquare, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { AddPortfolioHistoryModal } from './AddPortfolioHistoryModal';

interface CreatePortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (portfolio: any) => void;
}

export function CreatePortfolioModal({ isOpen, onClose, onSave }: CreatePortfolioModalProps) {
  const [portfolioName, setPortfolioName] = useState('Test4');
  const [lockEditToUser, setLockEditToUser] = useState(true);
  const [selectedFunds, setSelectedFunds] = useState<string[]>([
    'morningstar-adventurous',
    'morningstar-cautious'
  ]);
  const [isAddHistoryModalOpen, setIsAddHistoryModalOpen] = useState(false);
  const [isFundsDropdownOpen, setIsFundsDropdownOpen] = useState(false);
  const [isCIPDropdownOpen, setIsCIPDropdownOpen] = useState(false);
  const [historyDates, setHistoryDates] = useState<string[]>([
    '10/09/2025',
    '10/10/2025',
    '10/11/2025',
    '10/12/2025',
    '10/01/2026',
    '10/02/2026'
  ]);

  const [portfolioFunds, setPortfolioFunds] = useState([
    { id: '1', name: 'Vanguard LifeStrategy 80% Equity A Acc', isin: 'GB00B4NXY347', startDate: '', allocation: '0%' },
    { id: '2', name: 'Vanguard LifeStrategy 80% Equity A Acc', isin: 'GB00B4NXD415', startDate: '', allocation: '0%' },
    { id: '3', name: 'Morningstar Blended - Adventurous Gr', isin: '', startDate: '', allocation: '0%' },
    { id: '4', name: 'Morningstar Blended - Cautious Growth', isin: '', startDate: '', allocation: '0%' },
    { id: '5', name: 'Morningstar Blended - Moderate Growth', isin: '', startDate: '', allocation: '0%' },
    { id: '6', name: '£ Pound Sterling (Zero return)', isin: 'GBR00040', startDate: '', allocation: '0%' },
  ]);

  const cipSelectionFunds = [
    { id: 'vanguard-1', name: 'Vanguard LifeStrategy 80% Equity A Acc' },
    { id: 'vanguard-2', name: 'Vanguard LifeStrategy 80% Equity A Acc' },
    { id: 'morningstar-adventurous', name: 'Morningstar Blended - Adventurous Gr' },
    { id: 'morningstar-cautious', name: 'Morningstar Blended - Cautious Growth' },
    { id: 'morningstar-moderate', name: 'Morningstar Blended - Moderate Growth' },
  ];

  const handleFundSelection = (fundId: string) => {
    if (selectedFunds.includes(fundId)) {
      setSelectedFunds(selectedFunds.filter(id => id !== fundId));
    } else {
      setSelectedFunds([...selectedFunds, fundId]);
    }
  };

  const handleRemoveFund = (fundId: string) => {
    setPortfolioFunds(portfolioFunds.filter(fund => fund.id !== fundId));
  };

  const handleRemoveDate = (dateToRemove: string) => {
    setHistoryDates(historyDates.filter(date => date !== dateToRemove));
  };

  const handleSave = () => {
    const portfolio = {
      name: portfolioName,
      cip: '',
      morningstarSector: '',
      ocf: '0.18%',
      performance1Y: '7.72%',
      riskZ1: '',
      provider: '🟢',
      inception: historyDates[0] || '10/08/2025',
      ccy: ''
    };
    
    if (onSave) {
      onSave(portfolio);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A2332] border border-gray-800 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <PenSquare className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Create Custom Portfolio</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-12 gap-6 p-6">
            {/* Left Sidebar */}
            <div className="col-span-3 space-y-6">
              {/* Model Portfolio Name */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Model Portfolio Name</label>
                <input
                  type="text"
                  value={portfolioName}
                  onChange={(e) => setPortfolioName(e.target.value)}
                  className="w-full bg-[#0B1120] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Lock Edit to User */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Lock edit to user</span>
                <button
                  onClick={() => setLockEditToUser(!lockEditToUser)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${lockEditToUser ? 'bg-blue-600' : 'bg-gray-600'}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${lockEditToUser ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
              </div>

              {/* CIP Selection */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">CIP Selection</label>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Select Funds or Portfolios"
                    onFocus={() => setIsCIPDropdownOpen(true)}
                    className="w-full bg-[#0B1120] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 cursor-pointer"
                  />
                </div>
                {/* CIP List Dropdown */}
                {isCIPDropdownOpen && (
                  <div className="bg-[#0B1120] border border-gray-700 rounded-lg p-3 max-h-64 overflow-y-auto">
                    {cipSelectionFunds.map(fund => (
                      <label key={fund.id} className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-800/50 px-2 rounded">
                        <input
                          type="checkbox"
                          checked={selectedFunds.includes(fund.id)}
                          onChange={() => handleFundSelection(fund.id)}
                          className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-0"
                        />
                        <span className="text-sm text-gray-300">{fund.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="col-span-9">
              {/* Top Tabs */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAddHistoryModalOpen(true)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs font-semibold rounded transition-colors"
                  >
                    ADD PORTFOLIO HISTORY
                  </button>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 text-xs font-semibold rounded transition-colors">
                    PULL FROM SELECTION
                  </button>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 text-xs font-semibold rounded transition-colors">
                    PUSH TO SELECTION
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-[#111827] border border-gray-800 rounded-lg overflow-hidden">
                {/* Date Chips */}
                {historyDates.length > 0 && (
                  <div className="bg-[#0D1525] border-b border-gray-800 px-4 py-3 flex items-center gap-2 flex-wrap">
                    {historyDates.map((date, index) => (
                      <div
                        key={index}
                        className="bg-[#3B4B5F] text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2"
                      >
                        <span>{date}</span>
                        <button
                          onClick={() => handleRemoveDate(date)}
                          className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button className="bg-[#3B4B5F] text-white text-xs w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#4a5d75] transition-colors">
                      +
                    </button>
                  </div>
                )}
                <table className="w-full">
                  <thead className="bg-[#0D1525] border-b border-gray-800">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">Fund</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">ISIN</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">Start Date</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">Allocation</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {portfolioFunds.map((fund) => (
                      <tr key={fund.id} className="hover:bg-[#0D1525] transition-colors">
                        <td className="px-4 py-3 text-sm text-blue-400">{fund.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-400">{fund.isin || '-'}</td>
                        <td className="px-4 py-3 text-sm text-gray-400">{fund.startDate || '-'}</td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={fund.allocation}
                            className="w-16 bg-[#0B1120] border border-gray-700 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
                            readOnly
                          />
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleRemoveFund(fund.id)}
                            className="text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-800">
          <Button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-6 py-2 font-semibold"
          >
            CANCEL
          </Button>
          <div className="flex items-center gap-3">
            <Button className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-6 py-2 font-semibold">
              EXPORT HISTORY (CSV)
            </Button>
            <div className="relative">
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2 font-semibold flex items-center gap-2">
                SAVE & CLOSE
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AddPortfolioHistoryModal
        isOpen={isAddHistoryModalOpen}
        onClose={() => setIsAddHistoryModalOpen(false)}
        historyDates={historyDates}
        setHistoryDates={setHistoryDates}
      />
    </div>
  );
}