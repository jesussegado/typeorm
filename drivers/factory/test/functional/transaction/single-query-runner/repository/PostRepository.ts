import {  AbstractRepository  } from "typeorm-core";
import { Post } from "../entity/Post";
import {  EntityManager  } from "typeorm-core";
import {  EntityRepository  } from "typeorm-core";

@EntityRepository()
export class PostRepository extends AbstractRepository<Post> {
    save(post: Post) {
        return this.manager.save(post);
    }

    getManager(): EntityManager {
        return this.manager;
    }
}
