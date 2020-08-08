import { Column, PrimaryGeneratedColumn, Entity } from "typeorm-core";

@Entity()
export class Dummy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, default: () => "GETDATE()" })
    UploadDate: string;
}
