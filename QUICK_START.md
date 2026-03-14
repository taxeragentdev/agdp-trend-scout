# 🎯 HEMEN BAŞLA - 5 Dakikada Çalıştır!

## ⚡ Hızlı Başlangıç (Telegram'sız)

### 1. Terminal Aç
```bash
# PowerShell veya CMD
Win + R → cmd → Enter
```

### 2. Klasöre Git
```bash
cd d:\new-virtual-agent\projects\agdp-trend-scout
```

### 3. İlk Çalıştırma
```bash
npm run dev -- --once
```

**BEKLENTİ:** 10-15 saniye içinde "First scan detected. Establishing baseline..." göreceksin.

### 4. İkinci Çalıştırma (5 dakika sonra)
```bash
npm run dev -- --once
```

**BEKLENTİ:** High Momentum, Breakout, Elite Performance raporları göreceksin!

---

## 📱 Telegram Entegrasyonu (15 Dakika)

### Adım 1: Bot Oluştur (5 dk)

1. Telegram'da `@BotFather` ara
2. `/newbot` gönder
3. İsim ver: `AGDP Trend Scout`
4. Username ver: `agdp_scout_[senin_adın]_bot`
5. **TOKEN'ı kopyala:** `1234567890:ABC...`

### Adım 2: Chat ID Öğren (3 dk)

1. Botuna `/start` gönder
2. Telegram'da `@userinfobot` ara
3. `/start` gönder
4. **Chat ID'yi kopyala:** `123456789`

### Adım 3: .env Dosyasını Güncelle (2 dk)

`.env` dosyasını aç (Not Defteri ile):

```env
TELEGRAM_BOT_TOKEN=senin_token_buraya
TELEGRAM_CHAT_ID=senin_chat_id_buraya
```

Kaydet!

### Adım 4: Test Et (5 dk)

```bash
npm run dev -- --once
```

**BEKLENTİ:** Telegram'dan bildirim gelecek! 📲

---

## ♾️ Sürekli İzleme (24/7)

```bash
npm run dev
```

- Her 30 dakikada bir otomatik tarama
- Durdurmak için: `CTRL + C`
- Bilgisayarını açık bırak!

---

## 🆘 Hata Aldım!

### "Playwright bulunamadı"
```bash
npx playwright install chromium
```

### "Module bulunamadı"
```bash
npm install
```

### Telegram çalışmıyor
- Token'ı kontrol et (BotFather'dan)
- Chat ID'yi kontrol et (@userinfobot'tan)
- Bota `/start` gönderdin mi?

---

## 📊 Ne Göreceğim?

### İlk Çalıştırma
```
✓ Playwright browser initialized
✓ Extracted 247 agents from leaderboard
ℹ️  First scan detected. Establishing baseline...
✓ Saved current snapshot
```

### İkinci Çalıştırma
```
🚀 HIGH MOMENTUM AGENTS:
  1. TrendMaster AI
     Rank: 145 → 98 (↑47)
     
⭐ ELITE PERFORMANCE:
  1. EliteAgent007
     Score Growth: +87.45%
```

---

## ❓ SSS

**S: Telegram zorunlu mu?**  
C: Hayır! Telegram olmadan da çalışır, sadece konsola yazdırır.

**S: Blockchain gerekli mi?**  
C: Hayır! Şu an lokal çalışıyor. Blockchain ileride eklenebilir.

**S: Para harcayacak mıyım?**  
C: Hayır! Tamamen ücretsiz. (Blockchain entegrasyonu yaparsan testnet kullan)

**S: Her gün çalıştırmam gerekiyor mu?**  
C: Hayır! İstersen `npm run dev` ile sürekli çalışır bırakabilirsin.

**S: AGDP.io değişirse ne olur?**  
C: Kod güncellemen gerekir (teknik bilgi gerektirir).

---

## 🎯 Önerilen Plan

### Gün 1-3: Öğrenme
- Lokal olarak test et
- Telegram entegrasyonu kur
- Raporları incele

### Hafta 1-2: Kullanım
- Sürekli izleme başlat
- Trendleri takip et
- Threshold'ları ayarla (.env)

### Gelecek: Blockchain (Opsiyonel)
- Base testnet öğren
- Smart contract deploy et
- Virtuals marketplace'e ekle

---

**HEMEN BAŞLA! Terminali aç ve `npm run dev -- --once` komutunu çalıştır! 🚀**

---

## 📞 Destek

Sorun yaşarsan `COMPLETE_GUIDE.md` dosyasına bak!
