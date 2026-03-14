import { ethers } from 'ethers';
import { ACPGoal, ACPTask, ACPWalletState } from '../types/index.js';
import { config } from '../config/index.js';

export class ACPAgent {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet | null = null;
  private goals: Map<string, ACPGoal> = new Map();
  private tasks: Map<string, ACPTask> = new Map();

  constructor() {
    this.provider = new ethers.JsonRpcProvider(config.baseRpcUrl);
    
    if (config.walletPrivateKey) {
      try {
        this.wallet = new ethers.Wallet(config.walletPrivateKey, this.provider);
        console.log(`✓ Wallet initialized: ${this.wallet.address}`);
      } catch (error) {
        console.warn('⚠ Failed to initialize wallet (invalid private key)');
      }
    } else {
      console.log('ℹ️  Running in wallet-less mode (configure WALLET_PRIVATE_KEY for full ACP features)');
    }
  }

  createGoal(description: string, priority: 'high' | 'medium' | 'low' = 'medium'): ACPGoal {
    const goal: ACPGoal = {
      id: `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      description,
      priority,
      status: 'active',
      createdAt: new Date().toISOString()
    };

    this.goals.set(goal.id, goal);
    console.log(`✓ Goal created: ${goal.id} - ${description}`);
    return goal;
  }

  createTask(goalId: string, description: string): ACPTask {
    const goal = this.goals.get(goalId);
    if (!goal) {
      throw new Error(`Goal not found: ${goalId}`);
    }

    const task: ACPTask = {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      goalId,
      description,
      status: 'pending'
    };

    this.tasks.set(task.id, task);
    console.log(`✓ Task created: ${task.id} - ${description}`);
    return task;
  }

  startTask(taskId: string): void {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error(`Task not found: ${taskId}`);
    }

    task.status = 'in_progress';
    task.startedAt = new Date().toISOString();
    console.log(`→ Task started: ${taskId}`);
  }

  completeTask(taskId: string): void {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error(`Task not found: ${taskId}`);
    }

    task.status = 'completed';
    task.completedAt = new Date().toISOString();
    console.log(`✓ Task completed: ${taskId}`);

    this.checkGoalCompletion(task.goalId);
  }

  failTask(taskId: string, error: string): void {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error(`Task not found: ${taskId}`);
    }

    task.status = 'failed';
    task.error = error;
    console.error(`✗ Task failed: ${taskId} - ${error}`);
  }

  private checkGoalCompletion(goalId: string): void {
    const goalTasks = Array.from(this.tasks.values()).filter(t => t.goalId === goalId);
    const allCompleted = goalTasks.every(t => t.status === 'completed');

    if (allCompleted && goalTasks.length > 0) {
      const goal = this.goals.get(goalId);
      if (goal) {
        goal.status = 'completed';
        console.log(`✓ Goal completed: ${goalId}`);
      }
    }
  }

  getActiveGoals(): ACPGoal[] {
    return Array.from(this.goals.values()).filter(g => g.status === 'active');
  }

  getPendingTasks(): ACPTask[] {
    return Array.from(this.tasks.values()).filter(t => t.status === 'pending');
  }

  async getWalletState(): Promise<ACPWalletState | null> {
    if (!this.wallet) {
      return null;
    }

    try {
      const balance = await this.provider.getBalance(this.wallet.address);
      const network = await this.provider.getNetwork();

      return {
        address: this.wallet.address,
        balance: ethers.formatEther(balance),
        network: network.name,
        lastSyncedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('✗ Failed to get wallet state:', error);
      return null;
    }
  }

  async executeTransaction(to: string, value: string): Promise<string | null> {
    if (!this.wallet) {
      console.error('✗ Wallet not configured');
      return null;
    }

    try {
      console.log(`→ Preparing transaction to ${to}...`);
      
      const tx = await this.wallet.sendTransaction({
        to,
        value: ethers.parseEther(value)
      });

      console.log(`→ Transaction sent: ${tx.hash}`);
      const receipt = await tx.wait();
      console.log(`✓ Transaction confirmed: ${receipt?.hash}`);

      return receipt?.hash || null;
    } catch (error) {
      console.error('✗ Transaction failed:', error);
      return null;
    }
  }

  displayAgentStatus(): void {
    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║              ACP AGENT STATUS                          ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log(`  Active Goals: ${this.getActiveGoals().length}`);
    console.log(`  Pending Tasks: ${this.getPendingTasks().length}`);
    console.log(`  Wallet: ${this.wallet ? this.wallet.address : 'Not configured'}`);
    console.log('────────────────────────────────────────────────────────\n');
  }
}
