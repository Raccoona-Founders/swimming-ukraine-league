import React from 'react';
import Home from './pages/home';
import {Switch, Router, Route} from 'react-router';

export default class AppRouter extends React.PureComponent {
    render() {
        return (
            <Router history={this.props.history}>
                <Switch>
                    <Route path="/" component={Home}/>
                    <Route path="*" render={() => <div>Page 404</div>}/>
                </Switch>
            </Router>
        );
    }
}
