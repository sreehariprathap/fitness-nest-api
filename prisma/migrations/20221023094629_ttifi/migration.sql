-- AlterTable
ALTER TABLE "todos" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "date" DROP NOT NULL;
