-- Log In mysql
mysql -u root -p
--Enter password to access user sql
-- Create Database
CREATE DATABASE IF NOT EXISTS engsdb DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
-- Show all databases
shows databases;
-- Access Database
USE engsdb;
-- Create Table
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `token` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--Show all tables:

Show tables;

-- Insert a sample
INSERT INTO `user` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');
-- Add column
ALTER TABLE user ADD COLUMN token VARCHAR(16) AFTER email;

UPDATE user SET token = ? WHERE username = ?;