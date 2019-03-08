import React, { Fragment } from 'react';

import { inject, observer } from 'mobx-react';
import { Switch, Router, Route } from 'react-router';

import PrivateRoute from './components/private-route';
import Header from './components/header';
import Home from './pages/home';
import Login from './pages/login';

@inject('User')
@observer
export default class AppRouter extends React.Component {
    render() {
        const { User } = this.props;

        if (User.loading) {
            return <div className="initial-awaiting-section">Подождите...</div>;
        }

        return (
            <Router history={this.props.history}>
                <Fragment>
                    <Header />

                    <Switch>
                        <PrivateRoute path="/" component={Home} exact />
                        <Route path="/login" component={Login} />
                        <Route path="*" render={() => <div>Page 404</div>} />
                    </Switch>
                </Fragment>
            </Router>
        );
    }
}
