import React from 'react';
import {inject, observer} from 'mobx-react';

@inject('User')
@observer
export default class Home extends React.Component {
    render() {
        const {User} = this.props;

        console.log(User.authUser);

        if (User.loading) {
            return <div>Await</div>;
        }

        if (User.authUser) {
            return (
                <div>
                    <div>{User.authUser.displayName}</div>
                    <button onClick={() => User.logout()}>Logout</button>
                </div>
            );
        }

        return (
            <div>
                <div>Please, login</div>
                <button onClick={() => User.loginViaGoogle()}>
                    Google Login
                </button>
            </div>
        );
    }
}