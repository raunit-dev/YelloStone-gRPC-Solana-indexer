/*
  Warnings:

  - The `signature` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "signature",
ADD COLUMN     "signature" BYTEA,
ALTER COLUMN "slot" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_signature_key" ON "Transaction"("signature");
