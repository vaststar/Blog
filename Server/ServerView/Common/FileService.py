from flask import request,send_from_directory,jsonify
from werkzeug.utils import secure_filename
import os
from . import file_blue
from Server.ServerConfig import config
from Server.ServerView.Common import Common

@file_blue.route("/<path:filePath>",methods=["GET","POST"])
def send_Image(filePath):
    if "GET" == request.method:
        '''提供下载功能'''
        return send_from_directory(config.STATIC_FILE_PATH, filePath, as_attachment=True)
    elif "POST" == request.method:
        '''上传功能'''
        if 'file' in request.files:
            file = request.files['file']
            uploadPath = os.path.join(config.STATIC_FILE_PATH, file.filename)
            file.save(uploadPath)
            return jsonify(Common.trueReturn(None,'up ok'))
        elif 'file' in request.get_json():
            params = request.get_json()
            uploadPath = os.path.join(config.STATIC_FILE_PATH, params['url'])
            # 将文件路径分割出来
            file_dir = os.path.split(uploadPath )[0]
            #判断文件路径是否存在，如果不存在，则创建，此处是创建多级目录
            if not os.path.isdir(file_dir):
                os.makedirs(file_dir)
            with open(os.path.join(config.STATIC_FILE_PATH, params['url']), 'w') as f:
                pass
            with open(os.path.join(config.STATIC_FILE_PATH, params['url']),'r+') as f:
                f.write(params['file'])
                return jsonify()
            return Common.falseReturn(None,'up fail')
        else:
            return jsonify(Common.falseReturn(None,'No file part'))