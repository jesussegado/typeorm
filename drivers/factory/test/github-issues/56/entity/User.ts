import { AccessToken } from "./AccessToken";
import { JoinColumn  } from "typeorm-core";
import { OneToOne  } from "typeorm-core";
import { Column } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";
import { Entity } from "typeorm-core";
import { Generated} from "typeorm-core";

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
