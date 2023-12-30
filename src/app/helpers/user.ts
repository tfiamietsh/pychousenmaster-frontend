export enum Roles { Admin, Challenger }

export interface User {
    id: string;
    username: string;
    access_token: string;
    refresh_token: string;
    role: Roles;
}
