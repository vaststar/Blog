import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import moment from 'moment'
import {Row,Col,Icon} from 'antd'

import Comment from '../comments/allComments'
import {get} from '../../Common/RequestREST'

const ARTICLE_PROPS = 'article';
class ArticleComponent extends Component {
    state={commentsNumber:0,showComment:false}
    //点击评论按钮
    commentClick=()=>{
        this.setState({showComment:!this.state.showComment})
    }
    render(){
        return (
            <div className='articlesingle' >
            <Row type="flex" justify="space-between" gutter={16} >
                <Col span={20}>
                    <div className="article-title">
                        <a className="article-url-link" target="_blank" without="false" rel="noopener noreferrer" href={'/articles/'+this.props[ARTICLE_PROPS].articleid}>
                            {this.props[ARTICLE_PROPS].title}
                        </a>
                    </div>
                    <div className="article-breif">
                        {this.props.article.breif}
                    </div>
                    <div className="article-note">
                        <Row gutter={10} >
                            <Col span={2} > 
                                <div ><a className="article-url-link" target="_blank" without="false" rel="noopener noreferrer" href={'/articles/'+this.props[ARTICLE_PROPS].articleid}>
                                    <Icon type="eye" /> 0 
                                </a></div>
                            </Col>
                            <Col span={2} > 
                                <div  onClick={this.commentClick} >
                                    <Icon type="message" /> {this.state.commentsNumber} 
                                </div>
                            </Col>  
                            <Col span={2} > 
                                <div >
                                <Icon type="heart" /> 0 
                                </div>
                            </Col>  
                            <Col span={8} >
                                <div >
                                    {moment(this.props.article.uptime,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')}
                                </div>
                            </Col>
                            <Col span={10}></Col>
                        </Row>
                    </div>
                </Col>
                <Col span={4}>
                    <a className="article-url-link" target="_blank" without="false" rel="noopener noreferrer" href={'/articles/'+this.props[ARTICLE_PROPS].articleid}>
                        <img src={this.props.fileUrl+"/"+this.props[ARTICLE_PROPS].coverurl} className="articleCover" alt="封面丢失"></img>
                    </a>
                </Col>
            </Row>
            <Row>
            </Row>
            {/* <div>
                {this.state.showComment?<Comment articleid={this.props[ARTICLE_PROPS].articleid}/>:null}
            </div> */}
            </div>
        );
    }
    refreshCommentNumbers=()=>{
        //根据文章id获取其所有评论，已经为树状结构，
        get(this.props.articleUrl+"/counts/topcomments/"+this.props[ARTICLE_PROPS].articleid).then(response => response.json()).then(result=>{
            this.setState({commentsNumber:result.data})
        }).catch(function (e){
            console.log(e)
        });
    }
    componentDidMount(){
        this.refreshCommentNumbers()
    }
}

//类型检查，需要传入 article对象
ArticleComponent.propTypes={
    [ARTICLE_PROPS]:PropTypes.object.isRequired
  };
  
const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
export default connect(mapStateToProps)(ArticleComponent)