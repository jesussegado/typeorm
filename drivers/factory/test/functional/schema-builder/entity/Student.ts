import { Entity } from "typeorm-core";
import { Column } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Faculty } from "./Faculty";
import { ManyToOne  } from "typeorm-core";
import { Teacher } from "./Teacher";
import { Index} from "typeorm-core";

@Entity()
@Index("student_name_index", ["name"])
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => Faculty)
    faculty: Faculty;

    @ManyToOne((type) => Teacher)
    teacher: Teacher;
}
