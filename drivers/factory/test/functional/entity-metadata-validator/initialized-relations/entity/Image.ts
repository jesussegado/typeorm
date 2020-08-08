import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm-core";

import { ImageInfo } from "./ImageInfo";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany((type) => ImageInfo, (imageInfo) => imageInfo.image)
    informations: ImageInfo[] = [];
}
