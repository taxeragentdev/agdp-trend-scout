import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from '../config/index.js';

export class APIServer {
  private app: express.Application;
  private port: number;
  private lastScanTime: string = '';
  private lastScanData: any = null;
  private isRunning: boolean = false;

  constructor(port: number = 3000) {
    this.app = express();
    this.port = port;
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    this.app.get('/', (_req: Request, res: Response) => {
      res.json({
        name: 'AGDP Trend Scout',
        version: '1.0.0',
        description: 'Virtuals ACP Agent - AGDP Leaderboard Trend Analysis',
        status: 'online',
        endpoints: {
          health: '/health',
          status: '/status',
          metrics: '/metrics',
          info: '/info'
        }
      });
    });

    this.app.get('/health', (_req: Request, res: Response) => {
      res.json({
        status: 'ok',
        agent: config.agentName,
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      });
    });

    this.app.get('/status', (_req: Request, res: Response) => {
      res.json({
        isRunning: this.isRunning,
        cognitiveLoopEnabled: config.cognitiveLoopEnabled,
        lastScanTime: this.lastScanTime || 'Not scanned yet',
        agentsTracked: this.lastScanData?.data?.length || 0,
        scrapeInterval: `${config.scrapeIntervalMinutes} minutes`,
        timestamp: new Date().toISOString()
      });
    });

    this.app.get('/metrics', (_req: Request, res: Response) => {
      res.json({
        thresholds: {
          highMomentum: config.highMomentumRankThreshold,
          breakoutFrom: config.breakoutFromRank,
          breakoutTo: config.breakoutToRank,
          elitePerformance: `${config.elitePerformanceScoreThreshold}%`
        },
        integrations: {
          telegram: !!(config.telegramBotToken && config.telegramChatId),
          blockchain: !!config.walletPrivateKey
        },
        memory: {
          heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
          heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`
        },
        timestamp: new Date().toISOString()
      });
    });

    this.app.get('/info', (_req: Request, res: Response) => {
      res.json({
        agent: {
          name: config.agentName,
          version: config.agentVersion,
          type: 'OpenClaw ACP Agent',
          category: 'Analytics & Data Intelligence'
        },
        capabilities: [
          'AGDP.io leaderboard monitoring',
          'Velocity trend analysis',
          'High momentum detection',
          'Breakout agent identification',
          'Elite performance tracking',
          'Real-time Telegram notifications'
        ],
        technology: {
          framework: 'OpenClaw ACP',
          language: 'TypeScript',
          blockchain: 'Base Chain',
          scraping: 'Playwright'
        },
        contact: {
          telegram: config.telegramBotToken ? 'Enabled' : 'Disabled',
          blockchain: config.walletPrivateKey ? 'Enabled' : 'Disabled'
        },
        timestamp: new Date().toISOString()
      });
    });

    this.app.get('/ping', (_req: Request, res: Response) => {
      res.send('pong');
    });
  }

  updateLastScan(scanData: any): void {
    this.lastScanTime = new Date().toISOString();
    this.lastScanData = scanData;
  }

  setRunningStatus(status: boolean): void {
    this.isRunning = status;
  }

  start(): Promise<void> {
    return new Promise((resolve) => {
      this.app.listen(this.port, () => {
        console.log(`✓ API Server listening on port ${this.port}`);
        console.log(`  Health Check: http://localhost:${this.port}/health`);
        console.log(`  Status: http://localhost:${this.port}/status`);
        resolve();
      });
    });
  }

  getApp(): express.Application {
    return this.app;
  }
}
