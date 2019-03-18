import abc
from .BaseDB import BaseDB

class OperateDB(BaseDB,metaclass=abc.ABCMeta):
    '''中间层业务相关的operate，可能变化的数据库相关操作放在这里'''
    def __init__(self,database,databaseType,sqlfiles=None):
        BaseDB.__init__(self,database,databaseType,sqlfiles)

#业务相关放在这之后，比如取数据，注册之类的
#用户基本表
    def getAllUser(self):
        self._ExecuteSQL('SELECT * FROM user_base')
        return self._FetchAll()
    
    #根据用户名获取基本表内容
    def getUserByName(self,username):
        self._ExecuteSQL('SELECT * FROM user_base WHERE username=\'{}\''.format(username))
        return self._FetchOne()

    #根据用户id获取基本表内容
    def getUserById(self,userid):
        self._ExecuteSQL('SELECT * FROM user_base WHERE userid=\'{}\''.format(userid))
        return self._FetchOne()

    #添加一个用户（基本表内添加）
    def addUser(self,username,password):
        userid = BaseDB.GenerateUUID()
        if self._ExecuteSQL('INSERT INTO user_base (userid,username,password) VALUES (\'{}\',\'{}\',\'{}\')'.
                            format(userid,username,password)):
            self._CommitChange()
            return userid
        return None

    def updateUser(self,userid,username,password):
        if self._ExecuteSQL('UPDATE user_base SET username=\'{}\',password=\'{}\' WHERE userid=\'{}\''.
                            format(username,password,userid)):
            self._CommitChange()
            return True
        return False

    #检查用户密码
    def checkPassword(self,username,password):
        user =self.getUserByName(username)
        print(user)
        if not user is None:
            if password == user[2]:
                return user[0]
        return None

#用户信息表
    # 获取所有用户信息
    def getAllUserInfo(self):
        self._ExecuteSQL('SELECT * FROM user_info')
        return self._FetchAll()

    #根据用户id获取该用户的信息
    def getUserInfoById(self,userid):
        self._ExecuteSQL('SELECT * FROM user_info WHERE userid=\'{}\''.format(userid))
        return self._FetchOne()

    #添加一个用户信息
    def addUserInfo(self,userid,realname,idcard,cellphone,email,avatarurl):
        if self._ExecuteSQL('INSERT INTO user_info (userid,realname,idcard,cellphone,email,avatarurl) VALUES(\'{}\',\'{}\',\'{}\',\'{}\',\'{}\',\'{}\')'.
                         format(userid,realname,idcard,cellphone,email,avatarurl)):
            self._CommitChange()
            return True
        return False

    #修改用户信息
    def updateUserInfo(self,userid,realname,idcard,cellphone,email,avatarurl):
        if self._ExecuteSQL('UPDATE user_info SET realname=\'{}\',idcard=\'{}\',cellphone=\'{}\',email=\'{}\',avatarurl=\'{}\' WHERE userid=\'{}\')'.
                         format(realname,idcard,cellphone,email,avatarurl,userid)):
            self._CommitChange()
            return True
        return False

#用户简介表
    #获取某个用户的简介
    def getUserIntroduce(self,userid):
        self._ExecuteSQL('SELECT * FROM user_introduce WHERE userid=\'{}\''.format(userid))
        return self._FetchOne()
    #添加某个用户的简介
    def addUserIntroduce(self,userid,resume,tags):
        if self._ExecuteSQL('INSERT INTO user_introduce (userid,resume,tags) VALUES(\'{}\',\'{}\',\'{}\')'.format(userid,resume,tags)):
            self._CommitChange()
            return True
        return False
    #修改某个用户的简介
    def updateUserIntroduce(self,userid,resume,tags):
        if self._ExecuteSQL('UPDATE user_introduce SET resume=\'{}\',tags=\'{}\' WHERE userid=\'{}\''.format(resume,tags,userid)):
            self._CommitChange()
            return True
        return False
    #修改标签
    def updateUserIntroduceTags(self,userid,tags):
        if self._ExecuteSQL('UPDATE user_introduce SET tags=\'{}\' WHERE userid=\'{}\''.format(tags,userid)):
            self._CommitChange()
            return True
        return False
    #修改简介内容
    def updateUserIntroduceResume(self,userid,resume):
        if self._ExecuteSQL('UPDATE user_introduce SET resume=\'{}\' WHERE userid=\'{}\''.format(resume,userid)):
            self._CommitChange()
            return True
        return False

    #删除某个用户的简介
    def deleteUserIntroduce(self,userid):
        if self._ExecuteSQL('DELETE FROM user_introduce WHERE userid=\'{}\''.format(userid)):
            self._CommitChange()
            return True
        return False

