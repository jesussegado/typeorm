import { PrimaryGeneratedColumn, Entity } from "typeorm-core";

@Entity()
export class Message {
    @PrimaryGeneratedColumn("increment", { type: "bigint" })
    id: string;
}
