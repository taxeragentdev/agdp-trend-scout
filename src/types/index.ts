export interface AgentData {
  rank: number;
  name: string;
  score: number;
  timestamp: string;
  agentId?: number;
  tokenAddress?: string;
  totalRevenue?: number;
  successRate?: number;
  uniqueBuyerCount?: number;
}

export interface LeaderboardSnapshot {
  timestamp: string;
  data: AgentData[];
}

export interface AgentComparison {
  name: string;
  previousRank: number;
  currentRank: number;
  rankChange: number;
  previousScore: number;
  currentScore: number;
  scoreChange: number;
  scoreChangePercent: number;
}

export interface AnalysisResult {
  timestamp: string;
  highMomentum: AgentComparison[];
  breakouts: AgentComparison[];
  elitePerformers: AgentComparison[];
  allChanges: AgentComparison[];
}

export interface AgentConfig {
  agdpApiUrl: string;
  agdpApiEpoch: number;
  apiPageSize: number;
  scrapeIntervalMinutes: number;
  highMomentumRankThreshold: number;
  breakoutFromRank: number;
  breakoutToRank: number;
  elitePerformanceScoreThreshold: number;
  telegramBotToken?: string;
  telegramChatId?: string;
  baseRpcUrl: string;
  walletPrivateKey?: string;
  contractAddress?: string;
  agentName: string;
  agentVersion: string;
  cognitiveLoopEnabled: boolean;
}

export interface ACPGoal {
  id: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
}

export interface ACPTask {
  id: string;
  goalId: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startedAt?: string;
  completedAt?: string;
  error?: string;
}

export interface ACPWalletState {
  address: string;
  balance: string;
  network: string;
  lastSyncedAt: string;
}
