import * as express from 'express';
import authenticate from './authenticate';

import {TeamProvider} from '../provider';

let teamApiRouter = express.Router();

teamApiRouter.get('/', authenticate, async (req: express.Request, res: express.Response) => {
    const user = (req as any).user;

    const teamSnapshot = await TeamProvider.resolveUserTeam(user);

    res.send({
        team: await TeamProvider.mapTeamResponse(teamSnapshot),
    });
});


teamApiRouter.get('/:teamId', authenticate, async (req: express.Request, res: express.Response) => {
    const user = (req as any).user;
    const {teamId} = req.params;

    const teamSnapshot = await TeamProvider.getTeam(teamId);
    if (user.role !== 'admin' && teamSnapshot.data().owner !== user.ref) {
        res.status(403).send('You does not have access this team');

        return;
    }

    res.send({
        team: await TeamProvider.mapTeamResponse(teamSnapshot),
    });
});


teamApiRouter.post('/:teamId/member', async (req: express.Request, res: express.Response) => {
    const user = (req as any).user;
    const {teamId} = req.params;

    const teamSnapshot = await TeamProvider.getTeam(teamId);
    if (user.role !== 'admin' && teamSnapshot.data().owner !== user.ref) {
        res.status(403).send('You does not have access this team');

        return;
    }

    const member = await TeamProvider.addTeamMember(teamSnapshot, req.body);

    res.send({
        member: TeamProvider.mapTeamMember(member)
    });
});


teamApiRouter.delete('/:teamId/member/:memberId', async (req: express.Request, res: express.Response) => {
    const user = (req as any).user;
    const { teamId, memberId } = req.params;

    const teamSnapshot = await TeamProvider.getTeam(teamId);
    if (user.role !== 'admin' && teamSnapshot.data().owner !== user.ref) {
        res.status(403).send('You does not have access this team');

        return;
    }

    try {
        const member = teamSnapshot.ref.collection('members').doc(memberId);
        await member.delete();

        res.status(201).send();
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
});


teamApiRouter.post('/:teamId/member/:memberId', async (req: express.Request, res: express.Response) => {
    const user = (req as any).user;
    const { teamId, memberId } = req.params;

    const teamSnapshot = await TeamProvider.getTeam(teamId);
    if (user.role !== 'admin' && teamSnapshot.data().owner !== user.ref) {
        res.status(403).send('You does not have access this team');

        return;
    }

    try {
        await TeamProvider.updateTeamMember(teamSnapshot, memberId, req.body);

        res.status(201).send();
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
});

export default teamApiRouter;
