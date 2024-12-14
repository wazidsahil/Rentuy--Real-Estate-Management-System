/*
  Warnings:

  - A unique constraint covering the columns `[rentalId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[saleId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[propertyId]` on the table `PropertyRental` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[propertyId]` on the table `PropertySale` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `property` ADD COLUMN `rentalId` INTEGER NULL,
    ADD COLUMN `saleId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Property_rentalId_key` ON `Property`(`rentalId`);

-- CreateIndex
CREATE UNIQUE INDEX `Property_saleId_key` ON `Property`(`saleId`);

-- CreateIndex
CREATE UNIQUE INDEX `PropertyRental_propertyId_key` ON `PropertyRental`(`propertyId`);

-- CreateIndex
CREATE UNIQUE INDEX `PropertySale_propertyId_key` ON `PropertySale`(`propertyId`);
