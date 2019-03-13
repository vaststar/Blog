import React, { Component } from 'react'
import { BrowserRouter, Route , Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import {Layout,BackTop} from 'antd'
import routerMap from './routerMap'

class App extends Component {
  render() {
    return (
        <div className='App'>
          <BrowserRouter >
            <Switch>
              {routerMap.map((item,index) => {
                  return <Route  key={index} path={item.path} exact render={props =>
                    (!item.auth ? (<item.component {...props} />) : ( this.props.valid ? <item.component {...props} /> : <Redirect to='/login/' />)
                    )} />
              })}
              <Redirect to='/'/>
            </Switch>
          </BrowserRouter>
          <Layout.Footer style={{ textAlign: 'center',background: 'rgba(255,255,255,0)'  }}>
            大学士阁 ©2019 Created by Thomas Zhu
          </Layout.Footer>
          <BackTop />
        </div>
    );
  }
}

const  mapStateToProps =(state,props)=>{
  return {
    ...state.userReducer
  }
}

const A =connect(mapStateToProps)(App);
export default A
