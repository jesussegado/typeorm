import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { OneToOne  } from "typeorm-core";
import { Ticket } from "./Ticket";
import { Column } from "typeorm-core";

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    owner: string;

    @Column()
    type: string;

    @Column()
    success: boolean;

    @OneToOne((type) => Ticket, (ticket) => ticket.request)
    ticket: Ticket;
}
