const { Client } = require('pg');

const client = new Client({
    connectionString: "postgresql://creekuser:creekpassword@127.0.0.1:5432/creeklend"
});

client.connect()
    .then(() => {
        console.log('Connected successfully');
        return client.query('SELECT 1');
    })
    .then(res => {
        console.log('Query result:', res.rows[0]);
        return client.end();
    })
    .catch(err => {
        console.error('Connection error', err.stack);
        process.exit(1);
    });
