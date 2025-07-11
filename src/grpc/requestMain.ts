import { SubscribeRequest, CommitmentLevel } from "@triton-one/yellowstone-grpc";

export function createSubscribeRequest(): SubscribeRequest {
  return {
    accounts: {
      "token_accounts": {
        // Must specify either specific accounts OR specific owners - cannot be both empty
        account: [
          "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC mint
          "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // USDT mint
        ],
        owner: [],
        filters: []
      }
    },
    slots: {
      "slot_updates": {
        filterByCommitment: true,
        interslotUpdates: false // Set to false to reduce noise
      }
    },
    transactions: {
      "all_transactions": {
        accountInclude: [
          "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // USDT mint // USDC mint
        ],
        accountExclude: [],
        accountRequired: [],
        vote: false, // Exclude vote transactions
        failed: false, // Exclude failed transactions
      }
    },
    transactionsStatus: {},
    entry: {},
    blocks: {
      "relevant_blocks": {
        accountInclude: [
          "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
           // USDC mint
        ],
        includeTransactions: true,
        includeAccounts: false,
        includeEntries: false
      }
    },
    blocksMeta: {},
    commitment: CommitmentLevel.CONFIRMED,
    accountsDataSlice: [],
  };
}

