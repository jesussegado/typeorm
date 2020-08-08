import {
    PrimaryGeneratedColumn,
    Entity,
    Column,
    Generated,
} from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    @Generated("uuid")
    uuid: string;
}
