import Client, {
  SubscribeRequest,
  SubscribeUpdate,
  CommitmentLevel,
} from "@triton-one/yellowstone-grpc";
import { ClientDuplexStream } from "@grpc/grpc-js";
import dotenv from "dotenv";

dotenv.config();

const ENDPOINT = process.env.ENDPOINT;
const TOKEN = process.env.TOKEN;

async function main(): Promise<void> {
  if (!ENDPOINT) {
    console.error("Missing ENDPOINT or TOKEN in .env");
    return;
  }

  console.log("🟢 Connecting to Yellowstone gRPC...");
  const client = new Client(ENDPOINT, undefined,undefined);

  const stream = await client.subscribe();
  const request = createSubscribeRequest();

  try {
    await sendSubscribeRequest(stream, request);
    console.log("✅ Subscribed to accounts, slots, and transactions.");
    await handleStreamEvents(stream);
  } catch (error) {
    console.error("Subscription error:", error);
    stream.end();
  }
}

function createSubscribeRequest(): SubscribeRequest {
  return {
    accounts: {"account": "*"},
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

function sendSubscribeRequest(
  stream: ClientDuplexStream<SubscribeRequest, SubscribeUpdate>,
  request: SubscribeRequest
): Promise<void> {
  return new Promise((resolve, reject) => {
    stream.write(request, (err: Error | null) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function handleStreamEvents(
  stream: ClientDuplexStream<SubscribeRequest, SubscribeUpdate>
): Promise<void> {
  return new Promise((resolve, reject) => {
    stream.on("data", handleData);
    stream.on("error", (err) => {
      console.error("Stream error:", err);
      reject(err);
      stream.end();
    });
    stream.on("end", () => {
      console.log("Stream ended");
      resolve();
    });
    stream.on("close", () => {
      console.log("Stream closed");
      resolve();
    });
  });
}

async function handleData(data: SubscribeUpdate): Promise<void> {
  if (data.account) {
    const acc = data.account.account;
    const pubkey = acc?.pubkey;
    const owner = acc?.owner;
    const lamports = acc?.lamports;
    const executable = acc?.executable;
    const rentEpoch = acc?.rentEpoch;
    const dataB64 = Buffer.from(acc?.data || new Uint8Array()).toString("base64");
    const slot = data.account.slot;

    console.log("📦 Account Update:");
    console.log({
      pubkey,
      owner,
      lamports,
      executable,
      rentEpoch,
      slot,
      dataLength: dataB64?.length || 0,
    });
  }

  if (data.transaction) {
    const txnInfo = data.transaction.transaction;
    const sig = txnInfo?.signature;
    const slot = data.transaction.slot;
    const success = txnInfo?.meta?.err === null;

    console.log("🔁 Transaction:");
    console.log({
      signature: sig,
      slot,
      success,
    });
  }

  if (data.slot) {
    console.log("⏱️ Slot Update:", {
      slot: data.slot.slot,
      parent: data.slot.parent,
      // leader: data.slot.leader, // This property does not exist anymore
    });
  }
}

main();