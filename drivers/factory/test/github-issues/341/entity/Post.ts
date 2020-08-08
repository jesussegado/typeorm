import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { Category } from "./Category";
import { OneToOne  } from "typeorm-core";
import { JoinColumn  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    categoryName: string;

    @OneToOne((type) => Category, (category) => category.post)
    @JoinColumn({ name: "categoryName", referencedColumnName: "name" })
    category: Category;
}
