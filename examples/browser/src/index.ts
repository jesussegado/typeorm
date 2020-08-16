import { createConnection } from "typeorm-core";
import { SqljsConnectionOptions } from "typeorm-base";
import { SqljsDriver } from "typeorm-driver-sqljs";
import { Author } from "./entity/Author";
import { Post } from "./entity/Post";
import { Category } from "./entity/Category";

createConnection(
    {
        typeORMOptions: {
            entities: [Author, Post, Category],
            logging: ["query", "schema"],
            synchronize: true,
        },
        connectionOptions: {
            type: "sqljs",
            location: "test",
            autoSave: true,
        },
    },
    (connection, options) =>
        new SqljsDriver(connection, options as SqljsConnectionOptions)
)
    .then(async (connection) => {
        // TODO: Enable compilation & setup test
        document.write("Writing new post...<br>");

        const category1 = new Category();
        category1.name = "TypeScript";

        const category2 = new Category();
        category2.name = "Programming";

        const author = new Author();
        author.name = "Person";

        const post = new Post();
        post.title = "Control flow based type analysis";
        post.text = `TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.`;
        post.categories = [category1, category2];
        post.author = author;

        const postRepository = connection.getRepository(Post);

        await postRepository.save(post);

        document.write("<br>Post has been save:<br>");
        document.write("<pre>", JSON.stringify(post, null, 2), "</pre>");
        console.log("Post has been saved: ", post);
    })
    .catch((error) => {
        document.write("<b>Error: ", JSON.stringify(error, null, 2), "</b>");
        console.log("Error: ", error);
    });
