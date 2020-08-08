import { Entity } from "typeorm-core";
import { Column } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Index} from "typeorm-core";
@Entity()
@Index("unique_idx", ["first_name", "last_name"], { unique: true })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100 })
    first_name: string;

    @Column({ type: "varchar", length: 100 })
    last_name: string;

    @Column({ type: "varchar", length: 100 })
    is_updated: string;
}
