interface PackageJson {
    name: string;
    version: string;
}
declare type FnString = () => string | undefined;
/**
 * @name detectPackage
 * @summary Checks that a specific package is only imported once
 * @description A `@polkadot/*` version detection utility, checking for one occurence of a package in addition to checking for ddependency versions.
 */
export declare function detectPackage({ name, version }: PackageJson, pathOrFn?: FnString | string | false, deps?: PackageJson[]): void;
export {};
