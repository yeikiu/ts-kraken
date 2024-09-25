export type BaseSubscription<T> = {
    method: 'subscribe';
    req_id?: number;
    params: T;
}

export type BaseUnsubscription<T> = {
    method: 'unsubscribe';
    req_id?: number;
    params: T;
}

/**
 * @ignore
 */
export namespace Status {
    export type Update = {
        channel: 'status';
        type: 'update';
        data: [
            {
                api_version: 'v2';
                connection_id: number;
                system: 'online' | 'cancel_only' | 'maintenance' | 'post_only';
                version: string;
            }
        ];
    };
}

/**
 * @ignore
*/
export namespace Heartbeat {
    export type Update = {
        channel: 'heartbeat';
    };
}
