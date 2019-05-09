import React, { Component } from 'react';
import Login from './components/login/Login';
import Home from './components/home/Home';
import { Redirect, Route, Switch, Router } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Redirect from='/' exact to='/login' />
        </Switch>
      </Router>
    );
  }
}

export default App;