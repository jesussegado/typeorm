import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from "typeorm-core";

import { Image } from "./Image";

@Entity()
export class ImageInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => Image, (image) => image.informations)
    image: Image;
}
