import React from 'react';
import {inject, observer} from 'mobx-react';

@inject('User')
@observer
export default class Login extends React.Component {
    render() {
        return (
            <div>
                <h1>Войдит что бы стать круче!</h1>

                <button onClick={this.__onGoogleLogin}>
                    Через Google
                </button>
            </div>
        );
    }

    __onGoogleLogin = () => {
        const { User, history } = this.props;

        let { from } = this.props.location.state || { from: { pathname: '/' } };

        if (User.resolveAuthUser) {
            history.push(from.pathname);
            return;
        }

        User.loginViaGoogle()
            .then(result => history.push(from.pathname));
    }
}