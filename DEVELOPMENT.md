# AGDP Trend Scout - Development Notes

## Quick Reference

### Start Commands
```bash
# Development mode with auto-restart
npm run dev

# Single scan (no loop)
npm run dev -- --once

# Production build
npm run build && npm start
```

### Environment Variables
Copy `.env.example` to `.env` and configure:
- `SCRAPE_INTERVAL_MINUTES`: How often to scan (default: 30)
- `TELEGRAM_BOT_TOKEN`: Optional Telegram integration
- `WALLET_PRIVATE_KEY`: For future on-chain operations

### Analysis Thresholds
- **High Momentum**: >20 rank increase
- **Breakout**: From outside top 100 → top 50
- **Elite Performance**: >50% score growth

## Architecture Notes

### Modular Design
Each module is independent and can be used/tested separately:
- `dataFetcher.ts`: Playwright scraper
- `stateManager.ts`: JSON persistence
- `velocityEngine.ts`: Analysis algorithms
- `reporter.ts`: Output formatting
- `acpAgent.ts`: Virtuals ACP integration

### Data Flow
```
AGDP.io → Playwright → current_ranks.json
                ↓
        Compare with previous_ranks.json
                ↓
        Velocity Engine Analysis
                ↓
        Console + Telegram Reports
```

### Future Enhancements
1. On-chain state verification (Base chain)
2. Agent marketplace integration (ACP)
3. Multi-protocol support
4. ML-based prediction models
5. WebSocket real-time updates

## Troubleshooting

### Playwright Issues
```bash
# Reinstall browsers
npx playwright install chromium --force
```

### Data Directory
If `data/` folder missing, agent will auto-create on first run.

### Telegram Not Working
- Verify bot token with BotFather
- Check chat ID using @userinfobot
- Ensure bot has permission to send messages to chat

## Testing Checklist
- [ ] First run (baseline establishment)
- [ ] Second run (with comparison)
- [ ] Telegram notification (if configured)
- [ ] Graceful shutdown (Ctrl+C)
- [ ] Data persistence across restarts
