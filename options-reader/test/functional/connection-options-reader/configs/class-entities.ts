import { Entity, PrimaryGeneratedColumn, Column } from "typeorm-core";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    constructor(id: number, title: string) {
        this.id = id;
        this.title = title;
    }
}

module.exports = {
    typeORMOptions: {
        name: "test-conn",
        logging: false,
        entities: [Post],
    },
    connectionOptions: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "test",
        password: "test",
        database: "test",
    },
};
