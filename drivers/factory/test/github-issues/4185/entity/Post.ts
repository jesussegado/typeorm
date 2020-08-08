import { PrimaryColumn, Entity } from "typeorm-core";

import { LoadEvent } from "typeorm-core/build/compiled/src/subscriber/event/LoadEvent";

@Entity()
export class Post {
    @PrimaryColumn()
    id: number;

    simpleSubscriberSaw?: boolean;

    extendedSubscriberSaw?: LoadEvent<Post>;
}
