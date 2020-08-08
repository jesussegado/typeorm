import { StringDecoder } from "string_decoder";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm-core";
import { User } from "./User";

@Entity()
export class Photo {
    @PrimaryColumn("binary", {
        length: 2,
    })
    private _id: Buffer;

    get id(): string {
        const decoder = new StringDecoder("hex");

        return decoder.end(this._id);
    }

    set id(value: string) {
        this._id = Buffer.from(value, "hex");
    }

    @Column()
    description: string;

    @ManyToOne((type) => User, (user) => user.photos)
    user: User;
}
