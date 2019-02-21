import React, { Component } from 'react'
import {connect} from 'react-redux'
import {get} from '../../Common/RequestREST'

import Article from './singleArticleComponent'

class AllArticles extends Component {
    state={articles:[]}
    render() {
        // const {token,user,valid}=this.props
        return (
            <div>
                {this.state.articles.map((article,i)=>{
                    return (
                    <div key={i} className="article-info-div">
                        <Article article={article} ></Article>
                    </div>
                    )
                })}
            </div>
        )
    }
    componentDidMount(){
        //查询所有文章基本信息
        get(this.props.articleUrl+"/bases/").then(response => response.json()).then(result=>{
            if(result.status){
                //读取所有文章基本信息
                this.setState({articles:result.data})
            }else{
            }
        }).catch(function (e) {
            console.log("fetch all article bases fail", e);
        });
    }
}

const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
  
export default connect(mapStateToProps)(AllArticles)