const sqlite3 = require("sqlite3");
const { open } = require("sqlite");




async function getReferences() {
  const db = await open({
    filename: "./db/database.db",
    driver: sqlite3.Database,
  });


  return db.all("SELECT * FROM References;");
}



module.exports.getReferences = getReferences;

