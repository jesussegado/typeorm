import {  Entity  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import { PhonesTransformer } from "./PhonesTransformer";

@Entity()
export class PhoneBook {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: String, transformer: new PhonesTransformer() })
    phones: Map<string, number>;
}
