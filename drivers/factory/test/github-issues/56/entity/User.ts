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
    id: number;

    @Column()
    email: string;

    @OneToOne((type) => AccessToken)
    @JoinColumn()
    access_token: AccessToken;
}
