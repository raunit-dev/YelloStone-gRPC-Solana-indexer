import { SubscribeRequest, SubscribeUpdate } from "@triton-one/yellowstone-grpc";
import { ClientDuplexStream } from "@grpc/grpc-js";
import { handleData } from "../processing/dataHandler";

export function sendSubscribeRequest(
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

export function handleStreamEvents(
  stream: ClientDuplexStream<SubscribeRequest, SubscribeUpdate>
): Promise<void> {
  return new Promise((resolve, reject) => {
    stream.on("data", handleData);
    stream.on("error", (err: Error) => {
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
