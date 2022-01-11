import { ProjectManifestVersioned, ProjectNetworkV0_0_1 } from '@subql/common';
import { ProjectSpecV0_2_0 } from '../types';
export declare function prepare(location: string, manifest: ProjectManifestVersioned): Promise<[ProjectSpecV0_2_0, string]>;
export declare function migrate(projectPath: string, project: ProjectSpecV0_2_0, manifest: ProjectManifestVersioned, chainTypes?: string): Promise<void>;
export declare function createChainTypes(projectV1Network: ProjectNetworkV0_0_1, absolutePath: string, ext: string): Promise<void>;
