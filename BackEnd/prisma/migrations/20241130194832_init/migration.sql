/*
  Warnings:

  - You are about to drop the column `asking_price` on the `property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `property` DROP COLUMN `asking_price`,
    ADD COLUMN `price` INTEGER NULL,
    MODIFY `monthly_rent` INTEGER NULL,
    MODIFY `lease_term` INTEGER NULL;
