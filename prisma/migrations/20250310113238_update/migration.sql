/*
  Warnings:

  - You are about to drop the column `duration` on the `lessons` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `lessons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "duration",
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL;
