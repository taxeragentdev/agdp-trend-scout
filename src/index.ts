import { DataFetcher } from './modules/dataFetcher.js';
import { StateManager } from './modules/stateManager.js';
import { VelocityEngine } from './modules/velocityEngine.js';
import { Reporter } from './modules/reporter.js';
import { ACPAgent } from './modules/acpAgent.js';
import { APIServer } from './modules/apiServer.js';
import { config } from './config/index.js';

class AGDPTrendScout {
  private dataFetcher: DataFetcher;
  private stateManager: StateManager;
  private velocityEngine: VelocityEngine;
  private reporter: Reporter;
  private acpAgent: ACPAgent;
  private apiServer: APIServer;
  private isRunning: boolean = false;
  private intervalId: NodeJS.Timeout | null = null;

  constructor() {
    this.dataFetcher = new DataFetcher();
    this.stateManager = new StateManager();
    this.velocityEngine = new VelocityEngine();
    this.reporter = new Reporter();
    this.acpAgent = new ACPAgent();
    this.apiServer = new APIServer(parseInt(process.env.PORT || '3000', 10));
  }

  async initialize(): Promise<void> {
    this.reporter.displayBanner();
    this.reporter.logInfo('Initializing AGDP Trend Scout...');

    await this.apiServer.start();

    await this.dataFetcher.initialize();
    await this.stateManager.ensureDataDirectory();

    const mainGoal = this.acpAgent.createGoal(
      'Monitor AGDP leaderboard and analyze agent velocity trends',
      'high'
    );

    this.acpAgent.createTask(mainGoal.id, 'Fetch leaderboard data from AGDP.io');
    this.acpAgent.createTask(mainGoal.id, 'Analyze ranking and score changes');
    this.acpAgent.createTask(mainGoal.id, 'Generate and distribute reports');

    const walletState = await this.acpAgent.getWalletState();
    if (walletState) {
      this.reporter.logSuccess(`Wallet connected: ${walletState.address}`);
      this.reporter.logInfo(`Balance: ${walletState.balance} ETH on ${walletState.network}`);
    }

    this.reporter.logSuccess('Initialization complete');
  }

  async performScan(): Promise<void> {
    this.reporter.logAgentStatus('SCAN_STARTED', 'Fetching leaderboard data');

    try {
      const currentSnapshot = await this.dataFetcher.fetchLeaderboard();
      
      this.apiServer.updateLastScan(currentSnapshot);
      
      if (currentSnapshot.data.length === 0) {
        this.reporter.logWarning('No data fetched from leaderboard. Skipping analysis.');
        return;
      }

      const previousSnapshot = await this.stateManager.loadPreviousSnapshot();

      if (previousSnapshot) {
        this.reporter.logInfo('Previous snapshot found. Performing velocity analysis...');
        
        const analysis = this.velocityEngine.analyzeChanges(previousSnapshot, currentSnapshot);
        
        const consoleReport = this.velocityEngine.generateSummary(analysis);
        this.reporter.reportToConsole(consoleReport);

        const telegramMessage = this.velocityEngine.generateTelegramMessage(analysis);
        await this.reporter.reportToTelegram(telegramMessage);

        await this.stateManager.saveAnalysisLog(analysis);
      } else {
        this.reporter.logInfo('First scan detected. Establishing baseline...');
      }

      await this.stateManager.saveCurrentSnapshot(currentSnapshot);
      this.reporter.logAgentStatus('SCAN_COMPLETED', `${currentSnapshot.data.length} agents tracked`);

    } catch (error) {
      this.reporter.logError('Scan failed', error);
      throw error;
    }
  }

  async startCognitiveLoop(): Promise<void> {
    if (!config.cognitiveLoopEnabled) {
      this.reporter.logWarning('Cognitive loop is disabled in configuration');
      return;
    }

    this.isRunning = true;
    this.apiServer.setRunningStatus(true);
    this.reporter.logSuccess(`Starting cognitive loop (interval: ${config.scrapeIntervalMinutes} minutes)`);

    await this.performScan();

    this.intervalId = setInterval(async () => {
      if (this.isRunning) {
        try {
          await this.performScan();
          await this.stateManager.cleanOldLogs(7);
        } catch (error) {
          this.reporter.logError('Error in cognitive loop iteration', error);
        }
      }
    }, config.scrapeIntervalMinutes * 60 * 1000);
  }

  async stopCognitiveLoop(): Promise<void> {
    this.isRunning = false;
    this.apiServer.setRunningStatus(false);
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    await this.dataFetcher.close();
    this.reporter.logSuccess('Cognitive loop stopped');
  }

  async runOnce(): Promise<void> {
    this.reporter.logInfo('Running single scan...');
    await this.performScan();
    await this.dataFetcher.close();
    this.reporter.logSuccess('Single scan completed');
  }
}

async function main() {
  const scout = new AGDPTrendScout();

  try {
    await scout.initialize();

    const args = process.argv.slice(2);
    const runOnce = args.includes('--once');

    if (runOnce) {
      await scout.runOnce();
    } else {
      await scout.startCognitiveLoop();

      process.on('SIGINT', async () => {
        console.log('\n\nReceived SIGINT. Shutting down gracefully...');
        await scout.stopCognitiveLoop();
        process.exit(0);
      });

      process.on('SIGTERM', async () => {
        console.log('\n\nReceived SIGTERM. Shutting down gracefully...');
        await scout.stopCognitiveLoop();
        process.exit(0);
      });
    }

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
