import fs from 'fs/promises';
import path from 'path';
import { LeaderboardSnapshot, AgentData } from '../types/index.js';
import { CURRENT_RANKS_FILE, PREVIOUS_RANKS_FILE, DATA_DIR } from '../config/index.js';

export class StateManager {
  async ensureDataDirectory(): Promise<void> {
    try {
      await fs.access(DATA_DIR);
    } catch {
      await fs.mkdir(DATA_DIR, { recursive: true });
      console.log(`✓ Created data directory: ${DATA_DIR}`);
    }
  }

  async saveCurrentSnapshot(snapshot: LeaderboardSnapshot): Promise<void> {
    await this.ensureDataDirectory();

    try {
      const existingCurrent = await this.loadCurrentSnapshot();
      if (existingCurrent) {
        await fs.writeFile(PREVIOUS_RANKS_FILE, JSON.stringify(existingCurrent, null, 2), 'utf-8');
        console.log('✓ Moved current snapshot to previous');
      }
    } catch (error) {
    }

    await fs.writeFile(CURRENT_RANKS_FILE, JSON.stringify(snapshot, null, 2), 'utf-8');
    console.log(`✓ Saved current snapshot with ${snapshot.data.length} agents`);
  }

  async loadCurrentSnapshot(): Promise<LeaderboardSnapshot | null> {
    try {
      const data = await fs.readFile(CURRENT_RANKS_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  async loadPreviousSnapshot(): Promise<LeaderboardSnapshot | null> {
    try {
      const data = await fs.readFile(PREVIOUS_RANKS_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  async getAgentByName(name: string, snapshot: LeaderboardSnapshot): Promise<AgentData | null> {
    return snapshot.data.find(agent => agent.name === name) || null;
  }

  async getAllAgentNames(snapshot: LeaderboardSnapshot): Promise<string[]> {
    return snapshot.data.map(agent => agent.name);
  }

  async saveAnalysisLog(analysis: any): Promise<void> {
    await this.ensureDataDirectory();
    
    const logFileName = `${DATA_DIR}/analysis_${Date.now()}.json`;
    await fs.writeFile(logFileName, JSON.stringify(analysis, null, 2), 'utf-8');
    console.log(`✓ Analysis log saved: ${logFileName}`);
  }

  async cleanOldLogs(daysToKeep: number = 7): Promise<void> {
    try {
      const files = await fs.readdir(DATA_DIR);
      const now = Date.now();
      const maxAge = daysToKeep * 24 * 60 * 60 * 1000;

      for (const file of files) {
        if (file.startsWith('analysis_')) {
          const filePath = path.join(DATA_DIR, file);
          const stats = await fs.stat(filePath);
          
          if (now - stats.mtimeMs > maxAge) {
            await fs.unlink(filePath);
            console.log(`✓ Deleted old log: ${file}`);
          }
        }
      }
    } catch (error) {
      console.error('✗ Error cleaning old logs:', error);
    }
  }
}
