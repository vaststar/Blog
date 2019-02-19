import React, { Component } from 'react'
import PropTypes from 'prop-types'


// const ARTICLE_PROPS = 'article';
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
                <div>comments</div>
            </div>
        );
    }
}

//类型检查，需要传入 userName,password,remember以及回调函数
// CommentComponent.propTypes={
//     [ARTICLE_PROPS]:PropTypes.object.isRequired
//   };
export default CommentComponent