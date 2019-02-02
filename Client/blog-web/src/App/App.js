import React, { Component } from 'react'
import { BrowserRouter, Route , Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

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
