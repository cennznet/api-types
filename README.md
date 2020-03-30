# @cennznet/api-types

API type definitions for the CENNZnet runtime

Used with a `@polkadot/api` session to conenct and transact with the CENNZnet blockchain

Add as dependency
```json
// package.json
{
  "dependencies": {
    "@cennznet/api-types": "https://github.com/cennznet/api-types.git#1.0.0"
  }
}
```

```ts
import {ApiPromise, WsProvider} from '@polkadot/api';
import CENNZnetRuntimeTypes from '@cennznet/api-types';

async function main() {
  const provider = new WsProvider('ws://example.com:9944');
  const api = await ApiPromise.create({
    provider,
    types: CENNZnetRuntimeTypes,
  });

  //...

}
```


## Build
To re-generate type definitions from metadata run the following:
```bash
# Get metadata from local CENNZnet node running target version
curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' http://localhost:9933 > cennznet.json

# Generate the types
yarn build
```
Additionally, `definitions.ts` should be upated with any new type structures from the runtime.
