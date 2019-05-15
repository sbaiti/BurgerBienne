import React from 'react';
import config from '../config/config.json';


function prepareData(data) {
    const array = data.map((item, key) => (
        {
            image: <img
                src={`${config.apiUrl}/Slider/Images?image=` + item.Name}
                alt="slider"
                key={key}
                id={item._id}
                width={'700px'}
                height={'300px'}
            >
            </img>
        }
    ));
    return array;
}

const Greet = ({ msg }) => (
    <div> {msg} </div>
);

export {
    prepareData, Greet
}