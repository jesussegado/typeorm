import { Entity } from "typeorm-core";
import { Index} from "typeorm-core";
import { PrimaryGeneratedColumn } from "typeorm-core";
import { Column } from "typeorm-core";
import { ManyToMany } from "typeorm-core";
import { Game } from "./Game";

@Entity("platforms")
@Index("platform_name_idx", ["name"], { unique: true })
export class Platform {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
    })
    name: string;

    @Column({
        length: 100,
    })
    slug: string;

    @ManyToMany((type) => Game, (game) => game.platforms)
    games: Game[];
}
