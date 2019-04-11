declare global {
    namespace entity {
        type TeamMember = {
            sex: 'f' | 'm';
            firstname: string;
            secondname: string;
            middlename?: string;
            birthday: string;
        };
    }
}

export {};
