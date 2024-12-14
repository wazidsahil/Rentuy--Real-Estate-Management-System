/*
  Warnings:

  - You are about to drop the column `price` on the `propertyrental` table. All the data in the column will be lost.
  - You are about to drop the column `lease_term` on the `propertysale` table. All the data in the column will be lost.
  - You are about to drop the column `monthly_rent` on the `propertysale` table. All the data in the column will be lost.
  - Added the required column `lease_term` to the `PropertyRental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthly_rent` to the `PropertyRental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `PropertySale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `propertyrental` DROP COLUMN `price`,
    ADD COLUMN `lease_term` INTEGER NOT NULL,
    ADD COLUMN `monthly_rent` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `propertysale` DROP COLUMN `lease_term`,
    DROP COLUMN `monthly_rent`,
    ADD COLUMN `price` INTEGER NOT NULL;
