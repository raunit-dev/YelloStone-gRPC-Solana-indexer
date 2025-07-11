import { SubscribeUpdate } from "@triton-one/yellowstone-grpc";
import chalk from "chalk"; // Requires: npm install chalk

function printSectionHeader(title: string) {
  const line = '-'.repeat(30);
  console.log(`\n${line} ${title} ${line}`);
}

export async function handleData(data: SubscribeUpdate): Promise<void> {
  if (data.account) {
    const acc = data.account.account;
    const pubkey = acc?.pubkey;
    const owner = acc?.owner;
    const lamports = acc?.lamports;
    const executable = acc?.executable;
    const rentEpoch = acc?.rentEpoch;
    const slot = data.account.slot;
    const dataLen = acc?.data?.length || 0;

    printSectionHeader("📦 Account Update");
    console.log(`${chalk.cyan("Pubkey:")}         ${pubkey}`);
    console.log(`${chalk.cyan("Owner:")}          ${owner}`);
    console.log(`${chalk.cyan("Lamports:")}       ${lamports}`);
    console.log(`${chalk.cyan("Executable:")}     ${executable}`);
    console.log(`${chalk.cyan("Rent Epoch:")}     ${rentEpoch}`);
    console.log(`${chalk.cyan("Slot:")}           ${slot}`);
    console.log(`${chalk.cyan("Data Length:")}    ${dataLen}`);
  }

  if (data.transaction) {
    const txnInfo = data.transaction.transaction;
    const sig = txnInfo?.signature;
    const slot = data.transaction.slot;
    const success = txnInfo?.meta?.err === null;

    printSectionHeader("🔁 Transaction");
    console.log(`${chalk.magenta("Signature:")}    ${sig}`);
    console.log(`${chalk.magenta("Slot:")}         ${slot}`);
    console.log(`${chalk.magenta("Success:")}      ${success}`);
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
