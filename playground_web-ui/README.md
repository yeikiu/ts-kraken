# ts-kraken API Playground

An interactive web-based UI for testing and exploring all Kraken API methods.

## Features

- **REST API Testing**: Test all public and private REST endpoints
- **WebSocket Support**: Subscribe to public and private WebSocket channels
- **Dynamic Forms**: Auto-generated forms based on method parameters
- **Terminal Output**: Real-time logging of requests and responses
- **Quick Actions**: One-click shortcuts for common operations
- **Authentication**: Secure session-based API credential storage

## Getting Started

### From Root Directory

```bash
npm run watch:web-ui
```

This will install dependencies (if needed) and start the development server.

### From playground_web-ui Directory

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Authentication

1. Click the "Not Authenticated" button in the top-right corner
2. Enter your Kraken API Key and Secret
3. Credentials are stored in session storage only (cleared on browser close)

**Note**: Only public methods are available without authentication.

### Testing API Methods

1. **Browse Methods**: Use the sidebar to navigate available methods
2. **Fill Parameters**: Complete the auto-generated form for your selected method
3. **Execute**: Click "Execute" to run the API call
4. **View Results**: Check the terminal output at the bottom for responses

### Quick Actions

Quick Actions provide one-click access to common operations:

**Monitoring**:
- Show Balances
- Show Open Orders
- Recent Trades
- Price Ticker
- Order Book
- Server Time

**Trading** (requires authentication):
- Sell All to Market
- Quick Buy
- Quick Limit Order

**Management** (requires authentication):
- Cancel All Orders
- Set Cancel Timer

## Architecture

- **Frontend**: Svelte 5 + TypeScript
- **Styling**: SCSS (no framework)
- **Build Tool**: Vite
- **State Management**: Svelte 5 Runes
- **API Client**: Browser-native fetch with HMAC signature generation

## Project Structure

```
playground_web-ui/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Sidebar.svelte          # Navigation
│   │   │   ├── MethodForm.svelte       # Dynamic form generator
│   │   │   ├── Terminal.svelte         # Output logging
│   │   │   ├── QuickActions.svelte     # Quick action shortcuts
│   │   │   └── AuthSettings.svelte     # API credentials
│   │   ├── stores/
│   │   │   └── app-state.svelte.ts     # Global state
│   │   ├── kraken-client.ts            # API wrapper
│   │   └── method-definitions.ts       # API method metadata
│   ├── types/
│   │   └── ui-types.ts                 # TypeScript types
│   ├── App.svelte                      # Main layout
│   ├── main.ts                         # Entry point
│   └── app.scss                        # Global styles
└── package.json
```

## Security Notes

- API credentials are stored in `sessionStorage` only
- Credentials are cleared when the browser is closed
- Never commit or share your API keys
- HMAC signatures are generated client-side using Web Crypto API

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Browser Requirements

- Modern browser with ES2020+ support
- Web Crypto API support (all modern browsers)
- WebSocket support for real-time subscriptions
