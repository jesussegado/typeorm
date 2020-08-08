import { Entity, ObjectIdColumn, AfterLoad } from "typeorm-core";
import { Column } from "typeorm-core";
import { BeforeUpdate  } from "typeorm-core";
import { UpdateDateColumn } from "typeorm-core";

@Entity()
export class Post {
    @ObjectIdColumn()
    id: number;

    @Column()
    title: string;

    @Column({ default: false })
    active: boolean;

    @UpdateDateColumn()
    updateDate: Date;

    @BeforeUpdate()
    async beforeUpdate() {
        this.title += "!";
    }

    loaded: boolean = false;

    @AfterLoad()
    async afterLoad() {
        this.loaded = true;
    }
}
