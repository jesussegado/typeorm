import { Entity } from "typeorm-core";
import { ManyToOne  } from "typeorm-core";
import { Dog } from "./Dog";
import { PrimaryGeneratedColumn } from "typeorm-core";

@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column()
    // dogDogID: string; // Need to do this to allow the Foreign Key to work

    @ManyToOne((type) => Dog, (dog) => dog.cats)
    dog: Dog;
}
