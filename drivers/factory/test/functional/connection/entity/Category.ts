import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { TreeParent} from "typeorm-core";
import { TreeChildren} from "typeorm-core";
import {  TreeLevelColumn  } from "typeorm-core";
import { Entity } from "typeorm-core";
import { Tree} from "typeorm-core";

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
