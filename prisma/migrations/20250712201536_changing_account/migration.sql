/*
  Warnings:

  - Changed the type of `pubkey` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "pubkey",
ADD COLUMN     "pubkey" BYTEA NOT NULL,
ALTER COLUMN "slot" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Account_pubkey_key" ON "Account"("pubkey");
