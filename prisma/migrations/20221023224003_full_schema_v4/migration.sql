/*
  Warnings:

  - Added the required column `typeId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeofNotification` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notification` ADD COLUMN `typeId` VARCHAR(191) NOT NULL,
    ADD COLUMN `typeofNotification` VARCHAR(191) NOT NULL;
