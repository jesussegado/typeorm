import "reflect-metadata";
import { expect } from "chai";
import { Connection } from "typeorm-core";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../../../utils/test-utils";
import { Post } from "./entity/Post";

describe("mongodb > indices", () => {
    let connections: Connection[];
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [Post],
                enabledDrivers: ["mongodb"],
            }))
    );
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should insert entity with indices correctly", () =>
        Promise.all(
            connections.map(async (connection) => {
                const postRepository = connection.getRepository(Post);

                // save a post
                const post = new Post();
                post.title = "Post";
                post.name = "About Post";
                await postRepository.save(post);

                // check saved post
                const loadedPost = await postRepository.findOne({
                    title: "Post",
                });

                expect(loadedPost).to.be.not.empty;
            })
        ));
});
