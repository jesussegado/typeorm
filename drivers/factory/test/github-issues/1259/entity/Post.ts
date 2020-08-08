import { Column, Entity, PrimaryGeneratedColumn   } from "typeorm-core";
import { Category } from "./Category";
import { ManyToMany } from "typeorm-core";
import { JoinTable } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    count: number;

    @ManyToMany((type) => Category)
    @JoinTable()
    categories: Category[];
}
