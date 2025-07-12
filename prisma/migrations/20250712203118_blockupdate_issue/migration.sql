/*
  Warnings:

  - Made the column `blockHeight` on table `BlockUpdate` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BlockUpdate" ALTER COLUMN "blockHeight" SET NOT NULL,
ALTER COLUMN "parentSlot" DROP NOT NULL,
ALTER COLUMN "parentSlot" SET DATA TYPE TEXT,
ALTER COLUMN "executedTransactions" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAccounts" SET DATA TYPE TEXT,
ALTER COLUMN "entries" SET DATA TYPE TEXT;
