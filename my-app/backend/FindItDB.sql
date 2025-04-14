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
  PRIMARY KEY (Title),
  UNIQUE KEY Post_ID_UNIQUE (Post_ID),
  KEY `FK_post_Admin_ID_number _idx` (Admin_ID_number),
  CONSTRAINT `FK_post_Admin_ID_number ` FOREIGN KEY (Admin_ID_number) REFERENCES `admin` (Admin_ID_number)
) ENGINE=InnoDB AUTO_INCREMENT=804 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES post WRITE;
/*!40000 ALTER TABLE post DISABLE KEYS */;
INSERT INTO post VALUES ('Lost AirPods in Student Center',803,'I lost my AirPods Pro in the student center yesterday. Please help!',3),('Lost iPhone in Library',801,'I lost my iPhone 13 in the library on Feb 15th. It has a black case with my ID inside.',1),('Missing Blue Backpack',802,'Has anyone found a blue Jansport backpack in the cafeteria? It has my psychology textbooks.',2);
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
INSERT INTO post_date VALUES ('Lost AirPods in Student Center',2025,25,2),('Lost iPhone in Library',2025,15,2),('Missing Blue Backpack',2025,20,2);
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
INSERT INTO post_image VALUES ('Lost AirPods in Student Center',NULL),('Lost iPhone in Library',NULL),('Missing Blue Backpack',NULL);
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

-- Dump completed on 2025-04-10 19:43:16
