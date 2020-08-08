import {
    PrimaryGeneratedColumn,
    Column,
    TreeParent,
    TreeChildren,
    Entity,
    Tree,
} from "typeorm-core";

@Entity()
@Tree("nested-set")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @TreeParent()
    parentCategory: Category;

    @TreeChildren({ cascade: true })
    childCategories: Category[];

    // @TreeLevelColumn()
    // level: number;
}
