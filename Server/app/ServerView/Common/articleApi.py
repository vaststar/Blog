import datetime
from app.ServerDB import blogDB
from app.ServerView.Common import Common

class ArticleApi(object):
    '''定义一些用户相关的接口，给视图调用，减少视图工作量'''
    @staticmethod
    def getAllArticle():
        result = []
        for k, v in enumerate(blogDB.getAllArticle()):
            result.append(dict(zip(("articleid", "userid", "title", "breif", "keywords","coverurl","uptime", "bodyurl"), v)))
        return Common.trueReturn(result, 'query ok')

    @staticmethod
    def getArticlePagnation(pageNumber=1,pagesize=1):
        result=[]
        for k,v in enumerate(blogDB.getArticleLimit(pagesize,(pageNumber-1)*pagesize)):
            print('ggggg',v)
            result.append(dict(zip(("articleid", "userid", "title", "breif", "keywords","coverurl","uptime", "bodyurl"), v)))
        return Common.trueReturn(result, 'query ok')

    @staticmethod
    def getArticlePagnationByUserid(userid,pageNumber=1,pageSize=1):
        result=[]
        for k,v in enumerate(blogDB.getArticleLimitByUserid(userid,pageSize,(pageNumber-1)*pageSize)):
            result.append(dict(zip(("articleid", "userid", "title", "breif", "keywords","coverurl","uptime", "bodyurl"), v)))
        return Common.trueReturn(result, 'query ok')

    @staticmethod
    def getArticlePagnationByUsername(username,pageNumber=1,pageSize=1):
        result=[]
        for k,v in enumerate(blogDB.getArticleLimitByUsername(username,pageSize,(pageNumber-1)*pageSize)):
            result.append(dict(zip(("articleid", "userid", "title", "breif", "keywords","coverurl","uptime", "bodyurl"), v)))
        return Common.trueReturn(result, 'query ok')

    @staticmethod
    def getArticleBaseByID(artid):
        blogbase =blogDB.getArticleById(artid)
        if not blogbase is None:
            result = dict(zip(("articleid", "userid", "title", "breif", "keywords","coverurl","uptime", "bodyurl"), blogbase))
            return Common.trueReturn(result,'query ok')
        return Common.falseReturn(None,'not found')

    @staticmethod
    def postArticle(userid,title,brief,keys,coverurl,bodyurl):
        artid = blogDB.addArticle(userid,title,brief,keys,coverurl,datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),bodyurl)
        if not artid is None:
            return Common.trueReturn({"articleid":artid},'add article ok')
        return Common.falseReturn(None,'add article false')

    @staticmethod
    def updateArticle(articleid,title,brief,keys,coverurl):
        if blogDB.updateArticle(articleid,title,brief,keys,coverurl):
            return Common.trueReturn({"articleid":articleid},'change ok')
        return Common.falseReturn(None,'change false')

    @staticmethod
    def deleteArticle(articleid):
        if blogDB.delArticle(articleid):
            return Common.trueReturn({"articleid": articleid}, 'delete ok')
        return Common.falseReturn(None, 'delte false')

    @staticmethod
    def getAllArticleCount():
        res = blogDB.getArticleCount()
        if not res is None:
            return Common.trueReturn(res[0],'query ok')
        return Common.falseReturn(None,'query false')
    @staticmethod
    def getArticleCountByUserId(userid):
        res = blogDB.getArticleCountByUserid(userid)
        if not res is None:
            return Common.trueReturn(res[0],'query ok')
        return Common.falseReturn(None,'query false')
    @staticmethod
    def getArticleCountByUsername(username):
        res = blogDB.getArticleCountByUsername(username)
        if not res is None:
            return Common.trueReturn(res[0],'query ok')
        return Common.falseReturn(None,'query false')

    @staticmethod
    def getIsSelfArticle(userid,articleid):
        article = blogDB.getArticleById(articleid)
        if not article is None:
            if article[1] == userid:
                return Common.trueReturn(True,'yes')
        return Common.falseReturn(None,'no')