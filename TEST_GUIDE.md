# 🧪 Test Senaryoları - Adım Adım

## 📋 Test Checklist

### ✅ Temel Fonksiyonellik Testleri

#### Test 1: İlk Çalıştırma (Baseline)
```bash
cd d:\new-virtual-agent\projects\agdp-trend-scout
npm run dev -- --once
```

**Beklenen Çıktı:**
```
╔════════════════════════════════════════════════════════╗
║      AGDP TREND SCOUT - Virtuals ACP Agent        ║
╚════════════════════════════════════════════════════════╝
  Version: 1.0.0
  Agent: AGDP-Trend-Scout
  Cognitive Loop: Disabled

✓ Playwright browser initialized
Fetching leaderboard from https://agdp.io/leaderboard...
✓ Extracted XXX agents from leaderboard
ℹ️  First scan detected. Establishing baseline...
✓ Saved current snapshot with XXX agents
✓ Browser closed
```

**Kontrol Et:**
- [ ] `data/current_ranks.json` dosyası oluştu mu?
- [ ] İçinde agent verileri var mı?
- [ ] Hata mesajı yok mu?

---

#### Test 2: Karşılaştırma Analizi
```bash
# 5-10 dakika bekle (gerçek hayatta değişim olsun)
npm run dev -- --once
```

**Beklenen Çıktı:**
```
✓ Extracted XXX agents from leaderboard
ℹ️  Previous snapshot found. Performing velocity analysis...

═══════════════════════════════════════════════════════
  🔍 AGDP TREND SCOUT - VELOCITY ANALYSIS REPORT
═══════════════════════════════════════════════════════
  Timestamp: ...
  Total Changes Detected: XX

🚀 HIGH MOMENTUM AGENTS:
   (varsa gösterir, yoksa boş)

💥 BREAKOUT AGENTS:
   (varsa gösterir, yoksa boş)

⭐ ELITE PERFORMANCE (Score Growth >50%):
   (varsa gösterir, yoksa boş)
```

**Kontrol Et:**
- [ ] `data/previous_ranks.json` dosyası oluştu mu?
- [ ] Analiz raporu göründü mü?
- [ ] `data/analysis_*.json` dosyası oluştu mu?

---

### 📱 Telegram Entegrasyonu Testleri

#### Test 3: Telegram Bot Kurulumu

**Adım 1: Bot Oluştur**
```
Telegram → @BotFather → /newbot
İsim: AGDP Trend Scout Test
Username: agdp_test_[senin_adın]_bot
```

**Adım 2: Token Al**
```
TOKEN kopyala: 1234567890:ABC...
```

**Adım 3: Chat ID Al**
```
Telegram → @userinfobot → /start
Chat ID kopyala: 123456789
```

**Adım 4: .env Güncelle**
```env
TELEGRAM_BOT_TOKEN=senin_token
TELEGRAM_CHAT_ID=senin_chat_id
```

**Adım 5: Test Et**
```bash
npm run dev -- --once
```

**Beklenen Çıktı:**
```
✓ Telegram bot initialized
✓ Report sent to Telegram
```

**Telegram'da Görmek İstediğin:**
```
🔍 *AGDP Trend Scout Report*
📅 14/03/2026, 01:23:45

🚀 *High Momentum:*
• *Agent1*
  Rank: 100 → 75 (↑25)

⭐ *Elite Performers:*
• *Agent2*: +75.3%
```

**Kontrol Et:**
- [ ] Telegram'dan bildirim geldi mi?
- [ ] Mesaj formatı doğru mu?
- [ ] Veriler okunabilir mi?

---

### ♾️ Cognitive Loop Testleri

#### Test 4: Sürekli İzleme

**Başlat:**
```bash
npm run dev
```

**Beklenen Çıktı:**
```
✓ Starting cognitive loop (interval: 30 minutes)
[01:23:45] AGDP-Trend-Scout → SCAN_STARTED
...
[01:24:00] AGDP-Trend-Scout → SCAN_COMPLETED (247 agents tracked)
```

**Bekle:** 30 dakika

**Beklenen:** Otomatik olarak yeni tarama başlayacak

**Durdur:** `CTRL + C`

**Beklenen Çıktı:**
```
Received SIGINT. Shutting down gracefully...
✓ Browser closed
✓ Cognitive loop stopped
```

**Kontrol Et:**
- [ ] Her 30 dakikada otomatik tarama yapıyor mu?
- [ ] CTRL+C ile düzgün kapanıyor mu?
- [ ] Hata vermiyor mu?

---

### 🔧 Hata Senaryoları

#### Test 5: İnternet Yok Senaryosu

**Simülasyon:**
1. Wi-Fi'ı kapat
2. `npm run dev -- --once` çalıştır

**Beklenen:**
```
✗ Error fetching leaderboard: ...
Fatal error: ...
```

