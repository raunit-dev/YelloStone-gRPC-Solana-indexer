import { SubscribeRequest, CommitmentLevel } from "@triton-one/yellowstone-grpc";

export function createSubscribeRequest(): SubscribeRequest {
  return {
    accounts: {
      // "token_accounts": {
      //   account: ["11111111111111111111111111111111"],
      //   owner: [],
      //   filters: [
      //     {
      //       datasize: "165",
      //       memcmp: {
      //         offset: "32",
      //       },
      //       lamports: { gt: "0" }
      //     }
      //   ]
      // }
    },
    slots: {
      // "slot_updates": {
      //   filterByCommitment: true,
      //   interslotUpdates: true
      // }
    },
    transactions: {
      // "vote_transactions": {
      //   accountInclude: ["11111111111111111111111111111111"],
      //   accountExclude: [],
      //   accountRequired: [],
      // },
    },
    transactionsStatus: {},
    entry: {},
    blocks: {
      // "block": {
      //   accountInclude: ["11111111111111111111111111111111"],
      //   includeTransactions: true,
      // }
    },
    blocksMeta: {},
    commitment: CommitmentLevel.FINALIZED,
    accountsDataSlice: [],
  };
}
