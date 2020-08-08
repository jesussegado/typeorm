import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm-core";

import { Profile } from "./Profile";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne((type) => Profile, (profile) => profile.user, {
        cascade: ["insert"],
    })
    profile: Profile;
}
