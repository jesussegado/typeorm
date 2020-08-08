import {  Entity  } from "typeorm-core";
import {  PrimaryGeneratedColumn  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import { ImageInfo } from "./ImageInfo";
import {  OneToMany  } from "typeorm-core";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany((type) => ImageInfo, (imageInfo) => imageInfo.image)
    informations: ImageInfo[] = [];
}
