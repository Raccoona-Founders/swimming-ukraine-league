import * as admin from 'firebase-admin';

export function mapTeamResponse(model: admin.firestore.DocumentSnapshot) {
    const modelData = model.data();

    return {
        id: model.id,
        name: modelData.name,
        owner: modelData.owner.entityId,
    };
}
