import { camelCase } from "typeorm-base";
import { DefaultNamingStrategy, NamingStrategyInterface } from "typeorm-core";

export class NamingStrategyUnderTest extends DefaultNamingStrategy
    implements NamingStrategyInterface {
    calledJoinTableColumnName: boolean[] = [];

    calledJoinTableInverseColumnName: boolean[] = [];

    joinTableColumnName(
        tableName: string,
        propertyName: string,
        columnName?: string
    ): string {
        this.calledJoinTableColumnName.push(true);
        return camelCase(`${tableName}_${columnName || propertyName}_forward`);
    }

    joinTableInverseColumnName(
        tableName: string,
        propertyName: string,
        columnName?: string
    ): string {
        this.calledJoinTableInverseColumnName.push(true);
        return camelCase(`${tableName}_${columnName || propertyName}_inverse`);
    }
}
