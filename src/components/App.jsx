import React from 'react';

const HomePage = require('./HomePage/HomePage.jsx');
const LoginPage = require('./LoginPage/LoginPage.jsx');
const Button = require('./global/Button.jsx');
const Loading = require('./global/Loading.jsx');

const { loginManager } = require('../singletons');

require('./App.less');

module.exports = class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginning : false,
            checking_auth: true,
            login_error : null,
            logged_in: null,
            logged_in_full_name: null,
        };
        this.loginHandler = this.loginHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
    }

    loginHandler(auth_details) {
        this.setState({ loginning: true, login_error: null });
        loginManager.login(auth_details).then(logged_user => {
            this.setState({
                loginning: false,
                logged_in: logged_user.username,
                logged_in_full_name: logged_user.full_name
            });
        }).catch(err => {
            let error_msg = err.message;
            this.setState({
                loginning: false,
                login_error: error_msg,
            });
        });
    }

    logoutHandler() {
        loginManager.logout(); // Not async, logout is immediate.
        this.setState({ logged_in: null });
    }

    componentWillMount() {
        loginManager.checkLoggedIn().then(logged_user => {
            if (logged_user) {
                this.setState({ logged_in: logged_user.username, logged_in_full_name: logged_user.full_name, checking_auth : false });
            } else {
                this.setState({ checking_auth: false });
            }
        })
    }

    render() {
        var current_page = <Loading />;
        if (!this.state.checking_auth) current_page = (
            this.state.logged_in ?
            <HomePage logged_in_full_name={this.state.logged_in_full_name} /> :
            <LoginPage onLoginAttempt={this.loginHandler} loginning={this.state.loginning} login_error={this.state.login_error}/>
        );
        return (
            <div>
                <header>
                    <p>
                        Drag and Drop React Tech Challange
                        { this.state.logged_in && <Button className="log-out-btn" caption="Log Out" onClick={this.logoutHandler}/> }
                    </p>
                </header>
                <div className="page-wrapper">
                    { current_page }
                </div>
            </div>
        );
    }
}
