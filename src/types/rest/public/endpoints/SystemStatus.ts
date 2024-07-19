/* https://docs.kraken.com/rest/#tag/Spot-Market-Data/operation/getSystemStatus */

export type Endpoint = 'SystemStatus';

export type Result = {
    status: 'online' | 'maintenance' | 'cancel_only' | 'post_only';
    timestamp: string;
}
