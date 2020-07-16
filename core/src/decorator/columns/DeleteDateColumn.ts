import { ColumnOptions, getMetadataArgsStorage } from "../..";
import { ColumnMetadataArgs } from "../../metadata-args/ColumnMetadataArgs";

/**
 * This column will store a delete date of the soft-deleted object.
 * This date is being updated each time you soft-delete the object.
 */
export function DeleteDateColumn(options?: ColumnOptions): Function {
    return function (object: Record<string, any>, propertyName: string) {
        getMetadataArgsStorage().columns.push({
            target: object.constructor,
            propertyName,
            mode: "deleteDate",
            options: options || {},
        } as ColumnMetadataArgs);
    };
}
