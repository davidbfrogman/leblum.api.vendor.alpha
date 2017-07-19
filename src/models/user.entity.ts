
import { BaseEntity, IRole } from "./index";
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User2 extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    passwordHash: string;

    @Column()
    email: string;

    // @Column()    
    // roles: Array<IRole>;

    @Column()
    href: string;

    // This will be set to true whenever a user changes their password / or we require them to login again
    // This is used by the authentication controller to revoke the renewal of a token.  
    @Column("boolean")
    isTokenExpired: boolean; 
}