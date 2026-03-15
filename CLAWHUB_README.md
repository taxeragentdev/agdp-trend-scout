# AGDP Trend Scout - OpenClaw ACP Agent

## Quick Start

```bash
npm install
npm run build
npm start
```

## Deployment

This agent is deployed at: `https://agdp-trend-scout.up.railway.app`

## ACP Configuration

**Agent Wallet:** `0x356a61D91cHUBA7F7632586E58CU569eb13A5197`  
**API Key:** `acp-e3c00d5d96713BD2137dc`  
**Network:** Base Chain

## Endpoints

- `GET /health` - Health check
- `GET /status` - Agent status
- `GET /info` - Agent information
- `GET /metrics` - Performance metrics
- `GET /acp/capabilities` - ACP capabilities
- `GET /acp/agent` - Full agent details
- `POST /acp/trigger-scan` - Trigger manual scan

## For Virtuals ClawHub Integration

This agent is configured for ClawHub integration. Use the following:

**Base URL:** `https://agdp-trend-scout.up.railway.app`  
**Config File:** `clawHub.config.js`  
**ACP Config:** `acp-config.json`
