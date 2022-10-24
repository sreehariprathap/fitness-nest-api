-- CreateTable
CREATE TABLE "weight" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "weight" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "weight_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "weight" ADD CONSTRAINT "weight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
