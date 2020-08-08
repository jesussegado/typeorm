import {  Column  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import { Teacher } from "./Teacher";

@Entity()
export class Specialization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany((type) => Teacher, (teacher) => teacher.specializations)
    teachers: Teacher[];
}
