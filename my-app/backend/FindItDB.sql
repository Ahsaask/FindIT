CREATE DATABASE  IF NOT EXISTS `finditdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `finditdb`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: finditdb
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS admin;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  Admin_ID_number int NOT NULL AUTO_INCREMENT,
  `Password` varchar(255) NOT NULL,
  Email varchar(100) NOT NULL,
  `Role` varchar(50) NOT NULL,
  Phone_number varchar(20) DEFAULT NULL,
  PRIMARY KEY (Admin_ID_number),
  UNIQUE KEY Email_UNIQUE (Email)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES admin WRITE;
/*!40000 ALTER TABLE admin DISABLE KEYS */;
INSERT INTO admin VALUES (1,'admin123','admin1@example.com','Super Admin','123-456-7890'),(2,'admin456','admin2@example.com','Moderator','987-654-3210'),(3,'admin789','admin3@example.com','Support','555-123-4567');
/*!40000 ALTER TABLE admin ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `claim`
--

DROP TABLE IF EXISTS claim;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE claim (
  Claim_id int NOT NULL AUTO_INCREMENT,
  Owner_ID_number int DEFAULT NULL,
  Admin_ID_number int DEFAULT NULL,
  LostItem_ID int DEFAULT NULL,
  `Status` varchar(50) NOT NULL,
  `Text` longtext,
  PRIMARY KEY (Claim_id),
  KEY FK_claim_Owner_ID_number_idx (Owner_ID_number),
  KEY FK_claim_Admin_ID_number_idx (Admin_ID_number),
  KEY FK_claim_LostItem_ID_idx (LostItem_ID),
  CONSTRAINT FK_claim_Admin_ID_number FOREIGN KEY (Admin_ID_number) REFERENCES `admin` (Admin_ID_number),
  CONSTRAINT FK_claim_LostItem_ID FOREIGN KEY (LostItem_ID) REFERENCES lost_item (LostItem_ID),
  CONSTRAINT FK_claim_Owner_ID_number FOREIGN KEY (Owner_ID_number) REFERENCES `owner` (Owner_ID_number)
) ENGINE=InnoDB AUTO_INCREMENT=604 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `claim`
--

LOCK TABLES claim WRITE;
/*!40000 ALTER TABLE claim DISABLE KEYS */;
INSERT INTO claim VALUES (601,201,1,401,'Pending','I lost my iPhone in the library last week'),(602,202,2,402,'Approved','I can identify the contents of the backpack'),(603,203,3,403,'Denied','Description does not match the lost item');
/*!40000 ALTER TABLE claim ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creates`
--

