"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateModels = exports.codegen = exports.processFields = exports.generateEnums = exports.generateJsonInterfaces = exports.renderTemplate = void 0;
const tslib_1 = require("tslib");
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const util_1 = require("util");
const common_1 = require("@subql/common");
const ejs_1 = (0, tslib_1.__importDefault)(require("ejs"));
const lodash_1 = require("lodash");
const rimraf_1 = (0, tslib_1.__importDefault)(require("rimraf"));
const MODEL_TEMPLATE_PATH = path_1.default.resolve(__dirname, '../template/model.ts.ejs');
const MODELS_INDEX_TEMPLATE_PATH = path_1.default.resolve(__dirname, '../template/models-index.ts.ejs');
const TYPES_INDEX_TEMPLATE_PATH = path_1.default.resolve(__dirname, '../template/types-index.ts.ejs');
const INTERFACE_TEMPLATE_PATH = path_1.default.resolve(__dirname, '../template/interface.ts.ejs');
const ENUM_TEMPLATE_PATH = path_1.default.resolve(__dirname, '../template/enum.ts.ejs');
const TYPE_ROOT_DIR = 'src/types';
const MODEL_ROOT_DIR = 'src/types/models';
const exportTypes = {
    models: false,
    interfaces: false,
    enums: false,
};
// 4. Render entity data in ejs template and write it
async function renderTemplate(templatePath, outputPath, templateData) {
    const data = await ejs_1.default.renderFile(templatePath, templateData);
    await fs_1.default.promises.writeFile(outputPath, data);
}
exports.renderTemplate = renderTemplate;
async function generateJsonInterfaces(projectPath, schema) {
    const typesDir = path_1.default.join(projectPath, TYPE_ROOT_DIR);
    const jsonObjects = (0, common_1.getAllJsonObjects)(schema);
    const jsonInterfaces = jsonObjects.map((r) => {
        const object = (0, common_1.setJsonObjectType)(r, jsonObjects);
        const fields = processFields('jsonField', object.name, object.fields);
        return {
            interfaceName: object.name,
            fields,
        };
    });
    if (jsonInterfaces.length !== 0) {
        const interfaceTemplate = {
            props: {
                jsonInterfaces,
            },
            helper: {
                upperFirst: lodash_1.upperFirst,
            },
        };
        try {
            await renderTemplate(INTERFACE_TEMPLATE_PATH, path_1.default.join(typesDir, `interfaces.ts`), interfaceTemplate);
            exportTypes.interfaces = true;
        }
        catch (e) {
            throw new Error(`When render json interfaces having problems.`);
        }
    }
}
exports.generateJsonInterfaces = generateJsonInterfaces;
async function generateEnums(projectPath, schema) {
    const typesDir = path_1.default.join(projectPath, TYPE_ROOT_DIR);
    const jsonObjects = (0, common_1.getAllEnums)(schema);
    const enums = jsonObjects.map((r) => {
        return {
            name: r.name,
            values: r.getValues().map((v) => v.name),
        };
    });
    if (enums.length !== 0) {
        const enumsTemplate = {
            props: {
                enums,
            },
        };
        try {
            await renderTemplate(ENUM_TEMPLATE_PATH, path_1.default.join(typesDir, `enums.ts`), enumsTemplate);
            exportTypes.enums = true;
        }
        catch (e) {
            throw new Error(`When render enums having problems.`);
        }
    }
}
exports.generateEnums = generateEnums;
function processFields(type, className, fields, indexFields = []) {
    const fieldList = [];
    for (const field of fields) {
        const injectField = {
            name: field.name,
            required: !field.nullable,
            isArray: field.isArray,
            isEnum: false,
        };
        if (type === 'entity') {
            const [indexed, unique] = indexFields.reduce((acc, indexField) => {
                if (indexField.fields.includes(field.name)) {
                    acc[0] = true;
                    if (indexField.fields.length === 1 && indexField.unique) {
                        acc[1] = true;
                    }
                    else if (indexField.unique === undefined) {
                        acc[1] = false;
                    }
                }
                return acc;
            }, [false, undefined]);
            injectField.indexed = indexed;
            injectField.unique = unique;
        }
        if (field.isEnum) {
            injectField.type = field.type;
            injectField.isEnum = true;
            injectField.isJsonInterface = false;
        }
        else {
            switch (field.type) {
                default: {
                    injectField.type = (0, common_1.getTypeByScalarName)(field.type).tsType;
                    if (!injectField.type) {
                        throw new Error(`Schema: undefined type "${field.type.toString()}" on field "${field.name}" in "type ${className} @${type}"`);
                    }
                    injectField.isJsonInterface = false;
                    break;
                }
                case 'Json': {
                    if (field.jsonInterface === undefined) {
                        throw new Error(`On field ${field.name} type is Json but json interface is not defined`);
                    }
                    injectField.type = (0, lodash_1.upperFirst)(field.jsonInterface.name);
                    injectField.isJsonInterface = true;
                }
            }
        }
        fieldList.push(injectField);
    }
    return fieldList;
}
exports.processFields = processFields;
async function prepareDirPath(path, recreate) {
    try {
        await (0, util_1.promisify)(rimraf_1.default)(path);
        if (recreate) {
            await fs_1.default.promises.mkdir(path, { recursive: true });
        }
    }
    catch (e) {
        throw new Error(`Failed to prepare ${path}`);
    }
}
//1. Prepare models directory and load schema
async function codegen(projectPath) {
    const modelDir = path_1.default.join(projectPath, MODEL_ROOT_DIR);
    const interfacesPath = path_1.default.join(projectPath, TYPE_ROOT_DIR, `interfaces.ts`);
    await prepareDirPath(modelDir, true);
    await prepareDirPath(interfacesPath, false);
    const manifest = (0, common_1.loadProjectManifest)(projectPath);
    await generateJsonInterfaces(projectPath, path_1.default.join(projectPath, manifest.schema));
    await generateModels(projectPath, path_1.default.join(projectPath, manifest.schema));
    await generateEnums(projectPath, path_1.default.join(projectPath, manifest.schema));
    if (exportTypes.interfaces || exportTypes.models || exportTypes.enums) {
        try {
            await renderTemplate(TYPES_INDEX_TEMPLATE_PATH, path_1.default.join(projectPath, TYPE_ROOT_DIR, `index.ts`), {
                props: {
                    exportTypes,
                },
            });
        }
        catch (e) {
            throw new Error(`When render index in types having problems.`);
        }
        console.log(`* Types index generated !`);
    }
}
exports.codegen = codegen;
// 2. Loop all entities and render it
async function generateModels(projectPath, schema) {
    const extractEntities = (0, common_1.getAllEntitiesRelations)(schema);
    for (const entity of extractEntities.models) {
        const baseFolderPath = '.../../base';
        const className = (0, lodash_1.upperFirst)(entity.name);
        const entityName = entity.name;
        const fields = processFields('entity', className, entity.fields, entity.indexes);
        const importJsonInterfaces = fields.filter((field) => field.isJsonInterface).map((f) => f.type);
        const importEnums = fields.filter((field) => field.isEnum).map((f) => f.type);
        const indexedFields = fields.filter((field) => field.indexed && !field.isJsonInterface);
        const modelTemplate = {
            props: {
                baseFolderPath,
                className,
                entityName,
                fields,
                importJsonInterfaces,
                importEnums,
                indexedFields,
            },
            helper: {
                upperFirst: lodash_1.upperFirst,
            },
        };
        try {
            await renderTemplate(MODEL_TEMPLATE_PATH, path_1.default.join(projectPath, MODEL_ROOT_DIR, `${className}.ts`), modelTemplate);
        }
        catch (e) {
            console.error(e);
            throw new Error(`When render entity ${className} to schema having problems.`);
        }
        console.log(`* Schema ${className} generated !`);
    }
    const classNames = extractEntities.models.map((entity) => entity.name);
    if (classNames.length !== 0) {
        try {
            await renderTemplate(MODELS_INDEX_TEMPLATE_PATH, path_1.default.join(projectPath, MODEL_ROOT_DIR, `index.ts`), {
                props: {
                    classNames,
                },
                helper: {
                    upperFirst: lodash_1.upperFirst,
                },
            });
            exportTypes.models = true;
        }
        catch (e) {
            throw new Error(`When render index in models having problems.`);
        }
        console.log(`* Models index generated !`);
    }
}
exports.generateModels = generateModels;
//# sourceMappingURL=codegen-controller.js.map