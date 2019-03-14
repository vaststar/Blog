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
        if blogDB.addBrowserArticle(articleid,userid,ip):
            return Common.trueReturn(True,'browser ok')
        return Common.falseReturn(None,'browser false')

    @staticmethod
    def delArticleBrowserByUser(articleid,userid):
        if blogDB.delBroswerArticleHistoryByUser(articleid,userid):
            return Common.trueReturn(True,'del ok')
        return Common.falseReturn(None,'del false')
