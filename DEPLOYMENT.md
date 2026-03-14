# 🚀 Railway Deployment Guide

## Prerequisites

- [x] Agent testi başarılı (`npm run test` ✅)
- [ ] GitHub hesabı
- [ ] Railway hesabı (https://railway.app)
- [ ] Git kurulu

---

## Step 1: Git Repository Oluştur

```bash
cd projects/agdp-trend-scout

# Git başlat
git init

# Dosyaları ekle
git add .

# İlk commit
git commit -m "Initial commit: AGDP Trend Scout with Virtuals API integration"
```

---

## Step 2: GitHub'a Push Et

### A. GitHub'da Yeni Repository Oluştur

1. https://github.com/new adresine git
2. Repository adı: `agdp-trend-scout`
3. **Private** seç (cüzdan private key var!)
4. README ekleme (zaten var)
5. **Create repository**

### B. Local Repository'yi GitHub'a Bağla

```bash
# Remote ekle (ÖRNEKTİR - senin username'ini kullan)
git remote add origin https://github.com/YOUR_USERNAME/agdp-trend-scout.git

# Push et
git branch -M main
git push -u origin main
```

---

## Step 3: Railway'e Deploy Et

### A. Railway Hesabı Oluştur

1. https://railway.app adresine git
2. **Login with GitHub** ile giriş yap
3. GitHub repository'lerine erişim ver

### B. Yeni Proje Oluştur

1. Dashboard'da **New Project** tıkla
2. **Deploy from GitHub repo** seç
3. `agdp-trend-scout` repository'sini seç
4. Railway otomatik deploy başlatır

### C. Environment Variables Ayarla

Railway Dashboard'da **Variables** sekmesine git ve ekle:

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

# Telegram Bot (Optional - şimdilik boş bırak)
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# Base Chain Configuration
BASE_RPC_URL=https://mainnet.base.org
WALLET_PRIVATE_KEY=your_private_key_here

# Agent Configuration
AGENT_NAME=AGDP-Trend-Scout
AGENT_VERSION=1.0.0
COGNITIVE_LOOP_ENABLED=true

# Railway Port (otomatik atanır)
PORT=3000
```

**⚠️ ÇOK ÖNEMLİ:**
- `WALLET_PRIVATE_KEY`: Yeni bir Base wallet oluştur (MetaMask)
- **ASLA** ana cüzdanını kullanma!
- Test için küçük miktar ETH yeterli

---

## Step 4: Deployment'ı İzle

### A. Build Loglarını Kontrol Et

Railway Dashboard'da **Deployments** sekmesi:
1. Build başarılı mı? ✅
2. `npm install` tamamlandı mı?
3. `npm run build` başarılı mı?
4. `npm start` çalışıyor mu?

### B. Runtime Loglarını İzle

**Logs** sekmesinde görmek istediğin:
```
✓ API Server listening on port 3000
✓ DataFetcher initialized (API-based)
  Current Epoch: 4
✓ API Response received:
  Total agents: 5000
  Fetched: 1000 agents
```

### C. Health Check Test Et

Railway agent'a bir domain atar (örn: `agdp-trend-scout-production.up.railway.app`)

Tarayıcıda test et:
```
https://your-app.up.railway.app/health
```

Görmelisin:
```json
{
  "status": "ok",
  "agent": "AGDP-Trend-Scout",
  "version": "1.0.0",
  "timestamp": "2026-03-14T23:00:00.000Z",
  "uptime": 120
}
```

---

## Step 5: Virtuals Protocol'e Kayıt

### A. Virtuals Hesabı

1. https://app.virtuals.io adresine git
2. Wallet'ını bağla (MetaMask)
3. Base network'e geç

### B. Agent Kaydı Başlat

1. **Create Agent** butonuna tıkla
2. **ACP Agent** seç
3. Formu doldur:

**Agent Bilgileri:**
```
Name: AGDP Trend Scout
Symbol: AGTS (veya istediğin)
Description: AI Agent tracking AGDP leaderboard trends and velocity analysis. 
             Detects high momentum agents, breakouts, and elite performers.

Category: Analytics / Data Intelligence
```

**Agent Avatar:**
- Bir logo yükle (trend/analytics temalı)

**Twitter (Opsiyonel):**
- Agent için bir Twitter hesabı oluşturabilirsin

### C. ACP Endpoints Bağla

Virtuals senden **API endpoints** soracak:

```
Base URL: https://your-app.up.railway.app

Health Endpoint: /health
Status Endpoint: /status
Metrics Endpoint: /metrics
Info Endpoint: /info
```

**Test Et:**
Virtuals bu endpoint'leri kontrol edecek. Hepsi ✅ olmalı.

### D. Token Launch

1. **Token Configuration:**
   - Initial Supply: Varsayılanı bırak
   - Liquidity: Minimum yeterli (örn: 0.05 ETH)

2. **Launch Agent:**
   - Gas fee öde (Base'de ucuz: ~$0.50)
   - Transaction'ı onayla
   - Agent canlıya geçer! 🎉

---

## Step 6: Final Test

### A. Agent'ın Çalıştığını Doğrula

1. **Railway Logs:**
   ```
   ✓ API Server listening on port 3000
   ✓ Cognitive loop started
   ✓ Fetching leaderboard from API...
   ✓ Total extracted: 1000 agents
   ```

2. **Virtuals Dashboard:**
   - Agent durumu: **Active** ✅
   - Token: Canlı ve trade edilebilir
   - ACP Score: Artıyor

3. **Public Endpoints:**
   ```
   GET https://your-app.up.railway.app/
   GET https://your-app.up.railway.app/health
   GET https://your-app.up.railway.app/status
   ```

### B. İlk Velocity Report'u Bekle

Agent ilk scan'den sonra (30 dakika):
- `current_ranks.json` dolu olacak
- İkinci scan'de velocity analizi başlayacak
- Breakout/momentum alert'leri gelecek

---

## Troubleshooting

### Problem: Railway build hatası
**Çözüm:**
```bash
# Local'de test et
npm install
npm run build
npm start

# Başarılıysa, Railway'e tekrar push et
git add .
git commit -m "Fix build"
git push
```

### Problem: Health check başarısız
**Çözüm:**
- `PORT` environment variable Railway'de var mı?
- `src/index.ts` içinde API server başlatılıyor mu?
- Logs'da hata var mı?

### Problem: Virtuals endpoint'leri bulamıyor
**Çözüm:**
- Railway domain'i doğru mu?
- HTTPS kullanıyor musun? (HTTP olmaz)
- Endpoint'ler erişilebilir mi? (tarayıcıda test et)

### Problem: Agent pasif duruma düşüyor
**Çözüm:**
- Railway logs'unda crash var mı?
- Memory/CPU limiti aşılmış olabilir
- `COGNITIVE_LOOP_ENABLED=true` mi?

---

## Maintenance

### Haftalık: Epoch Güncelle

Her Pazartesi:
```bash
# Railway Dashboard > Variables
AGDP_API_EPOCH=5  # 4'ten 5'e artır
```

Veya otomatikleştir:
```typescript
// src/index.ts içinde
const MONDAY_CHECK_INTERVAL = 24 * 60 * 60 * 1000; // 24 saat
setInterval(() => {
  if (isMondayToday()) {
    fetcher.incrementEpoch();
  }
}, MONDAY_CHECK_INTERVAL);
```

### Aylık: Logs Temizle

Railway'de eski loglar birikir. Dashboard'dan temizleyebilirsin.

---

## Cost Estimates

### Railway
- **Starter Plan**: $5/month (yeterli)
- **Pro Plan**: $20/month (daha fazla kaynak)

### Virtuals Protocol
- **Token Launch**: ~$0.50 (Base gas)
- **ACP Operations**: Agent otomatik kazanır (revenue share)

### Base Chain
- **Wallet**: Test için 0.01 ETH yeterli
- **Transaction Costs**: Çok düşük (L2 avantajı)

---

## Security Checklist

- [ ] `.env` dosyası `.gitignore`'da
- [ ] Railway'de environment variables doğru
- [ ] Wallet private key güvenli (yeni wallet kullan)
- [ ] GitHub repository private
- [ ] Railway project private
- [ ] Sensitive data loglarda görünmüyor

---

## Next Steps After Deployment

1. **Twitter Integration:**
   - Telegram yerine/yanı sıra Twitter bot ekle
   - Breakout alert'lerini tweet et

2. **Advanced Analytics:**
   - Multi-epoch trend charts
   - Revenue velocity tracking
   - Success rate correlation

3. **Agent-to-Agent Commerce:**
   - Diğer ACP agent'larla etkileşim
   - Data satışı (örn: velocity insights)

---

## 🎉 Tebrikler!

Agent'ın artık:
- ✅ Railway'de 7/24 çalışıyor
- ✅ Virtuals Protocol'de kayıtlı
- ✅ ACP puanı kazanıyor
- ✅ Token'ı trade edilebilir
- ✅ Velocity analizi yapıyor

**Sen artık bir Virtuals ACP Agent sahibisin!** 🚀
