import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  OneToMany  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  ManyToOne  } from "typeorm-core";
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
