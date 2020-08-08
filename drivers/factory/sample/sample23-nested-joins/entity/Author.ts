import {Column, Entity, PrimaryGeneratedColumn} from "typeorm-core/build/compiled/src/index";

@Entity("sample23_author")
export class Author {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
