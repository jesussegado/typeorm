import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    Column,
} from "typeorm-core";

import { Request } from "./Request";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne((type) => Request, {
        cascade: true,
    })
    @JoinColumn()
    request: Request;
}
