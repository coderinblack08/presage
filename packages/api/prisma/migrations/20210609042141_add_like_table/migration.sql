-- AlterTable
ALTER TABLE "Presage" ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Like" (
    "presageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("presageId","userId")
);

-- AddForeignKey
ALTER TABLE "Like" ADD FOREIGN KEY ("presageId") REFERENCES "Presage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
