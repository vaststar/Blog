from app.ServerDB import blogDB
from app.ServerView.Common import Common

class BrowserApi(object):
    @staticmethod
    def getArticleBrowser(articleid):
        res = blogDB.getBrowserNumberByArticleId(articleid)
        if not res is None:
            return Common.trueReturn(res[0], 'query ok')
        return Common.falseReturn(None, 'query false')

    @staticmethod
    def postArticleBrowser(articleid,userid,ip):
        if BrowserApi.checkAlreadyBrowserArticle(articleid,userid,ip)['data']:
            return Common.falseReturn(None,'already in')
        if blogDB.addBrowserArticle(articleid,userid,ip):
            return Common.trueReturn(True,'browser ok')
        return Common.falseReturn(None,'browser false')

    @staticmethod
    def delArticleBrowserByUser(articleid,userid):
        if blogDB.delBroswerArticleHistoryByUser(articleid,userid):
            return Common.trueReturn(True,'del ok')
        return Common.falseReturn(None,'del false')

    @staticmethod
    def checkAlreadyBrowserArticle(articleid,userid,ip):
        res = blogDB.getBrowserArticleByIp(articleid,ip)
        for k,v in enumerate(res):
            if v[2] == userid:
                return Common.trueReturn(True,'already in')
        return Common.falseReturn(None,'not in')
