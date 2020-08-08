import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from "typeorm-core";

import { Profile } from "./Profile";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToOne((type) => Profile, (profile) => profile.user, { eager: true })
    @JoinColumn()
    profile: Profile;
}
