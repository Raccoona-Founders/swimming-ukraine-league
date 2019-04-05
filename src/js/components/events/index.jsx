import React from 'react';
import moment from 'moment';
import ReactTable from 'react-table';
import { inject, observer } from 'mobx-react';

@inject('Event')
@observer
export default class Events extends React.Component {
    render() {
        const {sectionTitle, Event} = this.props;

        if (Event.loading) {
            return <div>Loading table</div>;
        }

        const columns = [{
            Header: 'Название соревнования',
            accessor: 'title'
        }, {
            id: 'date',
            Header: 'Дата проведения',
            accessor: this.dateAccessor,
        }, {
            id: 'place',
            Header: 'Место проведения',
            accessor: this.placeAccessor,
        }];

        return (
            <section className="events l-container">
                <div className="l-content">
                    <div className="topic">
                        <div className="topic__title">{sectionTitle}</div>
                        <button className="topic__button topic__button--for-admin">Добавить*</button>
                    </div>

                    <ReactTable
                        data={Event.eventList}
                        columns={columns}
                        loading={Event.loading || Event.eventList === 0}
                        noDataText={`${sectionTitle} появятся в скором времени`}
                        minRows={5}
                        showPagination={false}
                        showPageJump={false}
                    />
                </div>
            </section>
        );
    }

    dateAccessor = (d) => {
        const start = moment(d.dateStart).format('DD MMM');
        const end = moment(d.dateEnd).format('DD MMM');

        if (start !== end) {
            return start + ' - ' + end;
        }

        return start;
    };


    placeAccessor = (d) => {
        return `${d.city}, ${d.country}`;
    };
}