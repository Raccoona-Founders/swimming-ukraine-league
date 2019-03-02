import React from 'react';
import {Switch, Router, Route} from 'react-router';
import {createBrowserHistory} from 'history';

import Home from './pages/home';

const history = createBrowserHistory();

export default class Application extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" component={Home}/>
                    <Route path="*" render={() => <div>Page 404</div>}/>
                </Switch>
            </Router>
        );
    }
}
