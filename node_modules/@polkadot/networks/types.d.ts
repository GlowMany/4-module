export declare type Icon = 'beachball' | 'empty' | 'jdenticon' | 'polkadot' | 'substrate';
export interface KnownSubstrate {
    decimals: number[] | null;
    displayName: string;
    network: string | null;
    prefix: number;
    standardAccount: '*25519' | 'Ed25519' | 'Sr25519' | 'secp256k1' | null;
    symbols: string[] | null;
    website: string | null;
}
export declare type KnownIcon = Record<string, Icon>;
export declare type KnownLedger = Record<string, number>;
export declare type KnownGenesis = Record<string, string[]>;
export declare type KnownTestnet = Record<string, true>;
export interface SubstrateNetwork extends KnownSubstrate {
    genesisHash: string[];
    hasLedgerSupport: boolean;
    icon: Icon;
    isIgnored: boolean;
    isTestnet: boolean;
    slip44?: number | null;
}
export interface Network extends SubstrateNetwork {
    network: string;
}
export interface Ss58Registry {
    registry: KnownSubstrate[];
    specification: string;
    schema: Record<keyof KnownSubstrate, string>;
}
