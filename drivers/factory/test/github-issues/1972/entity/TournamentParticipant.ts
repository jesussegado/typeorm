import { Entity, TableInheritance, PrimaryGeneratedColumn } from "typeorm-core";

@Entity()
@TableInheritance({
    pattern: "STI",
    column: {
        name: "type",
        type: "varchar",
    },
})
export abstract class TournamentParticipant {
    @PrimaryGeneratedColumn()
    public id: number;
}
