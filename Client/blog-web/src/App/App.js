import React, { Component } from 'react'
import { BrowserRouter, Route , Switch, Redirect} from 'react-router-dom'

import './App.css'
import Login from './page/login'
import HomePage from './page/home'


class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/login/" component={Login}/>
          <Redirect to='/'/>
          </Switch>
      </BrowserRouter>   
    );
  }
}

export default App;
