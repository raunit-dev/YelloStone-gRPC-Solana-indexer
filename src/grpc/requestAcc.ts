import { SubscribeRequest, CommitmentLevel } from "@triton-one/yellowstone-grpc";

export function createAccountOnlySubscription(): SubscribeRequest {
  return {
    accounts: {
      "specific_accounts": {
        account: [
          "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC mint
          "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // USDT mint
          "So11111111111111111111111111111111111111112",   // Wrapped SOL
        ],
        owner: [],
        filters: []
      }
    },
    slots: {}, // Empty - no slot subscription
    transactions: {}, // Empty - no transaction subscription
    transactionsStatus: {},
    entry: {},
    blocks: {}, // Empty - no block subscription
    blocksMeta: {},
    commitment: CommitmentLevel.CONFIRMED,
    accountsDataSlice: [],
  };
}

