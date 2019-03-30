import React from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';

@inject('User')
@observer
export default class PrivateRoute extends React.Component {
    render() {
        const { User, component: Component, ...rest } = this.props;

        return (
            <Route
                {...rest}
                render={props =>
                    User.authUser ? (
                        <Component {...props} />
                    ) : (
                            <Redirect
                                to={{ pathname: '/login', state: { from: props.location } }}
                            />
                        )
                }
            />
        );
    }
}