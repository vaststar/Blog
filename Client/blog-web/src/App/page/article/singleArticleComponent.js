import React, { Component } from 'react'
import PropTypes from 'prop-types'


const ARTICLE_PROPS = 'article';
class ArticleComponent extends Component {
    dateTranfer=(datestr)=>{
        let ymd = datestr.split(' ')[0]
        let y=ymd.split('-')[0]
        let m=ymd.split("-")[1]
        let d=ymd.split('-')[2]
        return y+'年'+m+'月'+d+'日'
    }
    render(){
        console.log('hhhh',this.props)
        return (
            <div className='articlesingle'>
                <h3 className="article-title">{this.props.article.title}</h3>
                <div className="article-breif">
                    {this.props.article.breif}
                </div>
                <div className="list-footer">
                  <span>{this.dateTranfer(this.props.article.uptime)}</span>
                  <span className='article-class'>[文本博客]</span>
                  <span className="article-note"> · <a >阅读 </a></span>
                  <span className="article-note"> · 收藏 </span>
                  <span className="article-note"> · 评论 </span>  
                  <span className="article-note"> · 转发 </span>  
                  <span className="article-note"> · 赞 </span>  
                </div>
            </div>
        );
    }
}

//类型检查，需要传入 userName,password,remember以及回调函数
ArticleComponent.propTypes={
    [ARTICLE_PROPS]:PropTypes.object.isRequired
  };
export default ArticleComponent