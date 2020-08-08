import "../sample1-simple-entity/node_modules/reflect-metadata";
import { createConnection} from "typeorm-core/build/compiled/src/index";
import {Post} from "./entity/Post";
import {Author} from "./entity/Author";
import {TypeormAndConnectionOptions} from "typeorm-core/build/compiled/src/index";
import { createDriver } from '../../src';

const options:  TypeormAndConnectionOptions = {
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
    entities: [Post, Author]
    }

};

createConnection(options, createDriver).then(connection => {

    let postRepository = connection.getRepository(Post);
    let authorRepository = connection.getRepository(Author);

    const authorPromise = authorRepository.findOne(1).then(author => {
        if (!author) {
            author = new Author();
            author.name = "Umed";
            return authorRepository.save(author).then(savedAuthor => {
                return authorRepository.findOne(1);
            });
        }
        return author;
    });

    const postPromise = postRepository.findOne(1).then(post => {
        if (!post) {
            post = new Post();
            post.title = "Hello post";
            post.text = "This is post contents";
            return postRepository.save(post).then(savedPost => {
                return postRepository.findOne(1);
            });
        }
        return post;
    });

    return Promise.all<any>([authorPromise, postPromise])
        .then(results => {
            const [author, post] = results;
            author.posts = [post];
            return authorRepository.save(author);
        })
        .then(savedAuthor => {
            console.log("Author has been saved: ", savedAuthor);
        })
        .catch(error => console.log(error.stack));

}, error => console.log("Cannot connect: ", error));
