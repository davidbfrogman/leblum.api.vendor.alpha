import { Column, Entity } from "typeorm";

@Entity()
export abstract class BaseEntity {
     @Column()
    public createdBy: string;

     @Column("bigint",{ nullable: false, default: Date.now()})
    public createdOn: number;

     @Column("bigint", { nullable: true, default: Date.now()})
    public modifiedOn?: number;

     @Column({ nullable: true})
    public modifiedBy?: string;
}