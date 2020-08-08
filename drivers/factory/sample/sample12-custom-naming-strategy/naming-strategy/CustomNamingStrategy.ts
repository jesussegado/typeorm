import {NamingStrategyInterface} from "typeorm-core/build/compiled/src/naming-strategy/NamingStrategyInterface";
import {DefaultNamingStrategy} from "typeorm-core/build/compiled/src/naming-strategy/DefaultNamingStrategy";
import {snakeCase} from "typeorm-base";

export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {

    tableName(targetName: string, userSpecifiedName: string): string {
        return userSpecifiedName ? userSpecifiedName : snakeCase(targetName);
    }

    columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
        return snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join("_"));
    }

    columnNameCustomized(customName: string): string {
        return customName;
    }

    relationName(propertyName: string): string {
        return snakeCase(propertyName);
    }

}
