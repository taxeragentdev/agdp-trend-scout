import dotenv from 'dotenv';
import { AgentConfig } from '../types/index.js';

dotenv.config();

export const config: AgentConfig = {
  agdpApiUrl: process.env.AGDP_API_URL || 'https://api.virtuals.io/api/agdp-leaderboard-epochs',
  agdpApiEpoch: parseInt(process.env.AGDP_API_EPOCH || '4', 10),
  apiPageSize: parseInt(process.env.API_PAGE_SIZE || '1000', 10),
  scrapeIntervalMinutes: parseInt(process.env.SCRAPE_INTERVAL_MINUTES || '30', 10),
  highMomentumRankThreshold: parseInt(process.env.HIGH_MOMENTUM_RANK_THRESHOLD || '20', 10),
  breakoutFromRank: parseInt(process.env.BREAKOUT_FROM_RANK || '100', 10),
  breakoutToRank: parseInt(process.env.BREAKOUT_TO_RANK || '50', 10),
  elitePerformanceScoreThreshold: parseInt(process.env.ELITE_PERFORMANCE_SCORE_THRESHOLD || '50', 10),
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  telegramChatId: process.env.TELEGRAM_CHAT_ID,
  baseRpcUrl: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
  walletPrivateKey: process.env.WALLET_PRIVATE_KEY,
  contractAddress: process.env.CONTRACT_ADDRESS,
  agentName: process.env.AGENT_NAME || 'AGDP-Trend-Scout',
  agentVersion: process.env.AGENT_VERSION || '1.0.0',
  cognitiveLoopEnabled: process.env.COGNITIVE_LOOP_ENABLED === 'true',
};

export const DATA_DIR = './data';
export const LOGS_DIR = './logs';
export const CURRENT_RANKS_FILE = `${DATA_DIR}/current_ranks.json`;
export const PREVIOUS_RANKS_FILE = `${DATA_DIR}/previous_ranks.json`;
