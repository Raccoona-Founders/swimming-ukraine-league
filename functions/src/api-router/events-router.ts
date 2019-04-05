import * as admin from 'firebase-admin';
import * as express from 'express';
import authenticate from './authenticate';

import { EventProvider } from '../provider';
import App from '../firestore';

let eventApiRouter = express.Router();

eventApiRouter.get('/', async (_req: express.Request, response: express.Response) => {

    const eventSnapshots = await App.db.collection('events')
        .where('delete_time', '==', null)
        .get();

    const result = Promise.all(
        eventSnapshots.docs.map(
            (obj: admin.firestore.DocumentSnapshot) => EventProvider.mapEventResponse(obj),
        ),
    );

    response.send({
        events: await result,
    });
});


export default eventApiRouter;
