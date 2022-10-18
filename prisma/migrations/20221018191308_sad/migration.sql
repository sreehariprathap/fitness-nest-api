/*
  Warnings:

  - Made the column `foodItem` on table `intakes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `calories` on table `intakes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "intakes" ALTER COLUMN "foodItem" SET NOT NULL,
ALTER COLUMN "calories" SET NOT NULL;
