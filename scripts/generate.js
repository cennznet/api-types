"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaceRegistry_1 = require("@polkadot/typegen/generate/interfaceRegistry");
const tsDef_1 = require("@polkadot/typegen/generate/tsDef");
const defaultDefinitions = require("@polkadot/types/interfaces/definitions");
const cennznetDefinitions = require("../src/interfaces/definitions");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { runtime, ...substrateDefinitions } = defaultDefinitions;
const definitions = {
    '@polkadot/types/interfaces': substrateDefinitions,
    '@cennznet/api-types/interfaces': cennznetDefinitions
};
(0, tsDef_1.generateTsDef)(definitions, 'src/interfaces', '@cennznet/api-types/interfaces');
(0, interfaceRegistry_1.generateInterfaceTypes)(definitions, 'src/interfaceRegistry.ts');
