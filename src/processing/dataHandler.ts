import { SubscribeUpdate } from "@triton-one/yellowstone-grpc";

function printSectionHeader(title: string) {
  console.log(`\n---------------------------------------- ${title} ----------------------------------------`);
}

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

    printSectionHeader("📦 Account Update");
    console.table({
      Pubkey: pubkey,
      Owner: owner,
      Lamports: lamports,
      Executable: executable,
      RentEpoch: rentEpoch,
      Slot: slot,
      DataLength: dataB64.length,
    });
  }

  if (data.transaction) {
    const txnInfo = data.transaction.transaction;
    const sig = txnInfo?.signature;
    const slot = data.transaction.slot;
    const success = txnInfo?.meta?.err === null;

    printSectionHeader("🔁 Transaction");
    console.table({
      Signature: sig,
      Slot: slot,
      Success: success,
    });
  }

  if (data.slot) {
    const { slot, parent } = data.slot;

    printSectionHeader("⏱️ Slot Update");
    console.table({
      Slot: slot,
      Parent: parent,
    });
  }

  if (data.block) {
    const block = data.block;

    printSectionHeader("🧱 Block Update");
    console.table({
      Blockhash: block.blockhash,
      BlockHeight: block.blockHeight,
      BlockTime: block.blockTime,
      ParentSlot: block.parentSlot,
      ParentBlockhash: block.parentBlockhash,
      ExecutedTransactions: block.executedTransactionCount,
      UpdatedAccounts: block.updatedAccountCount,
      Entries: block.entriesCount,
    });
  }
}
