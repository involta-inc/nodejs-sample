(async () => {
    const env = require('process').env;
    const fastify = require('fastify')({
        trustProxy: true
    });
    fastify.register(require('fastify-compress'), {
        global: true
    });
    fastify.register(require('fastify-postgres'), {
        connectionString: env.DB_URI,
        name: 'database',
        max: 100
    });

    fastify.get('/', async () => {
        let dbConnection = await fastify.pg.database.connect();
        let [{
            result
        }] = (await dbConnection.query("SELECT 1 + 1 AS result", [])).rows;
        return {
            result: result
        };
    });
    await fastify.listen(8080, '0.0.0.0')
})();
