import { GenericExtrinsic } from '@polkadot/types';
import { SignatureOptions } from '@cennznet/types/interfaces/extrinsic/types';
import { AnyU8a, ExtrinsicPayloadValue, IKeyringPair, Registry } from '@polkadot/types/types';
import { Address, Call } from '@polkadot/types/interfaces/runtime';
import { ExtrinsicValueV4 } from '@polkadot/types/extrinsic/v4/Extrinsic';
import { Api } from '@cennznet/api';
import { PaymentOptions } from '@cennznet/api/derives/types';
export default class CENNZnetExtrinsic extends GenericExtrinsic {
    private signaturePayloadOptions;
    constructor(registry: Registry, value?: GenericExtrinsic | ExtrinsicValueV4 | AnyU8a | Call);
    addSignature(signer: Address | Uint8Array | string, signature: Uint8Array | string, payload: ExtrinsicPayloadValue | Uint8Array | string): GenericExtrinsic;
    /**
     * @description Sign the extrinsic with a specific keypair
     */
    sign(account: IKeyringPair, options: SignatureOptions): GenericExtrinsic;
    /**
     * @description Adds payment options such as slippage and tip to the Extrinsic signature
     */
    setPaymentOpts(api: Api, { feeAssetId, slippage, tip }: PaymentOptions): this;
}
