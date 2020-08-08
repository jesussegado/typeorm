import { Column } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Entity } from "typeorm-core";
import { AccountActivationToken } from "./AccountActivationToken";
import {  OneToOne  } from "typeorm-core";

@Entity()
export class Account {
    @PrimaryGeneratedColumn() id: number;

    @OneToOne((type) => AccountActivationToken, "account", {
        cascade: ["insert", "remove"],
    })
    accountActivationToken: AccountActivationToken;

    @Column() username: string;

    @Column() password: string;
}
