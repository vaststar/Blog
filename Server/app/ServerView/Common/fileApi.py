import os,datetime
from werkzeug.utils import secure_filename
from app.ServerView.Common import Common
from app.ServerLog import logger

class FileApi(object):
    @staticmethod
    def generateFilePath(fileName,prefix=""):
        '''生成文件路径，年/月/日/带时间戳的文件名'''
        dayTimeDirPath = datetime.datetime.now().strftime('%Y/%m/%d')
        timeFileName = datetime.datetime.now().strftime('%Y_%m_%d_%H_%M_%S_%f_')+secure_filename(fileName)
        return os.path.join(prefix,dayTimeDirPath,timeFileName).replace("\\","/")

    @staticmethod
    def makeSureFilePath(filePath):
        # 将文件路径分割出来
        file_dir = os.path.split(filePath)[0]
        # 判断文件路径是否存在，如果不存在，则创建，此处是创建多级目录
        if not os.path.isdir(file_dir):
            os.makedirs(file_dir)
        with open(filePath, 'w', encoding='utf-8') as f:
            pass

    @staticmethod
    def saveFile(filePath,content):
        FileApi.makeSureFilePath(filePath)
        with open(filePath, 'w', encoding='utf-8') as f:
            try:
                f.write(content)
                return Common.trueReturn(True, 'save ok')
            except Exception as e:
                return Common.falseReturn(e, 'unknown error')
        return Common.falseReturn(None, 'open error'+filePath)

    @staticmethod
    def saveRequestFileWithPath(filePath,req):
        print(filePath,req)
        if 'file' in req.files:
            file = req.files['file']
            FileApi.makeSureFilePath(filePath)
            try:
                file.save(filePath)
                return Common.trueReturn(True, 'up ok')
            except Exception as e:
                return Common.falseReturn(e, 'unknown error')
            return Common.falseReturn(None,'unknown error')
        elif req.get_json() and 'file' in req.get_json():
            params = req.get_json()
            FileApi.makeSureFilePath(filePath)
            return FileApi.saveFile(filePath,params['file'])
        else:
            return Common.falseReturn(None, 'No file part')