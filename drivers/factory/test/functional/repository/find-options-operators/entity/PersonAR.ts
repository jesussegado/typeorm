import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
} from "typeorm-core";

@Entity()
export class PersonAR extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
