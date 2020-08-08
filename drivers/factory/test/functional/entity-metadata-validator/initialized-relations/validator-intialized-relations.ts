import "reflect-metadata";
import { expect } from "chai";
import {  Connection  } from "typeorm-core";
import {  ConnectionMetadataBuilder  } from "typeorm-core/build/compiled/src/connection/ConnectionMetadataBuilder";
import {  EntityMetadataValidator  } from "typeorm-core/build/compiled/src/metadata-builder/EntityMetadataValidator";
import {  InitializedRelationError  } from "typeorm-core/build/compiled/src/error/InitializedRelationError";
import { Category } from "./entity/Category";
import { Post } from "./entity/Post";
import { Image } from "./entity/Image";
import { ImageInfo } from "./entity/ImageInfo";
import { Question } from "./entity/Question";
import { createDriver } from '../../../../src';

describe("entity-metadata-validator > initialized relations", () => {
    it("should throw error if relation with initialized array was found on many-to-many relation", () => {
        const connection = new Connection({
            connectionOptions: {
                // dummy connection options, connection won't be established anyway
                type: "mysql",
                host: "localhost",
                username: "test",
                password: "test",
                database: "test",
            },
            typeORMOptions: {
                entities: [Post, Category],
            },
        }, createDriver);
        const connectionMetadataBuilder = new ConnectionMetadataBuilder(
            connection
        );
        const entityMetadatas = connectionMetadataBuilder.buildEntityMetadatas([
            Post,
            Category,
        ]);
        const entityMetadataValidator = new EntityMetadataValidator();
        expect(() =>
            entityMetadataValidator.validateMany(
                entityMetadatas,
                connection.driver
            )
        ).to.throw(InitializedRelationError);
    });

    it("should throw error if relation with initialized array was found on one-to-many relation", () => {
        const connection = new Connection({
            connectionOptions: {
                // dummy connection options, connection won't be established anyway
                type: "mysql",
                host: "localhost",
                username: "test",
                password: "test",
                database: "test",
            },
            typeORMOptions: {
                entities: [Image, ImageInfo],
            },
        }, createDriver);
        const connectionMetadataBuilder = new ConnectionMetadataBuilder(
            connection
        );
        const entityMetadatas = connectionMetadataBuilder.buildEntityMetadatas([
            Image,
            ImageInfo,
        ]);
        const entityMetadataValidator = new EntityMetadataValidator();
        expect(() =>
            entityMetadataValidator.validateMany(
                entityMetadatas,
                connection.driver
            )
        ).to.throw(InitializedRelationError);
    });

    it("should not throw error if relation with initialized array was not found", () => {
        const connection = new Connection({
            connectionOptions: {
                // dummy connection options, connection won't be established anyway
                type: "mysql",
                host: "localhost",
                username: "test",
                password: "test",
                database: "test",
            },
            typeORMOptions: {
                entities: [Category],
            },
        }, createDriver);
        const connectionMetadataBuilder = new ConnectionMetadataBuilder(
            connection
        );
        const entityMetadatas = connectionMetadataBuilder.buildEntityMetadatas([
            Category,
        ]);
        const entityMetadataValidator = new EntityMetadataValidator();
        expect(() =>
            entityMetadataValidator.validateMany(
                entityMetadatas,
                connection.driver
            )
        ).not.to.throw(InitializedRelationError);
    });

    it("should not throw error if relation with initialized array was found, but persistence for this relation was disabled", () => {
        const connection = new Connection({
            connectionOptions: {
                // dummy connection options, connection won't be established anyway
                type: "mysql",
                host: "localhost",
                username: "test",
                password: "test",
                database: "test",
            },
            typeORMOptions: {
                entities: [Question, Category],
            },
        }, createDriver);
        const connectionMetadataBuilder = new ConnectionMetadataBuilder(
            connection
        );
        const entityMetadatas = connectionMetadataBuilder.buildEntityMetadatas([
            Question,
            Category,
        ]);
        const entityMetadataValidator = new EntityMetadataValidator();
        expect(() =>
            entityMetadataValidator.validateMany(
                entityMetadatas,
                connection.driver
            )
        ).not.to.throw(InitializedRelationError);
    });
});
