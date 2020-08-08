import {  PrimaryColumn  } from "typeorm-core";
import {  UpdateDateColumn  } from "typeorm-core";
import {  CreateDateColumn  } from "typeorm-core";
import {  VersionColumn  } from "typeorm-core";

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