**Kontrol Et:**
- [ ] Düzgün hata mesajı veriyor mu?
- [ ] Program çökmüyor mu?

---

#### Test 6: Yanlış Telegram Token

**Simülasyon:**
1. `.env` dosyasında TOKEN'ı değiştir: `TELEGRAM_BOT_TOKEN=fake_token`
2. `npm run dev -- --once` çalıştır

**Beklenen:**
```
✗ Failed to send Telegram message: ...
```

**Kontrol Et:**
- [ ] Program devam ediyor mu?
- [ ] Konsola yazdırmaya devam ediyor mu?
- [ ] Çökmüyor mu?

---

### 📊 Veri Doğrulama Testleri

#### Test 7: JSON Dosyalarını Kontrol Et

**Konum:** `data/current_ranks.json`

**Açık:** Not Defteri veya VS Code ile

**Görmek İstediğin:**
```json
{
  "timestamp": "2026-03-14T01:23:45.678Z",
  "data": [
    {
      "rank": 1,
      "name": "Agent Name",
      "score": 1234.56,
      "timestamp": "2026-03-14T01:23:45.678Z"
    },
    ...
  ]
}
```

**Kontrol Et:**
- [ ] JSON formatı doğru mu?
- [ ] Tüm alanlar dolu mu?
- [ ] Score değerleri mantıklı mı?

---

#### Test 8: Analysis Log Kontrol

**Konum:** `data/analysis_*.json`

**Açık:** En son oluşan dosyayı

**Görmek İstediğin:**
```json
{
  "timestamp": "...",
  "highMomentum": [...],
  "breakouts": [...],
  "elitePerformers": [...],
  "allChanges": [...]
}
```

**Kontrol Et:**
- [ ] Kategoriler doğru mu?
- [ ] Hesaplamalar mantıklı mı?
- [ ] Veriler tutarlı mı?

---

### 🎯 Performance Testleri

#### Test 9: Hız Testi

**Zamanlayıcı Başlat:**
```bash
# PowerShell
Measure-Command { npm run dev -- --once }
```

**Beklenen Süre:** 10-20 saniye

**Kontrol Et:**
- [ ] 30 saniyeden kısa mı?
- [ ] Memory leak yok mu?

---

#### Test 10: Uzun Süre Çalışma Testi

**Başlat:**
```bash
npm run dev
```

**Bekle:** 2-3 saat

**Kontrol Et:**
- [ ] Düzenli tarama yapıyor mu?
- [ ] Bellek kullanımı artmıyor mu?
- [ ] Log dosyaları büyümüyor mu?

---

## 🔍 Hata Ayıklama

### Log Dosyalarını İnceleme

```bash
# Windows
dir data\
type data\current_ranks.json
```

### Playwright Debug Mode

`.env` dosyasına ekle:
```env
DEBUG=pw:api
```

Tekrar çalıştır:
```bash
npm run dev -- --once
```

Detaylı browser logları göreceksin.

---

## ✅ Başarı Kriterleri

### Minimum (Çalışıyor Sayılır)
- [x] İlk tarama başarılı
- [x] `current_ranks.json` oluşuyor
- [x] İkinci taramada karşılaştırma yapıyor

### Standart (İyi Çalışıyor)
- [x] Telegram bildirimleri geliyor
- [x] Cognitive loop çalışıyor
- [x] Hata yönetimi çalışıyor

### Optimal (Mükemmel Çalışıyor)
- [x] 2+ saat kesintisiz çalışıyor
- [x] Log temizleme çalışıyor
- [x] Tüm kategorilerde tespit yapıyor

---

## 📝 Test Raporu Şablonu

```markdown
# Test Raporu - [Tarih]

## Temel Fonksiyonellik
- [ ] İlk çalıştırma: ✅ / ❌
- [ ] Karşılaştırma: ✅ / ❌
- [ ] Data persistence: ✅ / ❌

## Telegram
- [ ] Bot kurulumu: ✅ / ❌
- [ ] Bildirim gönderimi: ✅ / ❌

## Cognitive Loop
- [ ] Otomatik tarama: ✅ / ❌
- [ ] Graceful shutdown: ✅ / ❌

## Notlar
...
```

---

## 🎓 Test Sonrası Checklist

- [ ] Tüm temel testler geçti
- [ ] Telegram çalışıyor
- [ ] Hata senaryoları test edildi
- [ ] Performans kabul edilebilir
- [ ] Dokümantasyon anlaşıldı

**Tebrikler! Ajanın production-ready! 🎉**

---

## 📞 Sorun Yaşarsan

1. `COMPLETE_GUIDE.md` → Detaylı çözümler
2. `ACP_EXPLAINED.md` → Kavramsal açıklamalar
3. GitHub Issues → Topluluk desteği

**İyi testler! 🧪**
