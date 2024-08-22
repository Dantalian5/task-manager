-- CreateEnum
CREATE TYPE "SortOrder" AS ENUM ('alphaAsc', 'alphaDesc', 'dateNewest', 'dateOldest', 'updatedNewest', 'updatedOldest');

-- CreateTable
CREATE TABLE "Setting" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "boardSortBy" "SortOrder" NOT NULL DEFAULT 'dateNewest',
    "columnSortBy" "SortOrder" NOT NULL DEFAULT 'dateNewest',
    "taskSortBy" "SortOrder" NOT NULL DEFAULT 'dateNewest',

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Setting_userId_key" ON "Setting"("userId");

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
