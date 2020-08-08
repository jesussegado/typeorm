import {
    PrimaryGeneratedColumn,
    Column,
    TreeParent,
    TreeChildren,
    Entity,
    Tree,
} from "typeorm-core";

@Entity()
@Tree("closure-table")
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @TreeParent()
    parentCategory: Category;

    @TreeChildren({ cascade: true })
    childCategories: Category[];
}
