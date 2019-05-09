import React, { Component } from 'react';
import Login from './components/login/Login';
import Home from './components/home/Home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route path="/home" component={Home} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;