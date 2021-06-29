DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `users_id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `users_name` varchar(30) NOT NULL DEFAULT '',
  `users_password` varchar(64) NOT NULL,
  `users_email` varchar(30) NOT NULL UNIQUE,
  `users_age` int DEFAULT 0,
  `users_biography` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `messages_id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `messages_text` text NOT NULL,
  `users_id` int unsigned NOT NULL,
  `createdAt` date NOT NULL,
  CONSTRAINT `fk_user_message` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `messages` WRITE;

UNLOCK TABLES;

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `comments_id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `comments_content` text NOT NULL,
  `users_id` int unsigned DEFAULT NULL,
  `messages_id` int unsigned DEFAULT NULL,
  CONSTRAINT `fk_users_comments` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_messages_comments` FOREIGN KEY (`comments_id`) REFERENCES `messages` (`messages_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `comments` WRITE;

UNLOCK TABLES;


