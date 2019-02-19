import React, { Component } from 'react'
import PropTypes from 'prop-types'


const COMMENT_PROPS = 'comments';
class CommentComponent extends Component {
    dateTranfer=(datestr)=>{
        let ymd = datestr.split(' ')[0]
        let y=ymd.split('-')[0]
        let m=ymd.split("-")[1]
        let d=ymd.split('-')[2]
        return y+'年'+m+'月'+d+'日'
    }
    render(){
        return (
            <div className='commentscomponent'>
                <div>{this.props.comments[0].articleid}</div>
            </div>
        );
    }
}

// 类型检查，需要传入 userName,password,remember以及回调函数
CommentComponent.propTypes={
    [COMMENT_PROPS]:PropTypes.array.isRequired
  };
export default CommentComponent