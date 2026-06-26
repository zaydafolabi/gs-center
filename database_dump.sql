-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: gs_wellness
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `site_content`
--

DROP TABLE IF EXISTS `site_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `site_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page_name` varchar(50) NOT NULL,
  `section_key` varchar(100) NOT NULL,
  `content_type` enum('text','image') DEFAULT 'text',
  `content_value` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `page_name` (`page_name`,`section_key`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_content`
--

LOCK TABLES `site_content` WRITE;
/*!40000 ALTER TABLE `site_content` DISABLE KEYS */;
INSERT INTO `site_content` VALUES (1,'home','hero_title','text','Transform Your ❤️ Health with','2026-06-03 14:05:01'),(2,'home','hero_subtitle','text','GS Wellness Coaching','2026-06-03 14:05:01'),(3,'home','hero_paragraph','text','Welcome to GS Wellness, a wellness brand proudly powered by Fohow, your partner in achieving a healthier and more balanced lifestyle. We provide high-quality wellness solutions designed to support immunity, energy, and overall well-being. Start your transformation today and experience wellness the natural way with GS Wellness','2026-06-03 14:05:01'),(4,'home','hero_image','image','https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-01-05/77qweu963X.png','2026-06-03 14:05:01'),(5,'home','features_title','text','Features','2026-06-03 14:05:01'),(6,'home','features_subtitle','text','Welcome to the Feature Section of GS Wellness, your ultimate destination for all things nutrition and wellness.','2026-06-03 14:05:01'),(7,'home','feature1_title','text','Personalized Wellness Solutions','2026-06-03 14:05:01'),(8,'home','feature1_desc','text','Experience wellness solutions tailored to your body and lifestyle. GS Wellness, powered by Fohow, offers carefully selected natural products designed to support immunity, energy, balance, and overall well-being—based on your personal health goals.','2026-06-03 14:05:01'),(9,'home','feature2_title','text','Guidance from Wellness Experts','2026-06-03 14:05:01'),(10,'home','feature2_desc','text','Our team of experienced and certified nutritionists will provide professional guidance and support throughout your journey. They will answer your questions, address your concerns, and keep you motivated as you work towards your goals.','2026-06-03 14:05:01'),(11,'home','feature3_title','text','Product Usage & Health Monitoring','2026-06-03 14:05:01'),(12,'home','feature3_desc','text','Track your wellness progress with proper product usage guidance and health monitoring tips. GS Wellness helps you understand how Fohow products work in your body and how to maximize their benefits for long-term results.','2026-06-03 14:05:01'),(13,'home','feature4_title','text','Wellness Routines & Natural Care','2026-06-03 14:05:01'),(14,'home','feature4_desc','text','Discover effective daily wellness routines using Fohow\'s natural health products. From immune support to vitality enhancement, our wellness plans help you stay consistent and enjoy a healthier lifestyle with ease.','2026-06-03 14:05:01'),(15,'home','feature5_title','text','Lifestyle & Holistic Wellness Support','2026-06-03 14:05:01'),(16,'home','feature5_desc','text','True wellness goes beyond products. GS Wellness promotes a holistic approach—supporting healthy habits, stress management, and balanced living—to help you achieve sustainable health and vitality','2026-06-03 14:05:01'),(17,'home','feature6_title','text','Health Education & Wellness Awareness','2026-06-03 14:05:01'),(18,'home','feature6_desc','text','Learn more about natural health through wellness education and product knowledge sessions. GS Wellness empowers you with information on Fohow\'s science-based solutions, helping you make informed decisions for long-term well-being.','2026-06-03 14:05:01'),(19,'about','hero_title','text','Welcome to Gs Wellness','2026-06-03 14:05:01'),(20,'about','hero_paragraph','text','Your trusted source for natural and holistic wellness solutions. Our mission at GS Wellness, a wellness branch of Fohow, is to support your health goals through science-based natural products and personalized wellness guidance. We understand that every individual is unique, and that\'s why we focus on providing wellness solutions that fit your lifestyle, body needs, and long-term goals.\n\nWith our team of trained wellness consultants and access to premium Fohow health solutions, we are dedicated to empowering you with the knowledge and support needed to make lasting improvements to your well-being. Whether your goal is to improve immunity, increase energy, restore balance, or enhance overall wellness, we are here to guide and support you every step of the way.\n\nAt GS Wellness, we believe that achieving good health should be natural, balanced, and sustainable. We emphasize holistic wellness practices, combining traditional herbal wisdom with modern scientific research. Our approach is rooted in evidence-based wellness solutions, ensuring that you receive safe, reliable, and effective support for your health journey.\n\nJoin our growing community of individuals committed to transforming their lives through natural wellness solutions. Take control of your health, boost your vitality, and experience the benefits of balanced living with Fohow products. At GS Wellness, we are here to guide you toward a healthier, more energized you','2026-06-03 14:05:01'),(21,'about','hero_image','image','https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-01-05/CpbAb5ZNnu.png','2026-06-03 14:05:01'),(22,'team','hero_title','text','Meet Our Team of Experts','2026-06-03 14:05:01'),(23,'team','hero_paragraph','text','Our team at Gs Wellness is composed of highly skilled professionals who are passionate about helping you achieve your health and wellness goals. With a diverse range of expertise in wellness solutions, coaching, and support, our team is dedicated to providing you with the guidance and personalized care you need.','2026-06-03 14:05:01'),(24,'team','member1_name','text','Mustapha Ganiyat','2026-06-03 14:05:01'),(25,'team','member1_role','text','Founder and CEO','2026-06-03 14:05:01'),(26,'team','member1_image','image','../images/mum2.jpeg','2026-06-03 14:05:01'),(27,'team','member2_name','text','Amina Adejoke Gold','2026-06-03 14:05:01'),(28,'team','member2_role','text','Chief Operating Officer','2026-06-03 14:05:01'),(29,'team','member2_image','image','http://localhost/backend/uploads/1780665038_59041c24d1a58574.jpg','2026-06-05 13:10:38'),(30,'team','member3_name','text','John Davis','2026-06-03 14:05:01'),(31,'team','member3_role','text','Chief Financial Officer','2026-06-03 14:05:01'),(32,'team','member3_image','image','../images/MUMMY OLIVE.jpeg','2026-06-03 14:05:01'),(33,'team','member4_name','text','Rachel Adams','2026-06-03 14:05:01'),(34,'team','member4_role','text','Chief Marketing Officer','2026-06-03 14:05:01'),(35,'team','member4_image','image','https://codia-f2c.s3.us-west-1.amazonaws.com/image/2026-01-05/TgKX1YYtkj.png','2026-06-03 14:05:01'),(36,'process','hero_title','text','Your Journey to Health and Wellness','2026-06-03 14:05:01'),(37,'process','hero_paragraph','text','At Gs Wellness, we believe in providing a personalized and comprehensive approach to help you achieve your health and wellness goals. Our \"How it Works\" process is designed to guide you through each step of your journey, ensuring that you receive the support, knowledge, and tools you need to succeed. Here\'s a detailed breakdown of our process:','2026-06-03 14:05:01'),(38,'products','hero_title','text','Complete Fohow Product Catalog','2026-06-03 14:05:01'),(39,'products','hero_paragraph','text','Browse our extensive collection of authentic Fohow International products. All items are 100% genuine with manufacturer warranty.','2026-06-03 14:05:01'),(40,'blog','hero_title','text','Health & Wellness Blog','2026-06-03 14:05:01'),(41,'blog','hero_paragraph','text','Discover expert insights, practical tips, and the latest research on nutrition, fitness, and overall wellness. Your journey to better health starts here.','2026-06-03 14:05:01'),(42,'contact','hero_title','text','Book Your Wellness Journey','2026-06-03 14:05:01'),(43,'contact','hero_paragraph','text','Take the first step towards optimal health with GS Wellness. Schedule your personalized consultation with our expert nutritionists and wellness coaches. We\'re here to guide you on your path to better health.','2026-06-03 14:05:01'),(44,'contact','email','text','mustaphaganiyat48@gmail.com','2026-06-03 14:05:01'),(45,'contact','phone','text','+234 806 196 5586','2026-06-03 14:05:01'),(46,'contact','address','text','Somewhere in the World','2026-06-03 14:05:01');
/*!40000 ALTER TABLE `site_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uploads`
--

DROP TABLE IF EXISTS `uploads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `uploads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `uploaded_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uploads`
--

LOCK TABLES `uploads` WRITE;
/*!40000 ALTER TABLE `uploads` DISABLE KEYS */;
/*!40000 ALTER TABLE `uploads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'zayd','Zayd','Admin','zayd@example.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','admin','2026-06-04 02:43:46'),(5,'peter',NULL,NULL,NULL,'$2y$10$NYVZagjflCvMMqJFObe0deycyQfUPTc0gVNRfTEtI2TBoRH5wNGhy','admin','2026-06-05 09:05:52'),(6,'ttt',NULL,NULL,NULL,'$2y$10$/rNjUL4gKiPfINh7JnRFXey7h9.8py1/omnBT6aHNnLmxWB70yd76','user','2026-06-05 09:18:40');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-25 22:39:14
