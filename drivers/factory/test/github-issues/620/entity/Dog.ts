import { Entity } from "typeorm-core";
import { PrimaryColumn } from "typeorm-core";
import { OneToMany  } from "typeorm-core";
import { Cat } from "./Cat";

@Entity()
export class Dog {
    @PrimaryColumn()
    DogID: string;

    @OneToMany((type) => Cat, (cat) => cat.dog)
    cats: Cat[];
}
