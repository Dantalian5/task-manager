/*
  Warnings:

  - You are about to drop the column `isComplited` on the `SubTask` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SubTask" DROP COLUMN "isComplited",
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;
