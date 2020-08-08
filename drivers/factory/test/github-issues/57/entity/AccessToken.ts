import { Generated } from "typeorm-core";
import { Column } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";
import { Entity } from "typeorm-core";
import { OneToOne  } from "typeorm-core";
import { User } from "./User";

@Entity()
export class AccessToken {
    @PrimaryColumn("int")
    @Generated()
    primaryKey: number;

    @Column()
    expireTime: number;

    @OneToOne((type) => User, (user) => user.access_token, {
        cascade: true,
    })
    user: User;
}
