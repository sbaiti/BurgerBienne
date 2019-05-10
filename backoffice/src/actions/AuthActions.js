import { LOGIN_USER, FAILED_LOGIN, LOGOUT } from './types';
import { loginUser, loginWithJwt, getCurrentUser } from '../services/AuthServices';

export const onLogin = (email, password) => {
    return dispatch => {
        loginUser(email, password).then(User => {
            const { data } = User;
            loginWithJwt(data.token);
            const userDecoded = getCurrentUser(data);
            console.log('***********',userDecoded);
            dispatch(successLogin(userDecoded));
        })
            .catch(err => {
                dispatch({
                    type: FAILED_LOGIN,
                    payload: err.response.data
                })

            })


    };
}

export const successLogin = (user) => {
    return {
        type: LOGIN_USER,
        payload: user

    };
};

export const onLogout = () => {
    return { type: LOGOUT };
};