import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link, withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd'

import {get} from './RequestREST'
import {changeUser,changeToken,changeValid} from '../../Redux/ActionReducer/user'

class Header extends Component {
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
        const {user,valid}=this.props
        return (
            <Menu onClick={this.handleClick}
              mode="horizontal"
              theme='dark'
              selectedKeys={[this.props.location.pathname]}
            >
              <Menu.Item key="/"><Link to={'/'}/>首页</Menu.Item>
              <Menu.Item key="/video/" ><Link to={this.getLinkToUrl('/video/')}/>热门</Menu.Item>
              {
                valid?
                <Menu.SubMenu title={<span><Icon type="setting" />{user.username}</span>}>
                    <Menu.Item key="setting">个人中心</Menu.Item>
                    <Menu.Item key="logout">退出登陆</Menu.Item>
                </Menu.SubMenu>
                :
                <Menu.Item key='login'><Link to={this.getLinkToUrl('/login/')}/>登陆</Menu.Item>
              }
            </Menu>
        );
    }
    
    componentDidMount(){
        //通过获取自己的信息，判断是否进入验证
        get(this.props.userUrl+"/bases/"+this.props.user.username+"/").then(response => response.json()).then(result => {
            console.log(result);
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
export default withRouter(connect(mapStateToProps,mapDispatch)(Header))



