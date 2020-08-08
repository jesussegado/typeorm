import "reflect-metadata";
import { expect } from "chai";
import { Connection } from "typeorm-core";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../utils/test-utils";
import { Post } from "./entity/Post";

describe("github issues > #80 repository.save fails when empty array is sent to the method", () => {
    let connections: Connection[];
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [`${__dirname}/entity/*{.js,.ts}`],
            }))
    );
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should persist successfully and return persisted entity", () =>
        Promise.all(
            connections.map(async (connection) => {
                const post = new Post();
                post.title = "Hello Post #1";
                const returnedPost = await connection.manager.save(post);

                expect(returnedPost).not.to.be.undefined;
                returnedPost.should.be.equal(post);
            })
        ));

    it("should not fail if empty array is given to persist method", () =>
        Promise.all(
            connections.map(async (connection) => {
                const posts: Post[] = [];
                const returnedPosts = await connection.manager.save(posts);
                expect(returnedPosts).not.to.be.undefined;
                returnedPosts.should.be.equal(posts);
            })
        ));
});
