import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "title" })
    private _title: string;

    @Column()
    text: string;

    set title(title: string) {
        this._title = title;
    }

    get title(): string {
        return this._title;
    }
}
