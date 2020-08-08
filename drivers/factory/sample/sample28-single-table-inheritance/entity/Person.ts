import {Column} from "typeorm-core/build/compiled/src/decorator/columns/Column";
import {TableInheritance} from "typeorm-core/build/compiled/src/decorator/entity/TableInheritance";
import {Entity} from "typeorm-core/build/compiled/src/decorator/entity/Entity";
import {PrimaryColumn} from "typeorm-core/build/compiled/src/decorator/columns/PrimaryColumn";

// todo: some things left to do:
// * check how it works when is join (conditions are not added in the joins right now)

@Entity("sample28_person")
@TableInheritance({ column: { name: "type", type: "varchar" } })
export abstract class Person {

    @PrimaryColumn("int")
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

}
