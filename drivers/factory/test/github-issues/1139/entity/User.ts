import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
}
