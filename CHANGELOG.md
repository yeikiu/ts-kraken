# ts-kraken

> All major changes will be added to this file top-to-bottom

- ### v6.0.0

    > ⚠️ No runtime behaviour changes (besides the browser-safe `RetrieveExport`), but the type corrections below are compile-time **breaking** for TypeScript consumers — hence the major bump: several `Result` fields changed shape, and conditionally-returned fields are now optional (add null-checks under `strictNullChecks`).

    - #### breaking type fixes:
        - Full audit of every REST endpoint `Result` type against the official Kraken API docs; fixed shape bugs:
            - `Depth`: `asks`/`bids` corrected from a single tuple to an **array** of `[price, volume, timestamp]` tuples.
            - `Trades` (public): trade tuples gain the missing 7th element `trade_id` (number).
            - `CancelAll`: `pending` corrected from `number` to `boolean`.
            - `AddOrderBatch`: per-order `txid` corrected from `string[]` to `string`; `txid`/`descr`/`error` now optional (success vs failure items); removed undocumented `close` field.
            - `ClosedOrders`: added missing `count` field to the result.
            - `Ledgers`/`QueryLedgers`: ledger entry `type` enum corrected (`withdraw` → `withdrawal`) and extended with the missing documented values (`credit`, `staking`, `reward`, `dividend`, `sale`, `conversion`, `nfttrade`, `nftcreatorfee`, `nftrebate`, `custodytransfer`, `none`); shared `RestLedgerEntry` type; fixed `Ledgers.Params.type` typo (`tarde` → `trade`).
        - Added missing documented fields: `margin_rate` (Assets), `execution_venue`/`lot` (AssetPairs), `mfo` (TradeBalance), `class` (OpenPositions), `inputs`/`asset_class`/`volume_subaccounts`/`schedules` (TradeVolume), `error`/`endtm`/`asset_classes`/`delete` + deprecated fields (ExportStatus), `aclass`/`tradeordertype` (QueryTrades), `time_in_force`/`descr.aclass` + `iceberg`/`trailing-stop`/`trailing-stop-limit` order types (shared order model).
        - Corrected optionality across private endpoints: fields Kraken only returns conditionally are now optional (`BalanceEx.credit*`, `TradeBalance.ml/uv`, `OpenPositions.value/net`, closed-position fields in `QueryTrades`/`TradesHistory`, `TradeVolume.fees*`, `ExportStatus` fields, `RemoveExport.delete/cancel` (mutually exclusive), `AddOrder.descr.close`, most `EditOrder` fields, `trades`/`trigger`/`margin`/etc. in the order model).
        - Request `Params` brought up to date with the docs: `Assets.asset` now optional; new `assetVersion` (Assets/AssetPairs), `aclass_base`/`execution_venue` (AssetPairs), `fee_schedule`/`rebase_multiplier` (TradeVolume) params; `Ledgers.Params.type` extended with the missing documented values (`transfer`, `adjustment`, `rollover`, `credit`, `settled`, `staking`, `dividend`, `sale`, `nft_rebate`).
        - `QueryOrders` now reuses the shared `RestOpenOrder` model (plus `closetm`/`reason` for closed orders) instead of a drifted inline copy.
        - `RetrieveExport` made browser-safe: the ZIP sniffing no longer requires Node's `Buffer` (uses `Uint8Array`/`TextDecoder`); returns a `Buffer` in Node and a plain `Uint8Array` in browsers (`Result` type is now `Uint8Array`). Malformed non-ZIP/non-JSON responses now throw a descriptive error instead of a raw `SyntaxError`.

- ### v5.0.8

    - #### hotfix:
        - Fixed `RetrieveExport`: the endpoint returns a binary ZIP archive, not the usual JSON envelope. `privateRestRequest` now requests it as an `arraybuffer` and returns the raw bytes as a `Buffer` (ready to `writeFileSync` straight to a `.zip`). Kraken-reported errors (invalid/expired export `id`, etc.) are still surfaced as thrown `Error`s by sniffing the response for the ZIP magic bytes.
        - `RetrieveExport.Result` type corrected from `DataView` to `Buffer` to match the actual runtime value.

