/**
 * Kraken uses specific prefixes for assets in their REST API:
 * - X prefix for cryptocurrencies (e.g., XBT, ETH, etc.)
 * - Z prefix for fiat currencies (e.g., USD, EUR, GBP, etc.)
 *
 * This utility normalizes user-friendly pair formats (e.g., "BTC/USD")
 * to Kraken's internal format (e.g., "XXBT/ZUSD") for API requests.
 */

/**
 * Map of asset symbols that REQUIRE transformation to Kraken's internal format
 * Based on Kraken's API documentation
 *
 * IMPORTANT: Only assets that need transformation are listed here.
 * Modern coins (KTA, PEPE, ADA, DOT, SOL, etc.) are NOT in this map and will be used as-is.
 * If an asset is not in this map, it will be returned unchanged.
 */
const ASSET_MAP: Record<string, string> = {
  // Bitcoin special case - Kraken uses XBT instead of BTC
  'BTC': 'XXBT',
  'XBT': 'XXBT',

  // Legacy cryptocurrencies with X prefix (these NEED transformation)
  'ETH': 'XETH',
  'LTC': 'XLTC',
  'XRP': 'XXRP',
  'XLM': 'XXLM',
  'XMR': 'XXMR',
  'XDG': 'XXDG',   // Dogecoin
  'DOGE': 'XXDG',
  'ZEC': 'XZEC',   // Zcash
  'REP': 'XREP',   // Augur
  'MLN': 'XMLN',   // Melon

  // Fiat currencies with Z prefix (these NEED transformation)
  'USD': 'ZUSD',
  'EUR': 'ZEUR',
  'GBP': 'ZGBP',
  'JPY': 'ZJPY',
  'CAD': 'ZCAD',
  'CHF': 'ZCHF',
  'AUD': 'ZAUD',

  // NOTE: Modern coins like KTA, PEPE, ADA, DOT, SOL, MATIC, AVAX, UNI, AAVE,
  // ALGO, FIL, TRX, XTZ, NEAR, APT, ARB, OP, USDT, USDC, DAI, etc.
  // are NOT listed here because they don't need transformation.
  // They will be used as-is (e.g., "KTA" stays "KTA", "PEPE" stays "PEPE")
};

/**
 * Normalizes a single asset symbol to Kraken's internal format
 * @param asset - Asset symbol (e.g., "BTC", "USD", "ETH")
 * @returns Kraken internal format (e.g., "XXBT", "ZUSD", "XETH")
 */
export function normalizeAsset(asset: string): string {
  const upperAsset = asset.trim().toUpperCase();

  // Check if we have a mapping for this asset
  if (ASSET_MAP[upperAsset]) {
    return ASSET_MAP[upperAsset];
  }

  // If no mapping exists, return as-is (asset might already be in correct format)
  return upperAsset;
}

/**
 * Normalizes a trading pair to Kraken's internal format
 * Handles formats: "BTC/USD", "BTCUSD", "BTC-USD"
 * @param pair - Trading pair string
 * @returns Normalized pair in format "XXBT/ZUSD"
 */
export function normalizePair(pair: string): string {
  if (!pair) return pair;

  const trimmed = pair.trim();

  // Handle slash separator: "BTC/USD" -> ["BTC", "USD"]
  if (trimmed.includes('/')) {
    const [base, quote] = trimmed.split('/');
    return `${normalizeAsset(base)}/${normalizeAsset(quote)}`;
  }

  // Handle dash separator: "BTC-USD" -> ["BTC", "USD"]
  if (trimmed.includes('-')) {
    const [base, quote] = trimmed.split('-');
    return `${normalizeAsset(base)}/${normalizeAsset(quote)}`;
  }

  // If no separator, try to split common patterns
  // This is a best-effort approach for formats like "BTCUSD"
  const upperPair = trimmed.toUpperCase();

  // Try to match known assets from our map
  for (const asset of Object.keys(ASSET_MAP)) {
    if (upperPair.startsWith(asset)) {
      const remainder = upperPair.slice(asset.length);
      if (ASSET_MAP[remainder]) {
        return `${normalizeAsset(asset)}/${normalizeAsset(remainder)}`;
      }
    }
  }

  // If we can't parse it, return as-is
  return trimmed;
}

/**
 * Normalizes a comma-separated list of pairs
 * @param pairs - Comma-separated pair list (e.g., "BTC/USD,ETH/EUR")
 * @returns Normalized comma-separated list (e.g., "XXBT/ZUSD,XETH/ZEUR")
 */
export function normalizePairList(pairs: string): string {
  if (!pairs) return pairs;

  return pairs
    .split(',')
    .map(p => normalizePair(p.trim()))
    .filter(p => p.length > 0)
    .join(',');
}

/**
 * Creates a reverse mapping from Kraken's internal format to user-friendly format
 * This is useful when displaying pairs to users
 * @param krakenPair - Pair in Kraken format (e.g., "XXBT/ZUSD")
 * @returns User-friendly format (e.g., "BTC/USD")
 */
export function denormalizePair(krakenPair: string): string {
  if (!krakenPair) return krakenPair;

  // Create reverse map
  const reverseMap: Record<string, string> = {};
  for (const [userFormat, krakenFormat] of Object.entries(ASSET_MAP)) {
    reverseMap[krakenFormat] = userFormat;
  }

  // Special case: prefer "BTC" over "XBT" for display
  reverseMap['XXBT'] = 'BTC';

  if (krakenPair.includes('/')) {
    const [base, quote] = krakenPair.split('/');
    const userBase = reverseMap[base.trim()] || base.trim();
    const userQuote = reverseMap[quote.trim()] || quote.trim();
    return `${userBase}/${userQuote}`;
  }

  return krakenPair;
}
