
import { generateInterfaceTypes } from '@polkadot/typegen/generate/interfaceRegistry';
import { generateTsDef } from '@polkadot/typegen/generate/tsDef';
import * as defaultDefinitions from '@polkadot/types/interfaces/definitions';

import * as cennznetDefinitions from '../src/interfaces/definitions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { runtime, ...substrateDefinitions } = defaultDefinitions;

const definitions = {
  '@polkadot/types/interfaces': substrateDefinitions,
  '@cennznet/api-types/interfaces': cennznetDefinitions
} as any;

generateTsDef(definitions, 'src/interfaces', '@cennznet/api-types/interfaces');
generateInterfaceTypes(definitions, 'src/interfaceRegistry.ts');