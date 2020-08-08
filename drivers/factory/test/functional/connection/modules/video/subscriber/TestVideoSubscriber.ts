import {  EventSubscriber  } from "typeorm-core";
import {  EntitySubscriberInterface  } from "typeorm-core";
import {  InsertEvent  } from "typeorm-core";

@EventSubscriber()
export class TestVideoSubscriber implements EntitySubscriberInterface {
    /**
     * Called after entity insertion.
     */
    beforeInsert(event: InsertEvent<any>) {
        console.log(`BEFORE ENTITY INSERTED: `, event.entity);
    }
}
