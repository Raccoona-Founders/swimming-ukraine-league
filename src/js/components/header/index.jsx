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
            <header>
                Test
            </header>        
            // <header className="header">
            //     <div className="header-content">
            //         {User.resolveAuthUser ? (
            //             <div>{User.resolveAuthUser.displayName}</div>
            //         ) : <div>Ты будешь круче!</div>}

            //         {User.resolveAuthUser ? (
            //             <button onClick={this.__onLogout}>Logout</button>
            //         ) : <div />}
            //     </div>
            // </header>
        );
    }
}