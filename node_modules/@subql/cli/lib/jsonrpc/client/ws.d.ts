import { w3cwebsocket as WebSocket } from 'websocket';
import { ResponseSuccessType } from './types';
export declare class WsJsonRpcClient {
    protected address: string;
    static with<T>(url: string, callback: (client: WsJsonRpcClient) => Promise<T>): Promise<T>;
    isReady: Promise<WsJsonRpcClient>;
    protected _ws: WebSocket;
    protected isDestroyed: boolean;
    protected handlers: {
        [id: string]: any;
    };
    constructor(address: string);
    connect(): void;
    send<T extends ResponseSuccessType>(method: string, params?: any[]): Promise<T>;
    destroy(): void;
    private onSocketClose;
    private onSocketMessage;
}
