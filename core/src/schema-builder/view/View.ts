import { Connection, Driver, SelectQueryBuilder, EntityMetadata } from "../..";

import { ViewOptions } from "../options/ViewOptions";

/**
 * View in the database represented in this class.
 */
export class View {
    /**
     * Contains database name, schema name and table name.
     * E.g. "myDB"."mySchema"."myTable"
     */
    name: string;

    /**
     * Indicates if view is materialized.
     */
    materialized: boolean;

    /**
     * View definition.
     */
    expression: string | ((connection: Connection) => SelectQueryBuilder<any>);

    constructor(options?: ViewOptions) {
        if (options) {
            this.name = options.name;
            this.expression = options.expression;
            this.materialized = !!options.materialized;
        }
    }

    /**
     * Clones this table to a new table with all properties cloned.
     */
    clone(): View {
        return new View({
            name: this.name,
            expression: this.expression,
            materialized: this.materialized,
        } as ViewOptions);
    }

    /**
     * Creates view from a given entity metadata.
     */
    static create(entityMetadata: EntityMetadata, driver: Driver): View {
        const options: ViewOptions = {
            name: driver.buildTableName(
                entityMetadata.tableName,
                entityMetadata.schema,
                entityMetadata.database
            ),
            expression: entityMetadata.expression!,
            materialized: entityMetadata.tableMetadataArgs.materialized,
        };

        return new View(options);
    }
}
