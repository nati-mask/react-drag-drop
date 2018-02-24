import React from 'react';

require('./HomePage.less');

const DropBox = require('./DropBox.jsx');

module.exports = class HomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home-page">
                <DropBox full_name={this.props.logged_in_full_name} />
            </div>
        )
    }

}
