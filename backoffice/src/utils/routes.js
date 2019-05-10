import Login from '../components/login/Login';
import Home from '../components/home/Home';


function getRoutes() {
    let routes = {};
    let activeRoutes = [
        {
            Name: "Login",
            path: '/',
            component: Login
        },
        {
            Name: "Home",
            path: '/home',
            component: Home
        },
    ];

    routes.activeRoutes = activeRoutes;
    return routes;
}

export { getRoutes };