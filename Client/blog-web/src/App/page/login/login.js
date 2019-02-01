import React,{ Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';

import {post} from '../../Common/RequestREST'
import BlogLoginForm from './LoginForm'
import {changeUser,changeToken, changeValid} from '../../../Redux/ActionReducer/user'

class Login extends Component {
  render() {
    const {username,password,remember} = this.props;
    return (
      <div>
      <BlogLoginForm userName={username} password={password} remember={remember} submitForm={this.handleSubmit} forgetUrl='http://www.baidu.com' registerUrl='http://www.baidu.com'></BlogLoginForm>
      </div>
    );
  }
  handleSubmit =(form)=>{
    //请求token
    post("http://127.0.0.1:4444/author/token/",{'username':form.userName,'password':form.password}).then(result => {
      // 在此处写获取数据之后的处理逻辑
      if(result.status){
        this.props.ChangeUser({'username':form.userName,'password':form.password,'remember':form.remember})
        this.props.ChangeToken(result.data);
        this.props.ChangeValid(true);
        this.props.history.push('/');
      }
      else{
        this.props.ChangeToken(null);
        this.props.ChangeValid(false);
        console.log('用户名或者密码错误',result)
      }
    }).catch(function (e) {
        this.props.ChangeToken(null);
        this.props.ChangeValid(false);
        console.log("fetch fail", e);
    });
  }
}

const  mapStateToProps =(state,props)=>{
  return {
    ...state.userReducer.user
  }
}

const mapDispatch =(dispatch,ownProps)=>{
  return {
      ChangeUser:(data)=>{
        dispatch(changeUser(data))
      },
      ChangeToken:(data)=>{
        dispatch(changeToken(data))
      },
      ChangeValid:(data)=>{
        dispatch(changeValid(data))
      }
  }
}

const  LoginPage =  withRouter(connect(mapStateToProps,mapDispatch)(Login))
export default LoginPage