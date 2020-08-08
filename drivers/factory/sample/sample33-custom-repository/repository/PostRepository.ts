import {Repository} from "typeorm-core/build/compiled/src/repository/Repository";
import {Post} from "../entity/Post";
import {EntityRepository} from "typeorm-core/build/compiled/src/decorator/EntityRepository";

/**
 * Second type of custom repository - extends standard repository.
 */
@EntityRepository(Post)
export class PostRepository extends Repository<Post> {

    findMyPost() {
        return this.findOne();
    }

}
