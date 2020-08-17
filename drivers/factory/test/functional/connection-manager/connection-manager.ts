import "reflect-metadata";
import { expect } from "chai";
import {
    ConnectionManager,
    PrimaryGeneratedColumn,
    Column,
    Entity,
} from "typeorm-core";

import { MysqlDriver } from "typeorm-driver-mysql";
import { setupSingleTestingConnection } from "../../utils/test-utils";
import { createDriver } from "../../../src";

// Uncomment when testing the aurora data API driver
// import { AuroraDataApiDriver } from "typeorm-core";
// import { AuroraDataApiConnectionOptions } from "typeorm-core";
// import { AuroraDataApiPostgresDriver } from "typeorm-core";
// import { AuroraDataApiPostgresConnectionOptions } from "typeorm-core";

describe("ConnectionManager", () => {
    @Entity()
    class Post {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        title: string;

        constructor(id: number, title: string) {
            this.id = id;
            this.title = title;
        }
    }

    describe("create", function () {
        it("should create a mysql connection when mysql driver is specified", () => {
            const options = setupSingleTestingConnection("mysql", {
                name: "default",
                entities: [],
            });
            if (!options) return;
            const connectionManager = new ConnectionManager();
            const connection = connectionManager.create(options, createDriver);
            connection.name.should.be.equal("default");
            connection.driver.should.be.instanceOf(MysqlDriver);
            connection.isConnected.should.be.false;
        });
    });

    describe("get", function () {
        it("should give connection with a requested name", () => {
            const options = setupSingleTestingConnection("mysql", {
                name: "myMysqlConnection",
                entities: [],
            });
            if (!options) return;
            const connectionManager = new ConnectionManager();
            const connection = connectionManager.create(options, createDriver);
            connection.driver.should.be.instanceOf(MysqlDriver);
            connectionManager
                .get("myMysqlConnection")
                .should.be.equal(connection);
        });

        it("should throw an error if connection with the given name was not found", () => {
            const options = setupSingleTestingConnection("mysql", {
                name: "myMysqlConnection",
                entities: [],
            });
            if (!options) return;
            const connectionManager = new ConnectionManager();
            const connection = connectionManager.create(options, createDriver);
            connection.driver.should.be.instanceOf(MysqlDriver);
            expect(() =>
                connectionManager.get("myPostgresConnection")
            ).to.throw(Error);
        });
    });

    describe("create connection options", function () {
        it("should not drop the database if dropSchema was not specified", async () => {
            const options = setupSingleTestingConnection("mysql", {
                name: "myMysqlConnection",
                schemaCreate: true,
                entities: [Post],
            });
            if (!options) return;

            const connectionManager = new ConnectionManager();

            // create connection, save post and close connection
            let connection = await connectionManager
                .create(options, createDriver)
                .connect();
            const post = new Post(1, "Hello post");
            await connection.manager.save(post);
            await connection.close();

            // recreate connection and find previously saved post
            connection = await connectionManager
                .create(options, createDriver)
                .connect();
            const loadedPost = (await connection.manager.findOne(Post, 1))!;
            loadedPost.should.be.instanceof(Post);
            loadedPost.should.be.eql({ id: 1, title: "Hello post" });
            await connection.close();
        });

        it("should drop the database if dropSchema was set to true (mysql)", async () => {
            const options = setupSingleTestingConnection("mysql", {
                name: "myMysqlConnection",
                schemaCreate: true,
                dropSchema: true,
                entities: [Post],
            });
            if (!options) return;

            const connectionManager = new ConnectionManager();

            // create connection, save post and close connection
            let connection = await connectionManager
                .create(options, createDriver)
                .connect();
            const post = new Post(1, "Hello post");
            await connection.manager.save(post);
            await connection.close();

            // recreate connection and find previously saved post
            connection = await connectionManager
                .create(options, createDriver)
                .connect();
            const loadedPost = await connection.manager.findOne(Post, 1);
            expect(loadedPost).to.be.undefined;
            await connection.close();
        });
    });
});
