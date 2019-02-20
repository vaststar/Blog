import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'

import {get} from '../../Common/RequestREST'

const COMMENT_PROPS = 'comment';
class CommentComponent extends Component {
    state={username:""}
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
                <span>赞</span>
                <span>回复</span>
            </div>
        );
    }
    componentDidMount(){
        //根据userid获取用户名称
        get(this.props.userUrl+"/usernames/"+this.props[COMMENT_PROPS].userid).then(result=>{
            if(result.status){
                this.setState({username:result.data})
            }else{
            }
        }).catch(function (e) {
            console.log(e);
        });
    }
}

// 类型检查，需要传入 userName,password,remember以及回调函数
CommentComponent.propTypes={
    [COMMENT_PROPS]:PropTypes.object.isRequired
  };
  
const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
export default connect(mapStateToProps)(CommentComponent)