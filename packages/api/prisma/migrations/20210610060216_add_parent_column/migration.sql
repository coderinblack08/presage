-- AlterTable
ALTER TABLE "Presage" ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "Presage" ADD FOREIGN KEY ("parentId") REFERENCES "Presage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
