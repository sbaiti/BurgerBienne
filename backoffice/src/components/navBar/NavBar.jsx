import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Menu, Icon } from 'semantic-ui-react';
import logo from '../../assets/burgerbiene_logo2x-neu.png';
import FullscreenUtil from '../../utils/FullscreenUtil';
import Info from './Info';
import './Header.css';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        }
    }
    setScreen = () => {
        this.setState({ isActive: !this.state.isActive });
        FullscreenUtil.toggle();
    }
    render() {
        const welcomeText = "Willkommen";
        const { isActive } = this.state;
        return (
            <div>
                <Menu attached='top'>
                    <div className="site-logo">
                        <img
                            onClick={() => this.props.resetActiveComponent()}
                            src={logo}
                            alt='logo' />
                    </div>
                    <Menu.Menu position='right'>
                        <div className='ui right aligned category search item'>
                            <div className="flex">
                                <div className="Welcome"><i>{welcomeText + ' ' + this.props.auth.user.Name}</i> <Icon disabled name='smile' /></div>
                                <div style={{ marginRight: "40px", marginTop: "5px" }}>
                                    <button onClick={this.setScreen} className="fullscreen-button">
                                        {isActive ? <i className="fas fa-compress-arrows-alt"></i> : <i className="fas fa-expand-arrows-alt"></i>}
                                    </button>
                                    <Modal
                                        size='small'
                                        trigger={<button
                                            className="overlay-button">
                                            <i className="fas fa-info"></i>
                                        </button>}
                                        header="Information"
                                        content={<Info />}
                                        actions={["Stornieren", { key: 'done', content: "Schließen", positive: true }]}
                                    />
                                </div>
                            </div>
                        </div>
                    </Menu.Menu>
                </Menu>
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
)(NavBar);