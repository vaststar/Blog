import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Divider, Spin, Pagination} from 'antd'

import SingleComment from './singleCommentComponent'
import TextEdit from './textEdit'
import {get,post} from '../../Common/RequestREST'

const ARTICLE_ID = 'articleid';
class Comments extends Component {
    state={comments:[],pageNumber:1,pageSize:4,totalNumber:1,isLoadingMore:false}
    recursionNode=(data)=>{
        return <ul>
        {
            data.map((node,index)=>(
                <div key={node.commentid}>
                    <SingleComment comment={node} refreshFunc={this.jumpToEndComments}/>
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
                <div className="commentsTitle"> 共{this.state.totalNumber}条评论</div>
                <div>{this.recursionNode(this.state.comments)}</div>
                <div className="comment-pagination">
                    <Pagination showQuickJumper defaultCurrent={1} defaultPageSize={this.state.pageSize} current={this.state.pageNumber}
                    pageSize={this.state.pageSize} total={this.state.totalNumber} 
                    onChange={this.pageJump}></Pagination>
                </div>
                {this.state.isLoadingMore?<Spin/>:null}
                {this.props.valid?<Divider/>:null}
                {this.props.valid?<TextEdit submitfunc={this.submitComment}></TextEdit>:null}
            </div>
        );
    }
    jumpToEndComments=()=>{
        this.updateComment(-1);
    }
    componentDidMount(){
        this.updateComment(0);
    }
    updateComment=(jumpTo)=>{//-1到最后一页，0到当前页，其他到指定页
        this.setState({isLoadingMore:true})
        get(this.props.commentUrl+"/counts/topcomments/"+this.props[ARTICLE_ID]).then(response=>response.json()).then(result=>{
            if(result.status){
                this.setState({totalNumber:parseInt(result.data)})
                let page=this.state.pageNumber
                if(-1===jumpTo){
                    page=Math.ceil(parseInt(result.data)/this.state.pageSize)
                    this.setState({pageNumber:page})
                }else if(0!==jumpTo){
                    page=jumpTo
                }
                get(this.props.commentUrl+"/"+this.props[ARTICLE_ID]+"?pageNumber="+page+"&&pageSize="+this.state.pageSize).then(response=>response.json()).then(result=>{
                    if(result.status){
                        //读取所有文章基本信息
                        this.setState({comments:result.data});
                    }
                    this.setState({isLoadingMore:false});
                }).catch(function (e) {
                    this.setState({isLoadingMore:false});
                    console.log("fetch all comments fail", e);
                });
            }else{
                console.log("fetch comments counts fail")
            }
        }).catch(e=>console.log("fetch comments counts fail",e))
    }
    pageJump=(page, pageSize)=>{
        this.setState({pageNumber:page});
        this.updateComment(page);
    }
    submitComment=(str)=>{
        //提交评论
        let body = {'articleid':this.props[ARTICLE_ID],'comment':str,'refid':""}
        post(this.props.commentUrl+"/",body).then(result=>{
            if(result.status)
            {
                this.jumpToEndComments()
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