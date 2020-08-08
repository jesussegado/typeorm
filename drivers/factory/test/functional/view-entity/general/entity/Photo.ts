import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm-core";

import { Album } from "./Album";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    albumId: number;

    @ManyToOne(() => Album)
    @JoinColumn({ name: "albumId" })
    album: Album;
}
