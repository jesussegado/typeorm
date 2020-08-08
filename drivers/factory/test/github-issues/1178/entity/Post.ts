import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
} from "typeorm-core";
import { User } from "./User";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => User)
    user: User;
}
