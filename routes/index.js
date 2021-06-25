const express = require("express");
const router = express.Router();

const myDb = require("../db/mySqliteDB.js");


/* GET home page. */
router.get("/", async function (req, res, next) {
  const references = await myDb.getReferences();
  console.log("got references" , references);

  res.render("./pages/index", { references });
});

router.get("/references", async (req, res) => {
  const references = await myDb.getReferences();
  res.status(200).json(references);
});

module.exports = router;
