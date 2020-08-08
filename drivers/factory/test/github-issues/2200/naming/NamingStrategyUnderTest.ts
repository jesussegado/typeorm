import {  DefaultNamingStrategy  } from "typeorm-core";
import {  NamingStrategyInterface  } from "typeorm-core";

export class NamingStrategyUnderTest extends DefaultNamingStrategy
    implements NamingStrategyInterface {
    eagerJoinRelationAlias(alias: string, propertyPath: string): string {
        return `${alias}__${propertyPath.replace(".", "_")}`;
    }
}
