import React from 'react';

const DropBox = require('./DropBox.jsx');
const LoginPage = require('./LoginPage/LoginPage.jsx');

require('./App.less');

module.exports = class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            test: 0,
            logged_in: null,
        };
        this.updateTest = this.updateTest.bind(this);
        this.loginSuccessHandler = this.loginSuccessHandler.bind(this);
    }

    updateTest() {
        this.setState(prevState => ({
            test: prevState.test + 1
        }));
    }

    loginSuccessHandler(username) {
        console.log('Success handler works!');
        this.setState({ logged_in: username });
    }

    render() {
        return (
            <div>
                <p className="legend"> Drag and Drop React Tech Challange ({this.state.test + 1}) </p>
                <button onClick={this.updateTest}>Update</button>
                {!this.state.logged_in && <LoginPage onSuccess={this.loginSuccessHandler}/>}
                { this.state.logged_in && <DropBox />}
            </div>
        );
    }
}
