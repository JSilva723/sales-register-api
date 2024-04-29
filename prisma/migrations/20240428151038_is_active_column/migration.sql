/*
  Warnings:

  - You are about to drop the column `isActive` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `payments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "isActive",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "isActive",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
