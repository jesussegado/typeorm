import {Column, Entity, PrimaryGeneratedColumn} from "typeorm-core/build/compiled/src/index";
import {ManyToMany} from "typeorm-core/build/compiled/src/decorator/relations/ManyToMany";
import {Category} from "./Category";
import {JoinTable} from "typeorm-core/build/compiled/src/decorator/relations/JoinTable";

@Entity("sample30_post", {
    orderBy: {
        title: "ASC",
        id: "DESC"
    }
})
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @ManyToMany(type => Category)
    @JoinTable()
    categories: Category[];

    constructor(title: string, text: string, categories: Category[]) {
        this.title = title;
        this.text = text;
        this.categories = categories;
    }

}