#文章表
    #获取所有文章
    def getAllArticle(self):
        self._ExecuteSQL('SELECT * FROM article_base')
        return self._FetchAll()
    #根据id获取文章
    def getArticleById(self,artid):
        self._ExecuteSQL('SELECT * FROM article_base WHERE articleid=\'{}\''.format(artid))
        return self._FetchOne()
    #获取文章数量
    def getArticleCount(self):
        self._ExecuteSQL('SELECT COUNT(*) FROM article_base')
        return self._FetchAll()
    #获取分页文章
    def getArticleLimit(self,limit,offset):
        self._ExecuteSQL('SELECT * FROM article_base ORDER BY ROWID DESC LIMIT \'{}\' OFFSET \'{}\''.format(limit,offset))
        return self._FetchAll()
    #获取某个用户的分页文章
    def getArticleLimitByUserid(self, userid, limit, offset):
        self._ExecuteSQL(
            'SELECT * FROM article_base WHERE userid=\'{}\' ORDER BY ROWID DESC LIMIT \'{}\' OFFSET \'{}\''.format(userid,limit, offset))
        return self._FetchAll()
    #获取某个用户的分页文章
    def getArticleLimitByUsername(self, username, limit, offset):
        self._ExecuteSQL(
            'SELECT * FROM article_base WHERE username=\'{}\' ORDER BY ROWID DESC LIMIT \'{}\' OFFSET \'{}\''.format(username,limit, offset))
        return self._FetchAll()
    #获取某个用户发表的文章数量
    def getArticleCountByUserid(self,userid):
        self._ExecuteSQL('SELECT COUNT(*) FROM article_base WHERE userid=\'{}\''.format(userid))
        return self._FetchAll()
    #获取某个用户发表的文章数量
    def getArticleCountByUsername(self,username):
        self._ExecuteSQL('SELECT COUNT(*) FROM article_base WHERE username=\'{}\''.format(username))
        return self._FetchAll()
    #获取用户文章分页
    def getArticleByUseridLimit(self,userid,limit,offset):
        self._ExecuteSQL('SELECT * FROM article_base WHERE userid=\'{}\' ORDER BY ROWID DESC LIMIT \'{}\' OFFSET \'{}\''.format(userid,limit,offset))
        return self._FetchAll()

    #添加一个文章
    def addArticle(self,userid,title,brief,keys,coverurl,uptime,bodyurl):
        artid = BaseDB.GenerateUUID()
        if self._ExecuteSQL('INSERT INTO article_base (articleid,userid,title,breif,keywords,coverurl,uptime,bodyurl) VALUES(\'{}\',\'{}\',\'{}\',\'{}\',\'{}\',\'{}\',\'{}\',\'{}\')'.
                         format(artid,userid,title,brief,keys,coverurl,uptime,bodyurl)):
            self._CommitChange()
            return artid
        return None
    #修改一个文章
    def updateArticle(self,articleid,title,brief,keys,coverurl):
        if self._ExecuteSQL('UPDATE article_base SET title=\'{}\',breif=\'{}\',keywords=\'{}\',coverurl=\'{}\' WHERE articleid=\'{}\''.
                         format(title,brief,keys,coverurl,articleid)):
            self._CommitChange()
            return True
        return False
    #删除一个文章
    def delArticle(self,articleid):
        if self._ExecuteSQL('DELETE FROM article_base WHERE articleid=\'{}\''.format(articleid)):
            self._CommitChange()
            return True
        return False
#评论表
    #根据文章id获取所有评论
    def getCommentByArticleId(self,artid):
        self._ExecuteSQL('SELECT * FROM comments WHERE articleid=\'{}\''.format(artid))
        return self._FetchAll()
    #根据文章id获取所有顶级评论数量
    def getCommentNumberByArticleId(self,artid):
        self._ExecuteSQL('SELECT COUNT(*) FROM comments WHERE articleid=\'{}\' AND refid=\'\''.format(artid))
        return self._FetchAll()
    # #获取评论分页
    # def getCommentByArticleIdLimit(self,artid,limit,offset):
    #     self._ExecuteSQL('SELECT COUNT(*) FROM comments WHERE articleid=\'{}\' AND refid=\'\' ORDER BY ROWID DESC LIMIT \'{}\' OFFSET \'{}\''.format(artid,limit,offset))
    #     return self._FetchAll()

    #添加一个评论
    def addComment(self,articleid,userid,uptime,comments,refid):
        commentid = BaseDB.GenerateUUID()
        if self._ExecuteSQL('INSERT INTO comments (commentid,articleid,userid,uptime,comments,refid) VALUES(\'{}\',\'{}\',\'{}\',\'{}\',\'{}\',\'{}\')'.
                         format(commentid,articleid,userid,uptime,comments,refid)):
            self._CommitChange()
            return commentid
        return None
    #修改评论
    def updateComment(self,commentid,comments):
        if self._ExecuteSQL('UPDATE comments SET comments=\'{}\' WHERE commentid=\'{}\''.
                         format(comments,commentid)):
            self._CommitChange()
            return True
        return False
    #删除一个评论
    def delComment(self,commentid):
        if self._ExecuteSQL('DELETE FROM comments WHERE commentid=\'{}\' and refid=\'{}\''.format(commentid,commentid)):
            self._CommitChange()
            return True
        return False
    #根据评论id。获取子评论数量
    def getChildNumberByCommentId(self,commentid):
        self._ExecuteSQL('SELECT COUNT(*) FROM comments WHERE refid=\'{}\''.format(commentid))
        return self._FetchAll()
