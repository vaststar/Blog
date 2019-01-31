import React, { Component } from 'react'
import {connect} from 'react-redux'
import { BrowserRouter, Route , Switch, Redirect} from 'react-router-dom'

import Login from './page/login/login'
import HomePage from './page/home/home'
import {changeToken} from './Redux/ActionReducer/user'


class App extends Component {
  
  render() {
    // const {token,user}=this.props
    // if(token!=null){
    //   history.push('/');

    // }
    return (
        <div className='App'>
          <BrowserRouter >
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/login/" component={Login}/>
              <Redirect to='/'/>
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

const  mapStateToProps =(state,props)=>{
  console.log('9999',state)
  return {
    ...state.userReducer
  }
}

const mapDispatch =(dispatch,ownProps)=>{
  return {
    ChangeToken:(data)=>{
      dispatch(changeToken(data))
    }
  }
}

export default connect(mapStateToProps,mapDispatch)(App);
