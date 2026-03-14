import { LeaderboardSnapshot, AgentData } from '../types/index.js';
import { config } from '../config/index.js';

interface VirtualsAPIResponse {
  data: Array<{
    agentId: number;
    agentName: string;
    agentWalletAddress: string;
    tokenAddress: string;
    profilePic: string;
    tag: string;
    cluster: string;
    category: string;
    role: string;
    symbol: string;
    twitterHandle: string;
    hasGraduated: boolean;
    rating: number | null;
    successRate: number;
    successfulJobCount: number;
    uniqueBuyerCount: number;
    isVirtualAgent: boolean;
    virtualAgentId: string;
    totalRevenue: number;
    ownerAddress: string;
    rank: number;
    prizePoolPercentage: number;
    agentScore: number;
    virtual: any;
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export class DataFetcher {
  private currentEpoch: number;

  constructor() {
    this.currentEpoch = config.agdpApiEpoch;
  }

  async initialize(): Promise<void> {
    console.log('✓ DataFetcher initialized (API-based)');
    console.log(`  Current Epoch: ${this.currentEpoch}`);
    console.log(`  API Base URL: ${config.agdpApiUrl}`);
  }

  async fetchLeaderboard(): Promise<LeaderboardSnapshot> {
    try {
      const url = `${config.agdpApiUrl}/${this.currentEpoch}/ranking?pagination[pageSize]=${config.apiPageSize}`;
      console.log(`Fetching leaderboard from API: ${url}`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'AGDP-Trend-Scout/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
      }

      const apiData: VirtualsAPIResponse = await response.json();

      if (!apiData.data || !Array.isArray(apiData.data)) {
        throw new Error('Invalid API response structure');
      }

      console.log(`✓ API Response received:`);
      console.log(`  Total agents: ${apiData.meta.pagination.total}`);
      console.log(`  Fetched: ${apiData.data.length} agents`);
      console.log(`  Epoch: ${this.currentEpoch}`);

      const agents: AgentData[] = apiData.data.map(agent => ({
        rank: agent.rank,
        name: agent.agentName,
        score: agent.agentScore,
        timestamp: new Date().toISOString(),
        agentId: agent.agentId,
        tokenAddress: agent.tokenAddress,
        totalRevenue: agent.totalRevenue,
        successRate: agent.successRate,
        uniqueBuyerCount: agent.uniqueBuyerCount
      }));

      agents.sort((a, b) => a.rank - b.rank);

      console.log(`✓ Processed ${agents.length} agents successfully`);
      console.log(`  Rank range: #${agents[0]?.rank} to #${agents[agents.length - 1]?.rank}`);

      return {
        timestamp: new Date().toISOString(),
        data: agents
      };

    } catch (error) {
      console.error('✗ Error fetching leaderboard from API:', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    console.log('✓ DataFetcher closed (no resources to cleanup for API-based fetcher)');
  }

  getCurrentEpoch(): number {
    return this.currentEpoch;
  }

  setEpoch(epoch: number): void {
    if (epoch < 1) {
      throw new Error('Epoch must be greater than 0');
    }
    this.currentEpoch = epoch;
    console.log(`✓ Epoch updated to: ${this.currentEpoch}`);
  }

  incrementEpoch(): void {
    this.currentEpoch++;
    console.log(`✓ Epoch incremented to: ${this.currentEpoch}`);
  }

  decrementEpoch(): void {
    if (this.currentEpoch > 1) {
      this.currentEpoch--;
      console.log(`✓ Epoch decremented to: ${this.currentEpoch}`);
    } else {
      console.warn('⚠ Cannot decrement epoch below 1');
    }
  }
}
