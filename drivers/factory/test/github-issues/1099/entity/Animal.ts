import { Column, Entity, PrimaryGeneratedColumn   } from "typeorm-core";
import { Category } from "./Category";
import { JoinTable } from "typeorm-core";
import { ManyToMany } from "typeorm-core";

@Entity()
export class Animal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany((type) => Category)
    @JoinTable()
    categories: Category[];
}
