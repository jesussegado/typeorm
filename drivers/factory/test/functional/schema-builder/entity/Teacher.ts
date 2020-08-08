import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    Index,
} from "typeorm-core";

import { Student } from "./Student";

@Entity()
@Index("ignored_index", { synchronize: false })
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany((type) => Student, (student) => student.teacher)
    students: Student[];
}
