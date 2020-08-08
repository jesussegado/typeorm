import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import { ContentModule } from "./ContentModule";

@Entity()
export class Post extends ContentModule {
    @Column()
    title: string;

    @Column()
    text: string;
}
