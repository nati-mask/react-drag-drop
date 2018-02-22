import React from 'react';

require('./Title.less');

module.exports = class Title extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <h1 className="title">{this.props.title}</h1>;
    }
}
