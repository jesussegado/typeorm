import { Entity } from "typeorm-core";
import { Column } from "typeorm-core";
import {  Unique  } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";
import { Index} from "typeorm-core";

@Entity()
@Unique(["name"])
@Index(["text"], { unique: true })
export class Photo {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    @Index({ unique: true })
    tag: string;

    @Column({ unique: true })
    description: string;

    @Column()
    text: string;
}
