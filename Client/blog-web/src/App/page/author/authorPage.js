import React, { Component } from 'react'
import {connect} from 'react-redux'

import {get} from '../../Common/RequestREST'
import Header from '../../Common/Header'

import AuthorCom from '../../Components/authorPageCom/authorCom'
import AuthorArticlesCom from '../../Components/authorPageCom/authorArticles'

class AuthorPage extends Component {
    state={}
    render() {
        return (
            <div>
                <Header/>
                {this.state.userid?
                <div className='author_page_Com'>
                    <AuthorCom userid={this.state.userid}></AuthorCom>
                </div>:null}  
                {this.state.userid?
                <div className='author_page_Article_Com'>
                    <AuthorArticlesCom userid={this.state.userid}></AuthorArticlesCom>
                </div>:null}  

            </div>
        )
    }
    componentDidMount(){
        if (typeof this.props.location.pathname.split("/").pop() == "undefined" || 
                   this.props.location.pathname.split("/").pop() == null || 
                   this.props.location.pathname.split("/").pop() == ""){
            if(this.props.valid){
                //获取id并更新
                get(this.props.userUrl+"/bases/"+this.props.user.username).then(result=>result.json()).then(result=>{
                    
                    if(result.status){
                        this.setState({userid:result.data.id});
                    }
                }).catch(function(e){
                    console.log( e);
                })
            }
        }
        else{
            this.setState({userid:this.props.location.pathname.split("/").pop()})
        }
    }
}
  
const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
  
export default connect(mapStateToProps)(AuthorPage)