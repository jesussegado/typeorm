import { Column } from "typeorm-core";
import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;
}
