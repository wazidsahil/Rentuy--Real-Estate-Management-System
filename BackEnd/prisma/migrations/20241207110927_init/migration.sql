/*
  Warnings:

  - The values [rented,sold] on the enum `Property_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `property` MODIFY `status` ENUM('available', 'taken') NOT NULL DEFAULT 'available';
