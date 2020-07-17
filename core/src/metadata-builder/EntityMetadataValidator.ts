import { EntityMetadata } from "../metadata/EntityMetadata";
import { MissingPrimaryColumnError } from "../error/MissingPrimaryColumnError";
import { CircularRelationsError } from "../error/CircularRelationsError";
import { DepGraph } from "../util/DepGraph";
import { Driver, isDriverSupported } from "../driver/Driver";
import { DataTypeNotSupportedError } from "../error/DataTypeNotSupportedError";
import { ColumnType } from "../driver/types/ColumnTypes";
import { NoConnectionOptionError } from "../error/NoConnectionOptionError";
import { InitializedRelationError } from "../error/InitializedRelationError";

/// todo: add check if there are multiple tables with the same name
/// todo: add checks when generated column / table names are too long for the specific driver
// todo: type in function validation, inverse side function validation
// todo: check on build for duplicate names, since naming checking was removed from MetadataStorage
// todo: duplicate name checking for: table, relation, column, index, naming strategy, join tables/columns?
// todo: check if multiple tree parent metadatas in validator
// todo: tree decorators can be used only on closure table (validation)
// todo: throw error if parent tree metadata was not specified in a closure table

// todo: MetadataArgsStorage: type in function validation, inverse side function validation
// todo: MetadataArgsStorage: check on build for duplicate names, since naming checking was removed from MetadataStorage
// todo: MetadataArgsStorage: duplicate name checking for: table, relation, column, index, naming strategy, join tables/columns?
// todo: MetadataArgsStorage: check for duplicate targets too since this check has been removed too
// todo: check if relation decorator contains primary: true and nullable: true
// todo: check column length, precision. scale
// todo: MySQL index can be unique or spatial or fulltext

/**
 * Validates built entity metadatas.
 */
export class EntityMetadataValidator {
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    /**
     * Validates all given entity metadatas.
     */
    validateMany(entityMetadatas: EntityMetadata[], driver: Driver) {
        entityMetadatas.forEach((entityMetadata) =>
            this.validate(entityMetadata, entityMetadatas, driver)
        );
        this.validateDependencies(entityMetadatas);
        this.validateEagerRelations(entityMetadatas);
    }

