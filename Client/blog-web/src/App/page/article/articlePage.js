import React, { Component } from 'react'
import {connect} from 'react-redux'
import ReactMarkdown from 'react-markdown'

import Header from '../../Common/Header'
import {get} from '../../Common/RequestREST'
import Comments from '../comments/allComments'

class ArticlePage extends Component {
    state={articlebase:null,content:""}
    render() {
        // const {token,user,valid}=this.props
        return (
            <div>
                <Header/>
                <ReactMarkdown source={this.state.content} />
                <Comments articleid={this.props.location.pathname.split("/").pop()}></Comments>
            </div>
        )
    }
    componentDidMount(){
        //获取文章基本信息
        get(this.props.articleUrl+"/bases/"+this.props.location.pathname.split("/").pop()).then(response => response.json()).then(result=>{
            if(result.status){
                //读取所有文章基本信息
                this.setState({articlebase:result.data})
                //读取文本内容
                let bodyurl = this.state.articlebase.bodyurl.replace("\\","/");
                get(this.props.fileUrl+"/"+bodyurl).then(result=>result.text()).then(result=>{
                    console.log('uuu',result)
                    // if(result.status){
                        this.setState({content:result});
                    // }
                }).catch(function(e){
                    console.log( e);
                })
            }else{
            }
        }).catch(function (e) {
            console.log( e);
        });
    }
}

const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
  
export default connect(mapStateToProps)(ArticlePage)