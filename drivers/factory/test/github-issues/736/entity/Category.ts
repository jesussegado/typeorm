import {
    Entity,
    PrimaryGeneratedColumn,
    Tree,
    TreeParent,
    TreeChildren,
    Column,
} from "typeorm-core";

@Entity()
@Tree("closure-table")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @TreeParent()
    parentCategory: Category;

    @TreeChildren({ cascade: true })
    childCategories: Category[];
}
