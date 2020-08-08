import { Entity } from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import {  BaseEntity  } from "typeorm-core";
import { OneToOne  } from "typeorm-core";
import { Foo } from "./Foo";
import { JoinColumn  } from "typeorm-core";

@Entity()
export class Bar extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne((type) => Foo, {
        onDelete: "SET NULL",
    })
    @JoinColumn()
    foo: Foo;
}
