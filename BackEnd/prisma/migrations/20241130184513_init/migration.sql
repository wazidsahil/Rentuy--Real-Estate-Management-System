-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL DEFAULT 'male',
    `email` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `city` ENUM('Chattogram', 'Dhaka', 'Khulna', 'Mymensingh', 'Rajshahi', 'Barisal', 'Rangpur', 'Sylhet') NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Property` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `status` ENUM('available', 'rented', 'sold') NOT NULL DEFAULT 'available',
    `property_use` ENUM('rental', 'sale') NOT NULL,
    `asking_price` INTEGER NOT NULL,
    `monthly_rent` INTEGER NOT NULL,
    `lease_term` INTEGER NOT NULL,
    `neighborhood` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `beds` INTEGER NOT NULL,
    `baths` INTEGER NOT NULL,
    `property_type` ENUM('residential', 'commercial', 'industrial') NOT NULL,
    `city` ENUM('Chattogram', 'Dhaka', 'Khulna', 'Mymensingh', 'Rajshahi', 'Barisal', 'Rangpur', 'Sylhet') NOT NULL,
    `owner_email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('pending', 'accepted', 'declined') NOT NULL,
    `propertyId` INTEGER NOT NULL,
    `applicant_email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_type` ENUM('sale', 'rent') NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `final_price` INTEGER NOT NULL,
    `status` ENUM('pending', 'accepted', 'declined') NOT NULL DEFAULT 'pending',
    `propertyId` INTEGER NOT NULL,
    `client_email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_owner_email_fkey` FOREIGN KEY (`owner_email`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_applicant_email_fkey` FOREIGN KEY (`applicant_email`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_client_email_fkey` FOREIGN KEY (`client_email`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
