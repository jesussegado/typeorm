import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from "typeorm-core";

@EventSubscriber()
export class FirstConnectionSubscriber implements EntitySubscriberInterface {
    /**
     * Called after entity insertion.
     */
    beforeInsert(event: InsertEvent<any>) {
        console.log(`BEFORE ENTITY INSERTED: `, event.entity);
    }
}
