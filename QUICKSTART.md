# 🚀 AGDP Trend Scout - Quick Start Guide

## Kurulum Tamamlandı! ✅

Projeniz başarıyla oluşturuldu. İşte hızlı başlangıç:

### 1️⃣ Bağımlılıklar (KURULDU ✓)
```bash
npm install
npx playwright install chromium
```

### 2️⃣ Konfigürasyon
`.env` dosyasını düzenle (zaten oluşturuldu):
```bash
# Telegram entegrasyonu için (opsiyonel):
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id

# Base wallet için (opsiyonel - gelecek özellikler için):
WALLET_PRIVATE_KEY=your_key
```

### 3️⃣ Çalıştır

**Tek tarama (önerilen ilk deneme):**
```bash
npm run dev -- --once
```

**Sürekli izleme (cognitive loop):**
```bash
npm run dev
```

**Production build:**
```bash
npm run build
npm start
```

---

## 📋 Ne Yapar?

1. **AGDP.io leaderboard**'dan agent verilerini çeker
2. Rank ve skor değişimlerini analiz eder
3. Üç kategori tespit eder:
   - 🚀 **High Momentum**: 20+ rank yükselen
   - 💥 **Breakout**: 100 dışından 50'ye giren
   - ⭐ **Elite**: %50+ skor artışı

---

## 🎯 İlk Çalıştırma

```bash
cd projects/agdp-trend-scout
npm run dev -- --once
```

İlk çalıştırmada baseline oluşturur. İkinci çalıştırmada karşılaştırma başlar!

---

## 🛠️ Sorun Giderme

**"No data fetched" hatası:**
- AGDP.io sitesinin yapısı değişmiş olabilir
- `dataFetcher.ts` içindeki selector'ları güncelle

**Playwright hataları:**
```bash
npx playwright install chromium --force
```

---

## 📚 Dokümantasyon

- `README.md` - Tam dokümantasyon
- `DEVELOPMENT.md` - Geliştirici notları
- `.env.example` - Konfigürasyon referansı

---

## 🏗️ Mimari

```
DataFetcher (Playwright) 
    ↓
StateManager (JSON)
    ↓
VelocityEngine (Analysis)
    ↓
Reporter (Console/Telegram)
    ↓
ACPAgent (Virtuals Protocol)
```

---

**Hazır! 🎉 İyi analizler!**
