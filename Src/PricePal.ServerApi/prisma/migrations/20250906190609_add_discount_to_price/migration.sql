/*
  Warnings:

  - You are about to drop the column `is_promo` on the `Price` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Price" DROP COLUMN "is_promo",
ADD COLUMN     "discount" INTEGER;
