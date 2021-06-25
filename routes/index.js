const express = require("express");
const router = express.Router();

const myDb = require("../db/mySqliteDB.js");

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.redirect("/references");
});

router.get("/references", async (req, res, next) => {

  const query = req.query.q || "";
  const msg = req.query.msg || null;
  try {

    let references = await myDb.getReferences(query);
    res.render("./pages/index", { references, query,  msg });

  } catch (err) {
    next(err);
  }

});


router.post("/createReference", async (req, res, next) => {
  const ref = req.body;

  try {

    const insertRes = await myDb.insertReference(ref);

    console.log("Inserted", insertRes);
    res.redirect("/references/?msg=Inserted");
  } catch (err) {
    console.log("Error inserting", err);
    next(err);

  }
});

module.exports = router;
