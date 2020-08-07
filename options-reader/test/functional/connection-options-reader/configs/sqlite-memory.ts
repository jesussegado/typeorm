module.exports = [
    {
        typeORMOptions: {
            name: "file",
        },
        connectionOptions: {
            type: "sqlite",
            database: "test",
        },
    },
    {
        typeORMOptions: {
            name: "memory",
        },
        connectionOptions: {
            type: "sqlite",
            database: ":memory:",
        },
    },
];
