import {Column, PrimaryGeneratedColumn} from "typeorm-core/build/compiled/src/index";

export class BasePost {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

}
