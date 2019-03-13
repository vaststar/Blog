import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Spin} from 'antd'

import {get} from '../../Common/RequestREST'

import Article from './singleArticleComponent'

class AllArticles extends Component {
    state={articles:[],pageNumber:1,pageSize:10,totalPage:1,isLoadingMore:false}
    render() {
        return (
            <div>
                {this.state.articles.map((article,i)=>{
                    return (
                    <div key={i} className="article-info-div">
                        <Article article={article} ></Article>
                    </div>
                    )
                })}
                {this.state.pageNumber<=this.state.totalPage?<div onClick={this.loadMore} className="loadMore">点击加载更多</div>:null}
                {this.state.isLoadingMore?<Spin/>:null}
            </div>
        )
    }
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
        this.updateTotalPage();
        this.loadMore();
    }
    updateTotalPage=()=>{
        get(this.props.articleUrl+"/counts/bases/").then(response=>response.json()).then(result=>{
            if(result.status){
                this.setState({totalPage:parseInt(result.data)/this.state.pageSize})
            }else{
                console.log("fetch article counts fail")
            }
        }).catch(e=>console.log("fetch article counts fail",e))
    }
    loadMore=()=>{
        if(this.state.pageNumber<=this.state.totalPage){
            this.setState({isLoadingMore:true})
            get(this.props.articleUrl+"/bases/?pageNumber="+this.state.pageNumber+"&&pageSize="+this.state.pageSize).then(response=>response.json()).then(result=>{
                if(result.status){
                    //读取所有文章基本信息
                    this.setState({articles:this.state.articles.concat(result.data)});
                    this.setState({pageNumber:this.state.pageNumber+1});
                }
                this.setState({isLoadingMore:false});
            }).catch(function (e) {
                this.setState({isLoadingMore:false});
                console.log("fetch all article bases fail", e);
            });
        }
    }
    handleScroll=(event)=>{
        const clientHeight = event.target.scrollingElement.clientHeight 
        const scrollHeight = event.target.scrollingElement.scrollHeight 
        const scrollTop = event.target.scrollingElement.scrollTop 
        const isBottom = (clientHeight + scrollTop === scrollHeight) 
        if(isBottom)
        {
            this.loadMore();
        }
    }
}

const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
  
export default connect(mapStateToProps)(AllArticles)