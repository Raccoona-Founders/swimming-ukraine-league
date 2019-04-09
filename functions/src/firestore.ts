import * as admin from 'firebase-admin';

const serviceAccount = require('../.firebase-adminsdk-secret.json');
if (!serviceAccount) {
    throw new Error('.firebase-adminsdk-secret.json must be implemented!');
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://swiming-ukraine-league.firebaseio.com',
});

export const db = admin.firestore();

db.settings({
    timestampsInSnapshots: true,
});

export default { db };
