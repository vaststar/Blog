import React, { Component } from 'react'
import {connect} from 'react-redux'
import {get} from '../../Common/RequestREST'

class AllArticles extends Component {
    state={articles:""}
    render() {
        // const {token,user,valid}=this.props
        return (
            <div>
                all Articles,{this.state.articles}
            </div>
        )
    }
    componentDidMount(){
        //查询所有文章基本信息
        get(this.props.articleUrl+"/bases/").then(result=>{
            console.log(result);
            this.setState({articles:JSON.stringify(result)})
            if(result.status){
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