import { Entity, PrimaryGeneratedColumn} from "typeorm-core";
import { Column } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int", { array: true, nullable: true })
    skill_id_array: number[];
}
