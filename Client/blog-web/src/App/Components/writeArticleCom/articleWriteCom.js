import React, { Component } from 'react'
import WriteArticle from './writeArticle'
import { withRouter} from 'react-router-dom'

class ArticleWritePage extends Component{
    state=this.props.location.state.articleDetail ||{
        articleID:"", articleTitle:"", articleContent:"", articleBrief:"", articleCover:"", articleKeys:""
    }        
    render(){
        return <WriteArticle articleID={this.state.articleID} articleTitle={this.state.articleTitle} 
        articleContent={this.state.articleContent} articleBrief={this.state.articleBrief} articleCover={this.state.articleCover} articleKeys={this.state.articleKeys}/>
    }
}
export default withRouter(ArticleWritePage)