DROP TABLE IF EXISTS creates;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE creates (
  Title varchar(255) NOT NULL,
  LostItem_ID int NOT NULL,
  Finder_ID_number int NOT NULL,
  PRIMARY KEY (Title,LostItem_ID,Finder_ID_number),
  KEY FK_creates_LostItem_ID_idx (LostItem_ID),
  KEY FK_creates_Finder_ID_number_idx (Finder_ID_number),
  CONSTRAINT FK_creates_Finder_ID_number FOREIGN KEY (Finder_ID_number) REFERENCES finder (Finder_ID_number) ON DELETE CASCADE,
  CONSTRAINT FK_creates_LostItem_ID FOREIGN KEY (LostItem_ID) REFERENCES lost_item (LostItem_ID) ON DELETE CASCADE,
  CONSTRAINT FK_creates_Title FOREIGN KEY (Title) REFERENCES post (Title) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creates`
--

LOCK TABLES creates WRITE;
/*!40000 ALTER TABLE creates DISABLE KEYS */;
INSERT INTO creates VALUES ('Lost iPhone in Library',401,101),('Missing Blue Backpack',402,102),('Lost AirPods in Student Center',403,103);
/*!40000 ALTER TABLE creates ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS feedback;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE feedback (
  Feedback_ID int NOT NULL AUTO_INCREMENT,
  `Text` longtext NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (Feedback_ID)
) ENGINE=InnoDB AUTO_INCREMENT=1004 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES feedback WRITE;
/*!40000 ALTER TABLE feedback DISABLE KEYS */;
INSERT INTO feedback VALUES (1001,'Great service! Got my item back quickly.','2025-02-18'),(1002,'Thank you for finding my backpack!','2025-02-23'),(1003,'Still looking for my AirPods.','2025-02-28');
/*!40000 ALTER TABLE feedback ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `finder`
--

DROP TABLE IF EXISTS finder;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE finder (
  Finder_ID_number int NOT NULL AUTO_INCREMENT,
  `Password` varchar(255) NOT NULL,
  Email varchar(100) NOT NULL,
  PRIMARY KEY (Finder_ID_number),
  UNIQUE KEY Email_UNIQUE (Email)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `finder`
--

LOCK TABLES finder WRITE;
/*!40000 ALTER TABLE finder DISABLE KEYS */;
INSERT INTO finder VALUES (101,'finder123','finder1@example.com'),(102,'finder456','finder2@example.com'),(103,'finder789','finder3@example.com'),(104,'testinesgghehgPassword123','testfrehehjhemail@example.com'),(106,'testinfcfrgrtgrttgresgghehgPassword123','teererferfgrththrstfrehehjhemail@example.com');
/*!40000 ALTER TABLE finder ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `finder_name`
--

DROP TABLE IF EXISTS finder_name;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE finder_name (
  Finder_ID_number int NOT NULL,
  First_name varchar(50) NOT NULL,
  Last_name varchar(50) NOT NULL,
  Feedback_ID int DEFAULT NULL,
  Mobile_no varchar(20) DEFAULT NULL,
  PRIMARY KEY (Finder_ID_number),
  KEY FK_Feedback_ID_idx (Feedback_ID),
  KEY FK_Mobile_no_idx (Mobile_no),
  CONSTRAINT FK_Feedback_ID FOREIGN KEY (Feedback_ID) REFERENCES feedback (Feedback_ID),
  CONSTRAINT FK_Finder_ID_number FOREIGN KEY (Finder_ID_number) REFERENCES finder (Finder_ID_number) ON DELETE CASCADE,
  CONSTRAINT FK_Findername_Mobile_no FOREIGN KEY (Mobile_no) REFERENCES `profile` (Mobile_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `finder_name`
--

LOCK TABLES finder_name WRITE;
/*!40000 ALTER TABLE finder_name DISABLE KEYS */;
INSERT INTO finder_name VALUES (101,'John','Doe',1001,'111-222-3333'),(102,'Jane','Smith',1002,'444-555-6666'),(103,'Michael','Johnson',NULL,'777-888-9999');
/*!40000 ALTER TABLE finder_name ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS location;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE location (
  Location_id int NOT NULL AUTO_INCREMENT,
  Floor_number varchar(10) DEFAULT NULL,
  Location_Name varchar(100) NOT NULL,
  Address varchar(255) NOT NULL,
  PRIMARY KEY (Location_id)
) ENGINE=InnoDB AUTO_INCREMENT=304 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES location WRITE;
/*!40000 ALTER TABLE location DISABLE KEYS */;
INSERT INTO location VALUES (301,'1','Library','University Main Campus, 123 Learning St'),(302,'2','Cafeteria','University Main Campus, 123 Learning St'),(303,'G','Student Center','University Main Campus, 123 Learning St');
/*!40000 ALTER TABLE location ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lost_item`
--

DROP TABLE IF EXISTS lost_item;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE lost_item (
  LostItem_ID int NOT NULL AUTO_INCREMENT,
  `Description` longtext,
  `Name` varchar(100) NOT NULL,
  `Status` varchar(50) NOT NULL,
  `Date` date NOT NULL,
  Color_id int DEFAULT NULL,
  Location_id int DEFAULT NULL,
  Finder_ID_number int DEFAULT NULL,
  Claim_ID int DEFAULT NULL,
  PRIMARY KEY (LostItem_ID),
  KEY FK_lostitem_Color_id_idx (Color_id),
  KEY FK_lostitem_Location_id_idx (Location_id),
  KEY FK_lostitem_Finder_ID_number_idx (Finder_ID_number),
  KEY `FK_lostitem_Claim_ID _idx` (Claim_ID),
  CONSTRAINT `FK_lostitem_Claim_ID ` FOREIGN KEY (Claim_ID) REFERENCES claim (Claim_id),
  CONSTRAINT FK_lostitem_Color_id FOREIGN KEY (Color_id) REFERENCES specification_color (Color_id),
  CONSTRAINT FK_lostitem_Finder_ID_number FOREIGN KEY (Finder_ID_number) REFERENCES finder (Finder_ID_number),
  CONSTRAINT FK_lostitem_Location_id FOREIGN KEY (Location_id) REFERENCES location (Location_id)
) ENGINE=InnoDB AUTO_INCREMENT=404 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lost_item`
--

LOCK TABLES lost_item WRITE;
/*!40000 ALTER TABLE lost_item DISABLE KEYS */;
INSERT INTO lost_item VALUES (401,'iPhone 13 with cracked screen protector','iPhone','Found','2025-02-15',1,301,101,601),(402,'Blue Jansport backpack with psychology books','Backpack','Found','2025-02-20',2,302,102,602),(403,'Apple AirPods Pro in charging case','AirPods','Lost','2025-02-25',3,303,NULL,603);
/*!40000 ALTER TABLE lost_item ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS message;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE message (
  Owner_ID_number int NOT NULL,
  Finder_ID_number int NOT NULL,
  Notify_ID int NOT NULL,
  `Text` longtext NOT NULL,
  PRIMARY KEY (Owner_ID_number,Finder_ID_number,Notify_ID),
  KEY FK_msg_Finder_ID_number_idx (Finder_ID_number),
  KEY FK_msg_Notify_id_idx (Notify_ID),
  CONSTRAINT FK_msg_Finder_ID_number FOREIGN KEY (Finder_ID_number) REFERENCES finder (Finder_ID_number) ON DELETE CASCADE,
  CONSTRAINT FK_msg_Notify_id FOREIGN KEY (Notify_ID) REFERENCES notification (Notify_id) ON DELETE CASCADE,
  CONSTRAINT FK_msg_Owner_ID_number FOREIGN KEY (Owner_ID_number) REFERENCES `owner` (Owner_ID_number) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES message WRITE;
/*!40000 ALTER TABLE message DISABLE KEYS */;
INSERT INTO message VALUES (201,101,701,'I found an iPhone that matches your description. Let\'s meet to verify.'),(202,102,702,'I found your backpack in the cafeteria. It\'s now at the lost and found office.'),(203,103,703,'I might have seen someone with your AirPods. I\'ll let you know if I get more info.');
/*!40000 ALTER TABLE message ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moderates`
--

DROP TABLE IF EXISTS moderates;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE moderates (
  Admin_ID_number int NOT NULL,
  Finder_ID_number int NOT NULL,
  Owner_ID_number int NOT NULL,
  PRIMARY KEY (Admin_ID_number,Finder_ID_number,Owner_ID_number),
  KEY FK_mod_Finder_ID_number_idx (Finder_ID_number),
  KEY FK_mod_Owner_ID_number_idx (Owner_ID_number),
  CONSTRAINT FK_mod_Admin_ID_number FOREIGN KEY (Admin_ID_number) REFERENCES `admin` (Admin_ID_number) ON DELETE CASCADE,
  CONSTRAINT FK_mod_Finder_ID_number FOREIGN KEY (Finder_ID_number) REFERENCES finder (Finder_ID_number) ON DELETE CASCADE,
  CONSTRAINT FK_mod_Owner_ID_number FOREIGN KEY (Owner_ID_number) REFERENCES `owner` (Owner_ID_number) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moderates`
--

LOCK TABLES moderates WRITE;
/*!40000 ALTER TABLE moderates DISABLE KEYS */;
INSERT INTO moderates VALUES (1,101,201),(2,102,202),(3,103,203);
/*!40000 ALTER TABLE moderates ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS notification;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE notification (
  Notify_id int NOT NULL AUTO_INCREMENT,
  `Date` datetime NOT NULL,
  Seen_Status varchar(50) DEFAULT NULL,
  Admin_ID_number int DEFAULT NULL,
  Finder_ID_number int DEFAULT NULL,
  Owner_ID_number int DEFAULT NULL,
  PRIMARY KEY (Notify_id),
  KEY FK_notif_Finder_ID_number_idx (Finder_ID_number),
  KEY FK_notif_Owner_ID_number_idx (Owner_ID_number),
  KEY FK_notif_Admin_ID_number_idx (Admin_ID_number),
  CONSTRAINT FK_notif_Admin_ID_number FOREIGN KEY (Admin_ID_number) REFERENCES `admin` (Admin_ID_number),
  CONSTRAINT FK_notif_Finder_ID_number FOREIGN KEY (Finder_ID_number) REFERENCES finder (Finder_ID_number),
  CONSTRAINT FK_notif_Owner_ID_number FOREIGN KEY (Owner_ID_number) REFERENCES `owner` (Owner_ID_number)
) ENGINE=InnoDB AUTO_INCREMENT=704 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES notification WRITE;
/*!40000 ALTER TABLE notification DISABLE KEYS */;
INSERT INTO notification VALUES (701,'2025-02-16 10:15:00','Read',NULL,101,201),(702,'2025-02-21 14:30:00','Unread',NULL,102,202),(703,'2025-02-26 09:45:00','Unread',1,NULL,203);
/*!40000 ALTER TABLE notification ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner`
--

DROP TABLE IF EXISTS owner;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owner` (
  Owner_ID_number int NOT NULL AUTO_INCREMENT,
  `Password` varchar(255) NOT NULL,
  Email varchar(100) NOT NULL,
  Mobile_no varchar(20) DEFAULT NULL,
  PRIMARY KEY (Owner_ID_number),
  UNIQUE KEY Email_UNIQUE (Email),
  KEY Mobile_no_idx (Mobile_no),
  CONSTRAINT FK_Mobile_no FOREIGN KEY (Mobile_no) REFERENCES `profile` (Mobile_no)
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner`
--

LOCK TABLES owner WRITE;
/*!40000 ALTER TABLE owner DISABLE KEYS */;
INSERT INTO owner VALUES (201,'owner123','owner1@example.com','111-000-1111'),(202,'owner456','owner2@example.com','222-000-2222'),(203,'owner789','owner3@example.com','333-000-3333');
/*!40000 ALTER TABLE owner ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner_name`
--

DROP TABLE IF EXISTS owner_name;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE owner_name (
  Owner_ID_number int NOT NULL,
  First_name varchar(50) NOT NULL,
  Last_name varchar(50) NOT NULL,
  Feedback_ID int DEFAULT NULL,
  PRIMARY KEY (Owner_ID_number),
  KEY FK_Feedback_ID_idx (Feedback_ID),
  CONSTRAINT FK_Owner_ID_number FOREIGN KEY (Owner_ID_number) REFERENCES `owner` (Owner_ID_number) ON DELETE CASCADE,
  CONSTRAINT FK_Owner_name_Feedback_ID FOREIGN KEY (Feedback_ID) REFERENCES feedback (Feedback_ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner_name`
--

LOCK TABLES owner_name WRITE;
/*!40000 ALTER TABLE owner_name DISABLE KEYS */;
INSERT INTO owner_name VALUES (201,'Robert','Williams',1001),(202,'Emma','Davis',1002),(203,'David','Miller',1003);
/*!40000 ALTER TABLE owner_name ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS post;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE post (
  Title varchar(255) NOT NULL,
  Post_ID int NOT NULL AUTO_INCREMENT,
  Content longtext,
  Admin_ID_number int DEFAULT NULL,
  Finder_ID_number int DEFAULT NULL,
  PRIMARY KEY (Title),
  UNIQUE KEY Post_ID_UNIQUE (Post_ID),
  KEY `FK_post_Admin_ID_number _idx` (Admin_ID_number),
  KEY FK_post_Finder_ID_number_idx (Finder_ID_number),
  CONSTRAINT `FK_post_Admin_ID_number ` FOREIGN KEY (Admin_ID_number) REFERENCES `admin` (Admin_ID_number),
  CONSTRAINT FK_post_Finder_ID_number FOREIGN KEY (Finder_ID_number) REFERENCES finder (Finder_ID_number)
) ENGINE=InnoDB AUTO_INCREMENT=805 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES post WRITE;
/*!40000 ALTER TABLE post DISABLE KEYS */;
INSERT INTO post VALUES ('Lost AirPods in Student Center',803,'I lost my AirPods Pro in the student center yesterday. Please help!',3,101),('Lost iPhone in Library',801,'I lost my iPhone 13 in the library on Feb 15th. It has a black case with my ID inside.',1,102),('Lost my wallet',804,'Hello, I lost my wallet around the Science Building. Please contact me if you found a wallet that looks like this. Thank you!',NULL,102),('Missing Blue Backpack',802,'Has anyone found a blue Jansport backpack in the cafeteria? It has my psychology textbooks.',2,103);
/*!40000 ALTER TABLE post ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_date`
--

DROP TABLE IF EXISTS post_date;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE post_date (
  Title varchar(255) NOT NULL,
  `Year` int NOT NULL,
  `Day` int NOT NULL,
  `Month` int NOT NULL,
  PRIMARY KEY (Title),
  CONSTRAINT FK_postdate_Title FOREIGN KEY (Title) REFERENCES post (Title) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_date`
--

LOCK TABLES post_date WRITE;
/*!40000 ALTER TABLE post_date DISABLE KEYS */;
INSERT INTO post_date VALUES ('Lost AirPods in Student Center',2025,25,2),('Lost iPhone in Library',2025,15,2),('Lost my wallet',2025,15,4),('Missing Blue Backpack',2025,20,2);
/*!40000 ALTER TABLE post_date ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_image`
--

DROP TABLE IF EXISTS post_image;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE post_image (
  Title varchar(255) NOT NULL,
  Image blob,
  PRIMARY KEY (Title),
  CONSTRAINT FK_postimg_Title FOREIGN KEY (Title) REFERENCES post (Title) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_image`
--

LOCK TABLES post_image WRITE;
/*!40000 ALTER TABLE post_image DISABLE KEYS */;
INSERT INTO post_image VALUES ('Lost AirPods in Student Center',NULL),('Lost iPhone in Library',NULL),('Lost my wallet',_binary 'ÿ\Øÿ\à\0JFIF\0\0\0\0\0\0ÿ\Û\0C\0															\r\r%\Z%))%756\Z*2>-)0;!ÿ\Û\0C	,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,ÿÀ\0,,\"\0ÿ\Ä\0\0\0\0\0\0\0\0\0\0\0\0\0ÿ\Ä\0C\0\0\0!1A\"Qaq‘2B¡#Rbð3±Á\á$Cr‚\Ññ4S%cs¢²³ÿ\Ä\0\Z\0\0\0\0\0\0\0\0\0\0\0\0ÿ\Ä\0-\0\0\0\0\0\0\0!1A\"Q2aq#B‘¡±\Ñðÿ\Ú\0\0\0?\0ú\ßÖŸZR€}iõ¥(ÖŸZR€}iõ¥(ÖŸZR€}iõ¥(ÖŸZR€}iõ¥(ÖŸZR€}iõ¥(ÖŸZR€}iõ¥(ÖŸZR€}iõ¥(ÖŸZR€}iõ¥(ÖŸZR€}iõ¥(ÖŸZR€R›\ÓzJoYÞ€\Å)½7 ¦ôÞ€R›\ÓzJoM\è)½7 ¦ôÞ€R•U\Õz÷J\è\æ»‘üY¿º†\×#\é\Ôx\0gm\Í	F.OE­*š/ˆº[©i<xQT³<ˆ\Z5’\Ía·z´‚\â\Ú\æ5š\Þhæ‰¿\Ä\ê\è~«\\M>Ž\ÊÜ°u¥)] )M\é½\0¥7¦ô”Þ›\Ð\nVw¬o@)M\é½\0¥7¦ô”Þ›\Ð\nSz\Îô)JP\nR””¥\0¥)@)JP\nR””¥\0¥*=\åÝ­µ\Í\åÔ‚;{x\ÚIXö°÷<\n³\Â |A\×-z\rƒ\ÝJ“¹ð\í \r4ÞŸ!\Ë­|\Ì\Éqs$\ÝC©¿‹{pu±#\Ëü±¢ž\0\í[\Ü_\\õþ¡/WºR&c\é\Ð1È†r\æy\'ÿ\0ö\ãË¸¨\æ²\Ù<ŸI¢\ÒzK/¶GšyÌ“$E\Ò9Ã‘£,2„\ê+·\ëS¬ú\Õ\í¤²\É’$\Ó\\\Â\ï-¾”t‰@VM÷Dq±SUB\à‘†Ç¦Õ‚\È\Ü\Õ;š\èô\åTf±${\î—ý n‘u{`Lð\Çsg–f\Ò,ö\'¾\Õ\í¬¯úQˆOes\r\Ä[e¢`tŸG^Aö W\ÃUP\ã 00Œ\êE¼—V\Ù\Ï5¼‰+6¸\Ã}.rË©yö\Îj\Ø\Ü\×g™\Ò\á.k\áŸt¥|Ï¦ü}Ô­‰ª\Û¨VEA<\0Eq¥³¥™\î\Ï<W¸\é½{¢õ\\­¥\Ò‡ã·—÷w{ƒoö\ÍhŒÔº<[´–\Ó÷.JV3Y©™E)JJR€R” ¥()JJR€R” ¥()JJR€R” ¥()L\Ð\Z³*†f*ª ³3¨Ü’M|³\â³\'\Ä÷†\ÎÕ™z%”¤—PG\ís.F¿ü¿•\Åý~[\é\åøw¦HDJtõk„\'\×ÿ\0Ž„ü¾ÝŽk-\íâ·…Q@X\ã]°q°Üš\Ïdó\Â=›jõgß‚5\ÉX`\n¸Q¤*¶¶*‚W,py\î	\Îj×¨M¨}D/qùrqT\ì¹ gžO}ª‰3Þ©q“_)\Ü\n\×%v\ï[v?û­H\Îø\Û\ï·Ö ^„¬={\×E™½ª9žÄŸ ÷¬\ä\ìG~>•Ã¸\'	Æ—”ò§\Zx(ZI\":%`ºH;©97z‚®Â»$¤k©‘qLôý;\âÿ\0ˆúQ\Ü9\ê¨€…º\Ì\Ù:ŒýÁ¯u\Òþ,\è]H\Ç—ö[©`»*š\Ãq\á\Éø¶ÿ\0Jù:\ÎqŒŠÉŽ97\ÈÏ†c\0®±ô\íV\ÆÖ6ÿ\0§Uo+†}\ÛÒ³_\é\â^\àG\rÑž\ßp\Ð]š8\Ðrs\ìv¯kÒ¾;è·‚%¿G\éÒ¹Ò¦r\Z\Ý\È8:dû”V˜Ø¤xw\è-«œe¾•ªIˆ’F\êñ¸\Ê:0e`{‚»V\Õa€R” ¥()JJR€R” ¥()JJR€R” ¥(y?Œ>#n—ôû\ÏV¾\\!^m¡9Rˆ\î\ï\Û{n¿\Ö\í:O–òl<¤øvg\r<\äl£\Ør\Ç\Ð}\ÌmR\ê\ê\ân©~\Í%\í\ãx’3p ðª;\00Êª²x\á†‹M\ê=ó\ézm€¶uy¤s®Y\å\Üó’k½\ä\Â4a\Æ;ð1ó©…\ã\'<\îv&¨n®<C§bc\Æ@$¯õ\ßlý\ì”ˆ—QsÛœv\Æ2®\Õó«\×ôÞº\Ê\åX‚{\ãô®@\ä¯\â\çoj­³|Vq\Íj\Ç$\ì7\ßú–\ÜzcqŠ×Œ\çõ®0N0§\ëÛµ\'O¾>õŽw\Çs[0\ÙO?Oó®5#~99¡Û½tÁ\'|.þÇƒ\\\Øn=€ùm@e_d\ãÒ¤$\ÕŸJ\Ø¡\ÒzO· \ÖÚ¡bŒF’Ž$R¸Ù†ù\ÅW\êóý++08¦H¸–¶]C­t—2t»\Ùc\r!g‹ñ\ÂÁ¿Š\Ê\í\ì>µ\íz_ö…lù‹¬Aû<ˆþž\ÛS\Äp3­¢>p>Y¯ž\Ç(\×R\Öó©Y;j]˜\Ç\"­…Ž&ôU]\Ú\äû…õ…üB{+˜.\"8ó\Â\áÀö8\ÜI¯‚F.l\å7=:\îXeXdh¤ ²\äls^º\Ëã®«i,c¨B÷VÍ–›\É\Z\Ïk\å!\Ó\n\çœ¨ö÷\ÑS\ìñ.úe\æ(úm*O\êý\'ª\Ç\âX]G6YRT\Ï€\ã\íS\ê\ì\äòšqxb”¥\nR””¥\0¥)@)JP\nR””¥\0®—v\Ö6\×w2à·Œ\É+Àl\0§€=ë±¯üs\Ôzÿ\0W\ë7=\Z\ÎUŽ\ÂÁ\ãPŠ\ÞY&Ð¬\Ò\ÌW<g\0{qš\ãi.KjªV\ËlQ\Ê\êú\ë\ân°on1¬Àxq6ù8\ÉÆ§?\äµm\à\É]HFFÇ±¯\Z?Þ‹%1=•\ä*0HEQ· ƒúT‹‰R\É!»°p\è\ÏÙžÝ´€¢1¨dc€>õ—\ä÷Õ‘‚Q\ÆÔ‹«¢\çVøú\ìy\'US\Êp\ìN\ì|\Ù\Æ9ªjõ[[…V—DšT‘%¹]ú±¨Ç¿c\Æj,ñ¬„´®3&À\àª#i\Ë\ç¹ØŸ¶\Õ\È\ßT“\\ò³}x\â´\Î0Nx\Ítt<nO~\Û\×2¹\0žI¨\ZÑ’I\È\'?^kS’Xûq¹\ÍlFs¾­6õ\ïœz¥p‘¶•²x8\Ïs½\0gýšÎ¦:qù›c\ï\ëX\ì¤=\Åt»l c\çóíµhW:‰ü[“\é‘È§¹ýxùW2Å‰çŸ½pé“±\Î~œV™\ì+$c\ß>\Íd/\×\å@jI?\áýfµþY®\Ú0¹;ñÏ½r$¶~½¨\0r+e™\É\nªY˜…U^IôÅ8\É=€\Üýª\Â\Ú\Ü\ÛFg™\Ä.ñ-×ŠÊ®-­Ci˜Ÿ*\ìqÀ&‰dŒ¤¢²ÍŒ±XÁ,\Ò\ÈK)Uyu°!‹;k\Æ\äöž@5u5Ä4™UliE\'J¨9\ï¹>æ»˜“ªx“\ÈP±Ú :¼(ÝŠø’¹f;¹\î}†\Ý$°’n±\é$$#Aj¨2\ÅÑŽF9;\ãj·jKó•Ò”÷I{|ArñN·	$±\ËZcx\Ö]j¸W.;\Í{>™ý¡uµ‡©F÷Ñ˜—Å—÷ir¤dòyOÈŒûúx\0Co-«f\Æú¸\Åo©‘<@Þ \Ç|ÿ\0]\ëŠR‰e”Ó©\\ò}÷¤õþ‹Ö£\×avŽ\ê’òO<g¨\È÷«Py¯\Ï\Öñ\Íe5•Î¶Š\ìb–r”¹‡QI?‡_®{\à\àšú÷\Â}v~³c:\Þ\"¯Q\éó~\Ë}¡pŽø\ÊÈ£Ÿ\Ì;Ej…›¸>{W¢ô=\ÑyG£¥)Vžp¥)@)J\ÍŠR””¥\0¥*«¯u‹N‡\Óç¾Ÿ\Ã1\ÛÃŸ4ó°:P{w\'°¸\Þ\Æ.O§ø\Ç\âoö5º\ÙY6z­\âb=8?³D\ÇOŒGñ}{`ùN‘Ò™\".|I	yŽY˜œ’\Ä\ï“Þ«z]½\ç\\\ê3un \æF’C+³nÊƒøG\0v\ì†B¢€\0ÛŠÍ\ï\'¿-46G\î}&µ‰P \ÙNCs±\Èýj—¨t˜¼(ú‘Ÿ•rr\ï\Û\'nþ\Õ\èÙ•ˆ#Irp\ãl¸\ÅB¸q‰T’<±d\àjylž}>th²¹¾™ó\ëÎ•³—²–H˜gH¶•=·\ÛÖ£¥ý\í¹\Å\ÌfEó!Æ¥\0\ä<…zK\ÈÄ²ap\Ø‰^¢p8õ\'Ó¾qU2\Æ?x\Ø\0¥¶\'JœmúŸOÒ \äúf¿\á\âùƒ\Úÿ\0÷ƒµ½\å½\Ö\è\ë)ó\'\Ë2–\Üy[~y\ç“ô\ÞE\Î@‚CØª‚Àø\ÜqÚ«%°†P\Ò\0RE8VL†g,;\î>þõ«\\u;\\	€¹ˆjL¡sœ\ê\rGj}õ,­ÿ\01gò¿\á6@ù=ŽpGpk\\ñ\È88\ï\í\\\ã\êv“eI\ß´ªEb1xôþHEŠF>Ê«†8`\ÙÀR\ÚF3òÞ¢\â\×fˆ]	ô\Í¬ç²ŸÚ·Âœ\ïøv#¸\Öpûÿ\0\æ°Ú£,§9P5`\äCÌµ\ÏQŸC\å\ì;^õ\äóÑ»Œmœ\à•\Îrsµh·\â\çð6¬\çP\Z¶\ç\ØzŸó®ôcð®ä€Æ¡÷\ã\ëC¹9°/¢\ã\îG°¸}€\ä\n\Èe\ÐÀŒ¿\Év\îZÑ›}21C¨\Ù\ß<sŒ\0;g&¸1\Û`Œ\ç\é[3…Õ§c°¸\Û|Vö\Ðø\Å\ÞG\ÅI!w>V1E}O\Ëÿ\04\r\ád\ícj\ÌRfB\î\ÅaˆÏ—W“€\0Ü“°\0ž\Õ¨\\þ\Ù/û>\ÕÁ·I\×sÂ¤¬ò óH«Ÿ\î£L±Ý¶™Ô®gÖ+§\Ã\'\í\×\Æ;v·F\ËÛ¤\å@³Sÿ\0\Ø\ç\r1\Î\Û\'s2\ë¡\Ù|2!‹¨$·M\áI%K{ƒkÈ¡£±Ü“¿ \ï|!\ÆOU«ƒ–\Ç\Ñà­¬[&T<Rü2#(\Ð\Ù?S\íš\á\îK&´MQ°b\å°ø\Ê\Ø\ß~+3^\ØO…#ž…\ÝP¹‘]\ÎH\Î5m“þf±kˆ\Ï;«j·‘R\Þ0 ™î‹„TLùNÏ·\Ò‹L\×F¢¹\Ö\äºGKõ\Â\Û\Ç2D’\ÛC%\ÝÄˆ\ÊJ\0LQ\Ç ]µ(Q³\ìj=½Âi\ÄR(U*€\04¢·\æ\ã\çQ¯gi\Ú,¾\"$†K‰A\Ô\'¸\r\Ýp¾»ŸÍ´ÎnŒDód\Û[•¬\îŠù\0¢.å³€¹8\É)ð”J4\Í\ÊR·¤\Ë;;YLš*\ÞÜ™Kk\ÔR+vüWYò»mþ“ð5\ÇEý–ò\Ê\ÎOø˜e&hŠkûµd“\0>w,s\Éûø+»…\é¸Ÿk»\Õ1ÈŠž#An‰\á\Åce\Äc=÷$ž1ŸmýŸYô“e/T²yÉ›-š\rµ63\Ë6F£žÀv©Ö°\Ìÿ\0P’u4\Ù\îiJ\Íj>x\Å)JJVhR” ¥a™T$\0 ³p\0’I 9\Ï=½¬3\Ü\\H‘Am,²9Â¢(\É&¾9\Õz•\ç\Åýet‡NŸh\í\"nR#‚\ÎÃO€[}¶·Ÿñ\Ï\Å¨Ü¯Cé²«\ÚE\"‰#`V\ê\ç; a¶„ýH\Ï\å\Ìø¥Áib\èÒ± ²\àŽI8?\×\æsÍ¹=¾gGR¢´»}­-bµ†(¢@\0\Ãõ\Åu‘\Ô)fld(\å·\â¤ÈŠš±\Æ7\Ç9\íU\×:—@ÁÓ¶X\ê\ÒŸ^s\íš\ç]O{\Ë+\äŸ\Â\îÚ¼’2v`0IøA8¾\Ç>m¢K5\ÄÏ¦0ZER\ÊBþ)\ÄcV8aŽüc|\Ö\×2W§^žø1*\Äsø‰*=v\í´Q„Fu>\ÒFN¥‹\Ä)\â¾\\î‰¿,O\äò\Ç&\è\Å\"Æ”Y€$«kŠ<\á\ÞEY‡p7\Ã\'·\n7\ÍpÐ„vHÕµ™\ÐG¤\ãV4\ç;.21ü3&\Ó\â#FŸ\n$	…1¬\0)*HÀ9œq\êvª÷}H\ÈD„iPQ¹\Î\Ù\'}ò}\ê¦l‡(,d Î²ûo¤c\é,sœ\ã\'“Q\ç\0²¨\ÝTº_oŸ]÷>Ù®ª\Ø7Ù›\Û¶~u\Æo\Ä\Êu\0\0×	\åAùŒ­p±w\É_5´R±\ÈQ³6x\n¿õú\×\0·¶§÷dºó¡ò½\ê\ã\ÂR f¡`ó… 6	,°/¾\0$\ï\È\ãóbHBD®Û‘\Z\ÆÁ\ÝÑŠ…Â€sü\'¾q%&Œ\Ö\Õ\\\Þ_\ç¢4=R)B\Ãs¨ù\ãoo2e0\0\ÆÀŽ\ÜñµNX\à˜´‰(\Ë\Ér\ç\01T\ÒB À\î¹\ã~Øª™#¶2¸S~`3ƒŒi¼|\ê)I :­\îJ€T;nHs¿¾*{T¿Y]m½\Ëü—\Ï±¨v\n\Ì\È$!X2 dñI\Æ\ägn9\Î9jUR_%\É=\Î\Ãœ~Ÿ\ÖaÁ\ÖLlŸ´\ÄUÑƒjÀ\ãl.FŸ\\\äT°Ö·e\Z)UA11øWVO8÷	Á\Ä\×F®ðŸ\'6}ŽÀûÖ…ûüñõ¬JN\r8\Ö0r7:FH\Û;V€³2…³\0’vÀªÉ£´Q\Éq\"Æƒ\Ìs\Û#aŸô©\Ò\ÝEaO\rÿ\0\ã¡tS›´\å³ùc$…\ì_~|EBu¾ H\Ò\ï¨J‰\"\Ò\å1\ã[þú·\"š\â\ê[û‰fuXÐ…Ž(TSdŠ?e¿\'5dV91\ßk—²$¿‡¯\ÇJ\ë}\'¬\\¤“Emtò\Üç•–X\Ú6“\Í\Ë\rZ†û\â®~3\ë^uY\î À¸‰\r´ –-\nŠ[c\ÜmŸüP‘‰\nœ*¬ŒNù\Î\ê=°3ó®Oƒ„]ü%s ˆH\Þ\âÑ9÷\Å[q\Ã<Û¾œ\æ÷AòZü=c\Ó\ä[Þ±\ÕBžg\Ë:¿y}z\é¦8\ãE!Ê®C1\àm¿¤+«\Ï\Ùà·ŽBCÁi“ý\Ô\Í\âN¹\àÉ’\ÛQ\î\rt0CoñÄš\Ú#5\é,u\ÇlÀ™?‰\Î\ØÇ¿åª•y.n$¸—\Z³…UÂ¢\Øò©¹,n2WCSôSýN\Öðð\ãI#¬c\ÊN1“^\Æ\Ò\ÔYKzdÇ¦·\ï24‰\î\í\Ðy9\"²\â;n*¯§YK¡t”ñ\îB-³+a\íš&,ó>üƒ}ŽrT{6\Ýv\è;A\Ñ-5£*n±»<\ë6wl’\îsø›Ú©K/\'¯d”#²%T·\Ò\ÌýCª\Ü)\"B\Ñ[G#d q„\n3¶9?Ñ¯_ð‡Æ–\Ö\Æ×¨K¦\ÒEžS6úä·‡Rª\É#;c#¶\Ã\×P\ä®`¶i–+‚S§ô\ßÙ¤»ŽAq0™À^ d{c8Þ½}½Å§Q\Ü|9j½O¨Y\ÅqÓ¦\n¯þÊµr\ÙfR5)`L@#.J\êŠòx\Z¹\æ^Ÿ\Çûò}~)bž(¦…\ÖHe%‰\Ð\å]VR;[\Ô^ŸgO±°±€0†\Î\ÚhƒL45_Z—VR” ¥()J_7þ\Ð> ŠAþ\ïZ’\í®9:‹F\Ä\0F-ò9<3ö§â®¿@\é¯27\×\Z¡°Œ\àƒ&7‘ü©\Éúõó.‡\ÒæºŸöû\ÍN\Ò\È\Òj\åä‘‰%\Û>\ç5M’þ”zz\Zþtú_\ìtÞ…w	m\Ì/¥ ¸,…¿v4…`9Õž\ßj¹ŠkgD/uÒ§Y®‰l\ÄD²9W|®>M½·ôQ\"¢*®@\0z\n\Ò\âk˜\Þ£G²*s\ÈÞ –\rRµMòˆ¶<gŠ\Â0u‰ \Ôð6\ÇOŠq\â(œƒŸ\\WK¢“G„\Ê\ÊRY•\åY•<˜#n\ç×µWI\Ón­e\é÷\0#I\âIo9cE„G„#.8œ…W5ù·`eŽ\æ\Æ\å\ã†I€E³K\ä\×>\Üz\î8®dF·œ\Å\ä‘un‰\"€+™c\'3\Æ\ë§\ró%`sUòIˆ24šFUV!\à\ÄUG\'8\Ü\à\ìq1\ïµ,²L\ãc—ž\Å	 ar\Ê6ó\äùpk\î]ˆLdQŒF\Ä\Æ\Â&g\Ötw-¤\rø€¨³]r\ËÄŠ\é§.À…:@\ã:8=þ~õ\ÉB\ä\ë¨\äp9\É\Íf`c:r¨!±¹.\Ûú\ÛÚ‘²€I\ÉÀfoeVÑ¤\ÉÀ\"~Uy=,¤¸0[H\É98.|\ÇNpvõ¨ŠÁ\Û„2ö?\å·z\\H\ä¶0I1\Æ9\ì~õ¤!KBŒ\Ã,BC¿\á\\c|Ÿñ®¥’™Ùµ6v\\\É µ·X¢	)\Õ4\àé‰¢\Ã#§ü{\Ô_øbxóK6©vU\nHHÕ˜ñ¹Ï—¾Õ»¾m.4ýBw™\Ël\ÅIÂ¨ö\É\ÏÎ¢d“Àü¾µ\ÙÉ§„UEqœ“\å“SÀ\ÒÁ`P…\Çñ3y\\¤i¨\à’>Ù¬x‘F«THù:d\r¡+¾y«è—–ý>¥Ô¤6v÷(¯m§‰yq\Z\ã\Í\á³.•\ã\'\åU=Œ¤G\Ä…AqŒ€},ŒFO½6K²\ÅQ»nNF\Ú\ÞR<&TË#›\Ì{œ\0>Ø¨rZ\Ën\\¯‰‹ | 1|À\Ô\Â4–#l\ìG½m\â¶[¬KÛ{sœ\×Up\É[¢…ž\èð\È\Ñu#.²\êt\ï°;U• …\×ö˜U\ä\Ô+Tb5\ÈhðT1\Æ{\rÊ¢Iº°…°¸\r\á¸¢\08qŸñ®rM\r²‰ Šhn¦Š4$¼VðÈ‹™!þ!:¹Rr\'ˆ\Ì\Ê\ç¨\Ó}Ü¢OU¹H,-\äY\"…\Ú[‰c\È[›½!\Ôm\äQ\än2=E4\rÀgc\ë\ï]\í,t\ìßŒ\"Œgp$6? k2\á\ZE\\„`6\'ò’P—\Zt\Þ\ì\Éöm b­_|ˆS··ú\ÖöÑ¨q\"kŽ\"\Ä÷$¨XÀ\äò6¤)%Ä‚8À-¥\Î\çUS%\ÜúNõ\Ö\î\á-\Ñ^´fK~˜6÷‡`yÊ§¾£ùkŽ\æY©¿ÓŽ#÷>ˆ]Nvyž\Ü2³	\Ú{¶Œ’’]‚¨O\åð¯\Ôþj\ëÓ­\ZG\'*‚y\Ë\Ê	LC‡bÀnB\Ï\Ðw¨Ç¿\å€s½z»X£YV\à(´\éò	§•Ï’mH³\Ç;Œ\âGù*\ã\ÖR{™žŠý(\åöÎ·7Pô‹\'½Ž\ê\ëLv0L3$1U°1Ÿù’{²\ËU].\ÎWÿ\0ˆ`e¸Áˆ6¢\ÒK+\"ø§bN\í\ß\é\\&ºŸ­u/\ËQ±n\àG\Z¶¶g<d\î\Íþ•ôo‚:J\Í?ûZEýÅ’\Ú\ÅIu‘nF¨fgb\ÒF\çsü¸Œs\íEV]².\çú#—Wø?£ô.…\Ôz´º¥\ê’Yt\Û;±q š\Õ\î$¼·J‰ \'¾08®¿[\Égñ5\íõ\ÒDT¼–+8\à\n<4HÀñ\äg$\ê}‰Žv\Î*ö—\Ô\îúÃŠ–²´M}v-&eUfh<$d\ã$ŸOy~•t\Ö\Ý\á>‘¡k\nÉŒ\Ï\ãO$\Ó\Ç­\â;Œ8ùÖœcƒ\çò\Þ[>\ÅJ\Çú\ÖEt¬R” ¥(G¼»µ°µ¹¼ºGomK+ž\Ê;\êx:\ï_(ø£­\Íñ?S‹£t\Ç\'§[HL’)ò\ÜJ›r?*ð¾¼úb–\Ôh\Ó\Ð\îž<.\È5\ï\Æ=nK\Ù\Õ\Ò\Ê/$1nDP#eP5Xúü¶õIQH\Ô…{`?J\çikoÓ­¢µ‚=‚¶†7,\ß\×5\Ú0\ër\Ä¹#Ï³d\ã\×\0š¡q\Ù\ëJkc\ÂGrûlvû÷¬2p\0$r~û\×&b¹\Îpc$\é\'<.ûïµeNI\Ürúˆ\ã\åþ,ý+¥X4gó’*p»þ#§l\íž7\ã\íò¸ŽO b-ý\ê\ìpŒ‡À\ÎÃ“·|f¤\Ê\Ë\Æd1³¨\n	ò®Hž¿LwÞ¾\êF“,\Ã:D™Ó¬\í¤}A\Î\Ü\ë\\,ŽJ+›I-\ä˜Y\Êúb†q‚^YHo/²ünbH\ÒD\ÒF¬RUš\Î2\Ín\ÓMK\É\Äyß‘ƒ\ß\çop\çu\Ú@O%O›Ga€»3}\Â ÄŠ¤‘)xU€bd \égby\í\Ïo.MQ{–$VHX„reYÔ“\Ã†8Õ“Œ\0qŒ{m«ÿ\0\ÉP\Ç*\Â?\ä\Õ\Ù##o)\È;œœãŒ·v\Ã\Ò8EŽB\Í\å&Y•`Cd@õÁõ\ÍG\Ð\è\ÈÐ¶\Z(-\åt\Éx„“.’[Aò‘‘Œ\É\â£\Ã-rœy\íE\ØÆºƒ~\0œ\0O;1\Çþ+’\Ç\æm>_	\ã’\ØP?RO\ÏŸ/C9‰\âŒ VV‰‘€¨ªa6Ü‘\Ï~O[ˆ@Dl…Nnf/…P¡¡Û¶nå²»`IGSµI\êì·¨~\î\è\ìW²\ä\àøû\×(L	qh÷;\Û%Í³\Ý	ýÈ•KŒl\Öcaos\"LÃœ\"«²¶ú¼2p=@>Þ¹®…eŽ@@}#,¤jF\ÎŽ\Éý*2X–K)—©F\Õ\ßG¥þ\Ð:¯\ía¢†E{X!‰b\Ò|Œº\åxõ5\ã!‚k™¡‚üIf‘\"…F[»\0«R®J\Ï(ñ\êšD†tb¬ð\äY‘²§`F“\ÆucmºU\í÷I¸ýª\ÕcB7Ž)¦Ž9?g,¸2D§8C½+G©“\Åz+”¶\í\'õ\ËK~Ÿ\Õ:¼¾*\Ú\Ìm\Ëñ¥T”ùI#\éU¤\ç\r†6\ÏS,ufgf.\ì\ÌK31\Éf\'rI\Ü\Ó\×Ö±\É\å³\ê(ƒ®µvŒy½~õ¶C`8Ô¡\n†@\çœV¸\ì)õù\Ôs‚\×%†uC<1\é\Õ\ámD\Âû\á° r;c‘\\¦¸¹c\åb2Á\ÆžKz~½«tÕ­t\ì\Ù\Øúo\Íd\ÇÀ+©×¬a†Ç¹5b–xfWK¯šÿ\0±5m­š)”\Åqsq/ç¶°NGó±À_v•K4\ís1‘—B\áR(\×ð\Å\r)\Zûÿ\0žõ2\å:ƒ\Åp…¼Mw\çrÙšS\Z\é@\Ç8*¹$`rÄž6‹gl\Ó\ÍD`;\è\Ü\ã\ÌAÒ¹>¼Y«¸Q\Â<ÅºV¹Y\Ùk\Ó\íÜ„’(\Ä\Ï96¢6\n#ñ%RÉ¨\ÂoP§\Ï^·pEDµbÁt\Ë{ ff:\Îq¾Xùˆù\Õ2c°°n³<j\'–·±B4\é2l÷„m\è«\É×½?N…®&k›‡\ËK\"\êy8i&fIùœB ¸\ä\Ñ9oö/\ßô.:J’\æ{[\ÑZK¢<tvTÍ b“:³dd¨ó°\ã\Ì\r}š\Ò¬\í­­b.c·‰!F‘‹HÁF5;\ËI¯/ð§M66­{s%\í\èWx¥E\rl4ª:!üXb¡±ž1µzpõª¸\ádñ5wú³\Â\é7ûK\'M\èi\Øõ)Hÿ\0:¤°\é\í^¼\êÒ‰ê³†\Ó$i‘J\Æ$pe\Òz\äž\Õwý¡e\í~_^£?ÿ\0\æƒü\ê,A\å–e¤–8\Çý\ÌIöf]M\rš\Üq\\Gom«ªñ]*3JR€PšWœø·\âH¾\é\å£*\ÝF\è:YFp@ y¦qü+ú’¸\ãxå“„\ä£\ÙAñ\×\Ä\ÒF\Ý\î™!7w %ü‘\ãŽM…º‘ù›ózú¼±úJ‹¤\Ú\áMÌ <Ì£}¸AžÂ«>\Z\èò\ên±Ôµ=\Ì\î\ÓDfmR&¢\Ò>{¶sõ¯C4 ’FI&=ˆ\Z¸\Ç<|«;{žY\ì\ìPô¡û›\ä³cV\Ã=\Ïl\Ó$ d±\\z\ï\\µ\ê<€3¹\Ç g£I•ÑX–o˜R3°÷\Åp\æ\r\\þ\íÆ¦ +.¬oØŒdñø~¿®­8D\0±:˜ \Æø#Q\0cü~U«7•\ÉR¸\ä)aW÷\É9ô\nV\Î$n—,žTW\Ô¨n3\Û\Û\ßM#7R\È\êHØ’YŒ>eÎŸ¿~MB’Cœ/˜‘­À4ŠªQI\Åvô\çš\ë;š.\È\\ ,N¶#HÇž\Ù=\ê	uÀ:°¿¼d$i:F\n’›:‡\Ïùk…Ñ’>²\ã\núTŸ0:v\Ôx\È$g\ëXT\Ì\ÉÒ¨\ä\ç2þ\ÊI\ß#\ÎAþSô\ê\":XdmŒ¬ª5\08ðº‡\å\rŽ\ç´P£¤§ xžgA¥snä¹‘\Îq‚E\Û\Ô\ã|\×·‚\"Æ³D„ „a°0£Á\\¨Ç”“ŸÔ¸\Z\æ%þ\à\ê\ÄXgA\å*¬\ázÀ`»m«°ü?—k$_(.\Þtf\ä1¨\ÜrBŽÀŸûa\ÎKUX,®\ÄùIm\'Íž0Š5ny9\ï´Z\Émi\ç,‹,\ïcC‹£s1cˆ¼-\ZJ„]\É\Ü\ãJ\Ð&?gŠ3û;^O)\éT\Û\ëM¢*¤—\n¾\\\àœ`\Ù,zb$\"Ÿ5ˆ«˜\Ç¢’N\0\Æÿ\0$?3µÀó,ñ®dR\Ü\ç\Z\Ã  †ÿ\0¸vYHª{fùG–¼ŠG„I¢m	­\â’WÊ»©,ž+a™œð£s\\!¼Y!e•u±p\Åõ6Tz§osƒô«è‚‡…@W·¶\Ò5\ÆdI\äŸX¨qqŸ\á-œ\n‹»yDS@\Æ;	’uB\0Ö§P2G ©eK†Q*­¥ï«Ÿ“i²¼±³K\Z²¢²¡P#\nHý>•\ÌÁ*\èG$Ur\\\ÍhpCd®tüŠò©\ëuÀ´Š±–\ÞG–F\Æ›~}j©®Q¯O¯®^\Ùð\Ìÿ\0F²y?ýfŽŒ¸;<2þõ­3Œ\ÕªžW~G\åOüÓ¿Þ¶.ô;3‘Ú¥Ár®üWLžGo\Ô\â¬\í!:Á;ï¿§\ßÚº‘	\Ë\Ë[’\'R£%£–7\ÂŽU$\çp{\ëu\×J0³\×Tr\ÍBX\Õc†tùa†\èÜ¡n7¹VP›\ä\Ø\Ûa“WiM±ÈŠðÈ…]$\0«/8 \ÕñG•|²Ïšu§½¾\êB\ÞXmÆˆbÆ§ÀaŒ°\×A\Ð:\\7S¢H \ÚÛ¨’u’6hn\âN\n8ÀÊ²\ã\ä­c¬@ñ¹¿ˆD\Ò5®\í\âEE¹\íÏ†{g\éú:\Ù\Ç\ÓlÍ˜\"	\ÔÜ…,\Ì¥%™@bH\0\ä\Ûl#¹˜o²UG·\çð]‰½\ë´s69ª\àI\ã5*c\ëZO)¢\Ä\Ý.÷«\ÚØ›M\r=\Ë\\$nÁDÂ©\0²0+¿E\è÷\Ï\Ý\Ü~„	Š&*\Í\âLT‘·m\ê\æ51Š\ã#ž«Ú»/¢Š\è+„E)X$\0I \0	$\ì\0÷ \"õ¡g\Ó,\îo\î\ä\ÑolšÜ–cÂ¢\ì\Ç\0zù5ª\Þ|Q\Ö&\ë=G\Ý$D‚‘¢ÿ\0w\0\Ïa’I\îw\ïS~ \ê\Ò|S\ÔÅ¬Œ:7Ovv‘H\Ó4¡Xx\äw•>yü\Ønº\×L\é\â>dV3\Z€˜\É$v÷?2>Y\ç,³\Ú\Ói\Ýq\Ïõ?ðE,ñª\0\n€Q³°\ã\äj¹b\Ù8\ZÊî ®•Ç§$úæ«£\ê‚TBjec°E\Æ	\å·ÿ\0\ï¶\ÑJÊ_”.wò\Ù\ç\'o¿¶ð/U¸–j\ã\r§$C€tœ`ž\ÜVá‚•\\%˜d\r\È\ß8\Æøô\ßü+˜u«8\ä¨\Û\'ƒ\ÇÚ¡\ËrH*§}²r\Ç\0õ\Ïú\Ð\âŽN¦RÀc\Å< \ãv€ÀsŽÿ\0\ë\Â@Š2¬­ø·\0ª»G«\'ò‘–ú6+@\à±\0hfŽ\0P[;\Üý½ª=Ä²\Õ\å@\Ê\ÇI,A\ÆHñ¶\Ã\ï\\%´Mq­qœiU\Æø9r®W|{±Û¿\Ú,j±]üªu6CyŽ¡·\0=Ž\Ý\è¥\n_‰Ìšu—.U\Ë±\Æu|ˆ\ï¿ocGS•À\áT+•>o]¸ß¿ò\î,GdA\Z¦½»>¯úX©Rv\Î2G®9¹\É8>63¦B\Î\ä.N’€£>€Ÿ¿“&?Œr#nI_¿\n\á\È\É\Îxo}Ï®\Ü\ÃK!1¦\ÇK€Êª•\ÙJ\í\Øþ€\êŠ\Ï\'=L\àB¬„œŒ6Ê—$\í\å\ZŽqþ˜Œ±\n¾\áwÙua\ße<B[Z…*§\ÌV4\ÎJ\áC\0¤6þücš\ÙB,‘\å²L±´Žs“©˜§#88\Ô~ž˜®`½Ø±Ábm¡W˜\Ãñ²d\Z‹\Ò\0¤¾4¨™˜]y!·\Ô,¨\Ç*\Íû\Â\Ê \Ö\\~pƒŒ±\ÆÀ“d“FW\ÄT>R\Î\0\Ò<S,\Æ©‹~©¿»?›\Ïu9 Hú\Ìjö \ï³0\È\ï¹ñ¨m\é&Ì”\Å\ÊXdy™’\Ú%@\ZY\ÄL\ng-­B•\ß`œ—lœ@pÑ‚ª\Å0º\ædd9©\îp\0õ\'µKÎ¨õ\È\ÓBŠK‘3\î\ãñd\ä\àw×“øqUó8‘¥l9A\Î2I\ßdüû}ªlô!Ž$W!¼M1º¯•÷Áo\æ÷­EŒÈ‘ÀaW…¥B?~ø_\r^=\Ô\ä3\ï\Æó­,\Ú\è\\]r\'€È œ\È3’A\Û\É\ÆØ­º\Ü\Öñ#º„i§žF´n¨w–\ì·\â\Ë>D\\l¤\ï‘V\×\'\Ñ\ç\ëi­û’ä¢Šñ\àwŒ,Œ¬	‰±\å8\r¸û}ªÁ\Z\Ï\îÎ‡\ÆLmÇ¶“š¥»jcœ\ç9õ&¶h€\çNsƒŸÓ½Y(\ÆF->¢ú9k(·!Ál\í[¨9\à’F\Ø\Æjµø&8§\ÉAœy\×=óµY\Ã\Z¸…\Ó\Í’†3œ\ã\ë4«q=\ÚuuÜ¸|m\â\Éœ}ý«\ÐYZœ&\Ùc±\Æpt\îqõ¨6–\ÝH9Ûœ¹û\nô–§#Œ=(¢Y„N¶‡HnÂ—·Do®jK‰@¯1\Ô.|ip§`N}÷©³Qõ%–Fa-Ô…yN”Q\ÉcÀ\ìzmƒYY\Û[É­œ¯\á\×#´Œ\ØP>\é\ØV¿™FX¶²þgúð+ÒªJ¾¸\ádÁ®½N[#\Ò9\Ç©±E\éXD©h†­<\Æ\Í\ãLT•¢­uQ\\\"ll()@+\Å|{\Ö.m,‡NµÖ­z¸¼™C\r«;\á·\Õ\ì®\ÞÖ¼G\Ç\ßõ­i\ïK’a{f¤<0»+O\Ëy4þe\ßnùö\ÅFY\Ç\Ô8«‘\â\ï®l:gG·µ±¹Žgvcq-¹C\â;Dú\ã\Ð\ã\Ðo^b5ªJ\ãV\äÀ*\Å@ÛŒÿ\0^Åž\Ü\ÚDoå•¦ñd‰\ÛÀ\Z *FŸ”‚r?”÷ô\Ú\ÒÁz<öf7s¤\æ=\Û­¬ø\Ê\Þ`Í¸\ãm»\n\Ê\âÏ¡®\Ø\É~H%Í¹cy3œsž\Ço\\ÕŸ[H+wa\å=³µs»„[³–$\ÆÒ§…))¡Ñ‰E q†8\Æ\Ù\ß5[\\³	6«:2°Ô§Ô™R=\Å²ºg£N7EÁ\åu\Äü‹z\n\Õ%&ù\ÔG˜Ëƒ°$d“\ëŽ=+\Ì4S\ÆN†\Ö6Ô¬I;\r¶ôú\×u\ê3€<gbI\ÉÏ™ôäœ¨Æ²{ÿ\0…¸|‰Y\Çq§\n„ƒ¥@v>]GmÀ=\Ï>õ\Ç\Å-‡\r–P’¤’Ž2\Ûw#\ï¿*\Ö\ê „\'$ª²©\0:©*+³ýv\Åo\åÁd—-‡,¸°\ÆI\Ç¶}¾x\"\r`›¸y\0-•RÀƒ\æ\0*%¾]ó\Ëv\Íi.¹\Zr@!Ž”\'d“Haý\Ìûæµ‰”3\í UV\Öq¡ˆ#cò‚{{‘ZHÁÎ’Y,d‘…m%^L\ã³8\Û\Ð\ä_<#\Ë*\Ü\ä’\Î6Ò™\0\ïœ÷\ç\ß\éagl3¹b£XùH<÷\Ïñ(wïš¯ŽQ°Q£\Ä\ÒøJ2–Ç®þ›|Uš\\ª¨Á,¹,5œ²yp1\êsa\ê(%ž‘¥Ã¦$‘+	ä®²­¹õÜœüªy\Ã(-´–óF	:‰J\å´ú•#†Ã¶“NÁ÷m%Y\n\àeAR˜¾H¹q\æ\É3\"´*hõc9b«R\Ãnøòýýi“»q\Ñ(Î–\Ñ(Cƒ\0Œ.B4($Ç˜cs\í¹?Jó73x²¾G•›q’Kù>§½K¿šc\'†\Ìm ³y²\Í‚j¾5\Ö\Ç|j\r‚s\È«“É®š\ÔNŒ\Äø\Ì@%˜¹\Æ@;’F}*2+K,q %\ä‘#P|\ÌtŽk¼\äa’I““—aô8®ý>\Ø\á®d\rºjˆpóJd9c\å\ã$\ìk‰d¶RQŽIjb°³\Ì\Å\0Ž+¥¼*Á¤6óI¥\"ˆöyH*\ä(cÚ¼Ä²O}q5\ÌÀra#P¢ \ìª0z\n›\Õn\Þ\êd´ŽE’(_T¯\Ñ\ÏrTFÌ€m¡@	²\çóœÉ´³>\Øð£#K`\é,}‡m\ÆjÞ–\çEz“Ìº \Çq¶\Ç\ç[Kd€;œñ\ÆõÕ†–<d\çÛž\â»\ÚC†{‹­b\Ò\Ô	f*…µ¶F˜†6\Ëgü=j•–ðo’„\"\äú!\ÉÒE¬¬\×+$±‡ñ´ò“\Ûý\'Yi}=œ\Ê\èCª¶tÈ¹Fø\×Þ­ºŒò»\Ü\Ä\Çþ\"\á¼K\âN\È—KQ°œ·«\Ð*VFmg8§‰!\ÆX&@\ÈPý\ëZ’Š\Ã>vUN\é» °zžyÀ€ÚN²²\Ïg…|01\çls\\m\ì\ìš	­\ÖxŽ¨›Py”•`A\ã¥|¢\æ\Êç¥¬±N¢6¸’+VBU\å~94‘øAò\ç¹‡5\éú7]K³a!¾SpÓ‚HŽ÷\ÄPK6\à\Èr9®mò‹ctœ½+xg¤\êWšB±:»Œ\ì==*»¦\Ù?Q¼Ž\rü?\ï\'o\áˆÀ>§Q¤–K†V‹I)6[ò\ãœ×¸\èý9z}¶’¸›L—\rü\Ø\Ù°®B;™¯Sj\ÓÕ…\Û,Q*\"…E*€vEâ°«š“\ZqZfñ­JE\Åi\Z\â¤\"š6Q[ŠŠ\Íp\à¥)@(iJ\ÆüKð7O\ë\r5í™ŠÛ¨ºbP\ÊM­×›W\ï‘xcü@}\ë\åW]«ô\éckSIø\í\å\ÉB›€ñJ¹s\ß\ï_¡\ê%ÿ\0N\éýN\Ý\í¯`Yc9+œ‡¿Š7`}Á¨8ü\Zj½\Ç\n\\£\á6·\Ñ	<EœKgrHI\ï\ßb=‡¦+f\Þx‚«W/$±\ÜH+9\ßv\Æ6\ìy\à\Zõüw\É%¢=õ˜%ÀEQy\0ª gÜ®ÿ\0\Êy¯®{e\É³À1r\ÈG‰«$Ê¶í#Ò©”O^F\ï\Ê7Ö®\ìCJñ\æ=Y\Ô\á·ß·õLQL œœlwA¢ˆfKy !´ƒ†—Œ©ô÷­\ÂL\\C¼³ø\åµÄJ¤‡Nù\Æ\Ûdo“Uò»6&¥\ÌYKž<o§p~ \Ö\Äð‚œ\0\n3þ_ozœ%t2kþ\êC\ÛQW\äŒv\ç?¥lcŽA†²q¤=\Í;\è\î|3Š_‡\Û-‚\ÙùqŽv\ß|\íþ5·Œ¸gÁÌŠ\êIleX*–\ä}ñ\\%³\Ðu\Æp¸ÁÁ\ÏjŽ’I.¼œ\Ù i8\Ø6\Ûf¸òuEx-ã™”DÒ²‚H\Ä&w9søŽ1\êNüT\È&Q_H\'ó³3\0\î=\ÏonÆ¨Î£¨“ž\Ùß’x©qM…|j\Ãd\åŽ\äg“¿õ\ë]\ÉÍ¤\é\\	UÀ&FyG95\Éeòg\Ì0¬¤4š›$ûüøù\Ô9$\Ô\Ä.\Ø9r\Ça\Ïmÿ\0_Z\ã$ÁB\0r\Ç\Äoq«\'\Ü÷úTrM,ðf\ê]rË±Æ¦Ù»¶}€\Î\ßø­\Û\\~8UPñ/l\Ù\Îýü\ß?•p@A\Ö\Ëü-†õ>p	\äOÏ¶kœ®H$\î\Ç~Ilf¢]Ÿ\Ú!\ã\ÜÂšI’=AAc£!H\Ûô©½N\â; ‚]mh\ÈK7\î\æ\0ßœ\ÅÝ¹ \ÖmQ­-L¦ByŒ\Ò \Zàµ…ÏŠù;\Ü*cr\ÇýœY[už½\Õ:\Å\ÌKŽ•ªX[© iu\"0÷ESƒŽ[<\Õ\Õ\Ç,ó5Ú‹ƒ\Ìÿ\0»\Ýo¦\ÇmwÔ­…”sÄ·r\åeQ“ûµG\×gd`’\Þå†‚QD\Û21\'\';®;ŸŸ²þ1\ê\ë\Ô/\î`c‰å·„·Ï¾j‡¢\ÙK:õ«\È\ä+K²[\ÙW\Z„ÀÌø[‚2À±À\Û\Ò\Ç`«Y$\Ò}\Â\Ës8Š%f–G\n«\ænN2y?:™}4vj–öï”µ’H\á\ÔT™.\Ãy\æ:NœG¶ÿ\0ýuˆÀ²¶•õ´w7Qd¨?³\Û$‚s»Ž7¾C\Ë\ãI¨.¨€\çB²’y=\ÛÔ“UAan=\rMž´\ÕQ\év\"ò\\\å\Ü\"–Ø’\ÇmUce0\Ñ!ðŒ\Ð\ß-\ìÁ—TP$¾e³«:‘5d\ç…\ÍD°´,’M\";\Æ#ŽTðˆ\ç\ÇH„1s­‰\Ò1\Æ\çµw\ê÷Mk2»¼c?Pk|”\n’°FNú@òø\Éÿ\0™³&ä«‰[\Õ\'=^\î8­UV\Ê\Í½¾6M	…,=†\ØûòÆ \Ïesc%¤žu<2\ã±ýGl\ï¾\Ã\ÐX\Ùx^1ÿ\0{$\ìjO9.Ñ‘\Ä‹ù@9m±À\Èš÷q|\'ðüÀ/¬b¸¸R\ï,‚K…V’F\Öø\Zø\Ï\ß\ëZ!“\È\Ô$»ûŠÏƒmZò%ê³§•¢·\Ï\ç™<\'\Ó`=ó\é^\åF{W;h ·Š( Ž8¡‰BEJGeQR\Ñ8«\ÇFY\Ù+dÌ¢\î*R.1XD©Q\Ç\ë]*¹®\à\0+ \00)\\8)JP\nR””¥\0¥)@1^{­ü;\Ðú ’Y\ãð.ˆÿ\0\å[YXŽ<E#Kc\Ü}Ez\Z«\êóö\Í1’Q“‹\Êg\Èú¿\ÂWý=\Þ\æ,\Í\Z’EÝ†¥•G¬ÐœŸÿ\0°÷ªAs<!M\Â\ë@|·6Ú•\×#tSŸž\r}^\âWBy\Û\é^[©\Ù\Ø\\³É§Áœó$ \0\Çù\Ð`\Ð\Õn³Ò«Q\Î_ò\È\Ð\Í\Zˆ¦ý\È\Ë‡\0³€	?/—‘Î·’i½™õh=K3\çeµ\î28\çoz\Ò\ç¦]¤Fh¤i\í\Î\ïùÓ¿Þ¸þ\ÓqnÀ\Ü\Æ\êp¾ò\'#\ß|\ê‡ƒÐ\Éý\Ë÷%\Ìñ\é\Ë\"W\\dº\ë\0\í¸?*Ì«Œ\îs¤‚f;Š\âs2\\C\"\Ì7\ä‚2G¦\0\ÏsœVª\Í	…I:ƒ¶¾À);\Éû\äTÐ¹Y$im#•9_^Ö¢G]›9\Ø`“ŠµY±.†Yƒƒóû­d·†E<œdc\0\ìH£DÔ¾JðK\áX“¥@\\r{\ç½i+x“Jrø\Ô3€«\åÀÛŽ\Ãj\ï%¤ˆ\ÎþR7\ä\Û\äk\Þ\ZÈ…±¨:œc6Ý½*8$™\Ñ eS[œ6\\d I\àc\0zÍœ÷\×\Ñ$~‡\ÜI+…ŠT\ZYY†0 \×mn§\Ém\'#%F2\Çÿ\0\×z™·\é½\"I\äV77\è‚LcöU\èEŸ\ÜþDl~,’\\”¶G>H}rñ]’\Î\ÜD *®‚–‘\å­\áaœ\ä\ä\Êùü\Ïü•Ë¤i?Šó\ß[\Û\Ü!ŠYº{4,\Ç\É\'‡‘¬\rõ.FA\Ø\äo­¥Œ\×N\×WLÚ¥\Í\Ãøœ>¦¸\Î3\Ûnþ–ø1ÀH\ÈP±¤+¾§\Õ\æ’CŽûM†8©\îq\èÌ©\ÑÄ¼”}N!ºÒ—–—±°\rÅ´„,Šx2$¸uoP@ÿ\03o\Ónåƒ¤_\ØŒ[\Ïsku\Ô&1¹kS’62Tœ3l;O!\ã=\ÄC¤J\Ò!G#dcŒ‘œ[\Þ\Ü-²+E h\à:-2º|k\æó\Ë;)\ß	Ÿ¾1¾&¦\çÁšZHiý\Òy~]\Ôf•\åx¤?¾\Ô\r\×c¯‘\ØN\ã\×o\Ë[tûI\'™G\âh‹¦2Hv\Ð\0\Î\ß\\\àrj$4Žƒ9y\\*\ä\çS3c\Í\ßzõ6VAaˆ<¾d¸Šô\Å*£¥¢±\r­S†“tRÇ€\Ç	<¼#M58Gs\í›5\Ä=6\Én°…#i£\éÈ¯¬Oq&Q\æ\ìwHñ¶X\Z¨°†Y®&~\Óu\'ã‘´˜\ËjV8\àm|v4¸¸ÿ\0jÞ´ø\Ñ\Ó\ìÐ¤Tª¤q€úz\0=7ô+¥\Ëw;C\"¼q¦Vùfµ\rŽ9ÆŒþMCpvm\Ëo€18\Ç<\í±Eoþ\ßô·øo§\Õ\Ô$ŽHŒŠ±\Ã	•Y@1¼ºS#-\î\Ì{g\n+\Õ\Æ*<HªTUUT`\0M‰\rjK)9<³´k\Æ\Õ.4\ãj\Ö(É©ñD{Ð¬qúŠ)J\áÁJR€R” ¥()JJR€W)aIA+­(\n;Î•¬‚¼\Å÷K™KyO~+\èu\Æ[he2\èMKÈ®,gB\Ç\íUÛIIùmö¯®^t8\ä úWš¾\èNº¼™\ç|Q¤\Ë\ákOƒ\æòZ&¿[\ÊG\ãƒHVÀ\á—e?§Ö°..a\n.\ã\Ê)þþ\0\ÅPúºcRý+\Ò\Ýt™8c‘Š§–	¡m\ã9ý\"«p6Bõœô\È\Ú#x‹@\ÈUÎ WNX\ê,¾n6\ãµtYeY\'Žt\Ä2r@\ÔG”7m¹®Ã³\ÄL·%\0\ÐûðñþôÁ¬™\Ù‰¦<\èñ¢f0·|ø—\ê*—toÉ¯q29apŒ†\0\å\Î\Äm\ï\Ïõ˜\Ó[	Nrª{¶2I\ßøGù\Ö\í¬´3FK¬dÈ«crK|¸ù}«	/„K\ÎT‚\äh]’2V\0\rý\ÆI¨\ç\äÐ¾Q!)0ñeUHÇŒN\äù4\ã¿n+¤—\í;•ý©µ*:\ä>4Œ‚$Ài	\Z…\Ûnþ´»|$Í†bÒ²&¡¸\0…ú\ã\ïT\ëm2±¤‡${“\Ü\n\ìq\Û3j’Â­dõ’»\É\à[Ú·‰¢\Ýh?»ñÂgP\'`®øï¸¬Hgº—P¶¶\0¹_\ÛðÄ¤ðy$ú\n¤†þò\Ý%…\Ü$r´m# Ø˜\É+¨\röß_zµ¬\Å5·6öðº\Ë\àFšyN\ÆVeÊ£±9\ß\Ó4p~CY­¶-¬\ïj\Z\Ò®ZO\ê\â\'H—{[q¼·>np6\0rX\é^zyi›*¥ DpFN|8—$\îw,{’j_P\êpj\Û\Ê#\ÖÂžh\àL“°9fßœ\ricm$®`³F†b«Œ•F]·\Ûü~FÚ¶Š×¯c¶]x,zu†ó\\D¬¦\Ü<p»\è’f3*,¤d³±\éš\íÖ®]5tØZòúO\Úz”°)™\à@¼.0ÿ\0õ\rXO{kek-\Üe^\ÒX¨ü»¹5+Ë¬¨r£Ì‰ž\0oPjŸ§[\ÝI$—.\Z[\ëƒ$\n“­\Ñ\Îv\ì1\è;\ì\\rJ\Ù9{¿\èJ²¶˜aA:\r2N\"»¨‹Ddº’¸üL¹rG\Ðúm‚X\Ú\Å\n®$Â´ß¼’Q\â¥^R[J€ûz§ø{§•?µ7Š!ˆ¼V°\Ü\Û$nŒN¢\á\É.@%€ß–oA^®4\Î+L#ƒ\Æ\ÔY½ñÑ˜£\ãjŸ$\ãj[À[U¬Pª\ÆjfCD\×jR¸pR” ¥()JJR€R” ¥()JJR€VRA\ÍoJž\ï¢Á0%@×š¿øx¨b#\åš÷µ«\"8\Ã\0E	)4|jû¡º–Â‘\Î\ØÚ¨å¶º¶-±\Æ1¸$\éŸO½}\Æ\ë¥[N”}«\Í_ü:|\ÚP½q¤\Ë\ásG\É\ÄzXµ»›w$ŒŒÛ¹÷A\Ç\Ó\í[¼±\ÈWp¤R¾N	\Ð\ßôJ»}Šõ7\ßŸ6©ö}ª†{»}k¤²0\Ã+\rJG¡«p6×¨\Ç\à\Å\ÛJ\Ú\äH›T’I Ác\ZFw°b[cž3¹\' l*\Ìjw‹\0\à\0t\rŸ`Af\ß·\×i*$‹)X\ÉX\å\Ô\Ð\çŸ!eúò­™­\å*·˜&\Âà¯Ÿ\×K#}wª%J»¢\È	@HÊ¹·6##jŠmc\ÎF\Ûv«‰b‘VC&dBs\ä#».\í\ë5\â³\ÄÁ“@|o©6\Ë)$â¡–º48BÏ¹R §‡\é\ì,Y#H†$\\\ëu`dŠ\Ô\èF™H\Øv‡\'ñ)\Ä>f./\ïKco¥üW\Z\ÚBt$q\Ä<Å˜\äclš‘\Öo¤¶µHY–;Î¥¥\î„AU--\ÔiŠ\ÙB\0…<Ë“È®¤\Û*²Q­atˆ—§V¿mc\é\Ö\n\Ñ\Â#P…Ô žÁ}€ú\Üt\Ë5\êw	˜\Z-1\Íp³	m#GðôG¤*\ä\îÜ–\'µC\éð[ZYIw\"\Ä\æ2Ö–I³‰.\Ìjfº+Á©U#ñ>%{Þ“fööÑ¬$—7\í2L\Å2\È*\å‡ðûV˜\Ç\'u\ï+¿%…¼)\ZEk¦8£H‘rN\0U;Õ­µ»1V--\È\È\ãsWQÄ±€8«>L\ÄQ,cñ]iJ\áJR€R” ¥()JJR€R” š\Å()JJR€Vk ¥(`…<€~ušP§\é\Ö\Ó\ä\0ŸAT\ß¨¢‚+\ÖSšRhùMÿ\0Ãªuj‹\æ@\ÅyË®wn\ÃH\È:\â\Ø;W\Üe´‚Q†Qöª{Î…€•Q¾kdº8ô|M<XBB¿ò\'c‘ÿ\0\í\Êwúü\Åi(ŠFÔŒ ›9h\åý\Þq¶Gcóôn¡ð²\È4A†øõ#\Íykß†:ŒJ\Ë\Zˆúg#þ‡^\Û\çUJ¡V¯ÁG\É-\Ì=Î©©£Q>W$a\Ë\0\Û$Ž\Õ.ÿ\0¥^õ\Ó,Q4¨‡\Ãÿ\0€o—?\ÆÄ–oL\ÈÀ“\Ò:P’\î\æ\Ýmg¶,A\å™\\›eF\Ôú?+j/<ûoô[{aTŽÂª€\rÏ®I;\äòMr¸rOU¨N*=³\Êt…&‚\â+›Ë#(ñ\Ûxx!\ãŒ\ÈÚˆ:}†øâ¾‡gbX©#j\Þ\ÊÀœ3w«„U@\0~0yžYˆ\ãX\Ô½)B±JR€\Íb” ¥()J5ŠR€Vk ¦)ŠY¦)Š¦)ŠJb˜ ¦+8 1Jb³Š¦+8 1Jb³Š¦)ŠVŽ6Ù”µq6v\Í\ÌkR1LP\rŒc\0NÕ²YÀ„£oj“Š\Î(\r@\0`qY¬â±ŠJb˜ ¦+8 Š\Î+ ¦)ŠJb˜ ¬â±ŠY¦)Šÿ\Ù'),('Missing Blue Backpack',NULL);
/*!40000 ALTER TABLE post_image ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS profile;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  Mobile_no varchar(20) NOT NULL,
  Bio longtext,
  Image blob,
  PRIMARY KEY (Mobile_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES profile WRITE;
/*!40000 ALTER TABLE profile DISABLE KEYS */;
INSERT INTO profile VALUES ('111-000-1111','I frequently lose things on campus',NULL),('111-222-3333','Active finder of lost items',NULL),('222-000-2222','Psychology student',NULL),('333-000-3333','Engineering student',NULL),('444-555-6666','Campus security worker',NULL),('777-888-9999','Computer science student',NULL);
/*!40000 ALTER TABLE profile ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `searches`
--

DROP TABLE IF EXISTS searches;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE searches (
  Owner_ID_number int NOT NULL,
  Title varchar(255) NOT NULL,
  PRIMARY KEY (Owner_ID_number,Title),
  KEY FK_searches_Title_idx (Title),
  CONSTRAINT FK_searches_Owner_ID_number FOREIGN KEY (Owner_ID_number) REFERENCES `owner` (Owner_ID_number) ON DELETE CASCADE,
  CONSTRAINT FK_searches_Title FOREIGN KEY (Title) REFERENCES post (Title) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `searches`
--

LOCK TABLES searches WRITE;
/*!40000 ALTER TABLE searches DISABLE KEYS */;
INSERT INTO searches VALUES (203,'Lost AirPods in Student Center'),(201,'Lost iPhone in Library'),(202,'Missing Blue Backpack');
/*!40000 ALTER TABLE searches ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specification_color`
--

DROP TABLE IF EXISTS specification_color;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE specification_color (
  Color_id int NOT NULL AUTO_INCREMENT,
  Color varchar(50) NOT NULL,
  PRIMARY KEY (Color_id)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specification_color`
--

LOCK TABLES specification_color WRITE;
/*!40000 ALTER TABLE specification_color DISABLE KEYS */;
INSERT INTO specification_color VALUES (1,'Black'),(2,'Blue'),(3,'White'),(4,'Silver'),(5,'Red');
/*!40000 ALTER TABLE specification_color ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specifications`
--

DROP TABLE IF EXISTS specifications;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE specifications (
  Specify_id int NOT NULL AUTO_INCREMENT,
  Conditions varchar(100) DEFAULT NULL,
  Size_Type varchar(100) DEFAULT NULL,
  Category_Name varchar(100) DEFAULT NULL,
  PRIMARY KEY (Specify_id)
) ENGINE=InnoDB AUTO_INCREMENT=504 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specifications`
--

LOCK TABLES specifications WRITE;
/*!40000 ALTER TABLE specifications DISABLE KEYS */;
INSERT INTO specifications VALUES (501,'Good','Small','Electronic'),(502,'Worn','Medium','Accessory'),(503,'New','Small','Electronic');
/*!40000 ALTER TABLE specifications ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-15 17:16:57
