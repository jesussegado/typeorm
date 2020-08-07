import { createConnection, TypeormAndConnectionOptions } from "typeorm-core";
import { Post } from "./entity/Post";
import { Category } from "./entity/Category";

async function run() {
    const connectionOptions: TypeormAndConnectionOptions = {
        connectionOptions: {
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "test",
            password: "test",
            database: "test",
        },
        typeORMOptions: {
            name: "default",
            synchronize: true,
            logging: false,
            entities: ["src/entity/*.js"],
        },
    };

    const connection = await createConnection(connectionOptions);
    // connection settings can also be loaded using typeorm-options-reader
    try {
        const category1 = new Category();
        category1.name = "TypeScript";
        await connection.manager.save(category1);

        const category2 = new Category();
        category2.name = "Programming";
        await connection.manager.save(category2);

        const post = new Post();
        post.title = "Control flow based type analysis";
        post.text = `TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.`;
        post.categories = [category1, category2];

        await connection.manager.save(post);

        console.log("Post has been saved: ", post);
    } catch (error) {
        console.log("Error: ", error);
    }
    await connection.close();
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
run();
