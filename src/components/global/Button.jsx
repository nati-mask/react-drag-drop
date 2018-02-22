import React from 'react';

require('./Button.less');

module.exports = function Button(props) {
    return (
        <button className={'app-btn' + (props.className ? ' ' + props.className : '')} onClick={props.onClick}>
            {props.caption}
        </button>
    );
}