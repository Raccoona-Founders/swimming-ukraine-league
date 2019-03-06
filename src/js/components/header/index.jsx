import React from 'react';
import {inject, observer} from 'mobx-react';
import { withRouter } from 'react-router';

@inject('User')
@withRouter
@observer
export default class Header extends React.Component {
    __onLogout = () => {
        const {User, history} = this.props;

        history.push('/login');
        User.logout();
    };

    __onLogin = () => {
        this.props.history.push('/login');
    };

    render() {
        const {User} = this.props;

        return (
            <header className="header">
                <div className="header-content">
                    {User.authUser ? (
                        <div>{User.authUser.displayName}</div>
                    ) : <div>Ты будешь круче!</div>}

                    {User.authUser ? (
                        <button onClick={this.__onLogout}>Logout</button>
                    ) : <div />}
                </div>
            </header>
        );
    }
}