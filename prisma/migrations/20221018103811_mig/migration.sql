/*
  Warnings:

  - The `calories` column on the `intakes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "intakes" ADD COLUMN     "foodItem" TEXT,
DROP COLUMN "calories",
ADD COLUMN     "calories" INTEGER;
