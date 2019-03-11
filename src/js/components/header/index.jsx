import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

@inject('User')
@withRouter
@observer
export default class Header extends React.Component {

    render() {
        const { User } = this.props;

        console.log(User.user);

        return (
            <header className="header u-center">
                <div className="header__container">
                    <div className="header__top">
                        <Link className="header__logo" to="/">
                            {/* Here I will add svg logo */}
                        </Link>

                        <div className="header__humb">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    <div className="header__body">
                        {this.__renderNavigation()}

                        <div className="header__auth">
                            {User.user ? (
                                <button className="header__auth-button"
                                        onClick={this.__onLogout}
                                >Выйти</button>
                            ) : (
                                <Link className="header__auth-button"
                                      to="/login"
                                >Войти</Link>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    __renderNavigation = () => {
        const { User } = this.props;

        if (!User.user) {
            return undefined;
        }

        return (
            <nav className="header__nav">
                {
                    User.isAdmin() ? (
                        <Link
                            className="header__nav-item header__nav-item--for-admin"
                            to="/clubs"
                        >Команды*</Link>
                    ) : undefined
                }

                <Link className="header__nav-item" to="/club">
                    Команда
                </Link>
                <Link className="header__nav-item" to="/events">
                    Соревнования
                </Link>
                <Link className="header__nav-item" to="/support">
                    Обратная связь
                </Link>
            </nav>
        );
    };

    __onLogout = () => {
        const { User, history } = this.props;

        User.logout();
        history.push('/login');
    };
}