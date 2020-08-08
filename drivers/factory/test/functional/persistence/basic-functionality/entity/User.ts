import { PrimaryColumn, Entity, Column } from "typeorm-core";

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
