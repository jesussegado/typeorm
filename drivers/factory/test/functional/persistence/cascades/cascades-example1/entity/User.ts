import {  Column  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import { Profile } from "./Profile";
import {  OneToOne  } from "typeorm-core";

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
