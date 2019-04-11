import * as admin from 'firebase-admin';
import { get } from 'lodash';
import App from '../firestore';
import { mapDateString } from '../helper';

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


export async function resolveUserTeam(user: admin.firestore.DocumentSnapshot): Promise<admin.firestore.DocumentSnapshot> {
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


export function mapTeamMember(member: admin.firestore.DocumentSnapshot) {
    const memberData = member.data();

    return {
        id: member.id,
        firstname: get(memberData, 'firstname'),
        secondname: get(memberData, 'secondname'),
        middlename: get(memberData, 'middlename'),
        sex: get(memberData, 'sex'),
        birthday: mapDateString(memberData.birthday),
    };
}


export async function addTeamMember(team: admin.firestore.DocumentSnapshot, memberData: entity.TeamMember): Promise<string> {

    const newMemberData = {
        ...memberData,
        birthday: admin.firestore.Timestamp.fromDate(new Date(memberData.birthday)),
        created_at: admin.firestore.Timestamp.now(),
    };

    const newMember = await team.ref.collection('members').add(newMemberData);

    return newMember.id;
}
