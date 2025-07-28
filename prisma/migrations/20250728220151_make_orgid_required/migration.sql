/*
  Warnings:

  - Made the column `orgId` on table `pet` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "pet" DROP CONSTRAINT "pet_orgId_fkey";

-- AlterTable
ALTER TABLE "pet" ALTER COLUMN "orgId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
