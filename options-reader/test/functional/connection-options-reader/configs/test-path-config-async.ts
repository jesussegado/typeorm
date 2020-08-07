module.exports = Promise.resolve({
    typeORMOptions: {
        name: "file",
    },
    connectionOptions: {
        type: "sqlite",
        database: "test-js-async",
    },
});
