# API Integration Guide

## Overview

AGDP Trend Scout artık **Virtuals API**'yi kullanarak leaderboard verilerini çekiyor. Bu, önceki Playwright tabanlı web scraping yöntemine göre çok daha hızlı, güvenilir ve stabil.

---

## API Endpoint

**Base URL:**
```
https://api.virtuals.io/api/agdp-leaderboard-epochs/{EPOCH}/ranking
```

**Parameters:**
- `{EPOCH}`: Haftalık epoch numarası (ör: 4, 5, 6...)
- `pagination[pageSize]`: Tek seferde alınacak agent sayısı (max: 1000)

**Example:**
```
https://api.virtuals.io/api/agdp-leaderboard-epochs/4/ranking?pagination[pageSize]=1000
```

---

## Epoch Management

### Epoch Nedir?
Epoch, Virtuals Protocol'ün haftalık dönemleridir. Her hafta yeni bir epoch başlar ve leaderboard sıfırlanır.

**Önemli:**
- Her epoch **1 hafta** sürer
- Yeni epoch başladığında numara **+1 artar**
- Epoch numarası `AGDP_API_EPOCH` env variable ile kontrol edilir

### Epoch Değişimi

#### 1. Manuel Güncelleme (.env dosyası)
```env
AGDP_API_EPOCH=5
```

#### 2. Programatik Güncelleme (Kod içinde)
```typescript
import { DataFetcher } from './modules/dataFetcher.js';

const fetcher = new DataFetcher();

// Mevcut epoch'u öğren
console.log(fetcher.getCurrentEpoch()); // 4

// Epoch'u manuel olarak ayarla
fetcher.setEpoch(5);

// Epoch'u artır (otomatik geçiş için)
fetcher.incrementEpoch(); // 5 -> 6

// Epoch'u azalt (geçmiş verilere bakmak için)
fetcher.decrementEpoch(); // 6 -> 5
```

---

## API Response Structure

API'den gelen yanıt şu yapıya sahip:

```json
{
  "data": [
    {
      "agentId": 12381,
      "agentName": "Hyperbet",
      "agentWalletAddress": "0x...",
      "tokenAddress": "0x...",
      "rank": 1,
      "agentScore": 4643.84,
      "totalRevenue": 12110,
      "successRate": 81.27,
      "successfulJobCount": 3649,
      "uniqueBuyerCount": 205,
      "virtual": { /* ... */ }
    },
    // ... more agents
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 1000,
      "pageCount": 5,
      "total": 5000
    }
  }
}
```

### Kullanılan Alanlar

Trend Scout aşağıdaki alanları kullanıyor:

| Field | Type | Description |
|-------|------|-------------|
| `rank` | number | Agent'ın sıralaması |
| `agentName` | string | Agent'ın adı |
| `agentScore` | number | AGDP skoru (velocity hesabı için kritik) |
| `totalRevenue` | number | Toplam gelir ($) |
| `successRate` | number | Başarı oranı (%) |
| `uniqueBuyerCount` | number | Benzersiz alıcı sayısı |
| `agentId` | number | Unique agent ID |
| `tokenAddress` | string | Token contract adresi |

---

## Test & Debugging

### 1. API Bağlantısını Test Et

```bash
cd projects/agdp-trend-scout
npm run test
```

Bu komut:
- ✅ API'ye bağlanır
- ✅ Mevcut epoch'tan verileri çeker
- ✅ İlk 10 agent'ı gösterir
- ✅ Epoch yönetim fonksiyonlarını test eder

### 2. Farklı Epoch'ları Keşfet

```bash
# .env dosyasını düzenle
AGDP_API_EPOCH=3  # Geçmiş epoch
```

```bash
npm run test
```

---

## Environment Variables

`.env` dosyasında API ile ilgili değişkenler:

```env
# API Configuration
AGDP_API_URL=https://api.virtuals.io/api/agdp-leaderboard-epochs
AGDP_API_EPOCH=4
API_PAGE_SIZE=1000
```

**Önemli Notlar:**
- `AGDP_API_EPOCH`: Şu anki aktif epoch (her hafta güncellenmelidir)
- `API_PAGE_SIZE`: Tek çağrıda alınacak max agent sayısı (1000 önerilir)

---

## Playwright Kaldırıldı

Önceki sürümlerde Playwright kullanılıyordu, ancak artık:

**❌ Kaldırılan:**
- Playwright dependency
- Web scraping mantığı
- Browser automation
- Screenshot debugging

**✅ Eklenen:**
- Native `fetch` API
- Temiz JSON response parsing
- Daha hızlı veri çekme
- Daha düşük kaynak kullanımı

---

## Velocity Analysis İçin Epoch Stratejisi

Trend analizi yapmak için farklı epoch'ların verilerini karşılaştırabilirsin:

### Örnek: 24 Saatlik Velocity

```typescript
// Epoch 4 (şimdiki hafta)
fetcher.setEpoch(4);
const currentData = await fetcher.fetchLeaderboard();

// Epoch 3 (geçen hafta)
fetcher.setEpoch(3);
const previousData = await fetcher.fetchLeaderboard();

// Karşılaştır ve velocity hesapla
```

**Not:** Eğer 24 saatlik değişim istiyorsan ve epoch haftalık değişiyorsa, aynı epoch içinde state dosyalarını kullanman gerekir (`current_ranks.json` ve `previous_ranks.json`).

---

## Troubleshooting

### Problem: "API request failed with status 404"
**Çözüm:** Epoch numarası muhtemelen yanlış veya henüz o epoch başlamamış.
```bash
# .env dosyasında epoch'u kontrol et veya azalt
AGDP_API_EPOCH=4
```

### Problem: "Invalid API response structure"
**Çözüm:** API şeması değişmiş olabilir. Console'da tam yanıtı kontrol et:
```typescript
console.log(JSON.stringify(apiData, null, 2));
```

### Problem: Yavaş yanıt süresi
**Çözüm:** `API_PAGE_SIZE`'ı azalt:
```env
API_PAGE_SIZE=500  # Default: 1000
```

---

## Sonuç

API entegrasyonu sayesinde:

✅ **10x daha hızlı** veri çekme  
✅ **Daha güvenilir** veri kalitesi  
✅ **Daha az kaynak** kullanımı (browser gereksiz)  
✅ **Epoch bazlı** tarihsel analiz  

Artık agent'ın velocity tracking yapması çok daha sağlam!
