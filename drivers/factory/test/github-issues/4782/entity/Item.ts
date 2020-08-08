import { CreateDateColumn, PrimaryGeneratedColumn, Entity } from "typeorm-core";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    date: Date;
}
