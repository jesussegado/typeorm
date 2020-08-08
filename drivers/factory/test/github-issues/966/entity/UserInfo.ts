import { Column } from "typeorm-core";
import { PersonalInfo } from "./PersonalInfo";

export class UserInfo extends PersonalInfo {
    @Column()
    userName: string;
}