#文章浏览表
    #获取某个文章的浏览数量
    def getBrowserNumberByArticleId(self,articleid):
        self._ExecuteSQL('SELECT COUNT(*) FROM browsers_article WHERE articleid=\'{}\''.format(articleid))
        return self._FetchAll()
    #获取某个文章在某个ip的浏览记录
    def getBrowserArticleByIp(self,articleid,ip):
        self._ExecuteSQL('SELECT * FROM browsers_article WHERE articleid=\'{}\' and ipaddr=\'{}\''.format(articleid,ip))
        return self._FetchAll()
    #记录一条浏览记录
    def addBrowserArticle(self,articleid,userid,ip):
        browserid = BaseDB.GenerateUUID()
        if not userid is None:
            if self._ExecuteSQL('INSERT INTO browsers_article (browserid,articleid,userid,ipaddr) VALUES(\'{}\',\'{}\',\'{}\',\'{}\')'.
                         format(browserid,articleid,userid,ip)):
                self._CommitChange()
                return True
        else:
            if self._ExecuteSQL('INSERT INTO browsers_article (browserid,articleid,userid,ipaddr) VALUES(\'{}\',\'{}\',null,\'{}\')'.
                         format(browserid,articleid,ip)):
                self._CommitChange()
                return True
        return False
    #删除某个文章的浏览记录
    def delBroswerArticleHistory(self,articleid):
        if self._ExecuteSQL('DELETE FROM browsers_article WHERE articleid=\'{}\''.format(articleid)):
            self._CommitChange()
            return True
        return False
    #删除某个用户的所有浏览记录
    def delBrowserArticleByUserid(self,userid):
        if self._ExecuteSQL('DELETE FROM browsers_article WHERE userid=\'{}\''.format(userid)):
            self._CommitChange()
            return True
        return False
    #删除某个ip的所有浏览记录
    def delBrowserArticleByIp(self,ip):
        if self._ExecuteSQL('DELETE FROM browsers_article WHERE ipaddr=\'{}\''.format(ip)):
            self._CommitChange()
            return True
        return False
    #删除某个文章内，某个用户的浏览记录
    def delBroswerArticleHistoryByUser(self,articleid,userid):
        if self._ExecuteSQL('DELETE FROM browsers_article WHERE articleid=\'{}\' and userid=\'{}\''.format(articleid,userid)):
            self._CommitChange()
            return True
        return False
    #删除某个文章内，某个ip的浏览记录
    def delBroswerArticleHistoryByIp(self,articleid,ip):
        if self._ExecuteSQL('DELETE FROM browsers_article WHERE articleid=\'{}\' and ipaddr=\'{}\''.format(articleid,ip)):
            self._CommitChange()
            return True
        return False


#文章喜爱表
    #获取某个文章的喜爱数量
    def getLikesNumberByArticleId(self,articleid):
        self._ExecuteSQL('SELECT COUNT(*) FROM likes_article WHERE articleid=\'{}\''.format(articleid))
        return self._FetchAll()
    #添加一条喜爱文章的记录
    def addLikesArticle(self,articleid,userid):
        likeid = BaseDB.GenerateUUID()
        if self._ExecuteSQL('INSERT INTO likes_article (likeid,articleid,userid) VALUES(\'{}\',\'{}\',\'{}\')'.
                     format(likeid,articleid,userid)):
            self._CommitChange()
            return True
        return False
    #删除喜欢的记录
    def delLikesArticle(self,articleid,userid):
        if self._ExecuteSQL('DELETE FROM likes_article WHERE articleid=\'{}\' and userid=\'{}\''.format(articleid,userid)):
            self._CommitChange()
            return True
        return False
    #获取某个用户的喜爱的文章
    def getLikesArticleByUser(self,userid):
        self._ExecuteSQL('SELECT * FROM likes_article WHERE userid=\'{}\''.format(userid))
        return self._FetchAll()
#评论赞表
    #获取某个评论的赞数量
    def getLikesNumberByCommentId(self,commentid):
        self._ExecuteSQL('SELECT COUNT(*) FROM likes_comment WHERE commentid=\'{}\''.format(commentid))
        return self._FetchAll()
    #添加一条喜爱文章的记录
    def addLikesComment(self,commentid,userid):
        likeid = BaseDB.GenerateUUID()
        if self._ExecuteSQL('INSERT INTO likes_comment (likeid,commentid,userid) VALUES(\'{}\',\'{}\',\'{}\')'.
                     format(likeid,commentid,userid)):
            self._CommitChange()
            return True
        return False
    #删除对某个评论的赞
    def delLikesComment(self,commentid,userid):
        if self._ExecuteSQL('DELETE FROM likes_comment WHERE commentid=\'{}\' and userid=\'{}\''.format(commentid,userid)):
            self._CommitChange()
            return True
        return False
    #获取某个用户对评论的所有的赞
    def getLikesCommentByUser(self,userid):
        self._ExecuteSQL('SELECT * FROM likes_comment WHERE userid=\'{}\''.format(userid))
        return self._FetchAll()






