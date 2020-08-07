import "../sample1-simple-entity/node_modules/reflect-metadata";
import {createConnection} from "../../src/index";
import {Post} from "./entity/Post";
import { TypeormAndConnectionOptions } from '../../src/connection/Connection';

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
        logging: ["query", "error"],
        synchronize: true,
        entities: [Post]
    }
};

createConnection(options).then(connection => {

    let post = new Post();
    post.text = "Hello how are you?";
    post.title = "hello";

    let postRepository = connection.getRepository(Post);

    postRepository
        .save(post)
        .then(post => {
            console.log(`Post has been saved: `, post);
            console.log(`Post's version is ${post.version}. Lets change post's text and update it:`);
            post.title = "updating title";
            return postRepository.save(post);

        }).then(post => {
            console.log(`Post has been updated. Post's version is ${post.version}`);
        });

}, error => console.log("Cannot connect: ", error));
