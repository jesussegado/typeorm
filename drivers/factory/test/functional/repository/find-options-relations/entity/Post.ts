import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import {  JoinTable  } from "typeorm-core";
import {  OneToMany  } from "typeorm-core";
import { Category } from "./Category";
import { User } from "./User";
import { Photo } from "./Photo";
import {  ManyToOne  } from "typeorm-core";
import { Counters } from "./Counters";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany((type) => Photo, (photo) => photo.post)
    photos: Photo[];

    @ManyToOne((type) => User)
    user: User;

    @ManyToMany((type) => Category)
    @JoinTable()
    categories: Category[];

    @Column((type) => Counters)
    counters: Counters;
}
