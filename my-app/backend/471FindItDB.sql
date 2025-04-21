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
) ENGINE=InnoDB AUTO_INCREMENT=306 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=406 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=807 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `specification_color`
--

DROP TABLE IF EXISTS specification_color;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE specification_color (
  Color_id int NOT NULL AUTO_INCREMENT,
  Color varchar(50) NOT NULL,
  PRIMARY KEY (Color_id)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  LostItem_ID int DEFAULT NULL,
  PRIMARY KEY (Specify_id),
  KEY FK_specify_LostItem_ID_idx (LostItem_ID),
  CONSTRAINT FK_specify_LostItem_ID FOREIGN KEY (LostItem_ID) REFERENCES lost_item (LostItem_ID)
) ENGINE=InnoDB AUTO_INCREMENT=506 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-21 15:45:12
