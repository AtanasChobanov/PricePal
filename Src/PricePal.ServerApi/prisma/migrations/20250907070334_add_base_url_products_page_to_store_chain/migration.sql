/*
  Warnings:

  - You are about to drop the column `website` on the `StoreChain` table. All the data in the column will be lost.
  - Added the required column `base_url` to the `StoreChain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `products_page` to the `StoreChain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."StoreChain" DROP COLUMN "website",
ADD COLUMN     "base_url" TEXT NOT NULL,
ADD COLUMN     "products_page" TEXT NOT NULL;
