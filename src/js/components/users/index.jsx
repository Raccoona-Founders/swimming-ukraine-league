import React, { Compontent } from 'react';

export default class Users extends Compontent {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <section className = "users l-container">
                <div className = "l-content">
                    <div className = "topic">
                        <h1 className = "topic__title">Участники команды</h1>
                        <div className = "topic__button">Добавить</div>
                    </div>

                    <div className = "users__container">
                        <div className = "users__sorter">
                            <div className = "users__sorter-name">
                                <span>Фио</span>
                            </div>
                            
                            <div className = "users__sorter-born">
                                <span>Дата рождения</span>
                            </div>

                            <div className = "users__sorter-sex">
                                <span>Пол</span>
                            </div>

                            <div className = "users__sorter-country">
                                <span>Страна</span>
                            </div>
                        </div>

                        <div className = "users__list">
                            <div className = "users-item"></div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}