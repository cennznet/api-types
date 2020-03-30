import { AnyNumber, ITuple } from '@polkadot/types/types';
import { Compact, Option, U8aFixed, Vec } from '@polkadot/types/codec';
import { Bytes, bool, u16, u32, u64 } from '@polkadot/types/primitive';
import { MemberCount, ProposalIndex } from '@polkadot/types/interfaces/collective';
import { CodeHash, Gas, Schedule } from '@polkadot/types/interfaces/contracts';
import { Proposal } from '@polkadot/types/interfaces/democracy';
import { Extrinsic, Signature } from '@polkadot/types/interfaces/extrinsics';
import { AssetOptions, PermissionLatest } from '@polkadot/types/interfaces/genericAsset';
import { Heartbeat } from '@polkadot/types/interfaces/imOnline';
import { AccountId, AccountIndex, Address, AssetId, Balance, BalanceOf, BlockNumber, Call, ChangesTrieConfiguration, H256, Hash, Header, KeyValue, LookupSource, Moment, Perbill } from '@polkadot/types/interfaces/runtime';
import { Keys } from '@polkadot/types/interfaces/session';
import { EraIndex, RewardDestination, ValidatorPrefs } from '@polkadot/types/interfaces/staking';
import { Key } from '@polkadot/types/interfaces/system';
import { Timepoint } from '@polkadot/types/interfaces/utility';
import { AttestationTopic, AttestationValue } from 'cennznet-api-types/interfaces/attestation';
import { FeeRate } from 'cennznet-api-types/interfaces/cennzx';
import { AcceptPayload, DeviceId, Invite, Meta, PreKeyBundle, VaultKey, VaultValue } from 'cennznet-api-types/interfaces/sylo';
import { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';
declare module '@polkadot/api/types/submittable' {
    interface AugmentedSubmittables<ApiType> {
        attestation: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            /**
             * Remove a claim, only the original issuer can remove a claim
             * If the `issuer` has not yet issued a claim of `topic`, this function will return error.
             **/
            removeClaim: AugmentedSubmittable<(holder: AccountId | string | Uint8Array, topic: AttestationTopic | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Create or update an existing claim
             * The `issuer` of the claim comes from the extrinsic `origin`
             * The `topic` and `value` are both U256 which can hold any 32-byte encoded data.
             **/
            setClaim: AugmentedSubmittable<(holder: AccountId | string | Uint8Array, topic: AttestationTopic | AnyNumber | Uint8Array, value: AttestationValue | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
        };
        authorship: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            /**
             * Provide a set of uncles.
             **/
            setUncles: AugmentedSubmittable<(newUncles: Vec<Header> | (Header | {
                parentHash?: any;
                number?: any;
                stateRoot?: any;
                extrinsicsRoot?: any;
                digest?: any;
            } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
        };
        cennzxSpot: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            /**
             * Deposit core asset and trade asset at current ratio to mint liquidity
             * Returns amount of liquidity minted.
             * `origin`
             * `asset_id` - The trade asset ID
             * `min_liquidity` - The minimum liquidity to add
             * `asset_amount` - Amount of trade asset to add
             * `core_amount` - Amount of core asset to add
             **/
            addLiquidity: AugmentedSubmittable<(assetId: Compact<AssetId> | AnyNumber | Uint8Array, minLiquidity: Compact<Balance> | AnyNumber | Uint8Array, maxAssetAmount: Compact<Balance> | AnyNumber | Uint8Array, coreAmount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Convert asset1 to asset2
             * Seller specifies exact input (asset 1) and minimum output (asset 2)
             * `recipient` - Account to receive asset_bought, defaults to origin if None
             * `asset_sold` - asset ID 1 to sell
             * `asset_bought` - asset ID 2 to buy
             * `sell_amount` - The amount of asset '1' to sell
             * `min_receive` - Minimum trade asset '2' to receive from sale
             **/
            assetSwapInput: AugmentedSubmittable<(recipient: Option<AccountId> | null | object | string | Uint8Array, assetSold: Compact<AssetId> | AnyNumber | Uint8Array, assetBought: Compact<AssetId> | AnyNumber | Uint8Array, sellAmount: Compact<Balance> | AnyNumber | Uint8Array, minReceive: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Convert asset1 to asset2. User specifies maximum
             * input and exact output.
             * origin
             * `recipient` - Account to receive asset_bought, defaults to origin if None
             * `asset_sold` - asset ID 1 to sell
             * `asset_bought` - asset ID 2 to buy
             * `buy_amount` - The amount of asset '2' to purchase
             * `max_paying_amount` - Maximum trade asset '1' to pay
             **/
            assetSwapOutput: AugmentedSubmittable<(recipient: Option<AccountId> | null | object | string | Uint8Array, assetSold: Compact<AssetId> | AnyNumber | Uint8Array, assetBought: Compact<AssetId> | AnyNumber | Uint8Array, buyAmount: Compact<Balance> | AnyNumber | Uint8Array, maxPayingAmount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Burn exchange assets to withdraw core asset and trade asset at current ratio
             * `asset_id` - The trade asset ID
             * `asset_amount` - Amount of exchange asset to burn
             * `min_asset_withdraw` - The minimum trade asset withdrawn
             * `min_core_withdraw` -  The minimum core asset withdrawn
             **/
            removeLiquidity: AugmentedSubmittable<(assetId: Compact<AssetId> | AnyNumber | Uint8Array, liquidityWithdrawn: Compact<Balance> | AnyNumber | Uint8Array, minAssetWithdraw: Compact<Balance> | AnyNumber | Uint8Array, minCoreWithdraw: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Set the spot exchange wide fee rate (root only)
             **/
            setFeeRate: AugmentedSubmittable<(newFeeRate: FeeRate | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
        };
        contracts: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            /**
             * Makes a call to an account, optionally transferring some balance.
             * * If the account is a smart-contract account, the associated code will be
             * executed and any value will be transferred.
             * * If the account is a regular account, any value will be transferred.
             * * If no account exists and the call value is not less than `existential_deposit`,
             * a regular account will be created and any value will be transferred.
             **/
            call: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, value: Compact<BalanceOf> | AnyNumber | Uint8Array, gasLimit: Compact<Gas> | AnyNumber | Uint8Array, data: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Allows block producers to claim a small reward for evicting a contract. If a block producer
             * fails to do so, a regular users will be allowed to claim the reward.
             * If contract is not evicted as a result of this call, no actions are taken and
             * the sender is not eligible for the reward.
             **/
            claimSurcharge: AugmentedSubmittable<(dest: AccountId | string | Uint8Array, auxSender: Option<AccountId> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Instantiates a new contract from the `codehash` generated by `put_code`, optionally transferring some balance.
             * Instantiation is executed as follows:
             * - The destination address is computed based on the sender and hash of the code.
             * - The smart-contract account is created at the computed address.
             * - The `ctor_code` is executed in the context of the newly-created account. Buffer returned
             * after the execution is saved as the `code` of the account. That code will be invoked
             * upon any call received by this account.
             * - The contract is initialized.
             **/
            instantiate: AugmentedSubmittable<(endowment: Compact<BalanceOf> | AnyNumber | Uint8Array, gasLimit: Compact<Gas> | AnyNumber | Uint8Array, codeHash: CodeHash | string | Uint8Array, data: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Stores the given binary Wasm code into the chain's storage and returns its `codehash`.
             * You can instantiate contracts only with stored code.
             **/
            putCode: AugmentedSubmittable<(gasLimit: Compact<Gas> | AnyNumber | Uint8Array, code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Updates the schedule for metering contracts.
             * The schedule must have a greater version than the stored schedule.
             **/
            updateSchedule: AugmentedSubmittable<(schedule: Schedule | {
                version?: any;
                putCodePerByteCost?: any;
                growMemCost?: any;
                regularOpCost?: any;
                returnDataPerByteCost?: any;
                eventDataPerByteCost?: any;
                eventPerTopicCost?: any;
                eventBaseCost?: any;
                sandboxDataReadCost?: any;
                sandboxDataWriteCost?: any;
                transferCost?: any;
                maxEventTopics?: any;
                maxStackHeight?: any;
                maxMemoryPages?: any;
                enablePrintln?: any;
                maxSubjectLen?: any;
            } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
        };
        council: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            /**
             * May be called by any signed account after the voting duration has ended in order to
             * finish voting and close the proposal.
             * Abstentions are counted as rejections unless there is a prime member set and the prime
             * member cast an approval.
             * - the weight of `proposal` preimage.
             * - up to three events deposited.
             * - one read, two removals, one mutation. (plus three static reads.)
             * - computation and i/o `O(P + L + M)` where:
             * - `M` is number of members,
             * - `P` is number of active proposals,
             * - `L` is the encoded length of `proposal` preimage.
             **/
            close: AugmentedSubmittable<(proposal: Hash | string | Uint8Array, index: Compact<ProposalIndex> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Dispatch a proposal from a member using the `Member` origin.
             * Origin must be a member of the collective.
             **/
            execute: AugmentedSubmittable<(proposal: Proposal | {
                callIndex?: any;
                args?: any;
            } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * # <weight>
             * - Bounded storage reads and writes.
             * - Argument `threshold` has bearing on weight.
             * # </weight>
             **/
            propose: AugmentedSubmittable<(threshold: Compact<MemberCount> | AnyNumber | Uint8Array, proposal: Proposal | {
                callIndex?: any;
                args?: any;
            } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Set the collective's membership.
             * - `new_members`: The new member list. Be nice to the chain and
             * - `prime`: The prime member whose vote sets the default.
             * Requires root origin.
             **/
            setMembers: AugmentedSubmittable<(newMembers: Vec<AccountId> | (AccountId | string | Uint8Array)[], prime: Option<AccountId> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * # <weight>
             * - Bounded storage read and writes.
             * - Will be slightly heavier if the proposal is approved / disapproved after the vote.
             * # </weight>
             **/
            vote: AugmentedSubmittable<(proposal: Hash | string | Uint8Array, index: Compact<ProposalIndex> | AnyNumber | Uint8Array, approve: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>>;
        };
        elections: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            /**
             * Remove a particular member from the set. This is effective immediately and the bond of
             * the outgoing member is slashed.
             * If a runner-up is available, then the best runner-up will be removed and replaces the
             * outgoing member. Otherwise, a new phragmen round is started.
             * Note that this does not affect the designated block number of the next election.
             * # <weight>
             * #### State
             * Reads: O(do_phragmen)
             * Writes: O(do_phragmen)
             * # </weight>
             **/
            removeMember: AugmentedSubmittable<(who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Remove `origin` as a voter. This removes the lock and returns the bond.
             * # <weight>
             * #### State
             * Reads: O(1)
             * Writes: O(1)
             * # </weight>
             **/
            removeVoter: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
            /**
             * Renounce one's intention to be a candidate for the next election round. 3 potential
             * outcomes exist:
             * - `origin` is a candidate and not elected in any set. In this case, the bond is
             * unreserved, returned and origin is removed as a candidate.
             * - `origin` is a current runner up. In this case, the bond is unreserved, returned and
             * origin is removed as a runner.
             * - `origin` is a current member. In this case, the bond is unreserved and origin is
             * removed as a member, consequently not being a candidate for the next round anymore.
             * Similar to [`remove_voter`], if replacement runners exists, they are immediately used.
             **/
            renounceCandidacy: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
            /**
             * Report `target` for being an defunct voter. In case of a valid report, the reporter is
             * rewarded by the bond amount of `target`. Otherwise, the reporter itself is removed and
             * their bond is slashed.
             * A defunct voter is defined to be:
             * - a voter whose current submitted votes are all invalid. i.e. all of them are no
             * longer a candidate nor an active member.
             * # <weight>
             * #### State
             * Reads: O(NLogM) given M current candidates and N votes for `target`.
             * Writes: O(1)
             * # </weight>
             **/
            reportDefunctVoter: AugmentedSubmittable<(target: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Submit oneself for candidacy.
             * A candidate will either:
             * - Lose at the end of the term and forfeit their deposit.
             * - Win and become a member. Members will eventually get their stash back.
             * - Become a runner-up. Runners-ups are reserved members in case one gets forcefully
             * removed.
             * # <weight>
             * #### State
             * Reads: O(LogN) Given N candidates.
             * Writes: O(1)
             * # </weight>
             **/
            submitCandidacy: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
            /**
             * Vote for a set of candidates for the upcoming round of election.
             * The `votes` should:
             * - not be empty.
             * - be less than the number of candidates.
             * Upon voting, `value` units of `who`'s balance is locked and a bond amount is reserved.
             * It is the responsibility of the caller to not place all of their balance into the lock
             * and keep some for further transactions.
             * # <weight>
             * #### State
             * Reads: O(1)
             * Writes: O(V) given `V` votes. V is bounded by 16.
             * # </weight>
             **/
            vote: AugmentedSubmittable<(votes: Vec<AccountId> | (AccountId | string | Uint8Array)[], value: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
        };
        finalityTracker: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            /**
             * Hint that the author of this block thinks the best finalized
             * block is the given number.
             **/
            finalHint: AugmentedSubmittable<(hint: Compact<BlockNumber> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
        };
        genericAsset: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            /**
             * Burns an asset, decreases its total issuance.
             * The `origin` must have `burn` permissions.
             **/
            burn: AugmentedSubmittable<(assetId: Compact<AssetId> | AnyNumber | Uint8Array, to: AccountId | string | Uint8Array, amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Create a new kind of asset and nominates the owner of this asset. The
             * origin of this call must be root.
             **/
            create: AugmentedSubmittable<(owner: AccountId | string | Uint8Array, options: AssetOptions | {
                initial_issuance?: any;
                permissions?: any;
            } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Can be used to create reserved tokens.
             * Requires Root call.
             **/
            createReserved: AugmentedSubmittable<(assetId: AssetId | AnyNumber | Uint8Array, options: AssetOptions | {
                initial_issuance?: any;
                permissions?: any;
            } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Mints an asset, increases its total issuance.
             * The origin must have `mint` permissions.
             **/
            mint: AugmentedSubmittable<(assetId: Compact<AssetId> | AnyNumber | Uint8Array, to: AccountId | string | Uint8Array, amount: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Transfer some liquid free balance to another account.
             **/
            transfer: AugmentedSubmittable<(assetId: Compact<AssetId> | AnyNumber | Uint8Array, to: AccountId | string | Uint8Array, amount: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Updates permission for a given `asset_id` and an account.
             * The `origin` must have `update` permission.
             **/
            updatePermission: AugmentedSubmittable<(assetId: Compact<AssetId> | AnyNumber | Uint8Array, newPermission: PermissionLatest | {
                update?: any;
                mint?: any;
                burn?: any;
            } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
        };
        grandpa: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            /**
             * Report some misbehavior.
             **/
            reportMisbehavior: AugmentedSubmittable<(report: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
        };
        imOnline: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            heartbeat: AugmentedSubmittable<(heartbeat: Heartbeat | {
                blockNumber?: any;
                networkState?: any;
                sessionIndex?: any;
                authorityIndex?: any;
            } | string | Uint8Array, signature: Signature | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
        };
        session: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            /**
             * Removes any session key(s) of the function caller.
             * This doesn't take effect until the next session.
             * The dispatch origin of this function must be signed.
             * # <weight>
             * - O(N) in number of key types.
             * - Removes N + 1 DB entries.
             * - Reduces system account refs by one on success.
             * # </weight>
             **/
            purgeKeys: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
            /**
             * Sets the session key(s) of the function caller to `keys`.
             * Allows an account to set its session key prior to becoming a validator.
             * This doesn't take effect until the next session.
             * The dispatch origin of this function must be signed.
             * # <weight>
             * - O(log n) in number of accounts.
             * - One extra DB entry.
             * - Increases system account refs by one on success iff there were previously no keys set.
             * In this case, purge_keys will need to be called before the account can be removed.
             * # </weight>
             **/
            setKeys: AugmentedSubmittable<(keys: Keys, proof: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
        };
        staking: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            /**
             * Take the origin account as a stash and lock up `value` of its balance. `controller` will
             * be the account that controls it.
             * `value` must be more than the `minimum_bond` specified in genesis config.
             * The dispatch origin for this call must be _Signed_ by the stash account.
             * # <weight>
             * - Independent of the arguments. Moderate complexity.
             * - O(1).
             * - Three extra DB entries.
             * NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned unless
             * the `origin` falls below _existential deposit_ and gets removed as dust.
             * # </weight>
             **/
            bond: AugmentedSubmittable<(controller: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, value: Compact<BalanceOf> | AnyNumber | Uint8Array, payee: RewardDestination | ('Staked' | 'Stash' | 'Controller') | number | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Add some extra amount that have appeared in the stash `free_balance` into the balance up
             * for staking.
             * Use this if there are additional funds in your stash account that you wish to bond.
             * Unlike [`bond`] or [`unbond`] this function does not impose any limitation on the amount
             * that can be added.
             * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
             * # <weight>
             * - Independent of the arguments. Insignificant complexity.
             * - O(1).
             * - One DB entry.
             * # </weight>
             **/
            bondExtra: AugmentedSubmittable<(maxAdditional: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Cancel enactment of a deferred slash. Can be called by root origin
             * passing the era and indices of the slashes for that era to kill.
             * # <weight>
             * - One storage write.
             * # </weight>
             **/
            cancelDeferredSlash: AugmentedSubmittable<(era: EraIndex | AnyNumber | Uint8Array, slashIndices: Vec<u32> | (u32 | AnyNumber | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
            /**
             * Declare no desire to either validate or nominate.
             * Effects will be felt at the beginning of the next era.
             * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
             * # <weight>
             * - Independent of the arguments. Insignificant complexity.
             * - Contains one read.
             * - Writes are limited to the `origin` account key.
             * # </weight>
             **/
            chill: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
            /**
             * Force there to be a new era at the end of the next session. After this, it will be
             * reset to normal (non-forced) behaviour.
             * # <weight>
             * - No arguments.
             * # </weight>
             **/
            forceNewEra: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
            /**
             * Force there to be a new era at the end of sessions indefinitely.
             * # <weight>
             * - One storage write
             * # </weight>
             **/
            forceNewEraAlways: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
            /**
             * Force there to be no new eras indefinitely.
             * # <weight>
             * - No arguments.
             * # </weight>
             **/
            forceNoEras: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
            /**
             * Force a current staker to become completely unstaked, immediately.
             **/
            forceUnstake: AugmentedSubmittable<(stash: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Declare the desire to nominate `targets` for the origin controller.
             * Effects will be felt at the beginning of the next era.
             * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
             * # <weight>
             * - The transaction's complexity is proportional to the size of `targets`,
             * which is capped at `MAX_NOMINATIONS`.
             * - Both the reads and writes follow a similar pattern.
             * # </weight>
             **/
            nominate: AugmentedSubmittable<(targets: Vec<LookupSource> | (LookupSource | Address | AccountId | AccountIndex | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
            /**
             * Rebond a portion of the stash scheduled to be unlocked.
             * # <weight>
             * - Time complexity: O(1). Bounded by `MAX_UNLOCKING_CHUNKS`.
             * - Storage changes: Can't increase storage, only decrease it.
             * # </weight>
             **/
            rebond: AugmentedSubmittable<(value: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * (Re-)set the controller of a stash.
             * Effects will be felt at the beginning of the next era.
             * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
             * # <weight>
             * - Independent of the arguments. Insignificant complexity.
             * - Contains a limited number of reads.
             * - Writes are limited to the `origin` account key.
             * # </weight>
             **/
            setController: AugmentedSubmittable<(controller: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Set the validators who cannot be slashed (if any).
             **/
            setInvulnerables: AugmentedSubmittable<(validators: Vec<AccountId> | (AccountId | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
            /**
             * Set the minimum bond amount.
             **/
            setMinimumBond: AugmentedSubmittable<(value: BalanceOf | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * (Re-)set the payment target for a controller.
             * Effects will be felt at the beginning of the next era.
             * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
             * # <weight>
             * - Independent of the arguments. Insignificant complexity.
             * - Contains a limited number of reads.
             * - Writes are limited to the `origin` account key.
             * # </weight>
             **/
            setPayee: AugmentedSubmittable<(payee: RewardDestination | ('Staked' | 'Stash' | 'Controller') | number | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * The ideal number of validators.
             **/
            setValidatorCount: AugmentedSubmittable<(updated: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Schedule a portion of the stash to be unlocked ready for transfer out after the bond
             * period ends. If this leaves an amount actively bonded less than
             * T::Currency::minimum_balance(), then it is increased to the full amount.
             * Once the unlock period is done, you can call `withdraw_unbonded` to actually move
             * the funds out of management ready for transfer.
             * No more than a limited number of unlocking chunks (see `MAX_UNLOCKING_CHUNKS`)
             * can co-exists at the same time. In that case, [`Call::withdraw_unbonded`] need
             * to be called first to remove some of the chunks (if possible).
             * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
             * See also [`Call::withdraw_unbonded`].
             * # <weight>
             * - Independent of the arguments. Limited but potentially exploitable complexity.
             * - Contains a limited number of reads.
             * - Each call (requires the remainder of the bonded balance to be above `minimum_balance`)
             * will cause a new entry to be inserted into a vector (`Ledger.unlocking`) kept in storage.
             * The only way to clean the aforementioned storage item is also user-controlled via `withdraw_unbonded`.
             * - One DB entry.
             * </weight>
             **/
            unbond: AugmentedSubmittable<(value: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Declare the desire to validate for the origin controller.
             * Effects will be felt at the beginning of the next era.
             * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
             * # <weight>
             * - Independent of the arguments. Insignificant complexity.
             * - Contains a limited number of reads.
             * - Writes are limited to the `origin` account key.
             * # </weight>
             **/
            validate: AugmentedSubmittable<(prefs: ValidatorPrefs | {
                commission?: any;
            } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Remove any unlocked chunks from the `unlocking` queue from our management.
             * This essentially frees up that balance to be used by the stash account to do
             * whatever it wants.
             * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
             * See also [`Call::unbond`].
             * # <weight>
             * - Could be dependent on the `origin` argument and how much `unlocking` chunks exist.
             * It implies `consolidate_unlocked` which loops over `Ledger.unlocking`, which is
             * indirectly user-controlled. See [`unbond`] for more detail.
             * - Contains a limited number of reads, yet the size of which could be large based on `ledger`.
             * - Writes are limited to the `origin` account key.
             * # </weight>
             **/
            withdrawUnbonded: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
        };
        sudo: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            /**
             * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo key.
             * The dispatch origin for this call must be _Signed_.
             * # <weight>
             * - O(1).
             * - Limited storage reads.
             * - One DB change.
             * # </weight>
             **/
            setKey: AugmentedSubmittable<(updated: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Authenticates the sudo key and dispatches a function call with `Root` origin.
             * The dispatch origin for this call must be _Signed_.
             * # <weight>
             * - O(1).
             * - Limited storage reads.
             * - One DB write (event).
             * - Weight of derivative `call` execution + 10,000.
             * # </weight>
             **/
            sudo: AugmentedSubmittable<(call: Call | {
                callIndex?: any;
                args?: any;
            } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Authenticates the sudo key and dispatches a function call with `Signed` origin from
             * a given account.
             * The dispatch origin for this call must be _Signed_.
             * # <weight>
             * - O(1).
             * - Limited storage reads.
             * - One DB write (event).
             * - Weight of derivative `call` execution + 10,000.
             * # </weight>
             **/
            sudoAs: AugmentedSubmittable<(who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, call: Call | {
                callIndex?: any;
                args?: any;
            } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
        };
        syloE2Ee: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            registerDevice: AugmentedSubmittable<(deviceId: u32 | AnyNumber | Uint8Array, pkbs: Vec<PreKeyBundle> | (PreKeyBundle | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
            replenishPkbs: AugmentedSubmittable<(deviceId: u32 | AnyNumber | Uint8Array, pkbs: Vec<PreKeyBundle> | (PreKeyBundle | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
            withdrawPkbs: AugmentedSubmittable<(requestId: Hash | string | Uint8Array, wantedPkbs: Vec<ITuple<[AccountId, DeviceId]>> | ([AccountId | string | Uint8Array, DeviceId | AnyNumber | Uint8Array])[]) => SubmittableExtrinsic<ApiType>>;
        };
        syloGroups: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            acceptInvite: AugmentedSubmittable<(groupId: Hash | string | Uint8Array, payload: AcceptPayload | {
                accountId?: any;
            } | string | Uint8Array, inviteKey: H256 | string | Uint8Array, inboxId: u32 | AnyNumber | Uint8Array, signature: Signature | string | Uint8Array, groupData: ITuple<[VaultKey, VaultValue]> | [VaultKey | string | Uint8Array, VaultValue | string | Uint8Array]) => SubmittableExtrinsic<ApiType>>;
            createGroup: AugmentedSubmittable<(groupId: Hash | string | Uint8Array, meta: Meta, invites: Vec<Invite> | (Invite | {
                peerId?: any;
                inviteData?: any;
                inviteKey?: any;
                meta?: any;
                roles?: any;
            } | string | Uint8Array)[], groupData: ITuple<[VaultKey, VaultValue]> | [VaultKey | string | Uint8Array, VaultValue | string | Uint8Array]) => SubmittableExtrinsic<ApiType>>;
            createInvites: AugmentedSubmittable<(groupId: Hash | string | Uint8Array, invites: Vec<Invite> | (Invite | {
                peerId?: any;
                inviteData?: any;
                inviteKey?: any;
                meta?: any;
                roles?: any;
            } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
            leaveGroup: AugmentedSubmittable<(groupId: Hash | string | Uint8Array, groupKey: Option<VaultKey> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            revokeInvites: AugmentedSubmittable<(groupId: Hash | string | Uint8Array, inviteKeys: Vec<H256> | (H256 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
            updateMember: AugmentedSubmittable<(groupId: Hash | string | Uint8Array, meta: Meta) => SubmittableExtrinsic<ApiType>>;
            upsertGroupMeta: AugmentedSubmittable<(groupId: Hash | string | Uint8Array, meta: Meta) => SubmittableExtrinsic<ApiType>>;
        };
        syloInbox: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            addValue: AugmentedSubmittable<(peerId: AccountId | string | Uint8Array, value: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            deleteValues: AugmentedSubmittable<(valueIds: Vec<u32> | (u32 | AnyNumber | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
        };
        syloResponse: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            removeResponse: AugmentedSubmittable<(requestId: Hash | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
        };
        syloVault: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            deleteValues: AugmentedSubmittable<(keys: Vec<VaultKey> | (VaultKey | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
            upsertValue: AugmentedSubmittable<(key: VaultKey | string | Uint8Array, value: VaultValue | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
        };
        system: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            /**
             * A dispatch that will fill the block weight up to the given ratio.
             **/
            fillBlock: AugmentedSubmittable<(ratio: Perbill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Kill all storage items with a key that starts with the given prefix.
             **/
            killPrefix: AugmentedSubmittable<(prefix: Key | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Kill some items from storage.
             **/
            killStorage: AugmentedSubmittable<(keys: Vec<Key> | (Key | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
            /**
             * Make some on-chain remark.
             **/
            remark: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Set the new changes trie configuration.
             **/
            setChangesTrieConfig: AugmentedSubmittable<(changesTrieConfig: Option<ChangesTrieConfiguration> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Set the new runtime code.
             **/
            setCode: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Set the new runtime code without doing any checks of the given `code`.
             **/
            setCodeWithoutChecks: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Set the number of pages in the WebAssembly environment's heap.
             **/
            setHeapPages: AugmentedSubmittable<(pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Set some items of storage.
             **/
            setStorage: AugmentedSubmittable<(items: Vec<KeyValue> | (KeyValue)[]) => SubmittableExtrinsic<ApiType>>;
        };
        technicalCommittee: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            /**
             * May be called by any signed account after the voting duration has ended in order to
             * finish voting and close the proposal.
             * Abstentions are counted as rejections unless there is a prime member set and the prime
             * member cast an approval.
             * - the weight of `proposal` preimage.
             * - up to three events deposited.
             * - one read, two removals, one mutation. (plus three static reads.)
             * - computation and i/o `O(P + L + M)` where:
             * - `M` is number of members,
             * - `P` is number of active proposals,
             * - `L` is the encoded length of `proposal` preimage.
             **/
            close: AugmentedSubmittable<(proposal: Hash | string | Uint8Array, index: Compact<ProposalIndex> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Dispatch a proposal from a member using the `Member` origin.
             * Origin must be a member of the collective.
             **/
            execute: AugmentedSubmittable<(proposal: Proposal | {
                callIndex?: any;
                args?: any;
            } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * # <weight>
             * - Bounded storage reads and writes.
             * - Argument `threshold` has bearing on weight.
             * # </weight>
             **/
            propose: AugmentedSubmittable<(threshold: Compact<MemberCount> | AnyNumber | Uint8Array, proposal: Proposal | {
                callIndex?: any;
                args?: any;
            } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Set the collective's membership.
             * - `new_members`: The new member list. Be nice to the chain and
             * - `prime`: The prime member whose vote sets the default.
             * Requires root origin.
             **/
            setMembers: AugmentedSubmittable<(newMembers: Vec<AccountId> | (AccountId | string | Uint8Array)[], prime: Option<AccountId> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * # <weight>
             * - Bounded storage read and writes.
             * - Will be slightly heavier if the proposal is approved / disapproved after the vote.
             * # </weight>
             **/
            vote: AugmentedSubmittable<(proposal: Hash | string | Uint8Array, index: Compact<ProposalIndex> | AnyNumber | Uint8Array, approve: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>>;
        };
        technicalMembership: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            /**
             * Add a member `who` to the set.
             * May only be called from `AddOrigin` or root.
             **/
            addMember: AugmentedSubmittable<(who: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Swap out the sending member for some other key `new`.
             * May only be called from `Signed` origin of a current member.
             * Prime membership is passed from the origin account to `new`, if extant.
             **/
            changeKey: AugmentedSubmittable<(updated: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Remove the prime member if it exists.
             **/
            clearPrime: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
            /**
             * Remove a member `who` from the set.
             * May only be called from `RemoveOrigin` or root.
             **/
            removeMember: AugmentedSubmittable<(who: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Change the membership to a new set, disregarding the existing membership. Be nice and
             * pass `members` pre-sorted.
             * May only be called from `ResetOrigin` or root.
             **/
            resetMembers: AugmentedSubmittable<(members: Vec<AccountId> | (AccountId | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
            /**
             * Set the prime member. Must be a current member.
             **/
            setPrime: AugmentedSubmittable<(who: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Swap out one member `remove` for another `add`.
             * May only be called from `SwapOrigin` or root.
             * Prime membership is *not* passed from `remove` to `add`, if extant.
             **/
            swapMember: AugmentedSubmittable<(remove: AccountId | string | Uint8Array, add: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
        };
        timestamp: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            /**
             * Set the current time.
             * This call should be invoked exactly once per block. It will panic at the finalization
             * phase, if this call hasn't been invoked by that time.
             * The timestamp should be greater than the previous one by the amount specified by
             * `MinimumPeriod`.
             * The dispatch origin for this call must be `Inherent`.
             **/
            set: AugmentedSubmittable<(now: Compact<Moment> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
        };
        treasury: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            /**
             * Approve a proposal. At a later time, the proposal will be allocated to the beneficiary
             * and the original deposit will be returned.
             * # <weight>
             * - O(1).
             * - Limited storage reads.
             * - One DB change.
             * # </weight>
             **/
            approveProposal: AugmentedSubmittable<(proposalId: Compact<ProposalIndex> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Close and payout a tip.
             * The dispatch origin for this call must be _Signed_.
             * The tip identified by `hash` must have finished its countdown period.
             * - `hash`: The identity of the open tip for which a tip value is declared. This is formed
             * as the hash of the tuple of the original tip `reason` and the beneficiary account ID.
             * # <weight>
             * - `O(T)`
             * - One storage retrieval (codec `O(T)`) and two removals.
             * - Up to three balance operations.
             * # </weight>
             **/
            closeTip: AugmentedSubmittable<(hash: Hash | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Put forward a suggestion for spending. A deposit proportional to the value
             * is reserved and slashed if the proposal is rejected. It is returned once the
             * proposal is awarded.
             * # <weight>
             * - O(1).
             * - Limited storage reads.
             * - One DB change, one extra DB entry.
             * # </weight>
             **/
            proposeSpend: AugmentedSubmittable<(value: Compact<BalanceOf> | AnyNumber | Uint8Array, beneficiary: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Reject a proposed spend. The original deposit will be slashed.
             * # <weight>
             * - O(1).
             * - Limited storage reads.
             * - One DB clear.
             * # </weight>
             **/
            rejectProposal: AugmentedSubmittable<(proposalId: Compact<ProposalIndex> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Report something `reason` that deserves a tip and claim any eventual the finder's fee.
             * The dispatch origin for this call must be _Signed_.
             * Payment: `TipReportDepositBase` will be reserved from the origin account, as well as
             * `TipReportDepositPerByte` for each byte in `reason`.
             * - `reason`: The reason for, or the thing that deserves, the tip; generally this will be
             * a UTF-8-encoded URL.
             * - `who`: The account which should be credited for the tip.
             * Emits `NewTip` if successful.
             * # <weight>
             * - `O(R)` where `R` length of `reason`.
             * - One balance operation.
             * - One storage mutation (codec `O(R)`).
             * - One event.
             * # </weight>
             **/
            reportAwesome: AugmentedSubmittable<(reason: Bytes | string | Uint8Array, who: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Retract a prior tip-report from `report_awesome`, and cancel the process of tipping.
             * If successful, the original deposit will be unreserved.
             * The dispatch origin for this call must be _Signed_ and the tip identified by `hash`
             * must have been reported by the signing account through `report_awesome` (and not
             * through `tip_new`).
             * - `hash`: The identity of the open tip for which a tip value is declared. This is formed
             * as the hash of the tuple of the original tip `reason` and the beneficiary account ID.
             * Emits `TipRetracted` if successful.
             * # <weight>
             * - `O(T)`
             * - One balance operation.
             * - Two storage removals (one read, codec `O(T)`).
             * - One event.
             * # </weight>
             **/
            retractTip: AugmentedSubmittable<(hash: Hash | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Declare a tip value for an already-open tip.
             * The dispatch origin for this call must be _Signed_ and the signing account must be a
             * member of the `Tippers` set.
             * - `hash`: The identity of the open tip for which a tip value is declared. This is formed
             * as the hash of the tuple of the hash of the original tip `reason` and the beneficiary
             * account ID.
             * - `tip_value`: The amount of tip that the sender would like to give. The median tip
             * value of active tippers will be given to the `who`.
             * Emits `TipClosing` if the threshold of tippers has been reached and the countdown period
             * has started.
             * # <weight>
             * - `O(T)`
             * - One storage mutation (codec `O(T)`), one storage read `O(1)`.
             * - Up to one event.
             * # </weight>
             **/
            tip: AugmentedSubmittable<(hash: Hash | string | Uint8Array, tipValue: BalanceOf | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Give a tip for something new; no finder's fee will be taken.
             * The dispatch origin for this call must be _Signed_ and the signing account must be a
             * member of the `Tippers` set.
             * - `reason`: The reason for, or the thing that deserves, the tip; generally this will be
             * a UTF-8-encoded URL.
             * - `who`: The account which should be credited for the tip.
             * - `tip_value`: The amount of tip that the sender would like to give. The median tip
             * value of active tippers will be given to the `who`.
             * Emits `NewTip` if successful.
             * # <weight>
             * - `O(R + T)` where `R` length of `reason`, `T` is the number of tippers. `T` is
             * naturally capped as a membership set, `R` is limited through transaction-size.
             * - Two storage insertions (codecs `O(R)`, `O(T)`), one read `O(1)`.
             * - One event.
             * # </weight>
             **/
            tipNew: AugmentedSubmittable<(reason: Bytes | string | Uint8Array, who: AccountId | string | Uint8Array, tipValue: BalanceOf | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
        };
        utility: {
            [index: string]: SubmittableExtrinsicFunction<ApiType>;
            /**
             * Register approval for a dispatch to be made from a deterministic composite account if
             * approved by a total of `threshold - 1` of `other_signatories`.
             * Payment: `MultisigDepositBase` will be reserved if this is the first approval, plus
             * `threshold` times `MultisigDepositFactor`. It is returned once this dispatch happens or
             * is cancelled.
             * The dispatch origin for this call must be _Signed_.
             * - `threshold`: The total number of approvals for this dispatch before it is executed.
             * - `other_signatories`: The accounts (other than the sender) who can approve this
             * dispatch. May not be empty.
             * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
             * not the first approval, then it must be `Some`, with the timepoint (block number and
             * transaction index) of the first approval transaction.
             * - `call_hash`: The hash of the call to be executed.
             * NOTE: If this is the final approval, you will want to use `as_multi` instead.
             * # <weight>
             * - `O(S)`.
             * - Up to one balance-reserve or unreserve operation.
             * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
             * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
             * - One encode & hash, both of complexity `O(S)`.
             * - Up to one binary search and insert (`O(logS + S)`).
             * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
             * - One event.
             * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
             * deposit taken for its lifetime of
             * `MultisigDepositBase + threshold * MultisigDepositFactor`.
             * # </weight>
             **/
            approveAsMulti: AugmentedSubmittable<(threshold: u16 | AnyNumber | Uint8Array, otherSignatories: Vec<AccountId> | (AccountId | string | Uint8Array)[], maybeTimepoint: Option<Timepoint> | null | object | string | Uint8Array, callHash: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Register approval for a dispatch to be made from a deterministic composite account if
             * approved by a total of `threshold - 1` of `other_signatories`.
             * If there are enough, then dispatch the call.
             * Payment: `MultisigDepositBase` will be reserved if this is the first approval, plus
             * `threshold` times `MultisigDepositFactor`. It is returned once this dispatch happens or
             * is cancelled.
             * The dispatch origin for this call must be _Signed_.
             * - `threshold`: The total number of approvals for this dispatch before it is executed.
             * - `other_signatories`: The accounts (other than the sender) who can approve this
             * dispatch. May not be empty.
             * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
             * not the first approval, then it must be `Some`, with the timepoint (block number and
             * transaction index) of the first approval transaction.
             * - `call`: The call to be executed.
             * NOTE: Unless this is the final approval, you will generally want to use
             * `approve_as_multi` instead, since it only requires a hash of the call.
             * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
             * on success, result is `Ok` and the result from the interior call, if it was executed,
             * may be found in the deposited `MultisigExecuted` event.
             * # <weight>
             * - `O(S + Z + Call)`.
             * - Up to one balance-reserve or unreserve operation.
             * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
             * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
             * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
             * - One encode & hash, both of complexity `O(S)`.
             * - Up to one binary search and insert (`O(logS + S)`).
             * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
             * - One event.
             * - The weight of the `call`.
             * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
             * deposit taken for its lifetime of
             * `MultisigDepositBase + threshold * MultisigDepositFactor`.
             * # </weight>
             **/
            asMulti: AugmentedSubmittable<(threshold: u16 | AnyNumber | Uint8Array, otherSignatories: Vec<AccountId> | (AccountId | string | Uint8Array)[], maybeTimepoint: Option<Timepoint> | null | object | string | Uint8Array, call: Call | {
                callIndex?: any;
                args?: any;
            } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Send a call through an indexed pseudonym of the sender.
             * The dispatch origin for this call must be _Signed_.
             * # <weight>
             * - The weight of the `call` + 10,000.
             * # </weight>
             **/
            asSub: AugmentedSubmittable<(index: u16 | AnyNumber | Uint8Array, call: Call | {
                callIndex?: any;
                args?: any;
            } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
            /**
             * Send a batch of dispatch calls.
             * This will execute until the first one fails and then stop.
             * May be called from any origin.
             * - `calls`: The calls to be dispatched from the same origin.
             * # <weight>
             * - The sum of the weights of the `calls`.
             * - One event.
             * # </weight>
             * This will return `Ok` in all circumstances. To determine the success of the batch, an
             * event is deposited. If a call failed and the batch was interrupted, then the
             * `BatchInterrupted` event is deposited, along with the number of successful calls made
             * and the error of the failed call. If all were successful, then the `BatchCompleted`
             * event is deposited.
             **/
            batch: AugmentedSubmittable<(calls: Vec<Call> | (Call | {
                callIndex?: any;
                args?: any;
            } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
            /**
             * Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
             * for this operation will be unreserved on success.
             * The dispatch origin for this call must be _Signed_.
             * - `threshold`: The total number of approvals for this dispatch before it is executed.
             * - `other_signatories`: The accounts (other than the sender) who can approve this
             * dispatch. May not be empty.
             * - `timepoint`: The timepoint (block number and transaction index) of the first approval
             * transaction for this dispatch.
             * - `call_hash`: The hash of the call to be executed.
             * # <weight>
             * - `O(S)`.
             * - Up to one balance-reserve or unreserve operation.
             * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
             * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
             * - One encode & hash, both of complexity `O(S)`.
             * - One event.
             * - I/O: 1 read `O(S)`, one remove.
             * - Storage: removes one item.
             * # </weight>
             **/
            cancelAsMulti: AugmentedSubmittable<(threshold: u16 | AnyNumber | Uint8Array, otherSignatories: Vec<AccountId> | (AccountId | string | Uint8Array)[], timepoint: Timepoint | {
                height?: any;
                index?: any;
            } | string | Uint8Array, callHash: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
        };
    }
    interface SubmittableExtrinsics<ApiType extends ApiTypes> extends AugmentedSubmittables<ApiType> {
        (extrinsic: Call | Extrinsic | Uint8Array | string): SubmittableExtrinsic<ApiType>;
        [index: string]: SubmittableModuleExtrinsics<ApiType>;
    }
}
