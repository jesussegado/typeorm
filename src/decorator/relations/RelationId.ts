import { getMetadataArgsStorage, SelectQueryBuilder } from "../..";
import { RelationIdMetadataArgs } from "../../metadata-args/RelationIdMetadataArgs";

/**
 * Special decorator used to extract relation id into separate entity property.
 *
 * @experimental
 */
export function RelationId<T>(
    relation: string | ((object: T) => any),
    alias?: string,
    queryBuilderFactory?: (
        qb: SelectQueryBuilder<any>
    ) => SelectQueryBuilder<any>
): Function {
    return function (object: Record<string, any>, propertyName: string) {
        getMetadataArgsStorage().relationIds.push({
            target: object.constructor,
            propertyName,
            relation,
            alias,
            queryBuilderFactory,
        } as RelationIdMetadataArgs);
    };
}
