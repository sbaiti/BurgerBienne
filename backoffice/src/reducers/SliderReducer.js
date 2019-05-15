import {
    GET_SLIDERS, ADD_SLIDER, DELETE_SLIDER, DELETE_ALL_SLIDER, TOGGLE
} from "../actions/types";

const INITIAL_STATE = {
    sliders: [],
    slider: {},
    open: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DELETE_ALL_SLIDER:
            return {
                ...INITIAL_STATE
            };
        case GET_SLIDERS:
            return {
                ...state,
                sliders: action.payload,

            };
        case ADD_SLIDER:
            return {
                ...state,
                slider: action.payload
            };
        case DELETE_SLIDER:
            return {
                ...state,
                sliders: action.payload
            };
        case TOGGLE:
            return {
                ...state,
                open: action.payload
            };
        default:
            return state;
    }
};
