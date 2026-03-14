import { DataFetcher } from './modules/dataFetcher.js';

interface AgentData {
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

async function testAPIFetcher() {
  console.log('\n=== AGDP API Test Script ===\n');
  
  const fetcher = new DataFetcher();
  
  try {
    await fetcher.initialize();
    
    console.log('\nFetching current epoch data...');
    const snapshot = await fetcher.fetchLeaderboard();
    
    console.log('\n=== Test Results ===');
    console.log(`Total agents fetched: ${snapshot.data.length}`);
    console.log(`Timestamp: ${snapshot.timestamp}`);
    
    if (snapshot.data.length > 0) {
      console.log('\n--- Top 10 Agents ---');
      snapshot.data.slice(0, 10).forEach((agent: AgentData) => {
        console.log(`#${agent.rank} - ${agent.name}`);
        console.log(`  Score: ${agent.score.toFixed(2)}`);
        console.log(`  Revenue: $${agent.totalRevenue?.toFixed(2) || 'N/A'}`);
        console.log(`  Success Rate: ${agent.successRate?.toFixed(2) || 'N/A'}%`);
        console.log(`  Unique Buyers: ${agent.uniqueBuyerCount || 'N/A'}`);
        console.log('');
      });
    }
    
    console.log('\n--- Epoch Management Test ---');
    console.log(`Current Epoch: ${fetcher.getCurrentEpoch()}`);
    
    fetcher.incrementEpoch();
    console.log(`After increment: ${fetcher.getCurrentEpoch()}`);
    
    fetcher.decrementEpoch();
    console.log(`After decrement: ${fetcher.getCurrentEpoch()}`);
    
    console.log('\n✓ API Test completed successfully!');
    
  } catch (error) {
    console.error('✗ Test failed:', error);
    process.exit(1);
  } finally {
    await fetcher.close();
  }
}

testAPIFetcher();
