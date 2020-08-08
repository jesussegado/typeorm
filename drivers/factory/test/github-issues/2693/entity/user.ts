import { PrimaryGeneratedColumn } from "typeorm-core";
import { Entity } from "typeorm-core";

@Entity({ name: "users", synchronize: false })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;
}
