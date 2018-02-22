import React from 'react';

require('./Loading.less');

module.exports = function Button(props) {
    return (
        <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>
    );
}

