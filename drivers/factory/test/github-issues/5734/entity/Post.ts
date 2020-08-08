import { PrimaryColumn, Entity } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryColumn()
    id: number;

    constructor(id: number) {
        this.id = id;
    }
}
