import { Entity, PrimaryGeneratedColumn} from "typeorm-core";
import { FruitEnum } from "../enum/FruitEnum";
import { Column } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("enum", { enum: FruitEnum, default: FruitEnum.Apple })
    fruit: FruitEnum;
}
