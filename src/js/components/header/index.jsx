import React from 'react';
import {inject, observer} from 'mobx-react';
import { withRouter } from 'react-router';

@inject('User')
@withRouter
@observer
export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isUserAdmin: 'true' // later we need to think about this property, becouse we need to detect the user permitions to show him more functional if needed. For development its just fine
        }

        this.onLogout = this.__onLogout.bind(this);
        this.onLogin = this.__onLogin.bind(this);
        this.onHeaderLinkClick = this.__onHeaderLinkClick.bind(this);
    }

    __onLogout = () => {
        const {User, history} = this.props;

        history.push('/login');
        User.logout();
    };

    __onLogin = () => {
        this.props.history.push('/login');
    };

    __onHeaderLinkClick = (event) => {
        const { target } = event;

        event.preventDefault();

        this.props.history.push(target.getAttribute('href'));
    }

    render() {
        const { User } = this.props;
        const { isUserAdmin } = this.state;

        return (
            <header className="header u-center">
                <div className="header__container">
                    <div className="header__top">
                        <a className="header__logo" href="/" onClick={ this.onHeaderLinkClick }>
                            {/* Here I will add svg logo */}
                        </a>

                        <div className="header__humb">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    <div className="header__body">
                        <nav className="header__nav">
                            { isUserAdmin ? (
                                <a className="header__nav-item" href="/clubs" onClick={ this.onHeaderLinkClick }>Команды*</a>
                            ) : '' }

                            <a className="header__nav-item" href="/club" onClick={ this.onHeaderLinkClick }>Команда</a>
                            <a className="header__nav-item" href="/events" onClick={ this.onHeaderLinkClick }>Соревнования</a>
                            <a className="header__nav-item" href="/support" onClick={ this.onHeaderLinkClick }>Обратная связь</a>
                        </nav>

                        {/* For some reasons I can't login/sign up using google now. May be we have some functional mistakes */}
                        <div className="header__auth">
                            <div className="header__auth-logout" onClick={ this.onLogout }>Выйти</div>
                        </div> 

                        { User.authUser ? (
                            <div className="header__auth">
                                <div className="header__auth-logout" onClick={ this.onLogout }>Выйти</div>
                            </div> 
                        ) : '' }
                    </div>
                </div>
            </header>
        );
    }
}