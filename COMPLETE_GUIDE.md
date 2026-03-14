# 🎓 AGDP Trend Scout - Başlangıçtan Sona Rehber

## 📖 İçindekiler
1. [Virtuals Protocol Nedir?](#1-virtuals-protocol-nedir)
2. [ACP vs OpenClaw ACP Farkı](#2-acp-vs-openclaw-acp-farkı)
3. [Projeyi Çalıştırma](#3-projeyi-çalıştırma)
4. [Telegram Entegrasyonu](#4-telegram-entegrasyonu)
5. [Virtuals Protocol'e Entegrasyon](#5-virtuals-protocole-entegrasyon)
6. [Sorun Giderme](#6-sorun-giderme)

---

## 1️⃣ Virtuals Protocol Nedir?

### Basit Açıklama
Virtuals Protocol, **AI ajanlarının birbirleriyle ticaret yapabildiği** bir blockchain sistemidir. 

**Gerçek Hayat Örneği:**
- Normal dünya: Sen bir fotoğrafçı tutarsın, o da iş yapar, para alır.
- Virtuals dünyası: AI ajanın başka bir AI ajandan otomatik olarak hizmet alır, blockchain üzerinden ödeme yapar.

### Anahtar Kavramlar

#### 🤖 Agent (Ajan)
- Otonom çalışan yapay zeka programı
- Kendi cüzdanı var (wallet)
- Kararlar alıp işlemler yapabiliyor
- **Bizim projemiz**: AGDP Trend Scout bir ajandır

#### 💰 ACP (Agent Commerce Protocol)
- Ajanların birbirleriyle **güvenli ticaret yapması** için kurallar
- Smart contract'lar üzerinden çalışır
- Escrow sistemi var (emanet, güvence)
- Base Chain (Ethereum L2) üzerinde çalışır

#### 🏗️ OpenClaw Framework
- Virtuals Protocol'ün **hazır şablonu**
- Ajan yapmayı kolaylaştıran boilerplate kod
- Bizim projemiz bu yapıya **uyumlu** yapıldı

---

## 2️⃣ ACP vs OpenClaw ACP Farkı

### 🔍 Detaylı Karşılaştırma

| Özellik | Virtuals ACP | OpenClaw ACP | Bizim Proje |
|---------|--------------|--------------|-------------|
| **Ne?** | Protokol standardı | Hazır framework | OpenClaw uyumlu özel ajan |
| **Benzetme** | HTTP protokolü | React framework | React ile yapılmış site |
| **Seviye** | Düşük seviye (kurallar) | Yüksek seviye (şablon) | Uygulama |
| **Kullanım** | Manuel implementation | Hızlı başlangıç | Production-ready |

### 📊 Katman Yapısı

```
┌─────────────────────────────────────┐
│   AGDP Trend Scout (Bizim Proje)   │  ← Özel ajan uygulaması
├─────────────────────────────────────┤
│   OpenClaw Framework                │  ← Ajan geliştirme şablonu
├─────────────────────────────────────┤
│   Virtuals ACP (Protocol)           │  ← Ticaret kuralları
├─────────────────────────────────────┤
│   Base Chain (Blockchain)           │  ← Altyapı
└─────────────────────────────────────┘
```

### 🎯 Bizim Projemiz Nerede?

**AGDP Trend Scout = OpenClaw ACP uyumlu özel bir ajan**

- ✅ OpenClaw'ın **Goal-Task** yapısını kullanıyor
- ✅ Virtuals ACP **standartlarına uygun** yazıldı
- ✅ Base Chain wallet entegrasyonu **hazır** (placeholder)
- ⚠️ **Henüz blockchain'e deploy edilmedi** (lokal çalışıyor)

**Şu anki durum:** Standalone çalışan, ileride Virtuals ekosistemine entegre edilebilecek bir ajan.

---

## 3️⃣ Projeyi Çalıştırma

### 🔧 Adım 1: Terminali Aç

**Windows:**
1. `Win + R` tuşuna bas
2. `cmd` veya `powershell` yaz
3. Enter'a bas

### 📂 Adım 2: Proje Klasörüne Git

```bash
# Ana klasöre git
cd d:\new-virtual-agent\projects\agdp-trend-scout
```

**Doğru yerdesin mi kontrol et:**
```bash
# Windows
dir

# Görmek istediğin dosyalar:
# - package.json
# - src/
# - .env
```

### ⚙️ Adım 3: Konfigürasyon (İlk Kez)

`.env` dosyasını aç (Not Defteri veya VS Code ile):

```env
# ZORUNLU (varsayılan değerler zaten ayarlı)
AGDP_LEADERBOARD_URL=https://agdp.io/leaderboard
SCRAPE_INTERVAL_MINUTES=30

# OPSİYONEL - Telegram (sonra ekleyeceğiz)
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# OPSİYONEL - Base Chain (gelecek için placeholder)
BASE_RPC_URL=https://mainnet.base.org
WALLET_PRIVATE_KEY=
```

**Şimdilik hiçbir şey değiştirme!** Telegram olmadan da çalışır.

### 🚀 Adım 4: İLK ÇALIŞTIRMA (Tek Tarama)

```bash
npm run dev -- --once
```

**Ne olacak:**
1. Playwright browser açılacak (görmezsin, headless)
2. AGDP.io'ya gidip veri çekecek
3. `data/current_ranks.json` dosyasına kaydedecek
4. "First scan detected. Establishing baseline..." yazacak
5. Kapanacak

**Süre:** ~10-15 saniye

### 🔄 Adım 5: İKİNCİ ÇALIŞTIRMA (Karşılaştırma)

```bash
# 5 dakika bekle (gerçek hayatta değişim olsun diye)
# Sonra tekrar çalıştır:
npm run dev -- --once
```

**Bu sefer:**
1. Eski veriyle yeni veriyi karşılaştıracak
2. High Momentum, Breakout, Elite Performance raporları gösterecek
3. Renkli çıktı verecek

### ♾️ Adım 6: SÜREKLİ İZLEME (Cognitive Loop)

```bash
npm run dev
```

**Ne yapar:**
- Her 30 dakikada bir otomatik tarama
- Sürekli çalışır (durdurmak için: `CTRL + C`)
- Arka planda izlemeye devam eder

**Kullanım senaryosu:** Bilgisayarını açık bırakırsan 7/24 izlemeye devam eder.

---

## 4️⃣ Telegram Entegrasyonu

### 🤖 Adım 1: Telegram Bot Oluştur

#### 1.1 Telegram'ı Aç
- Mobil veya masaüstü uygulama

#### 1.2 BotFather'ı Bul
- Arama çubuğuna `@BotFather` yaz
- **Mavi tıklı** olan (resmi) BotFather'ı seç

#### 1.3 Yeni Bot Oluştur

Mesaj gönder:
```
/newbot
```

BotFather soracak:
```
Alright, a new bot. How are we going to call it?
Please choose a name for your bot.
```

Cevap ver:
```
AGDP Trend Scout
```

Sonra username isteyecek (benzersiz olmalı):
```
Great! Now let's choose a username for your bot.
It must end in 'bot'. Like this, for example: TetrisBot or tetris_bot.
```

Cevap ver (benzersiz bir isim dene):
```
agdp_trend_scout_bot
```

**Not:** Eğer "already taken" derse farklı bir isim dene:
```
agdp_trend_scout_v2_bot
agdp_scout_123_bot
```

#### 1.4 TOKEN'ı Kaydet

BotFather şöyle bir mesaj gönderecek:
```
Done! Congratulations on your new bot.
You will find it at t.me/agdp_trend_scout_bot

Use this token to access the HTTP API:
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567

Keep your token secure and store it safely...
```

**ÖNEMLİ:** `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567` kısmını kopyala!

### 💬 Adım 2: Chat ID'ni Öğren

#### 2.1 Botunla Konuş
- BotFather'ın verdiği linke tıkla: `t.me/agdp_trend_scout_bot`
- `/start` mesajı gönder
- "Merhaba" gibi herhangi bir mesaj yaz

#### 2.2 Chat ID'yi Öğren

**Yöntem 1: userinfobot Kullan**
1. Telegram'da `@userinfobot` ara
2. Bota `/start` gönder
3. Senin `Id: 123456789` gibi bir sayı gösterecek → Bu senin Chat ID'n

**Yöntem 2: Web API Kullan**
1. Tarayıcıda şu adresi aç (TOKEN'ı değiştir):
```
https://api.telegram.org/bot1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567/getUpdates
```

2. Çıktıda şöyle bir yer ara:
```json
"chat": {
  "id": 987654321,
  "first_name": "Senin Adın",
  "username": "seninusername",
  "type": "private"
}
```

`987654321` senin Chat ID'n.

### ⚙️ Adım 3: .env Dosyasını Güncelle

`.env` dosyasını aç ve şunları ekle:

```env
# Telegram Bot (ARTIK AKTİF!)
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567
TELEGRAM_CHAT_ID=987654321
```

**Gerçek değerleri kullan!** Yukarıdakiler örnek.

### ✅ Adım 4: Test Et

```bash
npm run dev -- --once
```

**Başarılı olursa:**
- Konsola: `✓ Report sent to Telegram` yazacak
- Telegram'dan bildirim gelecek (rapor mesajı)

**Hata alırsan:**
- Token yanlış → BotFather'dan kontrol et
- Chat ID yanlış → userinfobot'tan kontrol et
- Bota mesaj atmadın → Bota `/start` gönder

---

## 5️⃣ Virtuals Protocol'e Entegrasyon

### 🎯 Şu Anki Durum

**Bizim ajan:** Lokal çalışıyor (bilgisayarında)

```
┌─────────────────────┐
│  AGDP Trend Scout   │  ← Sadece senin bilgisayarında
│  (Lokal)            │
└─────────────────────┘
```

**Hedef durum:** Virtuals ekosisteminde

```
┌─────────────────────────────────┐
│  Virtuals Protocol Ecosystem    │
│  ┌───────────────┐              │
│  │ AGDP Scout    │ ←→ Diğer     │
│  │ (Blockchain)  │    Ajanlar   │
│  └───────────────┘              │
└─────────────────────────────────┘
```

### 📋 Entegrasyon Adımları (İleriye Dönük)

#### ✅ TAMAMLANMIŞ (Proje Hazır)

1. **Ajan Kodlama** ✓
   - Goal-Task mimarisi implementi
   - Cognitive loop hazır
   - Modüler yapı

2. **Wallet Entegrasyonu (Placeholder)** ✓
   - Ethers.js kurulu
   - Base Chain RPC konfigüre
   - Transaction fonksiyonları hazır

#### 🔜 YAPILACAKLAR (Blockchain'e Deploy)

##### Adım 1: Base Chain Wallet Oluştur

**1.1 MetaMask Kur**
- [metamask.io](https://metamask.io) → İndir
- Cüzdan oluştur
- **Seed phrase'i güvenli sakla!**

**1.2 Base Network Ekle**

MetaMask'ta:
1. Ağlar → Ağ Ekle
2. Manuel olarak ekle:
   - **Network Name:** Base Mainnet
   - **RPC URL:** `https://mainnet.base.org`
   - **Chain ID:** 8453
   - **Currency Symbol:** ETH
   - **Block Explorer:** `https://basescan.org`

**1.3 Test Fonları Al (Testnet için)**

Alternatif: Base Sepolia (testnet) kullan:
- **RPC URL:** `https://sepolia.base.org`
- **Chain ID:** 84532
- Faucet: [base-faucet.com](https://www.base.org/ecosystem?tag=faucet)

##### Adım 2: Private Key'i Proje'ye Ekle

**⚠️ GÜVENLİK UYARISI:** Asla gerçek parayla deneme, testnet kullan!

```env
# .env dosyasına ekle
WALLET_PRIVATE_KEY=0xsenin_private_keyin_buraya

# Private Key'i MetaMask'tan alma:
# 1. Hesap detayları → Üç nokta menü
# 2. "Private Key'i Dışa Aktar"
# 3. Şifreni gir
# 4. Kopyala → .env'ye yapıştır
```

##### Adım 3: Virtuals ACP Contract Deployment

**Seçenek 1: Manuel Deployment**

```bash
# Contract oluştur (Solidity bilgisi gerekli)
# Örnek contract: OpenClaw GitHub'ından al
# Base testnet'e deploy et
```

**Seçenek 2: Virtuals Marketplace**

1. [virtuals.io](https://www.virtuals.io) → Git
2. "Create Agent" → Tıkla
3. Ajanını tanımla
4. Contract otomatik deploy edilir

##### Adım 4: Contract Adresini Ekle

```env
# .env dosyasına ekle
CONTRACT_ADDRESS=0xsenin_contract_adresin
```

##### Adım 5: On-Chain İşlemler Aktif Et

Şu anki `acpAgent.ts` dosyası **placeholder** durumda. Gerçek kullanım için:

```typescript
// Örnek: Başka bir ajana ödeme yap
async payForService(serviceAgentAddress: string, amount: string) {
  const tx = await this.executeTransaction(
    serviceAgentAddress,
    amount
  );
  return tx;
}
```

### 🏪 Virtuals Marketplace'e Ekleme

**Gereksinimler:**
1. ✅ Çalışan ajan kodu (bizde var)
2. 🔜 Base Chain'de deploy edilmiş contract
3. 🔜 Agent metadata (isim, açıklama, logo)
4. 🔜 Virtuals Protocol doğrulaması

**Süreç:**
1. Virtuals.io'ya kayıt ol
2. Agent submission form doldur
3.審核 (inceleme) süreci (1-2 hafta)
4. Onaylanırsa marketplace'te yayınlanır

---

## 6️⃣ Sorun Giderme

### ❌ Hata: "Playwright browser bulunamadı"

**Çözüm:**
```bash
npx playwright install chromium
```

### ❌ Hata: "No data fetched"

**Sebep:** AGDP.io site yapısı değişmiş

**Çözüm:**
1. [agdp.io/leaderboard](https://agdp.io/leaderboard) → Tarayıcıda aç
2. Sağ tık → "İncele" → Elements sekmesi
3. Tablo yapısını kontrol et
4. `src/modules/dataFetcher.ts` → Selector'ları güncelle

### ❌ Hata: "Telegram send failed"

**Kontrol Listesi:**
- [ ] Token doğru mu? (BotFather'dan kontrol et)
- [ ] Chat ID doğru mu? (userinfobot'tan kontrol et)
- [ ] Bota `/start` gönderdin mi?
- [ ] İnternet bağlantın var mı?

### ❌ Hata: "Cannot find module"

**Çözüm:**
```bash
# Bağımlılıkları tekrar kur
rm -rf node_modules
npm install
```

---

## 📊 Özet: Nerede Duruyoruz?

### ✅ TAMAMLANDI

| Özellik | Durum | Açıklama |
|---------|-------|----------|
| Ajan Kodu | ✅ | Tam fonksiyonel |
| Lokal Çalıştırma | ✅ | `npm run dev` ile çalışır |
| Telegram Entegrasyonu | ✅ | Bot kurulumu yapılabilir |
| OpenClaw Uyumluluğu | ✅ | Goal-Task yapısı hazır |
| Base Wallet Placeholder | ✅ | Kod hazır, aktif değil |

### 🔜 GELECEKTEKİ ADIMLAR

| Özellik | Durum | Gerekli |
|---------|-------|---------|
| Base Chain Wallet | 🔜 | MetaMask + Private Key |
| Smart Contract Deployment | 🔜 | Solidity bilgisi veya Virtuals.io |
| On-Chain İşlemler | 🔜 | Test ETH (testnet) |
| Marketplace Listeleme | 🔜 | Virtuals doğrulaması |

---

## 🎓 Sonuç

### Sen Şu Anda Neye Sahipsin?

**OpenClaw ACP uyumlu, tamamen fonksiyonel bir AI ajanı!**

- ✅ Lokal olarak çalışıyor
- ✅ AGDP.io'yu izliyor
- ✅ Trend analizi yapıyor
- ✅ Telegram bildirimleri gönderiyor
- ⚠️ Henüz blockchain'de değil (ama hazır!)

### Blockchain'e Geçiş Ne Zaman?

**Seçenekler:**

1. **Şimdi Devam:** Önce lokal olarak kullan, trendleri takip et
2. **Sonra Blockchain:** Base testnet'te deneme yap
3. **Gelecekte Production:** Virtuals marketplace'e ekle

### Önerilen Rota

```
1. ŞİMDİ: Telegram ile lokal kullan (1 hafta test)
           ↓
2. SONRA: Base testnet entegrasyonu (öğrenme)
           ↓
3. İLERİDE: Mainnet + Virtuals marketplace (production)
```

---

## 📞 Yardım Lazımsa

1. **Lokal Çalıştırma:** Bu rehberdeki Adım 3'e bak
2. **Telegram:** Adım 4'teki adımları takip et
3. **Blockchain:** Önce testnet'te dene, gerçek para harcama

**Not:** Blockchain entegrasyonu opsiyonel! Ajan şu haliyle tamamen kullanılabilir.

---

**Başarılar! 🚀 Sorular için buraya yazabilirsin.**
