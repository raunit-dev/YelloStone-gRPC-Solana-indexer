import { SubscribeRequest, CommitmentLevel } from "@triton-one/yellowstone-grpc";

export function createSubscribeRequest(): SubscribeRequest {
  return {
    accounts: {},
    slots: {},
    transactions: {
     group: {
        // eg: listen to vote transactions
        accountInclude: ["Vote111111111111111111111111111111111111111","DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263","EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"],
        accountExclude: [],
        accountRequired: [],
     },
    },
    transactionsStatus: {},
    entry: {},
    blocks: {},
    blocksMeta: {},
    commitment: CommitmentLevel.FINALIZED,
    accountsDataSlice: [], // Full account data
  };
}
