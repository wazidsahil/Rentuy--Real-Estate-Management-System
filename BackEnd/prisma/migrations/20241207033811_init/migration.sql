/*
  Warnings:

  - You are about to drop the column `lease_term` on the `property` table. All the data in the column will be lost.
  - You are about to drop the column `monthly_rent` on the `property` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `property` DROP COLUMN `lease_term`,
    DROP COLUMN `monthly_rent`,
    DROP COLUMN `price`;

-- CreateTable
CREATE TABLE `PropertyRental` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` INTEGER NOT NULL,
    `propertyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PropertySale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `monthly_rent` INTEGER NOT NULL,
    `lease_term` INTEGER NOT NULL,
    `propertyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PropertyRental` ADD CONSTRAINT `PropertyRental_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PropertySale` ADD CONSTRAINT `PropertySale_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
