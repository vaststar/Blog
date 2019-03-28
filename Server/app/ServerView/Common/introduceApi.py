from app.ServerDB import blogDB
from app.ServerView.Common import Common

class IntroduceApi(object):
    @staticmethod
    def getIntroduceByUserid(userid):
        intro = blogDB.getUserIntroduce(userid)
        if intro is not None:
            result = dict(zip(("userid", "resume", "tags"), intro))
            return Common.trueReturn(result,'query ok')
        return Common.falseReturn(None,'not found')

    @staticmethod
    def postIntroduce(userid,resume,tags):
        if blogDB.addUserIntroduce(userid,resume," ".join(set(tags.split(" ")))):
            return Common.trueReturn(userid,'add introduce ok')
        return Common.falseReturn(None,'insert error')

    @staticmethod
    def changeIntroduce(userid,resume,tags):
        if blogDB.updateUserIntroduce(userid,resume,tags):
            return Common.trueReturn(userid,'update ok')
        return Common.falseReturn(None,'update error')

    @staticmethod
    def changeResume(userid,resume):
        if blogDB.updateUserIntroduceResume(userid,resume):
            return Common.trueReturn(userid,'update ok')
        return Common.falseReturn(None,'update error')

    @staticmethod
    def changeTags(userid,tags):
        if blogDB.updateUserIntroduceTags(userid,tags):
            return Common.trueReturn(userid,'update ok')
        return Common.falseReturn(None,'update error')
