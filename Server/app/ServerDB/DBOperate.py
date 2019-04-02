import uuid

class DBOperate(object):
    '''中间层业务相关的operate，可能变化的数据库相关操作放在这里'''
    def __init__(self, database,dbtype='sqlite'):
        self.DB = database
        self._dbType = dbtype
    def ExecuteSQL(self,command):
        return self.DB._ExecuteSQL(command)
    def QueryOne(self,command):
        return self.DB._QueryOneSQL(command)
    def QueryAll(self,command):
        return self.DB._QueryAllSQL(command)
    @staticmethod
    def GenerateUUID():
        return "".join(str(uuid.uuid1()).split('-'))


    # 业务相关放在这之后，比如取数据，注册之类的
# 用户基本表
    def getAllUser(self):
        return self.QueryOne('SELECT * FROM user_base')

    # 根据用户名获取基本表内容
    def getUserByName(self, username):
        return self.QueryOne('SELECT * FROM user_base WHERE username=\'{}\''.format(username))

    # 根据用户id获取基本表内容
    def getUserById(self, userid):
        return self.QueryOne('SELECT * FROM user_base WHERE userid=\'{}\''.format(userid))

    # 添加一个用户（基本表内添加）
    def addUser(self, username, password):
        userid = DBOperate.GenerateUUID()
        if self.ExecuteSQL('INSERT INTO user_base (userid,username,password) VALUES (\'{}\',\'{}\',\'{}\')'.
                                    format(userid, username, password)):
            return userid
        return None

    # 修改用户信息
    def updateUser(self, userid, username, password):
        return self.ExecuteSQL('UPDATE user_base SET username=\'{}\',password=\'{}\' WHERE userid=\'{}\''.
                                    format(username, password, userid))

    # 修改用户名称
    def updateUserName(self, userid, username):
        return self.ExecuteSQL('UPDATE user_base SET username=\'{}\' WHERE userid=\'{}\''.
                                    format(username, userid))

    # 修改用户密码
    def updateUserPassword(self, userid, password):
        return self.ExecuteSQL('UPDATE user_base SET password=\'{}\' WHERE userid=\'{}\''.
                                    format(password, userid))

    # 检查用户密码,返回用户id
    def checkPassword(self, username, password):
        user = self.getUserByName(username)
        if user is not None:
            if password == user[2]:
                return user[0]
        return None

# 用户信息表
    # 获取所有用户信息
    def getAllUserInfo(self):
        return self.QueryAll('SELECT * FROM user_info')

    # 根据用户id获取该用户的信息
    def getUserInfoById(self, userid):
        return self.QueryOne('SELECT * FROM user_info WHERE userid=\'{}\''.format(userid))

    # 添加一个用户信息
    def addUserInfo(self, userid, realname, idcard, cellphone, email, avatarurl):
        return self.ExecuteSQL(
                'INSERT INTO user_info (userid,realname,idcard,cellphone,email,avatarurl) VALUES(\'{}\',\'{}\',\'{}\',\'{}\',\'{}\',\'{}\')'.
                        format(userid, realname, idcard, cellphone, email, avatarurl))

    # 修改用户信息
    def updateUserInfo(self, userid, realname, idcard, cellphone, email, avatarurl):
        return self.ExecuteSQL(
                'UPDATE user_info SET realname=\'{}\',idcard=\'{}\',cellphone=\'{}\',email=\'{}\',avatarurl=\'{}\' WHERE userid=\'{}\''.
                        format(realname, idcard, cellphone, email, avatarurl, userid))

    # 修改用户真实姓名
    def updateUserRealName(self, userid, realname):
        return self.ExecuteSQL('UPDATE user_info SET realname=\'{}\' WHERE userid=\'{}\''.
                                    format(realname, userid))

    # 修改用户身份证号
    def updateUserIDCard(self, userid, idcard):
        return self.ExecuteSQL('UPDATE user_info SET idcard=\'{}\' WHERE userid=\'{}\''.
                                    format(idcard, userid))

    # 修改用户手机号
    def updateUserCellphone(self, userid, cellphone):
        return self.ExecuteSQL('UPDATE user_info SET cellphone=\'{}\' WHERE userid=\'{}\''.
                                    format(cellphone, userid))

    # 修改用户邮箱
    def updateUserEmail(self, userid, email):
        return self.ExecuteSQL('UPDATE user_info SET email=\'{}\' WHERE userid=\'{}\''.
                                    format(email, userid))

    # 修改用户头像
    def updateUserAvatar(self, userid, avatarurl):
        return self.ExecuteSQL('UPDATE user_info SET avatarurl=\'{}\' WHERE userid=\'{}\''.
                                    format(avatarurl, userid))

