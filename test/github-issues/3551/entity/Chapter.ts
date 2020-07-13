import { Column } from "../../../../src";
import { Page } from "./Page";

export class Chapter {
    @Column()
    title: string;


    @Column((type) => Page)
    pages: Page[];
}
