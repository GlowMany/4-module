import { ProjectSpecBase } from '../types';
export declare function createProject(localPath: string, project: ProjectSpecBase): Promise<string>;
export declare function installDependencies(projectPath: string, useNpm?: boolean): void;
