import { Entity, Column, PrimaryColumn } from "typeorm-core";

@Entity({ synchronize: false })
export class Photo {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    albumId: number;
}
