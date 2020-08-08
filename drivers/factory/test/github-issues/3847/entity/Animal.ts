import { Column, Entity, PrimaryGeneratedColumn   } from "typeorm-core";
import { Category } from "./Category";
import { ManyToOne  } from "typeorm-core";

@Entity()
export class Animal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Category)
    category: Category;
}
