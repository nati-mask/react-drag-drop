import React from 'react';

require('./HomePage.less');

const DropBox = require('./DropBox.jsx');

module.exports = class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status : null,
        }
        this.setStatusText = this.setStatusText.bind(this);
    }

    setStatusText (text) {
        this.setState({ status:text });
    }

    render() {
        return (
            <div className="home-page">
                { this.state.status && <div className="status">{this.state.status}</div> }
                <DropBox full_name={this.props.logged_in_full_name} setStatusText={this.setStatusText}/>
            </div>
        )
    }

}
