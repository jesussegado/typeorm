import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from "typeorm-core";

import { User } from "./User";
import { Photo } from "./Photo";

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