    /**
     * Validates given entity metadata.
     */
    validate(
        entityMetadata: EntityMetadata,
        allEntityMetadatas: EntityMetadata[],
        driver: Driver
    ) {
        // check if table metadata has an id
        if (!entityMetadata.primaryColumns.length && !entityMetadata.isJunction)
            throw new MissingPrimaryColumnError(entityMetadata);

        // validate if table is using inheritance it has a discriminator
        // also validate if discriminator values are not empty and not repeated
        if (entityMetadata.inheritancePattern === "STI") {
            if (!entityMetadata.discriminatorColumn)
                throw new Error(
                    `Entity ${entityMetadata.name} using single-table inheritance, it should also have a discriminator column. Did you forget to put discriminator column options?`
                );

            if (
                ["", undefined, null].indexOf(
                    entityMetadata.discriminatorValue
                ) !== -1
            )
                throw new Error(
                    `Entity ${entityMetadata.name} has empty discriminator value. Discriminator value should not be empty.`
                );

            const sameDiscriminatorValueEntityMetadata = allEntityMetadatas.find(
                (metadata) => {
                    return (
                        metadata !== entityMetadata &&
                        metadata.discriminatorValue ===
                            entityMetadata.discriminatorValue
                    );
                }
            );
            if (sameDiscriminatorValueEntityMetadata)
                throw new Error(
                    `Entities ${entityMetadata.name} and ${sameDiscriminatorValueEntityMetadata.name} as equal discriminator values. Make sure their discriminator values are not equal using @DiscriminatorValue decorator.`
                );
        }

        entityMetadata.relationCounts.forEach((relationCount) => {
            if (
                relationCount.relation.isManyToOne ||
                relationCount.relation.isOneToOne
            )
                throw new Error(
                    `Relation count can not be implemented on ManyToOne or OneToOne relations.`
                );
        });

        if (!(isDriverSupported(["mongodb"],driver.type))) {
            entityMetadata.columns.forEach((column) => {
                const normalizedColumn = driver.normalizeType(
                    column
                ) as ColumnType;
                if (driver.supportedDataTypes.indexOf(normalizedColumn) === -1)
                    throw new DataTypeNotSupportedError(
                        column,
                        normalizedColumn,
                        driver.options.type
                    );
                if (
                    column.length &&
                    driver.withLengthColumnTypes.indexOf(normalizedColumn) ===
                        -1
                )
                    throw new Error(
                        `Column ${column.propertyName} of Entity ${entityMetadata.name} does not support length property.`
                    );
            });
        }

        if (
            isDriverSupported(["mysql","aurora-data-api"],driver.type)
        ) {
            const generatedColumns = entityMetadata.columns.filter(
                (column) =>
                    column.isGenerated && column.generationStrategy !== "uuid"
            );
            if (generatedColumns.length > 1)
                throw new Error(
                    `Error in ${entityMetadata.name} entity. There can be only one auto-increment column in MySql table.`
                );
        }

        // for mysql we are able to not define a default selected database, instead all entities can have their database
        // defined in their decorators. To make everything work either all entities must have database define and we
        // can live without database set in the connection options, either database in the connection options must be set
        if (isDriverSupported(["mysql"],driver.type)) {
            const metadatasWithDatabase = allEntityMetadatas.filter(
                (metadata) => metadata.database
            );
            if (metadatasWithDatabase.length === 0 && !driver.database)
                throw new NoConnectionOptionError("database");
        }

        if (isDriverSupported(["mssql"],driver.type)) {
            const charsetColumns = entityMetadata.columns.filter(
                (column) => column.charset
            );
            if (charsetColumns.length > 1)
                throw new Error(
                    `Character set specifying is not supported in Sql Server`
                );
        }

        // check if relations are all without initialized properties
        const entityInstance = entityMetadata.create();
        entityMetadata.relations.forEach((relation) => {
            if (relation.isManyToMany || relation.isOneToMany) {
                // we skip relations for which persistence is disabled since initialization in them cannot harm somehow
                if (relation.persistenceEnabled === false) return;

                // get entity relation value and check if its an array
                const relationInitializedValue = relation.getEntityValue(
                    entityInstance
                );
                if (Array.isArray(relationInitializedValue))
                    throw new InitializedRelationError(relation);
            }
        });

        // make sure cascade remove is not set for both sides of relationships (can be set in OneToOne decorators)
        entityMetadata.relations.forEach((relation) => {
            const isCircularCascadeRemove =
                relation.isCascadeRemove &&
                relation.inverseRelation &&
                relation.inverseRelation!.isCascadeRemove;
            if (isCircularCascadeRemove)
                throw new Error(
                    `Relation ${entityMetadata.name}#${
                        relation.propertyName
                    } and ${relation.inverseRelation!.entityMetadata.name}#${
                        relation.inverseRelation!.propertyName
                    } both has cascade remove set. ` +
                        `This may lead to unexpected circular removals. Please set cascade remove only from one side of relationship.`
                );
        }); // todo: maybe better just deny removal from one to one relation without join column?
    }

    /**
     * Validates dependencies of the entity metadatas.
     */
    protected validateDependencies(entityMetadatas: EntityMetadata[]) {
        const graph = new DepGraph();
        entityMetadatas.forEach((entityMetadata) => {
            graph.addNode(entityMetadata.name);
        });
        entityMetadatas.forEach((entityMetadata) => {
            entityMetadata.relationsWithJoinColumns
                .filter((relation) => !relation.isNullable)
                .forEach((relation) => {
                    graph.addDependency(
                        entityMetadata.name,
                        relation.inverseEntityMetadata.name
                    );
                });
        });
        try {
            graph.overallOrder();
        } catch (err) {
            throw new CircularRelationsError(
                err.toString().replace("Error: Dependency Cycle Found: ", "")
            );
        }
    }

    /**
     * Validates eager relations to prevent circular dependency in them.
     */
    protected validateEagerRelations(entityMetadatas: EntityMetadata[]) {
        entityMetadatas.forEach((entityMetadata) => {
            entityMetadata.eagerRelations.forEach((relation) => {
                if (
                    relation.inverseRelation &&
                    relation.inverseRelation.isEager
                )
                    throw new Error(
                        `Circular eager relations are disallowed. ` +
                            `${entityMetadata.targetName}#${relation.propertyPath} contains "eager: true", and its inverse side ` +
                            `${relation.inverseEntityMetadata.targetName}#${relation.inverseRelation.propertyPath} contains "eager: true" as well.` +
                            ` Remove "eager: true" from one side of the relation.`
                    );
            });
        });
    }
}
