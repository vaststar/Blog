import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Menu, Icon} from 'antd'

import PropTypes from 'prop-types'

class MenuNav extends Component{
    render(){
        return (
            <Menu onClick={this.handleClick}
              mode="horizontal"
              theme='dark'
            >
              <Menu.Item key="home">
                首页
              </Menu.Item>
              <Menu.Item key="app" >
                发现
              </Menu.Item>
              {this.props.ok?
              <Menu.SubMenu title={<span><Icon type="setting" />{this.props.username}</span>}>
                  <Menu.Item key="setting">个人中心</Menu.Item>
                  <Menu.Item key="logout"><Link exact to='/login/'/>退出登陆</Menu.Item>
              </Menu.SubMenu>
              :
              <Menu.Item key='login'><Link to='/login/'/>登陆</Menu.Item>}
            </Menu>
          );
    }
}

//类型检查，需要传入 userName以及回调函数
MenuNav.propTypes={
    'username':PropTypes.string.isRequired,
    'ok':PropTypes.bool.isRequired,
};
export default MenuNav