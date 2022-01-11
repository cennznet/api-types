"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const interfaceRegistry_1 = require("@polkadot/typegen/generate/interfaceRegistry");
const tsDef_1 = require("@polkadot/typegen/generate/tsDef");
const defaultDefinitions = __importStar(require("@polkadot/types/interfaces/definitions"));
const cennznetDefinitions = __importStar(require("../src/interfaces/definitions"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { runtime } = defaultDefinitions, substrateDefinitions = __rest(defaultDefinitions, ["runtime"]);
const definitions = {
    '@polkadot/types/interfaces': substrateDefinitions,
    '@cennznet/api-types/interfaces': cennznetDefinitions
};
(0, tsDef_1.generateTsDef)(definitions, 'src/interfaces', '@cennznet/api-types/interfaces');
(0, interfaceRegistry_1.generateInterfaceTypes)(definitions, 'src/interfaceRegistry.ts');
