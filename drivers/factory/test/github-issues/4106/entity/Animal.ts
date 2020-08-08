import { Entity } from "typeorm-core";
import { Column } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";

import { Gender } from "./GenderEnum";

@Entity()
export class Animal {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: Gender,
        enumName: "genderEnum",
    })
    gender: Gender;

    @Column()
    specie: string;
}
