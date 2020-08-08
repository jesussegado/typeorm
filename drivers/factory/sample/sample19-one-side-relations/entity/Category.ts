import {Column, Entity, PrimaryGeneratedColumn} from "typeorm-core/build/compiled/src/index";

@Entity("sample19_category")
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
