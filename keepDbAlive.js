const dotenv = require("dotenv");
dotenv.config();
const { Client } = require("pg");

// Define the connection string (replace with your actual connection string)
const TUROVER_DB = process.env.TUROVER_DB;
console.log("db url", TUROVER_DB);
async function keepDbAlive() {
  try {
    // Create a new PostgreSQL client
    const turnover_db_client = new Client({
      connectionString: TUROVER_DB,
    });
    // Connect to the PostgreSQL database
    await turnover_db_client.connect();
    console.log("Connected to the database.");

    // Run a simple query to fetch some data and keep the connection alive
    const res = await turnover_db_client.query(
      'SELECT name,email FROM "User" LIMIT 1'
    ); // Simple query just to ping the database

    console.log(
      "Database ping successful:",
      new Date(Date.now()).toDateString(),
      new Date(Date.now()).toTimeString(),
      res.rows
    );

    // Disconnect after query
    await turnover_db_client.end();
    console.log("Disconnected from the database.");
  } catch (err) {
    console.error("Error pinging the database:", err);
  }
}

// Set an interval to ping the database every 15 minutes (900,000 milliseconds)
setInterval(keepDbAlive, 1000 * 60 * 5); // 5 minutes interval

// Initial call to keep the database alive immediately
keepDbAlive();
