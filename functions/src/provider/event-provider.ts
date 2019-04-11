import * as admin from 'firebase-admin';
import { mapDateString } from '../helper';

export function mapEventResponse(model: admin.firestore.DocumentSnapshot) {
    const modelData = model.data();

    return {
        id: model.id,
        title: modelData.title,
        dateStart: mapDateString(modelData.date_start),
        dateEnd: mapDateString(modelData.date_end),
        country: modelData.country,
        city: modelData.city,
        creationTime: mapDateString(modelData.creation_time),
    };
}

