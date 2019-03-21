import React,{ Component } from 'react'
import {connect} from 'react-redux'
import { withRouter ,Redirect} from 'react-router-dom'
import {Modal} from 'antd'

import {post, get} from '../../Common/RequestREST'
import BlogLoginForm from './LoginForm'
import {changeUser,changeToken, changeValid} from '../../../Redux/ActionReducer/user'
import ForgetPassCom from './forgetPassword'

class Login extends Component {
  state = {redirectToReferrer: false,forgetVisiable:false}
  render() {
    const {username,password,remember} = this.props;
    let { from } = this.props.location.state || { from: "/" };
    let { redirectToReferrer } = this.state;
    
    if (redirectToReferrer)
    {
      return <Redirect to={from} />; 
    } 
    return (
      <div>
      <BlogLoginForm userName={username} password={password} remember={remember} submitForm={this.handleSubmit} 
       forgetClick={this.clickForget} registerUrl='/register/' wrappedComponentRef={(form) => {this.formRef = form}}></BlogLoginForm>
      <Modal visible={this.state.forgetVisiable} footer={null} onCancel={()=>{this.setState({ forgetVisiable: false })}}>
      {this.state.userid&&<ForgetPassCom userid={this.state.userid}></ForgetPassCom>}
      </Modal>
      </div>
    );
  }
  clickForget=()=>{
    get(this.props.userUrl+"/userids/"+this.formRef.getUserName()).then(respones=>respones.json()).then(result=>{
        if(result.status){
          this.setState({userid:result.data});
          this.setState({ forgetVisiable: true})
        }
    }).catch((e)=>{
      console.log(e)
    });
  }
  handleSubmit =(form)=>{
    //请求token
    post(this.props.userUrl+"/tokens/",{'username':form.userName,'password':form.password}).then(response => response.json()).then(result => {
      // 在此处写获取数据之后的处理逻辑
      if(result.status){
        this.props.ChangeUser({'username':form.userName,'password':form.password,'remember':form.remember})
        this.props.ChangeToken(result.data);
        this.props.ChangeValid(true);
        this.setState({ redirectToReferrer: true });
      }
      else{
        this.setState({ redirectToReferrer: false });
        this.props.ChangeToken(null);
        alert(JSON.stringify(result));
        this.props.ChangeValid(false);
        console.log('用户名或者密码错误',result);
      }
    }).catch(function (e) {
      this.setState({ redirectToReferrer: false });
        this.props.ChangeToken(null);
        this.props.ChangeValid(false);
        console.log("fetch fail", e);
    });
  }
}

const  mapStateToProps =(state,props)=>{
  return {
    ...state.userReducer.user,userUrl:state.userReducer.userUrl
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

export default withRouter(connect(mapStateToProps,mapDispatch)(Login))