import { SubscribeUpdate } from "@triton-one/yellowstone-grpc";

export async function handleData(data: SubscribeUpdate): Promise<void> {
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
