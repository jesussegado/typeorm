import { ObjectLiteral } from "typeorm-base";
import { EntityMetadata } from "../../metadata/EntityMetadata";
import { RelationMetadata } from "../../metadata/RelationMetadata";
/**
 */
export class LoadMapItem {
    entity?: ObjectLiteral;

    plainEntity: ObjectLiteral;

    metadata: EntityMetadata;

    parentLoadMapItem?: LoadMapItem;

    relation?: RelationMetadata;

    constructor(
        plainEntity: ObjectLiteral,
        metadata: EntityMetadata,
        parentLoadMapItem?: LoadMapItem,
        relation?: RelationMetadata
    ) {
        this.plainEntity = plainEntity;
        this.metadata = metadata;
        this.parentLoadMapItem = parentLoadMapItem;
        this.relation = relation;
    }

    get target(): Function | string {
        return this.metadata.target;
    }

    get id(): any {
        return this.metadata.getEntityIdMixedMap(this.plainEntity);
    }
}
