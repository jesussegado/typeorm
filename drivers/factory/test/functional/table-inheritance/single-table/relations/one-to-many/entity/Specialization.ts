import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
} from "typeorm-core";

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