- ### v5.0.0

    - #### features:
        - **Browser Support**: Full browser compatibility with automatic environment detection
            - Uses Web Crypto API (`crypto.subtle`) in browsers
            - Uses native `crypto` module in Node.js
            - Zero configuration required - works seamlessly in both environments
        - **Web Playground**: New browser-based API testing interface
            - Interactive UI for testing all REST & WebSocket endpoints
            - Quick Actions for common operations
            - Live terminal output with formatted responses
            - Session-only credential storage for security
            - Accessible via `npm run watch:web-ui`

    - #### technical:
        - New files:
            - `src/api/rest/private/message_signature_browser.ts` - Browser-compatible HMAC implementation
            - `src/util/is_browser.ts` - Runtime environment detection
            - Complete `playground_web-ui/` directory with Svelte + Vite stack
        - Modified core files for async signature generation (Web Crypto requirement)
        - Updated axios interceptors to handle async message signing

- ### v4.0.5

    - #### hotfix:
        - Fixed `getTickersPrices` helper method: The `pairs` param is optional now. Not passing it will default to all pairs available. 

- ### v4.0.4

    - #### features:
        - Added support for `AmendOrder` under REST and WS2 apis.

- ### v4.0.0

    - #### features:
        - Full support of WebsocketsV2
        - Internal rewrite of core functions and types
        - TypeDoc integration

- ### v3.1.0

    - #### features:
        - Major refactor of private and public Rest methods

- ### v3.0.24

    - #### features:
        - New WS Helper `getBookStream` to track latest asks and bids

- ### v3.0.21

    - #### features:
        - New REST `EditOrder` endpoint and WS event to edit volume and price on open orders

- ### v3.0.17

    - #### chore:
        - fix: audits

- ### v3.0.16

    - #### chore:
        - fix: actions workflows

- ### v3.0.14

    - #### chore:
        - 🏁 Updated libs:

            axios ^0.25.0 --> ^0.26.1
            dotenv ^14.3.0 --> ^16.0.0
            rxjs ^7.5.2 --> ^7.5.5
            ws ^8.4.2 --> ^8.5.0

        - 🏁 Updated DEV-libs:

            @types/node ^17.0.12 --> ^17.0.21
            @typescript-eslint/eslint-plugin ^5.10.1 --> ^5.15.0
            @typescript-eslint/parser ^5.10.1 --> ^5.15.0
            ts-node ^10.4.0 --> ^10.7.0
            typescript ^4.5.5 --> ^4.6.2
            
- ### v3.0.13

    - #### chore:
        - 🏁 Updated libs:

            axios ^0.24.0 --> ^0.25.0
            dotenv ^10.0.0 --> ^14.3.0
            qs ^6.10.2 --> ^6.10.3
            rxjs ^7.4.0 --> ^7.5.2
            ws ^8.3.0 --> ^8.4.2

        - 🏁 Updated DEV-libs:

            @types/node ^17.0.0 --> ^17.0.12
            @typescript-eslint/eslint-plugin ^5.7.0 --> ^5.10.1
            @typescript-eslint/parser ^5.7.0 --> ^5.10.1
            eslint-plugin-import ^2.25.3 --> ^2.25.4
            typescript ^4.5.4 --> ^4.5.5

- ### v3.0.12

    - #### feat:
        - Added `.find` repl-cli method

- ### v3.0.11

    - #### feat:
        - Added `openOrderPartialExec` stream

    - #### chore:
        - ts-standard code-linting script

- ### v3.0.10

    - #### chore:
        - Bumped actions/setup-node in npm job

- ### v3.0.9

    - #### chore:
        - Bumped most dependencies

    - #### fix:
        - Added eslint auto-indentation

- ### v3.0.7

    - #### feat:
        - Added `watchPairPrice` helper method

- ### v3.0.6

    - #### fix:
        - Add some more assets aliases to `getPairBalances` REST helper

- ### v3.0.5

    - #### feature:
        - `getSpreadStream` and `getTradesStream` WS Helpers

- ### v3.0.4

    - #### fix:
        - rename `preinstall` npm script into `fix:audit`
        - README repl examples

- ### v3.0.0

    - #### refactor:
        - Use only modules instead of namespaces

- ### v2.0.0

    - #### feature:
        - Types for all API endpoints and WS events

    - #### refactor:
        - Project internal structure/naming

- ### v1.0.0

    - #### feature:
        - MVP version covering API, WS and a repl to interact
