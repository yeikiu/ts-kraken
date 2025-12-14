# Asset Pair Mapping for Kraken API

## Overview

Kraken's API uses specific internal formats for asset pairs that differ from the user-friendly formats displayed in the UI. This document explains the mapping system implemented in the web-ui.

## The Problem

When users enter asset pairs in user-friendly formats like `BTC/USD` or `XBT/EUR`, Kraken's REST API requires these to be in its internal format (e.g., `XXBTZUSD`, `XXBTZEUR`). If you send `BTC/USD` directly to many endpoints, you'll receive an "invalid pair" error.

## Kraken's Asset Naming Convention

Kraken uses prefixes to distinguish between asset types:

### X Prefix - Cryptocurrencies
- **BTC** → **XXBT** (Bitcoin uses XBT ticker symbol)
- **XBT** → **XXBT**
- **ETH** → **XETH**
- **LTC** → **XLTC**
- **XRP** → **XXRP**
- **XLM** → **XXLM**
- **XMR** → **XXMR**
- **DOGE/XDG** → **XXDG**

### Z Prefix - Fiat Currencies
- **USD** → **ZUSD**
- **EUR** → **ZEUR**
- **GBP** → **ZGBP**
- **JPY** → **ZJPY**
- **CAD** → **ZCAD**
- **CHF** → **ZCHF**
- **AUD** → **ZAUD**

### No Prefix - Modern Assets
Most modern cryptocurrencies don't need any prefix transformation:
- **KTA** (Keetah) - stays as "KTA"
- **PEPE** - stays as "PEPE"
- **ADA** (Cardano) - stays as "ADA"
- **DOT** (Polkadot) - stays as "DOT"
- **SOL** (Solana) - stays as "SOL"
- **MATIC** (Polygon) - stays as "MATIC"
- **And hundreds more...**

**Important**: The mapping only includes assets that **require** transformation.
If an asset isn't in the map, it's used as-is. This ensures new coins work automatically.

## Implementation

### 1. Normalization Utility (`src/lib/utils/pair-normalizer.ts`)

This utility provides low-level functions to convert between user-friendly and API formats:

```typescript
import { normalizePair, normalizePairList } from './utils/pair-normalizer';

// Legacy assets - get transformed
normalizePair('BTC/USD')     // → 'XXBT/ZUSD'
normalizePair('ZEC/USD')     // → 'XZEC/ZUSD'
normalizePair('ETH/EUR')     // → 'XETH/ZEUR'

// Modern assets - stay as-is
normalizePair('KTA/USD')     // → 'KTA/ZUSD'  (only USD gets Z prefix)
normalizePair('PEPE/EUR')    // → 'PEPE/ZEUR' (only EUR gets Z prefix)
normalizePair('ADA/USD')     // → 'ADA/ZUSD'  (only USD gets Z prefix)
normalizePair('SOL/USDC')    // → 'SOL/USDC'  (both stay as-is)

// Multiple pairs
normalizePairList('BTC/USD,KTA/EUR')  // → 'XXBT/ZUSD,KTA/ZEUR'
```

### 2. Centralized Normalization in KrakenClient (`src/lib/kraken-client.ts`)

**All REST API requests automatically normalize pair parameters** - you don't need to do anything!

The `KrakenClient` class uses a **3-tier priority system**:

#### Priority 1: AssetPairs API Mapping (Source of Truth)
- Checks if the pair exists in the mapping fetched from AssetPairs API
- If found, uses the exact API key from Kraken
- **This is why modern coins work automatically** - they're in the API mapping

#### Priority 2: Legacy Transformations (Fallback)
- If pair not found in API mapping, applies legacy transformations
- BTC → XXBT, USD → ZUSD, EUR → ZEUR, etc.
- Only applies to assets explicitly defined in `ASSET_MAP`

#### Priority 3: Format Conversion
- Removes slash separator for API format
- E.g., "KTA/USD" → "KTAUSD"

This priority system ensures:
- ✅ Modern coins (KTA, PEPE, etc.) use Kraken's exact API format
- ✅ Legacy coins (BTC, ETH, etc.) get transformed correctly
- ✅ Fiat currencies get Z prefix where needed
- ✅ Parameters named `pair`, `symbol`, or containing `pair` are auto-detected
- ✅ WebSocket calls are NOT affected (they use wsname format)

```typescript
import { KrakenClient } from './kraken-client';

const client = new KrakenClient();

// User enters "BTC/USD" - automatically normalized to "XXBTZUSD"
await client.publicRest('Ticker', { pair: 'BTC/USD' });

// User enters "ZEC/USD,ETH/EUR" - automatically normalized to "XZECZUSD,XETHZEUR"
await client.publicRest('Ticker', { pair: 'ZEC/USD,ETH/EUR' });

// WebSocket calls NOT affected - they use wsname format
client.listenPublic('ticker', { symbol: ['BTC/USD'] }); // ← No normalization
```

### 3. AssetPairs State (`src/lib/stores/app-state.svelte.ts`)

The `AssetPairsState` class:
- Fetches the AssetPairs mapping on app initialization
- Shares the mapping with `KrakenClient` via static method
- All future REST API calls use this mapping automatically

```typescript
// On app initialization
await assetPairsState.fetchPairs();
// ↓ Automatically calls KrakenClient.setGlobalPairMapping(mapping)
// ↓ Now ALL KrakenClient instances normalize pairs automatically
```

## AssetPairs Response Format

