import { ExtDef, ExtInfo, ExtTypes } from './types';
declare const allExtensions: ExtDef;
declare const defaultExtensions: Array<keyof typeof allExtensions>;
declare function findUnknownExtensions(extensions: string[]): string[];
declare function expandExtensionTypes(extensions: string[], type: keyof ExtInfo): ExtTypes;
export { allExtensions, defaultExtensions, expandExtensionTypes, findUnknownExtensions };
