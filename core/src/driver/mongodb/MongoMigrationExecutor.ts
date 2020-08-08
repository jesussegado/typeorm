import { MigrationExecutor, QueryRunner, Migration } from '../..';
import { MongoQueryRunner } from './MongoQueryRunner';
import { MigrationExecutorConditions } from '../../migration/MigrationExecutor';

export class MongoMigrationExecutor extends MigrationExecutor{
    protected loadExecutedMigrations(queryRunner: QueryRunner): Promise<Migration[]> {
        const mongoRunner = queryRunner as MongoQueryRunner;
        return mongoRunner.databaseConnection
            .db(this.connection.driver.database!)
            .collection(this.migrationsTableName)
            .find<Migration>()
            .sort({ _id: -1 })
            .toArray();
    }
    protected async insertExecutedMigrationExecute(queryRunner: QueryRunner, values: MigrationExecutorConditions): Promise<void> {
        const mongoRunner = queryRunner as MongoQueryRunner;
            await mongoRunner.databaseConnection
                .db(this.connection.driver.database!)
                .collection(this.migrationsTableName)
                .insert(values);
    }
    protected async deleteExecutedMigrationExecute(queryRunner: QueryRunner,conditions:MigrationExecutorConditions): Promise<void> {
        const mongoRunner = queryRunner as MongoQueryRunner;
            await mongoRunner.databaseConnection
                .db(this.connection.driver.database!)
                .collection(this.migrationsTableName)
                .deleteOne(conditions);
    }

}
