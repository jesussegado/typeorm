import { Column } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: "My photo" })
    name: string;
}
