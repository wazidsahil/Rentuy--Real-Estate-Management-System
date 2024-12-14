-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('user', 'admin') NULL DEFAULT 'user';
