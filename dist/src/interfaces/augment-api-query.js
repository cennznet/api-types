"use strict";
// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
const codec_1 = require("@polkadot/types/codec");
const rxjs_1 = require("rxjs");
;
cennzxSpot: {
    [index, string];
    QueryableStorageEntry();
    /**
     * AssetId of Core Asset
     **/
    coreAssetId: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Default Trading fee rate
     **/
    defaultFeeRate: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Asset balance of an investor in an exchange pool.
     * Key: `(core_asset_id, trade_asset_id), account_id`
     **/
    liquidityBalance: AugmentedQueryDoubleMap( & QueryableStorageEntry());
    /**
     * Total supply of exchange token in existence.
     * it will always be less than the core asset's total supply
     * Key: `(asset id, core asset id)`
     **/
    totalSupply: AugmentedQuery( & QueryableStorageEntry());
}
;
contracts: {
    [index, string];
    QueryableStorageEntry();
    /**
     * The subtrie counter.
     **/
    accountCounter: AugmentedQuery( & QueryableStorageEntry());
    /**
     * A mapping between an original code hash and instrumented wasm code, ready for execution.
     **/
    codeStorage: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The code associated with a given account.
     **/
    contractInfoOf: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Current cost schedule for contracts.
     **/
    currentSchedule: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The price of one unit of gas.
     **/
    gasPrice: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Gas spent so far in this block.
     **/
    gasSpent: AugmentedQuery( & QueryableStorageEntry());
    /**
     * A mapping from an original code hash to the original code, untouched by instrumentation.
     **/
    pristineCode: AugmentedQuery( & QueryableStorageEntry());
}
;
council: {
    [index, string];
    QueryableStorageEntry();
    /**
     * The current members of the collective. This is stored sorted (just by value).
     **/
    members: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The member who provides the default vote for any other members that do not vote before
     * the timeout. If None, then no member has that privilege.
     **/
    prime: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Proposals so far.
     **/
    proposalCount: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Actual proposal for a given hash, if it's current.
     **/
    proposalOf: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The hashes of the active proposals.
     **/
    proposals: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Votes on a given proposal, if it is ongoing.
     **/
    voting: AugmentedQuery( & QueryableStorageEntry());
}
;
elections: {
    [index, string];
    QueryableStorageEntry();
    /**
     * The present candidate list. Sorted based on account-id. A current member or runner-up
     * can never enter this vector and is always implicitly assumed to be a candidate.
     **/
    candidates: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The total number of vote rounds that have happened, excluding the upcoming one.
     **/
    electionRounds: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The current elected membership. Sorted based on account id.
     **/
    members: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The current runners_up. Sorted based on low to high merit (worse to best runner).
     **/
    runnersUp: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Votes and locked stake of a particular voter.
     **/
    voting: AugmentedQuery( & QueryableStorageEntry());
}
;
genericAsset: {
    [index, string];
    QueryableStorageEntry();
    /**
     * The free balance of a given asset under an account.
     **/
    freeBalance: AugmentedQueryDoubleMap( & QueryableStorageEntry());
    /**
     * Any liquidity locks on some account balances.
     **/
    locks: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Next available ID for user-created asset.
     **/
    nextAssetId: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Permission options for a given asset.
     **/
    permissions: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The reserved balance of a given asset under an account.
     **/
    reservedBalance: AugmentedQueryDoubleMap( & QueryableStorageEntry());
    /**
     * The identity of the asset which is the one that is designated for paying the chain's transaction fee.
     **/
    spendingAssetId: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The identity of the asset which is the one that is designated for the chain's staking system.
     **/
    stakingAssetId: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Total issuance of a given asset.
     **/
    totalIssuance: AugmentedQuery( & QueryableStorageEntry());
}
;
grandpa: {
    [index, string];
    QueryableStorageEntry();
    /**
     * The number of changes (both in terms of keys and underlying economic responsibilities)
     * in the "set" of Grandpa validators from genesis.
     **/
    currentSetId: AugmentedQuery( & QueryableStorageEntry());
    /**
     * next block number where we can force a change.
     **/
    nextForced: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Pending change: (signaled at, scheduled change).
     **/
    pendingChange: AugmentedQuery( & QueryableStorageEntry());
    /**
     * A mapping from grandpa set ID to the index of the *most recent* session for which its
     * members were responsible.
     **/
    setIdSession: AugmentedQuery( & QueryableStorageEntry());
    /**
     * `true` if we are currently stalled.
     **/
    stalled: AugmentedQuery( & QueryableStorageEntry());
    /**
     * State of the current authority set.
     **/
    state: AugmentedQuery( & QueryableStorageEntry());
}
;
imOnline: {
    [index, string];
    QueryableStorageEntry();
    /**
     * For each session index, we keep a mapping of `T::ValidatorId` to the
     * number of blocks authored by the given authority.
     **/
    authoredBlocks: AugmentedQueryDoubleMap( & QueryableStorageEntry());
    /**
     * The block number after which it's ok to send heartbeats in current session.
     * At the beginning of each session we set this to a value that should
     * fall roughly in the middle of the session duration.
     * The idea is to first wait for the validators to produce a block
     * in the current session, so that the heartbeat later on will not be necessary.
     **/
    heartbeatAfter: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The current set of keys that may issue a heartbeat.
     **/
    keys: AugmentedQuery( & QueryableStorageEntry());
    /**
     * For each session index, we keep a mapping of `AuthIndex` to
     * `offchain::OpaqueNetworkState`.
     **/
    receivedHeartbeats: AugmentedQueryDoubleMap( & QueryableStorageEntry());
}
;
offences: {
    [index, string];
    QueryableStorageEntry();
    /**
     * A vector of reports of the same kind that happened at the same time slot.
     **/
    concurrentReportsIndex: AugmentedQueryDoubleMap( & QueryableStorageEntry());
    /**
     * The primary structure that holds all offence records keyed by report identifiers.
     **/
    reports: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Enumerates all reports of a kind along with the time they happened.
     * All reports are sorted by the time of offence.
     * Note that the actual type of this mapping is `Vec<u8>`, this is because values of
     * different types are not supported at the moment so we are doing the manual serialization.
     **/
    reportsByKindIndex: AugmentedQuery( & QueryableStorageEntry());
}
;
randomnessCollectiveFlip: {
    [index, string];
    QueryableStorageEntry();
    /**
     * Series of block headers from the last 81 blocks that acts as random seed material. This
     * is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
     * the oldest hash.
     **/
    randomMaterial: AugmentedQuery( & QueryableStorageEntry());
}
;
session: {
    [index, string];
    QueryableStorageEntry();
    /**
     * Current index of the session.
     **/
    currentIndex: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Indices of disabled validators.
     * The set is cleared when `on_session_ending` returns a new set of identities.
     **/
    disabledValidators: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The owner of a key. The key is the `KeyTypeId` + the encoded key.
     **/
    keyOwner: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The next session keys for a validator.
     **/
    nextKeys: AugmentedQuery( & QueryableStorageEntry());
    /**
     * True if the underlying economic identities or weighting behind the validators
     * has changed in the queued validator set.
     **/
    queuedChanged: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The queued keys for the next session. When the next session begins, these keys
     * will be used to determine the validator's session keys.
     **/
    queuedKeys: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The current set of validators.
     **/
    validators: AugmentedQuery( & QueryableStorageEntry());
}
;
staking: {
    [index, string];
    QueryableStorageEntry();
    /**
     * Map from all locked "stash" accounts to the controller account.
     **/
    bonded: AugmentedQuery( & QueryableStorageEntry());
    /**
     * A mapping from still-bonded eras to the first session index of that era.
     **/
    bondedEras: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The amount of currency given to reporters of a slash event which was
     * canceled by extraordinary circumstances (e.g. governance).
     **/
    canceledSlashPayout: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The currently elected validator set keyed by stash account ID.
     **/
    currentElected: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The current era index.
     **/
    currentEra: AugmentedQuery( & QueryableStorageEntry());
    currentEraDuration: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Total transaction payment rewards for elected validators
     **/
    currentEraFeeRewards: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Rewards for the current era. Using indices of current elected set.
     **/
    currentEraPointsEarned: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The start of the current era.
     **/
    currentEraStart: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The session index at which the current era started.
     **/
    currentEraStartSessionIndex: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The earliest era for which we have a pending, unapplied slash.
     **/
    earliestUnappliedSlash: AugmentedQuery( & QueryableStorageEntry());
    /**
     * True if the next session change will be a new era regardless of index.
     **/
    forceEra: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Any validators that may never be slashed or forcibly kicked. It's a Vec since they're
     * easy to initialize and the performance hit is minimal (we expect no more than four
     * invulnerables) and restricted to testnets.
     **/
    invulnerables: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Map from all (unlocked) "controller" accounts to the info regarding the staking.
     **/
    ledger: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Minimum amount to bond.
     **/
    minimumBond: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Minimum number of staking participants before emergency conditions are imposed.
     **/
    minimumValidatorCount: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The map from nominator stash key to the set of stash keys of all validators to nominate.
     * NOTE: is private so that we can ensure upgraded before all typical accesses.
     * Direct storage APIs can still bypass this protection.
     **/
    nominators: AugmentedQuery( & QueryableStorageEntry());
    /**
     * All slashing events on nominators, mapped by era to the highest slash value of the era.
     **/
    nominatorSlashInEra: AugmentedQueryDoubleMap( & QueryableStorageEntry());
    /**
     * Where the reward payment should be made. Keyed by stash.
     **/
    payee: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Slashing spans for stash accounts.
     **/
    slashingSpans: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The percentage of the slash that is distributed to reporters.
     * The rest of the slashed value is handled by the `Slash`.
     **/
    slashRewardFraction: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The amount of balance actively at stake for each validator slot, currently.
     * This is used to derive rewards and punishments.
     **/
    slotStake: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Records information about the maximum slash of a stash within a slashing span,
     * as well as how much reward has been paid out.
     **/
    spanSlash: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Nominators for a particular account that is in action right now. You can't iterate
     * through validators here, but you can find them in the Session module.
     * This is keyed by the stash account.
     **/
    stakers: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The version of storage for upgrade.
     **/
    storageVersion: AugmentedQuery( & QueryableStorageEntry());
    /**
     * All unapplied slashes that are queued for later.
     **/
    unappliedSlashes: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The ideal number of staking participants.
     **/
    validatorCount: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The map from (wannabe) validator stash key to the preferences of that validator.
     **/
    validators: AugmentedQuery( & QueryableStorageEntry());
    /**
     * All slashing events on validators, mapped by era to the highest slash proportion
     * and slash value of the era.
     **/
    validatorSlashInEra: AugmentedQueryDoubleMap( & QueryableStorageEntry());
}
;
sudo: {
    [index, string];
    QueryableStorageEntry();
    /**
     * The `AccountId` of the sudo key.
     **/
    key: AugmentedQuery( & QueryableStorageEntry());
}
;
syloDevice: {
    [index, string];
    QueryableStorageEntry();
    devices: AugmentedQuery( & QueryableStorageEntry());
}
;
syloE2EE: {
    [index, string];
    QueryableStorageEntry();
    preKeyBundles: AugmentedQuery( & QueryableStorageEntry());
}
;
syloGroups: {
    [index, string];
    QueryableStorageEntry();
    groups: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Stores the known member/deviceId tuples for a particular group
     **/
    memberDevices: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Stores the group ids that a user is a member of
     **/
    memberships: AugmentedQuery( & QueryableStorageEntry());
}
;
syloInbox: {
    [index, string];
    QueryableStorageEntry();
    accountValues: AugmentedQuery( & QueryableStorageEntry());
    nextIndexes: AugmentedQuery( & QueryableStorageEntry());
    values: AugmentedQuery( & QueryableStorageEntry());
}
;
syloResponse: {
    [index, string];
    QueryableStorageEntry();
    responses: AugmentedQuery( & QueryableStorageEntry());
}
;
syloVault: {
    [index, string];
    QueryableStorageEntry();
    vault: AugmentedQuery( & QueryableStorageEntry());
}
;
system: {
    [index, string];
    QueryableStorageEntry();
    /**
     * Extrinsics nonce for accounts.
     **/
    accountNonce: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Total length (in bytes) for all extrinsics put together, for the current block.
     **/
    allExtrinsicsLen: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Total weight for all extrinsics put together, for the current block.
     **/
    allExtrinsicsWeight: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Map of block numbers to block hashes.
     **/
    blockHash: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Digest of the current block, also part of the block header.
     **/
    digest: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The number of events in the `Events<T>` list.
     **/
    eventCount: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Events deposited for the current block.
     **/
    events: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Mapping between a topic (represented by T::Hash) and a vector of indexes
     * of events in the `<Events<T>>` list.
     * All topic vectors have deterministic storage locations depending on the topic. This
     * allows light-clients to leverage the changes trie storage tracking mechanism and
     * in case of changes fetch the list of events of interest.
     * The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
     * the `EventIndex` then in case if the topic has the same contents on the next block
     * no notification will be triggered thus the event might be lost.
     **/
    eventTopics: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The execution phase of the block.
     **/
    executionPhase: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Total extrinsics count for the current block.
     **/
    extrinsicCount: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Extrinsics data for the current block (maps an extrinsic's index to its data).
     **/
    extrinsicData: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Extrinsics root of the current block, also part of the block header.
     **/
    extrinsicsRoot: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
     **/
    lastRuntimeUpgrade: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The current block number being processed. Set by `execute_block`.
     **/
    number: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Hash of the previous block.
     **/
    parentHash: AugmentedQuery( & QueryableStorageEntry());
}
;
technicalCommittee: {
    [index, string];
    QueryableStorageEntry();
    /**
     * The current members of the collective. This is stored sorted (just by value).
     **/
    members: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The member who provides the default vote for any other members that do not vote before
     * the timeout. If None, then no member has that privilege.
     **/
    prime: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Proposals so far.
     **/
    proposalCount: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Actual proposal for a given hash, if it's current.
     **/
    proposalOf: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The hashes of the active proposals.
     **/
    proposals: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Votes on a given proposal, if it is ongoing.
     **/
    voting: AugmentedQuery( & QueryableStorageEntry());
}
;
technicalMembership: {
    [index, string];
    QueryableStorageEntry();
    /**
     * The current membership, stored as an ordered Vec.
     **/
    members: AugmentedQuery( & QueryableStorageEntry());
    /**
     * The current prime member, if one exists.
     **/
    prime: AugmentedQuery( & QueryableStorageEntry());
}
;
timestamp: {
    [index, string];
    QueryableStorageEntry();
    /**
     * Did the timestamp get updated in this block?
     **/
    didUpdate: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Current time for the current block.
     **/
    now: AugmentedQuery( & QueryableStorageEntry());
}
;
transactionPayment: {
    [index, string];
    QueryableStorageEntry();
    nextFeeMultiplier: AugmentedQuery( & QueryableStorageEntry());
}
;
treasury: {
    [index, string];
    QueryableStorageEntry();
    /**
     * Proposal indices that have been approved but not yet awarded.
     **/
    approvals: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Number of proposals that have been made.
     **/
    proposalCount: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Proposals that have been made.
     **/
    proposals: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Simple preimage lookup from the reason's hash to the original data. Again, has an
     * insecure enumerable hash since the key is guaranteed to be the result of a secure hash.
     **/
    reasons: AugmentedQuery( & QueryableStorageEntry());
    /**
     * Tips that are not yet completed. Keyed by the hash of `(reason, who)` from the value.
     * This has the insecure enumerable hash function since the key itself is already
     * guaranteed to be a secure hash.
     **/
    tips: AugmentedQuery( & QueryableStorageEntry());
}
;
utility: {
    [index, string];
    QueryableStorageEntry();
    /**
     * The set of open multisig operations.
     **/
    multisigs: AugmentedQueryDoubleMap( & QueryableStorageEntry());
}
;
