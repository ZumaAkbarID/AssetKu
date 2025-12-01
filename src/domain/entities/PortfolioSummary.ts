export interface PortfolioSummary {
  totalValue: number;
  totalPnL: number;
  totalPnLPercent: number;
  bestPerformer?: {
    symbol: string;
    pnlPercent: number;
  };
  worstPerformer?: {
    symbol: string;
    pnlPercent: number;
  };
}
