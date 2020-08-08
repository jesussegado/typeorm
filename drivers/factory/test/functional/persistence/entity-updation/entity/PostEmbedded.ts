import {
    PrimaryColumn,
    UpdateDateColumn,
    CreateDateColumn,
    VersionColumn,
} from "typeorm-core";

export class PostEmbedded {
    @PrimaryColumn()
    secondId: number;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @VersionColumn()
    version: number;
}
