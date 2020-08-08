import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

import { Contact } from "./Contact";

@Entity()
export class Organisation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column((type) => Contact)
    contact: Contact;
}
