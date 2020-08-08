import {  PrimaryColumn  } from "typeorm-core";
import {  Entity  } from "typeorm-core";
import {  ManyToMany  } from "typeorm-core";
import { Photo } from "./Photo";
import {  OneToMany  } from "typeorm-core";
import {  JoinTable  } from "typeorm-core";
import {  Column  } from "typeorm-core";
import {  DeleteDateColumn  } from "typeorm-core";

@Entity()
export class User {
    // todo: check one-to-one relation as well, but in another model or test

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany((type) => Photo, (photo) => photo.user, { cascade: true })
    manyPhotos: Photo[];

    @ManyToMany((type) => Photo, { cascade: true })
    @JoinTable()
    manyToManyPhotos: Photo[];
}
