/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Presage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- AlterTable
ALTER TABLE "Presage" ADD COLUMN     "content" VARCHAR(500),
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "audio" DROP NOT NULL;

-- DropTable
DROP TABLE "Post";
