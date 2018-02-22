import React from 'react';

const Title = require('./Title.jsx');
const LoginFields = require('./LoginFields.jsx');
const Button = require('../global/Button.jsx');

const { username, password } = require('../../../.env.json');
const { loginManager } = require('../../singletons');

module.exports = class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loginning: false,
        }

        this.loginHandler = this.loginHandler.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }

    loginHandler () {
        if(this.props.onSuccess) {
            this.setState({ loginning: true });
            loginManager.login(this.state).then(user => {
                this.setState({ loginning: false });
                this.props.onSuccess(user);
            }).catch(err => {
                this.setState({ loginning: false });
                console.error(err)
            });
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
                {
                    this.state.loginning ? <Button caption="..." /> : <Button caption="Log me in!!" onClick={this.loginHandler} />
                }
            </div>
        );
    }
}
