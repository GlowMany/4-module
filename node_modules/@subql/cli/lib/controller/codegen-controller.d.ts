import { GraphQLEntityField, GraphQLJsonFieldType, GraphQLEntityIndex } from '@subql/common';
import ejs from 'ejs';
export declare function renderTemplate(templatePath: string, outputPath: string, templateData: ejs.Data): Promise<void>;
export interface ProcessedField {
    name: string;
    type: string;
    required: boolean;
    isEnum: boolean;
    indexed: boolean;
    unique?: boolean;
    isArray: boolean;
    isJsonInterface: boolean;
}
export declare function generateJsonInterfaces(projectPath: string, schema: string): Promise<void>;
export declare function generateEnums(projectPath: string, schema: string): Promise<void>;
export declare function processFields(type: 'entity' | 'jsonField', className: string, fields: (GraphQLEntityField | GraphQLJsonFieldType)[], indexFields?: GraphQLEntityIndex[]): ProcessedField[];
export declare function codegen(projectPath: string): Promise<void>;
export declare function generateModels(projectPath: string, schema: string): Promise<void>;
