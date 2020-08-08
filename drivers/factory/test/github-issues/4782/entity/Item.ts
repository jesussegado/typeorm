import { CreateDateColumn } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Entity } from "typeorm-core";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    date: Date;
}
