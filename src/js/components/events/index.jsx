import React, { Component, Fragment } from 'react';
import Event from './event';

export default class Events extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sortedByName: false,
            sortedByDate: false,
            eventsList: [...this.props.eventsList],
        }

        this.renderEventItemsList = this.__renderEventItemsList.bind(this);
        this.sortEventsListByTitle = this.__sortEventsListByTitle.bind(this);
    }

    __renderEventItemsList() {
        const { eventsList } = this.state;

        return eventsList.map((eventData) => {
            return <Event eventData = { eventData } key= { eventData.id }/>
        });
    }

    __sortEventsListByTitle() {
        console.log('test');

        const { eventsList, sortedByName } = this.state;

        let newState = {};

        if (sortedByName) {
            const newEventsList = [...eventsList].sort((a, b) => {
                a.title.charAt(0) > b.title.charAt(0);

                console.log(a.title.charAt(0) > b.title.charAt(0));
            });

            newState.eventsList = newEventsList;
            newState.sortedByName = true;
        } else {
            const newEventsList = [...eventsList].sort((a, b) => {
                a.id > b.id;
            });

            newState.eventsList = newEventsList;
            newState.sortedByName = false;
        }

        this.setState(newState);

        console.log(this.state.eventsList);
    }

    render() {
        const { eventsList, sectionTitle } = this.props;

        return (
            <section className="events l-container">
                <div className="l-content">
                    <div className="topic">
                        <div className="topic__title">{ sectionTitle }</div>
                        <button className="topic__button">Добавить*</button>
                    </div>

                    {
                        (eventsList.length > 0) ? (
                            <Fragment>
                                <div className="events__sorter">
                                    <div className="events__sorter-title" onClick={ this.sortEventsListByTitle }><span>Название соревнования</span></div>
                                    <div className="events__sorter-date"><span>Дата проведения</span></div>
                                    <div className="events__sorter-place">Место проведения</div>
                                </div>

                                <div className="events__list">
                                    { this.renderEventItemsList() }
                                </div>
                            </Fragment>
                        ) : (
                            <div className="events__empty">{ sectionTitle } появятся в скором времени</div>
                        )
                    }
                </div>
            </section>
        )
    }
}

