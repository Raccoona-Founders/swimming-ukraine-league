import * as express from 'express';
import authenticate from './authenticate';

import { TeamProvider } from '../provider';
import App from '../firestore';

let teamApiRouter = express.Router();

teamApiRouter.get('/', authenticate, async (req: express.Request, res: express.Response) => {
    const user = (req as any).user;

    let teamQuery: any = await App.db.collection('teams')
        .where('owner', '==', user.ref)
        .get();

    if (!teamQuery.empty) {
        res.send({
            team: TeamProvider.mapTeamResponse(teamQuery.docs[0]),
        });

        return;
    }

    const teamRef = await App.db.collection('teams').add({
        name: '',
        owner: user.ref,
    });

    const teamSnapshot = await teamRef.get();

    res.send({
        team: TeamProvider.mapTeamResponse(teamSnapshot),
    });
});

export default teamApiRouter;