# 用户简介表
    # 获取某个用户的简介
    def getUserIntroduce(self, userid):
        return self.QueryOne('SELECT * FROM user_introduce WHERE userid=\'{}\''.format(userid))

    # 添加某个用户的简介
    def addUserIntroduce(self, userid, resume, tags):
        return self.ExecuteSQL(
                'INSERT INTO user_introduce (userid,resume,tags) VALUES(\'{}\',\'{}\',\'{}\')'.format(userid, resume,
                                                                                                      tags))

    # 修改某个用户的简介
    def updateUserIntroduce(self, userid, resume, tags):
        return self.ExecuteSQL(
                'UPDATE user_introduce SET resume=\'{}\',tags=\'{}\' WHERE userid=\'{}\''.format(resume, tags, userid))

    # 修改标签
    def updateUserIntroduceTags(self, userid, tags):
        return self.ExecuteSQL('UPDATE user_introduce SET tags=\'{}\' WHERE userid=\'{}\''.format(tags, userid))

    # 修改简介内容
    def updateUserIntroduceResume(self, userid, resume):
        return self.ExecuteSQL('UPDATE user_introduce SET resume=\'{}\' WHERE userid=\'{}\''.format(resume, userid))

    # 删除某个用户的简介
    def deleteUserIntroduce(self, userid):
        return self.ExecuteSQL('DELETE FROM user_introduce WHERE userid=\'{}\''.format(userid))

# 文章表
    # 获取所有文章
    def getAllArticle(self):
        return self.QueryAll('SELECT * FROM article_base')

    # 根据id获取文章
    def getArticleById(self, artid):
        return self.QueryOne('SELECT * FROM article_base WHERE articleid=\'{}\''.format(artid))

    # 获取文章数量
    def getArticleCount(self):
        return self.QueryAll('SELECT COUNT(*) FROM article_base')

    # 获取分页文章
    def getArticleLimit(self, limit, offset):
        if 'sqlite' == self._dbType:
            return self.QueryAll(
                'SELECT * FROM article_base ORDER BY ROWID DESC LIMIT \'{}\' OFFSET \'{}\''.format(limit, offset))
        elif 'mysql' == self._dbType:
            return self.QueryAll('SELECT articleid,userid,title,breif,keywords,coverurl,uptime,bodyurl from '
                             '(SELECT @rowid:=@rowid+1 as rowid,article_base.* FROM (SELECT @rowid:=0)ro,article_base ORDER BY rowid DESC LIMIT {} OFFSET {}) as t'.format(
                limit, offset))

    # 获取某个用户的分页文章
    def getArticleLimitByUserid(self, userid, limit, offset):
        if 'sqlite' == self._dbType:
            return self.QueryAll(
                'SELECT * FROM article_base WHERE userid=\'{}\' ORDER BY ROWID DESC LIMIT \'{}\' OFFSET \'{}\''.format(
                    userid, limit, offset))
        elif 'mysql' == self._dbType:
            return self.QueryAll('SELECT articleid,userid,title,breif,keywords,coverurl,uptime,bodyurl from '
                             '(SELECT @rowid:=@rowid+1 as rowid,article_base.* FROM (SELECT @rowid:=0)ro,article_base  WHERE userid=\'{}\' ORDER BY rowid DESC LIMIT {} OFFSET {}) as t'.format(
                userid, limit, offset))

    # 获取某个用户的分页文章
    def getArticleLimitByUsername(self, username, limit, offset):
        if 'sqlite' == self._dbType:
            return self.QueryAll(
                'SELECT * FROM article_base WHERE username=\'{}\' ORDER BY ROWID DESC LIMIT \'{}\' OFFSET \'{}\''.format(
                    username, limit, offset))
        elif 'mysql' == self._dbType:
            return self.QueryAll('SELECT articleid,userid,title,breif,keywords,coverurl,uptime,bodyurl from '
                             '(SELECT @rowid:=@rowid+1 as rowid,article_base.* FROM (SELECT @rowid:=0)ro,article_base WHERE username=\'{}\' ORDER BY rowid DESC LIMIT {} OFFSET {}) as t'.format(
                username, limit, offset))

    # 获取某个用户发表的文章数量
    def getArticleCountByUserid(self, userid):
        return self.QueryAll('SELECT COUNT(*) FROM article_base WHERE userid=\'{}\''.format(userid))

    # 获取某个用户发表的文章数量
    def getArticleCountByUsername(self, username):
        return self.QueryAll('SELECT COUNT(*) FROM article_base WHERE username=\'{}\''.format(username))

    # 添加一个文章
    def addArticle(self, userid, title, brief, keys, coverurl, uptime, bodyurl):
        artid = DBOperate.GenerateUUID()
        if self.ExecuteSQL(
                'INSERT INTO article_base (articleid,userid,title,breif,keywords,coverurl,uptime,bodyurl) VALUES(\'{}\',\'{}\',\'{}\',\'{}\',\'{}\',\'{}\',\'{}\',\'{}\')'.
                        format(artid, userid, title, brief, keys, coverurl, uptime, bodyurl)):
            return artid
        return None

    # 修改一个文章
    def updateArticle(self, articleid, title, brief, keys, coverurl):
        return self.ExecuteSQL(
                'UPDATE article_base SET title=\'{}\',breif=\'{}\',keywords=\'{}\',coverurl=\'{}\' WHERE articleid=\'{}\''.
                        format(title, brief, keys, coverurl, articleid))

    # 删除一个文章
    def delArticle(self, articleid):
        return self.ExecuteSQL('DELETE FROM article_base WHERE articleid=\'{}\''.format(articleid))

