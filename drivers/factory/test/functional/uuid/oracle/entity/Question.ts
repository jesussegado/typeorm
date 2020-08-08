import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  Generated  } from "typeorm-core";

@Entity()
export class Question {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Generated("uuid")
    uuid: string;

    @Column()
    uuid2: string;

    @Column("varchar", { nullable: true })
    uuid3: string | null;

    @Column("varchar", { nullable: true })
    @Generated("uuid")
    uuid4: string | null;
}
