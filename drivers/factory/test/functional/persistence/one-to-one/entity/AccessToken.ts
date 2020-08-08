import {  PrimaryColumn  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  JoinColumn  } from "typeorm-core";
import {  OneToOne  } from "typeorm-core";
import { User } from "./User";
import {  Generated  } from "typeorm-core";

@Entity()
export class AccessToken {
    @PrimaryColumn("int")
    @Generated()
    primaryKey: number;

    @OneToOne((type) => User, (user) => user.access_token)
    @JoinColumn()
    user: User;
}
