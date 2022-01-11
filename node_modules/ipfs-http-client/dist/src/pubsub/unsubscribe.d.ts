declare function _exports(options: Options, subsTracker: import('./subscription-tracker')): (topic: string, handler: import("ipfs-core-types/src/pubsub").MessageHandlerFn | undefined) => Promise<void>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type PubsubAPI = import('ipfs-core-types/src/pubsub').API<HTTPClientExtraOptions>;
export type Options = import('../types').Options;
//# sourceMappingURL=unsubscribe.d.ts.map