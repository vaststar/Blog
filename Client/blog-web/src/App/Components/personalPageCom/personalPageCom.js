import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Menu,Icon,Avatar,Row,Col,Divider,Tag} from 'antd'

import Introduce from './introduceCom'
import UserBase from './userBaseCom'

import {get,post} from '../../Common/RequestREST'

class AuthorCom extends Component{
    state={currentKey:'1'}
    render(){
        return(<div className="personal_Com">
            <Row type="flex" justify="space-around" align="top" gutter={16}>
              <Col span={4} >
              <div className="personal_Menu">
                <Menu
                  onClick={this.handleClick}
                  defaultSelectedKeys={['1']}
                  mode="inline"
                  theme="light"
                  >
                <Menu.Item key="1">
                <Icon type="lock" />
                  <span>账户安全</span>
                </Menu.Item>
                {/* <Menu.Item key="2">
                <Icon type="key" />
                  <span>账户信息</span>
                </Menu.Item> */}
                <Menu.Item key="3">
                  <Icon type="desktop" />
                  <span>个人状态</span>
                </Menu.Item>
                </Menu>
                </div>
              </Col>
              <Col span={20}>
                {this.state.currentKey==='1'?<UserBase/>:null}
                {/* {this.state.currentKey==='2'?<div>2222</div>:null} */}
                {this.state.currentKey==='3'?<Introduce/>:null}
              </Col>
            </Row>
        </div>)
    }
    componentDidMount(){
        
    }
    handleClick=(e)=>{
        this.setState({currentKey:e.key})
    }
    
}

const  mapStateToProps =(state,props)=>{
    return {
      ...state.userReducer
    }
}
  
export default connect(mapStateToProps)(AuthorCom)