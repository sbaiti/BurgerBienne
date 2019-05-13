import { GET_SLIDERS, ADD_SLIDER, DELETE_SLIDER, TOGGLE } from './types';
import { getSliders, addSliders } from '../services/SliderService';


export const getAllSlider = () => {
    return dispatch => {
        getSliders().then(slider => {
            const { data } = slider
            dispatch(
                {
                    type: GET_SLIDERS,
                    payload: data.slider
                }
            );
        });
    };
}

export const togglePopup = (bool) => {
    return dispatch => (
        dispatch({
            type: TOGGLE,
            payload: bool
        })
    );
}

export const addSliderAction = (file) => {
    return dispatch => {
        addSliders(file).then(slider => {
            const { data } = slider
            dispatch(
                {
                    type: ADD_SLIDER,
                    payload: data.slider
                }
            );
        });
    };
}