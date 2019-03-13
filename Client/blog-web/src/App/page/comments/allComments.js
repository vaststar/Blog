import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Divider, Spin, Pagination} from 'antd'

import SingleComment from './singleCommentComponent'
import TextEdit from './textEdit'
import {get,post} from '../../Common/RequestREST'

const ARTICLE_ID = 'articleid';
class Comments extends Component {
    state={comments:[],pageNumber:1,pageSize:2,totalNumber:1,isLoadingMore:false}
    recursionNode=(data)=>{
        return <ul>
        {
            data.map((node,index)=>(
                <div key={index}>
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
                <div className="commentsTitle"> {this.state.comments.length}条评论</div>
                <div>{this.recursionNode(this.state.comments)}</div>
                <div className="comment-pagination">
                    <Pagination showQuickJumper defaultCurrent={1} defaultPageSize={this.state.pageSize}
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
        this.updateTotalPage();
        this.loadComment(this.state.pageNumber,this.state.pageSize);
    }
    componentDidMount(){
        this.updateTotalPage();
        this.loadComment(this.state.pageNumber,this.state.pageSize);
    }
    updateTotalPage=()=>{
        get(this.props.articleUrl+"/counts/topcomments/"+this.props[ARTICLE_ID]).then(response=>response.json()).then(result=>{
            if(result.status){
                this.setState({totalNumber:parseInt(result.data)})
            }else{
                console.log("fetch comments counts fail")
            }
        }).catch(e=>console.log("fetch comments counts fail",e))
    }
    loadComment=(pageNumber,pageSize)=>{
        this.setState({isLoadingMore:true})
        get(this.props.articleUrl+"/comments/"+this.props[ARTICLE_ID]+"?pageNumber="+pageNumber+"&&pageSize="+pageSize).then(response=>response.json()).then(result=>{
            if(result.status){
                //读取所有文章基本信息
                this.setState({comments:result.data});
            }
            this.setState({isLoadingMore:false});
        }).catch(function (e) {
            this.setState({isLoadingMore:false});
            console.log("fetch all comments fail", e);
        });
    }
    pageJump=(page, pageSize)=>{
        this.setState({pageNumber:page});
        this.loadComment(page,pageSize);
    }

    submitComment=(str)=>{
        //提交评论
        let body = {'articleid':this.props[ARTICLE_ID],'comment':str,'refid':""}
        post(this.props.articleUrl+"/comments/",body).then(result=>{
            if(result.status)
            {
                this.jumpToEndComments();
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