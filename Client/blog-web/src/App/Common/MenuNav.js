import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Menu, Icon} from 'antd'
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types'

class MenuNav extends Component{
    getLinkToUrl= (url)=>{
        return ({
            pathname:url,
            state:{from:this.props.location.pathname}})
    }
    render(){
        // console.log('hhhhhhh',this.props.location.pathname)
        return (
            <Menu onClick={this.handleClick}
              mode="horizontal"
              theme='dark'
              selectedKeys={[this.props.location.pathname]}
            >
              <Menu.Item key="/"><Link to={'/'}/>首页</Menu.Item>
              <Menu.Item key="/video/" ><Link to={this.getLinkToUrl('/video/')}/>视频</Menu.Item>
              {
                this.props.ok?
                <Menu.SubMenu title={<span><Icon type="setting" />{this.props.username}</span>}>
                    <Menu.Item key="setting">个人中心</Menu.Item>
                    <Menu.Item key="logout"><Link to='/login/'/>退出登陆</Menu.Item>
                </Menu.SubMenu>
                :
                <Menu.Item key='login'><Link to={this.getLinkToUrl('/login/')}/>登陆</Menu.Item>
              }
            </Menu>
          );
    }
}

//类型检查，需要传入 userName以及回调函数
MenuNav.propTypes={
    'username':PropTypes.string.isRequired,
    'ok':PropTypes.bool.isRequired
};
export default withRouter(MenuNav)