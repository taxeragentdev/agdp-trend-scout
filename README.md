# 🔍 AGDP Trend Scout

**Virtuals ACP Agent** for monitoring and analyzing [AGDP.io](https://agdp.io) leaderboard trends, agent velocity, and performance breakthroughs.

## 📚 Dokümantasyon Rehberi

**Yeni başlıyorsan:** Bu dosyalar senin için!

| Dosya | Kime Göre | Ne İçerir |
|-------|-----------|-----------|
| **[API_GUIDE.md](API_GUIDE.md)** | 🔌 API kullanıcıları | Virtuals API & Epoch yönetimi |
| **[QUICK_START.md](QUICK_START.md)** | 🚀 Acele edenler | 5 dakikada çalıştır! |
| **[COMPLETE_GUIDE.md](COMPLETE_GUIDE.md)** | 📖 Detay arayanlar | Baştan sona her şey |
| **[ACP_EXPLAINED.md](ACP_EXPLAINED.md)** | 🤔 Kavram meraklıları | Virtuals/OpenClaw/ACP nedir? |
| **[TEST_GUIDE.md](TEST_GUIDE.md)** | 🧪 Test edenler | Adım adım test senaryoları |

### 🎯 Hangi Dosyayı Okumalıyım?

```
YENİ BAŞLIYORUM → QUICK_START.md (5 dakika)
         ↓
    API NASIL ÇALIŞIR? → API_GUIDE.md (10 dakika)
         ↓
    ÇALIŞTIRDIM, ŞİMDİ NE? → COMPLETE_GUIDE.md (30 dakika)
         ↓
    ACP NEDİR? → ACP_EXPLAINED.md (15 dakika)
         ↓
    TEST ETMEK İSTİYORUM → TEST_GUIDE.md (1 saat)
```

---

## 🌟 Features

### Core Functionality
- **🔌 API-Based Data Fetching**: Direct integration with Virtuals API (no web scraping)
- **📊 Velocity Analysis**: Tracks rank changes and score growth rates over time
- **🚀 High Momentum Detection**: Identifies agents climbing 20+ ranks rapidly
- **💥 Breakout Alerts**: Detects agents jumping from outside top 100 into top 50
- **⭐ Elite Performance**: Flags agents with 50%+ autonomous score growth
- **📡 Dual Reporting**: Console output + optional Telegram bot integration
- **🔄 Epoch Management**: Weekly epoch tracking for historical trend analysis

### Virtuals ACP Integration
- **🎯 Goal-Task Architecture**: Structured agent objectives and execution tracking
- **💼 Base Chain Wallet**: Placeholder for autonomous wallet operations
- **🔄 Cognitive Loop**: Continuous monitoring with configurable intervals
- **🤖 Agent-to-Agent Ready**: Modular design for future ACP commerce integration

---

## 📁 Project Structure

```
agdp-trend-scout/
├── src/
│   ├── index.ts                 # Main agent orchestrator
│   ├── test.ts                  # API test script
│   ├── config/
│   │   └── index.ts            # Configuration loader
│   ├── modules/
│   │   ├── dataFetcher.ts      # API-based data fetcher
│   │   ├── stateManager.ts     # JSON-based state persistence
│   │   ├── velocityEngine.ts   # Trend analysis algorithms
│   │   ├── reporter.ts         # Console & Telegram reporting
│   │   ├── apiServer.ts        # Express API server for Virtuals
│   │   └── acpAgent.ts         # Virtuals ACP goal/task system
│   └── types/
│       └── index.ts            # TypeScript interfaces
├── data/                        # Runtime data storage
├── logs/                        # Analysis logs
├── .env.example                # Configuration template
├── API_GUIDE.md                # API & Epoch documentation
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd projects/agdp-trend-scout

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings
```

### Configuration

Edit `.env` file:

```env
# API Configuration
AGDP_API_URL=https://api.virtuals.io/api/agdp-leaderboard-epochs
AGDP_API_EPOCH=4
API_PAGE_SIZE=1000
SCRAPE_INTERVAL_MINUTES=30

# Analysis Thresholds
HIGH_MOMENTUM_RANK_THRESHOLD=20
BREAKOUT_FROM_RANK=100
BREAKOUT_TO_RANK=50
ELITE_PERFORMANCE_SCORE_THRESHOLD=50

# Telegram Bot (Optional)
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here

# Base Chain Configuration (Placeholder)
BASE_RPC_URL=https://mainnet.base.org
WALLET_PRIVATE_KEY=your_private_key_here

# Agent Configuration
AGENT_NAME=AGDP-Trend-Scout
COGNITIVE_LOOP_ENABLED=true
```

### Running the Agent

```bash
# Test API connection first
npm run test

# Run in cognitive loop mode (continuous monitoring)
npm run dev

# Run a single scan
npm run dev -- --once

# Build for production
npm run build
npm start
```

---

## 🧠 How It Works

### 1. Data Collection
- Uses native `fetch()` API to call Virtuals leaderboard endpoint
- Direct JSON response parsing (no DOM manipulation)
- Fetches up to 1000 agents per request with full metadata
- Supports epoch-based historical data retrieval
- Stores snapshot with timestamp in `data/current_ranks.json`

### 2. State Management
- Previous scan data moved to `data/previous_ranks.json`
- Enables historical comparison between scans
- Automatic cleanup of old analysis logs (7-day retention)

### 3. Velocity Analysis Engine

#### High Momentum Detection
```typescript
// Agents climbing more than threshold (default: 20 ranks)
if (rankChange > HIGH_MOMENTUM_RANK_THRESHOLD) {
  flagAsHighMomentum();
}
```

#### Breakout Detection
```typescript
// Agents jumping from outside top 100 to top 50
if (previousRank > 100 && currentRank <= 50) {
  flagAsBreakout();
}
```

#### Elite Performance (Score Growth)
```typescript
// Agents with >50% autonomous score increase
const scoreChangePercent = (scoreChange / previousScore) * 100;
if (scoreChangePercent > 50) {
  flagAsElitePerformer();
}
```

### 4. Reporting
- **Console**: Rich formatted output with color-coded sections
- **Telegram**: Markdown-formatted alerts sent to configured chat
- **Logs**: JSON analysis files saved to `data/` directory

---

## 🎯 Virtuals ACP Architecture

### Goal-Task System

```typescript
// Example: Agent creates hierarchical objectives
const mainGoal = acpAgent.createGoal(
  'Monitor AGDP leaderboard trends',
  'high'
);

const task1 = acpAgent.createTask(mainGoal.id, 'Fetch leaderboard data');
const task2 = acpAgent.createTask(mainGoal.id, 'Analyze velocity');
```

### Cognitive Loop
```
┌─────────────────────────────────────────┐
│  Initialize Agent & Wallet (Base)      │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Fetch Leaderboard (Virtuals API)      │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Compare with Previous State            │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Velocity Analysis Engine               │
│  - High Momentum                        │
│  - Breakouts                            │
│  - Elite Performers                     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Report (Console + Telegram)            │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Wait (configurable interval)           │
└──────────────┬──────────────────────────┘
               │
               └─────────────► (Loop)
```

---

## 📊 Sample Output

```
═══════════════════════════════════════════════════════
  🔍 AGDP TREND SCOUT - VELOCITY ANALYSIS REPORT
═══════════════════════════════════════════════════════
  Timestamp: 3/14/2026, 1:00:00 AM
  Total Changes Detected: 247

🚀 HIGH MOMENTUM AGENTS:
───────────────────────────────────────────────────────
  1. TrendMaster AI
     Rank: 145 → 98 (↑47)
     Score: 1250.50 → 2180.75 (+930.25)

💥 BREAKOUT AGENTS:
───────────────────────────────────────────────────────
  1. RapidClimber
     Rank: 112 → 43 (↑69)
     Score: 890.00 → 1567.30

⭐ ELITE PERFORMANCE (Score Growth >50%):
───────────────────────────────────────────────────────
  1. EliteAgent007
     Score Growth: +87.45%
     Score: 456.20 → 855.10
     Rank: 78 → 62

═══════════════════════════════════════════════════════
```

---

## 🛠️ Advanced Configuration

### Custom Thresholds

Adjust in `.env`:
```env
HIGH_MOMENTUM_RANK_THRESHOLD=15        # More sensitive
BREAKOUT_FROM_RANK=150                 # Wider breakout range
ELITE_PERFORMANCE_SCORE_THRESHOLD=75   # Stricter elite criteria
```

### Telegram Setup

1. Create bot via [@BotFather](https://t.me/botfather)
2. Get bot token
3. Get your chat ID (use [@userinfobot](https://t.me/userinfobot))
4. Add to `.env`

### Base Wallet Integration

```env
# For future ACP commerce features
WALLET_PRIVATE_KEY=0x...
CONTRACT_ADDRESS=0x...
```

**⚠️ SECURITY**: Never commit `.env` to version control!

---

## 🔗 Resources

- [Virtuals Protocol Whitepaper](https://whitepaper.virtuals.io/about-virtuals/agent-commerce-protocol-acp)
- [Virtuals API Documentation](https://api.virtuals.io/)
- [OpenClaw ACP Framework](https://github.com/Virtual-Protocol/openclaw-acp)
- [AGDP.io Platform](https://agdp.io/join)
- [Base Chain Docs](https://docs.base.org/)

---

## 🧪 Development

```bash
# Watch mode (auto-restart on changes)
npm run watch

# Type checking
npx tsc --noEmit

# Clean build artifacts
npm run clean
```

---

## 📝 TODO / Roadmap

- [ ] Implement on-chain ACP contract interactions
- [ ] Add agent-to-agent commerce capabilities
- [ ] Historical trend visualization dashboard
- [ ] Multi-leaderboard support (other protocols)
- [ ] Machine learning prediction models
- [ ] Discord integration alongside Telegram

---

## 🤝 Contributing

This is a modular, portable project. Feel free to:
- Fork and customize thresholds
- Add new analysis algorithms
- Integrate additional reporting channels
- Extend ACP commerce features

---

## ⚖️ License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- **Virtuals Protocol** for ACP architecture & API
- **AGDP.io** for agent gaming data
- **Base** for L2 infrastructure

---

**Built with ❤️ for the Virtuals ACP ecosystem**

*Agent-to-Agent Commerce | Autonomous Analytics | Web3 Intelligence*
