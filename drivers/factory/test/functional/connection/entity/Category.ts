import {
    PrimaryGeneratedColumn,
    Column,
    TreeParent,
    TreeChildren,
    TreeLevelColumn,
    Entity,
    Tree,
} from "typeorm-core";

@Entity("CaTeGoRy")
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

    @TreeLevelColumn()
    level: number;
}
