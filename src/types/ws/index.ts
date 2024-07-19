export type BaseSubscription<T> = {
    method: "subscribe";
    req_id?: number;
    params: T;
}

export type BaseUnsubscription<T> = {
    method: "unsubscribe";
    req_id?: number;
    params: T;
}
