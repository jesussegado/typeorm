import { EntitySubscriberInterface, EventSubscriber } from "typeorm-core";
import { LoadEvent } from "typeorm-core/build/compiled/src/subscriber/event/LoadEvent";
import { Post } from "../entity/Post";

@EventSubscriber()
export class ExtendedAfterLoadSubscriber
    implements EntitySubscriberInterface<Post> {
    listenTo() {
        return Post;
    }

    async afterLoad(entity: Post, event: LoadEvent<Post>) {
        entity.extendedSubscriberSaw = event;
    }
}
