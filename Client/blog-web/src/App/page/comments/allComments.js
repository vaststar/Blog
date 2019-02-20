import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SingleComment from './singleCommentComponent'

const COMMENT_PROPS = 'comments';
class Comments extends Component {
    recursionNode=(data)=>{
        return <ul>{
            data.map((node,index)=>(
                <div key={index}>
                    <SingleComment comment={node}/>
                    {
                        node.soncomment && node.soncomment.length>0?this.recursionNode(node.soncomment):null
                    }
                </div>
            ))
        }</ul>
    }
    render(){
        return (
            <div className='commentscomponent'>
                <div>{this.recursionNode(this.props.comments)}</div>
            </div>
        );
    }
}

// 类型检查，需要传入 userName,password,remember以及回调函数
Comments.propTypes={
    [COMMENT_PROPS]:PropTypes.array.isRequired
};
export default Comments