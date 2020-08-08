import {  Entity  } from "typeorm-core";
import {  Index  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";

@Entity()
@Index("index_name_english", ["nameEnglish"], { unique: true })
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameHebrew: string;

    @Column()
    nameEnglish: string;
}
