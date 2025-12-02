import type { Subscription } from 'rxjs';

export type LogLevel = 'info' | 'success' | 'error' | 'warning';

export interface TerminalLog {
  id: string;
  timestamp: Date;
  level: LogLevel;
  message: string;
  data?: unknown;
}

export interface ApiCredentials {
  apiKey: string;
  apiSecret: string;
}

export interface MethodCategory {
  name: string;
  methods: MethodDefinition[];
}

export interface MethodDefinition {
  name: string;
  endpoint: string;
  type: 'rest-public' | 'rest-private' | 'ws-public' | 'ws-private' | 'ws-public-action' | 'ws-private-action';
  description: string;
  docsUrl: string; // Link to official Kraken API documentation
  params?: ParamDefinition[];
  supportsData?: boolean; // Whether this WebSocket method supports sending custom data
}

export interface ParamDefinition {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'asset-pairs' | 'assets' | 'asset' | 'asset-pair';
  required: boolean;
  description?: string;
  options?: string[];
  defaultValue?: string | number | boolean;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  category: 'trading' | 'monitoring' | 'management';
  action: () => Promise<void>;
}

export interface WebSocketSubscription {
  id: string;
  methodName: string;
  endpoint: string;
  params: Record<string, unknown>;
  subscription: Subscription;
  mode: 'snapshot' | 'listen';
}
