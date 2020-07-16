import { Column } from "../../../../src/decorator/columns/Column";
import { PersonalInfo } from "./PersonalInfo";

export class UserInfo extends PersonalInfo {
    @Column()
    userName: string;
}
