import Client from "@triton-one/yellowstone-grpc";
import { ENDPOINT } from "../config";

export function createGrpcClient(): Client {
  if (!ENDPOINT) {
    throw new Error("Missing ENDPOINT or TOKEN in .env");
  }
  console.log("🟢 Connecting to Yellowstone gRPC...");
  return new Client(ENDPOINT, undefined,undefined);
}
