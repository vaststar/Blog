import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link, withRouter} from 'react-router-dom'
import {Layout, Menu, Icon,Row,Col,Avatar} from 'antd'

import {get} from './RequestREST'
import {changeUser,changeToken,changeValid} from '../../Redux/ActionReducer/user'
import logo from './logo.png'

class HeaderCom extends Component {
    getLinkToUrl= (url)=>{
        //处理登陆完之后的跳转页面
        return ({
            pathname:url,
            state:{from:this.props.location.pathname}})
    }
    handleClick = (e) => {
        //处理选择菜单的问题
        if('logout'===e.key){
            this.props.ChangeToken(null);
            this.props.ChangeValid(false);
        }
    }

    render() {
        return (
            <Layout.Header>
                <Row gutter={24}>
                    <Col span={1} offset={3}>
                        <Avatar src={logo} alt="学士" size={60}></Avatar>
                    </Col>
                <Col span={19} offset={1}>
                <Menu onClick={this.handleClick}
                  mode="horizontal"
                  theme='dark'
                  selectedKeys={[this.props.location.pathname]}
                  style={{ lineHeight: '64px' }}
                >
                  <Menu.Item key="/"><Link to={'/'}/><Icon type="home" />首页</Menu.Item>
                  {this.props.valid?<Menu.Item key="/author/" ><Link to={this.getLinkToUrl('/author/')}/><Icon type="fire" />我的</Menu.Item>:null}
                  {
                    this.props.valid?
                    <Menu.SubMenu title={<span><Icon type="user" />{this.props.user.username}</span>}>
                        <Menu.Item key="setting">个人中心</Menu.Item>
                        <Menu.Item key="/writes/"><Link to={this.getLinkToUrl('/writes/')}/>发布文章</Menu.Item>
                        <Menu.Item key="logout">退出登陆</Menu.Item>
                    </Menu.SubMenu>
                    :
                    <Menu.Item key='/login/'><Link to={this.getLinkToUrl('/login/')}/><Icon type="user" />登陆</Menu.Item>
                  }
                  {this.props.valid?null:<Menu.Item key='/register/'><Link to={this.getLinkToUrl('/register/')}/><Icon type="user-add" />注册</Menu.Item>}
                </Menu></Col>
                </Row>
            </Layout.Header>
        );
    }
    componentDidMount(){
        //通过获取自己的信息，判断是否进入验证
        get(this.props.userUrl+"/bases/"+this.props.user.username+"/").then(response => response.json()).then(result => {
            // console.log(result);
            if(result.status){
                this.props.ChangeValid(true);
            }else{
                this.props.ChangeValid(false);
            }
        }).catch(function (e) {
            this.props.ChangeValid(false);
            console.log("fetch fail", e);
        });
    }
}

const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
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
export default withRouter(connect(mapStateToProps,mapDispatch)(HeaderCom))



