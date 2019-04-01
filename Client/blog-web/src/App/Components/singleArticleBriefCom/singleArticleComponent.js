import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import moment from 'moment'
import {Row,Col,Icon,Popconfirm,Tooltip,message,Divider} from 'antd'

import Comment from '../comments/allComments'
import {get, post,del} from '../../Common/RequestREST'

const ARTICLE_PROPS = 'article';
class ArticleComponent extends Component {
    state={username:null,commentsNumber:0,browseNumber:0,likeNumber:0,content:"",showComment:false,mouseIn:false,
           personalArticle:false,personalLike:false,articleDeleted:false}
    
    render(){
        
        if(!this.state.articleDeleted){
        return (
            <div className='articlesingle' onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} >
            {/* <Divider></Divider> */}
            <Row type="flex" justify="space-between" gutter={16} align="middle">
                <Col span={18}>
                    <div className="article-title">
                        <a className="article-url-link" target="_blank" without="false" rel="noopener noreferrer" href={'/articles/'+this.props[ARTICLE_PROPS].articleid}>
                            {this.props[ARTICLE_PROPS].title}
                        </a>
                    </div>
                    <div className="article-breif">
                        {this.props.article.breif}
                    </div>
                    <div className="article-note">
                        <Row gutter={8} >
                            <Col span={2} > 
                                <div ><a className="article-url-link" target="_blank" without="false" rel="noopener noreferrer" href={'/articles/'+this.props[ARTICLE_PROPS].articleid}>
                                    <Icon type="eye" /> {this.state.browseNumber} 
                                </a></div>
                            </Col>
                            <Col span={2} > 
                                <div className="comment_article" onClick={this.commentClick} >
                                    <Icon type="message" /> {this.state.commentsNumber} 
                                </div>
                            </Col>  
                            <Col span={2} > 
                                <div className="likes_article" onClick={this.likesClick}>
                                {this.state.personalLike?<Icon type="heart" theme="twoTone" twoToneColor="#ff0000"/>:<Icon type="heart" />} {this.state.likeNumber} 
                                </div>
                            </Col>  
                            <Col span={5} >
                                <div >
                                    {moment(this.props.article.uptime,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')}
                                </div>
                            </Col>
                            <Col span={5}>
                            <Tooltip placement='bottom' title='查看作者主页'>
                                <a className="article-url-link" target="_blank" without="false" rel="noopener noreferrer" href={'/author/'+this.props[ARTICLE_PROPS].userid}>
                                    作者：{this.state.username}
                                </a>
                            </Tooltip>
                            </Col>
                            {
                                this.state.personalArticle&&this.state.mouseIn?<Tooltip placement="bottom" title="编辑文章"><Col span={2}>
                                <div onClick={this.editClick} className="edit_article_com"><Icon type="edit" /></div>
                                </Col></Tooltip>:null
                            }
                            {
                                this.state.personalArticle&&this.state.mouseIn?<Tooltip placement="bottom" title="删除文章"><Col span={2}>
                                <Popconfirm title="确定删除该文章么?" onConfirm={this.deleteClick} okText="是" cancelText="否"><Icon type="delete" /></Popconfirm>
                                </Col></Tooltip>:null
                            }
                            <Col ></Col>
                        </Row>
                    </div>
                </Col>
                <Col span={6}>
                    <a className="article-url-link" target="_blank" without="false" rel="noopener noreferrer" href={'/articles/'+this.props[ARTICLE_PROPS].articleid}>
                        <img src={this.props.fileUrl+"/"+this.props[ARTICLE_PROPS].coverurl} alt="封面丢失" className="articleCover"></img>
                    </a>
                </Col>
            </Row>
            <Row className='articlesingle_comments'>
                {this.state.showComment?<Comment articleid={this.props[ARTICLE_PROPS].articleid}/>:null}
            </Row>
            <Divider></Divider>
            </div>
        );}else{
            return <div/>
        }
    }
    componentDidMount(){
        this.personalArticleJudge()
        this.personalLikeArticleJudge()
        this.refreshShows()
    }
    mouseEnter=()=>{
        this.setState({mouseIn:true});
    }
    mouseLeave=()=>{
        this.setState({mouseIn:false});
    }
    refreshShows=()=>{
        this.refreshUsername()
        this.refreshCommentNumbers()
        this.resfreshLikesNumbers()
        this.resfreshBrowserNumbers()
        this.refreshArticleDetail()
    }
    refreshUsername=()=>{
        //根据用户id获取用户名
        get(this.props.userUrl+"/usernames/"+this.props[ARTICLE_PROPS].userid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({username:result.data})
            }else{
                message.error('查询用户名失败')
            }
        })
    }
    refreshCommentNumbers=()=>{
        //根据文章id获取评论数量
        get(this.props.commentUrl+"/counts/topcomments/"+this.props[ARTICLE_PROPS].articleid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({commentsNumber:result.data})
            }else{
                message.error('查询评论数量失败')
            }
        })
    }
    resfreshLikesNumbers=()=>{
        //根据文章id获取喜欢的人的数量
        get(this.props.likeUrl+"/articles/"+this.props[ARTICLE_PROPS].articleid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({likeNumber:result.data})
            }else{
                message.error("获取点赞数量失败")
            }
        })
    }
    resfreshBrowserNumbers=()=>{
        //获取浏览数量
        get(this.props.browserUrl+"/articles/"+this.props[ARTICLE_PROPS].articleid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({browseNumber:result.data})
            }else{
                message.error("获取浏览量失败")
            }
        })

    }
    refreshArticleDetail=()=>{
        //获取文章内容
        let bodyurl = this.props[ARTICLE_PROPS].bodyurl.replace("\\","/");
        get(this.props.fileUrl+"/"+bodyurl).then(result=>result.text()).then(result=>{
            this.setState({content:result});
        })
    }
    personalLikeArticleJudge=()=>{
        //判断是否是自己喜欢的
        get(this.props.likeUrl+"/belongs/articles/"+this.props[ARTICLE_PROPS].articleid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({personalLike:result.data})
            }
        })
    }
    //判断是否是自己的文章
    personalArticleJudge=()=>{
        get(this.props.articleUrl+"/belongs/"+this.props[ARTICLE_PROPS].articleid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({personalArticle:result.data})
            }
        })
    }
    //点击评论按钮
    commentClick=()=>{
        this.setState({showComment:!this.state.showComment})
    }
    //单击喜欢按钮
    likesClick=()=>{
        if(this.state.personalLike){
            //删除该文章的喜欢记录
            del(this.props.likeUrl+"/articles/"+this.props[ARTICLE_PROPS].articleid).then(response => response.json()).then(result=>{
                if(result.status){
                    this.setState({personalLike:false})
                    this.resfreshLikesNumbers()
                }else{
                    message.error("删除点赞失败")
                }
            })
        }else{
            post(this.props.likeUrl+"/articles/",{'articleid':this.props[ARTICLE_PROPS].articleid}).then(response => response.json()).then(result=>{
                if(result.status){
                    this.setState({personalLike:true})
                    this.resfreshLikesNumbers()
                }else{
                    message.error("点赞失败")
                }
            })
        }
    }
    //删除文章
    deleteClick=()=>{
        del(this.props.articleUrl+"/"+this.props[ARTICLE_PROPS].articleid).then(response => response.json()).then(result=>{
            if(result.status){
                this.setState({articleDeleted:true})
            }else{
                message.error("删除文章失败")
            }
        })
    }
    //编辑文章
    editClick=()=>{
        this.props.history.push({
            pathname:/writes/,
            state:{
                    from:this.props.location.pathname,
                    articleDetail:{articleID:this.props[ARTICLE_PROPS].articleid, articleTitle:this.props[ARTICLE_PROPS].title, articleContent:this.state.content, 
                                  articleBrief:this.props[ARTICLE_PROPS].breif, articleCover:this.props[ARTICLE_PROPS].coverurl, articleKeys:this.props[ARTICLE_PROPS].keywords}
                  }
        })
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
export default withRouter(connect(mapStateToProps)(ArticleComponent))