# 评论表
    # 根据文章id获取所有评论
    def getCommentByArticleId(self, artid):
        return self.QueryAll('SELECT * FROM comments WHERE articleid=\'{}\''.format(artid))

    #根据评论id，获取该条评论信息
    def getCommentByCommentId(self, commentid):
        return self.QueryOne('SELECT * FROM comments WHERE commentid=\'{}\''.format(commentid))

    # 根据文章id获取所有顶级评论数量
    def getCommentNumberByArticleId(self, artid):
        return self.QueryAll('SELECT COUNT(*) FROM comments WHERE articleid=\'{}\' AND refid=\'\''.format(artid))

    # #获取评论分页
    # def getCommentByArticleIdLimit(self,artid,limit,offset):
    #     self._ExecuteSQL('SELECT COUNT(*) FROM comments WHERE articleid=\'{}\' AND refid=\'\' ORDER BY ROWID DESC LIMIT \'{}\' OFFSET \'{}\''.format(artid,limit,offset))
    #     return self._FetchAll()

    # 添加一个评论
    def addComment(self, articleid, userid, uptime, comments, refid):
        commentid = DBOperate.GenerateUUID()
        if self.ExecuteSQL(
                'INSERT INTO comments (commentid,articleid,userid,uptime,comments,refid) VALUES(\'{}\',\'{}\',\'{}\',\'{}\',\'{}\',\'{}\')'.
                        format(commentid, articleid, userid, uptime, comments, refid)):
            return commentid
        return None

    # 修改评论
    def updateComment(self, commentid, comments):
        return self.ExecuteSQL('UPDATE comments SET comments=\'{}\' WHERE commentid=\'{}\''.
                                    format(comments, commentid))

    # 删除一个评论
    def delComment(self, commentid):
        return self.ExecuteSQL(
                'DELETE FROM comments WHERE commentid=\'{}\' OR refid=\'{}\''.format(commentid, commentid))

    # 根据评论id。获取子评论数量
    def getChildNumberByCommentId(self, commentid):
        return self.QueryAll('SELECT COUNT(*) FROM comments WHERE refid=\'{}\''.format(commentid))

