import { Index, PrimaryGeneratedColumn, Column, Entity } from "../../../../src";

@Index("name_index", ["name"])
@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
