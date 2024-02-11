-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: bdd_log
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `branchID` int NOT NULL AUTO_INCREMENT,
  `laboratoryID` int NOT NULL,
  `branch_name` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `sub_domain` varchar(50) NOT NULL,
  `creation_date` date DEFAULT NULL,
  PRIMARY KEY (`branchID`),
  KEY `laboratoryID` (`laboratoryID`),
  CONSTRAINT `branch_ibfk_1` FOREIGN KEY (`laboratoryID`) REFERENCES `laboratory` (`laboratoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,1,'Quicentro sur','La floresta','sur','2024-01-15'),(2,1,'Centro','San blas','centro','2024-01-16'),(3,2,'Valle de los chillos','San rafael','valle-chillos','2023-01-12');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laboratory`
--

DROP TABLE IF EXISTS `laboratory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laboratory` (
  `laboratoryID` int NOT NULL AUTO_INCREMENT,
  `tenant` varchar(50) NOT NULL,
  `holder` varchar(50) NOT NULL,
  `creation_date` date DEFAULT NULL,
  PRIMARY KEY (`laboratoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laboratory`
--

LOCK TABLES `laboratory` WRITE;
/*!40000 ALTER TABLE `laboratory` DISABLE KEYS */;
INSERT INTO `laboratory` VALUES (1,'Asistanet','Pedro Espinoza','2024-01-01'),(2,'Laboratorio Zurita Zurita','Juan Zurita','2023-12-12');
/*!40000 ALTER TABLE `laboratory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderID` int NOT NULL AUTO_INCREMENT,
  `laboratoryID` int NOT NULL,
  `branchID` int NOT NULL,
  `G` int NOT NULL,
  `P` int NOT NULL,
  `R` int NOT NULL,
  `L` int NOT NULL,
  `V` int NOT NULL,
  `creation_date` date DEFAULT NULL,
  PRIMARY KEY (`orderID`),
  KEY `laboratoryID` (`laboratoryID`),
  KEY `branchID` (`branchID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`laboratoryID`) REFERENCES `laboratory` (`laboratoryID`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`branchID`) REFERENCES `branch` (`branchID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,1,1,1,1,1,1,'2024-02-01'),(2,1,1,0,5,0,5,0,'2024-02-02'),(3,1,2,0,0,0,0,0,'2024-02-01'),(4,1,2,0,0,5,5,5,'2024-02-02'),(5,2,1,1,0,1,0,1,'2024-02-01'),(6,2,1,0,5,0,5,5,'2024-02-02'),(7,2,1,0,0,0,0,0,'2024-02-03'),(8,2,2,5,5,5,5,5,'2024-02-04');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'bdd_log'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-11 17:52:23
