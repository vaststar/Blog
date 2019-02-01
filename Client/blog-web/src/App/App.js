import React, { Component } from 'react'
import { BrowserRouter, Route , Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

import routerMap from './routerMap'

class App extends Component {
  render() {
    console.log('yyyyyy',this.props)
    if(window.localStorage.getItem('token'))
    {
      console.log('token',window.localStorage.getItem('token'));
    }
    return (
        <div className='App'>
          <BrowserRouter >
            <Switch>
              {routerMap.map((item,index) => {
                  return <Route  key={index} path={item.path} exact render={props =>
                    (!item.auth ? (<item.component {...props} />) : ( this.props.token != null? <item.component {...props} /> : <Redirect to='/login' />)
                    )} />
              })}
              <Redirect to='/login'/>
            </Switch>
          </BrowserRouter>
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