# 文章浏览表
    # 获取某个文章的浏览数量
    def getBrowserNumberByArticleId(self, articleid):
        return self.QueryAll('SELECT COUNT(*) FROM browsers_article WHERE articleid=\'{}\''.format(articleid))

    # 获取某个文章在某个ip的浏览记录
    def getBrowserArticleByIp(self, articleid, ip):
        return self.QueryAll(
            'SELECT * FROM browsers_article WHERE articleid=\'{}\' AND ipaddr=\'{}\''.format(articleid, ip))

    # 记录一条浏览记录
    def addBrowserArticle(self, articleid, userid, ip):
        browserid = DBOperate.GenerateUUID()
        if userid is not None:
            return self.ExecuteSQL(
                    'INSERT INTO browsers_article (browserid,articleid,userid,ipaddr) VALUES(\'{}\',\'{}\',\'{}\',\'{}\')'.
                            format(browserid, articleid, userid, ip))
        else:
            return self.ExecuteSQL(
                    'INSERT INTO browsers_article (browserid,articleid,userid,ipaddr) VALUES(\'{}\',\'{}\',null,\'{}\')'.
                            format(browserid, articleid, ip))

    # 删除某个文章的浏览记录
    def delBroswerArticleHistory(self, articleid):
        return self.ExecuteSQL('DELETE FROM browsers_article WHERE articleid=\'{}\''.format(articleid))

    # 删除某个用户的所有浏览记录
    def delBrowserArticleByUserid(self, userid):
        return self.ExecuteSQL('DELETE FROM browsers_article WHERE userid=\'{}\''.format(userid))

    # 删除某个ip的所有浏览记录
    def delBrowserArticleByIp(self, ip):
        return self.ExecuteSQL('DELETE FROM browsers_article WHERE ipaddr=\'{}\''.format(ip))

    # 删除某个文章内，某个用户的浏览记录
    def delBroswerArticleHistoryByUser(self, articleid, userid):
        return self.ExecuteSQL(
                'DELETE FROM browsers_article WHERE articleid=\'{}\'ANDuserid=\'{}\''.format(articleid, userid))

    # 删除某个文章内，某个ip的浏览记录
    def delBroswerArticleHistoryByIp(self, articleid, ip):
        return self.ExecuteSQL(
                'DELETE FROM browsers_article WHERE articleid=\'{}\'ANDipaddr=\'{}\''.format(articleid, ip))

    # 文章喜爱表
    # 获取某个文章的喜爱数量
    def getLikesNumberByArticleId(self, articleid):
        return  self.QueryAll('SELECT COUNT(*) FROM likes_article WHERE articleid=\'{}\''.format(articleid))

    # 添加一条喜爱文章的记录
    def addLikesArticle(self, articleid, userid):
        likeid = DBOperate.GenerateUUID()
        return self.ExecuteSQL('INSERT INTO likes_article (likeid,articleid,userid) VALUES(\'{}\',\'{}\',\'{}\')'.
                                    format(likeid, articleid, userid))

    # 删除喜欢的记录
    def delLikesArticle(self, articleid, userid):
        return self.ExecuteSQL(
                'DELETE FROM likes_article WHERE articleid=\'{}\'ANDuserid=\'{}\''.format(articleid, userid))

    # 获取某个用户的喜爱的文章
    def getLikesArticleByUser(self, userid):
        return  self.QueryAll('SELECT * FROM likes_article WHERE userid=\'{}\''.format(userid))

    # 评论赞表
    # 获取某个评论的赞数量
    def getLikesNumberByCommentId(self, commentid):
        return  self.QueryAll('SELECT COUNT(*) FROM likes_comment WHERE commentid=\'{}\''.format(commentid))

    # 添加一条喜爱文章的记录
    def addLikesComment(self, commentid, userid):
        likeid = DBOperate.GenerateUUID()
        return self.ExecuteSQL('INSERT INTO likes_comment (likeid,commentid,userid) VALUES(\'{}\',\'{}\',\'{}\')'.
                                    format(likeid, commentid, userid))

    # 删除对某个评论的赞
    def delLikesComment(self, commentid, userid):
        return self.ExecuteSQL(
                'DELETE FROM likes_comment WHERE commentid=\'{}\' AND userid=\'{}\''.format(commentid, userid))

    # 获取某个用户对评论的所有的赞
    def getLikesCommentByUser(self, userid):
        return  self.QueryAll('SELECT * FROM likes_comment WHERE userid=\'{}\''.format(userid))

    # 邮箱验证表
    def addEmailValid(self, email, code, expiretime, emailtype):
        if self.ExecuteSQL('DELETE FROM email_valid WHERE email=\'{}\' AND type=\'{}\''.format(email, emailtype)):
            validid = DBOperate.GenerateUUID()
            if self.ExecuteSQL(
                    'INSERT INTO email_valid (validid,email,code,expiretime,type) VALUES(\'{}\',\'{}\',\'{}\',\'{}\',\'{}\')'.format(
                            validid, email, code, expiretime, emailtype)):
                return validid
        return None

    def getEmailCode(self, email, emailtype):
        return  self.QueryOne('SELECT * FROM email_valid WHERE email=\'{}\' AND type=\'{}\''.format(email, emailtype))






