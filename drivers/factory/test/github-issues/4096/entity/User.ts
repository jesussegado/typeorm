import { Entity, PrimaryColumn, Column } from "typeorm-core";

@Entity()
export class User {
    @PrimaryColumn()
    email: string;

    @PrimaryColumn()
    username: string;

    @Column()
    bio: string;
}
