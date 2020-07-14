import { Column } from "../../../../../src";

export class FriendStats {
    @Column({ default: 0 })
    count: number;

    @Column({ default: 0 })
    sent: number;

    @Column({ default: 0 })
    received: number;
}
