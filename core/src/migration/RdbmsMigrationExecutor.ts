import { ObjectLiteral } from "typeorm-base";
import {
    MigrationExecutor,
    MigrationExecutorConditions,
} from "./MigrationExecutor";
import { QueryRunner, Migration } from "..";

export class RdbmsMigrationExecutor extends MigrationExecutor {
    protected async loadExecutedMigrations(
        queryRunner: QueryRunner
    ): Promise<Migration[]> {
        const migrationsRaw: ObjectLiteral[] = await this.connection.manager
            .createQueryBuilder(queryRunner)
            .select()
            .orderBy(this.connection.driver.escape("id"), "DESC")
            .from(this.migrationsTable, this.migrationsTableName)
            .getRawMany();
        return migrationsRaw.map((migrationRaw) => {
            return new Migration(
                parseInt(migrationRaw.id),
                parseInt(migrationRaw.timestamp),
                migrationRaw.name
            );
        });
    }

    protected async insertExecutedMigrationExecute(
        queryRunner: QueryRunner,
        values: MigrationExecutorConditions
    ): Promise<void> {
        const qb = queryRunner.manager.createQueryBuilder();
        await qb.insert().into(this.migrationsTable).values(values).execute();
    }

    protected async deleteExecutedMigrationExecute(
        queryRunner: QueryRunner,
        conditions: MigrationExecutorConditions
    ): Promise<void> {
        const qb = queryRunner.manager.createQueryBuilder();
        await qb
            .delete()
            .from(this.migrationsTable)
            .where(`${qb.escape("timestamp")} = :timestamp`)
            .andWhere(`${qb.escape("name")} = :name`)
            .setParameters(conditions)
            .execute();
    }
}
