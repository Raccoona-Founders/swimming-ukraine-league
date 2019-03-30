import React, { Component } from 'react';
import EventItem from './event-item';

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
        this.sortEventsListByDate = this.__sortEventsListByDate.bind(this);
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

        let newEventsList = [...eventsList].sort((currentEvent, nextEvent) => {
            if (!sortedByName) {
                return (currentEvent.title > nextEvent.title) ? 1 : -1;
            }
        });

        this.setState({
            eventsList: newEventsList,
            sortedByName: !sortedByName,
            sortedByDate: false
        });
    }

    __sortEventsListByDate() {
        const { eventsList } = this.props;
        const { sortedByDate } = this.state;

        let newEventsList = [...eventsList];

        if (!sortedByDate) {
            newEventsList = [...eventsList].sort((currentEvent, nextEvent) => {
                const currentDateToArray = currentEvent.dateStart.split('.').reverse();
                const nextDateToArray = nextEvent.dateStart.split('.').reverse();

                return new Date(currentDateToArray).getTime() - new Date(nextDateToArray).getTime();
            });
        }

        this.setState({
            eventsList: newEventsList,
            sortedByName: false,
            sortedByDate: !sortedByDate
        });
    }

    render() {
        const { eventsList, sectionTitle } = this.props;
        const { sortedByName, sortedByDate } = this.state;

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

                                    <div className="events__sorter-place">Место проведения</div>
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
        )
    }
}

