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
INSERT INTO post_image VALUES ('Lost AirPods in Student Center',NULL),('Lost iPhone in Library',NULL),('Lost my wallet',_binary '�\��\�\0JFIF\0\0\0\0\0\0�\�\0C\0															\r\r%\Z%))%756\Z*2>-)0;!�\�\0C	,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,��\0,,\"\0�\�\0\0\0\0\0\0\0\0\0\0\0\0\0�\�\0C\0\0\0!1A\"Qaq��2B�#Rb�3��\�$Cr�\��4S%cs����\�\0\Z\0\0\0\0\0\0\0\0\0\0\0\0�\�\0-\0\0\0\0\0\0\0!1A\"Q2aq�#B���\���\�\0\0\0?\0�\�֟ZR�}i��(֟ZR�}i��(֟ZR�}i��(֟ZR�}i��(֟ZR�}i��(֟ZR�}i��(֟ZR�}i��(֟ZR�}i��(֟ZR�}i��(֟ZR�R�\�zJoYހ\�)�7���ހR�\�zJoM\�)�7���ހR�U\�z�J\�\����Y���\�#\�\�x\0gm\�	F.OE�*�/��[�i<xQT�<�\Z5�\�a�z��\�\�\�5�\�h承\�\�\�~�\\M>�\��ܰu�)] )M\�\0�7���ޛ\�\nVw�o@)M\�\0�7���ޛ\�\nSz\��)JP\nR���\0�)@)JP\nR���\0�*=\�ݭ��\�\�Ԃ;{x\�IX���<\n�\� |A\�-z\r�\�J���\� \r4ޟ!\��|\�\�qs$\�C���{pu�#\�����\0\�[\�_\\���/W�R�&c\�\�1Ȇr\�y\'�\0�\�˸�\�\�<�I�\�zK/�G�y̓$E\�9Ñ�,2�\�+�\�S��\�\���\��$\�\\\�\�-��t�@VM�Dq�SUB\���ǦՂ\�\�\�;�\��\�Tf�${\���n�u{`L�\�sg�f\�,��\'�\�\����Q�Oes\r\�[e�`t�G^A� W\�UP\� 00��\�E��V�\�\�5��+6�\�}.r˩y�\�j\�\�\�g�\�\�.k\�t�|Ϧ�}ԭ���\��VEA<\0Eq����\�\�<W�\�{��\\��\��㷗�w{�o�\�h�Ժ<[��\��.JV3Y��E)JJR�R���()JJR�R���()JJR�R���()L\�\Z�*�f*���3�ܒM|�\��\'\���\�ՙz%���PG\�s.F������\��~[\�\��w�HDJt�k�\'\��\0����ݎk-\�ⷅQ@X\�]�q�ܚ\�d�\�=��j�g߂5\�X`\n�Q�*���*�W,py\�	\�jרM�}D/q�rqT\� g�O}��3ީq�_)\�\n\�%v\�[v?��H\��\�\�֠^���={\�E���9�ğ���\�\�G~>�ø\'	Ɨ��\Zx(ZI\":%`�H;�97z��»$�k��qL��;\��\0��Q\�9\�����\�\�:����u\��,\�]H\���[�`�*�\�q\�\����\0J�:\�q��Ɏ97\�φc\0���\�V\�֏6�\0�Uo+�}\�ҳ_\�\�^�\�G\rў\�p\�]�8\�rs\�v�kҾ;跂%�G\�ҹҦr\Z\�\�8:d���V�ؤxw\�-��e���I��F\��\�:0e`{��V\�a�R���()JJR�R���()JJR�R���(y?�>#n���\�V�\\!^m�9R�\�\�\�{n�\�\�:O��l<��v�g\r<\�l�\�r\�\�}\�mR\�\�\�n�~\�%\�\�x�3p��;\00ʪ�x\���M\�=�\�zm���uy�s�Y\�\��k�\�\�4a\�;�1�\�\'<\�v&�n�<C�bc\�@$��\�l�\����Qsۜv\�2�\��\��޺\�\�X�{\���@\�\�\�oj��|Vq\�j\�$\�7\���\�zcq�׌\���0N0�\�۵\'O�>��w\�s[0\�O?O�5#~99�۽t�\'|.�ǃ\\\�n=��m@e_d\�Ҥ$\��J\��\�zO� \�ڡb�F��$R�ن�\�W\���++08�H���]C�t�2t�\�c\r!g��\����\�\�\�>�\�z_��l���A�<���\�S\�p3��>p>Y��\�(\�R\��Y;j]�\�\"���&�U]\�\�������B{+�.\"8�\�\���8\��I��F.l\�7=:\�XeXdh� �\�ls^�\�㮫i,c�B�V͖�\�\Z\�k\�!\�\n\�����\�S\��.�e�\�(�m*O\��\'�\�\�X]G6YRT\��\�\�S\�\�\��qxb��\nR���\0�)@)JP\nR���\0��v\�6\�w2෌\�+�l\0��=뱯��s\�z�\0W\�7=\Z\�U�\��\�P�\�Y&Ь\�\�W<g\0{q�\�i.Kj�V\�lQ\�\��\�\�n�on1���xq�6�8\�Ƨ?\�m\�\�]HFFǱ�\Z?ދ%1=��\�*0HEQ� ��T��R\�!��p\�\�ٞݴ��1�dc�>��\��Ց�Q\�ԋ��\�V��\�y\'US\�p\�N\�|\�\�9�j�[[�V�D�T�%�]���ǿc\�j,񬄴�3&�\�#i\�\�؏��\�\�\�T�\\��}x\�\�0Nx\�tt<nO~\�\�2��\0�I�\ZђI\�\'?^kS�X��q�\�lFs��6�\�z��p����x8\�s�\0g���Φ:q��c\�\�X\��=\�t�l�c\��폵hW:��[�\�ȧ��x�W2ŉ矽p铱\�~�V�\�+$c\�>�\�d/\�\�@jI?\��f��Y�\�0�;�Ͻr$�~��\0r+e�\�\n�Y��U^I�ŏ8\�=�\���\�\�\�\�Fg�\�.�-׊ʮ-�Ci��*\�q�&�d����͌�X�,\�\�K)Uyu�!�;k\�\���@5u5ď4�UliE\'J�9\�>滘��x�\�P�ڠ:�(݊���f;�\�}�\�$��n�\�$$#A�j�2\�юF9;\�j�jK�Ҕ�I{|Ar�N�	$�\�Zcx�\�]j�W.;\�{>���u���F�ј�ŗ�ir�d�yOȌ��x\0Co-�f\���\�o��<@ޠ�\�|�\0]\�R�e�ө\\�}�����֣\�av�\���O<g�\���Py�\�\��\�e5�ζ�\�b�r���QI?�_�{\�\����\�}v~�c:\�\"�Q\��~\�}�p��\�ȣ��\�;Ej���>{W��=\�yG��)V�p�)@)J\��R���\0�*��u�N�\�羟\�1\�ß4�:P{w\'��\�\�.O��\�\�o�5�\�Y6z�\�b=8?�D\�O�G�}{`�N�ҙ\".|I	y�Y���\�\�ޫz]�\�\\\�3un�\�F�C+�nʃ�G\0v\�B��\0ۊ͝\�\'�-46G\�}�&��P�\�NCs�\��j��t��(����rr\�\�\'n�\�\�ٕ�#Irp\�l��\�B�q�T�<�d\�jy�l�}>th�����\�Ε����H�gH��=�\�֣��\��\�\�fE�!ƥ\0\�<�zK\�Ĳap\��^�p8�\'ӾqU2\�?x\�\0��\'J�m��OҠ\��f�\�\���\��\0����\�\�\�\�)�\'\�2�\�y[~y\��\�E\�@�Cت���\�qګ%��P\�\0RE8VL�g,;\�>���\\u;\\	���jL�s�\�\rGj}�,��\01g�\�6@�=�pGpk\\�\�88\�\�\\\�\�v�eI\���Eb1�x���HE�F>ʫ�8`\��R\�F3�ޢ\�\�f�]	�\��粟�ڷ\��v#�\�p��\0\�ڣ,�9P5`\��C̵\�Q�C\�\�;^�\��ѻ�m�\��\�rs�h�\�\��6�\�P\Z�\�\�z���c�䍀ơ�\�\�C�9�/�\�\�G��}�\�\n\�e\����\�v\�Zћ�}21C�\�\�<s�\0;g&�1\�`�\�\�[3�էc��\�|V�\��\�\�G\�I!w>V1�E}O\��\04\r\�d\�cj\�RfB\�\�a�ϗW��\0ܓ�\0�\��\\�\�/�>\���I\�s¤�� �H��\��L�ݶ�Ԯg֝+�\�\'\�\�\�;v�F\�ۤ\�@�S�\0\�\�\r1\�\�\'s2\�\�|2!��$��M\�I%K{�kȡ��ܓ��\�|!\�OU���\�\�୬[&�T<R�2#(\�\�?S\�\�\�K&�MQ�b\��\�\�\�~+3^\�O�#��\�P��]\�H\�5m��f�k�\�;�j��R\�0��TL�NϷ\��L\�F��\�\�GK�\�\�\�2D�\�C%\�Ĉ\�J\0LQ\� ]�(Q��\�j=�i�\�R(U*�\04��\�\�\�Q�gi\�,�\"$�K�A\�\'�\r\�p���ʹΝn�D�d\�[��\��\0�.峀�8\�)�J4\�\�R��\�;;YL�*\�ܙKk\�R+v�WY��m���5\�E���\�\�O��e&h��k��d�\0>w,s\���+��\���k�\�1Ȋ�#An�\�\�ce\�c=�$�1�m��Y��e/T�yɛ-�\r�63\�6F���v�ְ\��\0P�u4\�\�iJ\�j>x\�)JJVhR���a�T$\0��p\0�I�9\�=��3\�\\H�Am,�9¢(\�&�9\�z�\�\��et�N�h\�\"nR#�\�ÍO�[}����\�\��ܯC鲫\�E\"�#`V\�\�; a���H\�\�\����ib\�ұ �\��I8?\�\�s͹=�gGR���}�-b��(�@\0\��\�u�\�)fld(\�\�Ȋ��\�7\�9\�U\�:�@�ӶX\�\��^s\�\�]O{\�+\�\�\�ڼ�2v`0I�A8�\�>m�K5\�Ϧ0ZER\�B�)\�cV8a��c|\�\�2W�^��1�*\�s��*=v\��Q�Fu>\�FN��\�)\��\\,O\��\�&\�\�\"ƔY�$�k�<\�\�EY�p7\�\'�\n7\�pЄvHյ��\�G�\�V4\�;.21�3&\�\�#F�\n$	�1�\0)*H�9�q\�v��}H\�D�iPQ�\�\�\'}�}\�l�(,d�β�o�c\�,s�\�\'�Q\�\0��\�T�_o�]�>ٮ�\�7ٛ\��~u\�o\�\�u\0\0א	\�A���p�w\�_5�R�\�Q�6x\n���\�\0����d����\�\�\�R f�`� 6	,�/�\0$\�\�\��bHBD�ۑ\Z\��\�ъ�s�\'�q%&�\�\�\\\�_\�4=R)B\�s��\�oo2e0\0\���\��NX\����(\�\�r\�\01T\�B��\�\�~ت�#��2�S�~`3��i�|\�)I�:�\�J�T;nHs��*{T�Y]m�\���\���v\n\�\�$!X2 d�I\�\�gn9\�9jUR_%\�=\�\��~�\�a�\�Ll��\�Uуj�\�l.F�\\\�T�ַe\Z)UA11�WV�O8�	�\�\�F��\'6}���օ�����JN\r8\�0r7:FH\�;V��2��\0�v���ɣ�Q\�q\"ƃ\�s\�#a���\�\�EaO\r�\0\�tS��\��c$�\�_~|EBu� H\�\�J��\"\�\�1\�[���\"�\�\�[��fuXЅ�(TSd�?e�\'5dV91\�k��$���\�J\�}\'�\\��Emt�\�畖X\�6�\�\�\rZ��\�~3\�^uY\����\r����-\n�[c\�m��P��\n�*��N�\�\�=�3�O��]�%s �H\�\�ѝ9�\�[q\�<۾�\��A�Z�=c\�\�[ޱ\�B��g\�:�y}z\�8\�E!ʮC1\�m��+�\�\�෎BC�i��\�\�\�N�\�ɒ\�Q\�\rt0Co�Ě\�#5\�,u\�l��?�\�\�ǿ媕y.n$��\Z���U¢�\��,n2WCS�S�N\���\�I#�c\�N1�^\�\�\�YKzdǦ�\�24�\�\�\�y9\"��\�;n*��YK�t��\�B-�+a\�&,�>���}�rT{6\�v\�;A\�-5�*n��<\�6wl�\�s��کK/\'�d�#�%T�\�\��C�\�)\"B\�[G#d q�\n3�9?ѯ_��Ɩ�\�\�רK�\�E�S6�䷇R�\�#�;c#�\�\�P\�`�i�+�S��\�٤��Aq0��^ d{c8޽}�ŧQ\�|9j�O�Y\�qӦ\n��ʵr\�fR5)�`L@#.J\��x\Z�\�^�\���}~)b�(��\�He�%�\�\�]VR;[\�^�gO����0�\�\�h�L45_Z�VR���()J_7�\�> �A�\�Z�\��9:�F\�\0F-�9<3���⮿@\�27\�\Z���\��&7����\����.�\�溟��\�N\�\�\�j�\�䑉%\�>\�5M���zz\Z�t�_\�tޅw	m\�/���,��v4�`9՞\�j��kgD/uҧY��l\�D�9W|�>M����Q\"�*��@\0z\n\�\�k�\��G���*�s\�ޠ�\rR�M��<g�\�0u� \��6\�O�q\�(���\\WK��G�\�\�RY��\�Y�<�#n\�׵WI\�n�e\��\0#I\�Io9cE�G�#.8��W5��`e�\�\�\�\�I�E�K\�\�>\�z\�8�dF��\�\�un�\"�+�c\'3\�\�\r�%�`sU�I��24���FUV!\�\�UG\'8\�\�\�q1\�,�L�\�c��\�	�ar\�6�\��pk\�]�Ld�Q�F\�\�\�&g\�tw-�\r����]r\�Ċ\�.��:@\�:8=�~�\�B\�\�\�p9\�\�f`c:r�!��.\��\�ڑ��I\��foeVѤ�\��\"~Uy=,��0[H\�98.|\�Npv����\��2�?\�z\\H\�0I1\�9\�~��!KB�\�,BC�\�\\c|�񮥒�ٵ6v\\\� ��X�	)\�4\�鉢\�#���{\�_�b�x�K6�vU\nHH՘�ϗ�ջ�m.4�Bw�\�l\�I¨�\�\�΢d�����\�ɧ�UEq��\�S�\��`P�\��3y\\�i�\���>٬x�F�TH�:d\r��+�y�藖�>�Ԥ6v�(�m��yq\Z\�\�\�.�\�\'\�U�=��G\��Aq��},�FO�6K�\�Q�nNF\�\�R<&Tː#�\�{�\0>بrZ\�n\\��� | 1�|�\�\�4�#l\�G�m\�[�Kې{�s�\�U�p\�[���\��\�\�u#.��\�t\�;U���\���U\�\�+Tb5\�h�T1\�{\r�ʢI�����\r\��\08q��rM\r�� �hn��4$�V�ȋ�!���!:�Rr\'�\�\�\�\�}ܢOU�H,-\�Y\"�\�[�c\�[��!\�m\�Q\�n2=E�4\r�gc\�\�]\�,t\�ߌ\"�gp$6? k2\�\ZE\\�`6\'�P�\Zt\�\�\��m�b��_|�S���\��Ѩq\"k�\"�\��$�X�\��6�)%Ă8�-�\�\�US%\��N�\�\�\�-\�^�fK~�6��`yʧ���k��\�Y��ӎ#�>�]Nvy�\�2�	\�{����]��O\��\��j\�ӭ\ZG\'*�y\�\�	LC�b�nB�\�\�w�ǿ\�s�z�X�YV\�(�\��	��ϒmH�\�;�\�G�*\�\�R{����(\��η7P�\'��\�\�Lv0L3$1�U�1���{��\�U].\�W�\0�`e����6�\�K+\"��bN\�\�\�\\&���u/\�Q�n\�G\Z��g<d\�\����o�:J\�?�ZE�Ł�\�\�Iu�nF�fgb\�F\�s���s\�EV]�.\��#�W�?��.�\�z���\�Yt\�;�q �\�\�$��J� \'��08��[\�g�5\��\�DT��+8\�\n<4H��\�g$\�}��v\�*��\�\��Ê���M}v-&eUfh<$d\�$�O�y~�t\�\�\�>��k\nɌ\�\�O$\�\��\�;�8�֜c�\��\�[>\�J\��\�Et�R���(G���������GomK+�\�;\�x:\�_(���\��?S��t\�\'�[HL�)�\�J�r?*��b�\�h\�\�\�<.\�5\�\�=nK\�\�\�\�/$1nDP#eP5X����IQH\��{`?J\�ikoӭ���=����7,\�\�5\�0\�r\��#ϳd\�\�\0��q\�\�Jkc\�Gr�lv���2p\0$r~�\�&b�\�pc$\�\'<�.�eNI\�r��\�\��,�+�X4g�*p��#�l\�7\�\����O b-�\�\�p���\�Ó�|f�\�\�\�d1��\n	�H��Lw޾\�F��,\�:D�Ӭ\��}A\�\�\�\\,�J+�I-\�Y\��b�q��^YHo/���nbH\�D\�F�RU�\�2\�n\�MK\�\�yߑ�\�\�op\�u\�@O%O�Ga��3��}\� Ċ��)xU�bd \�gby\�\�o.MQ{�$VHX�r�eYԓ\��8Փ�\0q�{m��\0\�P\�*\�?\�\�\�##o)\�;��㌷v\�\�8E�B\�\�&Y�`Cd@���\�G\�\�\�ж\Z(-\�t\�x��.�[A򑑌\�\�\�-r�y\�E\�ƺ�~\0�\0O;1\��+�\�\�m>_	\��\�P?RO\��/C9�\� VV�����a6ܑ�\�~O[�@�Dl�Nnf/�P��۶n岻`IGS�I\�취~\�\�\�W�\�\����\�(L	qh�;\�%ͳ\�	�ȕK�l\�caos\"LÜ\"�����2p=@>޹���e�@@}#,�jF\��\��*2X�K)��F\�\�G��\�:�\�a��E{X!�b\�|��\�x�5\�!�k����If�\"�F[�\0�R�J\�(�\�D�tb��\�Y���`F�\�ucm�U\��I���\�cB7�)��9?g,�2D�8C��+G��\�z+��\�\'�\�K~�\�:����*\�\�m\��T��I#\�U�\�\r�6\�S,ufgf.\�\�K31\�f\'rI\�\�\�ֱ\�\�\�(���v�y�~��C`8ԡ\n��@\�V�\�)��\�s�\�%�uC<1\�\�\�mD\��\� r;c�\\���c\�b2�\��Kz~��tխt\�\�\��o\�d\��+�׬a�ǹ5b�xfWK���\0�5m��)�\�qs�q/綰NG��_v�K4\�s1��B\�R(\��\�\r)\Z��\0��2\�:�\�p��Mw\�rٚS\Z\�@\�8*�$`rĞ6�gl\�\�D`;\�\�\�\�Aҹ>�Y��Q\�<źV�Y\�k\�\�܄�(\�\�96�6\n#�%Rɨ\�oP��\�^�p�ED�b�t\�{ ff:\�q�X���\�2c��n�<j\'���B4\�2l��m\�\�׽?N��&k��\�K\"\�y8i&f�I��B��\�\�9o�/\��.:J�\�{[\�ZK�<tvT͠b�:�dd��\�\�\r}�\��\���b.c��!F��H�F5;\�I�/�M66�{s%\�\�Wx�E\rl4�:!�Xb���1�zp���\�d�5w��\�\�7�K\'M\�i\��)H�\0:��\�\�^�\�҉곆\�$i�J\�$pe\�z\�\�w��e\�~_^�?�\0\��\�,A\��e��8\��\�I�f]M\r�\�q\\Gom���]*3JR�P�W���\�H�\�\�*\�F\�:YFp@ y�q�+���\�x哄\�\�A�\�\�\�F\�\�!7w %���\�M������z����J��\�\�M̠<̣}�A�«>\Z\��\�n�Ե=\�\�\�DfmR&�\�>{�s��C4��FI&=�\Z�\�<|�;{�Y\�\�P����\��cV\�=\�l\�$ d�\\z\�\\�\�<�3�\� g�I�ѐX�o�R3��\�p\�\r\\�\�Ʀ +.�o،d��~���8D\0�:��\��#Q\0c�~U�7��\�R�\�)a�W�\�9�\nV\�$n�,�TW\��n3\�\�\�M#7R\�\�HؒY�>eΟ�~MB�C�/����4��QI\�v�\�\�;�.\�\\ ,N�#HǞ\�=\�	u�:���d$i:F\n��:�\��k�я�>�\�\n�T�0:v\�x\�$g\�XT\�\�Ҩ\�\�2�\�I\�#\�A�S�\�\":Xdm���5\08�\�\r�\��P��� x�gA�sn乑\�q�E\�\�\�|\���\"ƳD���a�0��\\�ǔ��Ը\Z\�%�\�\�\�XgA\�*�\�z�`�m���?�k$_(.\�tf\�1��\�rB����a\�KUX,�\��Im\'͞0�5ny9\�Z\�mi\�,�,\�cC��s1c��-\ZJ�]\�\�\�J\�&?g�3�;^O)\�T\�\�M�*��\n�\\\��`\�,zb$\"�5����\���N\0\��\0$?3���,�dR\�\�\Z\� � ��\0�vYH�{f�G���G�I�m	�\�Wʻ�,�+a���s\\!�Y!e�u�p\��6Tz��os���肇�@W��\�5\�dI\�X�q�q��\�-��\n��yDS@\�;�	�uB\0֧P2G��eK�Q*��﫟�i����K\Z����P#\nH�>�\��*\�G$Ur\\\�hpCd�t����\�u�����\�G�F\��~}j��Q�O��^\��\��\0F�y?�f���;<2���3�\���W~G\�O�ӿ޶.�;�3�ڥ�r��WL�Go\�\�\�!:����;￧\�ں�	\�\�[�\'R�%��7\��U$\�p{\�u\�J0�\�Tr\�BX\�c�t��a��\�ܡn7�VP�\�\�\�a�WiM�Ȋ�ȅ]$\0�/8 \��G�|�Ϛu���\�B\�XmƈbƐ��a��\�A\�:\\7S�H�\�ۨ�u�6hn\�N\n8�ʲ\�\��c�@���D\�5�\�\�EE�\�φ{g\��:\�\�\�l͘\"	\�܅,\��%�@bH\0\�\�l#��o�UG�\��]��\�s69�\�I\�5*c\�ZO)�\�\�.��\�؛M\r=�\�\\$n�D�©\0��0+�E\��\�\�\�~�	�&*\�\��LT��m\�\�51�\�#��ڻ/��\�+�E)X$\0I \0	$\�\0��\"��g\�,\�o\�\�\�ol�܁�c¢\�\�\0z�5�\�|Q\�&\�=G\�$D����\0w\0\�a�I\�w\�S~ \�\�|S\�ō��:7Ovv�H\�4�Xx\�w�>y�\�n�\�L\�\�>�dV3\Z��\�$v�?2>Y\�,�\�\�i\�q\��?��E,�\0\n�Q���\�\�j�b\�8\Zʁ�ǧ$�櫣\�TBjec�E\�	\��\0\�\�Jʍ_�.w�\�\�\'o���/U��j\�\r�$C�t�`�\�V႕\\�%�d\r\�\�8\���\��+�u�8\�\�\'�\�ڡ\�rH*�}�r\�\0��\��\�\�N�R�c\�<�\�v��s��\0\�\�@�2����\0��G�\'��6+@\�\0hf�\0P[;\����=Ĳ\�\�@\�\�I,A\�H�\�\�\\%�Mq�q�iU\��9r�W|{�ۿ\�,j�]��u6Cy���\0=�\�\�\n�_�̚u�.U\��\�u|�\�ocGS��\�T+�>o]�߿�\�,�GdA\Z���>��X�Rv\�2G�9�\�8>63�B\�\�.N���>����&?�r#nI_�\n\�\�\�\�xo}Ϯ\�\�K!1�\�K�ʪ�\�J\�\���\�\�\'=L\�B����6�ʗ$\�\�\Z�q�����\n��\�wٝua�\�e<B[Z��*�\�V4\�J\�C\0�6��c�\�B,�\�L���s����#88\�~���`�ر�bm�W�\��d\Z�\�\0��4����]y!��\�,�\�*\��\�\� \�\\~p���\���d�FW\�T>R\�\0\�<S,\���~���?�\�u9� H�\�j�� \�0\�\��m\�&̔\�\�Xdy��\�%@\ZY\�L\ng-�B�\�`��l�@pт�\�0�\�dd9�\�p\0�\'�KΨ�\�\�B�K�3\�\��d\�\�wד�qU�8��l�9A\�2I\�d��}�l�!�$W!�M1�����o\���E��ȑ�aW��B?~�_\r^=\�\�3�\�\��,\�\�\\]r\'�Ƞ��\�3�A\�\�\�ح�\�\��#��i��F�n�w�\�\�\�>D\\l�\�V\�\'\�\�\�i���䢊�\�w�,��	��\�8\r��}��\Z\�\�·\�LmǶ����jc�\�9�&�h�\�Ns��ӽY(\�F->��9k(�!��l\�[�9\��F\�\�j��&8�\�A�y\�=�Y\�\Z��\�\���3�\�\�4�q=\�uuܸ|�m\�\��}��\�YZ�&\�c�\�pt\�q��6��\�H9ۜ����\n���#�=(�Y�N��Hn�Do�jK�@�1\�.|ip�`N}���Q�%�Fa-ԅyN�Q\�c�\�zm�YY\�[ɭ��\�\�#��\��P>\�\�V��FX���g��+Ҫ�J��\�d���N[#\�9\���E\�XD�h��<\�\�\�LT���uQ\\\"ll()@+\�|{\�.m,�N�֭z���C\r�;\�\�\��\�ּG\�\���i\�K�a{f�<0�+O\�y4�e\�n��\�FY\�\�8��\�\�l:gG�����gvcq-�C\�;�D�\�\�\�\�o^b5�J\�V\��*\�@ی�\0^Ş\�\�Do啦�d�\��\Z�*F���r?���\�\��z<�f7s��\�=\����\�\�`͸\�m�\n\�\�ϡ�\�\�~H%͹cy3�s�\�o\\՝�[H+wa\�=��s��[��$\�ҧ�))�щE �q�8\�\�\�5[\\�	6�:2�ԧԙR=\���g�N7E�\�u\���z\n\�%&�\�G�˃�$d�\�=+\�4S\�N�\�6ԬI;\r���\�u\�3�<gbI\�ϙ�䜨Ɲ�{�\0��|�Y\�q�\n���@v>]Gm�=\�>�\�\�-�\r�P����2\�w#\�*\�\� �\'$���\0:�*+���v\�o\��d��-�,��\�I\��}�x\"\r`��y\0-�R��\�\0*%�]�\�v\�i.�\Zr@!��\'d�Ha��\��浉�3\� UV\�q��#c�{{�ZH�ΒY,d��m%^L\�8\�\�\�_<#\�*\�\�\�6ҙ\0\��\�\�\�agl3�b�X�H<�\��(w�Q�Q�\�\��J�2�Ǯ��|U�\\���,�,5��yp1\�s�a\�(%���æ$�+	䮲���ܜ��y\�(-���F	:��J\���#�ö�N��m%Y\n\�eAR��H�q\�\�3\"�*h�c9b�R\�n����i��q\�(Ζ\�(C�\0�.B4($ǘcs\��?J�73x��G��q�K�>��K��c\'�\�m �y�\��j�5\�\�|j\r�s\���ɮ�\�N�\��\�@%��\�@;�F}*2+K,q %\�#P|\�t��k�\�a�I����a�8��>\�\�d\r��j�p�Jd9c\�\�$\�k�d�RQ�Ijb��\�\�\0�+��*��6�I�\"��yH*\�(cڼĲO}q5\��ra#P� \�0z\n�\�n\�\�d��E�(_T�\�\�rTF̀m�@	�\��ɴ�>\��#K`\�,}�m\�jޖ\�Ez�̺ \�q�\�\�[Kd�;��\��Ն�<d\�۞\�\�C�{��b\�\�	f*���F��6\�g�=j���o��\"\��!\�ҐE��\�+$�����\��\'Yi}=�\�\�C��tȹF�\�ޭ���\�\�\��\"\�K\�N\��KQ�����\�*VFmg8��!\�X&@\�P�\�Z��\�>vUN\� �z��y��ڝN��\�g�|01\�ls�\\m\�\�	�\�x���Py��`A\���|�\�\�祬�N�6��+VBU\�~94��A�\��5\��7]K�a!�SpӂH��\�PK6\�\�r9�m�ct��+xg�\�W�B�:��\�==*��\�?Q��\r�?\�\'o\��>��Q��K�V�I�)�6[�\�׸\��9z}����L�\r�\�\���B;��Sj\�Յ\�,Q*\"�E*��vEⰫ��\ZqZ��f�JE\�i\Z\�\"�6Q[��\�p\�)@(iJ\��K�7O\�\r5홊ۨ�bP\�M�כW\�xc�@}\�\�W]��\�ckSI�\�\�\�B���J�s\�\�_�\�%�\0N\��N\�\��`Yc9+�����7`}��8�\Zj�\�\n\\�\�6�\�	<E�KgrHI\�\�b=��+f\�x��W/$�\�H+9\�v\�6\�y\�\Z��w\�%�=��%�EQy\0��gܮ�\0\�y��{e\���1r\�G��$ʶ폐#ҩ�O^�F\�\�7֮\�CJ�\�=Y\�\�߷��LQL ��lwA��fKy�!����������\�L\\C���\�āJ��N�\�\�do��U�6&�\�YK�<o�p~�\�\����\0\n3�_oz�%t2k�\�C\�QW\�v\�?�lc�A��q��=\�;\�\�|3�_�\�-�\��q�v\�|\��5���g�̊\�IleX*�\�}�\\%�\�u\�p���\�j��I.��\� i8\�6\�f��uEx-㙔DҲ�H\�&w9s��1�\�N�T\�&Q_H\'�3\0\�=\�onƨΣ���\�ߒx�qM�|j\�d\�\�g����\�]\�ͤ\�\\	U�&FyG95\�e�g\�0��4��$����\�9$\�\�.\�9r\�a��\�m�\0_Z\�$�B\0r\�\�oq�\'\���TrM,�f\�]r˱Ʀٻ�}�\�\���\�\\~8UP�/l\�\���\�?�p@A\�\��-��>p	\�O϶k��H$\�\�~Ilf�]�\�!\�\�I�=AAc�!H\����N\�; �]mh\�K7\�\�\0ߜ\�ݝ� \�mQ�-L�B�y�\� \Z൅ϊ�;\�*cr\���Y[u��\�:\�\�K���X[�� iu\"0�ES��[<\�\�\�,�5ڍ��\��\0�\�o�\�mwԭ��sķr\�eQ���G\�gd`�\�冂QD\�21\'\';�;����1\�\�\�/\�`c�巄�Ͼj��\�K:��\�\�+K�[\�W\Z��̐�[�2���\�\�\�`�Y$\�}\�\�s8�%f�G\n�\�nN2y?:�}4vj���H\�\�T�.\�y\�:N�G���\0�u�������w7Q�d�?�\�$�s��7�C\�\�I�.���\�B��y=\�ԓUAan=\rM��\�Q\�v\"�\\\�\�\"�ؒ\�mUce0\�!��\�\�-\���TP$�e��:�5d\�\�D��,�M\";\�#�T��\�\�H�1s��\�1\�\�w\��Mk�2��c?Pk|��\n��FN�@��\��\0��&䫉[\�\'=^\�8�UV\�\���6M	�,=�\���Ơ\�esc%��u<2\��Gl\�\�\�X\�x^1�\0{$\�jO9.ё\���@9m��\���q|\'����/�b��R\�,�K�V�F\��\Z�\�\�\�Z!�\�\�$���σmZ�%곧���\�\�<�\'\�`=�\�^\�F{W;h ��( �8��BEJGeQR\�8�\�FY\�+d̢\�*R.1XD�Q\�\�]*��\�\0+ \00)\\8)JP\nR���\0�)@1^{��;\����Y\��.��\0\�[YX�<E#Kc\�}Ez\Z�\���\�1�Q��\�g\���\�W�=\�\�,\�\Z�E݆��G�М��\0���As<!M\�\�@|�6ڕ\�#tS��\r}^\�WBy\�\�^[�\�\�\\�ɧ���$ \0\��\�`\�\�n�ҫQ\�_�\�\�\�\Z���\�\��\0��	?/���η�i����h=K3\�e�\�28\�oz\�\�]�Fh�i\�\�\��ӏ�޸�\�qn�\�\�\�p��\'#\�|\��Ѝ\��\��%\��\�\�\"W\\d�\�\0\��?*̐��\�s��f;�\�s2\\C\"\�7\�2G�\0\�s�V�\�	�I:����);\��\�TйY�$im#�9_^֢G]�9\�`���Y�.�Y�����d��E<�dc\0\�H�DԾJ�K\�X��@\\r{\�i+x�Jr�\�3��\��ێ\�j\�%��\��R7\�\�\�k\�\Zȅ��:�c6ݽ*8$�\� e�S[�6\\d I\�c\0z͍��\�\�$~�\�I+��T\ZYY�0�\�mn�\�m\'#%F2\��\0\�z��\�\"I\�V77\��Lc�U�\�E��\��Dl~,�\\���G>H}r�]�\�\��D *����\�\�a�\�\�\���\���ˤi?��\�[\�\�!�Y�{4,\�\�\'���\r�.FA\�\�o���\�N\�WLڥ\�\���>���\�3\�n���1�H\�P��+��\�\�C��M�8�\�q\�̩�\�ļ�}N!�җ����\rŴ�,�x2$�uoP@�\03o\�n僤_\��[\�sku\�&1�k�S�62T�3l;O!\�=\�C�J\�!G#dc���[\�\�-�+E h\�:-2�|k\��\�;)\�	���1�&�\���ZHi�\�y~]\�f�\�x�?�\�\r\�c��\�N\�\�o\�[t�I\'�G\�h��2Hv\�\0\�\�\\\�rj$4��9y\\*\�\�S3c\�\�z�6VAa�<�d���\�*����\r�S��tRǀ\�	<�#M58Gs\�5\�=6\�n��#i�\�ȯ�Oq&Q\�\�wH�X\Z���Y�&�~\�u\'㑴�\�jV8\�m�|v4���\0j޴�\�\�\�ФT��q��z\0=7��+�\�w;C\"�q�V�f�\r�9�ƌ�MCpvm\�o�18\�<\��Eo�\����o�\�\�$�H���\�	�Y@1��S#-\�\�{g\n+\�\�*<H�TUUT`\0M�\rjK�)9<��k\�\�.4\�j\�(ɩ�D{Ё�q���)J\��JR�R���()JJR�W)aIA+�(\n;Ε���\��K�KyO~+\�u\�[he2�\�MKȮ,gB\�\�UېII�m���^t8\���W��\�N���\�|Q�\�\�kO�\��Z&�[\�G\�HV�\�e?�ְ..a\n.\�\�)��\0\�P��cR�+\�\�t�8c����	�m�\�9�\"�p6B���\�\�#x�@\�UΠWNX\�,�n6\�tYeY\'�t\�2r@\�G�7m��ó\�L�%\0\���������\���<\��f0�|��\�*�to�ɯq29ap��\0\�\�\�m\�\���\�[	Nr�{�2I\��G�\�\���3FK�dȫcrK|��}�	/�K\�T�\�h]�2V\0\r�\�I�\�\�оQ!)0�eUHǌN\��4\�n+��\�;����*:\�>4��$�i	\Z�\�n���|$͆bҲ&���\0��\�\�T\�m2���$�{�\�\n\�q\�3j�­d���\�\�[ڷ��\�h?��gP\'`���Hg��P��\0�_\��Ĥ�y$�\n����\�%�\�$r�m# ؘ\�+�\r�ߏ_z���\�5��6��\�\�F�yN\�Veʣ�9\�\�4p~CY��-�\�j\Z\��ZO\�\�\'H�{[q��>np6\0rX\�^zyi�*� �DpFN|8�$\�w,{�j_P\�pj\�\�#\��h\�L��9fߜ\ricm$�`�F�b���F]�\��~F�ڶ�ׯc�]x,zu���\\D��\�<p�\�f3*,�d���\�\�֮]5t؝Z��O\�z���)�\�@�.0�\0�\rXO{kek-\�e^\��X����5+ˬ�r�̉�\0oPj��[\�I$�.\Z[\�$�\n��\�\�v\�1\�;\�\\rJ\�9{�\�J���aA�:\r2N\"���Dd����L�rG\��m�X\�\�\n�$´߼�Q\��^R[J��z��{��?�7�!��V�\�\�$n�N�\�\�.@%�ߖoA^�4\�+L#�\�\�Y��ј�\�j�$\�j[�[U�P�\�jfCD\�jR�pR���()JJR�R���()JJR�V�RA\�oJ�\��0%@ך��x�b#\����\"8\�\0E	)4|j����\�\�ڨ嶺�-�\�1�$\�O�}\�\�[N�}�\�_�:|\�P�q�\�\�s�G\�\�zX���w$��۹�A\�\�\�[��\�Wp�R�N	\�\��J�}��7\��6��}��{�}k��0\�+\rJG��p6ר\�\�\�\�J\�\�H�T�I �c\ZFw�b[c�3�\' l*\�jw��\0\�\0t\r�`Af\��\�i*$�)X\�X\�\�\�\�!e�򭙭\�*��&\�௟\�K�#}w�%�J��\�	@Hʹ��6##j�mc\�F\�v��b�VC&dBs\�#�.\�\�5\��\���@|o�6\�)$⡖�48BϹR ���\�\�,Y#H��$�\\\�u`d�\�\�F�H\�v�\'��)\�>�f�./\�Kco��W\Z\�Bt$q\�<Ř\�cl��\�o���HY�;Υ�\�AU--\�i�\�B\0�<˓Ȯ�\�*�Q�at���V�mc\�\�\n\�\�#P�Ԡ��}��\�t\�5\�w	�\Z-1\�p�	m#G��G�*\�\�ܖ\'�C\��[ZYIw\"\�\�2֖I��.\�jf�+��U�#�>%{ޓf��Ѭ�$�7\�2L\�2\�*\�����V�\�\'�u\�+�%��)\ZEk�8�H�rN\0U;խ��1V--\�\�\�sWQı�8��>L\�Q,c�]iJ\�JR�R���()JJR�R���\�()JJR�Vk��(`�<�~u�P�\�\�\�\�\0�AT\����+\�S�Rh�M�\0êuj�\�@\�yˮ�wn\�H\�:\�\�;W\�e��Q�Q��{΅��Q�k�d�8�|M<XBB��\'c��\0\�\�w��\�i(�FԌ �9h\��\�q�Gc��n��\�4A���#\�yk߆:�J\�\Z��g#��^\�\�UJ�V��G\�-\�=Ω��Q>W$a\�\0\�$�\�.�\0�^�\�,Q4��\��\0�o�?\�ĖoL�\���\�:P�\�\�\�mg�,A\�\\�eF\��?+j/<�o�[{aT�ª�\rϮI;\��Mr�rOU�N*=�\�t�&�\�+�ˏ#(�\�xx!\��\�ڈ:}��⾇gbX�#j\�\���3w��U@\0~0y�Y�\�X\��)B�JR�\�b���()J5�R�Vk��)�Y�)��)�Jb���+8�1Jb���+8�1Jb���)�V�6ٔ�q6v\�\�kR1LP\r�c\0NղY���oj��\�(\r@\0`qY�ⱊJb���+8��\�+��)�Jb���ⱊY�)��\�'),('Missing Blue Backpack',NULL);
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
