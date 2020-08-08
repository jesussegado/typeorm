import { Connection } from "typeorm-core";
import {  ViewColumn  } from "typeorm-core";
import {  ViewEntity  } from "typeorm-core";
import { Category } from "./Category";
import { Post } from "./Post";

@ViewEntity({
    expression: (connection: Connection) =>
        connection
            .createQueryBuilder()
            .select("post.id", "id")
            .addSelect("post.name", "name")
            .addSelect("category.name", "categoryName")
            .from(Post, "post")
            .leftJoin(Category, "category", "category.id = post.categoryId"),
})
export class PostCategory {
    @ViewColumn()
    id: number;

    @ViewColumn()
    name: string;

    @ViewColumn()
    categoryName: string;
}
