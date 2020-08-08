import "../sample1-simple-entity/node_modules/reflect-metadata";
import {createConnection} from "typeorm-core/build/compiled/src/index";
import {Post} from "./entity/Post";
import {CustomNamingStrategy} from "./naming-strategy/CustomNamingStrategy";
import {TypeormAndConnectionOptions} from "typeorm-core/build/compiled/src/index";
import { createDriver } from '../../src';

const options: TypeormAndConnectionOptions = {
    connectionOptions:{
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "admin",
        database: "test",

    },
    typeORMOptions:{
        synchronize: true,
        namingStrategy: new CustomNamingStrategy(),
        entities: [Post]
    }
};

createConnection(options, createDriver).then(connection => {

    let post = new Post();
    post.text = "Hello how are you?";
    post.title = "hello";

    let postRepository = connection.getRepository(Post);

    postRepository
        .save(post)
        .then(post => console.log("Post has been saved"))
        .catch(error => console.log("Cannot save. Error: ", error));

}, error => console.log("Cannot connect: ", error));
