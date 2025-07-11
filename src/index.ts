import { createGrpcClient } from "./grpc/client";
import { createSubscribeRequest } from "./grpc/requestMain";
// import { createAccountOnlySubscription } from "./grpc/requestAcc";
// import { createTokenProgramSubscription } from "./grpc/requestToken";
import { sendSubscribeRequest, handleStreamEvents } from "./grpc/stream";

async function main(): Promise<void> {
  const client = createGrpcClient();
  const stream = await client.subscribe();
  const request = createSubscribeRequest();
  // const request = createAccountOnlySubscription();
  // const request = createTokenProgramSubscription();
  
  try {
    await sendSubscribeRequest(stream, request);
    console.log("✅ Subscribed to accounts, slots, and transactions.");
    await handleStreamEvents(stream);
  } catch (error) {
    console.error("Subscription error:", error);
    stream.end();
  }
}

main();
