-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "pubkey" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "lamports" BIGINT NOT NULL,
    "executable" BOOLEAN NOT NULL,
    "rentEpoch" INTEGER NOT NULL,
    "slot" BIGINT NOT NULL,
    "dataLength" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "signature" TEXT NOT NULL,
    "slot" BIGINT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SlotUpdate" (
    "id" SERIAL NOT NULL,
    "slot" BIGINT NOT NULL,
    "parent" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SlotUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockUpdate" (
    "id" SERIAL NOT NULL,
    "blockhash" TEXT NOT NULL,
    "blockHeight" BIGINT NOT NULL,
    "blockTime" TIMESTAMP(3),
    "parentSlot" BIGINT NOT NULL,
    "parentBlockhash" TEXT NOT NULL,
    "executedTransactions" INTEGER NOT NULL,
    "updatedAccounts" INTEGER NOT NULL,
    "entries" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlockUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_pubkey_key" ON "Account"("pubkey");

-- CreateIndex
CREATE INDEX "Account_slot_idx" ON "Account"("slot");

-- CreateIndex
CREATE INDEX "Account_owner_idx" ON "Account"("owner");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_signature_key" ON "Transaction"("signature");

-- CreateIndex
CREATE INDEX "Transaction_slot_idx" ON "Transaction"("slot");

-- CreateIndex
CREATE INDEX "Transaction_success_idx" ON "Transaction"("success");

-- CreateIndex
CREATE UNIQUE INDEX "SlotUpdate_slot_key" ON "SlotUpdate"("slot");

-- CreateIndex
CREATE INDEX "SlotUpdate_slot_idx" ON "SlotUpdate"("slot");

-- CreateIndex
CREATE UNIQUE INDEX "BlockUpdate_blockhash_key" ON "BlockUpdate"("blockhash");

-- CreateIndex
CREATE INDEX "BlockUpdate_blockHeight_idx" ON "BlockUpdate"("blockHeight");

-- CreateIndex
CREATE INDEX "BlockUpdate_parentSlot_idx" ON "BlockUpdate"("parentSlot");
