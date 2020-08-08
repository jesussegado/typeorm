import { Column, Entity, PrimaryColumn } from "typeorm-core";
import { FriendStats } from "./FriendStats";

@Entity()
export class UserWithEmbededEntity {
    @PrimaryColumn()
    id: number;

    @Column((type) => FriendStats)
    friend: FriendStats;
}
