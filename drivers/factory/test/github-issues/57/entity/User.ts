import {
    JoinColumn,
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
    @JoinColumn()
    access_token: AccessToken;
}
