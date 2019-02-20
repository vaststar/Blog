import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import SingleComment from './singleCommentComponent'
import {get} from '../../Common/RequestREST'

const COMMENT_PROPS = 'comments';
class Comments extends Component {
    state={comments:[]}
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
                <div>{this.recursionNode(this.state.comments)}</div>
            </div>
        );
    }
    refreshComments=()=>{
        //根据文章id获取其所有评论，已经为树状结构，
        get(this.props.articleUrl+"/comments/"+this.props[COMMENT_PROPS]).then(result=>{
            this.setState({comments:result.data})
        }).catch(function (e){
            console.log(e)
        });
    }
    componentDidMount(){
        this.refreshComments()
    }
}

// 类型检查，需要传入 userName,password,remember以及回调函数
Comments.propTypes={
    [COMMENT_PROPS]:PropTypes.string.isRequired
};
const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
export default connect(mapStateToProps)(Comments)