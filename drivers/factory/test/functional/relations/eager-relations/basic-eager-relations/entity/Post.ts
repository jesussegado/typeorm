import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import {  JoinTable  } from "typeorm-core";
import { Category } from "./Category";
import { User } from "./User";
import {  ManyToOne  } from "typeorm-core";
import {  OneToMany  } from "typeorm-core";
import { Editor } from "./Editor";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToMany((type) => Category, { eager: true })
    @JoinTable()
    categories1: Category[];

    @ManyToMany((type) => Category, (category) => category.posts2, {
        eager: true,
    })
    categories2: Category[];

    @ManyToOne((type) => User, { eager: true })
    author: User;

    @OneToMany((type) => Editor, (editor) => editor.post, { eager: true })
    editors: Editor[];
}
