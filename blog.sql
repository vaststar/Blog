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
  UNIQUE INDEX `id`(`userid`) USING BTREE,
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
-- Table structure for user_introduce
-- ----------------------------
CREATE TABLE IF NOT EXISTS `user_introduce`  (
  `userid` varchar(32) NOT NULL,
  `resume` varchar(1000) NULL DEFAULT NULL,
  `tags` varchar(1000) NULL DEFAULT NULL,
  PRIMARY KEY (`userid`) USING BTREE,
  UNIQUE INDEX `userid`(`userid`) USING BTREE,
  CONSTRAINT `userid_info` FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `title` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`articleid`) USING BTREE,
  UNIQUE INDEX `userid`(`userid`) USING BTREE,
  CONSTRAINT `userid_article_base` FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;
SET FOREIGN_KEY_CHECKS = 1;
