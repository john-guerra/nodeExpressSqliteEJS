const sqlite3 = require("sqlite3");
const { open } = require("sqlite");




async function getReferences(query) {
  console.log("getReferences", query);

  const db = await open({
    filename: "./db/database.db",
    driver: sqlite3.Database,
  });

  const stmt = await db.prepare(`SELECT * FROM Reference
    WHERE title LIKE @query
    ORDER BY created_on
    DESC LIMIT 10;`);

  return stmt.all({"@query": query + "%"});
}

// title starts with "John"

module.exports.getReferences = getReferences;

