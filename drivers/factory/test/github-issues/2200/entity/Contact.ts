import {
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm-core";
import { Booking } from "./Booking";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany((type) => Booking, (booking) => booking.contact)
    bookings: Booking[];
}
