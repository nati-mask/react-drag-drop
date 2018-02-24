import React from 'react';

require('./Button.less');

module.exports = function Button(props) {
    let className = 'app-btn';
    if (props.className) className += ' ' + props.className;
    return (
        <button className={className} onClick={props.onClick}>
            {props.caption}
        </button>
    );
}