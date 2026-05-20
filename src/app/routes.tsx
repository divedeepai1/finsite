import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Dashboard from "./Dashboard";
import Markets from "./Markets";
import AskAI from "./AskAI";
import DocumentSummarizer from "./DocumentSummarizer";
import DocumentUpload from "./DocumentUpload";
import HouseView from "./HouseView";
import InvestmentThesis from "./InvestmentThesis";
import Compare from "./Compare";
import HistoricalAnalysis from "./HistoricalAnalysis";
import SettingsNew from "./SettingsNew";
import UserManagement from "./UserManagement";
import Branding from "./Branding";
import CaseManagement from "./CaseManagement";
import Insights from "./Insights";
import Documents from "./Documents";
import FundFilter from "./FundFilter";
import PortfolioFilter from "./PortfolioFilter";
import AskAIChatOutput from "./AskAIChatOutput";
import CompareOutput from "./CompareOutput";
import CampaignJourneys from "./CampaignJourneys";
import Radar from "./Radar";
import Meeting from "./Meeting";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "markets",
        Component: Markets,
      },
      {
        path: "insights",
        Component: Insights,
      },
      {
        path: "radar",
        Component: Radar,
      },
      {
        path: "meeting",
        Component: Meeting,
      },
      {
        path: "ask-ai",
        Component: AskAI,
      },
      {
        path: "document-summarizer",
        Component: DocumentSummarizer,
      },
      {
        path: "document-upload",
        Component: DocumentUpload,
      },
      {
        path: "fund-filter",
        Component: FundFilter,
      },
      {
        path: "portfolio-filter",
        Component: PortfolioFilter,
      },
      {
        path: "house-view",
        Component: HouseView,
      },
      {
        path: "investment-thesis",
        Component: InvestmentThesis,
      },
      {
        path: "compare",
        Component: Compare,
      },
      {
        path: "historical-analysis",
        Component: HistoricalAnalysis,
      },
      {
        path: "settings",
        Component: SettingsNew,
      },
      {
        path: "user-management",
        Component: UserManagement,
      },
      {
        path: "branding",
        Component: Branding,
      },
      {
        path: "case-management",
        Component: CaseManagement,
      },
      {
        path: "campaign-journeys",
        Component: CampaignJourneys,
      },
      {
        path: "documents",
        Component: Documents,
      },
      {
        path: "ask-ai-chat-output",
        Component: AskAIChatOutput,
      },
      {
        path: "compare-output",
        Component: CompareOutput,
      },
    ],
  },
]);