import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class Events extends Component {
    render() {
        const { eventsList, sectionTitle } = this.props;
        const { sortedByName, sortedByDate } = this.state;

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
                                    <div className = { `events__sorter-title${ (sortedByName) ? ' is-active' : '' }` }
                                         onClick = { this.sortEventsListByTitle }
                                    >
                                        <span>Название соревнования</span>
                                    </div>

                                    <div className = { `events__sorter-date${ (sortedByDate) ? ' is-active' : '' }` }
                                         onClick = { this.sortEventsListByDate }
                                    >
                                        <span>Дата проведения</span>
                                    </div>
                                    
                                    <div className="events__sorter-place">Место проведения</div>
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