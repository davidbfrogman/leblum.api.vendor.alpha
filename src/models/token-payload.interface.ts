import { IRole } from "./role";

export interface ITokenPayload {
    userId: any,
    roles: IRole[],
    expiration: string
}