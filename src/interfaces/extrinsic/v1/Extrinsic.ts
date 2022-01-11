import { GenericExtrinsic, UInt } from '@polkadot/types';
import { SignatureOptions } from '@cennznet/types/interfaces/extrinsic/types';
import { AnyU8a, ExtrinsicPayloadValue, IKeyringPair, Registry } from '@polkadot/types/types';
import { Address, Call } from '@polkadot/types/interfaces/runtime';
import { ExtrinsicValueV4 } from '@polkadot/types/extrinsic/v4/Extrinsic';

export default class CENNZnetExtrinsic extends GenericExtrinsic {
  private signaturePayloadOptions: SignatureOptions | ExtrinsicPayloadValue;

  constructor(registry: Registry, value?: GenericExtrinsic | ExtrinsicValueV4 | AnyU8a | Call) {
    super(registry, value);
    this.signaturePayloadOptions = {
      blockHash: undefined,
      genesisHash: undefined,
      method: undefined,
      specVersion: undefined,
      nonce: undefined,
      runtimeVersion: undefined,
      transactionPayment: undefined,
      transactionVersion: undefined
    };
  }

  addSignature(signer: Address | Uint8Array | string, signature: Uint8Array | `0x{string}`, payload: ExtrinsicPayloadValue | Uint8Array | string): GenericExtrinsic {
    const mergeDefinedObjects = (A, B) => {
      const res = {};
      Object.keys({...A,...B}).map(key => {
        res[key] = A[key] || B[key];
      });
      return res as ExtrinsicPayloadValue;
    };

    const mergedPayload = mergeDefinedObjects(payload, this.signaturePayloadOptions);
    return super.addSignature(signer, signature, mergedPayload);
  }

  /**
   * @description Sign the extrinsic with a specific keypair
   */
  sign(account: IKeyringPair, options: SignatureOptions): GenericExtrinsic {
    const mergeDefinedObjects = (A, B) => {
      const res = {};
      Object.keys({...A,...B}).map(key => {
          res[key] = A[key] || B[key];
      });
      return res as SignatureOptions;
    };
    const mergedSignatureOpts = mergeDefinedObjects(options, this.signaturePayloadOptions);
    return super.sign(account, mergedSignatureOpts);
  }
}
