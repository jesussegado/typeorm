import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import { User } from "./User";
import { Photo } from "./Photo";
import {  OneToOne  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne((type) => User, (user) => user.profile, {
        nullable: false,
    })
    @JoinColumn()
    user: User;

    @OneToOne((type) => Photo, {
        nullable: false,
        cascade: ["insert"],
    })
    @JoinColumn()
    photo: Photo;
}
