import { TableUniqueOptions } from "../options/TableUniqueOptions";
import { UniqueMetadata } from "../../metadata/UniqueMetadata";

/**
 * Database's table unique constraint stored in this class.
 */
export class TableUnique {
    /**
     * Constraint name.
     */
    name?: string;

    /**
     * Columns that contains this constraint.
     */
    columnNames: string[] = [];

    constructor(options: TableUniqueOptions) {
        this.name = options.name;
        this.columnNames = options.columnNames;
    }

    /**
     * Creates a new copy of this constraint with exactly same properties.
     */
    clone(): TableUnique {
        return new TableUnique({
            name: this.name,
            columnNames: [...this.columnNames],
        } as TableUniqueOptions);
    }

    /**
     * Creates unique from the unique metadata object.
     */
    static create(uniqueMetadata: UniqueMetadata): TableUnique {
        return new TableUnique({
            name: uniqueMetadata.name,
            columnNames: uniqueMetadata.columns.map(
                (column) => column.databaseName
            ),
        } as TableUniqueOptions);
    }
}
