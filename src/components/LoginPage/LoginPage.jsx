import React from 'react';

const Title = require('./Title.jsx');
const LoginFields = require('./LoginFields.jsx');
const Button = require('../global/Button.jsx');

const { loginManager } = require('../../singletons');

require('./LoginPage.less');

module.exports = class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }

        this.loginAttemptHandler = this.loginAttemptHandler.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }

    loginAttemptHandler (event) {
        event.preventDefault();
        if (this.props.onLoginAttempt) this.props.onLoginAttempt(this.state);
        else throw new Error('<LoginPage> has No handler for login attempt');
    }

    inputHandler(event) {

        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value });
    }

    preventDefault(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className="login-page">
                <form>
                    <Title title="Login"/>
                    <LoginFields onInput={this.inputHandler} username={this.state.username} password={this.state.password} />
                    {
                        this.props.loginning ?
                        <Button className="blk" caption="..." onClick={this.preventDefault} /> :
                        <Button className="blk" caption="Let me in." onClick={this.loginAttemptHandler} />
                    }
                    {
                        this.props.login_error &&
                        <div className="login-error">{this.props.login_error}</div>
                    }
                </form>
            </div>
        );
    }
}
