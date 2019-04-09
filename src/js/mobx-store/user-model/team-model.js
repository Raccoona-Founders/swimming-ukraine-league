export default class TeamModel {
    apiClient;
    team;

    constructor(team, apiClient) {
        this.apiClient = apiClient;
        this.team = team;
    }
}
