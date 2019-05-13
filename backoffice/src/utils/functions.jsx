import React from 'react';
import config from '../config/config.json';


function prepareData(data) {
    const array = data.map((item, key) => (
        {
            image: <img
                src={`${config.apiUrl}/Slider/Images?image=` + item.Name}
                alt="event"
                key={key}
                id={item._id}
                width={'230px'}
                height={'350px'}
            >
            </img>,
            name: item.nameEvent || '',
            detail: item.Description || ''
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