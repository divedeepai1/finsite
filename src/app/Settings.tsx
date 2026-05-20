import { Search, Trash2, ChevronDown, Plus, X, Filter, Calendar, Settings as SettingsIcon } from 'lucide-react';
import { Button } from './components/ui/button';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend as RechartsLegend } from 'recharts';
import 'react-day-picker/dist/style.css';

export default function Settings() {
  const [isMounted, setIsMounted] = useState(false);
  const [cipSearch, setCipSearch] = useState('');
  const [fundSearch, setFundSearch] = useState('');
  const [showCreatePortfolio, setShowCreatePortfolio] = useState(false);
  const [showAddFundManually, setShowAddFundManually] = useState(false);
  const [showPortfolioFilter, setShowPortfolioFilter] = useState(false);
  const [showFundFilter, setShowFundFilter] = useState(false);
  const [showAddPortfolioHistory, setShowAddPortfolioHistory] = useState(false);
  const [showManageBenchmarks, setShowManageBenchmarks] = useState(false);
  const [selectedBenchmarks, setSelectedBenchmarks] = useState<string[]>([]);
  const [selectedInvestments, setSelectedInvestments] = useState<any[]>([]);
  const [portfolioHistoryDate, setPortfolioHistoryDate] = useState<Date>(new Date(2025, 7, 10)); // August 10, 2025
  const [isManualMode, setIsManualMode] = useState(true);
  const [hasPortfolio, setHasPortfolio] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [performancePeriod, setPerformancePeriod] = useState('3M');
  const [breakdownView, setBreakdownView] = useState('Sector');
  const [showNewCase, setShowNewCase] = useState(false);
  const [newCaseTab, setNewCaseTab] = useState<'NEW CLIENT' | 'EXISTING CLIENT'>('EXISTING CLIENT');
  const [clientSearch, setClientSearch] = useState('');
  const [caseName, setCaseName] = useState('');
  const [adviceType, setAdviceType] = useState('Investment');
  const [recommendationType, setRecommendationType] = useState('Full Advice');
  
  // Column visibility settings for Portfolio Filter
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({
    assetClass: true,
    subAssetClass: true,
    country: true,
    region: true,
    sector: true,
    absolutePerformance: true,
    relativeBenchmark: true,
    volatility: true,
  });

  // Toggle all columns
  const toggleAllColumns = (show: boolean) => {
    setColumnVisibility({
      assetClass: show,
      subAssetClass: show,
      country: show,
      region: show,
      sector: show,
      absolutePerformance: show,
      relativeBenchmark: show,
      volatility: show,
    });
  };

  // Toggle individual column
  const toggleColumn = (column: keyof typeof columnVisibility) => {
    setColumnVisibility(prev => ({ ...prev, [column]: !prev[column] }));
  };
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // New Client form fields
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [nino, setNino] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const [portfolioHistoryDates, setPortfolioHistoryDates] = useState<Date[]>([
    new Date(2025, 8, 10),  // 10/09/2025
    new Date(2025, 9, 10),  // 10/10/2025
    new Date(2025, 10, 10), // 10/11/2025
    new Date(2025, 11, 10), // 10/12/2025
    new Date(2026, 0, 10),  // 10/01/2026
    new Date(2026, 1, 10),  // 10/02/2026
  ]);

  // Performance chart data
  const performanceData = [
    { date: 'Sep 2025', value: 3.2 },
    { date: 'Oct 2025', value: 3.8 },
    { date: 'Nov 2025', value: 4.2 },
    { date: 'Dec 2025', value: 4.5 },
    { date: 'Jan 2026', value: 5.1 },
    { date: 'Feb 2026', value: 7.9 },
  ];

  // Benchmark data
  const benchmarkData = [
    { id: 'arc-cautious', type: 'ARC', name: 'ARC Sterling Cautious PCI' },
    { id: 'arc-balanced', type: 'ARC', name: 'ARC Sterling Balanced Asset PCI' },
    { id: 'arc-steady', type: 'ARC', name: 'ARC Sterling Steady Growth PCI' },
    { id: 'arc-equity', type: 'ARC', name: 'ARC Sterling Equity Risk PCI' },
    { id: 'cash-boe', type: 'Cash', name: 'Cash - Bank of England Base Rate' },
  ];

  // Sector colors for breakdown
  const sectorColors: { [key: string]: string } = {
    'Other': '#DC2626',
    'Basic Materials': '#7C3AED',
    'Communication Services': '#2563EB',
    'Consumer Cyclical': '#06B6D4',
    'Consumer Defensive': '#10B981',
    'Energy': '#84CC16',
    'Financial Services': '#EAB308',
    'Healthcare': '#F59E0B',
    'Industrials': '#EC4899',
    'Real Estate': '#8B5CF6',
    'Technology': '#F97316',
    'Utilities': '#14B8A6',
  };

  // Asset Class colors
  const assetClassColors: { [key: string]: string } = {
    'UK Equity': '#F59E0B',
    'Global Equity': '#F97316',
    'Emerging Equity': '#10B981',
    'Europe Equity': '#06B6D4',
    'Pacific Equity': '#3B82F6',
    'North America Equity': '#8B5CF6',
    'Global Fixed Income Bonds': '#EC4899',
    'Short Maturity': '#DC2626',
    'UK Real Estate': '#84CC16',
    'Global Real Estate': '#EAB308',
    'Property-UK Non Direct': '#14B8A6',
    'Physical Metals': '#6366F1',
    'UK Listed Corporate Bonds': '#7C3AED',
    'Alternatives': '#4ADE80',
    'UK Gilts': '#22D3EE',
    'Global Fixed Income Corporate Bonds': '#FB923C',
    'Global Inflation Linked Bonds': '#A78BFA',
    'Commodities': '#F472B6',
    'European Real Estate Equity': '#FCD34D',
    'Asia Real Estate Equity': '#34D399',
    'Cash': '#94A3B8',
  };

  // Asset class breakdown data for PruFund Global Diversification
  const assetClassData = {
    equity: [
      { name: 'UK Equity', value: 15.38, color: assetClassColors['UK Equity'] },
      { name: 'Global Equity', value: 37.26, color: assetClassColors['Global Equity'] },
      { name: 'Emerging Equity', value: 6.98, color: assetClassColors['Emerging Equity'] },
      { name: 'Europe Equity', value: 4.96, color: assetClassColors['Europe Equity'] },
      { name: 'Pacific Equity', value: 4.96, color: assetClassColors['Pacific Equity'] },
      { name: 'North America Equity', value: 9.31, color: assetClassColors['North America Equity'] },
      { name: 'Global Fixed Income Bonds', value: 6.25, color: assetClassColors['Global Fixed Income Bonds'] },
    ],
    realEstate: [
      { name: 'UK Real Estate', value: 4.59, color: assetClassColors['UK Real Estate'] },
      { name: 'Global Real Estate', value: 4.59, color: assetClassColors['Global Real Estate'] },
      { name: 'Property-UK Non Direct', value: 1.98, color: assetClassColors['Property-UK Non Direct'] },
      { name: 'European Real Estate Equity', value: 1.10, color: assetClassColors['European Real Estate Equity'] },
      { name: 'Asia Real Estate Equity', value: 0.62, color: assetClassColors['Asia Real Estate Equity'] },
    ],
    commodities: [
      { name: 'Physical Metals', value: 2.07, color: assetClassColors['Physical Metals'] },
    ],
    bonds: [
      { name: 'UK Listed Corporate Bonds', value: 5.78, color: assetClassColors['UK Listed Corporate Bonds'] },
      { name: 'Global Fixed Income Corporate Bonds', value: 5.78, color: assetClassColors['Global Fixed Income Corporate Bonds'] },
      { name: 'Global Inflation Linked Bonds', value: 5.78, color: assetClassColors['Global Inflation Linked Bonds'] },
      { name: 'UK Gilts', value: 2.89, color: assetClassColors['UK Gilts'] },
      { name: 'Europe High Yield Bonds', value: 0.25, color: assetClassColors['Global Fixed Income Bonds'] },
      { name: 'Global Emerging Market Bonds', value: 3.34, color: assetClassColors['Alternatives'] },
      { name: 'Blended Credit', value: 2.89, color: assetClassColors['UK Gilts'] },
      { name: 'Emerging Market Government Bonds', value: 1.98, color: assetClassColors['Emerging Equity'] },
      { name: 'Global High Yield Bonds', value: 1.49, color: assetClassColors['Global Equity'] },
      { name: 'Sterling Credit', value: 1.00, color: assetClassColors['Pacific Equity'] },
      { name: 'UK Corporate Bonds', value: 1.24, color: assetClassColors['North America Equity'] },
      { name: 'Targeted Return Bonds', value: 0.87, color: assetClassColors['Europe Equity'] },
      { name: 'Sterling Corporate Bonds', value: 1.49, color: assetClassColors['Global Equity'] },
    ],
    cash: [
      { name: 'Money Market', value: 2.07, color: assetClassColors['Cash'] },
    ],
  };

  // Breakdown data for portfolios (Sector view)
  const breakdownData = {
    test4: {
      cyclical: [
        { name: 'Basic Materials', value: 2.43, color: sectorColors['Basic Materials'] },
        { name: 'Consumer Cyclical', value: 1.98, color: sectorColors['Consumer Cyclical'] },
        { name: 'Financial Services', value: 10.33, color: sectorColors['Financial Services'] },
        { name: 'Real Estate', value: 6.89, color: sectorColors['Real Estate'] },
      ],
      sensitive: [
        { name: 'Communication Services', value: 3.22, color: sectorColors['Communication Services'] },
        { name: 'Energy', value: 2.15, color: sectorColors['Energy'] },
        { name: 'Industrials', value: 8.36, color: sectorColors['Industrials'] },
        { name: 'Technology', value: 17.13, color: sectorColors['Technology'] },
      ],
      defensive: [
        { name: 'Consumer Defensive', value: 5.49, color: sectorColors['Consumer Defensive'] },
        { name: 'Healthcare', value: 7.08, color: sectorColors['Healthcare'] },
        { name: 'Utilities', value: 1.10, color: sectorColors['Utilities'] },
      ],
      others: [
        { name: 'Other', value: 37.33, color: sectorColors['Other'] },
      ],
    },
    stanLife: {
      cyclical: [],
      sensitive: [],
      defensive: [],
      others: [
        { name: 'Other', value: 100.00, color: sectorColors['Other'] },
      ],
    },
  };

  // Country breakdown data
  const countryData = {
    test4: [
      { name: 'United States', equity: 22.26, fixedIncome: 7.31, total: 29.57 },
      { name: 'United Kingdom', equity: 12.21, fixedIncome: 5.96, total: 18.17 },
      { name: 'Other', equity: 12.27, fixedIncome: 4.06, total: 16.33 },
      { name: 'Japan', equity: 3.60, fixedIncome: 0.61, total: 4.21 },
      { name: 'Unknown', equity: 2.89, fixedIncome: 10.11, total: 13.00 },
      { name: 'France', equity: 2.62, fixedIncome: 0.00, total: 2.62 },
      { name: 'Canada', equity: 2.15, fixedIncome: 0.49, total: 2.64 },
      { name: 'Germany', equity: 2.15, fixedIncome: 0.12, total: 2.27 },
      { name: 'China', equity: 1.60, fixedIncome: 0.00, total: 1.60 },
      { name: 'South Korea', equity: 1.11, fixedIncome: 0.12, total: 1.23 },
      { name: 'Singapore', equity: 0.49, fixedIncome: 0.00, total: 0.49 },
      { name: 'Brazil', equity: 0.49, fixedIncome: 0.12, total: 0.61 },
      { name: 'Australia', equity: 0.49, fixedIncome: 0.12, total: 0.61 },
    ],
    stanLife: [
      { name: 'Unknown', equity: 0.00, fixedIncome: 80.11, total: 80.11 },
      { name: 'United Kingdom', equity: 0.00, fixedIncome: 16.48, total: 16.48 },
      { name: 'Australia', equity: 0.00, fixedIncome: 0.79, total: 0.79 },
      { name: 'South Korea', equity: 0.00, fixedIncome: 0.65, total: 0.65 },
      { name: 'Canada', equity: 0.00, fixedIncome: 0.60, total: 0.60 },
      { name: 'France', equity: 0.00, fixedIncome: 0.53, total: 0.53 },
      { name: 'China', equity: 0.00, fixedIncome: 0.37, total: 0.37 },
      { name: 'Sweden', equity: 0.00, fixedIncome: 0.27, total: 0.27 },
      { name: 'Japan', equity: 0.00, fixedIncome: 0.12, total: 0.12 },
      { name: 'China', equity: 0.00, fixedIncome: 0.08, total: 0.08 },
    ],
  };

  // Regional breakdown data
  const regionalData = {
    test1: [
      { name: 'United States', equity: 27.30, fixedIncome: 6.57, total: 33.87 },
      { name: 'United Kingdom', equity: 20.87, fixedIncome: 23.48, total: 44.35 },
      { name: 'Eurozone', equity: 10.00, fixedIncome: 4.09, total: 14.09 },
      { name: 'Japan', equity: 6.09, fixedIncome: 0.87, total: 6.96 },
      { name: 'Asia Developed', equity: 3.13, fixedIncome: 0.61, total: 3.74 },
      { name: 'Latin America', equity: 0.96, fixedIncome: 0.87, total: 1.83 },
      { name: 'Asia Emerging', equity: 1.13, fixedIncome: 0.26, total: 1.39 },
      { name: 'Canada', equity: 1.09, fixedIncome: 0.00, total: 1.09 },
      { name: 'Europe Ex Euro', equity: 0.96, fixedIncome: 0.09, total: 1.05 },
      { name: 'Australasia', equity: 0.13, fixedIncome: 0.00, total: 0.13 },
      { name: 'Europe Emerging', equity: 0.13, fixedIncome: 0.00, total: 0.13 },
      { name: 'Middle East', equity: 0.09, fixedIncome: 0.00, total: 0.09 },
    ],
  };

  // Stacked bar data
  const stackedBarData = [
    {
      name: 'Stan Life Corporate Sterling 2 Pen',
      'Other': 100,
      'Basic Materials': 0,
      'Communication Services': 0,
      'Consumer Cyclical': 0,
      'Consumer Defensive': 0,
      'Energy': 0,
      'Financial Services': 0,
      'Healthcare': 0,
      'Industrials': 0,
      'Real Estate': 0,
      'Technology': 0,
      'Utilities': 0,
    },
    {
      name: 'Test4',
      'Other': 37.33,
      'Basic Materials': 2.43,
      'Communication Services': 3.22,
      'Consumer Cyclical': 1.98,
      'Consumer Defensive': 5.49,
      'Energy': 2.15,
      'Financial Services': 10.33,
      'Healthcare': 7.08,
      'Industrials': 8.36,
      'Real Estate': 6.89,
      'Technology': 17.13,
      'Utilities': 1.10,
    },
  ];

  // Sample fund data for modals
  const availableFunds = [
    { name: "Vanguard LifeStrategy 60% Equity A Inc", isin: "GB00B4PQW151", sector: "Global" },
    { name: "Vanguard LifeStrategy 80% Equity A Inc", isin: "GB00B4PQW045", sector: "Global" },
    { name: "BlackRock Global Equity Index Fund", isin: "GB00B84DY642", sector: "Global Equity" },
    { name: "Fidelity Index World Fund", isin: "GB00BJS8SJ34", sector: "Global Equity" },
  ];

  // Sample fund data for fund filter table
  const fundFilterData = [
    {
      name: "StatuLife Corporate Sterling 2 PEP",
      cipSolution: "Mixed Investment 40-85% Shares",
      iaSector: "GBP Money Market",
      morningStar: "GBP Money Market",
      ocf: "0.50%",
      perf1y: "4.17%",
      perf3y: "16.45%",
      perf5y: "0.00%",
      annualYield: "8.00%",
    },
    {
      name: "Vanguard LifeStrategy 20% Eq A Grs Inc",
      cipSolution: "Mixed Investment 0-35% Shares",
      iaSector: "GBP Allocation 0-35% Equity",
      morningStar: "GBP Allocation 0-35% Equity",
      ocf: "0.20%",
      perf1y: "6.25%",
      perf3y: "3.26%",
      perf5y: "2.80%",
      annualYield: "3.80%",
    },
    {
      name: "Vanguard LifeStrategy 40% Equity A Inc",
      cipSolution: "Mixed Investment 20-60% Shares",
      iaSector: "GBP Allocation 20-40% Equity",
      morningStar: "GBP Allocation 20-40% Equity",
      ocf: "0.20%",
      perf1y: "8.64%",
      perf3y: "15.93%",
      perf5y: "2.11%",
      annualYield: "2.11%",
    },
    {
      name: "Vanguard LifeStrategy 60% Equity A Inc",
      cipSolution: "Mixed Investment 20-60% Shares",
      iaSector: "GBP Allocation 40-60% Equity",
      morningStar: "GBP Allocation 40-60% Equity",
      ocf: "0.20%",
      perf1y: "10.28%",
      perf3y: "23.27%",
      perf5y: "1.85%",
      annualYield: "1.85%",
    },
    {
      name: "Vanguard LifeStrategy 80% Equity A Inc",
      cipSolution: "Mixed Investment 40-85% Shares",
      iaSector: "GBP Allocation 60-80% Equity",
      morningStar: "GBP Allocation 60-80% Equity",
      ocf: "0.20%",
      perf1y: "12.27%",
      perf3y: "30.33%",
      perf5y: "1.57%",
      annualYield: "1.57%",
    },
    {
      name: "Vanguard LifeStrategy 100% Equity A Inc",
      cipSolution: "Global",
      iaSector: "Global Large-Cap Equity",
      morningStar: "Global Large-Cap Equity",
      ocf: "0.20%",
      perf1y: "14.27%",
      perf3y: "70.80%",
      perf5y: "1.32%",
      annualYield: "1.32%",
    },
    {
      name: "iShares Core UK Gilts ETF GBP (Dist)",
      cipSolution: "UK Gilts",
      iaSector: "GBP Government Bond",
      morningStar: "GBP Government Bond",
      ocf: "0.07%",
      perf1y: "3.33%",
      perf3y: "-21.01%",
      perf5y: "4.32%",
      annualYield: "4.32%",
    },
  ];

  // Sample portfolio data for portfolio filter table
  const portfolioFilterData = [
    {
      name: "7IM Active Adventurous",
      provider: "(View)",
      assetClass: "Equity",
      subAssetClass: "Global Equity",
      country: "UK",
      region: "Global",
      sector: "Multi-Sector",
      cipSolution: "GBP Allocation 60+% Equity",
      morningStar: "",
      ocf: "0.38%",
      perf3y: "18.38%",
      perf5y: "17.14%",
      relativeBenchmark: "+5.23%",
      maxDrawdown: "-1.73%",
      alpha: "9.47%",
      volatility: "12.4%",
    },
    {
      name: "7IM Active Adventurous Plus",
      provider: "(View)",
      assetClass: "Equity",
      subAssetClass: "Large Cap",
      country: "Global",
      region: "North America",
      sector: "Multi-Sector",
      cipSolution: "Global Large-Cap Blend Equity",
      morningStar: "",
      ocf: "0.47%",
      perf3y: "13.08%",
      perf5y: "17.13%",
      relativeBenchmark: "+2.87%",
      maxDrawdown: "2.85%",
      alpha: "7.48%",
      volatility: "14.2%",
    },
    {
      name: "7IM Active Balanced",
      provider: "(View)",
      assetClass: "Mixed Allocation",
      subAssetClass: "Balanced",
      country: "UK",
      region: "Europe",
      sector: "Multi-Sector",
      cipSolution: "GBP Allocation 40-60% Equity",
      morningStar: "",
      ocf: "0.41%",
      perf3y: "8.16%",
      perf5y: "27.72%",
      relativeBenchmark: "+3.14%",
      maxDrawdown: "-1.87%",
      alpha: "6.21%",
      volatility: "9.8%",
    },
    {
      name: "7IM Active Cautious",
      provider: "(View)",
      assetClass: "Fixed Income",
      subAssetClass: "Conservative",
      country: "UK",
      region: "Europe",
      sector: "Government Bonds",
      cipSolution: "GBP Allocation 0-20% Equity",
      morningStar: "",
      ocf: "0.41%",
      perf3y: "7.11%",
      perf5y: "0.27%",
      relativeBenchmark: "+1.95%",
      maxDrawdown: "1.85%",
      alpha: "1.38%",
      volatility: "5.6%",
    },
    {
      name: "7IM Active Moderately Adventurous",
      provider: "(View)",
      assetClass: "Equity",
      subAssetClass: "Global Equity",
      country: "UK",
      region: "Global",
      sector: "Multi-Sector",
      cipSolution: "GBP Allocation 60-80% Equity",
      morningStar: "",
      ocf: "0.43%",
      perf3y: "18.31%",
      perf5y: "15.78%",
      relativeBenchmark: "+4.78%",
      maxDrawdown: "-3.33%",
      alpha: "7.85%",
      volatility: "13.7%",
    },
    {
      name: "7IM Active Moderately Cautious",
      provider: "(View)",
      assetClass: "Mixed Allocation",
      subAssetClass: "Conservative",
      country: "UK",
      region: "Europe",
      sector: "Multi-Sector",
      cipSolution: "GBP Allocation 20-40% Equity",
      morningStar: "",
      ocf: "0.42%",
      perf3y: "0.10%",
      perf5y: "17.18%",
      relativeBenchmark: "+2.45%",
      maxDrawdown: "0.11%",
      alpha: "4.37%",
      volatility: "7.9%",
    },
    {
      name: "7IM Blended Adventurous",
      provider: "(View)",
      assetClass: "Equity",
      subAssetClass: "Aggressive Growth",
      country: "Global",
      region: "Global",
      sector: "Multi-Sector",
      cipSolution: "GBP Allocation 80+% Equity",
      morningStar: "",
      ocf: "0.08%",
      perf3y: "12.19%",
      perf5y: "45.51%",
      relativeBenchmark: "+6.32%",
      maxDrawdown: "0.18%",
      alpha: "5.19%",
      volatility: "15.8%",
    },
    {
      name: "7IM Blended Adventurous Plus",
      provider: "(View)",
      assetClass: "Equity",
      subAssetClass: "Aggressive Growth",
      country: "Global",
      region: "Global",
      sector: "Multi-Sector",
      cipSolution: "GBP Allocation 80+% Equity",
      morningStar: "",
      ocf: "0.87%",
      perf3y: "12.47%",
      perf5y: "",
      relativeBenchmark: "+5.89%",
      maxDrawdown: "2.08%",
      alpha: "9.62%",
      volatility: "16.2%",
    },
  ];

  // Portfolio Filter Full Screen View
  if (showPortfolioFilter) {
    return (
      <div className="min-h-screen bg-[#0B1120] text-white flex">
        {/* Left Sidebar - Filters */}
        <div className="w-64 bg-[#0f1420] border-r border-gray-800 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold text-gray-400">FILTERS</h2>
              <div className="flex items-center gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded">
                  RESET
                </button>
                <button className="bg-transparent border border-blue-600 hover:bg-blue-900 hover:bg-opacity-20 text-white text-xs font-bold px-2 py-1 rounded">
                  SAVE
                </button>
              </div>
            </div>
            
            {/* Portfolio Classification */}
            <div className="mb-4">
              <button className="w-full text-left text-xs font-bold text-gray-400 mb-2 flex items-center justify-between">
                Portfolio classification
                <span>›</span>
              </button>
            </div>

            {/* CIP Solution Filter */}
            <div className="mb-6">
              <button className="w-full text-left text-xs font-bold text-gray-400 mb-2 flex items-center justify-between">
                CIP SOLUTION
                <span>›</span>
              </button>
              <select className="w-full bg-[#0B1120] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
                <option>Select CIP Solution</option>
              </select>
            </div>

            {/* Provider Filter */}
            <div className="mb-6">
              <button className="w-full text-left text-xs font-bold text-gray-400 mb-2 flex items-center justify-between">
                PROVIDER
                <span>›</span>
              </button>
              <select className="w-full bg-[#0B1120] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
                <option>Select Provider</option>
              </select>
            </div>

            {/* Morningstar Sector Filter */}
            <div className="mb-6">
              <button className="w-full text-left text-xs font-bold text-gray-400 mb-2 flex items-center justify-between">
                MORNINGSTAR SECTOR
                <span>›</span>
              </button>
              <select className="w-full bg-[#0B1120] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
                <option>Select Morningstar Sector</option>
              </select>
            </div>

            {/* Inception Date Filter */}
            <div className="mb-6">
              <button className="w-full text-left text-xs font-bold text-gray-400 mb-2 flex items-center justify-between">
                INCEPTION DATE
                <span>›</span>
              </button>
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <input type="text" placeholder="DD/MM/YYYY" className="flex-1 bg-[#0B1120] border border-gray-700 rounded px-2 py-1 text-xs text-white text-center focus:outline-none focus:border-blue-500" />
                  <button className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded">GO</button>
                </div>
                <div className="flex items-center gap-1">
                  <input type="text" placeholder="DD/MM/YYYY" className="flex-1 bg-[#0B1120] border border-gray-700 rounded px-2 py-1 text-xs text-white text-center focus:outline-none focus:border-blue-500" />
                  <button className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded">GO</button>
                </div>
              </div>
            </div>

            {/* Collapsible Sections */}
            <div className="mb-4">
              <button className="w-full text-left text-xs font-bold text-gray-400 mb-2 flex items-center justify-between">
                Changes
                <span>›</span>
              </button>
            </div>

            <div className="mb-4">
              <button className="w-full text-left text-xs font-bold text-gray-400 mb-2 flex items-center justify-between">
                Performance
                <span>›</span>
              </button>
            </div>

            <div className="mb-4">
              <button className="w-full text-left text-xs font-bold text-gray-400 mb-2 flex items-center justify-between">
                Risk
                <span>›</span>
              </button>
            </div>

            <div className="mb-4">
              <button className="w-full text-left text-xs font-bold text-gray-400 mb-2 flex items-center justify-between">
                Breakdown
                <span>›</span>
              </button>
            </div>

            <div className="mb-4">
              <button className="w-full text-left text-xs font-bold text-gray-400 mb-2 flex items-center justify-between">
                Ratios
                <span>›</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <div className="bg-[#111827] border-b border-gray-800 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold mb-2">Portfolio Filter</h2>
                <p className="text-xs text-gray-400 mb-2">
                  Use this tool to search and filter our entire portfolio universe based on specific criteria. Apply filters across key data columns to create a tailored shortlist. You can sort each column and add or remove data columns as needed. Check here to save a new filter to use later, or add your results to{' '}
                  <span className="text-blue-400">My portfolios</span> or add your shortlist directly into (existing) Selection for deeper analysis and comparison
                </p>
                <div className="text-sm">
                  <span className="text-white font-bold">Portfolio shortlist:</span>{' '}
                  <span className="text-blue-400 font-bold">1,704</span> matches from MPS directory of{' '}
                  <span className="text-white">1,704 portfolios</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-blue-400 text-sm hover:text-blue-300">Reset Selection</button>
                <button onClick={() => setShowPortfolioFilter(false)} className="text-gray-400 hover:text-white text-xl">
                  ×
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button className="bg-transparent border border-gray-700 hover:bg-gray-800 text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-2">
                  EXPORT SELECTED ROWS
                </Button>
                <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-2">
                  + ADD TO MY SELECTION
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-white">
                  <Search className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-white">☷</button>
                <button className="text-gray-400 hover:text-white">≡</button>
                <div className="relative">
                  <button 
                    onClick={() => setShowColumnSettings(!showColumnSettings)}
                    className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded transition-colors"
                    title="Column Settings"
                  >
                    <SettingsIcon className="w-5 h-5" />
                  </button>
                  
                  {/* Column Settings Dropdown */}
                  {showColumnSettings && (
                    <div className="absolute right-0 top-full mt-2 w-72 bg-[#1a1f2e] border border-gray-700 rounded-lg shadow-xl z-50">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-bold text-white">Column Visibility</h3>
                          <button 
                            onClick={() => setShowColumnSettings(false)}
                            className="text-gray-400 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="flex items-center gap-2 mb-4">
                          <button
                            onClick={() => toggleAllColumns(true)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded transition-colors"
                          >
                            Show All
                          </button>
                          <button
                            onClick={() => toggleAllColumns(false)}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold px-3 py-2 rounded transition-colors"
                          >
                            Hide All
                          </button>
                        </div>
                        
                        {/* Column Toggles */}
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm text-gray-300 hover:bg-gray-800 p-2 rounded cursor-pointer">
                            <input
                              type="checkbox"
                              checked={columnVisibility.assetClass}
                              onChange={() => toggleColumn('assetClass')}
                              className="w-4 h-4 rounded border-gray-600 bg-[#0B1120]"
                            />
                            <span>Asset Class</span>
                          </label>
                          
                          <label className="flex items-center gap-2 text-sm text-gray-300 hover:bg-gray-800 p-2 rounded cursor-pointer">
                            <input
                              type="checkbox"
                              checked={columnVisibility.subAssetClass}
                              onChange={() => toggleColumn('subAssetClass')}
                              className="w-4 h-4 rounded border-gray-600 bg-[#0B1120]"
                            />
                            <span>Sub-Asset Class</span>
                          </label>
                          
                          <label className="flex items-center gap-2 text-sm text-gray-300 hover:bg-gray-800 p-2 rounded cursor-pointer">
                            <input
                              type="checkbox"
                              checked={columnVisibility.country}
                              onChange={() => toggleColumn('country')}
                              className="w-4 h-4 rounded border-gray-600 bg-[#0B1120]"
                            />
                            <span>Country</span>
                          </label>
                          
                          <label className="flex items-center gap-2 text-sm text-gray-300 hover:bg-gray-800 p-2 rounded cursor-pointer">
                            <input
                              type="checkbox"
                              checked={columnVisibility.region}
                              onChange={() => toggleColumn('region')}
                              className="w-4 h-4 rounded border-gray-600 bg-[#0B1120]"
                            />
                            <span>Region</span>
                          </label>
                          
                          <label className="flex items-center gap-2 text-sm text-gray-300 hover:bg-gray-800 p-2 rounded cursor-pointer">
                            <input
                              type="checkbox"
                              checked={columnVisibility.sector}
                              onChange={() => toggleColumn('sector')}
                              className="w-4 h-4 rounded border-gray-600 bg-[#0B1120]"
                            />
                            <span>Sector</span>
                          </label>
                          
                          <label className="flex items-center gap-2 text-sm text-gray-300 hover:bg-gray-800 p-2 rounded cursor-pointer">
                            <input
                              type="checkbox"
                              checked={columnVisibility.absolutePerformance}
                              onChange={() => toggleColumn('absolutePerformance')}
                              className="w-4 h-4 rounded border-gray-600 bg-[#0B1120]"
                            />
                            <span>Absolute Performance (3Y/5Y)</span>
                          </label>
                          
                          <label className="flex items-center gap-2 text-sm text-gray-300 hover:bg-gray-800 p-2 rounded cursor-pointer">
                            <input
                              type="checkbox"
                              checked={columnVisibility.relativeBenchmark}
                              onChange={() => toggleColumn('relativeBenchmark')}
                              className="w-4 h-4 rounded border-gray-600 bg-[#0B1120]"
                            />
                            <span>Relative vs Benchmark</span>
                          </label>
                          
                          <label className="flex items-center gap-2 text-sm text-gray-300 hover:bg-gray-800 p-2 rounded cursor-pointer">
                            <input
                              type="checkbox"
                              checked={columnVisibility.volatility}
                              onChange={() => toggleColumn('volatility')}
                              className="w-4 h-4 rounded border-gray-600 bg-[#0B1120]"
                            />
                            <span>Volatility</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-xs">
              <thead className="bg-[#0f1420] sticky top-0">
                <tr className="border-b border-gray-800">
                  <th className="text-left p-3 font-bold text-gray-400 w-8">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-[#0B1120]" />
                  </th>
                  <th className="text-left p-3 font-bold text-gray-400">NAME</th>
                  {columnVisibility.assetClass && <th className="text-left p-3 font-bold text-gray-400">ASSET CLASS</th>}
                  {columnVisibility.subAssetClass && <th className="text-left p-3 font-bold text-gray-400">SUB-ASSET CLASS</th>}
                  {columnVisibility.country && <th className="text-left p-3 font-bold text-gray-400">COUNTRY</th>}
                  {columnVisibility.region && <th className="text-left p-3 font-bold text-gray-400">REGION</th>}
                  {columnVisibility.sector && <th className="text-left p-3 font-bold text-gray-400">SECTOR</th>}
                  <th className="text-left p-3 font-bold text-gray-400">CIP SOLUTION</th>
                  <th className="text-left p-3 font-bold text-gray-400">MORNINGSTAR SECTOR</th>
                  <th className="text-left p-3 font-bold text-gray-400">OCF</th>
                  {columnVisibility.absolutePerformance && <th className="text-left p-3 font-bold text-gray-400">3Y PERFORMANCE</th>}
                  {columnVisibility.absolutePerformance && <th className="text-left p-3 font-bold text-gray-400">5Y PERFORMANCE</th>}
                  {columnVisibility.relativeBenchmark && <th className="text-left p-3 font-bold text-gray-400">RELATIVE VS BENCHMARK</th>}
                  <th className="text-left p-3 font-bold text-gray-400">3Y MAX DRAWDOWN</th>
                  <th className="text-left p-3 font-bold text-gray-400">3Y ALPHA</th>
                  {columnVisibility.volatility && <th className="text-left p-3 font-bold text-gray-400">3Y VOLATILITY</th>}
                </tr>
              </thead>
              <tbody>
                {portfolioFilterData.map((portfolio, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-[#0f1420] transition-colors">
                    <td className="p-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-[#0B1120]" />
                    </td>
                    <td className="p-3">
                      <div className="text-yellow-400 font-bold">{portfolio.name}</div>
                      <div className="text-blue-400 text-xs">{portfolio.provider}</div>
                    </td>
                    {columnVisibility.assetClass && <td className="p-3 text-white">{portfolio.assetClass}</td>}
                    {columnVisibility.subAssetClass && <td className="p-3 text-white">{portfolio.subAssetClass}</td>}
                    {columnVisibility.country && <td className="p-3 text-white">{portfolio.country}</td>}
                    {columnVisibility.region && <td className="p-3 text-white">{portfolio.region}</td>}
                    {columnVisibility.sector && <td className="p-3 text-white">{portfolio.sector}</td>}
                    <td className="p-3">
                      <div className="text-blue-400 text-xs">{portfolio.cipSolution}</div>
                    </td>
                    <td className="p-3 text-white">{portfolio.morningStar}</td>
                    <td className="p-3 text-white">{portfolio.ocf}</td>
                    {columnVisibility.absolutePerformance && (
                      <td className={`p-3 ${parseFloat(portfolio.perf3y) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {portfolio.perf3y}
                      </td>
                    )}
                    {columnVisibility.absolutePerformance && (
                      <td className={`p-3 ${portfolio.perf5y && parseFloat(portfolio.perf5y) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {portfolio.perf5y}
                      </td>
                    )}
                    {columnVisibility.relativeBenchmark && (
                      <td className={`p-3 ${parseFloat(portfolio.relativeBenchmark) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {portfolio.relativeBenchmark}
                      </td>
                    )}
                    <td className={`p-3 ${parseFloat(portfolio.maxDrawdown) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {portfolio.maxDrawdown}
                    </td>
                    <td className={`p-3 ${parseFloat(portfolio.alpha) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {portfolio.alpha}
                    </td>
                    {columnVisibility.volatility && <td className="p-3 text-white">{portfolio.volatility}</td>}
                    <td className="p-3">
                      <button className="text-gray-400 hover:text-white">⋯</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-[#111827] border-t border-gray-800 p-4 flex items-center justify-center gap-2">
            <button className="text-gray-400 hover:text-white px-3 py-1">‹</button>
            <button className="bg-blue-500 text-white px-3 py-1 rounded">1</button>
            <button className="text-gray-400 hover:text-white px-3 py-1">2</button>
            <button className="text-gray-400 hover:text-white px-3 py-1">3</button>
            <button className="text-gray-400 hover:text-white px-3 py-1">...</button>
            <span className="text-gray-400 text-sm">213</span>
            <button className="text-gray-400 hover:text-white px-3 py-1">›</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-6">
      {/* Top Action Buttons */}
      <div className="flex items-center gap-3 mb-8">
        <Button 
          onClick={() => setShowNewCase(true)}
          className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-full"
        >
          NEW CASE
        </Button>
        <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-full">
          OPEN ANALYSIS
        </Button>
        <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-full">
          SAVE ANALYSIS
        </Button>
      </div>

      {/* Investment Selection Section */}
      <div className="bg-[#111827] rounded-lg p-6 mb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Investment Selection</h2>
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-white">
              <Trash2 className="w-5 h-5" />
            </button>
            <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold px-4 py-2 rounded flex items-center gap-2">
              VIEW
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* CIP Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-400 mb-3">CIP Selection</h3>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={cipSearch}
              onChange={(e) => setCipSearch(e.target.value)}
              placeholder="Select Funds or Portfolios"
              className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Portfolios Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-400">Portfolios</h3>
            <div className="flex items-center gap-3">
              <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded">
                ADD MODEL PORTFOLIO
              </Button>
              <Button 
                onClick={() => setShowCreatePortfolio(true)}
                className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded"
              >
                CREATE CUSTOM PORTFOLIO
              </Button>
              <Button 
                onClick={() => setShowPortfolioFilter(true)}
                className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded"
              >
                PORTFOLIO FILTER
              </Button>
            </div>
          </div>
        </div>

        {/* Funds Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-400">Funds</h3>
            <div className="flex items-center gap-3">
              <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded">
                BULK IMPORT
              </Button>
              <Button 
                onClick={() => setShowAddFundManually(true)}
                className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded"
              >
                ADD FUND MANUALLY
              </Button>
              <Button 
                onClick={() => setShowFundFilter(true)}
                className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded"
              >
                FUND FILTER
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={fundSearch}
              onChange={(e) => setFundSearch(e.target.value)}
              placeholder="Search Fund name, ISIN or Keyword(s)"
              className="w-full bg-[#1a1f2e] border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Empty State */}
      {!hasPortfolio && selectedInvestments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 bg-[#1a1f2e] rounded-lg flex items-center justify-center mb-6">
            <Plus className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">No Investments Selected</h3>
          <p className="text-gray-400 text-center max-w-md">
            Start building your Investment Analysis by selecting a new CIP Solution above, or adding portfolios and funds manually.
          </p>
        </div>
      )}

      {/* Portfolio Table View */}
      {hasPortfolio && (
        <div className="bg-[#111827] rounded-lg overflow-hidden">
          {/* Tabs Section */}
          <div className="border-b border-gray-800 px-6 pt-4">
            <div className="flex items-center gap-6">
              {['Overview', 'Charges', 'Performance', 'Risk', 'Breakdown', 'Ratio'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-500'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Header Section */}
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Portfolios</h3>
              <button className="text-blue-400 hover:text-blue-300 text-sm">Reset Filters</button>
            </div>

            <div className="flex items-center justify-between">
              <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded">
                EXPORT ALL DATA
              </Button>
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white">
                  <Search className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <Filter className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Content - Tab dependent */}
          {activeTab === 'Performance' ? (
            /* Performance Tab Content */
            <div className="p-6">
              {/* Performance Controls */}
              <div className="flex items-center justify-between mb-6">
                {/* Period Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 mr-2">Performance period</span>
                  {['1M', '3M', '1Y', '3Y', '5Y', '10Y', '20Y', 'START OF DATA'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setPerformancePeriod(period)}
                      className={`px-3 py-1.5 text-xs font-medium rounded ${
                        performancePeriod === period
                          ? 'bg-[#3B82F6] text-white'
                          : 'bg-[#1a1f2e] text-gray-400 hover:text-white'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>

                {/* Date Range and Manage Benchmarks */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-[#1a1f2e] rounded px-3 py-2">
                    <input
                      type="text"
                      defaultValue="10/08/2025"
                      className="w-24 bg-transparent text-white text-sm text-center focus:outline-none"
                    />
                    <span className="text-gray-400">—</span>
                    <input
                      type="text"
                      defaultValue="09/02/2026"
                      className="w-24 bg-transparent text-white text-sm text-center focus:outline-none"
                    />
                    <Button className="bg-[#374151] hover:bg-[#4B5563] text-white text-xs font-bold px-3 py-1 rounded">
                      GO
                    </Button>
                  </div>
                  <button className="p-2 bg-[#1a1f2e] hover:bg-[#2a2f3e] rounded">
                    <Calendar className="w-4 h-4 text-gray-400" />
                  </button>
                  <Button 
                    onClick={() => setShowManageBenchmarks(true)}
                    className="bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded"
                  >
                    MANAGE BENCHMARKS
                  </Button>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="bg-[#0B1120] rounded-lg p-6">
                <div style={{ width: '100%', height: '336px' }}> {/* h-96 = 384px - 48px padding = 336px */}
                  {isMounted && (
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                      <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1f2e" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#6B7280" 
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      axisLine={{ stroke: '#1a1f2e' }}
                    />
                    <YAxis 
                      stroke="#6B7280" 
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      axisLine={{ stroke: '#1a1f2e' }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1f2e', 
                        border: '1px solid #374151', 
                        borderRadius: '8px',
                        padding: '12px'
                      }}
                      labelStyle={{ color: '#9CA3AF', fontSize: '12px', marginBottom: '4px' }}
                      itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}
                      formatter={(value: any) => [`${value}%`, 'Test4']}
                      labelFormatter={(label) => `10/1/2025`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      strokeWidth={2} 
                      dot={{ fill: '#3B82F6', r: 3 }}
                      activeDot={{ r: 5, fill: '#3B82F6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          ) : activeTab === 'Breakdown' ? (
            /* Breakdown Tab Content */
            <div className="p-6">
              {/* Breakdown View Selector */}
              <div className="flex items-center gap-3 mb-6">
                {['Asset Class', 'Sector', 'Country', 'Regional'].map((view) => (
                  <button
                    key={view}
                    onClick={() => setBreakdownView(view)}
                    className={`px-4 py-2 text-sm font-medium rounded ${
                      breakdownView === view
                        ? 'bg-[#3B82F6] text-white'
                        : 'bg-[#1a1f2e] text-gray-400 hover:text-white'
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </div>

              {breakdownView === 'Asset Class' ? (
                /* Asset Class View */
                <div className="bg-[#0B1120] rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">PruFund Global Diversification</h3>
                    <a href="#" className="text-blue-400 text-xs hover:underline">View on Koris.ai</a>
                  </div>

                  <div className="flex gap-8">
                    {/* Left - Donut Chart */}
                    <div className="w-96 h-96 flex-shrink-0">
                      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <PieChart>
                          <Pie
                            data={[
                              ...assetClassData.equity,
                              ...assetClassData.realEstate,
                              ...assetClassData.commodities,
                              ...assetClassData.bonds,
                              ...assetClassData.cash,
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={100}
                            outerRadius={180}
                            paddingAngle={1}
                            dataKey="value"
                          >
                            {[
                              ...assetClassData.equity,
                              ...assetClassData.realEstate,
                              ...assetClassData.commodities,
                              ...assetClassData.bonds,
                              ...assetClassData.cash,
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1a1f2e', 
                              border: '1px solid #374151', 
                              borderRadius: '8px',
                              padding: '8px 12px'
                            }}
                            formatter={(value: any) => `${value}%`}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Right - Categorized Breakdown */}
                    <div className="flex-1 space-y-6">
                      {/* Equity */}
                      <div>
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-800">
                          <span className="text-white font-bold text-sm">Equity</span>
                          <span className="text-white font-bold text-sm">85.09%</span>
                        </div>
                        <div className="space-y-2">
                          {assetClassData.equity.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400 w-4">{idx + 1}</span>
                                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }}></div>
                                <span className="text-gray-300">{item.name}</span>
                              </div>
                              <span className="text-gray-300">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Real Estate */}
                      <div>
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-800">
                          <span className="text-white font-bold text-sm">Real Estate</span>
                          <span className="text-white font-bold text-sm">12.86%</span>
                        </div>
                        <div className="space-y-2">
                          {assetClassData.realEstate.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400 w-4">{idx + 1}</span>
                                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }}></div>
                                <span className="text-gray-300">{item.name}</span>
                              </div>
                              <span className="text-gray-300">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Commodities */}
                      <div>
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-800">
                          <span className="text-white font-bold text-sm">Commodities</span>
                          <span className="text-white font-bold text-sm">2.07%</span>
                        </div>
                        <div className="space-y-2">
                          {assetClassData.commodities.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400 w-4">{idx + 1}</span>
                                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }}></div>
                                <span className="text-gray-300">{item.name}</span>
                              </div>
                              <span className="text-gray-300">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bonds */}
                      <div>
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-800">
                          <span className="text-white font-bold text-sm">Bonds</span>
                          <span className="text-white font-bold text-sm">29.80%</span>
                        </div>
                        <div className="space-y-2">
                          {assetClassData.bonds.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400 w-4">{idx + 1}</span>
                                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }}></div>
                                <span className="text-gray-300">{item.name}</span>
                              </div>
                              <span className="text-gray-300">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Cash & Cash Equivalents */}
                      <div>
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-800">
                          <span className="text-white font-bold text-sm">Cash & Cash Equivalents</span>
                          <span className="text-white font-bold text-sm">2.07%</span>
                        </div>
                        <div className="space-y-2">
                          {assetClassData.cash.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400 w-4">{idx + 1}</span>
                                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }}></div>
                                <span className="text-gray-300">{item.name}</span>
                              </div>
                              <span className="text-gray-300">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Sector/Country/Regional View */
                <>
                  {breakdownView === 'Country' ? (
                    /* Country View */
                    <div className="grid grid-cols-2 gap-6">
                      {/* Test4 Card */}
                      <div className="bg-[#0B1120] rounded-lg p-6">
                        <h3 className="text-lg font-bold text-white mb-6">Test4</h3>
                        <div className="space-y-3">
                          {countryData.test4.map((country, idx) => (
                            <div key={idx}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-white text-xs font-medium">{country.name}</span>
                              </div>
                              <div className="flex items-center gap-1 h-6">
                                {country.equity > 0 && (
                                  <div 
                                    className="bg-orange-500 h-full flex items-center justify-end pr-2 rounded-l"
                                    style={{ width: `${(country.equity / 100) * 100}%` }}
                                  >
                                    <span className="text-white text-[10px] font-bold">{country.equity}%</span>
                                  </div>
                                )}
                                {country.fixedIncome > 0 && (
                                  <div 
                                    className="bg-cyan-500 h-full flex items-center justify-end pr-2 rounded-r"
                                    style={{ width: `${(country.fixedIncome / 100) * 100}%` }}
                                  >
                                    <span className="text-white text-[10px] font-bold">{country.fixedIncome}%</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-800">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                            <span className="text-xs text-gray-400">Equity</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-cyan-500 rounded-sm"></div>
                            <span className="text-xs text-gray-400">Fixed Income</span>
                          </div>
                        </div>
                      </div>

                      {/* Stan Life Corporate Sterling 2 Pen Card */}
                      <div className="bg-[#0B1120] rounded-lg p-6">
                        <h3 className="text-lg font-bold text-white mb-6">Stan Life Corporate Sterling 2 Pen</h3>
                        <div className="space-y-3">
                          {countryData.stanLife.map((country, idx) => (
                            <div key={idx}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-white text-xs font-medium">{country.name}</span>
                              </div>
                              <div className="flex items-center gap-1 h-6">
                                {country.equity > 0 && (
                                  <div 
                                    className="bg-orange-500 h-full flex items-center justify-end pr-2 rounded-l"
                                    style={{ width: `${(country.equity / 100) * 100}%` }}
                                  >
                                    <span className="text-white text-[10px] font-bold">{country.equity}%</span>
                                  </div>
                                )}
                                {country.fixedIncome > 0 && (
                                  <div 
                                    className="bg-cyan-500 h-full flex items-center justify-end pr-2 rounded-r"
                                    style={{ width: `${(country.fixedIncome / 100) * 100}%` }}
                                  >
                                    <span className="text-white text-[10px] font-bold">{country.fixedIncome}%</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-800">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                            <span className="text-xs text-gray-400">Equity</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-cyan-500 rounded-sm"></div>
                            <span className="text-xs text-gray-400">Fixed Income</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : breakdownView === 'Regional' ? (
                    /* Regional View */
                    <div className="bg-[#0B1120] rounded-lg p-6">
                      <h3 className="text-lg font-bold text-white mb-6">Test1</h3>
                      <div className="space-y-3">
                        {regionalData.test1.map((region, idx) => (
                          <div key={idx}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-white text-xs font-medium">{region.name}</span>
                            </div>
                            <div className="flex items-center gap-1 h-6">
                              {region.equity > 0 && (
                                <div 
                                  className="bg-orange-500 h-full flex items-center justify-end pr-2 rounded-l"
                                  style={{ width: `${(region.equity / 50) * 100}%` }}
                                >
                                  <span className="text-white text-[10px] font-bold">{region.equity}%</span>
                                </div>
                              )}
                              {region.fixedIncome > 0 && (
                                <div 
                                  className="bg-cyan-500 h-full flex items-center justify-end pr-2 rounded-r"
                                  style={{ width: `${(region.fixedIncome / 50) * 100}%` }}
                                >
                                  <span className="text-white text-[10px] font-bold">{region.fixedIncome}%</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-800">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                          <span className="text-xs text-gray-400">Equity</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-cyan-500 rounded-sm"></div>
                          <span className="text-xs text-gray-400">Fixed Income</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Sector View */
                    <>
                      {/* Stacked Asset Allocations */}
                      <div className="bg-[#0B1120] rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-white mb-4">Stacked Asset Allocations</h3>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <BarChart data={stackedBarData} layout="vertical" barCategoryGap={20}>
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={200}
                        tick={{ fill: '#fff', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1a1f2e', 
                          border: '1px solid #374151', 
                          borderRadius: '8px' 
                        }}
                        formatter={(value: any) => `${value}%`}
                      />
                      {Object.keys(sectorColors).map((sector) => (
                        <Bar 
                          key={sector}
                          dataKey={sector} 
                          stackId="a" 
                          fill={sectorColors[sector]}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-gray-800">
                  {Object.entries(sectorColors).map(([sector, color]) => (
                    <div key={sector} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }}></div>
                      <span className="text-xs text-gray-400">{sector}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio Breakdown Cards */}
              <div className="grid grid-cols-2 gap-6">
                {/* Test4 Card */}
                <div className="bg-[#0B1120] rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Test4</h3>
                  
                  <div className="flex gap-6">
                    {/* Breakdown List */}
                    <div className="flex-1 space-y-4 text-sm">
                      {/* Cyclical */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 font-medium">Cyclical</span>
                          <span className="text-white font-bold">21.62%</span>
                        </div>
                        <div className="space-y-1 pl-4">
                          {breakdownData.test4.cyclical.map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }}></div>
                                <span className="text-gray-300 text-xs">{item.name}</span>
                              </div>
                              <span className="text-gray-300 text-xs">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sensitive */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 font-medium">Sensitive</span>
                          <span className="text-white font-bold">20.85%</span>
                        </div>
                        <div className="space-y-1 pl-4">
                          {breakdownData.test4.sensitive.map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }}></div>
                                <span className="text-gray-300 text-xs">{item.name}</span>
                              </div>
                              <span className="text-gray-300 text-xs">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Defensive */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 font-medium">Defensive</span>
                          <span className="text-white font-bold">14.68%</span>
                        </div>
                        <div className="space-y-1 pl-4">
                          {breakdownData.test4.defensive.map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }}></div>
                                <span className="text-gray-300 text-xs">{item.name}</span>
                              </div>
                              <span className="text-gray-300 text-xs">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Others */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 font-medium">Others</span>
                          <span className="text-white font-bold">37.35%</span>
                        </div>
                        <div className="space-y-1 pl-4">
                          {breakdownData.test4.others.map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }}></div>
                                <span className="text-gray-300 text-xs">{item.name}</span>
                              </div>
                              <span className="text-gray-300 text-xs">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Donut Chart */}
                    <div className="w-48 h-48">
                      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <PieChart>
                          <Pie
                            data={[
                              ...breakdownData.test4.cyclical,
                              ...breakdownData.test4.sensitive,
                              ...breakdownData.test4.defensive,
                              ...breakdownData.test4.others,
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={1}
                            dataKey="value"
                          >
                            {[
                              ...breakdownData.test4.cyclical,
                              ...breakdownData.test4.sensitive,
                              ...breakdownData.test4.defensive,
                              ...breakdownData.test4.others,
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1a1f2e', 
                              border: '1px solid #374151', 
                              borderRadius: '8px' 
                            }}
                            formatter={(value: any) => `${value}%`}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Stan Life Corporate Sterling 2 Pen Card */}
                <div className="bg-[#0B1120] rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Stan Life Corporate Sterling 2 Pen</h3>
                  
                  <div className="flex gap-6">
                    {/* Breakdown List */}
                    <div className="flex-1 space-y-4 text-sm">
                      {/* Cyclical */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 font-medium">Cyclical</span>
                          <span className="text-white font-bold">0.00%</span>
                        </div>
                      </div>

                      {/* Sensitive */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 font-medium">Sensitive</span>
                          <span className="text-white font-bold">0.00%</span>
                        </div>
                      </div>

                      {/* Defensive */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 font-medium">Defensive</span>
                          <span className="text-white font-bold">0.00%</span>
                        </div>
                      </div>

                      {/* Others */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 font-medium">Others</span>
                          <span className="text-white font-bold">100.00%</span>
                        </div>
                        <div className="space-y-1 pl-4">
                          {breakdownData.stanLife.others.map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }}></div>
                                <span className="text-gray-300 text-xs">{item.name}</span>
                              </div>
                              <span className="text-gray-300 text-xs">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Donut Chart */}
                    <div className="w-48 h-48">
                      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <PieChart>
                          <Pie
                            data={breakdownData.stanLife.others}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={0}
                            dataKey="value"
                          >
                            {breakdownData.stanLife.others.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1a1f2e', 
                              border: '1px solid #374151', 
                              borderRadius: '8px' 
                            }}
                            formatter={(value: any) => `${value}%`}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
                    </>
                  )}
                </>
              )}
            </div>
          ) : (
            /* Table View for other tabs */
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0f1420]">
                  <tr className="border-t border-gray-800">
                    <th className="text-left p-4 font-bold text-gray-400 text-xs">NAME</th>
                    <th className="text-left p-4 font-bold text-gray-400 text-xs">CIP</th>
                    <th className="text-left p-4 font-bold text-gray-400 text-xs">MORNINGSTAR SECTOR</th>
                    <th className="text-left p-4 font-bold text-gray-400 text-xs">OCF</th>
                    <th className="text-left p-4 font-bold text-gray-400 text-xs">1Y PERF</th>
                    <th className="text-left p-4 font-bold text-gray-400 text-xs">RISK (21y)</th>
                    <th className="text-left p-4 font-bold text-gray-400 text-xs">PROVIDER</th>
                    <th className="text-left p-4 font-bold text-gray-400 text-xs">INCEPTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-800 hover:bg-[#1a1f2e] transition-colors">
                    <td className="p-4">
                      <div className="text-white font-medium">Test4</div>
                      <div className="text-blue-400 text-xs">(View)</div>
                    </td>
                    <td className="p-4 text-white">-</td>
                    <td className="p-4 text-white">-</td>
                    <td className="p-4 text-white">-</td>
                    <td className="p-4 text-green-400">6.185</td>
                    <td className="p-4 text-green-400">7.786</td>
                    <td className="p-4">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                          <path d="M9 11l3 3L22 4" />
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                      </div>
                    </td>
                    <td className="p-4 text-white">10/08/2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Create Custom Portfolio Modal */}
      {showCreatePortfolio && createPortal(
        <div className="fixed inset-0 bg-black/20 backdrop-blur-xl flex items-center justify-center z-50" onClick={() => setShowCreatePortfolio(false)}>
          <div className="bg-[#1e293b] rounded-lg w-[95vw] h-[90vh] overflow-hidden flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="border-b border-gray-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <h2 className="text-xl font-bold text-white">Create Custom Portfolio</h2>
              </div>
              <button onClick={() => setShowCreatePortfolio(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content - Two Column Layout */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Panel */}
              <div className="w-80 bg-[#1a1f2e] border-r border-gray-700 overflow-y-auto p-6">
                {/* Model Portfolio Name */}
                <div className="mb-6">
                  <label className="text-xs font-bold text-gray-400 mb-2 block">MODEL PORTFOLIO NAME</label>
                  <input
                    type="text"
                    defaultValue="Test4"
                    className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Lock Edit Toggle */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-sm text-gray-400">Lock edit to user</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Funds Section */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-gray-400 mb-3">FUNDS</h3>
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search Fund name, ISIN or Keyword(s)"
                      className="w-full bg-[#0f1420] border border-gray-700 rounded pl-10 pr-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded">
                      📦 BULK IMPORT
                    </Button>
                    <Button 
                      onClick={() => setShowAddFundManually(true)}
                      className="flex-1 bg-transparent border border-gray-700 hover:bg-gray-800 text-white text-xs font-bold px-4 py-2 rounded"
                    >
                      + ADD MANUALLY
                    </Button>
                  </div>
                </div>

                {/* CIP Selection */}
                <div>
                  <h3 className="text-xs font-bold text-gray-400 mb-3">CIP SELECTION</h3>
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Select Funds or Portfolios"
                      className="w-full bg-[#0f1420] border border-gray-700 rounded pl-10 pr-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  {/* Fund Selection List */}
                  <div className="space-y-2">
                    {[
                      { name: 'Vanguard LifeStrategy 60% Equity A Acc', checked: false },
                      { name: 'Vanguard LifeStrategy 80% Equity A Acc', checked: false },
                      { name: 'Morningstar Blended - Adventurous Gr', checked: true },
                      { name: 'Morningstar Blended - Cautious Growth', checked: true },
                      { name: 'Morningstar Blended - Moderate Growth', checked: false },
                    ].map((fund, index) => (
                      <label key={index} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-white">
                        <input 
                          type="checkbox" 
                          defaultChecked={fund.checked}
                          className="w-4 h-4 rounded border-gray-600 bg-[#0f1420] text-blue-500 focus:ring-0 focus:ring-offset-0"
                        />
                        <span>{fund.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel */}
              <div className="flex-1 flex flex-col">
                {/* Tabs */}
                <div className="bg-[#1a1f2e] border-b border-gray-700 px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setShowAddPortfolioHistory(true)}
                      className="bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white text-xs font-bold px-4 py-2 rounded"
                    >
                      ADD PORTFOLIO HISTORY
                    </button>
                    <button className="bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white text-xs font-bold px-4 py-2 rounded">
                      PULL FROM SELECTION
                    </button>
                    <button className="bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white text-xs font-bold px-4 py-2 rounded">
                      PUSH TO SELECTION
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="text-gray-400">Total Allocation:</span>{' '}
                      <span className="text-white font-bold">0%</span>
                    </div>
                    <Button className="bg-transparent hover:bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded border border-gray-700 flex items-center gap-2">
                      VIEW
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto">
                  {/* Portfolio History Dates Display */}
                  {portfolioHistoryDates.length > 0 && (
                    <div className="bg-[#1a1f2e] border-b border-gray-700 px-4 py-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {portfolioHistoryDates.map((date, index) => (
                          <div
                            key={index}
                            className="bg-[#3B82F6] text-white text-xs font-medium px-3 py-1.5 rounded flex items-center gap-2"
                          >
                            <span>{format(date, 'dd/MM/yyyy')}</span>
                            <button
                              onClick={() => {
                                setPortfolioHistoryDates(portfolioHistoryDates.filter((_, i) => i !== index));
                              }}
                              className="hover:text-gray-200 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => setShowAddPortfolioHistory(true)}
                          className="bg-transparent border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 text-xs font-medium w-7 h-7 rounded flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <table className="w-full text-sm">
                    <thead className="bg-[#1a1f2e] sticky top-0">
                      <tr className="border-b border-gray-700">
                        <th className="text-left p-4 font-bold text-gray-400 text-xs">FUND</th>
                        <th className="text-left p-4 font-bold text-gray-400 text-xs">ISIN</th>
                        <th className="text-left p-4 font-bold text-gray-400 text-xs">START DATE</th>
                        <th className="text-left p-4 font-bold text-gray-400 text-xs">ALLOCATION</th>
                        <th className="text-left p-4 font-bold text-gray-400 text-xs">DELETE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Vanguard LifeStrategy 60% Equity A Acc', isin: 'GB00BJTYW857', date: '-' },
                        { name: 'Vanguard LifeStrategy 80% Equity A Acc', isin: 'GB00B4NXM151', date: '-' },
                        { name: 'Morningstar Blended - Adventurous Gr', isin: '-', date: '-' },
                        { name: 'Morningstar Blended - Cautious Growth', isin: '-', date: '-' },
                        { name: 'Morningstar Blended - Moderate Growth', isin: '-', date: '-' },
                        { name: '£ Pound Sterling (Zero return)', isin: 'CASHGBP', date: '-' },
                      ].map((fund, index) => (
                        <tr key={index} className="border-b border-gray-800 hover:bg-[#1a1f2e] transition-colors">
                          <td className="p-4 text-white">{fund.name}</td>
                          <td className="p-4 text-blue-400 text-xs">{fund.isin}</td>
                          <td className="p-4 text-gray-400">{fund.date}</td>
                          <td className="p-4">
                            <input
                              type="text"
                              defaultValue="0%"
                              className="w-20 bg-transparent border border-gray-700 rounded px-3 py-1 text-white text-center focus:outline-none focus:border-blue-500"
                            />
                          </td>
                          <td className="p-4">
                            <button className="text-gray-400 hover:text-white">
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

            {/* Modal Footer */}
            <div className="border-t border-gray-700 px-6 py-4 flex items-center justify-between bg-[#1a1f2e]">
              <Button
                onClick={() => setShowCreatePortfolio(false)}
                className="bg-transparent border border-gray-700 hover:bg-gray-800 text-white font-bold px-6 py-2 rounded"
              >
                CANCEL
              </Button>
              <div className="flex items-center gap-3">
                <Button className="bg-transparent border border-gray-700 hover:bg-gray-800 text-white font-bold px-6 py-2 rounded">
                  EXPORT HISTORY (CSV)
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded flex items-center gap-2">
                  SAVE & CLOSE
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Add Fund Manually Modal */}
      {showAddFundManually && createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setShowAddFundManually(false)}>
          <div className="bg-[#111827] rounded-lg w-[700px] max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="border-b border-gray-800 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Add Fund Manually</h2>
              <button onClick={() => setShowAddFundManually(false)} className="text-gray-400 hover:text-white text-2xl">
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by fund name or ISIN..."
                  className="w-full bg-[#0B1120] border border-gray-700 rounded pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="bg-[#0B1120] border border-gray-800 rounded-lg max-h-[400px] overflow-y-auto">
                {availableFunds.map((fund, index) => (
                  <div key={index} className="p-4 border-b border-gray-800 last:border-b-0 hover:bg-[#1a1f2e] transition-colors cursor-pointer">
                    <div className="font-bold text-sm text-white mb-1">{fund.name}</div>
                    <div className="text-xs text-gray-400">ISIN: {fund.isin} • {fund.sector}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <Button className="flex-1 bg-transparent border border-gray-700 hover:bg-gray-800 text-white font-bold px-4 py-2 rounded">
                  CANCEL
                </Button>
                <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded">
                  ADD SELECTED
                </Button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Add Portfolio History Modal */}
      {showAddPortfolioHistory && createPortal(
        <div className="fixed inset-0 bg-black/20 backdrop-blur-xl flex items-center justify-center z-[60]" onClick={() => setShowAddPortfolioHistory(false)}>
          <div className="bg-[#1a1f2e] rounded-lg w-[400px] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <button className="text-blue-400 hover:text-blue-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                </button>
                <h2 className="text-lg font-bold text-white">Add Portfolio History</h2>
              </div>
              <button onClick={() => setShowAddPortfolioHistory(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Mode Selection */}
              <div className="flex items-center gap-4 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isManualMode}
                    onChange={(e) => setIsManualMode(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 bg-[#0B1120] text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">Manual Entry</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!isManualMode}
                    onChange={(e) => setIsManualMode(!e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 bg-[#0B1120] text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-white">Bulk Upload</span>
                </label>
              </div>

              {isManualMode ? (
                <>
                  {/* Portfolio History Dates Display */}
                  {portfolioHistoryDates.length > 0 && (
                    <div className="bg-[#0B1120] border border-gray-700 rounded-lg px-4 py-3 mb-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        {portfolioHistoryDates.map((date, index) => (
                          <div
                            key={index}
                            className="bg-[#3B82F6] text-white text-xs font-medium px-3 py-1.5 rounded flex items-center gap-2"
                          >
                            <span>{format(date, 'dd/MM/yyyy')}</span>
                            <button
                              onClick={() => {
                                setPortfolioHistoryDates(portfolioHistoryDates.filter((_, i) => i !== index));
                              }}
                              className="hover:text-gray-200 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <button
                          className="bg-transparent border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 text-xs font-medium w-7 h-7 rounded flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Date Input */}
                  <div className="mb-4">
                    <label className="text-xs text-gray-400 mb-1 block">Start date or rebalance date</label>
                    <input
                      type="text"
                      value={format(portfolioHistoryDate, 'dd/MM/yyyy')}
                      readOnly
                      className="w-full bg-[#0B1120] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Calendar */}
                  <div className="portfolio-history-calendar mb-4">
                    <DayPicker
                      mode="single"
                      selected={portfolioHistoryDate}
                      onSelect={(date) => date && setPortfolioHistoryDate(date)}
                      className="!m-0"
                      styles={{
                        months: { width: '100%' },
                        month: { width: '100%' },
                      }}
                    />
                  </div>

                  {/* Save Button */}
                  <Button 
                    onClick={() => {
                      const dateExists = portfolioHistoryDates.some(
                        d => d.getTime() === portfolioHistoryDate.getTime()
                      );
                      if (!dateExists) {
                        setPortfolioHistoryDates([...portfolioHistoryDates, portfolioHistoryDate]);
                      }
                      setHasPortfolio(true);
                      setShowAddPortfolioHistory(false);
                    }}
                    className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-2.5 rounded"
                  >
                    SAVE
                  </Button>
                </>
              ) : (
                <>
                  {/* Bulk Upload Mode */}
                  {/* File Upload Area */}
                  <div className="mb-4">
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors cursor-pointer">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-400">CSV files only (max 10MB)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Warning Message */}
                  <div className="mb-4 flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-400 text-xs">i</span>
                    </div>
                    <div className="text-xs">
                      <p className="text-gray-300 mb-1">
                        Please ensure your file follows the correct format.{' '}
                        <a href="#" className="text-blue-400 hover:text-blue-300">Download template</a>
                      </p>
                      <p className="text-red-400">
                        Warning: This will overwrite any existing portfolio history.
                      </p>
                    </div>
                  </div>

                  {/* CSV Format Guidelines */}
                  <div className="bg-[#0B1120] border border-gray-700 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <line x1="9" y1="3" x2="9" y2="21" />
                        <line x1="15" y1="3" x2="15" y2="21" />
                        <line x1="3" y1="9" x2="21" y2="9" />
                        <line x1="3" y1="15" x2="21" y2="15" />
                      </svg>
                      <h3 className="text-xs font-bold text-gray-400">CSV FORMAT GUIDELINES</h3>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500">Col 1:</span>
                        <span className="text-gray-300">As at date (DD/MM/YYYY)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500">Col 2:</span>
                        <span className="text-gray-300">Fund ISIN code</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500">Col 3:</span>
                        <span className="text-gray-300">Weight (%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between gap-3">
                    <Button
                      onClick={() => setShowAddPortfolioHistory(false)}
                      className="flex-1 bg-transparent border-none hover:bg-gray-800 text-gray-400 hover:text-white font-bold py-2.5 rounded"
                    >
                      CANCEL
                    </Button>
                    <Button 
                      onClick={() => {
                        setHasPortfolio(true);
                        setShowAddPortfolioHistory(false);
                      }}
                      className="flex-1 bg-[#374151] hover:bg-[#4B5563] text-white font-bold py-2.5 rounded"
                    >
                      CONTINUE
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Manage Benchmarks Modal */}
      {showManageBenchmarks && createPortal(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[70]" onClick={() => setShowManageBenchmarks(false)}>
          <div className="bg-[#1a1f2e] rounded-lg w-[700px] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="border-b border-gray-700 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Manage Benchmarks</h2>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Select up to 12 benchmarks from a variety of categories, including IA Sector, ABI Sector, Morningstar Categories, ARC, Cash, Inflation<br />
                  and Property. Alternatively, you can add custom fund benchmarks to suit your specific needs. Benchmarks help you evaluate<br />
                  performance and make informed comparisons for your investment strategies.
                </p>
              </div>
              <button onClick={() => setShowManageBenchmarks(false)} className="text-gray-400 hover:text-white text-xl">
                ×
              </button>
            </div>

            {/* Selected Section */}
            <div className="px-6 py-4 border-b border-gray-700">
              <h3 className="text-sm font-bold text-white mb-3">Selected</h3>
              <div className="bg-[#0f1420] rounded-lg p-4 min-h-[60px] flex items-center justify-center">
                {selectedBenchmarks.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">
                    No benchmarks have been selected. Choose from the list below or add a fixed benchmark.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedBenchmarks.map((id) => {
                      const benchmark = benchmarkData.find(b => b.id === id);
                      return (
                        <div key={id} className="bg-[#3B82F6] text-white text-xs px-3 py-1.5 rounded flex items-center gap-2">
                          <span>{benchmark?.name}</span>
                          <button
                            onClick={() => setSelectedBenchmarks(selectedBenchmarks.filter(b => b !== id))}
                            className="hover:text-gray-200"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end gap-4 mt-3">
                <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded">
                  ADD FIXED BENCHMARK
                </Button>
                <button className="text-blue-400 hover:text-blue-300 text-xs">Recent Filters</button>
              </div>
            </div>

            {/* Table Controls */}
            <div className="px-6 py-3 flex items-center justify-end gap-2 border-b border-gray-700">
              <button className="text-gray-400 hover:text-white p-1.5">
                <Search className="w-4 h-4" />
              </button>
              <button className="text-gray-400 hover:text-white p-1.5">
                <Filter className="w-4 h-4" />
              </button>
              <button className="text-gray-400 hover:text-white p-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white p-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0f1420] sticky top-0">
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4 w-12"></th>
                    <th className="text-left p-4 font-bold text-gray-400 text-xs">TYPE</th>
                    <th className="text-left p-4 font-bold text-gray-400 text-xs">NAME</th>
                    <th className="text-right p-4 w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarkData.map((benchmark) => (
                    <tr key={benchmark.id} className="border-b border-gray-800 hover:bg-[#0f1420] transition-colors">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedBenchmarks.includes(benchmark.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedBenchmarks([...selectedBenchmarks, benchmark.id]);
                            } else {
                              setSelectedBenchmarks(selectedBenchmarks.filter(id => id !== benchmark.id));
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-600 bg-[#0B1120] text-blue-500"
                        />
                      </td>
                      <td className="p-4 text-gray-300 text-xs">{benchmark.type}</td>
                      <td className="p-4 text-white">{benchmark.name}</td>
                      <td className="p-4 text-right">
                        <button className="text-gray-400 hover:text-white">
                          ⋮
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="border-t border-gray-700 px-6 py-3 flex items-center justify-end gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Rows per page:</span>
                <select className="bg-[#0f1420] border border-gray-700 rounded px-2 py-1 text-xs text-white">
                  <option>5</option>
                  <option>10</option>
                  <option>25</option>
                </select>
              </div>
              <span className="text-xs text-gray-400">1-5 of 456</span>
              <div className="flex items-center gap-1">
                <button className="text-gray-400 hover:text-white p-1">‹</button>
                <button className="text-gray-400 hover:text-white p-1">›</button>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-700 px-6 py-4 flex items-center justify-between bg-[#0f1420]">
              <Button
                onClick={() => {
                  setSelectedBenchmarks([]);
                  setShowManageBenchmarks(false);
                }}
                className="bg-transparent border border-gray-700 hover:bg-gray-800 text-white font-bold px-6 py-2 rounded"
              >
                CANCEL
              </Button>
              <Button
                onClick={() => setShowManageBenchmarks(false)}
                className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold px-6 py-2 rounded"
              >
                CONFIRM
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* New Case Modal */}
      {showNewCase && createPortal(
        <div className="fixed inset-0 bg-black/20 backdrop-blur-xl flex items-center justify-center z-50 p-4" onClick={() => setShowNewCase(false)}>
          <div className="bg-[#1a2332] rounded-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">New case</h2>
              <button
                onClick={() => setShowNewCase(false)}
                className="text-gray-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setNewCaseTab('NEW CLIENT')}
                  className={`flex-1 py-2 px-4 text-sm font-bold rounded transition-colors ${
                    newCaseTab === 'NEW CLIENT'
                      ? 'bg-[#3B82F6] text-white'
                      : 'bg-[#0f1420] text-gray-400 hover:text-white'
                  }`}
                >
                  NEW CLIENT
                </button>
                <button
                  onClick={() => setNewCaseTab('EXISTING CLIENT')}
                  className={`flex-1 py-2 px-4 text-sm font-bold rounded transition-colors ${
                    newCaseTab === 'EXISTING CLIENT'
                      ? 'bg-[#3B82F6] text-white'
                      : 'bg-[#0f1420] text-gray-400 hover:text-white'
                  }`}
                >
                  EXISTING CLIENT
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {newCaseTab === 'EXISTING CLIENT' ? (
                  <>
                    {/* Select client */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Select client <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={clientSearch}
                          onChange={(e) => setClientSearch(e.target.value)}
                          placeholder="Start typing to search..."
                          className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 pr-10"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      </div>
                    </div>

                    {/* Case name */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Case name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={caseName}
                        onChange={(e) => setCaseName(e.target.value)}
                        placeholder="e.g. Retirement Planning 2024"
                        className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Advice type */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Advice type
                      </label>
                      <div className="relative">
                        <select
                          value={adviceType}
                          onChange={(e) => setAdviceType(e.target.value)}
                          className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                        >
                          <option>Investment</option>
                          <option>Pension</option>
                          <option>Protection</option>
                          <option>Mortgage</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Recommendation type */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Recommendation type
                      </label>
                      <div className="relative">
                        <select
                          value={recommendationType}
                          onChange={(e) => setRecommendationType(e.target.value)}
                          className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                        >
                          <option>Full Advice</option>
                          <option>Limited Advice</option>
                          <option>Guidance</option>
                          <option>Execution Only</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* First name */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        First name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Surname */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Surname <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Date of birth */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Date of birth <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={dateOfBirth ? format(dateOfBirth, 'dd/MM/yyyy') : ''}
                          placeholder="dd/mm/yyyy"
                          readOnly
                          onClick={() => setShowDatePicker(!showDatePicker)}
                          className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 cursor-pointer"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        
                        {showDatePicker && (
                          <div className="absolute z-10 mt-1 bg-[#1e293b] border border-gray-700 rounded-lg shadow-xl">
                            <DayPicker
                              mode="single"
                              selected={dateOfBirth}
                              onSelect={(date) => {
                                setDateOfBirth(date);
                                setShowDatePicker(false);
                              }}
                              className="p-3"
                              styles={{
                                caption: { color: '#fff' },
                                head_cell: { color: '#9ca3af' },
                                cell: { color: '#fff' },
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* NINO */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        NINO
                      </label>
                      <input
                        type="text"
                        value={nino}
                        onChange={(e) => setNino(e.target.value)}
                        className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Phone number */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Email address */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Email address
                      </label>
                      <input
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        className="w-full bg-[#0f1420] border border-gray-700 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 pb-6 flex items-center justify-between gap-3">
              <Button
                onClick={() => setShowNewCase(false)}
                className="bg-[#374151] hover:bg-[#4B5563] text-white font-bold px-6 py-2 rounded"
              >
                {newCaseTab === 'NEW CLIENT' ? 'CANCEL' : 'BACK'}
              </Button>
              <Button
                onClick={() => {
                  // Handle create case logic here
                  setShowNewCase(false);
                }}
                className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold px-8 py-2 rounded"
              >
                {newCaseTab === 'NEW CLIENT' ? 'NEXT' : 'CREATE CASE'}
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}