import {  Column  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
import { Teacher } from "./Teacher";

@Entity()
export class Specialization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => Teacher, (teacher) => teacher.specializations)
    teacher: Teacher;
}
