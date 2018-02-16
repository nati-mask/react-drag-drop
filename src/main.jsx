import React from 'react';
import { render } from 'react-dom';

const App = require('./components/App.jsx');

module.exports = render(<App />, document.getElementById('root'));
