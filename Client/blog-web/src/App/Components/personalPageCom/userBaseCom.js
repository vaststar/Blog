import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Divider,Row,Col,Avatar,Tooltip,Input,Icon,Button} from 'antd'

import {get,put,post,postFile} from '../../Common/RequestREST'

class UserBaseCom extends Component{
    state={}
//头像问题
    //点击修改头像
    changeAvatarClick=()=>{
        let formData = new FormData()
        formData.append('file', this.fileUpload.files[0])
        this.postImage(formData,this.fileUpload.files[0].name)
    }
    //上传图片
    postImage=(formData,filename)=>{
        postFile(this.props.fileUrl+"/avatars/"+filename, formData
        ).then(result=>result.json()).then(result=>{
            if(result.status){
                this.updateAvatar(result.data.filepath)
            }
            console.log(result)
        }).catch(function(e){
            console.log(e)
        })
    }
    //写入修改头像
    updateAvatar=(avatarUrl)=>{
        put(this.props.userUrl+"/avatars/", {'avatar':avatarUrl}).then(result=>result.json()).then(result=>{
            if(result.status){
                this.setState({avatarUrl:avatarUrl})
            }
            console.log(result)
        }).catch(function(e){
            console.log(e)
        })
    }
//真实姓名问题
    showRealNameInput=()=>{
        let state = this.state;
        state.realNameInputVisible = true;
        state.realNameInputValue = state.userinfo.realname;
        this.setState(state, () => {this.realNameInput.focus();});
    }
    handleRealNameInputChange = (e) => {
        let state = this.state;
        state.realNameInputValue = e.target.value;
        this.setState(state);
    }
    handleRealNameInputConfirm = () => {
      const state = this.state;
      const inputValue = state.realNameInputValue;
      state.userinfo.realname = inputValue;
      state.realNameInputValue="";
      state.realNameInputVisible=false;
      put(this.props.userUrl+"/realnames/",{'realname':inputValue}).then(response => response.json()).then(result => {
          // 在此处写获取数据之后的处理逻辑
          if(result.status){
              this.setState(state);              
          }
        }).catch(function (e) {
            console.log("update tags fail", e);
        });  
    }
//身份证
    showIdcardInput=()=>{
        let state = this.state;
        state.idcardInputVisible = true;
        state.idcardInputValue = state.userinfo.idcard;
        this.setState(state, () => {this.idcardInput.focus();});
    }
    handleIdcardInputChange = (e) => {
        let state = this.state;
        state.idcardInputValue = e.target.value;
        this.setState(state);
    }
    handleIdcardInputConfirm = () => {
      const state = this.state;
      const inputValue = state.idcardInputValue;
      state.userinfo.idcard = inputValue;
      state.idcardInputValue="";
      state.idcardInputVisible=false;
      put(this.props.userUrl+"/idcards/",{'idcard':inputValue}).then(response => response.json()).then(result => {
          // 在此处写获取数据之后的处理逻辑
          if(result.status){
              this.setState(state);              
          }
        }).catch(function (e) {
            console.log("update tags fail", e);
        });  
    }
//手机号
    showCellphoneInput=()=>{
        let state = this.state;
        state.cellphoneInputVisible = true;
        state.cellphoneInputValue = state.userinfo.cellphone;
        this.setState(state, () => {this.cellphoneInput.focus();});
    }
    handleCellphoneInputChange = (e) => {
        let state = this.state;
        state.cellphoneInputValue = e.target.value;
        this.setState(state);
    }
    handleCellphoneInputConfirm = () => {
      const state = this.state;
      const inputValue = state.cellphoneInputValue;
      state.userinfo.cellphone = inputValue;
      state.cellphoneInputValue="";
      state.cellphoneInputVisible=false;
      put(this.props.userUrl+"/cellphones/",{'cellphone':inputValue}).then(response => response.json()).then(result => {
          // 在此处写获取数据之后的处理逻辑
          if(result.status){
              this.setState(state);              
          }
        }).catch(function (e) {
            console.log("update tags fail", e);
        });  
    }

//邮箱
    showEmailInput=()=>{
        let state = this.state;
        state.emailInputVisible = true;
        state.emailInputValue = state.userinfo.email;
        this.setState(state, () => {this.emailInput.focus();});
    }
    handleEmailInputChange = (e) => {
        let state = this.state;
        state.emailInputValue = e.target.value;
        this.setState(state);
    }
    handleEmailInputConfirm = () => {
      const state = this.state;
      const inputValue = state.emailInputValue;
      state.userinfo.email = inputValue;
      state.emailInputValue="";
      state.emailInputVisible=false;
      put(this.props.userUrl+"/emails/",{'email':inputValue}).then(response => response.json()).then(result => {
          // 在此处写获取数据之后的处理逻辑
          if(result.status){
              this.setState(state);              
          }
        }).catch(function (e) {
            console.log("update tags fail", e);
        });  
    }

