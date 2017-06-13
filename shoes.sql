

CREATE DATABASE `shoesale`;

GRANT ALL PRIVILEGES ON shoesale.* TO 'root'@'%';

USE `shoesale`;

--
-- Table structure for table `label`
--

DROP TABLE IF EXISTS `label`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `label` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `label`
--

LOCK TABLES `label` WRITE;
INSERT INTO `label` VALUES (1,'Tamaris'),(2,'Nike'),(3,'Tiffanys'),
(4, 'Zalando');
UNLOCK TABLES;


--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
INSERT INTO `type` VALUES (1,'Riemchensandalen'),(2,'Stoeckelschuh'),
(3,'Laufschuh'), (4,'High Heels'), (5,'Volleyball-Schnuerer');
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `color` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
INSERT INTO `color` VALUES (1,'Blau/Schwarz'),
(2,'Gruen/Grau'), (3,'Rot/Weiss'), (4,'Grau/Schwarz');
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
INSERT INTO `material` VALUES (1,'Leder'),(2,'Polyester'),(3,'Stoff'),
(4, 'Styropor');
UNLOCK TABLES;

--
-- Table structure for table `colors`
--


DROP TABLE IF EXISTS `colors`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `colors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
INSERT INTO `colors` VALUES (1,'Blau'),(2,'Gruen'),(3,'Rot'),
(4, 'Gelb'), (5,'Silber'),(6,'Grau'),(7,'Beige'),(8,'Lila'),(9,'Ocker'),
(10,'Tuerkis'),(11,'Schwarz'),(12, 'Weiss');
UNLOCK TABLES;


--
-- Table structure for table `shoe`
--

DROP TABLE IF EXISTS `shoe`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `shoe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET latin1 NOT NULL,
  `label_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL,
  `Anzahl` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  FOREIGN KEY (`label_id`) references label(`id`),
  FOREIGN KEY (`type_id`) references type(`id`),
  FOREIGN KEY (`color_id`) references color(`id`),
  FOREIGN KEY (`material_id`) references material(`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `shoe`
--

LOCK TABLES `shoe` WRITE;
INSERT INTO `shoe` VALUES
(1, 'Aufreisser', 2, 4, 3, 1, 100, 99),
(2, 'Frauenversteher', 1, 1, 1, 3, 100, 44),
(3, 'Allstar', 2, 3, 2, 2, 100, 199),
(4, 'Sensation', 3, 2, 4, 4, 100, 70);
UNLOCK TABLES;



