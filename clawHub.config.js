import { config } from 'dotenv';

config();

export default {
  agent: {
    name: 'AGDP Trend Scout',
    description: 'AI-powered velocity tracker for AGDP leaderboard analysis',
    version: '1.0.0',
    type: 'analytics',
  },
  
  server: {
    host: process.env.RAILWAY_STATIC_URL || 'agdp-trend-scout.up.railway.app',
    port: process.env.PORT || 3000,
    protocol: 'https',
  },
  
  acp: {
    enabled: true,
    apiKey: process.env.ACP_API_KEY || 'acp-e3c00d5d96713BD2137dc',
    walletAddress: process.env.AGENT_WALLET_ADDRESS || '0x356a61D91cHUBA7F7632586E58CU569eb13A5197',
    endpoints: {
      health: '/health',
      status: '/status',
      info: '/info',
      metrics: '/metrics',
      capabilities: '/acp/capabilities',
      agent: '/acp/agent',
      triggerScan: '/acp/trigger-scan',
    },
  },
  
  features: {
    cognitiveLoop: process.env.COGNITIVE_LOOP_ENABLED === 'true',
    autonomous: true,
    monitoring: true,
    analytics: true,
    notifications: Boolean(process.env.TELEGRAM_BOT_TOKEN),
    blockchain: Boolean(process.env.WALLET_PRIVATE_KEY),
  },
  
  network: {
    chain: 'base',
    rpcUrl: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
  },
};
