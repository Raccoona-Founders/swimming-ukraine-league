import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class Events extends Component {
    render() {
        const { eventsList, sectionTitle } = this.props;

        return (
            <section className="events l-container">
                <div className="l-content">
                    <div className="topic">
                        <div className="topic__title">{sectionTitle}</div>
                        <button className="topic__button">Добавить*</button>
                    </div>

                    {
                        (eventsList.length > 0) ? (
                            <Fragment>
                                <div className="events__sorter">
                                    <div className="events__sorter-title">
                                        <span>Название соревнования</span>
                                    </div>
                                    <div className="events__sorter-date">
                                        <span>Дата проведения</span>
                                    </div>
                                    <div className="events__sorter-place">
                                        Место проведения
                                    </div>
                                </div>

                                <div className="events__list">
                                    {this.__renderEventItemsList()}
                                </div>
                            </Fragment>
                        ) : (
                            <div className="events__empty">
                                {sectionTitle} появятся в скором времени
                            </div>
                        )
                    }
                </div>
            </section>
        );
    }

    __renderEventItemsList = () => {
        const { eventsList } = this.props;

        return eventsList.map((eventData) => {
            return <Event eventData={eventData} key={eventData.id}/>;
        });
    };
}

function Event(props) {
    const { id, title, dateStart, dateEnd, city, country } = props.eventData;

    return (
        <Link className="event-item" to={`/event/${id}`}>
            <div className="event-item__title">{title}</div>
            <time className="event-item__date">{
                (dateStart !== dateEnd)
                    ? `${dateStart} - ${dateEnd}`
                    : dateStart
            }</time>
            <div className="event-item__place">{city}, {country}</div>
        </Link>
    );
}