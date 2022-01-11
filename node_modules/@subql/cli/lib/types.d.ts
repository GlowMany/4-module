export interface ProjectSpecBase {
    name: string;
    repository?: string;
    author: string;
    description?: string;
    version: string;
    license: string;
    endpoint: string;
}
export declare type ProjectSpecV0_0_1 = ProjectSpecBase;
export interface ProjectSpecV0_2_0 extends ProjectSpecBase {
    genesisHash: string;
}
export declare function isProjectSpecV0_0_1(projectSpec: ProjectSpecBase): projectSpec is ProjectSpecV0_0_1;
export declare function isProjectSpecV0_2_0(projectSpec: ProjectSpecBase): projectSpec is ProjectSpecV0_2_0;
