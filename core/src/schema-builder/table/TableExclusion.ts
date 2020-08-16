import { TableExclusionOptions } from "../options/TableExclusionOptions";
import { ExclusionMetadata } from "../../metadata/ExclusionMetadata";

/**
 * Database's table exclusion constraint stored in this class.
 */
export class TableExclusion {
    /**
     * Constraint name.
     */
    name?: string;

    /**
     * Exclusion expression.
     */
    expression?: string;

    constructor(options: TableExclusionOptions) {
        this.name = options.name;
        this.expression = options.expression;
    }

    /**
     * Creates a new copy of this constraint with exactly same properties.
     */
    clone(): TableExclusion {
        return new TableExclusion({
            name: this.name,
            expression: this.expression,
        } as TableExclusionOptions);
    }

    /**
     * Creates exclusions from the exclusion metadata object.
     */
    static create(exclusionMetadata: ExclusionMetadata): TableExclusion {
        return new TableExclusion({
            name: exclusionMetadata.name,
            expression: exclusionMetadata.expression,
        } as TableExclusionOptions);
    }
}
