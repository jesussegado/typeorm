import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { TreeParent} from "typeorm-core";
import { TreeChildren} from "typeorm-core";
import { Entity } from "typeorm-core";
import { Tree} from "typeorm-core";

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
}
