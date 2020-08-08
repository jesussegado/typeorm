import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { OneToOne  } from "typeorm-core";
import { Request } from "./Request";
import { JoinColumn  } from "typeorm-core";
import { Column } from "typeorm-core";

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
