/*
  Warnings:

  - You are about to alter the column `likes` on the `Video` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `views` on the `Video` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "likes" SET DATA TYPE INTEGER,
ALTER COLUMN "views" SET DATA TYPE INTEGER;
