import * as admin from 'firebase-admin';
import {get} from 'lodash';
import App from '../firestore';
import {mapDateString} from '../helper';

export async function mapTeamResponse(model: admin.firestore.DocumentSnapshot) {
    const modelData = model.data();

    const teamMembers = await model.ref.collection('members').get();

    return {
        id: model.id,
        name: get(modelData, 'name'),
        owner: get(modelData, 'owner.entityId'),
        members: teamMembers.docs.map(member => mapTeamMember(member)),
    };
}


export async function resolveUserTeam(
    user: admin.firestore.DocumentSnapshot
): Promise<admin.firestore.DocumentSnapshot> {
    let teamQuery: any = await App.db.collection('teams')
        .where('owner', '==', user.ref)
        .get();

    if (!teamQuery.empty) {
        return teamQuery.docs[0];
    }

    const teamRef = await App.db.collection('teams').add({
        name: '',
        owner: user.ref,
        created_at: admin.firestore.Timestamp.now(),
    });

    return await teamRef.get();
}

export async function getTeam(teamId: string): Promise<admin.firestore.DocumentSnapshot> {
    if (!teamId) {
        throw new Error('Need provide team ID');
    }

    let team = await App.db.collection('teams').doc(teamId).get();

    if (team) {
        throw new Error('Team by ID not found');
    }

    return team;
}


export function mapTeamMember(member: admin.firestore.DocumentSnapshot): any {
    const memberData = member.data();

    return {
        id: member.id,
        firstname: get(memberData, 'firstname'),
        secondname: get(memberData, 'secondname'),
        middlename: get(memberData, 'middlename'),
        birthday: mapDateString(memberData.birthday),
        sex: get(memberData, 'sex'),
    };
}


export async function addTeamMember(
    team: admin.firestore.DocumentSnapshot,
    memberData: entity.TeamMember
): Promise<admin.firestore.DocumentSnapshot> {

    const newMemberData = {
        ...memberData,
        birthday: admin.firestore.Timestamp.fromDate(new Date(memberData.birthday)),
        created_at: admin.firestore.Timestamp.now(),
    };

    const newMember = await team.ref.collection('members').add(newMemberData);

    return await newMember.get();
}


export async function updateTeamMember(
    team: admin.firestore.DocumentSnapshot,
    memberId: string,
    memberData: entity.TeamMember
): Promise<any> {

    const member = await team.ref.collection('members').doc(memberId);
    const snapshot = await member.get();

    if (!snapshot) {
        throw new Error('Member not found');
    }

    const dataToUpdate = {
        firstname: memberData.firstname,
        secondname: memberData.secondname,
        middlename: memberData.middlename,
        birthday: memberData.birthday ? admin.firestore.Timestamp.fromDate(new Date(memberData.birthday)) : undefined,
        sex: memberData.sex,
    };

    await member.update(dataToUpdate);
}
