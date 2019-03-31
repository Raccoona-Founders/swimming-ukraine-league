import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Switch, Router, Route } from 'react-router';

import PrivateRoute from './components/private-route';
import Login from './pages/login';
import Header from './components/header';
import Home from './pages/home';
import Club from './pages/clubs/club';
import Events from './pages/events';
import Error404 from './pages/error404';

// for Admin users
import Clubs from './pages/clubs';


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
                    <Header/>

                    <Switch>
                        <PrivateRoute path="/" component={Home} exact/>
                        <Route path="/login" component={Login}/>

                        <PrivateRoute onlyAdmin={true} path="/clubs" component={Clubs}/>

                        <Route path="/events" component={Events}/>
                        <Route path="/club" component={Club}/>

                        <Route path="*" component={Error404}/>
                    </Switch>
                </Fragment>
            </Router>
        );
    }
}
