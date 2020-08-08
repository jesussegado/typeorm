import {
    BeforeUpdate,
    Column,
    PrimaryGeneratedColumn,
    Entity,
} from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @BeforeUpdate()
    beforeUpdate() {
        this.title = this.title.trim();
    }
}
