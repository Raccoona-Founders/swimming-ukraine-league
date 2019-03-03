import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://swiming-ukraine-league.firebaseio.com'
});

export const db = admin.firestore();

db.settings({
    timestampsInSnapshots: true,
});

export default {db};
