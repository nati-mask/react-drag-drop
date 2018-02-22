import React from 'react';

require('./LoginFields.less');

module.exports = class LoginFields extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="login-fields">
                <input type="text" name="username" value={this.props.username} onInput={this.props.onInput} />
                <input type="password" name="password" value={this.props.password} onInput={this.props.onInput}/>
            </div>
        )
    }
}