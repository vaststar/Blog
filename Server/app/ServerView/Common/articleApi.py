import datetime
from app.ServerDB import blogDB
from app.ServerView.Common import Common
from app.ServerLog import logger

class ArticleApi(object):
    '''定义一些用户相关的接口，给视图调用，减少视图工作量'''
    @staticmethod
    def getAllArticle():
        result = []
        allArt = blogDB.getAllArticle()
        if allArt is None :
            return Common.falseReturn(None,'query wrong')
        if len(allArt)==0:
            return Common.trueReturn(result, 'query ok')
        for k, v in enumerate(allArt):
            result.append(dict(zip(("articleid", "userid", "title", "breif", "keywords","coverurl","uptime", "bodyurl"), v)))
        return Common.trueReturn(result, 'query ok')

    @staticmethod
    def getArticlePagnation(pageNumber=1,pagesize=1):
        result=[]
        art = blogDB.getArticleLimit(pagesize,(pageNumber-1)*pagesize)
        if art is None:
            return Common.falseReturn(None,'query wrong')
        if len(art) == 0:
            return Common.trueReturn(result,'query ok')
        for k,v in enumerate(art):
            result.append(dict(zip(("articleid", "userid", "title", "breif", "keywords","coverurl","uptime", "bodyurl"), v)))
        return Common.trueReturn(result, 'query ok')

    @staticmethod
    def getArticlePagnationByUserid(userid,pageNumber=1,pageSize=1):
        result=[]
        art = blogDB.getArticleLimitByUserid(userid,pageSize,(pageNumber-1)*pageSize)
        if art is None:
            return Common.falseReturn(None,'query wrong')
        if len(art) == 0:
            return Common.trueReturn(result,'query ok')
        for k,v in enumerate(art):
            result.append(dict(zip(("articleid", "userid", "title", "breif", "keywords","coverurl","uptime", "bodyurl"), v)))
        return Common.trueReturn(result, 'query ok')

    @staticmethod
    def getArticlePagnationByUsername(username,pageNumber=1,pageSize=1):
        result=[]
        art = blogDB.getArticleLimitByUsername(username, pageSize, (pageNumber - 1) * pageSize)
        if art is None:
            return Common.falseReturn(None,'query wrong')
        if len(art) == 0:
            return Common.trueReturn(result,'query ok')
        for k,v in enumerate(art):
            result.append(dict(zip(("articleid", "userid", "title", "breif", "keywords","coverurl","uptime", "bodyurl"), v)))
        return Common.trueReturn(result, 'query ok')

    @staticmethod
    def getArticleBaseByID(artid):
        blogbase =blogDB.getArticleById(artid)
        if blogbase is not None:
            result = dict(zip(("articleid", "userid", "title", "breif", "keywords","coverurl","uptime", "bodyurl"), blogbase))
            return Common.trueReturn(result,'query ok')
        return Common.falseReturn(None,'not found')

    @staticmethod
    def postArticle(userid,title,brief,keys,coverurl,bodyurl):
        artid = blogDB.addArticle(userid,title,brief,keys,coverurl,datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),bodyurl)
        if artid is not None:
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
        if res is not None :
            if len(res) == 0:
                return Common.trueReturn(0,'query ok')
            else:
                return Common.trueReturn(res[0],'query ok')
        return Common.falseReturn(None,'query false')
    @staticmethod
    def getArticleCountByUserId(userid):
        res = blogDB.getArticleCountByUserid(userid)
        if res is not None:
            if len(res) == 0:
                return Common.trueReturn(0,'query ok')
            else:
                return Common.trueReturn(res[0],'query ok')
        return Common.falseReturn(None,'query false')
    @staticmethod
    def getArticleCountByUsername(username):
        res = blogDB.getArticleCountByUsername(username)
        if not res is None:
            if len(res) == 0:
                return Common.trueReturn(0,'query ok')
            else:
                return Common.trueReturn(res[0],'query ok')
        return Common.falseReturn(None,'query false')

    @staticmethod
    def getIsSelfArticle(userid,articleid):
        article = blogDB.getArticleById(articleid)
        if article is not None:
            if article[1] == userid:
                return Common.trueReturn(True,'yes')
            else:
                return Common.falseReturn(False,'not mine')
        return Common.falseReturn(False,'no')