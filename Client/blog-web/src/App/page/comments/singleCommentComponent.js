import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import {Row,Col,Icon,Avatar,Divider} from 'antd'

import {get,post} from '../../Common/RequestREST'
import TextEdit from './textEdit'

const COMMENT_PROPS = 'comment';
const COMMENT_REFRESH_FUNC='refreshFunc';
class CommentComponent extends Component {
    state={username:"",useravatar:"",replyshow:false,childNumber:0,likeNumber:0}
    render(){
        return (
            <div className='singlecomment'>
            {/* <hr className="commetnHline"/> */}
            <Divider/>
                <Row>
                    <Col span={1}>
                        <Avatar size="large" icon="user" src={this.state.useravatar} /> 
                    </Col>
                    <Col span={23}>
                        <Row>{this.state.username}</Row>
                        <Row>{moment(this.props[COMMENT_PROPS].uptime,'YYYY-MM-DD HH:mm:ss').fromNow()}</Row>
                    </Col>
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
                    <div className="commentFoot" onClick={this.likeIt}><Icon type="like" /> {this.state.likeNumber}</div>
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
            }
        }).catch(function (e) {
            console.log(e);
        });
        //根据userid获取用户头像
        get(this.props.userUrl+"/useravatars/"+this.props[COMMENT_PROPS].userid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({useravatar:"/rest/files/"+result.data})
            }
        }).catch(function (e) {
            console.log(e);
        });

        //根据评论id，获取子评论数量
        get(this.props.articleUrl+"/counts/childcomments/"+this.props[COMMENT_PROPS].commentid).then(response=>response.json()).then(result=>{
            if(result.status){
                this.setState({childNumber:result.data})
            }
        }).catch((e)=>{
            console.log(e)
        })
    }
    submitComment=(str)=>{
        //提交评论
        let body = {'articleid':this.props[COMMENT_PROPS].articleid,'comment':str,'refid':this.props[COMMENT_PROPS].commentid}
        post(this.props.articleUrl+"/comments/",body).then(result=>{
            if(result.status)
            {
                this.clickReply();
                this.props[COMMENT_REFRESH_FUNC]();
                this.setState({childNumber:parseInt(this.state.childNumber)+1})
            }
        }).catch(function(e){
            console.log(e)
        });
    }
    likeIt=()=>{
        //赞
        this.setState({likeNumber:parseInt(this.state.likeNumber)+1})
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