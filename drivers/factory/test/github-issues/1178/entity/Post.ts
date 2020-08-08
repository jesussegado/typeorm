import { Column, Entity, PrimaryGeneratedColumn   } from "typeorm-core";
import { User } from "./User";
import { ManyToOne  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => User)
    user: User;
}
