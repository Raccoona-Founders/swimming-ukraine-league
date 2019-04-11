import * as express from 'express';
import authenticate from './authenticate';

import { TeamProvider } from '../provider';

let teamApiRouter = express.Router();

teamApiRouter.get('/', authenticate, async (req: express.Request, res: express.Response) => {
    const user = (req as any).user;

    const teamSnapshot = await TeamProvider.resolveUserTeam(user);

    res.send({
        team: await TeamProvider.mapTeamResponse(teamSnapshot),
    });
});

export default teamApiRouter;
