import abc
from .BaseDB import BaseDB

class OperateDB(BaseDB,metaclass=abc.ABCMeta):
    '''中间层业务相关的operate，可能变化的数据库相关操作放在这里'''
    def __init__(self,datebase,sqlfiles=None):
        BaseDB.__init__(self,datebase,sqlfiles)

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

#文章表
    #获取所有文章
    def getAllArticle(self):
        self._ExecuteSQL('SELECT * FROM article_base')
        return self._FetchAll()
    #根据id获取文章
    def getArticleById(self,artid):
        self._ExecuteSQL('SELECT * FROM article_base WHERE articleid=\'{}\''.format(artid))
        return self._FetchOne()
    #根据文章id获取所有评论
    def getCommentByArticleId(self,artid):
        self._ExecuteSQL('SELECT * FROM comments WHERE articleid=\'{}\''.format(artid))
        return self._FetchAll()
    #根据文章id获取所有顶级评论数量
    def getCommentNumberByArticleId(self,artid):
        self._ExecuteSQL('SELECT COUNT(*) FROM comments WHERE articleid=\'{}\' AND refid=\'\''.format(artid))
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
        if self._ExecuteSQL('UPDATE article_base SET title=\'{}\',breif=\'{}\',keywords=\'{}\',coverurl=\'{}\') WHERE articleid=\'{}\')'.
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

    #添加一个评论
    def addComment(self,articleid,userid,uptime,comments,refid):
        commentid = BaseDB.GenerateUUID()
        if self._ExecuteSQL('INSERT INTO comments (commentid,articleid,userid,uptime,comments,refid) VALUES(\'{}\',\'{}\',\'{}\',\'{}\',\'{}\',\'{}\')'.
                         format(commentid,articleid,userid,uptime,comments,refid)):
            self._CommitChange()
            return commentid
        return None
    #根据评论id。获取子评论数量
    def getChildNumberByCommentId(self,commentid):
        self._ExecuteSQL('SELECT COUNT(*) FROM comments WHERE refid=\'{}\''.format(commentid))
        return self._FetchAll()
    #删除一个评论
    def delComment(self,commentid):
        if self._ExecuteSQL('DELETE FROM comments WHERE commentid=\'{}\' and refid=\'{}\''.format(commentid,commentid)):
            self._CommitChange()
            return True
        return False


