import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from './sidebar/Sidebar';
import Content from './content/Content';
import NavBarHome from '../../components/navBar/NavBar';
import './Home.css';
function mapStateToProps(state) {
  return {

  };
}

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div>
          <NavBarHome />
        </div>
        <div className='home__css'>
          <Sidebar />
          <Content />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Home);