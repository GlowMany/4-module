"use strict";
// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.runWebpack = void 0;
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const webpack_1 = (0, tslib_1.__importDefault)(require("webpack"));
const webpack_merge_1 = require("webpack-merge");
const getBaseConfig = (entryPath, outputPath, development) => ({
    target: 'node',
    mode: development ? 'development' : 'production',
    entry: entryPath,
    devtool: development && 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: require.resolve('ts-loader'),
                options: {
                    compilerOptions: {
                        declaration: false,
                    },
                },
            },
            {
                test: /\.ya?ml$/,
                use: 'yaml-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    output: {
        path: path_1.default.dirname(outputPath),
        filename: path_1.default.basename(outputPath),
        libraryTarget: 'commonjs',
    },
});
async function runWebpack(entryPath, outputPath, isDev = false, clean = false) {
    const config = (0, webpack_merge_1.merge)(getBaseConfig(entryPath, outputPath, isDev), { output: { clean } }
    // Can allow projects to override webpack config here
    );
    await new Promise((resolve, reject) => {
        (0, webpack_1.default)(config).run((error, stats) => {
            if (error) {
                reject(error);
                return;
            }
            if (stats.hasErrors()) {
                const info = stats.toJson();
                reject(info.errors[0]);
                this.log(info.errors[0].details);
                return;
            }
            resolve(true);
        });
    });
}
exports.runWebpack = runWebpack;
//# sourceMappingURL=build-controller.js.map