import { EntitySchema } from "typeorm-core";

export const PersonSchema = new EntitySchema<any>({
    name: "Person",
    columns: {
        Id: {
            primary: true,
            type: "int",
            generated: "increment",
        },
        FirstName: {
            type: String,
            length: 30,
        },
        LastName: {
            type: String,
            length: 50,
            nullable: false,
        },
    },
    uniques: [
        {
            name: "UNIQUE_TEST",
            columns: ["FirstName", "LastName"],
        },
    ],
});
