import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { UpdateDateColumn } from "typeorm-core";
import { OneToOne  } from "typeorm-core";
import { PostCategory } from "./PostCategory";
import { JoinColumn  } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ default: false })
    active: boolean;

    @UpdateDateColumn()
    updateDate: Date;

    @OneToOne((type) => PostCategory)
    @JoinColumn()
    category: PostCategory;

    @Column()
    updatedColumns: number = 0;

    @Column()
    updatedRelations: number = 0;
}
