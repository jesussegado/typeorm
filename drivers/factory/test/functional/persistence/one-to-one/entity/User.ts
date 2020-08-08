import {
    OneToOne,
    Column,
    PrimaryColumn,
    Entity,
    Generated,
} from "typeorm-core";
import { AccessToken } from "./AccessToken";

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
