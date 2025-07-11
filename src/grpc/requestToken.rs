import { SubscribeRequest, CommitmentLevel } from "@triton-one/yellowstone-grpc";


export function createTokenProgramSubscription(): SubscribeRequest {
    return {
        accounts: {
            "token_program_accounts": {
                account: [],
                owner: ["TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"],
                filters: [
                    {
                        datasize: "165"
                    }
                ]
            }
        },
        slots: {},
        transactions: {},
        transactionsStatus: {},
        entry: {},
        blocks: {},
        blocksMeta: {},
        commitment: CommitmentLevel.CONFIRMED,
        accountsDataSlice: [],
    };
}