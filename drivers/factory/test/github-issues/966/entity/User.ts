import { Entity, Column, PrimaryGeneratedColumn } from "typeorm-core";

import { UserInfo } from "./UserInfo";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column((type) => UserInfo)
    info: UserInfo;
}
