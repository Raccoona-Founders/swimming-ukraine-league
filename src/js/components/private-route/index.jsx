import React from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';

@inject('User')
@observer
export default class PrivateRoute extends React.Component {
    render() {
        const {
            User,
            onlyAdmin = false,
            component: Component,
            ...rest
        } = this.props;

        return (
            <Route
                {...rest}
                render={props => {
                    if (!User.user) {
                        return <Redirect
                            to={{pathname: '/login', state: { from: props.location }}}
                        />;
                    }

                    if (onlyAdmin && !User.isAdmin()) {
                        return <Redirect
                            to={{pathname: '/' }}
                        />;
                    }

                    return <Component {...props} />;
                }}
            />
        );
    }
}