import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { Category } from "./Category";
import { ManyToMany } from "typeorm-core";
import { JoinTable } from "typeorm-core";
import { OneToMany  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToMany((type) => Category)
    @JoinTable()
    categories: Category[];

    @OneToMany((type) => Category, (category) => category.post)
    secondaryCategories: Category[];
}
