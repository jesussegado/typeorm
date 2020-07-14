import { Entity } from "../../../../../src/decorator/entity/Entity";
import { Column } from "../../../../../src/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "../../../../../src/decorator/columns/PrimaryGeneratedColumn";
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
