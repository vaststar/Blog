import os,datetime
from werkzeug.utils import secure_filename

def trueReturn(data, msg):
    return {
        "status": True,
        "data": data,
        "msg": msg
    }

def falseReturn(data, msg):
    return {
        "status": False,
        "data": data,
        "msg": msg
    }

def generateFilePath(fileName):
    '''生成文件路径，年/月/日/带时间戳的文件名'''
    dayTimeDirPath = datetime.datetime.now().strftime('%Y/%m/%d')
    timeFileName = datetime.datetime.now().strftime('%Y_%m_%d_%H_%M_%S_%f_')+secure_filename(fileName)
    return os.path.join(dayTimeDirPath,timeFileName).replace("\\\\","/")

def makeSureFilePath(filePath):
    # 将文件路径分割出来
    file_dir = os.path.split(filePath)[0]
    # 判断文件路径是否存在，如果不存在，则创建，此处是创建多级目录
    if not os.path.isdir(file_dir):
        os.makedirs(file_dir)
    with open(filePath, 'w', encoding='utf-8') as f:
        pass

def saveFile(filePath,content):
    makeSureFilePath(filePath)
    with open(filePath, 'w', encoding='utf-8') as f:
        try:
            f.write(content)
            return True
        except Exception as e:
            return False
    return False