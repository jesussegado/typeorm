import { AccessToken } from "./AccessToken";
import {  OneToOne  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  PrimaryColumn  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  Generated  } from "typeorm-core";

@Entity()
export class User {
    @PrimaryColumn("int")
    @Generated()
    primaryKey: number;

    @Column()
    email: string;

    @OneToOne((type) => AccessToken, (token) => token.user)
    access_token: AccessToken;
}
