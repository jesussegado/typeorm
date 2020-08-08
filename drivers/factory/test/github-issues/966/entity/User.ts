import { Entity } from "typeorm-core";
import { Column } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { UserInfo } from "./UserInfo";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column((type) => UserInfo)
    info: UserInfo;
}
