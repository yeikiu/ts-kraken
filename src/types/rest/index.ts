/**
 * Generic Rest response
 */
export type RestResponse<T> = {
    error: string[];
    result: T;
}
