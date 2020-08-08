import {  EventSubscriber  } from "typeorm-core";
import {  EntitySubscriberInterface  } from "typeorm-core";
import {  InsertEvent  } from "typeorm-core";

@EventSubscriber()
export class TestQuestionSubscriber implements EntitySubscriberInterface {
    /**
     * Called before entity insertion.
     */
    beforeInsert(event: InsertEvent<any>) {
        console.log(`BEFORE ENTITY INSERTED: `, event.entity);
    }
}
