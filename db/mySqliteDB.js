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

  return stmt.all({ "@query": query + "%" });
}

async function insertReference(ref) {
  const db = await open({
    filename: "./db/database.db",
    driver: sqlite3.Database,
  });

  const stmt = await db.prepare(`INSERT INTO
    Reference(title, published_on)
    VALUES (@title, @published_on);`);

  return stmt.run({ "@title": ref.title,
    "@published_on": ref.published_on
  });
}

module.exports.getReferences = getReferences;
module.exports.insertReference = insertReference;
