import React from 'react';

module.exports = function Button(props) {
    return (
        <button className='app-btn' onClick={props.onClick}>
            {props.caption}
        </button>
    );
}