PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for user_base
-- ----------------------------
CREATE TABLE IF NOT EXISTS `user_base` (
  `userid` VARCHAR (32) NOT NULL,
  `username` VARCHAR (255) NOT NULL,
  `password` VARCHAR (255) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE (`userid` ASC),
  UNIQUE (`username` ASC)
);

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
CREATE TABLE IF NOT EXISTS `user_info` (
  `userid` VARCHAR (32) NOT NULL,
  `realname` VARCHAR (32) NOT NULL,
  `idcard` VARCHAR (32) NOT NULL,
  `cellphone` VARCHAR (32) NOT NULL,
  `email` VARCHAR (255) NOT NULL,
  `avatarurl` VARCHAR (255),
  PRIMARY KEY (`userid`),
  FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE (`userid` ASC),
  UNIQUE (`idcard` ASC),
  UNIQUE (`cellphone` ASC),
  UNIQUE (`email` ASC)
);

-- ----------------------------
-- Table structure for user_class
-- ----------------------------
CREATE TABLE IF NOT EXISTS `user_class` (
  `userid` VARCHAR (32) NOT NULL,
  `write_level` VARCHAR (32),
  PRIMARY KEY (`userid`),
  FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE (`userid` ASC)
);

-- ----------------------------
-- Table structure for user_introduce
-- ----------------------------
CREATE TABLE IF NOT EXISTS `user_introduce` (
  `userid` VARCHAR (32) NOT NULL,
  `resume` VARCHAR (1000),
  `tags` VARCHAR (1000),
  PRIMARY KEY (`userid`),
  FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE (`userid` ASC)
);

-- ----------------------------
-- Table structure for article_base
-- ----------------------------
CREATE TABLE IF NOT EXISTS `article_base` (
  `articleid` VARCHAR (32) NOT NULL,
  `userid` VARCHAR (32) NOT NULL,
  `title` VARCHAR (255) NOT NULL,
  `breif` VARCHAR (2000) NOT NULL,
  `keywords` VARCHAR (2000) NOT NULL,
  `coverurl` VARCHAR (255) NOT NULL,
  `uptime` VARCHAR (255) NOT NULL,
  `bodyurl` VARCHAR (255) NOT NULL,
  PRIMARY KEY (`articleid`),
  FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE (`articleid` ASC)
);

-- ----------------------------
-- Table structure for comments
-- ----------------------------
CREATE TABLE IF NOT EXISTS `comments` (
  `commentid` VARCHAR (32) NOT NULL,
  `articleid` VARCHAR (32) NOT NULL,
  `userid` VARCHAR (32) NOT NULL,
  `uptime` VARCHAR (255) NOT NULL,
  `comments` VARCHAR (2000) NOT NULL,
  `refid` VARCHAR (32),
  PRIMARY KEY (`commentid`),
  FOREIGN KEY (`articleid`) REFERENCES `article_base` (`articleid`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE (`commentid` ASC)
);

-- ----------------------------
-- Table structure for browsers_article
-- ----------------------------
CREATE TABLE IF NOT EXISTS `browsers_article` (
  `browserid` VARCHAR (32) NOT NULL,
  `articleid` VARCHAR (32) NOT NULL,
  `userid` VARCHAR (32),
  `ipaddr` VARCHAR (32),
  PRIMARY KEY (`browserid`),
  FOREIGN KEY (`articleid`) REFERENCES `article_base` (`articleid`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE (`browserid` ASC)
);

-- ----------------------------
-- Table structure for likes_article
-- ----------------------------
CREATE TABLE IF NOT EXISTS `likes_article` (
  `likeid` VARCHAR (32) NOT NULL,
  `articleid` VARCHAR (32) NOT NULL,
  `userid` VARCHAR (32) NOT NULL,
  PRIMARY KEY (`likeid`),
  FOREIGN KEY (`articleid`) REFERENCES `article_base` (`articleid`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE (`likeid` ASC)
);

-- ----------------------------
-- Table structure for likes_comment
-- ----------------------------
CREATE TABLE IF NOT EXISTS `likes_comment` (
  `likeid` VARCHAR (32) NOT NULL,
  `commentid` VARCHAR (32) NOT NULL,
  `userid` VARCHAR (32) NOT NULL,
  PRIMARY KEY (`likeid`),
  FOREIGN KEY (`commentid`) REFERENCES `comments` (`commentid`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`userid`) REFERENCES `user_base` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE (`likeid` ASC)
);

-- ----------------------------
-- Table structure for email_valid
-- ----------------------------
CREATE TABLE IF NOT EXISTS `email_valid` (
  `validid` VARCHAR (32) NOT NULL,
  `email` VARCHAR (255) NOT NULL,
  `expiretime` VARCHAR (255) NOT NULL,
  `code` VARCHAR (32),
  `type` VARCHAR (32),
  PRIMARY KEY (`validid`),
  UNIQUE (`validid` ASC)
);

PRAGMA foreign_keys = true;
