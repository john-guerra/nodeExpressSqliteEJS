const express = require("express");
const router = express.Router();

const myDb = require("../db/mySqliteDB.js");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/references", async (req, res) => {
  const references = await myDb.getReferences();
  res.status(200).json(references);
});

module.exports = router;
