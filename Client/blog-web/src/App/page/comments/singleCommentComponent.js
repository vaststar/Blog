import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'

import {get,post} from '../../Common/RequestREST'
import TextEdit from './textEdit'

const COMMENT_PROPS = 'comment';
const COMMENT_REFRESH_FUNC='refreshFunc';
class CommentComponent extends Component {
    state={username:"",replyshow:false}
    render(){
        console.log('ccccccc',this.props[COMMENT_PROPS])
        return (
            <div className='singlecomment'>
            <hr className="commetnHline"/>
                <span>{this.state.username}</span>
                <span className="commentTime"> {moment(this.props[COMMENT_PROPS].uptime,'YYYY-MM-DD HH:mm:ss').fromNow()}</span>
                <div className="commentDetail">
                {this.props[COMMENT_PROPS].comments} 
                </div>
                <span className="commentFoot"> 赞</span>
                <span className="commentFoot" onClick={this.clickReply}> {this.state.replyshow?"取消回复":"回复"}</span>
                {this.state.replyshow?<TextEdit submitfunc={this.submitComment}></TextEdit>:null}
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
            }
        }).catch(function (e) {
            console.log(e);
        });
    }
    submitComment=(str)=>{
        //提交评论
        let body = {'articleid':this.props[COMMENT_PROPS].articleid,'comment':str,'refid':this.props[COMMENT_PROPS].commentid}
        post(this.props.articleUrl+"/comments/",body).then(result=>{
            if(result.status)
            {
                this.clickReply();
                this.props[COMMENT_REFRESH_FUNC]();
            }
        }).catch(function(e){
            console.log(e)
        });
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