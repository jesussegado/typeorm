import { Entity } from "typeorm-core";
import { Column } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Student } from "./Student";
import { OneToMany  } from "typeorm-core";
import { Index} from "typeorm-core";

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
