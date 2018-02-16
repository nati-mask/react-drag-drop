import React from 'react';

module.exports = class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { test: 0 };
        console.log('Hi!');
        this.updateTest = this.updateTest.bind(this);
    }

    updateTest() {
        this.setState(prevState => ({
            test: prevState.test + 1
        }));
    }

    render() {
        return (
            <p>
                Hello React! Just workong hong kon foo ({this.state.test + 1})
                <button onClick={this.updateTest}>Update</button>
            </p>
        );
    }
}
