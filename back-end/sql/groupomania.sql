/* TABLE USERS */
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(30) NOT NULL DEFAULT '',
  `password` varchar(64) NOT NULL,
  `email` varchar(30) NOT NULL UNIQUE,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
UNLOCK TABLES;

/* TABLE MESSAGES */
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `content` text NOT NULL,
  `user_id` int unsigned NOT NULL,
  `created_at` datetime NOT NULL,
  CONSTRAINT `fk_user_message` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `messages` WRITE;
UNLOCK TABLES;

/* TABLE COMMENTS */
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `content` text NOT NULL,
  `user_id` int unsigned DEFAULT NULL,
  `message_id` int unsigned DEFAULT NULL,
  CONSTRAINT `fk_user_comment` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_message_comment` FOREIGN KEY (`id`) REFERENCES `messages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `comments` WRITE;
UNLOCK TABLES;


