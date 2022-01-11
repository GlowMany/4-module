export interface Message<T> {
    jsonrpc: '2.0';
    method: string;
    params?: T;
}
export interface Request<T = any> extends Message<T> {
    id: string | number;
}
export declare type Notification<T = any> = Message<T>;
export interface ResponseSuccess<T extends ResponseSuccessType> {
    id: string | number | null;
    result: T;
}
export declare type ResponseSuccessType = string | number | boolean | object | null;
export interface ResponseError {
    id: string | number | null;
    error: {
        code: number;
        message: string;
        data?: any;
    };
}
export declare type Response<T extends ResponseSuccessType> = ResponseSuccess<T> | ResponseError;
