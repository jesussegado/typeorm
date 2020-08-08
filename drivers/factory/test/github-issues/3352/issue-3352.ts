import "reflect-metadata";
import { expect } from "chai";
import { Connection } from "typeorm-core";
import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../utils/test-utils";
import { Post } from "./entity/Post";

describe("github issues > #3352 sync drops text column", () => {
    let connections: Connection[];
    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [`${__dirname}/entity/*{.js,.ts}`],
                subscribers: [`${__dirname}/subscriber/*{.js,.ts}`],
                enabledDrivers: ["mysql"],
            }))
    );
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should not drop text column", () =>
        Promise.all(
            connections.map(async function (connection) {
                const post = new Post();
                post.id = 1;
                post.text = "hello world";
                await connection.manager.save(post);

                await connection.synchronize();

                const loadedPost = await connection.manager.find(Post, {
                    text: "hello world",
                });
                expect(loadedPost).to.be.not.empty;
            })
        ));
});
