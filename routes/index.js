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
  console.log("got references", references);

  res.render("./pages/index", { references , query});
});

module.exports = router;
