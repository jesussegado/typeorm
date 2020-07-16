import { Entity } from "../../../../src/decorator/entity/Entity";
import { Column } from "../../../../src/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "../../../../src/decorator/columns/PrimaryGeneratedColumn";
import { UserInfo } from "./UserInfo";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column((type) => UserInfo)
    info: UserInfo;
}
