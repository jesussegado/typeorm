import { Index, PrimaryGeneratedColumn, Column, Entity } from "typeorm-core";

@Index("name_index", ["name"])
@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
