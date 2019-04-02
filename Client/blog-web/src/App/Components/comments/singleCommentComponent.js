import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import {Row,Col,Icon,Avatar,Divider,message,Popconfirm,Tooltip,Input} from 'antd'

import {get,post,del,put} from '../../Common/RequestREST'
import TextEdit from './textEdit'

const COMMENT_PROPS = 'comment';
const COMMENT_ADDRESULT_FUNC='addResultFunc';
const COMMENT_DELRESULT_FUNC="delResultFunc";
class CommentComponent extends Component {
    state={username:"",useravatar:"",replyshow:false,childNumber:0,likeNumber:0,
           personalLike:false,personalArticle:false,personalComment:false,
           comment: null,inputVisible: false,inputValue: ''
          }

     showCommentInput = () => {
      let state = this.state;
      state.inputVisible = true;
      state.inputValue = this.state.comment;
      this.setState(state, () => this.tagsInput.focus());
    }
    
    handleCommentInputChange = (e) => {
        let state = this.state;
        state.inputValue = e.target.value;
        this.setState(state);
    }
    
    handleCommentInputConfirm = () => {
      const state = this.state;
      const inputValue = state.inputValue;
      state.comment = inputValue;
      state.inputValue="";
      state.inputVisible=false;
      put(this.props.commentUrl+"/"+this.props[COMMENT_PROPS].commentid,{'comment':inputValue}).then(response => response.json()).then(result => {
          // 在此处写获取数据之后的处理逻辑
          if(result.status){
              this.setState(state);              
          }else{
              message.error("修改评论失败")
          }
        }) 
    }
    saveCommentInputRef= input => this.tagsInput = input
    render(){
        return (
            <div className='singlecomment' onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} >
            {/* <hr className="commetnHline"/> */}
            <Divider/>
                <Row  type="flex" justify="start" align='middle' gutter={8}>
                    <Col span={2}>
                        <Avatar size="large" icon="user" src={this.state.useravatar} /> 
                    </Col>
                    <Col span={20}>
                        <Row>{this.state.username}</Row>
                        <Row>{moment(this.props[COMMENT_PROPS].uptime,'YYYY-MM-DD HH:mm:ss').fromNow()}</Row>
                    </Col>
                    <Col/>
                </Row>
                <Row>
                {!this.state.inputVisible &&<div className="commentBody">{this.state.comment} </div>}
                {this.state.inputVisible && (
                  <Input
                    ref={this.saveCommentInputRef}
                    type="text"
                    value={this.state.inputValue}
                    onChange={this.handleCommentInputChange}
                    onBlur={this.handleCommentInputConfirm}
                    onPressEnter={this.handleCommentInputConfirm}
                  />
                )}
                </Row>
                <Row  type="flex" justify="start" align='bottom' gutter={8} >
                    <Col span={1}>
                        {this.props.valid?
                        <div className="commentFoot" onClick={this.clickReply}> <Icon type="message" /> {this.state.childNumber}</div>:null
                        }
                    </Col>
                    <Col span={2}>
                    <div className="commentFoot" onClick={this.likeItClick}>
                    {this.state.personalLike?<Icon type="like" theme="twoTone" twoToneColor="#ff0000"/>: <Icon type="like" />} {this.state.likeNumber}</div>
                    </Col>
                    {
                        (!this.state.inputVisible && this.state.personalComment)&&this.state.mouseIn?<Tooltip placement="bottom" title="编辑评论"><Col span={1}>
                        <div onClick={this.showCommentInput} className="edit_comment_com"><Icon type="edit" /></div>
                        </Col></Tooltip>:null
                    }
                    {
                        (this.state.personalArticle || this.state.personalComment)&&this.state.mouseIn?<Tooltip placement="bottom" title="删除评论"><Col span={1}>
                        <Popconfirm title="确定删除该评论么?" onConfirm={this.deleteClick} okText="是" cancelText="否"><Icon type="delete" /></Popconfirm>
                        </Col></Tooltip>:null
                    }
                    <Col></Col>
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
    mouseEnter=()=>{
        this.setState({mouseIn:true});
    }
    mouseLeave=()=>{
        this.setState({mouseIn:false});
    }
    componentDidMount(){
        this.setState({comment:this.props[COMMENT_PROPS].comments})
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
        this.personalArticleJudge()
        this.personalCommentJudge()
    }
    submitComment=(str)=>{
        //提交评论
        let body = {'articleid':this.props[COMMENT_PROPS].articleid,'comment':str,'refid':this.props[COMMENT_PROPS].commentid}
        post(this.props.commentUrl+"/",body).then(result=>{
            if(result.status)
            {
                this.clickReply();
                this.props[COMMENT_ADDRESULT_FUNC]();
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
    //判断是否是自己的文章
    personalArticleJudge=()=>{
        get(this.props.articleUrl+"/belongs/"+this.props[COMMENT_PROPS].articleid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({personalArticle:result.data})
            }
        })
    }
    //判断是否是自己的评论
    personalCommentJudge=()=>{
        get(this.props.commentUrl+"/belongs/"+this.props[COMMENT_PROPS].commentid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({personalComment:result.data})
            }
        })
    }
    //删除评论
    deleteClick=()=>{
        del(this.props.commentUrl+"/"+this.props[COMMENT_PROPS].commentid).then(response => response.json()).then(result=>{
            if(result.status){
                this.props[COMMENT_DELRESULT_FUNC]()
            }else{
                message.error("删除评论失败")
            }
        })
    }
}

// 类型检查
CommentComponent.propTypes={
    [COMMENT_PROPS]:PropTypes.object.isRequired,
    [COMMENT_ADDRESULT_FUNC]:PropTypes.func.isRequired,
    [COMMENT_DELRESULT_FUNC]:PropTypes.func.isRequired
  };
  
const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
export default connect(mapStateToProps)(CommentComponent)