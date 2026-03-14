import { LeaderboardSnapshot, AgentComparison, AnalysisResult } from '../types/index.js';
import { config } from '../config/index.js';

export class VelocityEngine {
  analyzeChanges(previous: LeaderboardSnapshot, current: LeaderboardSnapshot): AnalysisResult {
    const comparisons: AgentComparison[] = [];
    const previousMap = new Map(previous.data.map(agent => [agent.name, agent]));

    for (const currentAgent of current.data) {
      const previousAgent = previousMap.get(currentAgent.name);

      if (previousAgent) {
        const rankChange = previousAgent.rank - currentAgent.rank;
        const scoreChange = currentAgent.score - previousAgent.score;
        const scoreChangePercent = previousAgent.score > 0 
          ? (scoreChange / previousAgent.score) * 100 
          : 0;

        comparisons.push({
          name: currentAgent.name,
          previousRank: previousAgent.rank,
          currentRank: currentAgent.rank,
          rankChange,
          previousScore: previousAgent.score,
          currentScore: currentAgent.score,
          scoreChange,
          scoreChangePercent
        });
      }
    }

    const highMomentum = this.detectHighMomentum(comparisons);
    const breakouts = this.detectBreakouts(comparisons);
    const elitePerformers = this.detectElitePerformers(comparisons);

    return {
      timestamp: new Date().toISOString(),
      highMomentum,
      breakouts,
      elitePerformers,
      allChanges: comparisons
    };
  }

  private detectHighMomentum(comparisons: AgentComparison[]): AgentComparison[] {
    return comparisons.filter(comp => 
      comp.rankChange > config.highMomentumRankThreshold
    ).sort((a, b) => b.rankChange - a.rankChange);
  }

  private detectBreakouts(comparisons: AgentComparison[]): AgentComparison[] {
    return comparisons.filter(comp => 
      comp.previousRank > config.breakoutFromRank && 
      comp.currentRank <= config.breakoutToRank
    ).sort((a, b) => b.rankChange - a.rankChange);
  }

  private detectElitePerformers(comparisons: AgentComparison[]): AgentComparison[] {
    return comparisons.filter(comp => 
      comp.scoreChangePercent > config.elitePerformanceScoreThreshold
    ).sort((a, b) => b.scoreChangePercent - a.scoreChangePercent);
  }

  generateSummary(analysis: AnalysisResult): string {
    const lines: string[] = [];
    
    lines.push('═══════════════════════════════════════════════════════');
    lines.push('  🔍 AGDP TREND SCOUT - VELOCITY ANALYSIS REPORT');
    lines.push('═══════════════════════════════════════════════════════');
    lines.push(`  Timestamp: ${new Date(analysis.timestamp).toLocaleString()}`);
    lines.push(`  Total Changes Detected: ${analysis.allChanges.length}`);
    lines.push('');

    if (analysis.highMomentum.length > 0) {
      lines.push('🚀 HIGH MOMENTUM AGENTS:');
      lines.push('───────────────────────────────────────────────────────');
      analysis.highMomentum.forEach((agent, idx) => {
        lines.push(`  ${idx + 1}. ${agent.name}`);
        lines.push(`     Rank: ${agent.previousRank} → ${agent.currentRank} (↑${agent.rankChange})`);
        lines.push(`     Score: ${agent.previousScore.toFixed(2)} → ${agent.currentScore.toFixed(2)} (+${agent.scoreChange.toFixed(2)})`);
        lines.push('');
      });
    }

    if (analysis.breakouts.length > 0) {
      lines.push('💥 BREAKOUT AGENTS:');
      lines.push('───────────────────────────────────────────────────────');
      analysis.breakouts.forEach((agent, idx) => {
        lines.push(`  ${idx + 1}. ${agent.name}`);
        lines.push(`     Rank: ${agent.previousRank} → ${agent.currentRank} (↑${agent.rankChange})`);
        lines.push(`     Score: ${agent.previousScore.toFixed(2)} → ${agent.currentScore.toFixed(2)}`);
        lines.push('');
      });
    }

    if (analysis.elitePerformers.length > 0) {
      lines.push('⭐ ELITE PERFORMANCE (Score Growth >50%):');
      lines.push('───────────────────────────────────────────────────────');
      analysis.elitePerformers.forEach((agent, idx) => {
        lines.push(`  ${idx + 1}. ${agent.name}`);
        lines.push(`     Score Growth: +${agent.scoreChangePercent.toFixed(2)}%`);
        lines.push(`     Score: ${agent.previousScore.toFixed(2)} → ${agent.currentScore.toFixed(2)}`);
        lines.push(`     Rank: ${agent.previousRank} → ${agent.currentRank}`);
        lines.push('');
      });
    }

    if (analysis.highMomentum.length === 0 && 
        analysis.breakouts.length === 0 && 
        analysis.elitePerformers.length === 0) {
      lines.push('ℹ️  No significant movements detected in this scan.');
      lines.push('');
    }

    lines.push('═══════════════════════════════════════════════════════');

    return lines.join('\n');
  }

  generateTelegramMessage(analysis: AnalysisResult): string {
    const lines: string[] = [];
    
    lines.push('🔍 *AGDP Trend Scout Report*');
    lines.push(`📅 ${new Date(analysis.timestamp).toLocaleString()}`);
    lines.push('');

    if (analysis.highMomentum.length > 0) {
      lines.push('🚀 *High Momentum:*');
      analysis.highMomentum.slice(0, 5).forEach(agent => {
        lines.push(`• *${agent.name}*`);
        lines.push(`  Rank: ${agent.previousRank} → ${agent.currentRank} (↑${agent.rankChange})`);
      });
      lines.push('');
    }

    if (analysis.breakouts.length > 0) {
      lines.push('💥 *Breakouts:*');
      analysis.breakouts.forEach(agent => {
        lines.push(`• *${agent.name}*`);
        lines.push(`  ${agent.previousRank} → ${agent.currentRank}`);
      });
      lines.push('');
    }

    if (analysis.elitePerformers.length > 0) {
      lines.push('⭐ *Elite Performers:*');
      analysis.elitePerformers.slice(0, 5).forEach(agent => {
        lines.push(`• *${agent.name}*: +${agent.scoreChangePercent.toFixed(1)}%`);
      });
      lines.push('');
    }

    if (analysis.highMomentum.length === 0 && 
        analysis.breakouts.length === 0 && 
        analysis.elitePerformers.length === 0) {
      lines.push('ℹ️ No significant movements detected.');
    }

    return lines.join('\n');
  }
}
