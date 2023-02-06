-- Log In mysql
mysql -u root -p
--Enter password to access user sql
-- Create Database
CREATE DATABASE IF NOT EXISTS engsdb DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
-- Show all databases
shows databases;
-- Access Database
USE engsdb;
-- Create Table user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `token` varchar(16) NOT NULL,
  `secrettoken` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `token` varchar(16) NOT NULL,
  `secrettoken` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- Create table engWord
CREATE TABLE IF NOT EXISTS `englishword` (
  `word` varchar(50) NOT NULL,
  PRIMARY KEY (word)
) ENGINE=InnoDB CHARSET=utf8;
-- Create table english5k
CREATE TABLE IF NOT EXISTS `englishword5k` (
  `word` varchar(50) NOT NULL,
  PRIMARY KEY (word)
) ENGINE=InnoDB CHARSET=utf8;
-- connect
mysqlsh --mysqlx -u admin -h engsdb.ct3atq1l9uwz.ap-northeast-1.rds.amazonaws.com -P 3306
\connect admin@engsdb.ct3atq1l9uwz.ap-northeast-1.rds.amazonaws.com?connect-timeout=2000
-- add json
util.importJson("/home/ubuntu/EWords446k.json", {schema: "engsdb", table: "englishword", tableColumn: "word"});
util.importJson("/home/ubuntu/EWords446k.json")
-- check
mysqlsh -u admin -h engsdb.ct3atq1l9uwz.ap-northeast-1.rds.amazonaws.com --sqlc -P 3306 -e "SHOW plugins"
mysql -u admin -h engsdb.ct3atq1l9uwz.ap-northeast-1.rds.amazonaws.com -P 3306 -p -e "select @@mysqlx_port"
-- QUERRy
SELECT word
FROM englishword
WHERE word
LIMIT number;

SELECT * FROM englishword WHERE REGEXP_LIKE(word, '^b') LIMIT 10;
SELECT * FROM englishword WHERE word LIKE 'b%' LIMIT 10;

SELECT * FROM englishword5k ORDER BY RAND() LIMIT 10;
--Show all tables:

Show tables;

-- Insert a sample
INSERT INTO `user` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');
-- Add column
ALTER TABLE user ADD COLUMN token VARCHAR(16) AFTER email;
ALTER TABLE user ADD COLUMN secrettoken VARCHAR(16) NOT NULL AFTER token;


UPDATE user SET token = ? WHERE username = ?;
-- ----------------------------------------------------
CREATE USER 'engs'@'125.212.172.117';
CREATE USER 'user_name'@'127.0.0.1';

CREATE USER 'engs'@'125.212.172.117'
  IDENTIFIED BY '1234';
GRANT ALL
  ON *.*
  TO 'engs'@'125.212.172.117'
  WITH GRANT OPTION;


  SHOW GRANTS FOR 'engs'@'125.212.172.117';
-- change pass
  ALTER USER 'engs'@'125.212.172.117' IDENTIFIED BY '1234'; 
  flush privileges;