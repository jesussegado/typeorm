import "reflect-metadata";
import { expect } from "chai";
import { Connection } from "typeorm-core";
import { isDriverSupported } from "typeorm-core/build/compiled/src/driver/Driver";
import {
    createTestingConnections,
    closeTestingConnections,
    reloadTestingDatabases,
} from "../../utils/test-utils";
import { User } from "./entity/User";

describe("github issues > #3047 Mysqsl on duplicate key update use current values", () => {
    let connections: Connection[];

    before(
        async () =>
            (connections = await createTestingConnections({
                entities: [User],
                schemaCreate: true,
                dropSchema: true,
            }))
    );

    beforeEach(() => reloadTestingDatabases(connections));

    after(() => closeTestingConnections(connections));

    const user1 = new User();
    user1.first_name = "John";
    user1.last_name = "Lenon";
    user1.is_updated = "no";

    const user2 = new User();
    user2.first_name = "John";
    user2.last_name = "Lenon";
    user2.is_updated = "yes";

    it("should overwrite using current value in MySQL/MariaDB", () =>
        Promise.all(
            connections.map(async (connection) => {
                try {
                    if (isDriverSupported(["mysql"], connection.driver.type)) {
                        const UserRepository = connection.manager.getRepository(
                            User
                        );

                        await UserRepository.createQueryBuilder()
                            .insert()
                            .into(User)
                            .values(user1)
                            .execute();

                        await UserRepository.createQueryBuilder()
                            .insert()
                            .into(User)
                            .values(user2)
                            .orUpdate({ overwrite: ["is_updated"] })
                            .execute();

                        const loadedUser = await UserRepository.find();
                        expect(loadedUser).not.to.be.undefined;
                        expect(loadedUser).to.have.lengthOf(1);
                        expect(loadedUser[0]).to.includes({
                            is_updated: "yes",
                        });
                    }
                } catch (err) {
                    throw new Error(err);
                }
            })
        ));

    it("should overwrite using current value in PostgreSQL", () =>
        Promise.all(
            connections.map(async (connection) => {
                try {
                    if (
                        isDriverSupported(["postgres"], connection.driver.type)
                    ) {
                        const UserRepository = connection.manager.getRepository(
                            User
                        );

                        await UserRepository.createQueryBuilder()
                            .insert()
                            .into(User)
                            .values(user1)
                            .execute();

                        await UserRepository.createQueryBuilder()
                            .insert()
                            .into(User)
                            .values(user2)
                            .orUpdate({
                                conflict_target: ["first_name", "last_name"],
                                overwrite: ["is_updated"],
                            })
                            .execute();

                        const loadedUser = await UserRepository.find();
                        expect(loadedUser).not.to.be.undefined;
                        expect(loadedUser).to.have.lengthOf(1);
                        expect(loadedUser[0]).to.includes({
                            is_updated: "yes",
                        });
                    }
                } catch (err) {
                    throw new Error(err);
                }
            })
        ));
});
