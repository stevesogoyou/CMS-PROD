/*
  Warnings:

  - A unique constraint covering the columns `[email_Users]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `users_email_Users_key` ON `users`(`email_Users`);
