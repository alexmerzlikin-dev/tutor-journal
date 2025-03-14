/*
  Warnings:

  - Added the required column `topic` to the `lessons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lessons" ADD COLUMN     "topic" TEXT NOT NULL;
