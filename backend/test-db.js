const { Client } = require('pg');
const client = new Client({
    connectionString: "postgresql://creekuser:creekpassword@127.0.0.1:5433/creeklend?schema=public",
});

async function test() {
    try {
        console.log("Connecting to database...");
        await client.connect();
        console.log("Connected successfully!");
        const res = await client.query('SELECT NOW()');
        console.log("Query success result:", res.rows[0]);
        await client.end();
    } catch (err) {
        console.error("Connection failed:", err.message);
        process.exit(1);
    }
}

test();
