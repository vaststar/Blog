from flask import request,send_from_directory,jsonify

import os
from . import file_blue
from Server.ServerConfig import config
from Server.ServerView.Common import Common

@file_blue.route("/<path:filePath>",methods=["GET","POST"])
def file_Services(filePath):
    if "GET" == request.method:
        '''提供下载功能'''
        file = os.path.join(config.STATIC_FILE_PATH, filePath)
        if os.path.isfile(file):
            return send_from_directory( os.path.dirname(file), os.path.basename(file), as_attachment=True)
        else:
            return jsonify(Common.falseReturn(None,'not find file'))
    elif "POST" == request.method:
        '''上传功能'''
        refPath = Common.generateFilePath(filePath)
        uploadPath = os.path.join(config.STATIC_FILE_PATH, refPath)
        if 'file' in request.files:
            file = request.files['file']
            Common.makeSureFilePath(uploadPath)
            try:
                file.save(uploadPath)
                return jsonify(Common.trueReturn({'filepath':refPath},'up ok'))
            except Exception as e:
                return jsonify(Common.falseReturn(e,'unknown error'))
        elif 'file' in request.get_json():
            params = request.get_json()
            Common.makeSureFilePath(uploadPath)
            with open(uploadPath,'w') as f:
                try:
                    f.write(params['file'])
                    return jsonify(Common.trueReturn({'filepath':refPath},'up ok'))
                except Exception as e:
                    return jsonify(Common.falseReturn(e, 'unknown error'))
            return jsonify(Common.falseReturn(None,'up fail'))
        else:
            return jsonify(Common.falseReturn(None,'No file part'))