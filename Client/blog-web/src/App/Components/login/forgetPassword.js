import React,{ Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {post, get} from '../../Common/RequestREST'

const USER_ID = "userid";
class ForgetPassword extends Component {
    state={}
    render(){
        return(<div>
            {this.state.email&&this.state.email}
        </div>)
    }
    componentDidMount(){
        //查询并显示邮箱
        this.getUserEmail()
    }
    getUserEmail=()=>{
        get(this.props.userUrl+"/emails/"+this.props[USER_ID]).then(response=>response.json()).then(result=>{
            if(result.status){
                this.setState({email:result.data})
            }
        }).catch(e=>{
            console.log(e)
        });
    }
}

ForgetPassword.propTypes={
    [USER_ID]:PropTypes.string.isRequired
};

const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
  
export default connect(mapStateToProps)(ForgetPassword)