-- AlterTable
ALTER TABLE "dailyGoals" ADD COLUMN     "burnGoalStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "inTakeGoalStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "waterGoalStatus" BOOLEAN NOT NULL DEFAULT false;
