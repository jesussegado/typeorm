import { Column, Entity, PrimaryColumn } from "../../../../../src";
import { FriendStats } from "./FriendStats";

@Entity()
export class UserWithEmbededEntity {
    @PrimaryColumn()
    id: number;

    @Column((type) => FriendStats)
    friend: FriendStats;
}
