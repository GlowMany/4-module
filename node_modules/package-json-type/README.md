# package-json-type

[![npm](https://img.shields.io/npm/v/package-json-type.svg)](https://www.npmjs.com/package/package-json-type)

A TypeScript definition for package.json file

## Usages

### Install

  ```bash
  npm install -S package-json-type
  ```

  ```bash
  yarn add package-json-type
  ```

### Import

  ```typescript
  import {
    IDependencyMap,
    IEngines,
    IPackageJson,
    SPDXLicenseIDApproved
  } from 'package-json-type';

  const dependency: IDependencyMap = {
    bar: '^1.0.0',
    baz: '^2.1.0',
    qux: 'file:../src/qux'
  };

  const engines: IEngines = {
    node: '>=6.0.1 <11.0.0',
    yarn: '^1.15.0',
    zlib: '^0.14.0'
  };

  const license: SPDXLicenseIDApproved = 'MIT';

  const pkg: IPackageJson = {
    name: 'foo',
    version: '1.2.3',
    dependency,
    description: 'This is awesome foo',
    engines,
    license
  };
  ```

## Types

* [IAuthor](https://ajaxlab.github.io/package-json-type/interfaces/iauthor.html)
* [IBinMap](https://ajaxlab.github.io/package-json-type/interfaces/ibinmap.html)
* [IBugs](https://ajaxlab.github.io/package-json-type/interfaces/ibugs.html)
* [IConfig](https://ajaxlab.github.io/package-json-type/interfaces/iconfig.html)
* [IDependencyMap](https://ajaxlab.github.io/package-json-type/interfaces/idependencymap.html)
* [IDirectories](https://ajaxlab.github.io/package-json-type/interfaces/idirectories.html)
* [IEngines](https://ajaxlab.github.io/package-json-type/interfaces/iengines.html)
* [IPackageJson](https://ajaxlab.github.io/package-json-type/interfaces/ipackagejson.html)
* [IPublishConfig](https://ajaxlab.github.io/package-json-type/interfaces/ipublishconfig.html)
* [IRepository](https://ajaxlab.github.io/package-json-type/interfaces/irepository.html)
* [IScriptsMap](https://ajaxlab.github.io/package-json-type/interfaces/iscriptsmap.html)
* [CPU](https://ajaxlab.github.io/package-json-type/globals.html#cpu)
* [OS](https://ajaxlab.github.io/package-json-type/globals.html#os)
* [SPDXLicenseID](https://ajaxlab.github.io/package-json-type/globals.html#spdxlicenseid)
* [SPDXLicenseIDApproved](https://ajaxlab.github.io/package-json-type/globals.html#spdxlicenseidapproved)

## Documents

* [TS Doc](http://ajaxlab.github.io/package-json-type/)

* [Markdown](https://github.com/ajaxlab/package-json-type/blob/master/md/interfaces/ipackagejson.md)

## Issues

If you have any problems, please let us know on github [issues](https://github.com/ajaxlab/package-json-type/issues).

## Contributing

Contributions are always welcome :)

1. If you'd like to contribute, please fork the repository
2. run `npm i` or `yarn` inside the project
3. run `npm run dev` to run in dev mode
4. Make changes as you'd like
5. To test run `npm test` or `yarn test`
6. For clean code run `npm run lint` or `yarn lint`
7. And send us your pull requests!

## License

This project is licensed under [MIT](./LICENSE) license.
