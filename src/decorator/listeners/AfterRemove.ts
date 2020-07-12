import { getMetadataArgsStorage } from "../..";
import { EventListenerTypes } from "../../metadata/types/EventListenerTypes";
import { EntityListenerMetadataArgs } from "../../metadata-args/EntityListenerMetadataArgs";

/**
 * Calls a method on which this decorator is applied after this entity removal.
 */
export function AfterRemove() {
    return function (object: Record<string, any>, propertyName: string) {
        getMetadataArgsStorage().entityListeners.push({
            target: object.constructor,
            propertyName,
            type: EventListenerTypes.AFTER_REMOVE,
        } as EntityListenerMetadataArgs);
    };
}
