const express = require("express");
const router = express.Router();

const myDb = require("../db/mySqliteDB.js");

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.redirect("/references");
});

router.get("/references", async (req, res) => {
  const query = req.query.q || "";

  const references = await myDb.getReferences(query);


  res.render("./pages/index", { references, query });
});


router.post("/createReference", async (req, res) => {
  const ref = req.body;

  const insertRes = await myDb.insertReference(ref);

  console.log("Inserted", insertRes);

  res.redirect("/references");
});

module.exports = router;
