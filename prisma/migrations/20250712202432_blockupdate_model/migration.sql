-- AlterTable
ALTER TABLE "BlockUpdate" ALTER COLUMN "blockhash" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SlotUpdate" ALTER COLUMN "slot" DROP NOT NULL;
