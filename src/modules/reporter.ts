import TelegramBot from 'node-telegram-bot-api';
import chalk from 'chalk';
import { config } from '../config/index.js';

export class Reporter {
  private telegramBot: TelegramBot | null = null;

  constructor() {
    if (config.telegramBotToken && config.telegramChatId) {
      try {
        this.telegramBot = new TelegramBot(config.telegramBotToken, { polling: false });
        console.log(chalk.green('✓ Telegram bot initialized'));
      } catch (error) {
        console.warn(chalk.yellow('⚠ Failed to initialize Telegram bot:'), error);
      }
    }
  }

  reportToConsole(message: string): void {
    console.log('\n' + message + '\n');
  }

  async reportToTelegram(message: string): Promise<void> {
    if (!this.telegramBot || !config.telegramChatId) {
      console.log(chalk.dim('ℹ️  Telegram reporting disabled (no credentials)'));
      return;
    }

    try {
      await this.telegramBot.sendMessage(config.telegramChatId, message, {
        parse_mode: 'Markdown'
      });
      console.log(chalk.green('✓ Report sent to Telegram'));
    } catch (error) {
      console.error(chalk.red('✗ Failed to send Telegram message:'), error);
    }
  }

  logInfo(message: string): void {
    console.log(chalk.blue('ℹ️ '), message);
  }

  logSuccess(message: string): void {
    console.log(chalk.green('✓'), message);
  }

  logWarning(message: string): void {
    console.log(chalk.yellow('⚠'), message);
  }

  logError(message: string, error?: any): void {
    console.error(chalk.red('✗'), message);
    if (error) {
      console.error(chalk.red(error));
    }
  }

  logAgentStatus(status: string, details?: string): void {
    const timestamp = new Date().toLocaleTimeString();
    console.log(
      chalk.cyan(`[${timestamp}]`),
      chalk.bold(config.agentName),
      chalk.magenta('→'),
      status,
      details ? chalk.dim(`(${details})`) : ''
    );
  }

  displayBanner(): void {
    console.log(chalk.cyan('\n╔════════════════════════════════════════════════════════╗'));
    console.log(chalk.cyan('║') + chalk.bold.white('      AGDP TREND SCOUT - Virtuals ACP Agent        ') + chalk.cyan('║'));
    console.log(chalk.cyan('╚════════════════════════════════════════════════════════╝'));
    console.log(chalk.dim(`  Version: ${config.agentVersion}`));
    console.log(chalk.dim(`  Agent: ${config.agentName}`));
    console.log(chalk.dim(`  Cognitive Loop: ${config.cognitiveLoopEnabled ? 'Enabled' : 'Disabled'}`));
    console.log(chalk.cyan('─────────────────────────────────────────────────────────\n'));
  }
}
