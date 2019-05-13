import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { getRoutes } from '../../../utils/routes';
import { findIndex } from 'lodash';
import ClickOutside from './ClickOutside';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './Sidebar.css';


class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }
    render() {
        return (
            <div className="side__bar">
                <ClickOutside
                    onClickOutside={() => {
                        this.setState({ expanded: false });
                    }}
                >
                    <SideNav
                        expanded={this.state.expanded}
                        onToggle={(expanded) => {
                            this.setState({ expanded });
                        }}
                        onSelect={(selected) => {
                           // const index = findIndex(getRoutes().activeRoutes, (route) => (route.libelle).toUpperCase() === selected.toUpperCase());
                           // this.props.setActiveItem(index);
                        }}
                    >
                        <SideNav.Toggle />
                        <SideNav.Nav defaultSelected={getRoutes().activeRoutes[0].libelle}>
                            {getRoutes().activeRoutes.map((route, key) =>
                                <NavItem eventKey={route.libelle} key={key}>
                                    <NavIcon>
                                        {route.icon}
                                    </NavIcon>
                                    <NavText>
                                        {route.libelle}
                                    </NavText>
                                </NavItem>
                            )}
                        </SideNav.Nav>
                    </SideNav>
                </ClickOutside>
            </div>
        )
    }
}

export default SideBar;