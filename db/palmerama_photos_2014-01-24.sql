# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.5.29)
# Database: palmerama_photos
# Generation Time: 2014-01-24 17:00:00 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page_id` varchar(30) NOT NULL,
  `title_display` varchar(256) NOT NULL,
  `title_alpha` float NOT NULL,
  `cover` tinyint(4) NOT NULL DEFAULT '0',
  `title_colour` varchar(7) NOT NULL DEFAULT '#FFFFFF',
  `portrait` tinyint(4) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `display_order` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;

INSERT INTO `photos` (`id`, `page_id`, `title_display`, `title_alpha`, `cover`, `title_colour`, `portrait`, `created`, `modified`, `display_order`)
VALUES
	(1,'tofino-at-dusk','Tofino at dusk.',0.37,0,'#FFFFFF',0,'2014-01-23 14:15:07','2014-01-24 15:26:51',2),
	(2,'bridge-vancouver','a vancouver bridge.',0.45,0,'#FFFFFF',1,'2014-01-23 14:15:07','2014-01-23 21:27:27',6),
	(3,'whale-waving','',0.32,1,'#FFFFFF',0,'2014-01-23 14:15:07','2014-01-24 16:53:36',5),
	(4,'whale-tail','goodbye.',0.22,1,'#FFFFFF',0,'2014-01-23 14:15:07','2014-01-24 16:49:16',0),
	(23,'birds-having-a-chat','a chat.',0.68,0,'#FFFFFF',0,'2014-01-24 15:22:58','2014-01-24 15:22:58',3),
	(24,'people-on-a-glacier','GLACIER.',0.91,0,'#FFFFFF',1,'2014-01-24 15:25:18','2014-01-24 16:56:32',4),
	(25,'goat-posse','goat posse.',0.65,0,'#FFFFFF',0,'2014-01-24 15:41:24','2014-01-24 16:57:48',1);

/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
