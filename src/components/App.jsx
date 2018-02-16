import React from 'react';

const DropBox = require('../components/DropBox.jsx');

require('./App.less');

module.exports = class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { test: 0 };
        this.updateTest = this.updateTest.bind(this);
    }

    updateTest() {
        this.setState(prevState => ({
            test: prevState.test + 1
        }));
    }

    render() {
        return (
            <div>
                <p className="legend"> Drag and Drop React Tech Challange ({this.state.test + 1}) </p>
                <button onClick={this.updateTest}>Update</button>
                <DropBox />
            </div>
        );
    }
}
