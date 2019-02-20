import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import moment from 'moment'

import Comment from '../comments/allComments'
import {get} from '../../Common/RequestREST'


const ARTICLE_PROPS = 'article';
class ArticleComponent extends Component {
    state={comments:[],showComment:false}
    //点击评论按钮
    commentClick=()=>{
        this.setState({showComment:!this.state.showComment})
    }
    render(){
        return (
            <div className='articlesingle'>
                <div className="article-title">{this.props[ARTICLE_PROPS].title}</div>
                <div className="article-breif">
                    {this.props.article.breif}
                </div>
                <div className="list-footer">
                  <span className="article-note"> · 阅读 </span>
                  <span className="article-note" onClick={this.commentClick} > · 评论({this.state.comments.length}) </span>  
                  <span className="article-note"> · 赞 </span>  
                  <span className="article-note">{moment(this.props.article.uptime,'YYYY-MM-DD HH:mm:ss').format('YYYY年MM月DD日')}</span>
                </div>
                {this.state.showComment?<Comment comments={this.state.comments}/>:""}
            </div>
        );
    }
    refreshComments=()=>{
        //根据文章id获取其所有评论，已经为树状结构，
        get(this.props.articleUrl+"/comments/"+this.props[ARTICLE_PROPS].articleid).then(result=>{
            this.setState({comments:result.data})
        }).catch(function (e){

        });
    }
    componentDidMount(){
        this.refreshComments()
    }
}

//类型检查，需要传入 userName,password,remember以及回调函数
ArticleComponent.propTypes={
    [ARTICLE_PROPS]:PropTypes.object.isRequired
  };
  
const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
export default connect(mapStateToProps)(ArticleComponent)