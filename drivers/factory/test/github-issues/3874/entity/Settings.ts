import { Entity, Column, PrimaryColumn } from "typeorm-core";

enum Singleton {
    EMPTY = "",
}

@Entity()
export class Settings {
    @PrimaryColumn()
    readonly singleton: Singleton = Singleton.EMPTY;

    @Column()
    value!: string;
}
