import {Column, PrimaryGeneratedColumn} from "typeorm-core/build/compiled/src/index";
import {TreeLevelColumn} from "typeorm-core/build/compiled/src/decorator/tree/TreeLevelColumn";
import {TreeParent} from "typeorm-core/build/compiled/src/decorator/tree/TreeParent";
import {TreeChildren} from "typeorm-core/build/compiled/src/decorator/tree/TreeChildren";
import {Tree} from "typeorm-core/build/compiled/src/decorator/tree/Tree";
import {Entity} from "typeorm-core/build/compiled/src/decorator/entity/Entity";

@Entity("sample22_category")
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

    // todo:
    // @TreeChildrenCount()
    // categoriesCount: number;

}
