import React from 'react';

const Title = require('./Title.jsx');
const LoginFields = require('./LoginFields.jsx');
const Button = require('../global/Button.jsx');

const { username, password } = require('../../../.env.json');

module.exports = class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }

        this.loginHandler = this.loginHandler.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }

    loginHandler () {
        if(this.props.onSuccess) {
            if(this.state.username === username && this.state.password === password) {
                this.props.onSuccess(username);
            } else console.error('Bad username or password!');
        }
    }

    inputHandler(event) {

        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <div>
                <Title title="Login"/>
                <LoginFields onInput={this.inputHandler} username={this.state.username} password={this.state.password} />
                <Button caption="Log me in!!" onClick={this.loginHandler} />
            </div>
        );
    }
}
