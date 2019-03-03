import * as admin from 'firebase-admin';
import {db} from '../firestore';


async function resolveUser(decodedIdToken: admin.auth.DecodedIdToken): Promise<Object> {
    const user = await admin.auth().getUser(decodedIdToken.uid);
    const userRef = db.collection('users')
        .doc(decodedIdToken.uid);

    let snapshot = await userRef.get();
    if (!snapshot.exists) {
        await userRef.set({
            displayName: user.displayName || '',
            phoneNumber: user.phoneNumber || '',
            photoUrl: user.photoURL || '',
            email: user.email || '',
            role: 'user',
            creationTime: admin.firestore.Timestamp.now()
        });
    }

    snapshot = await userRef.get();

    return snapshot.data();
}


export default async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        res.status(403).send('Unauthorized');
        return;
    }

    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        req.user = await resolveUser(decodedIdToken);

        next();

        return;
    } catch (error) {
        console.error(error.message);
        res.status(403).send('Unauthorized');

        return;
    }
};
