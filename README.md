# @cennznet/types

API type definitions for the CENNZnet runtime

Used with a `@polkadot/api` session to conenct and transact with the CENNZnet blockchain

Add as dependency
```json
// package.json
{
  "dependencies": {
    "@cennznet/api-types": "https://github.com/cennznet/api-types.git#1.0.0-rc2"
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