import {
    DefaultNamingStrategy,
    NamingStrategyInterface,
    Table,
} from "typeorm-core";

export class NamingStrategyUnderTest extends DefaultNamingStrategy
    implements NamingStrategyInterface {
    foreignKeyName(
        tableOrName: Table | string,
        columnNames: string[],
        referencedTablePath?: string,
        referencedColumnNames?: string[]
    ): string {
        tableOrName =
            typeof tableOrName === "string" ? tableOrName : tableOrName.name;

        return columnNames.reduce(
            (name, column) => `${name}_${column}`,
            `fk_${tableOrName}_${referencedTablePath}`
        );
    }
}
