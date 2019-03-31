import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import EventItem from './event-item';

@inject('eventsList')
@observer
export default class Events extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sortedByName: false,
            sortedByDate: false,
            sortedByPlace: false,
            eventsList: [...this.props.eventsList],
        }

        this.renderEventItemsList = this.__renderEventItemsList.bind(this);
        this.sortEventsListByTitle = this.__sortEventsListByTitle.bind(this);
        this.sortEventsListByDate = this.__sortEventsListByDate.bind(this);
        this.sortEventsListByPlace = this.__sortEventsListByPlace.bind(this);
    }

    render() {
        const { eventsList, sectionTitle } = this.props;
        const { sortedByName, sortedByDate, sortedByPlace } = this.state;

        return (
            <section className="events l-container">
                <div className="l-content">
                    <div className="topic">
                        <div className="topic__title">{sectionTitle}</div>
                        <button className="topic__button topic__button--for-admin">Добавить*</button>
                    </div>

                    {
                        (eventsList.length > 0) ? (
                            <div className="events__container">
                                <div className="events__sorter">
                                    <div className={`events__sorter-title${(sortedByName) ? ' is-active' : ''}`}
                                        onClick={this.sortEventsListByTitle}
                                    >
                                        <span>Название соревнования</span>
                                    </div>

                                    <div className={`events__sorter-date${(sortedByDate) ? ' is-active' : ''}`}
                                        onClick={this.sortEventsListByDate}
                                    >
                                        <span>Дата проведения</span>
                                    </div>

                                    <div className={`events__sorter-place${(sortedByPlace) ? ' is-active' : ''}`}
                                        onClick={this.sortEventsListByPlace}>
                                        <span>Место проведения</span>
                                    </div>
                                </div>

                                <div className="events__list">
                                    {this.renderEventItemsList()}
                                </div>
                            </div>
                        ) : (
                            <div className="events__empty">{sectionTitle} появятся в скором времени</div>
                        )
                    }
                </div>
            </section>
        );
    }

    __renderEventItemsList() {
        const { eventsList } = this.state;

        return eventsList.map((eventData) => {
            return <EventItem eventData={eventData} key={eventData.id} />
        });
    }

    __sortEventsListByTitle() {
        const { eventsList } = this.props;
        const { sortedByName } = this.state;

        let newEventsList;

        if (!sortedByName) {
            newEventsList = [...eventsList].sort((currentEvent, nextEvent) => {
                return (currentEvent.title > nextEvent.title) ? 1 : -1;
            });
        }

        this.setState({
            eventsList: (newEventsList) ? newEventsList : eventsList,
            sortedByName: !sortedByName,
            sortedByDate: false,
            sortedByPlace: false
        });
    }

    __sortEventsListByDate() {
        const { eventsList } = this.props;
        const { sortedByDate } = this.state;

        let newEventsList;

        if (!sortedByDate) {
            newEventsList = [...eventsList].sort((currentEvent, nextEvent) => {
                const currentDateToArray = currentEvent.dateStart.split('.').reverse();
                const nextDateToArray = nextEvent.dateStart.split('.').reverse();

                return new Date(currentDateToArray).getTime() - new Date(nextDateToArray).getTime();
            });
        }

        this.setState({
            eventsList: (newEventsList) ? newEventsList : eventsList,
            sortedByName: false,
            sortedByDate: !sortedByDate,
            sortedByPlace: false
        });
    }

    __sortEventsListByPlace() {
        const { eventsList } = this.props;
        const { sortedByPlace } = this.state;

        let newEventsList;

        if (!sortedByPlace) {
            newEventsList = [...eventsList].sort((currentEvent, nextEvent) => {
                if (currentEvent.country === nextEvent.country) {
                    return (currentEvent.city > nextEvent.city) ? 1 : -1;
                }

                return (currentEvent.country > nextEvent.country) ? 1 : -1;
            });
        }

        this.setState({
            eventsList: (newEventsList) ? newEventsList : eventsList,
            sortedByName: false,
            sortedByDate: false,
            sortedByPlace: !sortedByPlace
        });
    }
}