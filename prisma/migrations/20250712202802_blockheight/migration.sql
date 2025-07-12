-- AlterTable
ALTER TABLE "BlockUpdate" ALTER COLUMN "blockHeight" DROP NOT NULL,
ALTER COLUMN "blockHeight" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SlotUpdate" ALTER COLUMN "parent" SET DATA TYPE TEXT;
