import React, { Component } from 'react'
import { BrowserRouter, Route , Switch, Redirect} from 'react-router-dom'

import Login from './page/login/login'
import HomePage from './page/home/home'


class App extends Component {
  render() {
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

export default App;
