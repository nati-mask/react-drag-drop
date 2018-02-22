import React from 'react';

const DropBox = require('./DropBox.jsx');
const LoginPage = require('./LoginPage/LoginPage.jsx');
const Button = require('./global/Button.jsx');
const Loading = require('./global/Loading.jsx');

const { loginManager } = require('../singletons');

require('./App.less');

module.exports = class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            logged_in: null,
            checking_auth: true,
        };
        this.loginSuccessHandler = this.loginSuccessHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
    }

    logoutHandler() {
        loginManager.logout();
        this.setState({ logged_in: null });
    }

    loginSuccessHandler(logged_user) {
        this.setState({ logged_in: logged_user.username });
    }

    componentWillMount() {
        loginManager.checkLoggedIn().then(logged_user => {
            console.log("Finish checking Auth!");
            if (logged_user) {
                this.setState({ logged_in: logged_user.username, checking_auth : false });
            } else this.setState({ checking_auth: false });
        })
    }

    render() {
        var current_page = <Loading />;
        if(!this.state.checking_auth) current_page = this.state.logged_in ? <DropBox /> : <LoginPage onSuccess={this.loginSuccessHandler} />;
        return (
            <div>
                <header className="legend">
                    <p>
                        Drag and Drop React Tech Challange
                        { this.state.logged_in && <Button caption="Log Out" onClick={this.logoutHandler}/> }
                    </p>
                </header>
                <div className="page">
                    { current_page }
                </div>
            </div>
        );
    }
}
