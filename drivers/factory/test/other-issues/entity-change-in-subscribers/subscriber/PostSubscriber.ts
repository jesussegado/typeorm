import {
    EventSubscriber,
    EntitySubscriberInterface,
    UpdateEvent,
} from "typeorm-core";
import { Post } from "../entity/Post";

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Post> {
    listenTo() {
        return Post;
    }

    beforeUpdate(event: UpdateEvent<Post>) {
        event.entity.updatedColumns = event.updatedColumns.length;
        event.entity.updatedRelations = event.updatedRelations.length;
    }
}
