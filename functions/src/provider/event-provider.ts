import * as admin from 'firebase-admin';

function mapDate(date: any): string | undefined {
    return date ? date.toDate().toISOString() : undefined;
}

export function mapEventResponse(model: admin.firestore.DocumentSnapshot) {
    const modelData = model.data();

    return {
        id: model.id,
        title: modelData.title,
        dateStart: mapDate(modelData.date_start),
        dateEnd: mapDate(modelData.date_end),
        country: modelData.country,
        city: modelData.city,
        creationTime: mapDate(modelData.creation_time),
    };
}

