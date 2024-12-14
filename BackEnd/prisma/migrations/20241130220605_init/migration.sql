/*
  Warnings:

  - The values [rent] on the enum `Transaction_transaction_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `transaction` MODIFY `transaction_type` ENUM('rental', 'sale') NOT NULL;
