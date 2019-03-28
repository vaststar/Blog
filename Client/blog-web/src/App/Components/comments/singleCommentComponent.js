import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import {Row,Col,Icon,Avatar,Divider,message} from 'antd'

import {get,post,del} from '../../Common/RequestREST'
import TextEdit from './textEdit'

const COMMENT_PROPS = 'comment';
const COMMENT_REFRESH_FUNC='refreshFunc';
class CommentComponent extends Component {
    state={username:"",useravatar:"",replyshow:false,childNumber:0,likeNumber:0,personalLike:false}
    render(){
        return (
            <div className='singlecomment'>
            {/* <hr className="commetnHline"/> */}
            <Divider/>
                <Row>
                    <Col span={2}>
                        <Avatar size="large" icon="user" src={this.state.useravatar} /> 
                    </Col>
                    <Col span={10}>
                        <Row>{this.state.username}</Row>
                        <Row>{moment(this.props[COMMENT_PROPS].uptime,'YYYY-MM-DD HH:mm:ss').fromNow()}</Row>
                    </Col>
                    <Col/>
                </Row>
                <Row>
                    <div className="commentBody">{this.props[COMMENT_PROPS].comments} </div>
                </Row>
                <Row>
                    <Col span={1}>
                        {this.props.valid?
                        <div className="commentFoot" onClick={this.clickReply}> <Icon type="message" /> {this.state.childNumber}</div>:null
                        }
                    </Col>
                    <Col span={23}>
                    <div className="commentFoot" onClick={this.likeItClick}>
                    {this.state.personalLike?<Icon type="like" theme="twoTone" twoToneColor="#ff0000"/>: <Icon type="like" />} {this.state.likeNumber}</div>
                    </Col>
                </Row>
                <Row>
                {this.state.replyshow?<TextEdit submitfunc={this.submitComment}></TextEdit>:null}
                </Row>
            </div>
        );
    }
    clickReply=()=>{
        this.setState({replyshow:!this.state.replyshow})
    }
    componentDidMount(){
        //根据userid获取用户名称
        get(this.props.userUrl+"/usernames/"+this.props[COMMENT_PROPS].userid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({username:result.data})
            }else{
                message.error("获取用户名失败")
            }
        })
        //根据userid获取用户头像
        get(this.props.userUrl+"/avatars/"+this.props[COMMENT_PROPS].userid).then(response => response.json()).then(result=>{
            if(result.status && result.data){
                this.setState({useravatar:"/rest/files/"+result.data})
            }else{
                message.error("未找到用户头像")
            }
        })
        //根据评论id，获取子评论数量
        get(this.props.commentUrl+"/counts/childcomments/"+this.props[COMMENT_PROPS].commentid).then(response=>response.json()).then(result=>{
            if(result.status){
                this.setState({childNumber:result.data})
            }else{
                message.error("获取子评论数量失败")
            }
        })
        //判断是否是自己喜欢的
        this.personalLikeCommentJudge()
        this.resfreshLikesNumbers()

    }
    submitComment=(str)=>{
        //提交评论
        let body = {'articleid':this.props[COMMENT_PROPS].articleid,'comment':str,'refid':this.props[COMMENT_PROPS].commentid}
        post(this.props.commentUrl+"/",body).then(result=>{
            if(result.status)
            {
                this.clickReply();
                this.props[COMMENT_REFRESH_FUNC]();
                this.setState({childNumber:parseInt(this.state.childNumber)+1})
            }else{
                message.error("提交评论失败")
            }
        })
    }
    //判断是否是自己喜欢的
    personalLikeCommentJudge=()=>{
        //判断是否是自己喜欢的
        get(this.props.likeUrl+"/belongs/comments/"+this.props[COMMENT_PROPS].commentid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({personalLike:result.data})
            }
        })
    }
    //获取喜欢数量
    resfreshLikesNumbers=()=>{
        get(this.props.likeUrl+"/comments/"+this.props[COMMENT_PROPS].commentid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({likeNumber:result.data})
            }else{
                message.error("获取评论点赞数量失败")
            }
        })
    }
    //点击喜欢按钮
    likeItClick=()=>{
        if(this.state.personalLike){
            //删除该文章的喜欢记录
            del(this.props.likeUrl+"/comments/"+this.props[COMMENT_PROPS].commentid).then(response => response.json()).then(result=>{
                if(result.status){
                    this.setState({personalLike:false})
                    this.resfreshLikesNumbers()
                }else{
                    message.error("删除评论点赞失败")
                }
            })
        }else{
            post(this.props.likeUrl+"/comments/",{'commentid':this.props[COMMENT_PROPS].commentid}).then(response => response.json()).then(result=>{
                if(result.status){
                    this.setState({personalLike:true})
                    this.resfreshLikesNumbers()
                }else{
                    message.error("点赞失败")
                }
            })
        }
    }
}

// 类型检查
CommentComponent.propTypes={
    [COMMENT_PROPS]:PropTypes.object.isRequired,
    [COMMENT_REFRESH_FUNC]:PropTypes.func.isRequired
  };
  
const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
export default connect(mapStateToProps)(CommentComponent)