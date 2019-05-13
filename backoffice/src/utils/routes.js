import React from 'react';
import Home from '../components/home/Home';


function getRoutes() {
    let routes = {};
    let activeRoutes = [
        {
            Name: "Home",
            icon: <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />,
            path: '/home',
            libelle: 'Zuhause',
            component: Home
        },
    ];

    routes.activeRoutes = activeRoutes;
    return routes;
}

export { getRoutes };