The AssetPairs endpoint returns data in this format:

```json
{
  "XXBTZUSD": {
    "altname": "XBTUSD",
    "wsname": "XBT/USD",
    "base": "XXBT",
    "quote": "ZUSD",
    ...
  }
}
```

Where:
- **Key** (`XXBTZUSD`): The internal API identifier used in most endpoints
- **altname**: Alternative shorter name
- **wsname**: WebSocket-friendly format with `/` separator (what users see)
- **base/quote**: The individual asset codes

## Usage Examples

### Example 1: Querying Asset Pairs (REST)

```typescript
// User enters: "BTC/USD"
// KrakenClient automatically normalizes to: "XXBTZUSD"
await client.publicRest('AssetPairs', { pair: 'BTC/USD' });
```

### Example 2: Getting Ticker Data (REST)

```typescript
// User enters: "BTC/USD,ETH/EUR"
// KrakenClient automatically normalizes to: "XXBTZUSD,XETHZEUR"
await client.publicRest('Ticker', { pair: 'BTC/USD,ETH/EUR' });
```

### Example 3: Placing an Order with Legacy Asset (REST - Private)

```typescript
// User enters: "ZEC/USD" (legacy asset)
// KrakenClient automatically normalizes to: "XZECZUSD"
await client.privateRest('AddOrder', {
  pair: 'ZEC/USD',
  type: 'buy',
  ordertype: 'market',
  volume: '1.5'
});
```

### Example 4: Placing an Order with Modern Asset (REST - Private)

```typescript
// User enters: "KTA/USD" (modern asset)
// KrakenClient automatically normalizes to: "KTAZUSD"
// (Only USD gets Z prefix, KTA stays as-is)
await client.privateRest('AddOrder', {
  pair: 'KTA/USD',
  type: 'buy',
  ordertype: 'market',
  volume: '100'
});
```

### Example 5: Modern Asset Pair (No Transformation)

```typescript
// User enters: "PEPE/USDC" (both modern assets)
// KrakenClient keeps as: "PEPEUSDC"
// (Neither asset needs transformation)
await client.publicRest('Ticker', {
  pair: 'PEPE/USDC'
});
```

### Example 6: WebSocket Subscriptions (No Normalization)

WebSocket endpoints use the wsname format (with `/`), so normalization is NOT applied:

```typescript
// WebSocket uses wsname format directly - NO normalization applied
client.listenPublic('ticker', { symbol: ['BTC/USD', 'KTA/EUR', 'PEPE/USDC'] });
// ↑ These stay as "BTC/USD", "KTA/EUR", "PEPE/USDC" (wsname format)
```

## Flow Diagram

```
┌─────────────────┐
│  App Starts     │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ AssetPairs.fetchPairs()             │
│ - Calls AssetPairs API              │
│ - Builds wsname → API key mapping   │
│ - Sets global mapping in            │
│   KrakenClient.setGlobalPairMapping │
└────────┬────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│ User Makes REST Request                      │
│ Examples:                                    │
│ - "BTC/USD" (legacy)                         │
│ - "KTA/USD" (modern)                         │
└────────┬─────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│ KrakenClient.publicRest() or                 │
│ KrakenClient.privateRest()                   │
└────────┬─────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│ normalizePairsInParams()                     │
│ 3-Tier Priority System:                     │
└────────┬─────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│ PRIORITY 1: Check AssetPairs API Mapping    │
│                                              │
│ "KTA/USD" found in mapping?                  │
│ → YES: Use exact API key "KTAUSD"            │
│                                              │
│ "BTC/USD" found in mapping?                  │
│ → NO: Continue to Priority 2                │
└────────┬─────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│ PRIORITY 2: Apply Legacy Transformations    │
│                                              │
│ "BTC/USD" → "XXBT/ZUSD"                      │
│ Check mapping again for "XXBT/ZUSD"          │
│ → Found: Use API key "XXBTZUSD"              │
└────────┬─────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│ PRIORITY 3: Format Conversion                │
│                                              │
│ If still not found, remove slash:            │
│ "XXBT/ZUSD" → "XXBTZUSD"                     │
└────────┬─────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│ Send to Kraken API                           │
│ Modern: { pair: "KTAUSD" }                   │
│ Legacy: { pair: "XXBTZUSD" }                 │
└──────────────────────────────────────────────┘
```

## When Normalization Happens

1. **On App Initialization**: AssetPairs API is called, mapping is built and shared globally
2. **On Every REST API Call**: KrakenClient automatically normalizes pair parameters
3. **WebSocket Calls**: No normalization (uses wsname format with `/` separator)

## Extending the Mapping

To add new asset mappings, edit `src/lib/utils/pair-normalizer.ts` and update the `ASSET_MAP`:

```typescript
const ASSET_MAP: Record<string, string> = {
  // Add new mappings here
  'NEWCOIN': 'XNEWCOIN',  // Crypto
  'NEWFIAT': 'ZNEWFIAT',  // Fiat
};
```

## Testing

You can test the normalization manually in the browser console:

```javascript
// After the app loads
import { assetPairsState } from './stores/app-state.svelte';
assetPairsState.normalizePairForAPI('BTC/USD');  // Should return the API format
```

## References

- [Kraken API - AssetPairs Endpoint](https://docs.kraken.com/api/docs/rest-api/get-tradable-asset-pairs)
- [Kraken API - Symbols and Tickers](https://support.kraken.com/hc/en-us/articles/360000920306-API-symbols-and-tickers)
