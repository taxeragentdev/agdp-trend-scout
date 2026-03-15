# 🔗 Virtuals Protocol Manual Configuration Guide

## ✅ Hazırlık Tamamlandı

- [x] GitHub repository: `taxeragentdev/agdp-trend-scout`
- [x] Railway deployment aktif
- [x] OpenClaw ACP endpoints eklendi
- [x] Agent konfigürasyonu hazır

---

## 🎯 Şimdi Yapılacaklar

### Step 1: Railway Domain'ini Kontrol Et

1. **Railway Dashboard'a git:** https://railway.app
2. Projen açık olmalı: `agdp-trend-scout`
3. **Settings** → **Networking** bölümünden domain'i al
4. Örnek: `agdp-trend-scout-production.up.railway.app`

### Step 2: Health Check Test Et

Railway deployment tamamlandığında (2-3 dakika) şu endpoint'leri test et:

**Tarayıcıda aç:**

1. **Root:** 
   ```
   https://YOUR-DOMAIN.up.railway.app/
   ```
   Görmelisin:
   ```json
   {
     "name": "AGDP Trend Scout",
     "version": "1.0.0",
     "status": "online"
   }
   ```

2. **Health:**
   ```
   https://YOUR-DOMAIN.up.railway.app/health
   ```
   Görmelisin:
   ```json
   {
     "status": "ok",
     "agent": "AGDP-Trend-Scout",
     "uptime": 42
   }
   ```

3. **ACP Capabilities (YENİ!):**
   ```
   https://YOUR-DOMAIN.up.railway.app/acp/capabilities
   ```
   Görmelisin:
   ```json
   {
     "version": "1.0.0",
     "protocol": "OpenClaw ACP",
     "capabilities": {
       "monitoring": true,
       "analytics": true
     }
   }
   ```

4. **ACP Agent (YENİ!):**
   ```
   https://YOUR-DOMAIN.up.railway.app/acp/agent
   ```
   Görmelisin:
   ```json
   {
     "id": "agdp-trend-scout",
     "name": "AGDP Trend Scout",
     "type": "analytics",
     "status": "active"
   }
   ```

---

### Step 3: Virtuals'a Geri Dön

**Virtuals Configure Agent sayfasında:**

1. **"manual" tab'inde olduğundan emin ol**

2. **Aşağıda bir form göreceksin:**
   - **Agent URL / Base URL** alanı
   - **API Key** alanı (opsiyonel)
   - Muhtemelen bir **"Next"** veya **"Connect"** butonu

3. **Agent URL / Base URL alanına Railway domain'ini gir:**
   ```
   https://agdp-trend-scout-production.up.railway.app
   ```
   ⚠️ **DİKKAT:**
   - **HTTPS** kullan (HTTP değil!)
   - Sonunda **/** olmasın
   - Port numarası **ekleme** (Railway otomatik halleder)

4. **API Key** alanını **boş bırak** (şimdilik gerekli değil)

5. **"Test Connection"** veya **"Verify"** butonuna tıkla

---

### Step 4: Connection Test Sonuçları

Virtuals şu endpoint'leri test edecek:

```
✅ GET /health
✅ GET /status
✅ GET /info
✅ GET /acp/capabilities
✅ GET /acp/agent
```

**Eğer hepsi ✅ ise:**
- **"Connection successful"** mesajı göreceksin
- **"Next"** veya **"Continue"** butonu aktif olacak

**Eğer ❌ varsa:**
- Railway logs'una bak (hata var mı?)
- Domain doğru mu? (https:// ile başlıyor mu?)
- Railway deployment tamamlandı mı? (Deployments tab'inde kontrol et)

---

### Step 5: Token Configuration

Connection başarılıysa, sonraki sayfada:

**Token Launch Settings:**
```
Initial Liquidity: 0.05 ETH (minimum)
Token Symbol: AGTS (istersen değiştir)
Token Supply: Varsayılan (Virtuals otomatik ayarlar)
```

**Launch Fee:**
- Base network'te gas fee: ~$0.30-0.50
- MetaMask'te onayla

---

### Step 6: Launch! 🚀

1. **"Launch Agent"** butonuna tıkla
2. **MetaMask confirmation** açılacak
3. Transaction'ı **onayla**
4. **30-60 saniye bekle**
5. **Success! 🎉**

Artık:
- ✅ Agent Virtuals'ta kayıtlı
- ✅ Token canlı ve trade edilebilir
- ✅ AGDP.io leaderboard'da görünecek
- ✅ ACP puanı kazanmaya başlayacak

---

## 🔍 Deployment'ı İzle

### Railway Logs

**Railway Dashboard → Deployments → Logs**

Görmek istediğin:
```
✓ API Server listening on port 3000
✓ DataFetcher initialized (API-based)
  Current Epoch: 4
✓ Cognitive loop started
Fetching leaderboard from API...
✓ API Response received:
  Total agents: 5000
  Fetched: 1000 agents
```

### Virtuals Dashboard

**Virtuals Agent Dashboard'a git:**
- Agent Status: **Active** ✅
- Token Address: `0x...`
- ACP Score: Artmaya başlıyor
- Jobs Completed: 0 → 1 → 2... (zaman içinde)

---

## ⚠️ Troubleshooting

### Problem: "Connection failed"
**Çözüm:**
1. Railway deployment tamamlandı mı? (2-3 dakika bekle)
2. Domain doğru mu? (`https://` ile başlıyor mu?)
3. `/health` endpoint'i manuel test et (tarayıcıda)

### Problem: Railway'de hata logları
**Çözüm:**
```bash
# Local'de test et
cd d:\new-virtual-agent\projects\agdp-trend-scout
npm run dev

# Port 3000'de çalışıyor mu?
# http://localhost:3000/health test et
```

### Problem: "Transaction failed"
**Çözüm:**
- Base network'te yeterli ETH var mı? (0.05+ olmalı)
- Gas price çok yüksek mi? (nadir ama olabilir)
- MetaMask'te Base network seçili mi?

---

## 📋 Checklist

Virtuals'a dönmeden önce:

- [ ] Railway deployment **tamamlandı** (yeşil ✅)
- [ ] Domain **test edildi** (`/health` çalışıyor)
- [ ] ACP endpoints **test edildi** (`/acp/agent` çalışıyor)
- [ ] Base wallet'te **0.05+ ETH** var
- [ ] MetaMask **Base network**'te

Hepsi ✅ ise → **Virtuals'a geri dön ve domain'i gir!**

---

## 🎯 Sonraki Adım

**Virtuals Configure Agent sayfasında:**

1. "manual" tab'inde ol
2. Agent URL alanına Railway domain'ini gir:
   ```
   https://agdp-trend-scout-production.up.railway.app
   ```
3. "Test Connection" tıkla
4. Hepsi ✅ olunca "Next" tıkla
5. Token launch et 🚀

---

Hazır mısın? Railway domain'in ne? Test edelim! 🔥
