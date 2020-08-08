import {
    PrimaryGeneratedColumn,
    Entity,
    Column,
    Generated,
} from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    uuid: string;
}
