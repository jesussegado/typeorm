import {  Column  } from "typeorm-core";
import {  Index  } from "typeorm-core";

export class Profile {
    @Column()
    job: string;

    @Column()
    @Index("customer_profile_address")
    address: string;
}
