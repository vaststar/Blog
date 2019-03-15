from flask import request,send_from_directory,jsonify,make_response
import os
from . import file_blue

from app.ServerConfig import config
from app.ServerView.Common import Common
from app.ServerView.Common.fileApi import FileApi

from app.ServerView.Authority import Authority

@file_blue.route("/<path:filePath>",methods=["GET"])
def get_file_Services(filePath):
    '''提供下载功能'''
    file = os.path.join(config.STATIC_FILE_PATH, filePath)
    if os.path.isfile(file):
        response = make_response(send_from_directory( os.path.dirname(file), os.path.basename(file), as_attachment=True))
        response.headers['Cache-Control']="no-cache"
        response.headers['Expires'] = "-1"
        response.headers['Pragma'] = "no-cache"
        return response
    else:
        return jsonify(Common.falseReturn(None,'not find file'))

@file_blue.route("/articles/pictures/<fileName>",methods=["POST"])
@Authority.login_required
def post_article_file_Services(fileName):
    userid = Authority.get_user_id()
    if not userid :
        return jsonify(Common.falseReturn(None,'user not find'))
    '''上传功能'''
    refPath = FileApi.generateFilePath(fileName,"articles/pictures/"+userid)
    uploadPath = os.path.join(config.STATIC_FILE_PATH, refPath)

    saveResult = FileApi.saveRequestFileWithPath(uploadPath,request)
    if saveResult['status']:
        return jsonify(Common.trueReturn({'filepath':refPath},'up ok'))
    else:
        return jsonify(saveResult)

@file_blue.route("/avatars/<fileName>",methods=["POST"])
def post_avatar_file_Services(fileName):
    '''上传功能'''
    refPath = FileApi.generateFilePath(fileName,"avatars")
    uploadPath = os.path.join(config.STATIC_FILE_PATH, refPath)

    saveResult = FileApi.saveRequestFileWithPath(uploadPath,request)
    if saveResult['status']:
        return jsonify(Common.trueReturn({'filepath':refPath},'up ok'))
    else:
        return jsonify(saveResult)
