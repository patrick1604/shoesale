--
-- Current Database: `movie_manager`
--

CREATE DATABASE `movie_manager`;

GRANT ALL PRIVILEGES ON movie_manager.* TO 'student'@'%'; 

USE `movie_manager`;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `genre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
INSERT INTO `genre` VALUES (1,'Comedy'),(2,'Crime'),(3,'Block Buster');
UNLOCK TABLES;


--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `language` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `language`
--

LOCK TABLES `language` WRITE;
INSERT INTO `language` VALUES (1,'Englisch'),(2,'Deutsch');
UNLOCK TABLES;


--
-- Table structure for table `format`
--

DROP TABLE IF EXISTS `format`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `format` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `format`
--

LOCK TABLES `format` WRITE;
INSERT INTO `format` VALUES (1,'MPEG'),(2,'Windows Media'),(3,'Quicktime');
UNLOCK TABLES;


--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `movie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET latin1 NOT NULL,
  `length` int(11) NOT NULL,
  `format_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  FOREIGN KEY (`format_id`) references format(`id`),
  FOREIGN KEY (`genre_id`) references genre(`id`),
  FOREIGN KEY (`language_id`) references language(`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
INSERT INTO `movie` VALUES
(1, 'Hangover', 100, 3, 1, 2),
(2, 'Muttertag', 90, 1, 1, 2),
(3, 'Dark Knight', 120, 2, 2, 1);
UNLOCK TABLES;

