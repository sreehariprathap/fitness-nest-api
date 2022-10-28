-- CreateTable
CREATE TABLE "dailyGoals" (
    "id" SERIAL NOT NULL,
    "inTakeGoal" INTEGER NOT NULL,
    "burnGoal" INTEGER NOT NULL,
    "waterGoal" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "dailyGoals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dailyGoals" ADD CONSTRAINT "dailyGoals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
