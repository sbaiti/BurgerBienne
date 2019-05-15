import { GET_SLIDERS, ADD_SLIDER, DELETE_SLIDER, DELETE_ALL_SLIDER, TOGGLE } from './types';
import { getSliders, addSliders, deleteAllSliders, deleteOneSlider } from '../services/SliderService';


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
            const { data } = slider;
            dispatch(
                {
                    type: ADD_SLIDER,
                    payload: data.slider
                }
            );
        });
    };
}

export const deleteAll = (file) => {
    return dispatch => {
        deleteAllSliders(file).then(slider => {
            dispatch(
                {
                    type: DELETE_ALL_SLIDER
                }
            );
        });
    };
}

export const deleteOne = (id) => {
    return dispatch => {
        deleteOneSlider(id).then(slider => {
            getSliders().then(slider => {
                const { data } = slider
                dispatch(
                    {
                        type: DELETE_SLIDER,
                        payload: data.slider
                    }
                );
            })
        });
    };
}