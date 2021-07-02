const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function getReferences(query, page, pageSize) {
  console.log("getReferences", query);

  const db = await open({
    filename: "./db/database.db",
    driver: sqlite3.Database,
  });

  const stmt = await db.prepare(`
    SELECT * FROM Reference
    WHERE title LIKE @query
    ORDER BY created_on DESC
    LIMIT @pageSize
    OFFSET @offset;
    `);

  const params = {
    "@query": query + "%",
    "@pageSize": pageSize,
    "@offset": (page - 1) * pageSize,
  };

  try {
    return await stmt.all(params);
  } finally {
    await stmt.finalize();
    db.close();
  }
}

async function getReferencesCount(query) {
  console.log("getReferences", query);

  const db = await open({
    filename: "./db/database.db",
    driver: sqlite3.Database,
  });

  const stmt = await db.prepare(`
    SELECT COUNT(*) AS count
    FROM Reference
    WHERE title LIKE @query;
    `);

  const params = {
    "@query": query + "%",
  };

  try {
    return (await stmt.get(params)).count;
  } finally {
    await stmt.finalize();
    db.close();
  }
}

async function insertReference(ref) {
  const db = await open({
    filename: "./db/database.db",
    driver: sqlite3.Database,
  });

  const stmt = await db.prepare(`INSERT INTO
    Reference(title, published_on)
    VALUES (@title, @published_on);`);

  try {
    return await stmt.run({
      "@title": ref.title,
      "@published_on": ref.published_on,
    });
  } finally {
    await stmt.finalize();
    db.close();
  }
}

module.exports.getReferences = getReferences;
module.exports.getReferencesCount = getReferencesCount;
module.exports.insertReference = insertReference;


