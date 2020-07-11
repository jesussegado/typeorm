import { StringDecoder } from "string_decoder";
import { Column, Entity, OneToMany, PrimaryColumn } from "../../../../src";
import { Photo } from "./Photo";

@Entity()
export class User {
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
    age: number;

    @OneToMany((type) => Photo, (photo) => photo.user)
    photos: Photo[];
}
