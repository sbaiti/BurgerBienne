import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from './utils/store';
import { getCurrentUser, getJwt } from './services/AuthServices';
import setToken from "./utils/setToken";
import { successLogin } from "./actions/AuthActions";
import Login from './components/login/Login';
import Home from './components/home/Home';

const tokenDecoded = getCurrentUser();
if (tokenDecoded) {
  setToken(getJwt());
  store.dispatch(successLogin(tokenDecoded));
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: this.props.auth.isAuthenticated
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.isAuthenticated !== nextProps.auth.isAuthenticated) {
      this.setState({ connected: nextProps.auth.isAuthenticated });
    }
  }

  render() {
    return (
      <div>
        {
          this.state.connected ?
            <Home />
            :
            <Login />
        }
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