import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter} from 'react-router-dom'
import {Row,Col} from 'antd'

import {get} from '../../Common/RequestREST'

import AuthorCom from '../../Components/authorPageCom/authorCom'
import AuthorArticlesCom from '../../Components/authorPageCom/authorArticles'

class AuthorDetail extends Component {
    state={}
    render() {
        return (<div className="author_main_page">{this.state.userid?
            <div>
                <Row type="flex" justify="space-around" align="top">
                    <Col span={19}>
                        <AuthorArticlesCom userid={this.state.userid}></AuthorArticlesCom>
                    </Col>
                    <Col span={4}>
                        <AuthorCom userid={this.state.userid}></AuthorCom>
                    </Col>
                    <Col/>
                </Row>  
            </div>
        :null}</div>)
    }
    componentDidMount(){
        if (typeof this.props.location.pathname.split("/").pop() === "undefined" || 
                   this.props.location.pathname.split("/").pop() === null || 
                   this.props.location.pathname.split("/").pop() === ""){
            if(this.props.valid){
                //获取id并更新
                get(this.props.userUrl+"/selfid/").then(result=>result.json()).then(result=>{
                    
                    if(result.status){
                        this.setState({userid:result.data});
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
  
export default withRouter(connect(mapStateToProps)(AuthorDetail))