import {  Entity  } from "typeorm-core";
import {  Index  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import { Profile } from "./Profile";

@Entity()
@Index("index_name_english", ["nameEnglish"], { unique: true })
@Index("index_profile_job", ["profile.job"])
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameHebrew: string;

    @Column()
    nameEnglish: string;

    @Column(() => Profile)
    profile: Profile;
}
