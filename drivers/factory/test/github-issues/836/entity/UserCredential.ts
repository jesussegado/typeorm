import { Entity } from "typeorm-core";
import { Column } from "typeorm-core";
import { OneToOne  } from "typeorm-core";
import { JoinColumn  } from "typeorm-core";
import { User } from "./User";

@Entity()
export class UserCredential {
    @OneToOne(() => User, {
        primary: true,
        cascade: true,
    })
    @JoinColumn({
        name: "id",
        referencedColumnName: "id",
    })
    user: User;

    @Column()
    password: string;

    @Column()
    salt: string;
}
