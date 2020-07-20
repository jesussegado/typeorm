import { ObjectLiteral } from "typeorm-base";
import { EntityMetadata } from "../../metadata/EntityMetadata";
import { EmbeddedMetadata } from "../../metadata/EmbeddedMetadata";

/**
 * Transforms raw document into entity object.
 * Entity is constructed based on its entity metadata.
 */
export class DocumentToEntityTransformer {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(
        // private selectionMap: AliasMap,
        // private joinMappings: JoinMapping[],
        // private relationCountMetas: RelationCountAttribute[],
        private enableRelationIdValues: boolean = false
    ) {}

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    transformAll(documents: ObjectLiteral[], metadata: EntityMetadata) {
        return documents.map((document) => this.transform(document, metadata));
    }

    transform(document: any, metadata: EntityMetadata) {
        const entity: any = metadata.create();
        let hasData = false;

        // handle _id property the special way
        if (
            metadata.objectIdColumn &&
            document[metadata.objectIdColumn.databaseNameWithoutPrefixes]
        ) {
            // todo: we can't use driver in this class
            // do we really need prepare hydrated value here? If no then no problem. If yes then think maybe prepareHydratedValue process should be extracted out of driver class?
            // entity[metadata.objectIdColumn.propertyName] = this.driver.prepareHydratedValue(document[metadata.objectIdColumn.name"], metadata.objectIdColumn);
            entity[metadata.objectIdColumn.propertyName] =
                document[metadata.objectIdColumn.databaseNameWithoutPrefixes];
            hasData = true;
        }

        // add special columns that contains relation ids
        if (this.enableRelationIdValues) {
            metadata.columns
                .filter((column) => !!column.relationMetadata)
                .forEach((column) => {
                    const valueInObject =
                        document[column.databaseNameWithoutPrefixes];
                    if (
                        valueInObject !== undefined &&
                        valueInObject !== null &&
                        column.propertyName
                    ) {
                        // todo: we can't use driver in this class
                        // const value = this.driver.prepareHydratedValue(valueInObject, column);
                        entity[column.propertyName] = valueInObject;
                        hasData = true;
                    }
                });
        }

        // get value from columns selections and put them into object
        metadata.ownColumns.forEach((column) => {
            const valueInObject = document[column.databaseNameWithoutPrefixes];
            if (
                valueInObject !== undefined &&
                valueInObject !== null &&
                column.propertyName &&
                !column.isVirtual
            ) {
                entity[column.propertyName] = valueInObject;
                hasData = true;
            }
        });

        const addEmbeddedValuesRecursively = (
            entity: any,
            document: any,
            embeddeds: EmbeddedMetadata[]
        ) => {
            embeddeds.forEach((embedded) => {
                if (!document[embedded.prefix]) return;

                if (embedded.isArray) {
                    entity[embedded.propertyName] = (document[
                        embedded.prefix
                    ] as any[]).map((subValue: any, index: number) => {
                        const newItem = embedded.create();
                        embedded.columns.forEach((column) => {
                            newItem[column.propertyName] =
                                subValue[column.databaseNameWithoutPrefixes];
                        });
                        addEmbeddedValuesRecursively(
                            newItem,
                            document[embedded.prefix][index],
                            embedded.embeddeds
                        );
                        return newItem;
                    });
                } else {
                    if (
                        embedded.embeddeds.length &&
                        !entity[embedded.propertyName]
                    )
                        entity[embedded.propertyName] = embedded.create();

                    embedded.columns.forEach((column) => {
                        const value =
                            document[embedded.prefix][
                                column.databaseNameWithoutPrefixes
                            ];
                        if (value === undefined) return;

                        if (!entity[embedded.propertyName])
                            entity[embedded.propertyName] = embedded.create();

                        entity[embedded.propertyName][
                            column.propertyName
                        ] = value;
                    });
                }
                addEmbeddedValuesRecursively(
                    entity[embedded.propertyName],
                    document[embedded.prefix],
                    embedded.embeddeds
                );
            });
        };

        addEmbeddedValuesRecursively(entity, document, metadata.embeddeds);

        return hasData ? entity : null;
    }
}