    render(){return(<div>
        <Divider ></Divider>
        <Row type="flex" justify="center" align="middle" >
            <Col span={1}>
                {this.state.avatarUrl&&<Avatar className="personal_avatar" size="large" icon="user" src={this.props.fileUrl+"/"+this.state.avatarUrl} /> }
            </Col>
            <Col span={22} className="userbaseCom_username">
                <Row>
                {this.state.username&&<div>{this.state.username}</div>}
                </Row>
                <Row>
                <label className="userbaseCom_changeavatar_label">
                <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" className="userbaseCom_changeavatar" ref={(ref) => this.fileUpload = ref}
                onChange={this.changeAvatarClick}/> 
                修改头像</label> 
                </Row>
            </Col>
            <Col/>
        </Row>
        <Divider orientation="left">基本信息</Divider>
        {this.state.userinfo&&
        <Row className="userbase_info">
            <Col span={2}>姓名</Col>
            <Col span={20}>
                {!this.state.realNameInputVisible&&<div>{this.state.userinfo.realname}</div>}
                {this.state.realNameInputVisible && (
                    <Input
                      ref={(input) => this.realNameInput = input}
                      type="text"
                      value={this.state.realNameInputValue}
                      onChange={this.handleRealNameInputChange}
                      onBlur={this.handleRealNameInputConfirm}
                      onPressEnter={this.handleRealNameInputConfirm}
                    />)}
            </Col>
            <Col>{!this.state.realNameInputVisible&&<Button onClick={this.showRealNameInput} type="primary" >修改</Button>}</Col>
        </Row>}
        {this.state.userinfo&&
        <Row className="userbase_info">
            <Col span={2}>身份证</Col>
            <Col span={20}>
                {!this.state.idcardInputVisible&&<div>{this.state.userinfo.idcard}</div>}
                {this.state.idcardInputVisible && (
                    <Input
                      ref={(input) => this.idcardInput = input}
                      type="text"
                      value={this.state.idcardInputValue}
                      onChange={this.handleIdcardInputChange}
                      onBlur={this.handleIdcardInputConfirm}
                      onPressEnter={this.handleIdcardInputConfirm}
                    />)}
            </Col>
            <Col>{!this.state.idcardInputVisible&&<Button onClick={this.showIdcardInput} type="primary">修改</Button>}</Col>
        </Row>}
        {this.state.userinfo&&
        <Row className="userbase_info">
            <Col span={2}>手机号</Col>
            <Col span={20}>
                {!this.state.cellphoneInputVisible&&<div>{this.state.userinfo.cellphone}</div>}
                {this.state.cellphoneInputVisible && (
                    <Input
                      ref={(input) => this.cellphoneInput = input}
                      type="text"
                      value={this.state.cellphoneInputValue}
                      onChange={this.handleCellphoneInputChange}
                      onBlur={this.handleCellphoneInputConfirm}
                      onPressEnter={this.handleCellphoneInputConfirm}
                    />)}
            </Col>
                <Col>{!this.state.cellphoneInputVisible&&<Button onClick={this.showCellphoneInput} type="primary">修改</Button>}</Col>
        </Row>}
        {this.state.userinfo&&
        <Row className="userbase_info">
            <Col span={2}>邮箱</Col>
            <Col span={20}>
                {!this.state.emailInputVisible&&<div>{this.state.userinfo.email}</div>}</Col>
                {this.state.emailInputVisible && (
                    <Input
                      ref={(input) => this.emailInput = input}
                      type="text"
                      value={this.state.emailInputValue}
                      onChange={this.handleEmailInputChange}
                      onBlur={this.handleEmailInputConfirm}
                      onPressEnter={this.handleEmailInputConfirm}
                    />)}
            <Col>{!this.state.emailInputVisible&&<Button onClick={this.showEmailInput} type="primary">修改</Button>}</Col>
        </Row>}
        <Divider/>
    </div>)}

    componentDidMount(){
        this.getUserId()
        this.getUserInfo()
    }
    
    getUserId=()=>{
        get(this.props.userUrl+"/selfid/").then(result=>result.json()).then(result=>{
            if(result.status)
            {
                this.setState({userid:result.data})
                this.getAvatar(result.data)
                this.getUserName(result.data)
            }
        }).catch(function(e){
            console.log(e);
        })
    }
    getAvatar=(userid)=>{
        get(this.props.userUrl+"/avatars/"+userid).then(result=>result.json()).then(result=>{
            if(result.status)
            {
                this.setState({avatarUrl:result.data})
            }
        }).catch(function(e){
            console.log( e);
        })
    }
    getUserName=(userid)=>{
        get(this.props.userUrl+"/usernames/"+userid).then(result=>result.json()).then(result=>{
            if(result.status)
            {
                this.setState({username:result.data})
            }
        }).catch(function(e){
            console.log( e);
        })

    }
    getUserInfo=()=>{
        get(this.props.userUrl+"/selfinfos/").then(result=>result.json()).then(result=>{
            if(result.status)
            {
                this.setState({userinfo:result.data})
            }
        }).catch(function(e){
            console.log( e);
        })
    }
}


const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
  
export default connect(mapStateToProps)(UserBaseCom)