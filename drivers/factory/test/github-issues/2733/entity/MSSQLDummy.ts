import { Column } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Entity } from "typeorm-core";

@Entity()
export class Dummy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, default: () => "GETDATE()" })
    UploadDate: string;
}
