import {
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    Column,
    ManyToOne,
} from "typeorm-core";

import { EventMember } from "./EventMember";
import { Person } from "./Person";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => Person)
    author: Person;

    @OneToMany((type) => EventMember, (member) => member.event)
    members: EventMember[];
}
