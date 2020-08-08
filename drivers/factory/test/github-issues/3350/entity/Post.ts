import { Column } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Entity } from "typeorm-core";
import { JoinColumn  } from "typeorm-core";
import { ManyToOne  } from "typeorm-core";
import { Category } from "./Category";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "category_id" })
    categoryId: number;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;
}
