import "../sample1-simple-entity/node_modules/reflect-metadata";
import { createConnection} from "typeorm-core/build/compiled/src/index";
import {Post} from "./entity/Post";
import {Question} from "./entity/Question";
import {Counters} from "./entity/Counters";
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
    entities: [Post, Question, Counters]
    }

};

createConnection(options, createDriver).then(connection => {

    let questionRepository = connection.getRepository(Question);

    const question = new Question();
    question.title = "Hello question!";
    question.counters = new Counters();
    question.counters.stars = 5;
    question.counters.raiting = 10;
    question.counters.commentCount = 3;
    question.counters.metadata = "#question #question-counter";

    questionRepository
        .save(question)
        .then(savedQuestion => {
            console.log("question has been saved: ", savedQuestion);

            // lets load it now:
            return questionRepository.findOne(savedQuestion.id);
        })
        .then(loadedQuestion => {
            console.log("question has been loaded: ", loadedQuestion);

            loadedQuestion!.counters.commentCount = 7;
            loadedQuestion!.counters.metadata = "#updated question";

            return questionRepository.save(loadedQuestion!);
        })
        .then(updatedQuestion => {
            console.log("question has been updated: ", updatedQuestion);
        })
        .catch(e => console.log(e));

}, error => console.log("Cannot connect: ", error));
