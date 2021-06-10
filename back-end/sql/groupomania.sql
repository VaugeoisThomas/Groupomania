DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `comments_id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `comments_content` text NOT NULL,
  `users_id` int DEFAULT NULL,
  `messages_id` int DEFAULT NULL,
  KEY `fk_comments_id` (`users_id`),
  KEY `fk_message_id` (`messages_id`),
  CONSTRAINT `fk_comments_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`comments_id`),
  CONSTRAINT `fk_message_id` FOREIGN KEY (`messages_id`) REFERENCES `messages` (`comments_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `comments` WRITE;

UNLOCK TABLES;

DROP TABLE IF EXISTS `messages`;


CREATE TABLE `messages` (
  `messages_id` int unsigned NOT NULL AUTO_INCREMENT,
  `messages_titre` varchar(255) NOT NULL,
  `messages_text` text NOT NULL,
  `users_id` int NOT NULL,
  `comments_id` int DEFAULT NULL,
  PRIMARY KEY (`messages_id`),
  KEY `fk_messages_id` (`users_id`),
  KEY `fk_message_id` (`comments_id`),
  CONSTRAINT `fk_messages_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`messages_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `messages` WRITE;

UNLOCK TABLES;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `users_id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `users_name` varchar(30) NOT NULL DEFAULT '',
  `users_password` varchar(64) NOT NULL,
  `users_email` varchar(30) NOT NULL UNIQUE,
  `messages_id` int DEFAULT NULL,
  `comments_id` int DEFAULT NULL,
  `users_age` int DEFAULT '0',
  `users_biography` text,
  KEY `fk_messages_id` (`messages_id`),
  KEY `fk_comments_id` (`comments_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


LOCK TABLES `users` WRITE;
UNLOCK TABLES;
