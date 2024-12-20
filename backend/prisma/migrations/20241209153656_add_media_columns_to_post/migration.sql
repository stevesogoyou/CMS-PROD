-- CreateTable
CREATE TABLE `belong` (
    `post_id_Post` BIGINT NOT NULL,
    `category_id_Category` INTEGER NOT NULL,

    INDEX `FK_Belong_category_id_Category`(`category_id_Category`),
    PRIMARY KEY (`post_id_Post`, `category_id_Category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `category_id_Category` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name_Category` VARCHAR(100) NULL,

    PRIMARY KEY (`category_id_Category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `comment_id_Comments` INTEGER NOT NULL AUTO_INCREMENT,
    `content_Comments` VARCHAR(500) NULL,
    `creation_date_Comments` DATETIME(0) NULL,
    `edition_date_Comments` DATETIME(0) NULL,
    `delete_date_comment_Comments` DATETIME(0) NULL,
    `post_id_Post` BIGINT NULL,
    `user_id_Users` BIGINT NULL,

    INDEX `FK_Comments_post_id_Post`(`post_id_Post`),
    INDEX `FK_Comments_user_id_Users`(`user_id_Users`),
    PRIMARY KEY (`comment_id_Comments`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `post_id_Post` BIGINT NOT NULL AUTO_INCREMENT,
    `title_Articles` VARCHAR(100) NULL,
    `content_Articles` VARCHAR(1000) NULL,
    `creation_date_Articles` DATETIME(0) NULL,
    `edition_date_Articles` DATETIME(0) NULL,
    `delete_date_Post` DATETIME(0) NULL,
    `post_statut_Post` BOOLEAN NULL,
    `user_id_Users` BIGINT NULL,
    `media_url` VARCHAR(255) NULL,
    `media_type` VARCHAR(50) NULL,
    `likes_count` INTEGER NOT NULL DEFAULT 0,

    INDEX `FK_Post_user_id_Users`(`user_id_Users`),
    PRIMARY KEY (`post_id_Post`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `role_id_Role` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name_Role` ENUM('Admin', 'User', 'Moderator') NOT NULL,

    PRIMARY KEY (`role_id_Role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `tag_id_Tags` INTEGER NOT NULL AUTO_INCREMENT,
    `tag_name_Tags` VARCHAR(100) NULL,
    `category_id_Category` INTEGER NULL,

    INDEX `FK_Tags_category_id_Category`(`category_id_Category`),
    PRIMARY KEY (`tag_id_Tags`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id_Users` BIGINT NOT NULL AUTO_INCREMENT,
    `first_name_Users` VARCHAR(100) NULL,
    `last_name_Users` VARCHAR(100) NULL,
    `email_Users` VARCHAR(255) NULL,
    `password_Users` VARCHAR(100) NULL,
    `role_id_Role` INTEGER NULL,

    INDEX `FK_Users_role_id_Role`(`role_id_Role`),
    PRIMARY KEY (`user_id_Users`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `belong` ADD CONSTRAINT `FK_Belong_category_id_Category` FOREIGN KEY (`category_id_Category`) REFERENCES `category`(`category_id_Category`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `belong` ADD CONSTRAINT `FK_Belong_post_id_Post` FOREIGN KEY (`post_id_Post`) REFERENCES `post`(`post_id_Post`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `FK_Comments_post_id_Post` FOREIGN KEY (`post_id_Post`) REFERENCES `post`(`post_id_Post`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `FK_Comments_user_id_Users` FOREIGN KEY (`user_id_Users`) REFERENCES `users`(`user_id_Users`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `FK_Post_user_id_Users` FOREIGN KEY (`user_id_Users`) REFERENCES `users`(`user_id_Users`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `FK_Tags_category_id_Category` FOREIGN KEY (`category_id_Category`) REFERENCES `category`(`category_id_Category`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `FK_Users_role_id_Role` FOREIGN KEY (`role_id_Role`) REFERENCES `role`(`role_id_Role`) ON DELETE RESTRICT ON UPDATE RESTRICT;
