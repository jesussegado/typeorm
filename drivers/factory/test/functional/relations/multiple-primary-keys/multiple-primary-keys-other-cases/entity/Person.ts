import { Entity, Column, OneToOne, JoinColumn } from "typeorm-core";

import { User } from "./User";

@Entity()
export class Person {
    @Column()
    fullName: string;

    @OneToOne((type) => User, { primary: true })
    @JoinColumn()
    user: User;
}
