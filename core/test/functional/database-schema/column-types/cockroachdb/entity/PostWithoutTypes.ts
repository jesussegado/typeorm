import { Entity, PrimaryColumn, Column } from "../../../../../../src";

@Entity()
export class PostWithoutTypes {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    boolean: boolean;

    @Column()
    datetime: Date;
}
