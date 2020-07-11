import { PrimaryGeneratedColumn, Entity } from "../../../../src";

@Entity()
export class Author {
    @PrimaryGeneratedColumn("uuid")
    id: string;
}
