import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Tree} from "typeorm-core";
import { TreeChildren} from "typeorm-core";
import { TreeParent} from "typeorm-core";

@Entity({ name: "users", schema: "admin" })
@Tree("nested-set")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @TreeParent()
    public manager: User;

    @TreeChildren()
    public managerOf: User[];
}
