import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeUpdate,
    UpdateDateColumn,
} from "typeorm-core";

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

    @BeforeUpdate()
    beforeUpdate() {
        this.title += "!";
    }
}
