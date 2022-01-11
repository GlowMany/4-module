import { AxiosInstance } from 'axios';
import { ResponseSuccessType } from './types';
export declare class HttpJsonRpcClient {
    protected axios: AxiosInstance;
    constructor(url: string);
    send<T extends ResponseSuccessType>(method: string, params?: any[]): Promise<T>;
}
