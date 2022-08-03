/*
  Warnings:

  - The primary key for the `ReactionCount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ReactionCount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReactionCount" DROP CONSTRAINT "ReactionCount_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ReactionCount_pkey" PRIMARY KEY ("draftId", "type");
