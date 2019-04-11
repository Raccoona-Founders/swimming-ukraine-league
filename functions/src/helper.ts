import * as admin from 'firebase-admin';
import * as moment from 'moment';

export function mapDateString(birthday?: admin.firestore.Timestamp) {
    if (!birthday) {
        return undefined;
    }

    const date = moment(birthday.toDate());

    return date.format('YYYY-MM-DD');
}
