import { getMetadataArgsStorage, ObjectType, RelationOptions } from "../..";
import { RelationMetadataArgs } from "../../metadata-args/RelationMetadataArgs";

/**
 * Many-to-many is a type of relationship when Entity1 can have multiple instances of Entity2, and Entity2 can have
 * multiple instances of Entity1. To achieve it, this type of relation creates a junction table, where it storage
 * entity1 and entity2 ids. This is owner side of the relationship.
 */
export function ManyToMany<T>(
    typeFunctionOrTarget: string | ((type?: any) => ObjectType<T>),
    options?: RelationOptions
): Function;

/**
 * Many-to-many is a type of relationship when Entity1 can have multiple instances of Entity2, and Entity2 can have
 * multiple instances of Entity1. To achieve it, this type of relation creates a junction table, where it storage
 * entity1 and entity2 ids. This is owner side of the relationship.
 */
export function ManyToMany<T>(
    typeFunctionOrTarget: string | ((type?: any) => ObjectType<T>),
    inverseSide?: string | ((object: T) => any),
    options?: RelationOptions
): Function;

/**
 * Many-to-many is a type of relationship when Entity1 can have multiple instances of Entity2, and Entity2 can have
 * multiple instances of Entity1. To achieve it, this type of relation creates a junction table, where it storage
 * entity1 and entity2 ids. This is owner side of the relationship.
 */
export function ManyToMany<T>(
    typeFunctionOrTarget: string | ((type?: any) => ObjectType<T>),
    inverseSideOrOptions?: string | ((object: T) => any) | RelationOptions,
    options?: RelationOptions
): Function {
    // normalize parameters
    let inverseSideProperty: string | ((object: T) => any);
    if (typeof inverseSideOrOptions === "object") {
        options = inverseSideOrOptions as RelationOptions;
    } else {
        inverseSideProperty = inverseSideOrOptions as
            | string
            | ((object: T) => any);
    }

    return function (object: Record<string, any>, propertyName: string) {
        if (!options) options = {} as RelationOptions;

        // now try to determine it its lazy relation
        let isLazy = options.lazy === true;
        if (!isLazy && Reflect && (Reflect as any).getMetadata) {
            // automatic determination
            const reflectedType = (Reflect as any).getMetadata(
                "design:type",
                object,
                propertyName
            );
            if (
                reflectedType &&
                typeof reflectedType.name === "string" &&
                reflectedType.name.toLowerCase() === "promise"
            )
                isLazy = true;
        }

        getMetadataArgsStorage().relations.push({
            target: object.constructor,
            propertyName,
            // propertyType: reflectedType,
            relationType: "many-to-many",
            isLazy,
            type: typeFunctionOrTarget,
            inverseSideProperty,
            options,
        } as RelationMetadataArgs);
    };
}
