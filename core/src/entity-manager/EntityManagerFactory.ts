import { Connection } from "../connection/Connection";
import { EntityManager } from "./EntityManager";
import { MongoEntityManager } from "./MongoEntityManager";
import { SqljsEntityManager } from "./SqljsEntityManager";
import { QueryRunner } from "../query-runner/QueryRunner";
import { isDriverSupported } from '../driver/Driver';

/**
 * Helps to create entity managers.
 */
export class EntityManagerFactory {
    /**
     * Creates a new entity manager depend on a given connection's driver.
     */
    create(connection: Connection, queryRunner?: QueryRunner): EntityManager {
        if (isDriverSupported(["mongodb"],connection.driver.type))
            return new MongoEntityManager(connection);

        if (isDriverSupported(["sqljs"], connection.driver.type))
            return new SqljsEntityManager(connection, queryRunner);

        return new EntityManager(connection, queryRunner);
    }
}
