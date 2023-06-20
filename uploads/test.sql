-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: exam_admin
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `exam_attempt_master`
--

DROP TABLE IF EXISTS `exam_attempt_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_attempt_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `exam_id` int DEFAULT NULL,
  `exam_attempt` int DEFAULT NULL,
  `exam_result` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_attempt_master`
--

LOCK TABLES `exam_attempt_master` WRITE;
/*!40000 ALTER TABLE `exam_attempt_master` DISABLE KEYS */;
INSERT INTO `exam_attempt_master` VALUES (1,1,1,1,'25'),(2,1,2,1,'40'),(3,2,1,1,'15'),(4,3,2,1,'40'),(5,3,1,2,'50'),(6,2,3,1,'60');
/*!40000 ALTER TABLE `exam_attempt_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_category`
--

DROP TABLE IF EXISTS `exam_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `exam_id` int DEFAULT NULL,
  `category_count` int DEFAULT NULL,
  `question_id` varchar(125) DEFAULT NULL,
  `category_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_category`
--

LOCK TABLES `exam_category` WRITE;
/*!40000 ALTER TABLE `exam_category` DISABLE KEYS */;
INSERT INTO `exam_category` VALUES (1,1,5,'1,2,20,21,22,23,24,25','1'),(2,1,2,'4,5,6','3'),(3,1,1,'3','2'),(4,1,1,'29','9'),(5,2,3,'1,2,20','1'),(6,3,5,'1,2,20,21,22,23,24,25','1'),(7,3,1,'5','3');
/*!40000 ALTER TABLE `exam_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_master`
--

DROP TABLE IF EXISTS `exam_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_master` (
  `exam_id` int NOT NULL AUTO_INCREMENT,
  `exam_name` varchar(100) DEFAULT NULL,
  `exam_access_code` varchar(100) DEFAULT NULL,
  `exam_total_question` int DEFAULT NULL,
  `exam_isActive` varchar(40) DEFAULT 'no',
  `createdDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`exam_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_master`
--

LOCK TABLES `exam_master` WRITE;
/*!40000 ALTER TABLE `exam_master` DISABLE KEYS */;
INSERT INTO `exam_master` VALUES (1,'interview','78fyur',10,'10','2023-03-27 04:23:44'),(2,'testmock','ufj784',10,'no','2023-03-27 04:26:07'),(3,'interview1','tyhuju',10,'10','2023-03-27 04:38:33');
/*!40000 ALTER TABLE `exam_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `option_master`
--

DROP TABLE IF EXISTS `option_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `option_master` (
  `option_id` int NOT NULL AUTO_INCREMENT,
  `question_id` int DEFAULT NULL,
  `option_value` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`option_id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option_master`
--

LOCK TABLES `option_master` WRITE;
/*!40000 ALTER TABLE `option_master` DISABLE KEYS */;
INSERT INTO `option_master` VALUES (1,1,'Network Operating system'),(2,1,'Linux'),(3,1,'Firefox'),(4,1,'macOS'),(5,2,'Android'),(6,2,'The ability to hide the implementation details of an object from the outside world'),(7,2,'The ability to create multiple instances of a class'),(8,2,'The ability to define a class within another class'),(9,3,'The ability to hide the implementation details of an object from the outside'),(10,3,'A field that contains only numeric data'),(11,3,'The ability to hide the implementation details of an object from the outside world'),(12,3,'A field that contains a unique combination of letters and numbers for each record'),(13,4,'A field that uniquely identifies each record in a table'),(14,4,'The process of breaking down a large table into smaller tables to eliminate '),(15,4,'To connect to the internet'),(16,4,'The process of creating indexes on database tables to improve performance'),(17,4,'The process of breaking down a large table into smaller tables to eliminate'),(18,5,'The ability to hide the implementation details of an object from the outside'),(19,5,'The ability to hide the implementation details of an object from the outside world'),(20,5,'A field that contains only numeric data'),(21,5,'To run applications'),(22,5,'To connect to the internet'),(23,6,'To sort the results of a query in ascending order'),(24,6,'To filter the results of a query based on a condition'),(25,6,'To aggregate data based on a specified column or set of columns'),(26,6,'To join two or more tables together'),(27,7,'To enforce referential integrity between tables.'),(28,7,'To identify the primary key of another table.'),(29,7,'To create a unique index on a column.'),(30,7,'To allow for faster data retrieval.'),(31,8,'It declares that a variable or method belongs to the class, not to instances of the class.'),(32,8,'It declares that a variable or method is accessible from other classes in the same package'),(33,8,'It declares that a variable or method is immutable and cannot be changed'),(34,8,'It declares that a variable or method can only be accessed by the class that declares it'),(35,10,'32'),(36,10,'74'),(37,10,'23'),(38,10,'35'),(39,10,'45'),(40,9,'Polymorphism'),(41,9,'Inheritance'),(42,9,'Compilation'),(43,9,'Encapsulation'),(44,12,'object-oriented programming'),(45,12,'structured programming'),(46,12,'functional programming'),(47,12,'all of the mentioned'),(48,13,'Place the user in control'),(49,13,'Reduce the user’s memory load'),(50,13,'Make the interface consistent'),(51,13,'All of the mentioned'),(52,13,'None Of Above'),(53,14,'Servers'),(54,14,'Desktops'),(55,14,'Laptops'),(56,14,'Mobile devices'),(57,15,'java virtual machinhe'),(58,15,'Dalvik virtual machine'),(59,15,'Simple virtual machine'),(60,15,'None of the above'),(61,16,'java'),(62,16,'c++'),(63,16,'c'),(64,16,'None of above'),(65,17,'asg'),(66,17,'asgssssssssssssssssssssssssssssssssssssssssssss'),(67,17,'asf'),(68,17,'asg'),(69,18,'a'),(70,18,'a'),(71,18,'a'),(72,18,'a'),(73,19,'adf'),(74,19,'adfr'),(75,19,'fhjsd'),(76,19,'ashdjf'),(77,20,'interface between the hardware and application programs'),(78,20,'collection of programs that manages hardware resources'),(79,20,'system service provider to the application programs'),(80,20,'all of the mentioned'),(81,21,'to provide the interface between the API and application program'),(82,21,'to handle the files in the operating system'),(83,21,'to get and execute the next user-specified command'),(84,21,'none of the mentioned'),(85,22,'Priority'),(86,22,'Round Robin'),(87,22,'Shortest Job First'),(88,22,'All of the mentioned'),(89,23,'either low or high memory (depending on the location of interrupt vector)'),(90,23,'in the low memory'),(91,23,'in the high memory'),(92,23,'none of the mentioned'),(93,24,'RTLinux'),(94,24,'Palm OS'),(95,24,'QNX'),(96,24,'VxWorks'),(97,25,'monolithic kernel with modules'),(98,25,'microkernel'),(99,25,'monolithic kernel'),(100,25,'hybrid kernel'),(101,26,'every time a resource request is made at fixed time intervals'),(102,26,'at fixed time intervals'),(103,26,'every time a resource request is made'),(104,26,'none of the mentioned'),(105,27,'bad-block recovery'),(106,27,'booting from disk'),(107,27,'disk initialization'),(108,27,'all of the mentioned'),(109,28,'Logs are analysed to detect tails of intrusion'),(110,28,'The host operating system logs in the audit information'),(111,28,'Logs includes logins, file opens, and program executions'),(112,28,'All of the mentioned'),(113,29,'Range'),(114,29,'Sealed Class'),(115,29,'Elvis Operator'),(116,29,'Lambda function'),(117,30,' .java'),(118,30,'.kot'),(119,30,'.kt or .kts'),(120,30,'.andriod'),(121,31,'Hypertext Preprocessor'),(122,31,'Pretext Hypertext Preprocessor'),(123,31,'Personal Home Processor'),(124,31,'None of the above'),(125,35,'React.js can increase the applications performance with Virtual DOM.'),(126,35,'React.js is easy to integrate with other frameworks such as Angular, BackboneJS since it is only a view library.'),(127,35,'React.js can render both on client and server side.'),(128,35,'All of the above'),(129,36,'! (Exclamation)'),(130,36,'$ (Dollar)'),(131,36,'& (Ampersand)'),(132,36,'# (Hash)'),(133,37,'Constructor'),(134,37,'Class'),(135,37,'Both A and B'),(136,37,'None of the above'),(137,38,'IBM'),(138,38,'NetBeans'),(139,38,'JetBrains'),(140,38,'Oracle');
/*!40000 ALTER TABLE `option_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_category`
--

DROP TABLE IF EXISTS `question_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_category`
--

LOCK TABLES `question_category` WRITE;
/*!40000 ALTER TABLE `question_category` DISABLE KEYS */;
INSERT INTO `question_category` VALUES (1,'OS'),(2,'FLUTTER'),(3,'DBMS'),(4,'JAVA'),(5,'PYTHON'),(6,'UI/UX'),(7,'ANDROID'),(9,'KOTLIN'),(11,'PHP'),(13,'REACT'),(15,'NODE');
/*!40000 ALTER TABLE `question_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_coding`
--

DROP TABLE IF EXISTS `question_coding`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_coding` (
  `coding_id` int NOT NULL AUTO_INCREMENT,
  `question_id` int DEFAULT NULL,
  `coding_question` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`coding_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_coding`
--

LOCK TABLES `question_coding` WRITE;
/*!40000 ALTER TABLE `question_coding` DISABLE KEYS */;
INSERT INTO `question_coding` VALUES (2,10,'  class increment {\r\n        public static void main(String args[]) \r\n        {        \r\n             int g = 3;\r\n             System.out.print(++g * 8);\r\n        } \r\n    }');
/*!40000 ALTER TABLE `question_coding` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_master`
--

DROP TABLE IF EXISTS `question_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_master` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `question` varchar(2000) DEFAULT NULL,
  `question_answer` varchar(2000) DEFAULT NULL,
  `isDeleted` varchar(45) DEFAULT '1',
  `isCoding` int DEFAULT '0',
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_master`
--

LOCK TABLES `question_master` WRITE;
/*!40000 ALTER TABLE `question_master` DISABLE KEYS */;
INSERT INTO `question_master` VALUES (1,1,'What are the types of distributed operating systems?','Network Operating system','1',0),(2,1,'Which type of operating system is typically used on smartphones and tablets?','Android','1',0),(3,2,'What is encapsulation in OOPS?','The ability to hide the implementation details of an object from the outside worlds','1',0),(4,3,'What is a primary key in a relational database?','The process of breaking down a large table into smaller tables to eliminate ','1',0),(5,3,'What is encapsulation in OOP?','The ability to hide the implementation details of an object from the outside world','1',0),(6,3,'What is the purpose of the GROUP BY clause in a SQL statement?','To join two or more tables together','1',0),(7,3,'What is the purpose of a foreign key in a database table?','The process of breaking down a large table into smaller tables to eliminate','0',0),(8,4,'What is the purpose of the \"static\" keyword in Java?','It declares that a variable or method belongs to the class, not to instances of the class.','1',0),(9,4,'Which of the following is not an OOPS concept in Java?','Compilation','1',0),(10,4,'What will be the output of the following Java code?','74','1',1),(12,5,'Which type of Programming does Python support?','all of the mentioned','1',0),(13,6,'Which of the following is golden rule for interface design?','All of the mentioned','1',0),(14,7,'For which of the following  is mainly developed?','Mobile devices','1',0),(15,7,'Which of the following virtual machine is used by the Android operating system?','Dalvik virtual machine','1',0),(16,7,'Android is based on which of the following language?','java','0',0),(20,1,'What is an operating system?','all of the mentioned','1',0),(21,1,'What is the main function of the command interpreter?','to get and execute the next user-specified command','1',0),(22,1,'In Operating Systems, which of the following is/are CPU scheduling algorithms?','All of the mentioned','1',0),(23,1,' Where is the operating system placed in the memory?','either low or high memory (depending on the location of interrupt vector)','1',0),(24,1,'Which one of the following is not a real time operating system?','Palm OS','1',0),(25,1,'What does OS X has?','hybrid kernel','1',0),(26,1,'For an effective operating system, when to check for deadlock?','every time a resource request is made at fixed time intervals','1',0),(27,1,'The operating system is responsible for?','all of the mentioned','1',0),(28,1,'What are the characteristics of Host based IDS?','All of the mentioned','1',0),(29,9,'Which of following is used to handle null exceptions in Kotlin?','Elvis Operator','1',0),(30,9,'Which file extension is used to save Kotlin files.','.kt or .kts','1',0),(31,11,'PHP stands for','Hypertext Preprocessor','1',0),(35,13,'Which of the following are the advantages of React.js?','All of the above','1',0),(36,11,'Variable name in PHP starts with','$ (Dollar)','1',0),(37,13,'A class is a type of function, but instead of using the keyword function to initiate it, which keyword do we use?','Class','1',0),(38,9,'Kotlin was developed by?','JetBrains','1',0);
/*!40000 ALTER TABLE `question_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `result_master`
--

DROP TABLE IF EXISTS `result_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `result_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `exam_id` int NOT NULL,
  `user_id` int NOT NULL,
  `obtain_mark` int NOT NULL,
  `total_mark` int NOT NULL,
  `question_ids` varchar(500) NOT NULL,
  `question_answers` varchar(1000) NOT NULL,
  `submited` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `result_master`
--

LOCK TABLES `result_master` WRITE;
/*!40000 ALTER TABLE `result_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `result_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_master`
--

DROP TABLE IF EXISTS `student_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_master` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `enrollment` varchar(12) DEFAULT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `college` varchar(100) DEFAULT NULL,
  `birthdate` varchar(20) DEFAULT NULL,
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_master`
--

LOCK TABLES `student_master` WRITE;
/*!40000 ALTER TABLE `student_master` DISABLE KEYS */;
INSERT INTO `student_master` VALUES (1,'raj','javiya','male','javiyaraj4@gmail.com','8238949574','190439116046','BE','junagadh','ssgec bhavnagar','02/04/2001','2023-03-17 16:38:34'),(2,'meet','javiya','male','meet@gmail.com','7867903423','190430116020','BE','Bhavnagar','Nobel Junagadh','09/08/2002','2023-03-17 16:41:23'),(3,'alpesh','sureja','female','alpesh@gmail.com','8989898989','190890345123','ME','keshod','ssgec bhavnagar','10/01/2003','2023-03-18 16:34:57');
/*!40000 ALTER TABLE `student_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_master`
--

DROP TABLE IF EXISTS `user_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_master` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(200) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `isActive` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_master`
--

LOCK TABLES `user_master` WRITE;
/*!40000 ALTER TABLE `user_master` DISABLE KEYS */;
INSERT INTO `user_master` VALUES (1,'admin@gmail.com','admin','admin','1'),(2,'raj@gmail.com','student','student','1');
/*!40000 ALTER TABLE `user_master` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-27 11:13:11
