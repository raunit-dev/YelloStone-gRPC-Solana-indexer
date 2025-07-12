/*
  Warnings:

  - The `owner` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "owner",
ADD COLUMN     "owner" BYTEA,
ALTER COLUMN "lamports" DROP NOT NULL,
ALTER COLUMN "lamports" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "Account_owner_idx" ON "Account"("owner");
