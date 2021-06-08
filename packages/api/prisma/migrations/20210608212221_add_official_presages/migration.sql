/*
  Warnings:

  - Changed the type of `type` on the `Presage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('audio', 'text');

-- AlterTable
ALTER TABLE "Presage" ADD COLUMN     "official" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publisher" TEXT,
ALTER COLUMN "userId" DROP NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "Type" NOT NULL;
