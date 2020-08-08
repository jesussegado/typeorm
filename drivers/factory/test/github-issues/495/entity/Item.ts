import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { Index} from "typeorm-core";
import { OneToOne  } from "typeorm-core";
import { JoinColumn  } from "typeorm-core";
import { User } from "./User";

@Entity()
@Index("table_index_userId_mid", (post: Item) => [post.userId, post.mid])
export class Item {
    @PrimaryGeneratedColumn()
    postId: number;

    @OneToOne((type) => User, (users) => users.userId)
    @JoinColumn({ name: "userId" })
    userData: User;

    @Column({ type: "int" })
    userId: number;

    @Column({ type: "int" })
    mid: number;
}
