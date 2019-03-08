import React, { Component, Fragment } from 'react';

export default class Events extends Component {
    constructor(props) {
        super(props);

        this.renderEventItemsList = this.__renderEventItemsList.bind(this);
    }

    __renderEventItemsList() {
        const { eventsList } = this.props;

        return eventsList.map((eventData) => {
            return <Event eventData = { eventData } key= { eventData.id }/>
        });
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
                                    <div className="events__sorter-title"><span>Название соревнования</span></div>
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

function Event(data) {
    const { id, title, dateStart, dateEnd, city, country } = data.eventData;

    return (
        <a className="event-item" href={ `/event/${ id }` }>
            <div className="event-item__title">{ title }</div>
            <time className="event-item__date">{ 
                (dateStart !== dateEnd) 
                ? `${ dateStart } - ${ dateEnd }` 
                : dateStart 
            }</time>
            <div className="event-item__place">{ city }, { country }</div>
        </a>
    )
}