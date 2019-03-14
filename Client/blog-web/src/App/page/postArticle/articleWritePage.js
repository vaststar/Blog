import React, { Component } from 'react'
import WriteArticle from './writeArticle'

class ArticleWritePage extends Component{
    state=this.props.location.state.articleDetail ||{
        articleID:"", articleTitle:"", articleContent:"", articleBrief:"", articleCover:"", articleKeys:""
    }        
    render(){
        // console.log(this.props.location)
        return <WriteArticle articleID={this.state.articleID} articleTitle={this.state.articleTitle} 
        articleContent={this.state.articleContent} articleBrief={this.state.articleBrief} articleCover={this.state.articleCover} articleKeys={this.state.articleKeys}/>
    }
    componentDidMount(){
        console.log(this.state)
        //查询bodyurl
    }
    // console.log(this.props.location)
}
export default ArticleWritePage