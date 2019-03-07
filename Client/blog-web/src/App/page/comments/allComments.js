import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Divider} from 'antd'

import SingleComment from './singleCommentComponent'
import TextEdit from './textEdit'
import {get,post} from '../../Common/RequestREST'

const ARTICLE_ID = 'articleid';
class Comments extends Component {
    state={comments:[]}
    recursionNode=(data)=>{
        return <ul>
        {
            data.map((node,index)=>(
                <div key={index}>
                    <SingleComment comment={node} refreshFunc={this.refreshComments}/>
                    {
                        node.soncomment && node.soncomment.length>0?this.recursionNode(node.soncomment):null
                    }
                </div>
            ))
        }
        </ul>
    }
    render(){
        return (
            <div className='commentscomponent'>
                <div className="commentsTitle"> {this.state.comments.length}条评论</div>
                <div>{this.recursionNode(this.state.comments)}</div>
                {this.props.valid?<Divider/>:null}
                {this.props.valid?<TextEdit submitfunc={this.submitComment}></TextEdit>:null}
            </div>
        );
    }
    refreshComments=()=>{
        //根据文章id获取其所有评论，已经为树状结构，
        get(this.props.articleUrl+"/comments/"+this.props[ARTICLE_ID]).then(response => response.json()).then(result=>{
            this.setState({comments:result.data})
        }).catch(function (e){
            console.log(e)
        });
    }
    componentDidMount(){
        this.refreshComments()
    }
    submitComment=(str)=>{
        //提交评论
        let body = {'articleid':this.props[ARTICLE_ID],'comment':str,'refid':""}
        post(this.props.articleUrl+"/comments/",body).then(result=>{
            if(result.status)
            {
                this.refreshComments();
            }
        }).catch(function(e){
            console.log(e)
        });
    }
}

// 类型检查，需要传入 articleid
Comments.propTypes={
    [ARTICLE_ID]:PropTypes.string.isRequired
};
const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
export default connect(mapStateToProps)(Comments)