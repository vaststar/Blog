create database if not exists blog;
use blog;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_base
-- ----------------------------
CREATE TABLE IF NOT EXISTS `user_base`  (
  `userid` varchar(32) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userid`) USING BTREE,
  UNIQUE INDEX `userid`(`userid`) USING BTREE,
  UNIQUE INDEX `name`(`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
CREATE TABLE IF NOT EXISTS `user_info`  (
  `userid` varchar(32) NOT NULL,
  `realname` varchar(32) NOT NULL,
  `idcard` varchar(32) NOT NULL,
  `cellphone` varchar(32) NOT NULL,
  `email` varchar(255) NOT NULL,
  `avatarurl` varchar(255) NULL DEFAULT NULL,
  PRIMARY KEY (`userid`) USING BTREE,
  UNIQUE INDEX `idcard`(`idcard`) USING BTREE,
  UNIQUE INDEX `cellphone`(`cellphone`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE,
  CONSTRAINT `userid_info` FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for user_class
-- ----------------------------
CREATE TABLE IF NOT EXISTS `user_class` (
  `userid` VARCHAR (32) NOT NULL,
  `write_level` VARCHAR (32) NULL DEFAULT NULL,
  PRIMARY KEY (`userid`) USING BTREE,
  UNIQUE INDEX `userid`(`userid`) USING BTREE,
  CONSTRAINT `userid_class` FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_introduce
-- ----------------------------
CREATE TABLE IF NOT EXISTS `user_introduce`  (
  `userid` varchar(32) NOT NULL,
  `resume` varchar(1000) NULL DEFAULT NULL,
  `tags` varchar(1000) NULL DEFAULT NULL,
  PRIMARY KEY (`userid`) USING BTREE,
  UNIQUE INDEX `userid`(`userid`) USING BTREE,
  CONSTRAINT `userid_introduce` FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_introduce
-- ----------------------------
CREATE TABLE IF NOT EXISTS `user_class`  (
  `userid` varchar(32) NOT NULL,
  `write_level` varchar(32) NULL DEFAULT NULL,
  PRIMARY KEY (`userid`) USING BTREE,
  UNIQUE INDEX `userid`(`userid`) USING BTREE,
  CONSTRAINT `userid_class` FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for article_base
-- ----------------------------
CREATE TABLE IF NOT EXISTS `article_base`  (
  `articleid` varchar(32) NOT NULL,
  `userid` varchar(32) NOT NULL,
  `title` varchar(255) NOT NULL,
  `breif` varchar(2000) NOT NULL,
  `keywords` varchar(2000) NOT NULL,
  `coverurl` varchar(255) NOT NULL,
  `uptime` varchar(255) NOT NULL,
  `bodyurl` varchar(255) NOT NULL,
  PRIMARY KEY (`articleid`) USING BTREE,
  UNIQUE INDEX `articleid`(`articleid`) USING BTREE,
  CONSTRAINT `userid_article_base` FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
CREATE TABLE IF NOT EXISTS `comments`  (
  `commentid` varchar(32) NOT NULL,
  `articleid` varchar(32) NOT NULL,
  `userid` varchar(32) NOT NULL,
  `uptime` varchar(255) NOT NULL,
  `comments` varchar(2000) NOT NULL,
  `refid` varchar(32) NOT NULL,
  PRIMARY KEY (`commentid`) USING BTREE,
  UNIQUE INDEX `commentid`(`commentid`) USING BTREE,
  CONSTRAINT `articleid_comments` FOREIGN KEY (`articleid`) REFERENCES `article_base` (`articleid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userid_comments` FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for browsers_article
-- ----------------------------
CREATE TABLE IF NOT EXISTS `browsers_article`  (
  `browserid` varchar(32) NOT NULL,
  `articleid` varchar(32) NOT NULL,
  `userid` varchar(32) NOT NULL,
  `ipaddr` varchar(32) NOT NULL,
  PRIMARY KEY (`browserid`) USING BTREE,
  UNIQUE INDEX `browserid`(`browserid`) USING BTREE,
  CONSTRAINT `articleid_browsers_article` FOREIGN KEY (`articleid`) REFERENCES `article_base` (`articleid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userid_browsers_article` FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for likes_article
-- ----------------------------
CREATE TABLE IF NOT EXISTS `likes_article`  (
  `likeid` varchar(32) NOT NULL,
  `articleid` varchar(32) NOT NULL,
  `userid` varchar(32) NOT NULL,
  PRIMARY KEY (`likeid`) USING BTREE,
  UNIQUE INDEX `likeid`(`likeid`) USING BTREE,
  CONSTRAINT `articleid_likes_article` FOREIGN KEY (`articleid`) REFERENCES `article_base` (`articleid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userid_likes_article` FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for likes_comment
-- ----------------------------
CREATE TABLE IF NOT EXISTS `likes_comment`  (
  `likeid` varchar(32) NOT NULL,
  `commentid` varchar(32) NOT NULL,
  `userid` varchar(32) NOT NULL,
  PRIMARY KEY (`likeid`) USING BTREE,
  UNIQUE INDEX `likeid`(`likeid`) USING BTREE,
  CONSTRAINT `commentid_likes_comment` FOREIGN KEY (`commentid`) REFERENCES `comments` (`commentid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userid_likes_comment` FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for email_valid
-- ----------------------------
CREATE TABLE IF NOT EXISTS `email_valid`  (
  `validid` varchar(32) NOT NULL,
  `email` varchar(255) NOT NULL,
  `expiretime` varchar(255) NOT NULL,
  `code` varchar(32) ,
  `type` varchar(32) ,
  PRIMARY KEY (`validid`) USING BTREE,
  UNIQUE INDEX `validid`(`validid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
