PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for article_base
-- ----------------------------
DROP TABLE IF EXISTS "article_base";
CREATE TABLE "article_base" (
  "articleid" VARCHAR (32) NOT NULL,
  "userid" VARCHAR (32) NOT NULL,
  "title" VARCHAR (256) NOT NULL,
  "breif" VARCHAR (2000) NOT NULL,
  "keywords" VARCHAR (2000) NOT NULL,
  "coverurl" VARCHAR (256) NOT NULL,
  "uptime" VARCHAR (256) NOT NULL,
  "bodyurl" VARCHAR (256) NOT NULL,
  PRIMARY KEY ("articleid"),
  FOREIGN KEY ("userid") REFERENCES "user_base" ("userid") ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE ("articleid" ASC)
);

-- ----------------------------
-- Table structure for browsers_article
-- ----------------------------
DROP TABLE IF EXISTS "browsers_article";
CREATE TABLE "browsers_article" (
  "browserid" VARCHAR (32) NOT NULL,
  "articleid" VARCHAR (32) NOT NULL,
  "userid" VARCHAR (32),
  "ipaddr" VARCHAR (32),
  PRIMARY KEY ("browserid"),
  FOREIGN KEY ("articleid") REFERENCES "article_base" ("articleid") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("userid") REFERENCES "user_base" ("userid") ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE ("browserid" ASC)
);

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS "comments";
CREATE TABLE "comments" (
  "commentid" VARCHAR (32) NOT NULL,
  "articleid" VARCHAR (32) NOT NULL,
  "userid" VARCHAR (32) NOT NULL,
  "uptime" VARCHAR (256) NOT NULL,
  "comments" VARCHAR (2000) NOT NULL,
  "refid" VARCHAR (32),
  PRIMARY KEY ("commentid"),
  FOREIGN KEY ("articleid") REFERENCES "article_base" ("articleid") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("userid") REFERENCES "user_base" ("userid") ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE ("commentid" ASC)
);

-- ----------------------------
-- Table structure for email_valid
-- ----------------------------
DROP TABLE IF EXISTS "email_valid";
CREATE TABLE "email_valid" (
  "validid" VARCHAR (32) NOT NULL,
  "email" VARCHAR (256) NOT NULL,
  "expiretime" VARCHAR (256) NOT NULL,
  "code" VARCHAR (32),
  "type" VARCHAR (32),
  PRIMARY KEY ("validid"),
  UNIQUE ("validid" ASC)
);

-- ----------------------------
-- Table structure for likes_article
-- ----------------------------
DROP TABLE IF EXISTS "likes_article";
CREATE TABLE "likes_article" (
  "likeid" VARCHAR (32) NOT NULL,
  "articleid" VARCHAR (32) NOT NULL,
  "userid" VARCHAR (32) NOT NULL,
  PRIMARY KEY ("likeid"),
  FOREIGN KEY ("articleid") REFERENCES "article_base" ("articleid") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("userid") REFERENCES "user_base" ("userid") ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE ("likeid" ASC)
);

-- ----------------------------
-- Table structure for likes_comment
-- ----------------------------
DROP TABLE IF EXISTS "likes_comment";
CREATE TABLE "likes_comment" (
  "likeid" VARCHAR (32) NOT NULL,
  "commentid" VARCHAR (32) NOT NULL,
  "userid" VARCHAR (32) NOT NULL,
  PRIMARY KEY ("likeid"),
  FOREIGN KEY ("commentid") REFERENCES "comments" ("commentid") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("userid") REFERENCES "user_base" ("userid") ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE ("likeid" ASC)
);

-- ----------------------------
-- Table structure for user_base
-- ----------------------------
DROP TABLE IF EXISTS "user_base";
CREATE TABLE "user_base" (
  "userid" VARCHAR (32) NOT NULL,
  "username" VARCHAR (256) NOT NULL,
  "password" VARCHAR (256) NOT NULL,
  PRIMARY KEY ("userid"),
  UNIQUE ("userid" ASC),
  UNIQUE ("username" ASC)
);

-- ----------------------------
-- Table structure for user_class
-- ----------------------------
DROP TABLE IF EXISTS "user_class";
CREATE TABLE "user_class" (
  "userid" VARCHAR (32) NOT NULL,
  "write_level" VARCHAR (32),
  PRIMARY KEY ("userid"),
  FOREIGN KEY ("userid") REFERENCES "user_base" ("userid") ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE ("userid" ASC)
);

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS "user_info";
CREATE TABLE "user_info" (
  "userid" VARCHAR (32) NOT NULL,
  "realname" VARCHAR (32) NOT NULL,
  "idcard" VARCHAR (32) NOT NULL,
  "cellphone" VARCHAR (32) NOT NULL,
  "email" VARCHAR (256) NOT NULL,
  "avatarurl" VARCHAR (256),
  PRIMARY KEY ("userid"),
  FOREIGN KEY ("userid") REFERENCES "user_base" ("userid") ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE ("userid" ASC),
  UNIQUE ("idcard" ASC),
  UNIQUE ("cellphone" ASC),
  UNIQUE ("email" ASC)
);

-- ----------------------------
-- Table structure for user_introduce
-- ----------------------------
DROP TABLE IF EXISTS "user_introduce";
CREATE TABLE "user_introduce" (
  "userid" VARCHAR (32) NOT NULL,
  "resume" VARCHAR (1000),
  "tags" VARCHAR (1000),
  PRIMARY KEY ("userid"),
  FOREIGN KEY ("userid") REFERENCES "user_base" ("userid") ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE ("userid" ASC)
);

PRAGMA foreign_keys = true;
