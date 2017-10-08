CREATE DATABASE  IF NOT EXISTS `text_to_action` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `text_to_action`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: us-cdbr-iron-east-05.cleardb.net    Database: text_to_action
-- ------------------------------------------------------
-- Server version	5.6.36-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campaign_activity`
--

DROP TABLE IF EXISTS `campaign_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campaign_activity` (
  `id_campaign_act` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_texter` int(10) unsigned NOT NULL,
  `id_campaign` int(11) NOT NULL,
  `confirmed` tinyint(4) DEFAULT '0',
  `active` tinyint(4) DEFAULT '1',
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_campaign_act`),
  UNIQUE KEY `id_campaign_act_UNIQUE` (`id_campaign_act`),
  KEY `campaign_id_fk_idx` (`id_campaign`),
  KEY `texter_id_fk_idx` (`id_texter`),
  CONSTRAINT `campaign_id_fk` FOREIGN KEY (`id_campaign`) REFERENCES `campaigns` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `texter_id_fk` FOREIGN KEY (`id_texter`) REFERENCES `texters` (`id_texters`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=411 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `campaign_letter`
--

DROP TABLE IF EXISTS `campaign_letter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campaign_letter` (
  `id_letter_campaign` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_campaign` int(11) NOT NULL,
  `id_texter` int(10) unsigned NOT NULL,
  `lob_id` varchar(140) DEFAULT NULL,
  `lob_url` varchar(500) DEFAULT NULL,
  `lob_thumbnail` varchar(500) DEFAULT NULL,
  `lob_to` varchar(140) DEFAULT NULL,
  `lob_from` varchar(140) DEFAULT NULL,
  `lob_deliveryDate` varchar(140) DEFAULT NULL,
  `id_rep` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_letter_campaign`),
  KEY `id_texters_fk_idx` (`id_texter`),
  KEY `id_campaigns_fk_idx` (`id_campaign`),
  KEY `id_rep_idx` (`id_rep`),
  CONSTRAINT `id_campaigns_fk` FOREIGN KEY (`id_campaign`) REFERENCES `campaigns` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_rep` FOREIGN KEY (`id_rep`) REFERENCES `representatives` (`id_rep`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_texters_fk` FOREIGN KEY (`id_texter`) REFERENCES `texters` (`id_texters`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=351 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `campaigns`
--

DROP TABLE IF EXISTS `campaigns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campaigns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  `keywords` varchar(256) DEFAULT NULL,
  `shortDesc` varchar(256) DEFAULT NULL,
  `longDesc` varchar(256) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idcampaigns_UNIQUE` (`id`),
  KEY `campaign_campaigner_fk_idx` (`userId`),
  CONSTRAINT `userId_fk` FOREIGN KEY (`userId`) REFERENCES `clogin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=501 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clogin`
--

DROP TABLE IF EXISTS `clogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clogin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(256) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `fname` varchar(256) DEFAULT NULL,
  `lname` varchar(256) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `representatives`
--

DROP TABLE IF EXISTS `representatives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `representatives` (
  `id_rep` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_texters` int(10) unsigned NOT NULL,
  `state` varchar(10) DEFAULT NULL,
  `office_name` varchar(50) DEFAULT NULL,
  `office_id` varchar(140) DEFAULT NULL,
  `roles` varchar(40) DEFAULT NULL,
  `name` varchar(140) DEFAULT NULL,
  `addressLine1` varchar(140) DEFAULT NULL,
  `addressLine2` varchar(140) DEFAULT NULL,
  `addressCity` varchar(140) DEFAULT NULL,
  `addressState` varchar(140) DEFAULT NULL,
  `addressZip` varchar(140) DEFAULT NULL,
  PRIMARY KEY (`id_rep`),
  UNIQUE KEY `id_rep_UNIQUE` (`id_rep`),
  KEY `texters_reps_fk_idx` (`id_texters`),
  CONSTRAINT `texters_reps_fk` FOREIGN KEY (`id_texters`) REFERENCES `texters` (`id_texters`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=961 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `texters`
--

DROP TABLE IF EXISTS `texters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `texters` (
  `id_texters` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `phone` varchar(20) NOT NULL,
  `firstname` varchar(140) DEFAULT NULL,
  `streetname` varchar(140) DEFAULT NULL,
  `city` varchar(140) DEFAULT NULL,
  `state` varchar(3) DEFAULT NULL,
  `zip` varchar(12) DEFAULT NULL,
  `email` varchar(140) DEFAULT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  `lastname` varchar(140) DEFAULT NULL,
  `streetnumber` varchar(140) DEFAULT NULL,
  `address` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id_texters`),
  UNIQUE KEY `id_texters_UNIQUE` (`id_texters`),
  UNIQUE KEY `phoneNumber_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=741 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-08 15:20:37
