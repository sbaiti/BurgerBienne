import React, { Component } from 'react';
import NavBar from "./components/navBar/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { getRoutes } from './utils/routes';
import store from './utils/store';
import { getCurrentUser, getJwt } from './services/AuthServices';
import setToken from "./utils/setToken";
import { successLogin } from "./actions/AuthActions";

const tokenDecoded = getCurrentUser();
if (tokenDecoded) {
  setToken(getJwt());
  store.dispatch(successLogin(tokenDecoded));
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let routes = getRoutes().activeRoutes.map((routeComponent, index) => (
      <Route
        exact
        key={index}
        path={routeComponent.path}
        component={routeComponent.component}
      />));
    let renderFooter = null;
    let renderNavBar = null;
    if (this.props.auth.isAuthenticated) {
      routes = routes.slice(1);
      renderNavBar = <NavBar />
    }
    return (
      <div>
        <Router>
          <div>
            {renderNavBar}
            {routes}
          </div>
        </Router>
        {renderFooter}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(
  mapStateToProps,
)(App);