import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Spin, message,Divider} from 'antd'

import {get} from '../../Common/RequestREST'

import Article from '../../Components/singleArticleBriefCom/singleArticleComponent'

class AllArticles extends Component {
    state={articles:[],pageNumber:1,pageSize:10,totalPage:1,isLoadingMore:false}
    render() {
        return (
            <div className="article-info-div">
                <Divider></Divider>
                {this.state.articles.map((article,i)=>{
                    return (
                    <div key={i} >
                        <Article article={article} ></Article>
                    </div>
                    )
                })}
                {this.state.pageNumber<=this.state.totalPage?<div onClick={this.loadMore} className="loadMore">点击加载更多</div>:null}
                {this.state.isLoadingMore?<Spin className="loadMore"/>:null}
            </div>
        )
    }
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
        this.updateTotalPage();
        this.loadMore();
    }
    updateTotalPage=()=>{
        get(this.props.articleUrl+"/counts/").then(response=>response.json()).then(result=>{
            if(result.status){
                this.setState({totalPage:parseInt(result.data)/this.state.pageSize})
            }else{
                message.error("获取文章数量失败")
            }
        })
    }
    loadMore=()=>{
        if(this.state.pageNumber<=this.state.totalPage){
            this.setState({isLoadingMore:true})
            get(this.props.articleUrl+"/?pageNumber="+this.state.pageNumber+"&&pageSize="+this.state.pageSize).then(response=>response.json()).then(result=>{
                if(result.status){
                    //读取所有文章基本信息
                    this.setState({articles:this.removeDuplicatedItem(this.state.articles.concat(result.data))});
                    this.setState({pageNumber:this.state.pageNumber+1});
                }
                this.setState({isLoadingMore:false});
            })
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
    removeDuplicatedItem=(arr)=>{
       for(var i = 0; i < arr.length-1; i++){
           for(var j = i+1; j < arr.length; j++){
               if(arr[i]['articleid']===arr[j]['articleid']){
                 arr.splice(j,1);
                  j--;
                  }
              }
          }
          return arr;
       }
}

const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
  
export default connect(mapStateToProps)(AllArticles)