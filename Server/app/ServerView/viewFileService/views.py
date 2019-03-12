from flask import request,send_from_directory,jsonify
import os
from . import file_blue

from app.ServerConfig import config
from app.ServerView.Common import Common
from app.ServerView.Authority import Authority

@file_blue.route("/<path:filePath>",methods=["GET"])
def get_file_Services(filePath):
    '''提供下载功能'''
    file = os.path.join(config.STATIC_FILE_PATH, filePath)
    if os.path.isfile(file):
        return send_from_directory( os.path.dirname(file), os.path.basename(file), as_attachment=True)
    else:
        return jsonify(Common.falseReturn(None,'not find file'))

@file_blue.route("/<fileName>",methods=["POST"])
# @Authority.login_required
def post_file_Services(fileName):
    '''上传功能'''
    refPath = Common.generateFilePath(fileName)
    uploadPath = os.path.join(config.STATIC_FILE_PATH, refPath)
    if 'file' in request.files:
        file = request.files['file']
        Common.makeSureFilePath(uploadPath)
        try:
            file.save(uploadPath)
            return jsonify(Common.trueReturn({'filepath':refPath},'up ok'))
        except Exception as e:
            return jsonify(Common.falseReturn(e,'unknown error'))
    elif request.get_json() and 'file' in request.get_json():
        params = request.get_json()
        Common.makeSureFilePath(uploadPath)
        with open(uploadPath,'w', encoding='utf-8') as f:
            try:
                f.write(params['file'])
                return jsonify(Common.trueReturn({'filepath':refPath},'up ok'))
            except Exception as e:
                return jsonify(Common.falseReturn(e, 'unknown error'))
        return jsonify(Common.falseReturn(None,'up fail'))
    else:
        return jsonify(Common.falseReturn(None,'No file part'))