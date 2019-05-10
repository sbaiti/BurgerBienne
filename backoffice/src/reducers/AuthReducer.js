import {
    LOGIN_USER,
    LOGOUT,
    FAILED_LOGIN
} from "../actions/types";

const INITIAL_STATE = {
    isAuthenticated: false,
    user: {},
    error: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGOUT:
            return {
                INITIAL_STATE
            };
        case LOGIN_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,

            };
        case FAILED_LOGIN:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
