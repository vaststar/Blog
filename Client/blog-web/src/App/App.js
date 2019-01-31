import React, { Component } from 'react'
import { BrowserRouter, Route , Switch, Redirect} from 'react-router-dom'
import {Provider} from 'react-redux'

import Login from './page/login/login'
import HomePage from './page/home/home'
import store from './Redux/Store/Store'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
        <Login></Login>
          {/* <BrowserRouter >
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/login/" component={Login}/>
               <Redirect to='/'/>
            </Switch>
          </BrowserRouter> */}
        </div>
      </Provider>
         
    );
  }
}

export default App;
