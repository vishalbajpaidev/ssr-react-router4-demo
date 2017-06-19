import React, {Component} from 'react';
import Main from './components'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Main/>
            </Router>
        );
    }
}


